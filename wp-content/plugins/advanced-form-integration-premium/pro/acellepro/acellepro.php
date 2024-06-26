<?php

add_filter( 'adfoin_action_providers', 'adfoin_acellepro_actions', 10, 1 );

function adfoin_acellepro_actions( $actions ) {

    $actions['acellepro'] = array(
        'title' => __( 'Acelle Mail [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_acellepro_action_fields' );

function adfoin_acellepro_action_fields() {
    ?>
    <script type="text/template" id="acellepro-action-template">
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
                        <?php esc_attr_e( 'Acelle List', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId" required="required" @change="getFields">
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

add_action( 'wp_ajax_adfoin_get_acellepro_fields', 'adfoin_get_acellepro_fields', 10, 0 );

/*
 * Get Acelle Mail List fields
 */
function adfoin_get_acellepro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $list_id = isset( $_POST['listId'] ) ? sanitize_text_field( $_POST['listId'] ) : '';
    $data    = adfoin_acelle_request( "lists/{$list_id}" );
    $fields  = array();

    if( !is_wp_error( $data ) ) {
        $body  = json_decode( wp_remote_retrieve_body( $data ) );
        if( isset($body->list ) && is_object( $body->list ) && isset( $body->list->fields ) && is_array( $body->list->fields ) ) {
        foreach( $body->list->fields as $single ) {
            array_push( $fields, array( 'key' => $single->type . '__' . $single->key, 'value' => $single->label, 'description' => '' ) );
        }

        array_push( $fields, array( 'key' => 'tags', 'value' => 'Tags', 'description' => '' ) );

        wp_send_json_success( $fields );
    }
    } else {
        wp_send_json_error();
    }
}

add_action( 'adfoin_acellepro_job_queue', 'adfoin_acellepro_job_queue', 10, 1 );

function adfoin_acellepro_job_queue( $data ) {
    adfoin_acellepro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to acellepro API
 */
function adfoin_acellepro_send_data( $record, $posted_data ) {

    $record_data    = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data['field_data'];
    $list_id = isset( $data['listId'] ) ? $data['listId'] : '';
    $cred_id = isset( $data['credId'] ) ? $data['credId'] : '';
    $tags    = isset( $data['tags'] ) ? $data['tags'] : '';
    $task    = $record['task'];
    unset( $data['listId'] );
    unset( $data['credId'] );
    unset( $data['tags'] );

    if( $task == 'subscribe' ) {
        $subscriber_data = array();

        foreach( $data as $key => $value ) {
            if( $value ) {
                list( $type, $name ) = explode( '__', $key );
                $subscriber_data[$name] = adfoin_get_parsed_values( $value, $posted_data );
            }
        }

        if( $list_id ) { $subscriber_data['list_uid'] = $list_id; }
        if( $tags ) { $subscriber_data['tag'] = $tags; }
        
        $return = adfoin_acelle_request( 'subscribers', 'POST', $subscriber_data, $record, $cred_id );

    }

    return;
}