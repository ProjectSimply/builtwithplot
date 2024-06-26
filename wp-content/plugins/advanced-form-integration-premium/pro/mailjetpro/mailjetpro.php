<?php

add_filter( 'adfoin_action_providers', 'adfoin_mailjetpro_actions', 10, 1 );

function adfoin_mailjetpro_actions( $actions ) {

    $actions['mailjetpro'] = array(
        'title' => __( 'Mailjet [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_mailjetpro_action_fields' );

function adfoin_mailjetpro_action_fields() {
    ?>
    <script type="text/template" id="mailjetpro-action-template">
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
                        <?php esc_attr_e( 'Mailjet List', 'advanced-form-integration' ); ?>
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

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>
    <?php
}

add_action( 'wp_ajax_adfoin_get_mailjetpro_fields', 'adfoin_get_mailjetpro_fields', 10, 0 );
/*
 * Get Mailjet subscriber fields
 */
function adfoin_get_mailjetpro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $data = adfoin_mailjet_request( 'contactmetadata?limit=1000' );

    if( is_wp_error( $data ) ) {
        wp_send_json_error();
    }

    $body         = json_decode( $data["body"] );
    $contact_meta = wp_list_pluck( $body->Data, 'Name', 'Name' );

    $contact_fields = array(
        array( 'key' => 'email', 'value' => 'Email', 'description' => '' ),
    );

    if( is_array( $contact_meta ) ) {
        foreach( $contact_meta as $meta ) {
            array_push( $contact_fields, array( 'key' => $meta, 'value' => $meta, 'description' => '' ) );
        }
    }

    wp_send_json_success( $contact_fields );
}

add_action( 'adfoin_mailjetpro_job_queue', 'adfoin_mailjetpro_job_queue', 10, 1 );

function adfoin_mailjetpro_job_queue( $data ) {
    adfoin_mailjetpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Mailjet API
 */
function adfoin_mailjetpro_send_data( $record, $posted_data ) {

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
        $list_id = $data["listId"];
        $email   = empty( $data["email"] ) ? "" : trim( adfoin_get_parsed_values( $data["email"], $posted_data ) );
        
        unset( $data['listId'] );
        unset( $data['email'] );

        $field_types = adfoin_mailjetpro_get_field_types();
        foreach( $data as $key => $value ) {
            if( $value ) {
                $parsed_data[$key] = adfoin_get_parsed_values( $value, $posted_data );

                if( $field_types[$key] == 'datetime' ) {
                    $timezone = wp_timezone();
                    $date     = date_create( $parsed_data[$key], $timezone );
                    $parsed_data[$key] = date_format( $date, 'c' );
                }
            }
        }

        $parsed_data = array_filter( $parsed_data );

        $cont_data = array(
            'Contacts' => array(
                array(
                    'Email'                   => $email,
                    'IsExcludedFromCampaigns' => false
                )
            ),
            'ContactsLists' => array(
                array(
                    'ListID' => $list_id,
                    'Action' => 'addforce'
                )
            )
        );

        if( $parsed_data ) {
            $cont_data['Contacts'][0]['Properties'] = $parsed_data;
        }

        $return = adfoin_mailjet_request( 'contact/managemanycontacts', 'POST', $cont_data, $record );
    }

    return;
}

function adfoin_mailjetpro_get_field_types() {
    $data         = adfoin_mailjet_request( 'contactmetadata?limit=1000' );
    $body         = json_decode( $data["body"] );
    $contact_meta = wp_list_pluck( $body->Data, 'Datatype', 'Name' );

    return $contact_meta;
}