<?php

add_filter( 'adfoin_action_providers', 'adfoin_drippro_actions', 10, 1 );

function adfoin_drippro_actions( $actions ) {

    $actions['drippro'] = array(
        'title' => __( 'Drip [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'create_subscriber' => __( 'Create Subscriber', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_add_js_fields', 'adfoin_drippro_js_fields', 10, 1 );

function adfoin_drippro_js_fields( $field_data ) {}

add_action( 'adfoin_action_fields', 'adfoin_drippro_action_fields' );

function adfoin_drippro_action_fields() {
    ?>

    <script type="text/template" id="drippro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'create_subscriber'">
                <th scope="row">
                    <?php esc_attr_e( 'Subscriber Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>
            <tr class="alternate" v-if="action.task == 'create_subscriber'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'Account', 'advanced-form-integration' ); ?>
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
                        <?php esc_attr_e( 'Campaign', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[campaignId]" v-model="fielddata.campaignId">
                        <option value=""><?php _e( 'Select...', 'advanced-form-integration' ); ?></option>
                        <option v-for="(item, index) in fielddata.list" :value="index" > {{item}}  </option>
                    </select>
                </td>
            </tr>

            <tr class="alternate" v-if="action.task == 'create_subscriber'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'Workflow', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[workflowId]" v-model="fielddata.workflowId">
                        <option value=""><?php _e( 'Select...', 'advanced-form-integration' ); ?></option>
                        <option v-for="(item, index) in fielddata.workflows" :value="index" > {{item}}  </option>
                    </select>
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>

    <?php
}

/*
 * Saves connection mapping
 */
function adfoin_drippro_save_integration() {
    $params = array();
    parse_str( adfoin_sanitize_text_or_array_field( $_POST['formData'] ), $params );

    $trigger_data = isset( $_POST["triggerData"] ) ? adfoin_sanitize_text_or_array_field( $_POST["triggerData"] ) : array();
    $action_data  = isset( $_POST["actionData"] ) ? adfoin_sanitize_text_or_array_field( $_POST["actionData"] ) : array();
    $field_data   = isset( $_POST["fieldData"] ) ? adfoin_sanitize_text_or_array_field( $_POST["fieldData"] ) : array();

    $integration_title = isset( $trigger_data["integrationTitle"] ) ? $trigger_data["integrationTitle"] : "";
    $form_provider_id  = isset( $trigger_data["formProviderId"] ) ? $trigger_data["formProviderId"] : "";
    $form_id           = isset( $trigger_data["formId"] ) ? $trigger_data["formId"] : "";
    $form_name         = isset( $trigger_data["formName"] ) ? $trigger_data["formName"] : "";
    $action_provider   = isset( $action_data["actionProviderId"] ) ? $action_data["actionProviderId"] : "";
    $task              = isset( $action_data["task"] ) ? $action_data["task"] : "";
    $type              = isset( $params["type"] ) ? $params["type"] : "";



    $all_data = array(
        'trigger_data' => $trigger_data,
        'action_data'  => $action_data,
        'field_data'   => $field_data
    );

    global $wpdb;

    $integration_table = $wpdb->prefix . 'adfoin_integration';

    if ( $type == 'new_integration' ) {

        $result = $wpdb->insert(
            $integration_table,
            array(
                'title'           => $integration_title,
                'form_provider'   => $form_provider_id,
                'form_id'         => $form_id,
                'form_name'       => $form_name,
                'action_provider' => $action_provider,
                'task'            => $task,
                'data'            => json_encode( $all_data, true ),
                'status'          => 1
            )
        );

    }

    if ( $type == 'update_integration' ) {

        $id = esc_sql( trim( $params['edit_id'] ) );

        if ( $type != 'update_integration' &&  !empty( $id ) ) {
            exit;
        }

        $result = $wpdb->update( $integration_table,
            array(
                'title'           => $integration_title,
                'form_provider'   => $form_provider_id,
                'form_id'         => $form_id,
                'form_name'       => $form_name,
                'data'            => json_encode( $all_data, true ),
            ),
            array(
                'id' => $id
            )
        );
    }

    if ( $result ) {
        wp_send_json_success();
    } else {
        wp_send_json_error();
    }
}

add_action( 'adfoin_drippro_job_queue', 'adfoin_drippro_job_queue', 10, 1 );

function adfoin_drippro_job_queue( $data ) {
    adfoin_drippro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Drip API
 */
function adfoin_drippro_send_data( $record, $posted_data ) {

    $api_token   = get_option( 'adfoin_drip_api_token' ) ? get_option( 'adfoin_drip_api_token' ) : "";

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

    $data       = $record_data["field_data"];
    $task       = $record["task"];
    $account    = empty( $data["accountId"] ) ? "" : $data["accountId"];
    $campaign   = empty( $data["campaignId"] ) ? "" : $data["campaignId"];
    $workflow   = empty( $data["workflowId"] ) ? "" : $data["workflowId"];
    $email      = empty( $data["email"] ) ? "" : adfoin_get_parsed_values( $data["email"], $posted_data );
    $first_name = empty( $data["firstName"] ) ? "" : adfoin_get_parsed_values( $data["firstName"], $posted_data );
    $last_name  = empty( $data["lastName"] ) ? "" : adfoin_get_parsed_values( $data["lastName"], $posted_data );
    $phone      = empty( $data["phone"] ) ? "" : adfoin_get_parsed_values( $data["phone"], $posted_data );
    $address1   = empty( $data["address1"] ) ? "" : adfoin_get_parsed_values( $data["address1"], $posted_data );
    $address2   = empty( $data["address2"] ) ? "" : adfoin_get_parsed_values( $data["address2"], $posted_data );
    $city       = empty( $data["city"] ) ? "" : adfoin_get_parsed_values( $data["city"], $posted_data );
    $state      = empty( $data["state"] ) ? "" : adfoin_get_parsed_values( $data["state"], $posted_data );
    $zip        = empty( $data["zip"] ) ? "" : adfoin_get_parsed_values( $data["zip"], $posted_data );
    $country    = empty( $data["country"] ) ? "" : adfoin_get_parsed_values( $data["country"], $posted_data );
    $tags       = empty( $data["tags"] ) ? "" : adfoin_get_parsed_values( $data["tags"], $posted_data );
    $cus_fields = empty( $data["customFields"] ) ? "" : $data["customFields"];

    if( $task == "create_subscriber" ) {

        $url = "https://api.getdrip.com/v2/{$account}/subscribers";

        $body = array(
            "subscribers" => array(
                array(
                    "email"      => $email,
                    "first_name" => $first_name,
                    "last_name"  => $last_name,
                    "phone"      => $phone,
                    "address1"   => $address1,
                    "address2"   => $address2,
                    "city"       => $city,
                    "state"      => $state,
                    "zip"        => $zip,
                    "country"    => $country
                )
            )
        );

        if( $tags ) {
            $body["subscribers"][0]["tags"] = array_map( 'trim', explode(',', $tags ) );
        }

        if( $cus_fields ) {
            $cus_fields = array_map( 'trim', explode(',', $cus_fields ) );
            $body["subscribers"][0]["custom_fields"] = array();

            foreach( $cus_fields as $single ) {
                $parts = array_map( 'trim', explode('=', $single, 2 ) );
                $body["subscribers"][0]["custom_fields"][$parts[0]] = adfoin_get_parsed_values( $parts[1], $posted_data );
            }
        }

        $args = array(
            'timeout' => 20,
            'headers' => array(
                'Content-Type' => 'application/json',
                'Authorization' => 'Basic ' . base64_encode( $api_token . ':')
            ),
            'body' => json_encode( $body )
        );

        $response = wp_remote_post( $url, $args );

        adfoin_add_to_log( $response, $url, $args, $record );

        if( $campaign ) {

            $camp_url = "https://api.getdrip.com/v2/{$account}/campaigns/{$campaign}/subscribers";

            $camp_body = array(
                "subscribers" => array(
                    array(
                        "email" => $email
                    )
                )
            );

            $args["body"] = json_encode( $camp_body );

            $camp_response = wp_remote_post( $camp_url, $args );

            adfoin_add_to_log( $camp_response, $camp_url, $args, $record );
        }

        if( $workflow ) {

            $wfl_url = "https://api.getdrip.com/v2/{$account}/workflows/{$workflow}/subscribers";

            $wfl_body = array(
                "subscribers" => array(
                    array(
                        "email" => $email
                    )
                )
            );

            $args["body"] = json_encode( $wfl_body );

            $wfl_response = wp_remote_post( $wfl_url, $args );

            adfoin_add_to_log( $wfl_response, $wfl_url, $args, $record );
        }
    }

    return;
}