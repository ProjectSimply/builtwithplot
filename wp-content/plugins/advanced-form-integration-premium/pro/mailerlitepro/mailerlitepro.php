<?php

add_filter( 'adfoin_action_providers', 'adfoin_mailerlitepro_actions', 10, 1 );

function adfoin_mailerlitepro_actions( $actions ) {

    $actions['mailerlitepro'] = array(
        'title' => __( 'MailerLite Classic [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To Group', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_add_js_fields', 'adfoin_mailerlitepro_js_fields', 10, 1 );

function adfoin_mailerlitepro_js_fields( $field_data ) { }

add_action( 'adfoin_action_fields', 'adfoin_mailerlitepro_action_fields' );

function adfoin_mailerlitepro_action_fields() {
    ?>
    <script type="text/template" id="mailerlitepro-action-template">
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
                        <?php esc_attr_e( 'MailerLite Group', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId">
                        <option value=""> <?php _e( 'Select Group...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.list" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Double Opt-in', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[doubleoptin]" value="true" v-model="fielddata.doubleoptin">
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>


    <?php
}

add_action( 'wp_ajax_adfoin_get_mailerlitepro_custom_fields', 'adfoin_get_mailerlitepro_custom_fields', 10, 0 );

/*
 * Get MailerLite fields
 */
function adfoin_get_mailerlitepro_custom_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $api_key = get_option( "adfoin_mailerlite_api_key" );

    if( ! $api_key ) {
        return array();
    }

    $url = "http://api.mailerlite.com/api/v2/fields";

    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'X-MailerLite-ApiKey' => $api_key
        )
    );

    $data = wp_remote_request( $url, $args );

    if( !is_wp_error( $data ) ) {
        $body  = json_decode( $data["body"] );

        $custom_fields = array();

        foreach( $body as $single ) {
            array_push( $custom_fields, array( 'key' => $single->key, 'value' => $single->title ) );
        }

        wp_send_json_success( $custom_fields );
    } else {
        wp_send_json_error();
    }
}

add_action( 'adfoin_mailerlitepro_job_queue', 'adfoin_mailerlitepro_job_queue', 10, 1 );

function adfoin_mailerlitepro_job_queue( $data ) {
    adfoin_mailerlitepro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to MailerLite API
 */
function adfoin_mailerlitepro_send_data( $record, $posted_data ) {

    $api_key = get_option( 'adfoin_mailerlite_api_key' ) ? get_option( 'adfoin_mailerlite_api_key' ) : "";

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

    $data         = $record_data["field_data"];
    $list_id      = $data["listId"];
    $task         = $record["task"];
    $doubleoption = isset( $data["doubleoptin"] ) && $data["doubleoptin"] ? $data["doubleoptin"] : "";

    $holder  = array();

    foreach( $data as $key => $value ) {
        $holder[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );
    }

    unset( $holder["list"] );
    unset( $holder["listId"] );

    if( $task == "subscribe" && isset( $holder["email"] ) ) {

        $email = isset( $holder["email"] ) ? $holder["email"] : "";
        $name  = isset( $holder["name"] ) ? $holder["name"] : "";

        unset( $holder["name"] );
        unset( $holder["email"] );

        $subscriber_data = array(
            "email"  => $email,
            "name"   => $name,
            "fields" => array_filter( $holder )
        );

        $headers = array(
            'Content-Type'        => 'application/json',
            'X-MailerLite-ApiKey' => $api_key
        );

        if( "true" == $doubleoption ) {
            wp_remote_post( 'https://api.mailerlite.com/api/v2/settings/double_optin', array( 'headers' => $headers, 'body' => json_encode( array( 'enable' => true ) ) ) );
        }

        $sub_url = "https://api.mailerlite.com/api/v2/subscribers";

        if( $list_id ) {
            $sub_url = "https://api.mailerlite.com/api/v2/groups/{$list_id}/subscribers";
        }

        $sub_args = array(

            'headers' => $headers,
            'body'    => json_encode( array_filter( $subscriber_data ) )
        );

        $return = wp_remote_post( $sub_url, $sub_args );

        adfoin_add_to_log( $return, $sub_url, $sub_args, $record );
    }
}