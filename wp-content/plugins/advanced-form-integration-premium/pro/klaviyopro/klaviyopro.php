<?php

add_filter( 'adfoin_action_providers', 'adfoin_klaviyopro_actions', 10, 1 );

function adfoin_klaviyopro_actions( $actions ) {

    $actions['klaviyopro'] = array(
        'title' => __( 'Klaviyo [Pro]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe' => __( 'Subscribe To List', 'advanced-form-integration' ),
            'track'     => __( 'Track Profile Activity (Beta)', 'advanced-form-integration' ),
            'identify'  => __( 'Identify Profile (Beta)', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_action( 'adfoin_add_js_fields', 'adfoin_klaviyopro_js_fields', 10, 1 );

function adfoin_klaviyopro_js_fields( $field_data ) {}

add_action( 'adfoin_action_fields', 'adfoin_klaviyopro_action_fields' );

function adfoin_klaviyopro_action_fields() {
    ?>
    <script type="text/template" id="klaviyopro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe' || action.task == 'identify'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" v-if="action.task == 'track'">
                <th scope="row">
                    <?php esc_attr_e( 'Track Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe' || action.task == 'track' || action.task == 'identify'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Klaviyo Account', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[credId]" v-model="fielddata.credId" @change="getLists">
                    <option value=""> <?php _e( 'Select Account...', 'advanced-form-integration' ); ?> </option>
                        <?php
                            adfoin_klaviyo_credentials_list();
                        ?>
                    </select>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Klaviyo List', 'advanced-form-integration' ); ?>
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

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Consent["sms"]', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[smsConsent]" value="true" v-model="fielddata.smsConsent">
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>
    <?php
}

/*
 * Klaviyo API Private Request
 */
function adfoin_klaviyo_public_request( $endpoint, $method = 'GET', $data = array(), $record = array(), $cred_id = '' ) {

    $api_token = get_option( 'adfoin_klaviyo_public_api_key' );

    $base_url = 'https://a.klaviyo.com/api/';
    $url      = $base_url . $endpoint;
    $data['token'] = $api_token;

    $args = array(
        'method'  => $method,
        'headers' => array(
            'Content-Type' => 'application/json',
            'Accept' => 'text/html'
        ),
    );

    if ('POST' == $method || 'PUT' == $method) {
        $args['body'] = json_encode($data);
    }

    $response = wp_remote_request($url, $args);

    if ($record) {
        adfoin_add_to_log($response, $url, $args, $record);
    }

    return $response;
}

function adfoin_klaviyo_sms_subscribe( $list_id, $phone_number, $record, $cred_id ) {
    $email_data = array(
        'data' => array(
            'type' => 'profile-subscription-bulk-create-job',
            'attributes' => array(
                'profiles' => array(
                    'data' => array(
                        array(
                            'type' => 'profile',
                            'attributes' => array(
                                'phone_number' => $phone_number,
                                'subscriptions' => array(
                                    'sms' => array(
                                        'marketing' => array(
                                            'consent' => 'SUBSCRIBED',
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            'relationships' => array(
                'list' => array(
                    'data' => array(
                        'id' => $list_id,
                        'type' => 'list'
                    )
                )
            )
        )
    );

    $result = adfoin_klaviyo_private_request_20240215( 'profile-subscription-bulk-create-jobs/', 'POST', $email_data, $record, $cred_id );

    return $result;

}

add_action( 'adfoin_klaviyopro_job_queue', 'adfoin_klaviyopro_job_queue', 10, 1 );

function adfoin_klaviyopro_job_queue( $data ) {
    adfoin_klaviyopro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Klaviyo API
 */
function adfoin_klaviyopro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data['field_data'];
    $list_id = isset( $data['listId'] ) ? $data['listId'] : '';
    $cred_id = isset( $data['credId'] ) ? $data['credId'] : '';
    $task    = $record['task'];

    if( $task == 'subscribe' ) {
        $email         = empty( $data['email'] ) ? '' : trim( adfoin_get_parsed_values( $data['email'], $posted_data ) );
        $custom_fields = empty( $data['customFields'] ) ? '' : $data['customFields'];
        // $email_consent = $data['emailConsent'];
        $sms_consent   = $data['smsConsent'];

        $profile = array(
            'email' => trim( $email )
        );

        if( isset( $data['firstName'] ) && $data['firstName'] ) { $profile['first_name'] = adfoin_get_parsed_values( $data['firstName'], $posted_data ); }
        if( isset( $data['lastName'] ) && $data['lastName'] ) { $profile['last_name'] = adfoin_get_parsed_values( $data['lastName'], $posted_data ); }
        if( isset( $data['title'] ) && $data['title'] ) { $profile['title'] = adfoin_get_parsed_values( $data['title'], $posted_data ); }
        if( isset( $data['organization'] ) && $data['organization'] ) { $profile['organization'] = adfoin_get_parsed_values( $data['organization'], $posted_data ); }
        if( isset( $data['externalId'] ) && $data['externalId'] ) { $profile['external_id'] = adfoin_get_parsed_values( $data['externalId'], $posted_data ); }
        $source = isset( $data['source'] ) && $data['source'] ? adfoin_get_parsed_values( $data['source'], $posted_data ) : '';
        $ip = isset( $data['ip'] ) && $data['ip'] ? adfoin_get_parsed_values( $data['ip'], $posted_data ) : '';

        if( isset( $data['phoneNumber'] ) && $data['phoneNumber'] ) {
            $phone_number = preg_replace('/[^0-9+]/','',adfoin_get_parsed_values( $data['phoneNumber'], $posted_data ) );

            if( strlen( $phone_number ) > 7 ) {
                $profile['phone_number'] = $phone_number;
            }
        }

        $subscriber_data = array(
            'data' => array(
                'type' => 'profile',
                'attributes' => $profile
            )
        );

        $address = array(
            'address1' => adfoin_get_parsed_values( $data['address1'], $posted_data ),
            'address2' => adfoin_get_parsed_values( $data['address2'], $posted_data ),
            'city'     => adfoin_get_parsed_values( $data['city'], $posted_data ),
            'region'   => adfoin_get_parsed_values( $data['region'], $posted_data ),
            'country'  => adfoin_get_parsed_values( $data['country'], $posted_data ),
            'zip'      => adfoin_get_parsed_values( $data['zip'], $posted_data ),
            'latitude' => adfoin_get_parsed_values( $data['latitude'], $posted_data ),
            'longitude' => adfoin_get_parsed_values( $data['longitude'], $posted_data ),
            'timezone' => adfoin_get_parsed_values( $data['timezone'], $posted_data ),
            'ip'       => $ip ? $ip : ''
        );

        $address = array_filter( $address );

        if( !empty( $address ) ) {
            $subscriber_data['data']['attributes']['location'] = $address;
        }

        if( $custom_fields ) {
            $holder = array();
            $custom_fields_array = array();

            if( strpos( $custom_fields, '||' ) !== false ) {
                $holder = explode( '||', $custom_fields );
            } else {
                $holder = explode( ',', $custom_fields );
            }

            foreach( $holder as $single ) {
                if( strpos( $single, '=' ) !== false ) {
                    list( $field_key, $field_value )= explode( '=', $single, 2 );
                    if( $field_key && $field_value ) {
                        $custom_fields_array[$field_key] = adfoin_get_parsed_values( $field_value, $posted_data );
                    }
                }
                
            }

            $custom_fields_array = array_filter( $custom_fields_array );

            if( !empty( $custom_fields_array ) ) {
                $subscriber_data['data']['attributes']['properties'] = $custom_fields_array;
            }
        }

        // if( 'true' == $sms_consent ) {
        //     $profile['sms_consent'] = True;
        // }

        $contact_id = adfoin_klaviyo_create_or_update_contact( $subscriber_data, $record, $cred_id );

        if( $contact_id && $email ) {
            adfoin_klaviyo_email_subscribe( $list_id, $email, $record, $cred_id, $source );
        }

        if( 'true' == $sms_consent && $contact_id && isset( $profile['phone_number'] ) ) {
            adfoin_klaviyo_sms_subscribe( $list_id, $profile['phone_number'], $record, $cred_id, $source );
        }
    }

    if( $task == 'track' ) {
        $event = empty( $data['event'] ) ? '' : adfoin_get_parsed_values( $data['event'], $posted_data );

        $track_data = array(
            'event' => $event
        );

        if( isset( $data['time'] ) && $data['time'] ) { $track_data['time'] = adfoin_get_parsed_values( $data['time'], $posted_data ); }

        $track_data['customer_properties'] = array();

        if( isset( $data['email'] ) && $data['email'] ) { $track_data['customer_properties']['$email'] = trim( adfoin_get_parsed_values( $data['email'], $posted_data ) ); }
        if( isset( $data['firstName'] ) && $data['firstName'] ) { $track_data['customer_properties']['$first_name'] = adfoin_get_parsed_values( $data['firstName'], $posted_data ); }
        if( isset( $data['lastName'] ) && $data['lastName'] ) { $track_data['customer_properties']['$last_name'] = adfoin_get_parsed_values( $data['lastName'], $posted_data ); }
        if( isset( $data['phoneNumber'] ) && $data['phoneNumber'] ) { $track_data['customer_properties']['$phone_number'] = adfoin_get_parsed_values( $data['phoneNumber'], $posted_data ); }
        if( isset( $data['city'] ) && $data['city'] ) { $track_data['customer_properties']['$city'] = adfoin_get_parsed_values( $data['city'], $posted_data ); }
        if( isset( $data['region'] ) && $data['region'] ) { $track_data['customer_properties']['$region'] = adfoin_get_parsed_values( $data['region'], $posted_data ); }
        if( isset( $data['country'] ) && $data['country'] ) { $track_data['customer_properties']['$country'] = adfoin_get_parsed_values( $data['country'], $posted_data ); }
        if( isset( $data['zip'] ) && $data['zip'] ) { $track_data['customer_properties']['$zip'] = adfoin_get_parsed_values( $data['zip'], $posted_data ); }
        if( isset( $data['image'] ) && $data['image'] ) { $track_data['customer_properties']['$image'] = adfoin_get_parsed_values( $data['image'], $posted_data ); }
        if( isset( $data['consent'] ) && $data['consent'] ) {
            $track_data['customer_properties']['$consent'] = array_map( 'trim', explode(',', $data['consent'] ) );
        }

        if( isset( $data['cus_prop'] ) && $data['cus_prop'] ) {

            $holder = explode( '||', $data['cus_prop'] );

            foreach( $holder as $single ) {
                if( strpos( $single, '=' ) !== false ) {
                    $single = explode( '=', $single, 2 );
                    $track_data['customer_properties'][$single[0]] = adfoin_get_parsed_values( $single[1], $posted_data );
                }
            }
        }

        if( !$track_data['customer_properties'] ) {
            $track_data['customer_properties'] = null;
        }

        $track_data['properties'] = array();

        if( isset( $data['eventId'] ) && $data['eventId'] ) { $track_data['properties']['$event_id'] = adfoin_get_parsed_values( $data['eventId'], $posted_data ); }
        if( isset( $data['value'] ) && $data['value'] ) { $track_data['properties']['$value'] = adfoin_get_parsed_values( $data['value'], $posted_data ); }

        if( isset( $data['prop'] ) && $data['prop'] ) {

            $holder2 = explode( '||', $data['prop'] );

            foreach( $holder2 as $single2 ) {
                if( strpos( $single2, '=' ) !== false ) {
                    $single2                       = explode( '=', $single2, 2 );
                    $track_data['properties'][$single2[0]] = adfoin_get_parsed_values( $single2[1], $posted_data );
                }
            }
        }

        if( !$track_data['properties'] ) {
            $track_data['properties'] = null;
        }

        $return = adfoin_klaviyo_public_request( 'track', 'POST', $track_data, $record );

    }

    if( $task == 'identify' ) {

        $properties = array();

        if( isset( $data['email'] ) && $data['email'] ) { $properties['$email'] = trim( adfoin_get_parsed_values( $data['email'], $posted_data ) ); }
        if( isset( $data['firstName'] ) && $data['firstName'] ) { $properties['$first_name'] = adfoin_get_parsed_values( $data['firstName'], $posted_data ); }
        if( isset( $data['lastName'] ) && $data['lastName'] ) { $properties['$last_name'] = adfoin_get_parsed_values( $data['lastName'], $posted_data ); }
        if( isset( $data['phoneNumber'] ) && $data['phoneNumber'] ) { $properties['$phone_number'] = adfoin_get_parsed_values( $data['phoneNumber'], $posted_data ); }
        if( isset( $data['city'] ) && $data['city'] ) { $properties['$city'] = adfoin_get_parsed_values( $data['city'], $posted_data ); }
        if( isset( $data['region'] ) && $data['region'] ) { $track_data['customer_properties']['$region'] = adfoin_get_parsed_values( $data['region'], $posted_data ); }
        if( isset( $data['country'] ) && $data['country'] ) { $properties['$country'] = adfoin_get_parsed_values( $data['country'], $posted_data ); }
        if( isset( $data['zip'] ) && $data['zip'] ) { $properties['$zip'] = adfoin_get_parsed_values( $data['zip'], $posted_data ); }
        if( isset( $data['image'] ) && $data['image'] ) { $properties['$image'] = adfoin_get_parsed_values( $data['image'], $posted_data ); }
        if( isset( $data['consent'] ) && $data['consent'] ) {
            $properties['$consent'] = array_map( 'trim', explode(',', $data['consent'] ) );
        }

        if( $properties ) {
            $identify_data['properties'] = $properties;
            $return = adfoin_klaviyo_public_request( 'identify', 'POST', $identify_data, $record );
        }
    }

    return;
}

