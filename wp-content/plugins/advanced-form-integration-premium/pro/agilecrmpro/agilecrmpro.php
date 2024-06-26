<?php

add_filter( 'adfoin_action_providers', 'adfoin_agilecrmpro_actions', 10, 1 );

function adfoin_agilecrmpro_actions( $actions ) {

    $actions['agilecrmpro'] = array(
        'title' => __( 'Agile CRM [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'add_contact' => __( 'Create New Contact/Deal/Note', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_agilecrmpro_action_fields' );

function adfoin_agilecrmpro_action_fields() {
    ?>
    <script type="text/template" id="agilecrmpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'add_contact'">
                <th scope="row">
                    <?php esc_attr_e( 'Contact Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr class="alternate" v-if="action.task == 'add_contact'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'Instructions', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <p><?php _e('This task will create Contact, Deal & Note. Leave blank Deal & Note fields if not needed', 'advanced-form-integration' );?></p>
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>

        </table>
    </script>

    <?php
}

/*
 * Saves connection mapping
 */
function adfoin_agilecrmpro_save_integration() {
    $params = array();
    parse_str( adfoin_sanitize_text_or_array_field( $_POST['formData'] ), $params );

    $trigger_data = isset( $_POST["triggerData"] ) ? adfoin_sanitize_text_or_array_field( $_POST["triggerData"] ) : array();
    $action_data  = isset( $_POST["actionData"] ) ? adfoin_sanitize_text_or_array_field( $_POST["actionData"] ) : array();
    $field_data   = isset( $_POST["fieldData"] ) ? adfoin_sanitize_text_or_array_field( $_POST["fieldData"] ) : array();

    $integration_title = isset( $trigger_data["integrationTitle"] ) ? $trigger_data["integrationTitle"] : "";
    $form_provider_id  = isset( $trigger_data["formProviderId"] ) ? $trigger_data["formProviderId"] : "";
    $form_id           = isset( $trigger_data["formId"] ) ? $trigger_data["formId"] : "";
    $form_name         = isset( $trigger_data["formName"] ) ? $trigger_data["formName"] : "";
    $action_provider   = isset( $action_data["actionProviderId"] ) ? $action_data["actionProviderId"] : "";
    $task              = isset( $action_data["task"] ) ? $action_data["task"] : "";
    $type              = isset( $params["type"] ) ? $params["type"] : "";



    $all_data = array(
        'trigger_data' => $trigger_data,
        'action_data'  => $action_data,
        'field_data'   => $field_data
    );

    global $wpdb;

    $integration_table = $wpdb->prefix . 'adfoin_integration';

    if ( $type == 'new_integration' ) {

        $result = $wpdb->insert(
            $integration_table,
            array(
                'title'           => $integration_title,
                'form_provider'   => $form_provider_id,
                'form_id'         => $form_id,
                'form_name'       => $form_name,
                'action_provider' => $action_provider,
                'task'            => $task,
                'data'            => json_encode( $all_data, true ),
                'status'          => 1
            )
        );

    }

    if ( $type == 'update_integration' ) {

        $id = esc_sql( trim( $params['edit_id'] ) );

        if ( $type != 'update_integration' &&  !empty( $id ) ) {
            exit;
        }

        $result = $wpdb->update( $integration_table,
            array(
                'title'           => $integration_title,
                'form_provider'   => $form_provider_id,
                'form_id'         => $form_id,
                'form_name'       => $form_name,
                'data'            => json_encode( $all_data, true ),
            ),
            array(
                'id' => $id
            )
        );
    }

    if ( $result ) {
        wp_send_json_success();
    } else {
        wp_send_json_error();
    }
}

add_action( 'wp_ajax_adfoin_get_agilecrmpro_pipelines', 'adfoin_get_agilecrmpro_pipelines', 10, 0 );

function adfoin_get_agilecrmpro_pipelines() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $api_key    = get_option( 'adfoin_agilecrm_api_key' ) ? get_option( 'adfoin_agilecrm_api_key' ) : "";
    $user_email = get_option( 'adfoin_agilecrm_email' ) ? get_option( 'adfoin_agilecrm_email' ) : "";
    $subdomain  = get_option( 'adfoin_agilecrm_subdomain' ) ? get_option( 'adfoin_agilecrm_subdomain' ) : "";

    if( !$api_key || !$subdomain || !$user_email ) {
        exit;
    }

    $users     = "";
    $pipelines = "";
    $sources   = "";

    $args = array(
        "headers" => array(
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json',
            'Authorization' => 'Basic ' . base64_encode( $user_email . ':' . $api_key )
        )
    );

    $user_url = "https://{$subdomain}.agilecrm.com/dev/api/users";

    $user_response = wp_remote_get( $user_url, $args );

    adfoin_add_to_log( $user_response, $user_url, $args, array( "id" => "999" ) );

    if( !is_wp_error( $user_response ) ) {
        $user_body = json_decode( wp_remote_retrieve_body( $user_response ) );

        foreach( $user_body as $single ) {
            $users .= $single->name . ': ' . $single->id . ' ';
        }
    }

    $url = "https://{$subdomain}.agilecrm.com/dev/api/milestone/pipelines";

    $response = wp_remote_get( $url, $args );

    adfoin_add_to_log( $response, $url, $args, array( "id" => "999" ) );

    if( !is_wp_error( $response ) ) {
        $body = json_decode( wp_remote_retrieve_body( $response ) );

        foreach( $body as $single ) {
            $pipelines .= $single->name . ': ' . $single->id . ' ';
        }

        $deal_fields = array(
            array( 'key' => 'dealName', 'value' => 'Name [Deal]', 'description' => 'Required for Deal creation, otherwise leave blank' ),
            array( 'key' => 'dealValue', 'value' => 'Value [Deal]', 'description' => 'Required for Deal creation, otherwise leave blank' ),
            array( 'key' => 'dealProbability', 'value' => 'Probability [Deal]', 'description' => 'Integer value' ),
            array( 'key' => 'dealCloseDate', 'value' => 'Close Date [Deal]', 'description' => 'Use YYYY-MM-DD format' ),
            array( 'key' => 'dealSource', 'value' => 'Source ID [Deal]', 'description' => '' ),
            array( 'key' => 'dealDescription', 'value' => 'Description [Deal]', 'description' => '' ),
            array( 'key' => 'dealTrack', 'value' => 'Track/Pipeline ID [Deal]', 'description' => $pipelines ),
            array( 'key' => 'dealMilestone', 'value' => 'Milestone [Deal]', 'description' => 'Example: New, Prospect, Proposal, Won, Lost' ),
            array( 'key' => 'dealOwner', 'value' => 'Owner ID [Deal]', 'description' => $users ),
            array( 'key' => 'dealCustomFields', 'value' => 'Custom Fields [Deal]', 'description' => 'Use key=value format, example: Age=25. For multiple fields use double pipe, example: Age=25||Country=USA (without space)' ),
            array( 'key' => 'noteSubject', 'value' => 'Subject [Note]', 'description' => '' ),
            array( 'key' => 'noteDescription', 'value' => 'Description [Note]', 'description' => '' ),

        );

        wp_send_json_success( $deal_fields );
    }
}

add_action( 'adfoin_agilecrmpro_job_queue', 'adfoin_agilecrmpro_job_queue', 10, 1 );

function adfoin_agilecrmpro_job_queue( $data ) {
    adfoin_agilecrmpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Agile CRM API
 */
function adfoin_agilecrmpro_send_data( $record, $posted_data ) {

    $api_key    = get_option( 'adfoin_agilecrm_api_key' ) ? get_option( 'adfoin_agilecrm_api_key' ) : "";
    $user_email = get_option( 'adfoin_agilecrm_email' ) ? get_option( 'adfoin_agilecrm_email' ) : "";
    $subdomain  = get_option( 'adfoin_agilecrm_subdomain' ) ? get_option( 'adfoin_agilecrm_subdomain' ) : "";

    if( !$api_key || !$subdomain || !$user_email ) {
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

    $data       = $record_data["field_data"];
    $task       = $record["task"];
    $email      = empty( $data["email"] ) ? "" : adfoin_get_parsed_values( $data["email"], $posted_data );
    $first_name = empty( $data["firstName"] ) ? "" : adfoin_get_parsed_values( $data["firstName"], $posted_data );
    $last_name  = empty( $data["lastName"] ) ? "" : adfoin_get_parsed_values( $data["lastName"], $posted_data );
    $title      = empty( $data["title"] ) ? "" : adfoin_get_parsed_values( $data["title"], $posted_data );
    $company    = empty( $data["company"] ) ? "" : adfoin_get_parsed_values( $data["company"], $posted_data );
    $phone      = empty( $data["phone"] ) ? "" : adfoin_get_parsed_values( $data["phone"], $posted_data );
    $address    = empty( $data["address"] ) ? "" : adfoin_get_parsed_values( $data["address"], $posted_data );
    $city       = empty( $data["city"] ) ? "" : adfoin_get_parsed_values( $data["city"], $posted_data );
    $state      = empty( $data["state"] ) ? "" : adfoin_get_parsed_values( $data["state"], $posted_data );
    $zip        = empty( $data["zip"] ) ? "" : adfoin_get_parsed_values( $data["zip"], $posted_data );
    $country    = empty( $data["country"] ) ? "" : adfoin_get_parsed_values( $data["country"], $posted_data );
    $deal_name  = empty( $data["dealName"] ) ? "" : adfoin_get_parsed_values( $data["dealName"], $posted_data );
    $note_sub   = empty( $data["noteSubject"] ) ? "" : adfoin_get_parsed_values( $data["noteSubject"], $posted_data );
    $con_tags   = empty( $data["conTags"] ) ? "" : adfoin_get_parsed_values( $data["conTags"], $posted_data );
    $con_fields = empty( $data["conCustomFields"] ) ? "" : adfoin_get_parsed_values( $data["conCustomFields"], $posted_data );

    if( $task == "add_contact" ) {

        $headers = array(
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json',
            'Authorization' => 'Basic ' . base64_encode( $user_email . ':' . $api_key )
        );

        $body = array(
            "properties" => array(
                array(
                    "type"  => "SYSTEM",
                    "name"  => "first_name",
                    "value" => $first_name
                ),
                array(
                    "type"  => "SYSTEM",
                    "name"  => "last_name",
                    "value" => $last_name
                ),
                array(
                    "type"  => "SYSTEM",
                    "name"  => "email",
                    "value" => $email
                ),
                array(
                    "type"  => "SYSTEM",
                    "name"  => "title",
                    "value" => $title
                ),
                array(
                    "type"  => "SYSTEM",
                    "name"  => "company",
                    "value" => $company
                ),
                array(
                    "type"  => "SYSTEM",
                    "name"  => "phone",
                    "value" => $phone
                ),
                array(
                    "name"  => "address",
                    "value" => json_encode( array(
                        "address"     => $address,
                        "city"        => $city,
                        "state"       => $state,
                        "zip"         => $zip,
                        "countryname" => $country
                    ))
                )
            )
        );

        if( $con_tags ) {
            $body["tags"] = explode( ",", $con_tags );
        }

        if( $con_fields ) {
            if( strpos( $con_fields, "||" ) !== false ) {
                $holder = explode( "||", $con_fields );
            } else {
                $holder = explode( ",", $con_fields );
            }

            if( is_array( $holder ) ) {
                foreach( $holder as $single ) {
                    if( strpos( $single, "=" ) !== false ) {
                        $parts = explode( "=", $single );
                        array_push( $body["properties"], array( "type" => "CUSTOM", "name" => trim( $parts[0] ), "value" => trim( $parts[1] ) ) );
                    }
                }
            }
        }

        $contact_id = adfoin_agilecrm_check_if_contact_exists( $email, $headers, $subdomain );

        if( $contact_id ) {
            $url        = "https://{$subdomain}.agilecrm.com/dev/api/contacts/edit-properties";
            $method     = 'PUT';
            $body['id'] = $contact_id;
        } else{
            $url    = "https://{$subdomain}.agilecrm.com/dev/api/contacts";
            $method = 'POST';
        }

        $args = array(
            "headers" => $headers,
            "method"  => $method,
            "body"    => json_encode( $body )
        );

        $response = wp_remote_request( $url, $args );

        adfoin_add_to_log( $response, $url, $args, $record );

        if( !$contact_id ) {
            if( !is_wp_error( $response ) ) {
                $body = json_decode( wp_remote_retrieve_body( $response ) );
    
                if( !isset( $body->id ) ) {
                    return;
                }
            }
    
            $contact_id = $body->id;
        }

        if( $contact_id && $deal_name ) {
            $deal_name        = empty( $data["dealName"] ) ? "" : adfoin_get_parsed_values( $data["dealName"], $posted_data );
            $deal_value       = empty( $data["dealValue"] ) ? "" : adfoin_get_parsed_values( $data["dealValue"], $posted_data );
            $deal_probability = empty( $data["dealProbability"] ) ? "" : adfoin_get_parsed_values( $data["dealProbability"], $posted_data );
            $deal_close_date  = empty( $data["dealCloseDate"] ) ? "" : strtotime( adfoin_get_parsed_values( $data["dealCloseDate"], $posted_data ) );
            $deal_source      = empty( $data["dealSource"] ) ? "" : adfoin_get_parsed_values( $data["dealSource"], $posted_data );
            $deal_description = empty( $data["dealDescription"] ) ? "" : adfoin_get_parsed_values( $data["dealDescription"], $posted_data );
            $deal_track       = empty( $data["dealTrack"] ) ? "" : adfoin_get_parsed_values( $data["dealTrack"], $posted_data );
            $deal_milestone   = empty( $data["dealMilestone"] ) ? "" : adfoin_get_parsed_values( $data["dealMilestone"], $posted_data );
            $deal_owner       = empty( $data["dealOwner"] ) ? "" : adfoin_get_parsed_values( $data["dealOwner"], $posted_data );
            $deal_fields      = empty( $data["dealCustomFields"] ) ? "" : adfoin_get_parsed_values( $data["dealCustomFields"], $posted_data );

            $deal_url = "https://{$subdomain}.agilecrm.com/dev/api/opportunity";

            $deal_body = array(
                "name"           => $deal_name,
                "contact_ids"    => array( $contact_id ),
                "expected_value" => $deal_value,
                "owner_id"       => $deal_owner,
                "pipeline_id"    => $deal_track,
                "milestone"      => $deal_milestone,
                "description"    => $deal_description,
                "probability"    => intval( $deal_probability ),
                "close_date"     => $deal_close_date,
                "deal_source_id" => $deal_source,

            );

            if( $deal_fields ) {
                if( strpos( $deal_fields, "||" ) !== false ) {
                    $holder2 = explode( "||", $deal_fields );
                } else {
                    $holder2 = explode( ",", $deal_fields );
                }
    
                if( is_array( $holder2 ) ) {
                    $deal_body["custom_data"] = array();
                    foreach( $holder2 as $single ) {
                        if( strpos( $single, "=" ) !== false ) {
                            $parts = explode( "=", $single );
                            array_push( $deal_body["custom_data"], array( "name" => trim( $parts[0] ), "value" => trim( $parts[1] ) ) );
                        }
                    }
                }
            }

            $deal_args = array(
                "headers" => $headers,
                "body"    => json_encode( $deal_body )
            );

            $deal_response = wp_remote_post( $deal_url, $deal_args );

            adfoin_add_to_log( $deal_response, $deal_url, $deal_args, $record );
        }

        if( $contact_id && $note_sub ) {
            $note_desc = empty( $data["noteDescription"] ) ? "" : adfoin_get_parsed_values( $data["noteDescription"], $posted_data );

            $note_url = "https://{$subdomain}.agilecrm.com/dev/api/notes/";

            $note_args = array(
                "headers" => $headers,
                "body"    => json_encode( array(
                    "subject"     => $note_sub,
                    "description" => $note_desc,
                    "contact_ids" => array( $contact_id ),
                ) )
            );

            $note_response = wp_remote_post( $note_url, $note_args );

            adfoin_add_to_log( $note_response, $note_url, $note_args, $record );
        }

    }

    return;
}