<?php

add_filter( 'adfoin_action_providers', 'adfoin_getresponsepro_actions', 10, 1 );

function adfoin_getresponsepro_actions( $actions ) {

    $actions['getresponsepro'] = array(
        'title' => __( 'GetResponse [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_getresponsepro_action_fields' );

function adfoin_getresponsepro_action_fields() {
    ?>
    <script type="text/template" id="getresponsepro-action-template">
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
                        <?php esc_attr_e( 'GetResponse List', 'advanced-form-integration' ); ?>
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
                        <?php esc_attr_e( 'Update contact (if already exists)', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[update]" value="true" v-model="fielddata.update">
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Autoresponder', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[autoresponder]" value="true" v-model="fielddata.autoresponder">
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Tag', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[tagId]" v-model="fielddata.tagId">
                        <option value=""> <?php _e( 'Select Tag...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.tag" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': tagLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>
    <?php
}

add_action( 'wp_ajax_adfoin_get_getresponsepro_tags', 'adfoin_get_getresponsepro_tags', 10, 0 );
/*
 * Get Kalviyo subscriber lists
 */
function adfoin_get_getresponsepro_tags() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $data = adfoin_getresponse_request( 'tags' );

    if( is_wp_error( $data ) ) {
        wp_send_json_error();
    }

    $body = json_decode( $data["body"] );
    $tags = wp_list_pluck( $body, "name", "tagId" );

    wp_send_json_success( $tags );
}

add_action( 'wp_ajax_adfoin_get_getresponsepro_contact_fields', 'adfoin_get_getresponsepro_contact_fields', 10, 0 );
/*
 * Get Kalviyo subscriber lists
 */
function adfoin_get_getresponsepro_contact_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $contact_fields = array(
        array( 'key' => 'email', 'value' => 'Email', 'description' => '' ),
        array( 'key' => 'name', 'value' => 'Name', 'description' => '' ),
        array( 'key' => 'ipAddress', 'value' => 'IP Address', 'description' => '' )
    );

    $data = adfoin_getresponse_request( 'custom-fields', 'GET' );

    if( is_wp_error( $data ) ) {
        wp_send_json_error();
    }

    $body   = json_decode( wp_remote_retrieve_body( $data ) );
    $fields = wp_list_pluck( $body, "name", "customFieldId" );

    foreach( $fields as $key => $value ) {
        array_push( $contact_fields, array( 'key' => $key, 'value' => $value ) );
    }

    wp_send_json_success( $contact_fields );
}

function adfoin_getresponse_custom_field_types() {
    $data = adfoin_getresponse_request( 'custom-fields', 'GET' );

    if( is_wp_error( $data ) ) {
        return;
    }

    $body  = json_decode( wp_remote_retrieve_body( $data ) );
    $types = wp_list_pluck( $body, "type", "customFieldId" );

    return $types;
}

add_action( 'adfoin_getresponsepro_job_queue', 'adfoin_getresponsepro_job_queue', 10, 1 );

function adfoin_getresponsepro_job_queue( $data ) {
    adfoin_getresponsepro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to GetResponse API
 */
function adfoin_getresponsepro_send_data( $record, $posted_data ) {

    $api_key = get_option( 'adfoin_getresponse_api_key' ) ? get_option( 'adfoin_getresponse_api_key' ) : "";

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

    $data = $record_data["field_data"];
    $task = $record["task"];

    if( $task == "subscribe" ) {
        $list_id       = $data["listId"];
        $email         = empty( $data["email"] ) ? "" : trim( adfoin_get_parsed_values( $data["email"], $posted_data ) );
        $name          = empty( $data["name"] ) ? "" : adfoin_get_parsed_values( $data["name"], $posted_data );
        $ip            = empty( $data["ipAddress"] ) ? "" : adfoin_get_parsed_values( $data["ipAddress"], $posted_data );
        $tagId         = isset( $data["tagId"] ) ? $data["tagId"] : "";
        $update        = isset( $data["update"] ) ? $data["update"] : "";
        $autoresponder = isset( $data["autoresponder"] ) ? $data["autoresponder"] : "";
        $contat_id     = '';
        $custom_fields = array();
        $tags          = array();

        unset( $data['listId'] );
        unset( $data['tagId'] );
        unset( $data['email'] );
        unset( $data['name'] );
        unset( $data['ipAddress'] );
        unset( $data['update'] );
        unset( $data['autoresponder'] );

        $data = array_filter( $data );

        $body = array(
            'email'    => $email,
            'campaign' => array(
                'campaignId' => $list_id,
            ),
            'name'      => $name
        );

        if( $ip ) {
            $body['ipAddress'] = $ip;
        }

        if( $data ) {
            $field_types = adfoin_getresponse_custom_field_types();

            foreach( $data as $key => $value ) {
                $field_type  = isset( $field_types[$key] ) ? $field_types[$key] : '';
                $field_value = adfoin_get_parsed_values( $value, $posted_data );

                if( $field_value ) {
                    $value = array( $field_value );

                    if( 'multi_select' == $field_type || 'checkbox' == $field_type ) {
                        $value = explode( ',', $field_value );
                    }

                    array_push( 
                        $custom_fields,
                        array(
                            'customFieldId' => $key,
                            'value'         => $value
                        ) 
                    );
                }
            }
        }

        if( $tagId ) {
            $tags = array( array( 'tagId' => $tagId ) );
        }
 
        $endpoint = 'contacts';

        if( $custom_fields ) {
            $body['customFieldValues'] = $custom_fields;
        }
        
        if( $tags ) {
            $body['tags'] = $tags;
        }

        if( 'true' == $update ) {
            $contact_id = adfoin_getresponsepro_if_contact_exists( $email, $list_id, $api_key );

            if( $contact_id ) {
                $endpoint = "contacts/{$contact_id}";
                unset( $body['customFieldValues'] );
                unset( $body['tags'] );
            }
        }

        if( 'true' == $autoresponder ) {
            $body['dayOfCycle'] = 0;
        }

        $return = adfoin_getresponse_request( $endpoint, 'POST', $body, $record );

        if( $contact_id ) {
            if( $custom_fields ) {
                $endpoint = "contacts/{$contact_id}/custom-fields";
                $body     = array(
                    'customFieldValues' => $custom_fields
                );

                $cf_return = adfoin_getresponse_request( $endpoint, 'POST', $body, $record );
            }

            if( $tags ) {
                $endpoint = "contacts/{$contact_id}/tags";
                $body     = array(
                    'tags' => $tags
                );

                $tag_return = adfoin_getresponse_request( $endpoint, 'POST', $body, $record );
            }
        }
    }

    return;
}

/*
* Check if contact exists
*/
function adfoin_getresponsepro_if_contact_exists( $email, $list_id, $api_key ) {
    if( !$email || !$list_id || !$api_key ) {
        return false;
    }

    $endpoint = "campaigns/{$list_id}/contacts?query[email]={$email}";
    $return = adfoin_getresponse_request( $endpoint );

    if ( $return['response']['code'] == 200 ) {
        $body       = json_decode( wp_remote_retrieve_body( $return ) );
        $contact_id = isset( $body[0] ) ? $body[0]->contactId : false;
        return $contact_id;
    } else {
        return false;
    }

}