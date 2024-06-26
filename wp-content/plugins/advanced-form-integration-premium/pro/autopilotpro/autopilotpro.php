<?php

add_filter( 'adfoin_action_providers', 'adfoin_autopilotpro_actions', 10, 1 );

function adfoin_autopilotpro_actions( $actions ) {

    $actions['autopilotpro'] = array(
        'title' => __( 'Autopilot [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Add/Update Contact', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_autopilotpro_action_fields' );

function adfoin_autopilotpro_action_fields() {
    ?>
    <script type="text/template" id="autopilotpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Contact Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Contact List', 'advanced-form-integration' ); ?>
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

add_action( 'adfoin_autopilotpro_job_queue', 'adfoin_autopilotpro_job_queue', 10, 1 );

function adfoin_autopilotpro_job_queue( $data ) {
    adfoin_autopilotpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to API
 */
function adfoin_autopilotpro_send_data( $record, $posted_data ) {

    $api_key = get_option( 'adfoin_autopilot_api_key' ) ? get_option( 'adfoin_autopilot_api_key' ) : "";

    if(!$api_key ) {
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

    $data = $record_data["field_data"];
    $task = $record["task"];

    if( $task == "subscribe" ) {
        $sequence_id       = $data["listId"];
        $email             = empty( $data["email"] ) ? "" : adfoin_get_parsed_values( $data["email"], $posted_data );
        $first_name        = empty( $data["firstName"] ) ? "" : adfoin_get_parsed_values( $data["firstName"], $posted_data );
        $last_name         = empty( $data["lastName"] ) ? "" : adfoin_get_parsed_values( $data["lastName"], $posted_data );
        $twitter           = empty( $data["twitter"] ) ? "" : adfoin_get_parsed_values( $data["twitter"], $posted_data );
        $salutation        = empty( $data["salutation"] ) ? "" : adfoin_get_parsed_values( $data["salutation"], $posted_data );
        $company           = empty( $data["company"] ) ? "" : adfoin_get_parsed_values( $data["company"], $posted_data );
        $numberofemployees = empty( $data["numberOfEmployees"] ) ? "" : adfoin_get_parsed_values( $data["numberOfEmployees"], $posted_data );
        $title             = empty( $data["title"] ) ? "" : adfoin_get_parsed_values( $data["title"], $posted_data );
        $industry          = empty( $data["industry"] ) ? "" : adfoin_get_parsed_values( $data["industry"], $posted_data );
        $phone             = empty( $data["phone"] ) ? "" : adfoin_get_parsed_values( $data["phone"], $posted_data );
        $mobilephone       = empty( $data["mobilePhone"] ) ? "" : adfoin_get_parsed_values( $data["mobilePhone"], $posted_data );
        $fax               = empty( $data["fax"] ) ? "" : adfoin_get_parsed_values( $data["fax"], $posted_data );
        $website           = empty( $data["website"] ) ? "" : adfoin_get_parsed_values( $data["website"], $posted_data );
        $mailingstreet     = empty( $data["mailingStreet"] ) ? "" : adfoin_get_parsed_values( $data["mailingStreet"], $posted_data );
        $mailingcity       = empty( $data["mailingCity"] ) ? "" : adfoin_get_parsed_values( $data["mailingCity"], $posted_data );
        $mailingstate      = empty( $data["mailingState"] ) ? "" : adfoin_get_parsed_values( $data["mailingState"], $posted_data );
        $mailingpostalcode = empty( $data["mailingPostalCode"] ) ? "" : adfoin_get_parsed_values( $data["mailingPostalCode"], $posted_data );
        $mailingcountry    = empty( $data["mailingCountry"] ) ? "" : adfoin_get_parsed_values( $data["mailingCountry"], $posted_data );
        $leadsource        = empty( $data["leadSource"] ) ? "" : adfoin_get_parsed_values( $data["leadSource"], $posted_data );
        $status            = empty( $data["status"] ) ? "" : adfoin_get_parsed_values( $data["status"], $posted_data );
        $linkedin          = empty( $data["linkedIn"] ) ? "" : adfoin_get_parsed_values( $data["linkedIn"], $posted_data );
        $notify            = empty( $data["notify"] ) ? "" : adfoin_get_parsed_values( $data["notify"], $posted_data );
        $custom_fields     = empty( $data["customFields"] ) ? "" : adfoin_get_parsed_values( $data["customFields"], $posted_data );
        $url               = "https://api2.autopilothq.com/v1/contact";

        $data = array(
            "contact" => array(
                "Email"             => $email,
                "FirstName"         => $first_name,
                "LastName"          => $last_name,
                "Twitter"           => $twitter,
                "Salutation"        => $salutation,
                "Company"           => $company,
                "NumberOfEmployees" => $numberofemployees,
                "Title"             => $title,
                "Industry"          => $industry,
                "Phone"             => $phone,
                "MobilePhone"       => $mobilephone,
                "Fax"               => $fax,
                "Website"           => $website,
                "MailingStreet"     => $mailingstreet,
                "MailingCity"       => $mailingcity,
                "MailingState"      => $mailingstate,
                "MailingPostalCode" => $mailingpostalcode,
                "MailingCountry"    => $mailingcountry,
                "LeadSource"        => $leadsource,
                "LinkedIn"          => $linkedin,
            )
        );

        $data = array_filter( $data );

        if( $sequence_id ) {
            $data["contact"]["_autopilot_list"] = $sequence_id;
        }

        if( $custom_fields ) {
            $holder = explode( "|", $custom_fields );

            foreach( $holder as $single ) {
                $single = explode( "=", $single, 2 );

                $data["contact"]["custom"][$single[0]] = $single[1];
            }
        }

        $args = array(

            'headers' => array(
                'Content-Type' => 'application/json',
                'autopilotapikey' => $api_key
            ),
            'body' => json_encode( $data )
        );

        $return = wp_remote_post( $url, $args );

        adfoin_add_to_log( $return, $url, $args, $record );
    }

    return;
}

