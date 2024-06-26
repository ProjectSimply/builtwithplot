<?php

add_filter( 'adfoin_action_providers', 'adfoin_mailblusterpro_actions', 10, 1 );

function adfoin_mailblusterpro_actions( $actions ) {

    $actions['mailblusterpro'] = array(
        'title' => __( 'MailBluster [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'add_contact' => __( 'Create New Lead', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_mailblusterpro_action_fields' );

function adfoin_mailblusterpro_action_fields() {
    ?>
    <script type="text/template" id="mailblusterpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'add_contact'">
                <th scope="row">
                    <?php esc_attr_e( 'Lead Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                    <div class="spinner" v-bind:class="{'is-active': fieldsLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'add_contact'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Double Opt-In', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[doptin]" value="true" v-model="fielddata.doptin">
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>            
        </table>
    </script>
    <?php
}

add_action( 'wp_ajax_adfoin_mailblusterpro_get_custom_fields', 'adfoin_mailblusterpro_get_custom_fields', 10, 0 );

/*
 * Get Custom fields
 */
function adfoin_mailblusterpro_get_custom_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    
    $return        = adfoin_mailbluster_request( 'fields' );
    $custom_fields = array();

    if( !is_wp_error( $return ) ) {
        $body = json_decode( wp_remote_retrieve_body( $return ), true );

        if( isset( $body['fields'] ) && is_array( $body['fields'] ) ) {
            foreach( $body['fields'] as $field ) {
                array_push( $custom_fields, array( 'key' => 'custom_' . $field['fieldMergeTag'], 'value' => $field['fieldLabel'], 'description' => '' ) );
            }
        }
    }

    array_push( $custom_fields, array( 'key' => 'tags', 'value' => 'Tags', 'description' => 'Use comma for multiple tags' ) );

    wp_send_json_success( $custom_fields );
}

add_action( 'adfoin_mailblusterpro_job_queue', 'adfoin_mailblusterpro_job_queue', 10, 1 );

function adfoin_mailblusterpro_job_queue( $data ) {
    adfoin_mailblusterpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to MailBluster API
 */
function adfoin_mailblusterpro_send_data( $record, $posted_data ) {

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

    if( $task == 'add_contact' ) {

        $basic_fields  = array();
        $custom_fields = array();
        $body          = array( 'subscribed' => true );
        $doptin        = isset( $data['doptin'] ) ? $data['doptin'] : '';

        unset( $data['doptin'] );

        if( isset( $data['tags'] ) ){
            $raw_tags = explode( ',', $data['tags'] );
            $tags = array();

            if( !empty( $raw_tags ) ) {
                foreach( $raw_tags as $raw_tag ) {
                    $parsed_tag = adfoin_get_parsed_values( trim( $raw_tag ), $posted_data );

                    if( $parsed_tag ) {
                        $tags[] = $parsed_tag;
                    }
                }
            }

            if( $tags ) {
                $body['tags'] = $tags;
            }

            unset( $data['tags'] );
        }
        

        foreach( $data as $key => $value ) {
            if( $value ) {

                if( substr( $key, 0, 7 ) == 'custom_' ) {
                    $custom_key = substr( $key, 7 );
                    $custom_fields[$custom_key] = adfoin_get_parsed_values( $value, $posted_data );
                }

                $basic_fields[$key] = adfoin_get_parsed_values( $value, $posted_data );
            }
        }

        $body = array_merge( $body, array_filter( $basic_fields ) );
        $custom_fields = array_filter( $custom_fields );

        if( !empty( $custom_fields ) ) {
            $body['fields'] = $custom_fields;
        }

        if( $doptin ) {
            $body['doubleOptIn'] = true;
        }

        $email_hash = md5( $body['email'] );

        if( adfoin_mailbluster_lead_exists( $email_hash ) ) {
            adfoin_mailbluster_request( 'leads/' . $email_hash, 'PUT', $body, $record );
        } else{
            adfoin_mailbluster_request( 'leads', 'POST', $body, $record );
        }
    }

    return;
}