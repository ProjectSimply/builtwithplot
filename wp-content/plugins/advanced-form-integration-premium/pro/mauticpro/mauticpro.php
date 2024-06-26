<?php

add_filter( 'adfoin_action_providers', 'adfoin_mauticpro_actions', 10, 1 );

function adfoin_mauticpro_actions( $actions ) {

    $actions['mauticpro'] = array(
        'title' => __( 'Mautic [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'add_contact'   => __( 'Add or Update Contact', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_mauticpro_action_fields' );

function adfoin_mauticpro_action_fields() {
    ?>
    <script type="text/template" id="mauticpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'add_contact'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                    <div class="spinner" v-bind:class="{'is-active': fieldsLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </th>
                <td scope="row">

                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field> 
        </table>
    </script>
    <?php
}

add_action( 'wp_ajax_adfoin_get_mauticpro_fields', 'adfoin_get_mauticpro_fields', 10, 0 );

/*
 * Get Mailchimp List merge fields
 */
function adfoin_get_mauticpro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $data   = adfoin_mautic_request( '/api/fields/contact?limit=1000' );
    $fields = array();

    if( !is_wp_error( $data ) ) {
        $body  = json_decode( wp_remote_retrieve_body( $data ), true );

        if( isset( $body['fields'] ) && is_array( $body['fields'] ) ) {
            foreach( $body['fields'] as $single ) {
                array_push( $fields, array( 'key' => $single['alias'], 'value' => $single['label'], 'description' => '' ) );
            }
        }

        array_push( $fields, array( 'key' => 'tags', 'value' => __( 'Tags', 'advanced-form-integration' ), 'description' => __( 'Insert tag name, use comma for multiple tags.', 'advaned-form-integration' ) ) );
        array_push( $fields, array( 'key' => 'stage', 'value' => __( 'Stage ID', 'advanced-form-integration' ), 'description' => __( 'Stage numeric ID', 'advaned-form-integration' ) ) );
        array_push( $fields, array( 'key' => 'owner', 'value' => __( 'Contact Owner ID', 'advanced-form-integration' ), 'description' => __( 'User numeric ID', 'advaned-form-integration' ) ) );

        wp_send_json_success( $fields );
    } else {
        wp_send_json_error();
    }
}

add_action( 'adfoin_mauticpro_job_queue', 'adfoin_mauticpro_job_queue', 10, 1 );

function adfoin_mauticpro_job_queue( $data ) {
    adfoin_mauticpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Mautic API
 */
function adfoin_mauticpro_send_data( $record, $posted_data ) {

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

    if( $task == 'add_contact' ) {
        $holder = array();

        foreach( $data as $key => $value ) {
            if( $value ) {
                $holder[$key] = adfoin_get_parsed_values( $value, $posted_data );
            }
        }

        if( isset( $holder['tags'] ) && $holder['tags'] ) {
            $holder['tags'] = explode( ',', $holder['tags'] );
        }

        $request_data = array_filter( $holder );
        $return       = adfoin_mautic_request( '/api/contacts/new', 'POST', $request_data, $record );
    }

    return;
}