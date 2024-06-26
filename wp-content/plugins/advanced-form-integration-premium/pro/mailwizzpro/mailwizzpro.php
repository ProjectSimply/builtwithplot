<?php

add_filter( 'adfoin_action_providers', 'adfoin_mailwizzpro_actions', 10, 1 );

function adfoin_mailwizzpro_actions( $actions ) {

    $actions['mailwizzpro'] = array(
        'title' => __( 'MailWizz [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_mailwizzpro_action_fields' );

function adfoin_mailwizzpro_action_fields() {
    ?>
    <script type="text/template" id="mailwizzpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
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
                        <?php esc_attr_e( 'List', 'advanced-form-integration' ); ?>
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

add_action( 'wp_ajax_adfoin_get_mailwizzpro_fields', 'adfoin_get_mailwizzpro_fields', 10, 0 );

/*
 * Get Mailchimp List merge fields
 */
function adfoin_get_mailwizzpro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $fields  = array();
    $page    = 1;
    $hasnext = true;
    $list_id = isset( $_POST['listId'] ) ? sanitize_text_field( $_POST['listId'] ) : '';

    do{
        $data = adfoin_mailwizz_request( "/lists/{$list_id}/fields?page={$page}&per_page=50" );

        if( is_wp_error( $data ) ) {
            wp_send_json_error();
        }

        $body = json_decode( wp_remote_retrieve_body( $data ), true );

        if( isset( $body['data']['records'] ) && is_array( $body['data']['records'] ) ) {
            foreach( $body['data']['records'] as $field ) {
                array_push( $fields, array( 'key' => $field['tag'], 'value' => $field['label'], 'description' => '' ) );
            }
        }

        if( $body['data']['next_page'] ) {
            $page = $body['data']['next_page'];
        }else{
            $hasnext = false;
        }
    } while( $hasnext );
    
    wp_send_json_success( $fields );
}

add_action( 'adfoin_mailwizzpro_job_queue', 'adfoin_mailwizzpro_job_queue', 10, 1 );

function adfoin_mailwizzpro_job_queue( $data ) {
    adfoin_mailwizzpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Mailwizz API
 */
function adfoin_mailwizzpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data = $record_data['field_data'];
    $task = $record['task'];

    if( $task == 'subscribe' ) {
        $list_id = $data['listId'];
        $body = array();

        unset( $data['listId'] );

        foreach( $data as $key => $value ) {
            $body[$key] = adfoin_get_parsed_values( $value, $posted_data );
        }

        $return = adfoin_mailwizz_request( '/lists/' . $list_id . '/subscribers', 'POST', $body, $record );
    }

    return;
}