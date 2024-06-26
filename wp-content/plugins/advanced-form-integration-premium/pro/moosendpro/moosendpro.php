<?php

add_filter( 'adfoin_action_providers', 'adfoin_moosendpro_actions', 10, 1 );

function adfoin_moosendpro_actions( $actions ) {

    $actions['moosendpro'] = array(
        'title' => __( 'Moosend [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_action( 'adfoin_add_js_fields', 'adfoin_moosendpro_js_fields', 10, 1 );

function adfoin_moosendpro_js_fields( $field_data ) {}

add_action( 'adfoin_action_fields', 'adfoin_moosendpro_action_fields' );

function adfoin_moosendpro_action_fields() {
    ?>
    <script type="text/template" id="moosendpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                <div class="spinner" v-bind:class="{'is-active': fieldLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Moosend List', 'advanced-form-integration' ); ?>
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

add_action( 'wp_ajax_adfoin_get_moosendpro_fields', 'adfoin_get_moosendpro_fields', 10, 0 );

/*
 * Get Moosend custom fields
 */
function adfoin_get_moosendpro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $list_id  = isset( $_POST['listId'] ) ? sanitize_text_field( $_POST['listId'] ) : '';
    $endpoint = "lists/{$list_id}/details.json";
    $data     = adfoin_moosend_request( $endpoint );
    $fields   = array();

    if( !is_wp_error( $data ) ) {
        $body  = json_decode( wp_remote_retrieve_body( $data ), true );
        
        if( isset( $body['Context'] ) && isset( $body['Context']['CustomFieldsDefinition'] ) ) {

            foreach( $body['Context']['CustomFieldsDefinition'] as $field ) {
                array_push( $fields, array( 'key' => 'custom__' . $field['Name'], 'value' => $field['Name'], 'description' => '' ) );
            }
        }
        
        wp_send_json_success( $fields );
    } else {
        wp_send_json_error();
    }
}

add_action( 'adfoin_moosendpro_job_queue', 'adfoin_moosendpro_job_queue', 10, 1 );

function adfoin_moosendpro_job_queue( $data ) {
    adfoin_moosendpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Moosend API
 */
function adfoin_moosendpro_send_data( $record, $posted_data ) {

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
        $email         = empty( $data['email'] ) ? '' : trim( adfoin_get_parsed_values( $data['email'], $posted_data ) );
        $cf            = empty( $data['customFields'] ) ? '' : $data['customFields'];
        $custom_fields = array();

        $subscriber = array(
            'email' => $email
        );

        if( $data['name'] ) { $subscriber['name'] = adfoin_get_parsed_values( $data['name'], $posted_data ); }
        if( $data['mobile'] ) { $subscriber['mobile'] = adfoin_get_parsed_values( $data['mobile'], $posted_data ); }

        if( $cf ) {
            $cf = explode( ',', $cf );
            $subscriber['customFields'] = array();
            
            foreach( $cf as $single ) {
                array_push( $subscriber['customFields'], adfoin_get_parsed_values( $single, $posted_data ) );
            }
        }

        foreach( $data as $key => $value ) {
            if( $value ) {
                if( substr( $key, 0, 8 ) == 'custom__' && $value ) {
                    $custom_key = substr( $key, 8 );
                    array_push(
                        $custom_fields,
                        $custom_key. '=' . adfoin_get_parsed_values( $value, $posted_data )
                    );
                    
                }
            }
        }

        if( $custom_fields ) {
            $subscriber['customFields'] = $custom_fields;
        }


        $return = adfoin_moosend_request( 'subscribers/' . $list_id . '/subscribe.json', 'POST', $subscriber, $record );
    }

    return;
}