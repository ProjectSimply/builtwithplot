<?php

add_filter( 'adfoin_action_providers', 'adfoin_sendinbluepro_actions', 10, 1 );

function adfoin_sendinbluepro_actions( $actions ) {

    $actions['sendinbluepro'] = array(
        'title' => __( 'Sendinblue (Brevo) [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_sendinbluepro_action_fields' );

function adfoin_sendinbluepro_action_fields() {
    ?>
    <script type="text/template" id="sendinbluepro-action-template">
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
                        <?php esc_attr_e( 'Sendinblue List', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId" required="required">
                        <option value=""> <?php _e( 'Select List...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.list" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Update if contact already exists', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[update]" value="true" v-model="fielddata.update">
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Double Opt-In', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[doptin]" value="true" v-model="fielddata.doptin">
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Template ID', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input class="regular-text" type="text" name="fieldData[templateId]" v-model="fielddata.templateId">
                    <p class="description"><?php esc_attr_e( 'Required For Double Opt-In only', 'advanced-form-integration' ); ?></p>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Redirect URL', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input class="regular-text" type="text" name="fieldData[redirectUrl]" v-model="fielddata.redirectUrl">
                    <p class="description"><?php esc_attr_e( 'Required For Double Opt-In only', 'advanced-form-integration' ); ?></p>
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>
    <?php
}

add_action( 'wp_ajax_adfoin_get_sendinbluepro_list', 'adfoin_get_sendinbluepro_list', 10, 0 );
/*
 * Get Sendinblue subscriber lists
 */
function adfoin_get_sendinbluepro_list() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $api_key = get_option( "adfoin_sendinblue_api_key" );

    if( ! $api_key ) {
        return array();
    }

    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'api-key' => $api_key
        )
    );

    $page = 0;
    $limit = 50;
    $has_value = true;
    $all_data = array();

    while( $has_value ) {
        $offset = $page * $limit;
        $url = "https://api.sendinblue.com/v3/contacts/lists?limit={$limit}&offset={$offset}";
        $data  = wp_remote_request( $url, $args );

        if( !is_wp_error( $data ) ) {
            $body  = json_decode( $data["body"] );

            if( empty( $body->lists ) ) {
                $has_value = false;
            } else {
                $lists = wp_list_pluck( $body->lists, 'name', 'id' );
                $all_data = $all_data + $lists;
                $page++;
            }
        }
    }

    wp_send_json_success( $all_data );
}

add_action( 'wp_ajax_adfoin_get_sendinbluepro_attributes', 'adfoin_get_sendinbluepro_attributes', 10, 0 );

/*
 * Get Sendinblue attributes
 */
function adfoin_get_sendinbluepro_attributes() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $api_key = get_option( "adfoin_sendinblue_api_key" );

    if( ! $api_key ) {
        return array();
    }

    $attributes = array();

    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'api-key' => $api_key
        )
    );
    $url = "https://api.sendinblue.com/v3/contacts/attributes";

    $data = wp_remote_request( $url, $args );

    if( is_wp_error( $data ) ) {
        wp_send_json_error();
    }

    $body  = json_decode( $data["body"] );

    foreach( $body->attributes as $single ) {
        if( 'BLACKLIST' == $single->name || 'READERS' == $single->name || 'CLICKERS' == $single->name ) {
            continue;
        }

        if( 'SMS' == $single->name ) {
            array_push( $attributes, array( 'key' => $single->name, 'value' => $single->name, 'description' => 'Mobile Number should be passed with proper country code. For example: "+91xxxxxxxxxx" or "0091xxxxxxxxxx"' ) );
            continue;
        }

        array_push( $attributes, array( 'key' => $single->name, 'value' => $single->name, 'description' => '' ) );
    }

    wp_send_json_success( $attributes );
}

/*
 * Saves connection mapping
 */
function adfoin_sendinbluepro_save_integration() {
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

add_action( 'adfoin_sendinbluepro_job_queue', 'adfoin_sendinbluepro_job_queue', 10, 1 );

function adfoin_sendinbluepro_job_queue( $data ) {
    adfoin_sendinbluepro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Sendinblue API
 */
function adfoin_sendinbluepro_send_data( $record, $posted_data ) {

    $api_key = get_option( 'adfoin_sendinblue_api_key' ) ? get_option( 'adfoin_sendinblue_api_key' ) : "";

    if( !$api_key ) {
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

    $data = $record_data["field_data"];
    $task = $record["task"];

    if( $task == "subscribe" ) {
        $holder       = array();
        $list_id      = isset( $data["listId"] ) ? $data["listId"] : '';
        $update       = isset( $data["update"] ) ? $data["update"] : '';
        $doptin       = isset( $data["doptin"] ) ? $data["doptin"] : '';
        $template_id  = isset( $data["templateId"] ) ? $data["templateId"] : '';
        $redirect_url = isset( $data["redirectUrl"] ) ? $data["redirectUrl"] : '';
        $email        = empty( $data["email"] ) ? "" : adfoin_get_parsed_values( $data["email"], $posted_data );

        unset( $data["listId"] );
        unset( $data["email"] );
        unset( $data["list"] );
        unset( $data["update"] );
        unset( $data["doptin"] );
        unset( $data["templateId"] );
        unset( $data["redirectUrl"] );

        $headers = array(
            'Content-Type' => 'application/json',
            'api-key'      => $api_key
        );

        $field_types_raw  = wp_remote_get( "https://api.sendinblue.com/v3/contacts/attributes", array( "headers" => $headers ) );
        $field_types_body = json_decode( wp_remote_retrieve_body( $field_types_raw ), true );
        // $field_types      = wp_list_pluck( $field_types_body->attributes, "type", "name" );

        foreach( $data as $key => $value ) {
            $holder[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );

            foreach( $field_types_body['attributes'] as $attribute ) {
                if( $key == $attribute['name'] ){
                    if( 'boolean' == $attribute['category'] ) {
                        $holder[$key] = $holder[$key] ? true : false;
                    }
    
                    if( 'category' == $attribute['category'] ) {
                        foreach( $attribute['enumeration'] as $enum ) {
                            if( $enum['label'] == $holder[$key] ) {
                                $holder[$key] = $enum['value'];
                            }
                        }
                    }
                }
            }
        }

        $holder = array_filter( $holder );

        $url = "https://api.sendinblue.com/v3/contacts";

        $body = array(
            'email'   => $email,
            'listIds' => array( intval( $list_id ) )
        );

        if("true" == $doptin) {
            $url = "https://api.sendinblue.com/v3/contacts/doubleOptinConfirmation";

            $body = array(
                'email'          => $email,
                'includeListIds' => array( intval( $list_id ) ),
                'templateId'     => intval( $template_id ),
                'redirectionUrl' => $redirect_url
            );
        }

        if( $holder ) {
            $body['attributes'] = $holder;
        }

        $method = "POST";

        if( "true" == $update ) {
            $attributes = adfoin_sendinbluepro_get_attributes( $email, $api_key );

            if( $attributes ) {
                $url = "https://api.sendinblue.com/v3/contacts";
                unset( $body['includeListIds'] );
                unset( $body['templateId'] );
                unset( $body['redirectionUrl'] );
                $body['listIds'] = array( intval( $list_id ) );
            }

            if( isset( $body['attributes'] ) && is_array( $body['attributes'] ) ) {
                $body['attributes'] = array_merge( $attributes, $body['attributes'] );
            }

            $body['updateEnabled'] = true;
        }

        $args = array(
            'method' => $method,
            'headers' => $headers,
            'body' => json_encode( $body )
        );

        $return = wp_remote_request( $url, $args );

        adfoin_add_to_log( $return, $url, $args, $record );
    }

    return;
}

function adfoin_sendinbluepro_get_attributes( $email, $api_key ) {
    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'api-key'      => $api_key
        )
    );

    $url = "https://api.sendinblue.com/v3/contacts/{$email}";

    $result = wp_remote_request( $url, $args );

    if( 200 == wp_remote_retrieve_response_code ( $result ) ) {
        $body = json_decode( wp_remote_retrieve_body( $result ), true );
        $attributes = $body['attributes'];

        return $attributes;
    };

    return array();
}