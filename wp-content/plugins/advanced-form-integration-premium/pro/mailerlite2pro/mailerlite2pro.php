<?php

add_filter( 'adfoin_action_providers', 'adfoin_mailerlite2pro_actions', 10, 1 );

function adfoin_mailerlite2pro_actions( $actions ) {

    $actions['mailerlite2pro'] = array(
        'title' => __( 'MailerLite [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To Group', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_mailerlite2pro_action_fields' );

function adfoin_mailerlite2pro_action_fields() {
    ?>
    <script type="text/template" id="mailerlite2pro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe' || action.task == 'subscribe_to_group'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                <div class="spinner" v-bind:class="{'is-active': fieldsLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
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

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
            
        </table>
    </script>


    <?php
}

add_action( 'wp_ajax_adfoin_get_mailerlite2pro_custom_fields', 'adfoin_get_mailerlite2pro_custom_fields', 10, 0 );

/*
 * Get MailerLite fields
 */
function adfoin_get_mailerlite2pro_custom_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $data = adfoin_mailerlite2_request( 'fields' );

    if( !is_wp_error( $data ) ) {
        $body = json_decode( wp_remote_retrieve_body( $data ) );

        $fields = array();

        foreach( $body->data as $single ) {
            array_push( $fields, array( 'key' => $single->key, 'value' => $single->name ) );
        }

        wp_send_json_success( $fields );
    } else {
        wp_send_json_error();
    }
}

add_action( 'adfoin_mailerlite2pro_job_queue', 'adfoin_mailerlite2pro_job_queue', 10, 1 );

function adfoin_mailerlite2pro_job_queue( $data ) {
    adfoin_mailerlite2pro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to MailerLite API
 */
function adfoin_mailerlite2pro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data['field_data'];
    $list_id = $data['listId'];
    $task    = $record['task'];

    if( $task == 'subscribe' ) {
        $holder  = array();

        foreach( $data as $key => $value ) {
            $holder[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );
        }

        $email      = isset( $holder['email'] ) ? $holder['email'] : '';
        $status     = isset( $holder['status'] ) ? $holder['status'] : '';
        $ip_address = isset( $holder['ip_address'] ) ? $holder['ip_address'] : '';

        unset( $holder['list'] );
        unset( $holder['listId'] );
        unset( $holder['email'] );
        unset( $holder['status'] );
        unset( $holder['ip_address'] );

        $holder = array_filter( $holder );

        $subscriber_data = array(
            'email'  => $email
        );

        if( $holder ) {
            $subscriber_data['fields'] = $holder;
        }

        if( $ip_address ) {
            $subscriber_data['ip_address'] = $ip_address;
        }

        if( $status ) {
            $subscriber_data['status'] = $status;
        }

        if( $list_id ) {
            $subscriber_data['groups'] = array( $list_id );
        }

        adfoin_mailerlite2_request( 'subscribers', 'POST', $subscriber_data, $record );

        return;
    }
}