<?php

add_filter( 'adfoin_action_providers', 'adfoin_campaignmonitorpro_actions', 10, 1 );

function adfoin_campaignmonitorpro_actions( $actions ) {

    $actions['campaignmonitorpro'] = array(
        'title' => __( 'Campaign Monitor [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'create_subscriber' => __( 'Subscribe to List', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_add_js_fields', 'adfoin_campaignmonitorpro_js_fields', 10, 1 );

function adfoin_campaignmonitorpro_js_fields( $field_data ) {}

add_action( 'adfoin_action_fields', 'adfoin_campaignmonitorpro_action_fields' );

function adfoin_campaignmonitorpro_action_fields() {
    ?>
    <script type="text/template" id="campaignmonitorpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'create_subscriber'">
                <th scope="row">
                    <?php esc_attr_e( 'Subscriber Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                    <div class="spinner" v-bind:class="{'is-active': fieldLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>
            <tr class="alternate" v-if="action.task == 'create_subscriber'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'Client', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[accountId]" v-model="fielddata.accountId" required="true" @change="getList">
                        <option value=""><?php _e( 'Select...', 'advanced-form-integration' ); ?></option>
                        <option v-for="(item, index) in fielddata.accounts" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': accountLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr class="alternate" v-if="action.task == 'create_subscriber'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'List', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId" required="required" @change="getFields">
                        <option value=""><?php _e( 'Select...', 'advanced-form-integration' ); ?></option>
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

add_action( 'wp_ajax_adfoin_get_campaignmonitorpro_fields', 'adfoin_get_campaignmonitorpro_fields', 10, 0 );

/*
 * Get Moosend custom fields
 */
function adfoin_get_campaignmonitorpro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $list_id  = isset( $_POST['listId'] ) ? sanitize_text_field( $_POST['listId'] ) : '';
    $endpoint = "lists/{$list_id}/customfields.json";
    $data     = adfoin_campaignmonitor_request( $endpoint );
    $fields   = array(
        array( 'key' => 'email', 'value' => 'Email', 'description' => '' ),
        array( 'key' => 'name', 'value' => 'Name', 'description' => '' ),
        array( 'key' => 'customFields', 'value' => 'Custom Fields', 'description' => 'Deprecated, use individual fields.' ),
    );

    if( !is_wp_error( $data ) ) {
        $body  = json_decode( wp_remote_retrieve_body( $data ), true );

        if( is_array( $body ) && count( $body ) > 0 ) {
            foreach( $body as $field ) {
                $description = '';

                if( $field['DataType'] == "MultiSelectOne" || $field['DataType'] == "MultiSelectMany" ) {
                    $description = implode( ", ", $field['FieldOptions'] );

                    if( $description ) {
                        $description = "Options: " . $description. ". Use comma separated values for multiple options.";
                    }
                }
                array_push( $fields, array( 'key' => 'custom__' . $field['DataType'] . '__' . $field['FieldName'], 'value' => $field['FieldName'], 'description' => $description ) );
            }
        }
        
        wp_send_json_success( $fields );
    } else {
        wp_send_json_error();
    }
}

add_action( 'adfoin_campaignmonitorpro_job_queue', 'adfoin_campaignmonitorpro_job_queue', 10, 1 );

function adfoin_campaignmonitorpro_job_queue( $data ) {
    adfoin_campaignmonitorpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Campaign Monitor API
 */
function adfoin_campaignmonitorpro_send_data( $record, $posted_data ) {

    $api_token   = get_option( 'adfoin_campaignmonitor_api_token' ) ? get_option( 'adfoin_campaignmonitor_api_token' ) : "";

    if( !$api_token ) {
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

    $data          = $record_data["field_data"];
    $task          = $record["task"];
    $account       = empty( $data["accountId"] ) ? "" : $data["accountId"];
    $list          = empty( $data["listId"] ) ? "" : $data["listId"];
    $email         = empty( $data["email"] ) ? "" : adfoin_get_parsed_values( $data["email"], $posted_data );
    $name          = empty( $data["name"] ) ? "" : adfoin_get_parsed_values( $data["name"], $posted_data );
    $custom_fields = isset( $data["customFields"] ) ? adfoin_get_parsed_values( $data["customFields"], $posted_data ) : "";

    if( $task == "create_subscriber" ) {

        $url = "https://api.createsend.com/api/v3.3/subscribers/{$list}.json";
        $method = 'POST';

        if( adfoin_campaignmonitorpro_contact_exists( $list, $email ) ) {
            $url = "https://api.createsend.com/api/v3.3/subscribers/{$list}.json?email={$email}";
            $method = 'PUT';
        }

        $body = array(
            "EmailAddress" => $email,
            "Name" => $name,
            "ConsentToTrack" => "Yes",
            "customFields" => array()
        );

        if( $custom_fields ) {
            $holder = explode( "|", $custom_fields );

            foreach( $holder as $single ) {
                $single = explode( "=", $single, 2 );

                array_push( $body["customFields"], array( "key" => $single[0], "value" => $single[1] ) );
            }
        }

        foreach( $data as $key => $value ) {
            if( $value ) {
                if( substr( $key, 0, 8 ) == "custom__" ) {
                    list( $custom, $data_type, $custom_key ) = explode( "__", $key, 3 );

                    if( $data_type == "MultiSelectMany" ) {
                        $value = explode( ",", adfoin_get_parsed_values( $value, $posted_data ) );

                        foreach( $value as $single ) {
                            array_push(
                                $body["customFields"],
                                array( "key" => $custom_key, "value" =>  trim( $single ) )
                            );
                        }

                        continue;
                    }

                    array_push(
                        $body["customFields"],
                        array( "key" => $custom_key, "value" => adfoin_get_parsed_values( $value, $posted_data ) )
                    );
                }
            }
        }

        // if custom fields are empty, remove the key
        if( empty( $body["customFields"] ) ) {
            unset( $body["customFields"] );
        }

        $args = array(
            'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization' => 'Basic ' . base64_encode( $api_token . ':')
            ),
            'body' => json_encode( $body )
        );

        $response = wp_remote_post( $url, $args );

        adfoin_add_to_log( $response, $url, $args, $record );
    }

    return;
}

function adfoin_campaignmonitorpro_contact_exists( $list, $email ) {

    $api_token = get_option( 'adfoin_campaignmonitor_api_token' ) ? get_option( 'adfoin_campaignmonitor_api_token' ) : "";
    $url       = "https://api.createsend.com/api/v3.3/subscribers/{$list}.json?email={$email}";

    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . base64_encode( $api_token . ':')
        )
    );

    $response      = wp_remote_get( $url, $args );
    $response_code = (int) wp_remote_retrieve_response_code( $response );

    if( 200 == $response_code ) {
        return true;
    } else{
        return false;
    }

}