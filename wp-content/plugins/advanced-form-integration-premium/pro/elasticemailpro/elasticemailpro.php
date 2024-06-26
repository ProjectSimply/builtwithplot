<?php

add_filter( 'adfoin_action_providers', 'adfoin_elasticemailpro_actions', 10, 1 );

function adfoin_elasticemailpro_actions( $actions ) {

    $actions['elasticemailpro'] = array(
        'title' => __( 'Elastic Email [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Add Contact To List', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_add_js_fields', 'adfoin_elasticemailpro_js_fields', 10, 1 );

function adfoin_elasticemailpro_js_fields( $field_data ) { }

add_action( 'adfoin_action_fields', 'adfoin_elasticemailpro_action_fields' );

function adfoin_elasticemailpro_action_fields() {
?>
    <script type="text/template" id="elasticemailpro-action-template">
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

/*
 * Saves connection mapping
 */
function adfoin_elasticemailpro_save_integration() {
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

add_action( 'adfoin_elasticemailpro_job_queue', 'adfoin_elasticemailpro_job_queue', 10, 1 );

function adfoin_elasticemailpro_job_queue( $data ) {
    adfoin_elasticemailpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Mailchimp API
 */
function adfoin_elasticemailpro_send_data( $record, $posted_data ) {

    $api_key    = get_option( 'adfoin_elasticemail_api_key' ) ? get_option( 'adfoin_elasticemail_api_key' ) : "";
    $public_acc = get_option( 'adfoin_elasticemail_public_accountid' ) ? get_option( 'adfoin_elasticemail_public_accountid' ) : "";

    if(!$api_key || !$public_acc ) {
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
    $update  = $data["update"];
    $task    = $record["task"];

    if( $task == "subscribe" ) {

        $email         = empty( $data["email"] ) ? "" : adfoin_get_parsed_values( $data["email"], $posted_data );
        $first_name    = empty( $data["firstName"] ) ? "" : adfoin_get_parsed_values( $data["firstName"], $posted_data );
        $last_name     = empty( $data["lastName"] ) ? "" : adfoin_get_parsed_values( $data["lastName"], $posted_data );
        $custom_fields = empty( $data["customFields"] ) ? "" : $data["customFields"];

        $data = array(
            'publiclistid'    => $list_id,
            'firstName'       => $first_name,
            'lastName'        => $last_name,
            'email'           => $email,
            'publicAccountID' => $public_acc
        );

        if( $custom_fields ) {
            $custom_fields = explode( '|', trim( $custom_fields) );

            foreach( $custom_fields as $single ) {
                $parts = explode( '=', $single, 2 );
                $key   = 'field_' . $parts[0];

                $data[$key] = adfoin_get_parsed_values( $parts[1], $posted_data );
            }
        }

        $data = array_filter( $data );
        $url  = "https://api.elasticemail.com/v2/contact/add?apikey={$api_key}";
        $args = array(
            'headers' => array(
                'Content-Type' => 'application/x-www-form-urlencoded'
            ),
            'body' => $data
        );

        $return = wp_remote_post( $url, $args );

        adfoin_add_to_log( $return, $url, $args, $record );
    }
}