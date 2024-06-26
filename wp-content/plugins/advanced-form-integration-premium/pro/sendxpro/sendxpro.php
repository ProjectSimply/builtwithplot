<?php

add_filter( 'adfoin_action_providers', 'adfoin_sendxpro_actions', 10, 1 );

function adfoin_sendxpro_actions( $actions ) {

    $actions['sendxpro'] = array(
        'title' => __( 'SendX [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Add Contact', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_sendxpro_action_fields' );

function adfoin_sendxpro_action_fields() {
?>
    <script type="text/template" id="sendxpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>


<?php
}

add_action( 'adfoin_sendxpro_job_queue', 'adfoin_sendxpro_job_queue', 10, 1 );

function adfoin_sendxpro_job_queue( $data ) {
    adfoin_sendxpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to SendX API
 */
function adfoin_sendxpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data = $record_data['field_data'];
    $task = $record['task'];

    if( $task == 'subscribe' ) {
        $email      = empty( $data['email'] ) ? '' : trim( adfoin_get_parsed_values( $data['email'], $posted_data ) );
        $first_name = empty( $data['firstName'] ) ? '' : adfoin_get_parsed_values( $data['firstName'], $posted_data );
        $last_name  = empty( $data['lastName'] ) ? '' : adfoin_get_parsed_values( $data['lastName'], $posted_data );
        $company    = empty( $data['company'] ) ? '' : adfoin_get_parsed_values( $data['company'], $posted_data );
        $birthday   = empty( $data['birthday'] ) ? '' : adfoin_get_parsed_values( $data['birthday'], $posted_data );
        $tags       = empty( $data['tags'] ) ? '' : adfoin_get_parsed_values( $data['tags'], $posted_data );
        $cf         = empty( $data['customFields'] ) ? '' : $data['customFields'];

        $contact_data = array(
            'email'     => $email,
            'firstName' => $first_name,
            'lastName'  => $last_name,
            'company'   => $company,
            'birthday'  => $birthday
        );

        if( $tags ) {
            $contact_data["tags"] = explode( ",", $tags );
        }

        if( $cf ) {
            $holder = explode( "||", $cf );

            foreach( $holder as $single ) {
                if( strpos( $single, "=" ) !== false ) {
                    $single                       = explode( "=", $single, 2 );
                    $contact_data['customFields'][$single[0]] = adfoin_get_parsed_values( $single[1], $posted_data );;
                }
                
            }
        }

        $return = adfoin_sendx_request( 'contact/identify', 'POST', $contact_data, $record );
    }
}