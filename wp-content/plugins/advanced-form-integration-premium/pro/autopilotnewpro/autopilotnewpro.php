<?php

add_filter( 'adfoin_action_providers', 'adfoin_autopilotnewpro_actions', 10, 1 );

function adfoin_autopilotnewpro_actions( $actions ) {

    $actions['autopilotnewpro'] = array(
        'title' => __( 'Ortto [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Add/Update Person', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_autopilotnewpro_action_fields' );

function adfoin_autopilotnewpro_action_fields() {
    ?>
    <script type="text/template" id="autopilotnewpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Person Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
            
        </table>
    </script>
    <?php
}

add_action( 'wp_ajax_adfoin_get_autopilotnewpro_fields', 'adfoin_get_autopilotnewpro_fields', 10, 0 );

/*
 * Get Ortto List merge fields
 */
function adfoin_get_autopilotnewpro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $fields  = array(
        array( 'key' => 'email', 'value' => 'Email', 'description' => '' ),
        array( 'key' => 'firstName', 'value' => 'First Name', 'description' => '' ),
        array( 'key' => 'lastName', 'value' => 'Last Name', 'description' => '' ),
        array( 'key' => 'phoneNumber', 'value' => 'Phone Number', 'description' => '' ),
        array( 'key' => 'city', 'value' => 'City', 'description' => '' ),
        array( 'key' => 'country', 'value' => 'Country', 'description' => '' ),
        array( 'key' => 'region', 'value' => 'Region', 'description' => '' ),
        array( 'key' => 'postalCode', 'value' => 'Postal Code', 'description' => '' ),
        array( 'key' => 'externalId', 'value' => 'External ID', 'description' => 'A string whose value is any ID used to uniquely identify this person.' ),
        array( 'key' => 'gdpr', 'value' => 'GDPR', 'description' => 'true|false' ),
        array( 'key' => 'emailPermission', 'value' => 'Email Permission', 'description' => 'true|false' ),
        array( 'key' => 'smsPermission', 'value' => 'SMS Permission', 'description' => '' ),
        array( 'key' => 'language', 'value' => 'Language', 'description' => 'e.g. en|es|de' ),
        array( 'key' => 'tags', 'value' => 'Tags', 'description' => 'Put the tag name here, use comma for multiple tags.' ),
    );
    
    $data = adfoin_autopilotnew_request( 'person/custom-field/get', 'POST' );
    
    if( is_wp_error( $data ) ) {
        wp_send_json_error();
    }

    $body = json_decode( wp_remote_retrieve_body( $data ), true );

    if( isset( $body['fields'] ) && is_array( $body['fields'] ) ) {
        foreach( $body['fields'] as $field ) {
            array_push( $fields, array( 'key' => $field['field']['id'], 'value' => $field['field']['name'], 'description' => '' ) );
        }
    }

    wp_send_json_success( $fields );
}

add_action( 'adfoin_autopilotnewpro_job_queue', 'adfoin_autopilotnewpro_job_queue', 10, 1 );

function adfoin_autopilotnewpro_job_queue( $data ) {
    adfoin_autopilotnewpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to API
 */
function adfoin_autopilotnewpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data']) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data = $record_data['field_data'];
    $task = $record['task'];

    if( $task == 'subscribe' ) {
        $email             = empty( $data['email'] ) ? '' : adfoin_get_parsed_values( $data['email'], $posted_data );
        $first_name        = empty( $data['firstName'] ) ? '' : adfoin_get_parsed_values( $data['firstName'], $posted_data );
        $last_name         = empty( $data['lastName'] ) ? '' : adfoin_get_parsed_values( $data['lastName'], $posted_data );
        $phone             = empty( $data['phoneNumber'] ) ? '' : adfoin_get_parsed_values( $data['phoneNumber'], $posted_data );
        $city              = empty( $data['city'] ) ? '' : adfoin_get_parsed_values( $data['city'], $posted_data );
        $country           = empty( $data['country'] ) ? '' : adfoin_get_parsed_values( $data['country'], $posted_data );
        $region            = empty( $data['region'] ) ? '' : adfoin_get_parsed_values( $data['region'], $posted_data );
        $postal_code       = empty( $data['postalCode'] ) ? '' : adfoin_get_parsed_values( $data['postalCode'], $posted_data );
        $external_id       = empty( $data['externalId'] ) ? '' : adfoin_get_parsed_values( $data['externalId'], $posted_data );
        $gdpr              = empty( $data['gdpr'] ) ? '' : adfoin_get_parsed_values( $data['gdpr'], $posted_data );
        $email_permissoin  = empty( $data['emailPermission'] ) ? '' : adfoin_get_parsed_values( $data['emailPermission'], $posted_data );
        $sms_permissoin    = empty( $data['smsPermission'] ) ? '' : adfoin_get_parsed_values( $data['smsPermission'], $posted_data );
        $langualge         = empty( $data['language'] ) ? '' : adfoin_get_parsed_values( $data['language'], $posted_data );
        $tags              = empty( $data['tags'] ) ? '' : adfoin_get_parsed_values( $data['tags'], $posted_data );
        $custom_fields_dep = empty( $data['customFields'] ) ? '' : adfoin_get_parsed_values( $data['customFields'], $posted_data );
        $custom_fields     = array();
        
        $person_data = array(
            'people' => array(
                array(
                    'fields' => array(
                        'str::email' => trim( $email )
                    )
                )
            ),
            'async' => false,
            'merge_by' => array( 'str::email' ),
            'merge_strategy' => 2,
            'find_strategy' => 0
        );

        if( $first_name ) { $person_data['people'][0]['fields']['str::first'] = $first_name; }
        if( $last_name ) { $person_data['people'][0]['fields']['str::last'] = $last_name; }
        if( $city ) { $person_data['people'][0]['fields']['geo::city'] = array( 'name' => $city ); }
        if( $country ) { $person_data['people'][0]['fields']['geo::country'] = array( 'name' => $country ); }
        if( $region ) { $person_data['people'][0]['fields']['geo::region'] = array( 'name' => $region ); }
        if( $postal_code ) { $person_data['people'][0]['fields']['str::postal'] = $postal_code; }
        if( $external_id ) { $person_data['people'][0]['fields']['str::ei'] = $external_id; }
        if( $langualge ) { $person_data['people'][0]['fields']['str::language'] = $langualge; }
        if( $tags ) { $person_data['people'][0]['tags'] = explode( ',', $tags ); }

        if( $phone ) {
            $phone       = preg_replace( '/[^0-9]+/', '', $phone );
            $phone       = ltrim( $phone, '0' );
            $phoneLength = strlen( $phone );

            if( $phoneLength <= 10 ) {
                if( substr( $phone, 0, 2 ) == '45' ) {
                    $country = substr( $phone, 0, 2 );
                    $local   = substr( $phone, 2 );
                }
            } else {
                $local   = substr( $phone, -10 );
                $country = substr( $phone, 0, -10 );
            }

            $person_data['people'][0]['fields']['phn::phone'] = array( 'c' => $country, 'n' => $local );
        }

        if( $custom_fields_dep ) {
            $holder = explode( '||', $custom_fields_dep );

            foreach( $holder as $single ) {
                if( strpos( $single, '=' ) !== false ) {
                    $single = explode( '=', $single, 2 );
                    $person_data['people'][0]['fields'][$single[0]] = $single[1];
                }
                
            }
        }

        if( $gdpr ) {
            $gdpr = $gdpr == 'true' ? true : false;
            $person_data['people'][0]['fields']['bol::gdpr'] = $gdpr;
        }

        if( $email_permissoin ) {
            $email_permissoin = $email_permissoin == 'true' ? true : false;
            $person_data['people'][0]['fields']['bol::p'] = $email_permissoin;
        }

        if( $sms_permissoin ) {
            $sms_permissoin = $sms_permissoin == 'true' ? true : false;
            $person_data['people'][0]['fields']['bol::sp'] = $sms_permissoin;
        }

        foreach( $data as $key => $value ) {
            if( strpos( $key, ':cm:' ) !== false ) {
                $value = adfoin_get_parsed_values( $value, $posted_data );

                if( strpos( $key, 'bol:cm:' ) !== false ) {
                    $value = $value == 'true' ? true : false;
                }

                if( strpos( $key, 'tme:cm:' ) !== false ) {
                    $timezone = wp_timezone();
                    $date     = date_create( $value, $timezone );
                    if( $date ) {
                        $value = date_format( $date, 'c' );
                    }
                }

                if( strpos( $key, 'int:cm:' ) !== false ) {
                    $value = is_numeric( $value ) ? strpos( $value, '.' ) !== false ? floatval( $value ) * 1000 : intval( $value ) : $value;
                }

                if( $value ){
                    $person_data['people'][0]['fields'][$key] = $value;
                }
            }
        }

        $return = adfoin_autopilotnew_request( 'person/merge', 'POST', $person_data, $record );
    }

    return;
}