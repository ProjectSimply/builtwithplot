<?php

add_filter( 'adfoin_action_providers', 'adfoin_pabblypro_actions', 10, 1 );

function adfoin_pabblypro_actions( $actions ) {

    $actions['pabblypro'] = array(
        'title' => __( 'Pabbly [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Add Contact To List', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_pabblypro_action_fields' );

function adfoin_pabblypro_action_fields() {
?>
    <script type="text/template" id="pabblypro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'List', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId">
                        <option value=""> <?php _e( 'Select List...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.list" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>

        </table>
    </script>


<?php
}

add_action( 'adfoin_pabblypro_job_queue', 'adfoin_pabblypro_job_queue', 10, 1 );

function adfoin_pabblypro_job_queue( $data ) {
    adfoin_pabblypro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Mailchimp API
 */
function adfoin_pabblypro_send_data( $record, $posted_data ) {

    $api_key    = get_option( 'adfoin_pabbly_api_key' ) ? get_option( 'adfoin_pabbly_api_key' ) : "";

    if(!$api_key ) {
        exit;
    }

    $record_data = json_decode( $record["data"], true );

    if( array_key_exists( "cl", $record_data["action_data"] ) ) {
        if( $record_data["action_data"]["cl"]["active"] == "yes" ) {
            if( !adfoin_match_conditional_logic( $record_data["action_data"]["cl"], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data["field_data"];
    $list_id = $data["listId"];
    $task    = $record["task"];

    if( $task == "subscribe" ) {

        $email         = empty( $data["email"] ) ? "" : adfoin_get_parsed_values( $data["email"], $posted_data );
        $name          = empty( $data["name"] ) ? "" : adfoin_get_parsed_values( $data["name"], $posted_data );
        $mobile        = empty( $data["mobile"] ) ? "" : adfoin_get_parsed_values( $data["mobile"], $posted_data );
        $city          = empty( $data["city"] ) ? "" : adfoin_get_parsed_values( $data["city"], $posted_data );
        $country       = empty( $data["country"] ) ? "" : adfoin_get_parsed_values( $data["country"], $posted_data );
        $website       = empty( $data["website"] ) ? "" : adfoin_get_parsed_values( $data["website"], $posted_data );
        $age           = empty( $data["age"] ) ? "" : adfoin_get_parsed_values( $data["age"], $posted_data );
        $custom_fields = empty( $data["customFields"] ) ? "" : adfoin_get_parsed_values( $data["customFields"], $posted_data );

        $data = array(
            'list_id' => $list_id,
            'import'  => 'single',
            'email'   => $email,
            'name'    => $name,
            'mobile'  => $mobile,
            'city'    => $city,
            'country' => $country,
            'website' => $website,
            'age'     => $age
        );

        if( $custom_fields ) {
            $custom_fields = explode( '|', trim( $custom_fields) );

            if( is_array( $custom_fields ) ) {
                foreach( $custom_fields as $single ) {
                    $parts = explode( '=', $single, 2 );
                    $data[$parts[0]] = $parts[1];
                }
            }
        }

        $url = "https://emails.pabbly.com/api/subscribers";

        $args = array(

            'headers' => array(
                'Authorization' => 'Bearer ' . $api_key,
                'Content-Type'  => 'application/json'
            ),
            'body' => json_encode( $data )
        );

        $return = wp_remote_post( $url, $args );

        adfoin_add_to_log( $return, $url, $args, $record );
    }
}