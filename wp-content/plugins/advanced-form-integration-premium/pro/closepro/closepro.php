<?php

add_filter( 'adfoin_action_providers', 'adfoin_closepro_actions', 10, 1 );

function adfoin_closepro_actions( $actions ) {

    $actions['closepro'] = array(
        'title' => __( 'Close [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'add_lead'   => __( 'Create New Lead', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_closepro_action_fields' );

function adfoin_closepro_action_fields() {
    ?>
    <script type="text/template" id="closepro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'add_lead'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                    <div class="spinner" v-bind:class="{'is-active': fieldsLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </th>
                <td scope="row">

                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>
    <?php
}

/*
 * Get Close custom fields
 */
function adfoin_closepro_get_custom_fields( $object ) {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $headers = adfoin_close_get_headers();

    if( !$headers['Authorization'] || !$object ) {
        exit;
    }

    $url = "https://api.close.com/api/v1/custom_field/{$object}";

    $args = array(
        "headers" => $headers
    );

    $data = wp_remote_get( $url, $args );

    if( is_wp_error( $data ) ) {
        wp_send_json_error();
    }

    $body          = json_decode( wp_remote_retrieve_body( $data ) );
    $custom_fields = wp_list_pluck( $body->data, 'name', 'id' );

    return $custom_fields;
}

add_action( 'wp_ajax_adfoin_get_closepro_all_fields', 'adfoin_get_closepro_all_fields', 10, 0 );

/*
 * Get Close fields
 */
function adfoin_get_closepro_all_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $headers = adfoin_close_get_headers();

    if( !$headers['Authorization'] ) {
        exit;
    }

    $lead_fields = array(
        array( 'key' => 'lead_name', 'value' => 'Name [Lead]', 'description' => 'Lead / Company / Organization (Required)' ),
        array( 'key' => 'lead_url', 'value' => 'URL [Lead]', 'description' => '' ),
        array( 'key' => 'lead_description', 'value' => 'Description [Lead]', 'description' => '' ),
        array( 'key' => 'lead_addresslabel', 'value' => 'Address Label [Lead]', 'description' => 'business, mailing, other' ),
        array( 'key' => 'lead_street1', 'value' => 'Street 1 [Lead]', 'description' => '' ),
        array( 'key' => 'lead_street2', 'value' => 'Street 2 [Lead]', 'description' => '' ),
        array( 'key' => 'lead_city', 'value' => 'City [Lead]', 'description' => '' ),
        array( 'key' => 'lead_state', 'value' => 'State [Lead]', 'description' => '' ),
        array( 'key' => 'lead_zip', 'value' => 'Zip [Lead]', 'description' => '' ),
        array( 'key' => 'lead_country', 'value' => 'Country [Lead]', 'description' => '' ),
        array( 'key' => 'lead_status', 'value' => 'Status [Lead]', 'description' => '' ),
    );

    $lead_cf = adfoin_closepro_get_custom_fields( 'lead' );

    if( $lead_cf ) {
        foreach( $lead_cf as $key => $value ) {
            array_push( $lead_fields, array( 'key' => 'lead_custom.' . $key, 'value' => $value . ' [Lead]', 'description' => '' ) );
        }
    }

    $cont_fields = array(
        array( 'key' => 'cont_name', 'value' => 'Name [Contact]', 'description' => '' ),
        array( 'key' => 'cont_title', 'value' => 'Title [Contact]', 'description' => '' ),
        array( 'key' => 'cont_officeemail', 'value' => 'Office Email [Contact]', 'description' => '' ),
        array( 'key' => 'cont_directemail', 'value' => 'Direct Email [Contact]', 'description' => '' ),
        array( 'key' => 'cont_homeeemail', 'value' => 'Home Email [Contact]', 'description' => '' ),
        array( 'key' => 'cont_otheremail', 'value' => 'Other Email [Contact]', 'description' => '' ),
        array( 'key' => 'cont_officephone', 'value' => 'Office Phone [Contact]', 'description' => '' ),
        array( 'key' => 'cont_directphone', 'value' => 'Direct Phone [Contact]', 'description' => '' ),
        array( 'key' => 'cont_mobilephone', 'value' => 'Mobile Phone [Contact]', 'description' => '' ),
        array( 'key' => 'cont_homephone', 'value' => 'Home Phone [Contact]', 'description' => '' ),
        array( 'key' => 'cont_faxphone', 'value' => 'Fax Phone [Contact]', 'description' => '' ),
        array( 'key' => 'cont_otherphone', 'value' => 'Other Phone [Contact]', 'description' => '' ),
    );

    $cont_cf = adfoin_closepro_get_custom_fields( 'contact' );

    if( $cont_cf ) {
        foreach( $cont_cf as $key => $value ) {
            array_push( $cont_fields, array( 'key' => 'cont_custom.' . $key, 'value' => $value . ' [Contact]', 'description' => '' ) );
        }
    }

    $deal_fields = array(
        array( 'key' => 'deal_status', 'value' => 'Status [Opportunity]', 'description' => '' ),
        array( 'key' => 'deal_note', 'value' => 'Note [Opportunity]', 'description' => '' ),
        array( 'key' => 'deal_confidence', 'value' => 'Confidence [Opportunity]', 'description' => '' ),
        array( 'key' => 'deal_value', 'value' => 'Value [Opportunity]', 'description' => '' ),
        array( 'key' => 'deal_value_period', 'value' => 'Value Period [Opportunity]', 'description' => '' ),
    );

    $deal_cf = adfoin_closepro_get_custom_fields( 'opportunity' );

    if( $deal_cf ) {
        foreach( $deal_cf as $key => $value ) {
            array_push( $deal_fields, array( 'key' => 'deal_custom.' . $key, 'value' => $value . ' [Opportunity]', 'description' => '' ) );
        }
    }

    $final_data = array_merge( $lead_fields, $cont_fields, $deal_fields );

    wp_send_json_success( $final_data );
}

add_action( 'adfoin_closepro_job_queue', 'adfoin_closepro_job_queue', 10, 1 );

function adfoin_closepro_job_queue( $data ) {
    adfoin_closepro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to closepro API
 */
function adfoin_closepro_send_data( $record, $posted_data ) {

    $headers = adfoin_close_get_headers();

    if( !$headers['Authorization'] ) {
        exit;
    }

    $record_data = json_decode( $record["data"], true );

    if( array_key_exists( "cl", $record_data["action_data"]) ) {
        if( $record_data["action_data"]["cl"]["active"] == "yes" ) {
            if( !adfoin_match_conditional_logic( $record_data["action_data"]["cl"], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data["field_data"];
    $task    = $record["task"];
    $owner   = $data["owner"];
    $lead_id = "";
    $cont_id = "";
    $deal_id = "";

    if( $task == "add_lead" ) {

        $holder    = array();
        $lead_data = array();
        $cont_data = array();
        $deal_data = array();

        foreach( $data as $key => $value ) {
            $holder[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );
        }

        foreach( $holder as $key => $value ) {
            if( substr( $key, 0, 5 ) == 'lead_' && $value ) {
                $key = substr( $key, 5 );

                $lead_data[$key] = $value;
            }

            if( substr( $key, 0, 5 ) == 'cont_' && $value ) {
                $key = substr( $key, 5 );

                $cont_data[$key] = $value;
            }

            if( substr( $key, 0, 5 ) == 'deal_' && $value ) {
                $key = substr( $key, 5 );

                $deal_data[$key] = $value;
            }
        }

        if( isset( $lead_data['name'] ) && $lead_data['name'] ) {

            $lead_id = adfoin_close_check_if_lead_exists( $lead_data['name'] );

            if( !$lead_id ) {
                $lead_url = "https://api.close.com/api/v1/lead/";

                $lead_body = array(
                    'name' => $lead_data['name'],
                    'addresses' => array()
                );

                if( isset( $lead_data['description'] ) && $lead_data['description'] ) { $lead_body['description'] = $lead_data['description']; }
                if( isset( $lead_data['url'] ) && $lead_data['url'] ) { $lead_body['url'] = $lead_data['url']; }
                if( isset( $lead_data['addresslabel'] ) && $lead_data['addresslabel'] ) { $lead_body['addresses'][0]['label'] = $lead_data['addresslabel']; }
                if( isset( $lead_data['street1'] ) && $lead_data['street1'] ) { $lead_body['addresses'][0]['address_1'] = $lead_data['street1']; }
                if( isset( $lead_data['street2'] ) && $lead_data['street2'] ) { $lead_body['addresses'][0]['address_2'] = $lead_data['street2']; }
                if( isset( $lead_data['city'] ) && $lead_data['city'] ) { $lead_body['addresses'][0]['city'] = $lead_data['city']; }
                if( isset( $lead_data['state'] ) && $lead_data['state'] ) { $lead_body['addresses'][0]['state'] = $lead_data['state']; }
                if( isset( $lead_data['zip'] ) && $lead_data['zip'] ) { $lead_body['addresses'][0]['zipcode'] = $lead_data['zip']; }
                if( isset( $lead_data['country'] ) && $lead_data['country'] ) { $lead_body['addresses'][0]['country'] = $lead_data['country']; }
                if( isset( $lead_data['status'] ) && $lead_data['status'] ) { $lead_body['status'] = $lead_data['status']; }

                foreach( $lead_data as $key => $value ) {
                    if( substr( $key, 0, 7 ) == 'custom.' ) {
                        $lead_body[$key] = $value;
                    }
                }

                $lead_args = array(
                    "headers" => $headers,
                    "body"    => json_encode( $lead_body )
                );
    
                $lead_response = wp_remote_post( $lead_url, $lead_args );
    
                adfoin_add_to_log( $lead_response, $lead_url, $lead_args, $record );
    
                $lead_body = json_decode( wp_remote_retrieve_body( $lead_response ) );
    
                if( $lead_response['response']['code'] == 200 ) {
                    $lead_id = $lead_body->id;
                }
            }

            if( isset( $cont_data['name'] ) && $cont_data['name'] ) {

                $cont_body = array(
                    'lead_id' => $lead_id,
                    'name'    => $cont_data['name'],
                    'phones'  => array(),
                    'emails'  => array(),
                    'urls'    => array(),
                );

                if( isset( $cont_data['title'] ) && $cont_data['title'] ) { $cont_body['title'] = $cont_data['title']; }

                if( isset( $cont_data['officeemail'] ) && $cont_data['officeemail'] ) {
                    array_push( $cont_body['emails'], array( 'type' => 'office', 'email' => $cont_data['officeemail'] ) );
                }

                if( isset( $cont_data['directemail'] ) && $cont_data['directemail'] ) {
                    array_push( $cont_body['emails'], array( 'type' => 'direct', 'email' => $cont_data['directemail'] ) );
                }

                if( isset( $cont_data['homeemail'] ) && $cont_data['homeemail'] ) {
                    array_push( $cont_body['emails'], array( 'type' => 'home', 'email' => $cont_data['homeemail'] ) );
                }

                if( isset( $cont_data['otheremail'] ) && $cont_data['otheremail'] ) {
                    array_push( $cont_body['emails'], array( 'type' => 'other', 'email' => $cont_data['otheremail'] ) );
                }

                if( isset( $cont_data['officephone'] ) && $cont_data['officephone'] ) {
                    array_push( $cont_body['phones'], array( 'type' => 'office', 'phone' => $cont_data['officephone'] ) );
                }

                if( isset( $cont_data['directphone'] ) && $cont_data['directphone'] ) {
                    array_push( $cont_body['phones'], array( 'type' => 'direct', 'phone' => $cont_data['directphone'] ) );
                }

                if( isset( $cont_data['mobilephone'] ) && $cont_data['mobilephone'] ) {
                    array_push( $cont_body['phones'], array( 'type' => 'mobile', 'phone' => $cont_data['mobilephone'] ) );
                }

                if( isset( $cont_data['faxphone'] ) && $cont_data['faxphone'] ) {
                    array_push( $cont_body['phones'], array( 'type' => 'fax', 'phone' => $cont_data['faxphone'] ) );
                }

                if( isset( $cont_data['otherphone'] ) && $cont_data['otherphone'] ) {
                    array_push( $cont_body['phones'], array( 'type' => 'other', 'phone' => $cont_data['otherphone'] ) );
                }

                foreach( $cont_data as $key => $value ) {
                    if( substr( $key, 0, 7 ) == 'custom.' ) {
                        $cont_body[$key] = $value;
                    }
                }

                $cont_url = "https://api.close.com/api/v1/contact/";

                $cont_args = array(
                    "headers" => $headers,
                    "body"    => json_encode( $cont_body )
                );
    
                $cont_response = wp_remote_post( $cont_url, $cont_args );
    
                adfoin_add_to_log( $cont_response, $cont_url, $cont_args, $record );
    
                $cont_body = json_decode( wp_remote_retrieve_body( $cont_response ) );
    
                if( $cont_response['response']['code'] == 200 ) {
                    $cont_id = $cont_body->id;
                }
            }

            if( isset( $deal_data['value'] ) && $deal_data['value'] ) {

                $deal_body = array(
                    'lead_id' => $lead_id
                );

                if( isset( $deal_data['value'] ) && $deal_data['value'] ) { $deal_body['value'] = intval( $deal_data['value'] ) * 100; }
                if( isset( $deal_data['value_period'] ) && $deal_data['value_period'] ) { $deal_body['value_period'] = $deal_data['value_period']; }
                if( isset( $deal_data['status'] ) && $deal_data['status'] ) { $deal_body['status'] = $deal_data['status']; }
                if( isset( $deal_data['note'] ) && $deal_data['note'] ) { $deal_body['note'] = $deal_data['note']; }
                if( isset( $deal_data['confidence'] ) && $deal_data['confidence'] ) { $deal_body['confidence'] = intval( $deal_data['confidence'] ); }

                foreach( $deal_data as $key => $value ) {
                    if( substr( $key, 0, 7 ) == 'custom.' ) {
                        $deal_body[$key] = $value;
                    }
                }

                $deal_url = "https://api.close.com/api/v1/opportunity/";

                $deal_args = array(
                    "headers" => $headers,
                    "body"    => json_encode( $deal_body )
                );
    
                $deal_response = wp_remote_post( $deal_url, $deal_args );
    
                adfoin_add_to_log( $deal_response, $deal_url, $deal_args, $record );
    
                $deal_body = json_decode( wp_remote_retrieve_body( $deal_response ) );
    
                if( $deal_response['response']['code'] == 200 ) {
                    $deal_id = $deal_body->id;
                }
            }
        }
    }

    return;
}