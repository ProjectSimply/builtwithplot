<?php

add_filter( 'adfoin_action_providers', 'adfoin_easysendypro_actions', 10, 1 );

function adfoin_easysendypro_actions( $actions ) {

    $actions['easysendypro'] = array(
        'title' => __( 'EasySendy [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_easysendypro_action_fields' );

function adfoin_easysendypro_action_fields() {
    ?>
    <script type="text/template" id="easysendypro-action-template">
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
                        <?php esc_attr_e( 'EasySendy List', 'advanced-form-integration' ); ?>
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

add_action( 'wp_ajax_adfoin_get_easysendypro_fields', 'adfoin_get_easysendypro_fields', 10, 0 );
/*
 * Get Kalviyo subscriber lists
 */
function adfoin_get_easysendypro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $list_id = isset( $_POST['listId'] ) ? $_POST['listId'] : '';

    $data = adfoin_easysendy_request( 'subscribers_list/getFields', 'POST', array( 'hash' => $list_id ) );

    if( is_wp_error( $data ) ) {
        wp_send_json_error();
    }

    $fields = array();
    $body   = json_decode( wp_remote_retrieve_body( $data ), true );
    
    foreach( $body['fields'] as $field ) {
        array_push( $fields, array( 'key' => $field['tag'], 'value' => $field['name'], 'description' => '' ) );
    }

    wp_send_json_success( $fields );
}

add_action( 'adfoin_easysendypro_job_queue', 'adfoin_easysendypro_job_queue', 10, 1 );

function adfoin_easysendypro_job_queue( $data ) {
    adfoin_easysendypro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to EasySendy API
 */
function adfoin_easysendypro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data        = $record_data['field_data'];
    $task        = $record['task'];
    $parsed_data = array();

    if( $task == 'subscribe' ) {
        $list_id = $data['listId'];
        
        unset( $data['listId'] );

        foreach( $data as $key => $value ) {
            $parsed_data[$key] = adfoin_get_parsed_values( $value, $posted_data );
        }

        $parsed_data['list'] = $list_id;

        $return = adfoin_easysendy_request( 'subscriber/add', 'POST', $parsed_data, $record );
    }

    return;
}