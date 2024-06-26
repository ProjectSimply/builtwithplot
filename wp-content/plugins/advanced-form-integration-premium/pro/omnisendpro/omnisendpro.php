<?php

add_filter( 'adfoin_action_providers', 'adfoin_omnisendpro_actions', 10, 1 );

function adfoin_omnisendpro_actions( $actions ) {

    $actions['omnisendpro'] = array(
        'title' => __( 'Omnisend [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'add_contact'   => __( 'Create New Contact', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_add_js_fields', 'adfoin_omnisendpro_js_fields', 10, 1 );

function adfoin_omnisendpro_js_fields( $field_data ) {}

add_action( 'adfoin_action_fields', 'adfoin_omnisendpro_action_fields' );

function adfoin_omnisendpro_action_fields() {
    ?>
    <script type="text/template" id="omnisendpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'add_contact'">
                <th scope="row">
                    <?php esc_attr_e( 'Contact Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>
            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>

            <tr valign="top" v-if="action.task == 'create_subscriber'">
                <th scope="row">
                    <?php esc_attr_e( 'Go Pro', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                    <span><?php printf( __( 'To unlock tags and custom fields consider <a href="%s">upgrading to Pro</a>.', 'advanced-form-integration' ), admin_url('admin.php?page=advanced-form-integration-settings-pricing') ); ?></span>
                </td>
            </tr>
        </table>
    </script>
    <?php
}

add_action( 'adfoin_omnisendpro_job_queue', 'adfoin_omnisendpro_job_queue', 10, 1 );

function adfoin_omnisendpro_job_queue( $data ) {
    adfoin_omnisendpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Omnisend API
 */
function adfoin_omnisendpro_send_data( $record, $posted_data ) {

    $api_token    = get_option( 'adfoin_omnisend_api_token' ) ? get_option( 'adfoin_omnisend_api_token' ) : '';

    if( !$api_token ) {
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

    $data = $record_data["field_data"];
    $task = $record["task"];

    if( $task == "add_contact" ) {
        $email      = empty( $data["email"] ) ? "" : adfoin_get_parsed_values( $data["email"], $posted_data );
        $first_name = empty( $data["firstName"] ) ? "" : adfoin_get_parsed_values( $data["firstName"], $posted_data );
        $last_name  = empty( $data["lastName"] ) ? "" : adfoin_get_parsed_values( $data["lastName"], $posted_data );
        $phone      = empty( $data["phone"] ) ? "" : adfoin_get_parsed_values( $data["phone"], $posted_data );
        $address    = empty( $data["address"] ) ? "" : adfoin_get_parsed_values( $data["address"], $posted_data );
        $city       = empty( $data["city"] ) ? "" : adfoin_get_parsed_values( $data["city"], $posted_data );
        $state      = empty( $data["state"] ) ? "" : adfoin_get_parsed_values( $data["state"], $posted_data );
        $zip        = empty( $data["zip"] ) ? "" : adfoin_get_parsed_values( $data["zip"], $posted_data );
        $country    = empty( $data["country"] ) ? "" : adfoin_get_parsed_values( $data["country"], $posted_data );
        $birthday   = empty( $data["birthday"] ) ? "" : adfoin_get_parsed_values( $data["birthday"], $posted_data );
        $gender     = empty( $data["gender"] ) ? "" : adfoin_get_parsed_values( $data["gender"], $posted_data );
        $tags       = empty( $data["tags"] ) ? "" : adfoin_get_parsed_values( $data["tags"], $posted_data );
        $cus_fields = empty( $data["customFields"] ) ? "" : adfoin_get_parsed_values( $data["customFields"], $posted_data );

        $url        = "https://api.omnisend.com/v3/contacts";

        $headers = array(
            "X-API-KEY"    => $api_token,
            "Content-Type" => "application/json"
        );

        $body = array(
            "firstName"   => $first_name,
            "lastName"    => $last_name,
            "address"     => $address,
            "city"        => $city,
            "state"       => $state,
            "postalCode"  => $zip,
            "country"     => $country,
        );

        if( $email ) {
            $body["identifiers"][] = array(
                "type"     => "email",
                "id"       => $email,
                "channels" => array(
                    "email" => array(
                        "status"     => "subscribed",
                        "statusDate" => date("c")
                    )
                )

            );
        }

        if( $phone ) {
            $body["identifiers"][] = array(
                "type"     => "phone",
                "id"       => $phone,
                "channels" => array(
                    "sms" => array(
                        "status"     => "subscribed",
                        "statusDate" => date("c")
                    )
                )

            );
        }

        if( $gender ) {
            $gender         = strtolower( $gender )[0] == "f" ? "f" : "m";
            $body["gender"] = $gender;
        }

        if( $birthday ) {
            $body["birthdate"] = $birthday;
        }

        if( $tags ) {
            $body["tags"] = array_map( 'trim', explode(',', $tags ) );
        }

        if( $cus_fields ) {
            $cus_fields = array_map( 'trim', explode('|', $cus_fields ) );

            foreach( $cus_fields as $single ) {
                $parts = array_map( 'trim', explode('=', $single, 2 ) );
                $body["customProperties"][$parts[0]] = $parts[1];
            }
        }

        $body = array_filter( $body );

        $args = array(
            "headers" => $headers,
            "body"    => json_encode( $body, true )
        );

        $response = wp_remote_post( $url, $args );

        adfoin_add_to_log( $response, $url, $args, $record );
    }

    return;
}