<?php

add_filter( 'adfoin_action_providers', 'adfoin_mailifypro_actions', 10, 1 );

function adfoin_mailifypro_actions( $actions ) {

    $actions['mailifypro'] = array(
        'title' => __( 'Mailify [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' )
        )
    );

    return $actions;
}


add_action( 'adfoin_action_fields', 'adfoin_mailifypro_action_fields' );

function adfoin_mailifypro_action_fields() {
    ?>
    <script type="text/template" id="mailifypro-action-template">
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
                        <?php esc_attr_e( 'Mailify List', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId" @change="getFields" required="required">
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

add_action( 'wp_ajax_adfoin_get_mailifypro_fields', 'adfoin_get_mailifypro_fields', 10, 0 );
/*
 * Get Mailify subscriber lists
 */
function adfoin_get_mailifypro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $account_number = get_option( "adfoin_mailify_account_number" );
    $key            = get_option( "adfoin_mailify_key" );
    $list_id        = isset( $_REQUEST['listId'] ) ? $_REQUEST['listId'] : '';

    if( ! $account_number || !$key || !$list_id ) {
        return array();
    }

    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . base64_encode( $account_number . ':' . $key )
        )
    );

    $url  = "https://mailifyapis.com/v1/lists/{$list_id}/fields";
    $data = wp_remote_request( $url, $args );

    if( is_wp_error( $data ) ) {
        wp_send_json_error();
    }

    $body        = json_decode( $data["body"] );
    $meta_fields = wp_list_pluck( $body->fields, 'caption', 'id' );

    unset( $meta_fields['id'] );
    unset( $meta_fields['CREATION_DATE_ID'] );
    unset( $meta_fields['MODIFICATION_DATE_ID'] );
    unset( $meta_fields['EMAIL_ID'] );
    unset( $meta_fields['PHONE_ID'] );
    unset( $meta_fields['CIVILITY_ID'] );

    $contact_fields = array(
        array( 'key' => 'email', 'value' => 'Email', 'description' => '' ),
        array( 'key' => 'phone', 'value' => 'Phone', 'description' => '' ),
    );

    if( is_array( $meta_fields ) ) {
        foreach( $meta_fields as $key=> $meta ) {
            array_push( $contact_fields, array( 'key' => $key, 'value' => $meta, 'description' => '' ) );
        }
    }

    wp_send_json_success( $contact_fields );
}

add_action( 'adfoin_mailifypro_job_queue', 'adfoin_mailifypro_job_queue', 10, 1 );

function adfoin_mailifypro_job_queue( $data ) {
    adfoin_mailifypro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Mailify API
 */
function adfoin_mailifypro_send_data( $record, $posted_data ) {

    $account_number = get_option( "adfoin_mailify_account_number" );
    $api_key        = get_option( "adfoin_mailify_key" );

    if( !$account_number || !$api_key ) {
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

    $data        = $record_data["field_data"];
    $task        = $record["task"];
    $parsed_data = array();

    if( $task == "subscribe" ) {
        $list_id    = $data["listId"];
        $email      = empty( $data["email"] ) ? "" : trim( adfoin_get_parsed_values( $data["email"], $posted_data ) );
        $phone      = empty( $data["phone"] ) ? "" : adfoin_get_parsed_values( $data["phone"], $posted_data );

        unset( $data['listId'] );
        unset( $data['email'] );
        unset( $data['phone'] );

        foreach( $data as $key => $value ) {
            $parsed_data[$key] = adfoin_get_parsed_values( $value, $posted_data );
        }

        $cont_data = array(
            'email' => $email,
            'phone' => $phone,
        );

        $cont_data = array_merge( $cont_data, $parsed_data );

        $url = "https://mailifyapis.com/v1/lists/{$list_id}/contacts";

        $args = array(

            'headers' => array(
                'Content-Type' => 'application/json',
                'accountId'    => $account_number,
                'apiKey'       => $api_key
                // 'Authorization' => 'Basic ' . base64_encode( $account_number . ':' . $key )
            ),
            'body' => json_encode( $cont_data )
        );

        $return = wp_remote_post( $url, $args );

        adfoin_add_to_log( $return, $url, $args, $record );
    }

    return;
}