<?php

add_filter( 'adfoin_action_providers', 'adfoin_insightlypro_actions', 10, 1 );

function adfoin_insightlypro_actions( $actions ) {

    $actions['insightlypro'] = array(
        'title' => __( 'Insightly [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'add_contact' => __( 'Create New Organization, Contact, Deal', 'advanced-form-integration' )
        )
    );

    return $actions;
}

function adfoin_insightlypro_js_fields( $field_data ) {}

add_action( 'adfoin_action_fields', 'adfoin_insightlypro_action_fields' );

function adfoin_insightlypro_action_fields() {
    ?>
    <script type="text/template" id="insightlypro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'add_contact'">
                <th scope="row">
                    <?php esc_attr_e( 'Contact Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'add_contact'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Owner', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[owner]" v-model="fielddata.owner">
                        <option value=""> <?php _e( 'Select Owner...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.ownerList" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': ownerLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>

    <?php
}

function adfoin_insightly_request( $endpoint, $method = 'GET', $data = array(), $record = array() ) {
    
        $api_keys = adfoin_insightly_get_keys();
    
        if( !$api_keys['key'] || !$api_keys['url'] ) {
            return array();
        }

        $api_url = explode( '.com', $api_keys['url'] )[0] . '.com';
    
        $url = $api_url . $endpoint;
    
        $headers = array(
            'Authorization' => 'Basic ' . base64_encode( $api_keys['key'] . ':' . '' ),
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json'
        );
    
        $args = array(
            'headers' => $headers,
            'timeout' => 30,
            'method'  => $method
        );
    
        if( 'POST' == $method || 'PUT' == $method ) {
            $args['body'] = json_encode( $data );
        }
    
        $response = wp_remote_request( $url, $args );
    
        if( $record ) {
            adfoin_add_to_log( $response, $url, $args, $record );
        }
    
        return $response;
    
}

add_action( 'wp_ajax_adfoin_get_insightlypro_all_fields', 'adfoin_get_insightlypro_all_fields', 10, 0 );

function adfoin_insightlypro_get_custom_fields() {
    $data = adfoin_insightly_request( '/v3.1/CustomFields/ALL' );

    if( is_wp_error( $data ) ) {
        return array();
    }

    $fields = json_decode( wp_remote_retrieve_body( $data ) );

    return $fields;
}

/*
 * Get Insightly data
 */
function adfoin_get_insightlypro_all_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $custom_fields  = adfoin_insightlypro_get_custom_fields();

    $com_fields = array(
        array( 'key' => 'com_name', 'value' => 'Name [Organization]', 'description' => 'Required only for creating a Company' ),
        array( 'key' => 'com_billingstreet', 'value' => 'Billing Street [Organization]', 'description' => '' ),
        array( 'key' => 'com_billingpostcode', 'value' => 'Billing Postcode [Organization]', 'description' => '' ),
        array( 'key' => 'com_billingstate', 'value' => 'Billing State [Organization]', 'description' => '' ),
        array( 'key' => 'com_billingcity', 'value' => 'Billing City [Organization]', 'description' => '' ),
        array( 'key' => 'com_billingcountry', 'value' => 'Billing Country [Organization]', 'description' => '' ),
        array( 'key' => 'com_shippingstreet', 'value' => 'Shipping Street [Organization]', 'description' => '' ),
        array( 'key' => 'com_shippingpostcode', 'value' => 'Shipping Postcode [Organization]', 'description' => '' ),
        array( 'key' => 'com_shippingstate', 'value' => 'Shipping State [Organization]', 'description' => '' ),
        array( 'key' => 'com_shippingcity', 'value' => 'Shipping City [Organization]', 'description' => '' ),
        array( 'key' => 'com_shippingcountry', 'value' => 'Shipping Country [Organization]', 'description' => '' ),
        array( 'key' => 'com_phone', 'value' => 'Phone [Organization]', 'description' => '' ),
        array( 'key' => 'com_fax', 'value' => 'Fax [Organization]', 'description' => '' ),
        array( 'key' => 'com_emaildomain', 'value' => 'Email Domain [Organization]', 'description' => '' ),
        array( 'key' => 'com_website', 'value' => 'Website [Organization]', 'description' => '' ),
        array( 'key' => 'com_linkedin', 'value' => 'LinkedIn [Organization]', 'description' => '' ),
        array( 'key' => 'com_facebook', 'value' => 'Facebook [Organization]', 'description' => '' ),
        array( 'key' => 'com_twitter', 'value' => 'Twitter [Organization]', 'description' => '' ),
        array( 'key' => 'com_background', 'value' => 'Background [Organization]', 'description' => '' ),
        array( 'key' => 'com_tags', 'value' => 'Tags [Organization]', 'description' => 'Use comma for multiple tags' ),
    );

    foreach( $custom_fields as $custom_field ) {
        if( 'ORGANISATION' == $custom_field->FIELD_FOR ) {
            array_push( $com_fields, array( 'key' => 'comcus_' . $custom_field->FIELD_NAME, 'value' => $custom_field->FIELD_LABEL . ' [Organization]', 'description' => '' ));
        }
    }

    $per_fields = array(
        array( 'key' => 'per_prefix', 'value' => 'Prefix [Contact]', 'description' => '' ),
        array( 'key' => 'per_firstname', 'value' => 'First Name [Contact]', 'description' => 'Required only for creating a Person' ),
        array( 'key' => 'per_lastname', 'value' => 'Last Name [Contact]', 'description' => '' ),
        array( 'key' => 'per_occupation', 'value' => 'Occupation [Contact]', 'description' => '' ),
        array( 'key' => 'per_email', 'value' => 'Email [Contact]', 'description' => '' ),
        array( 'key' => 'per_phone', 'value' => 'Phone [Contact]', 'description' => '' ),
        array( 'key' => 'per_homephone', 'value' => 'Home Phone [Contact]', 'description' => '' ),
        array( 'key' => 'per_mobilephone', 'value' => 'Mobile Phone [Contact]', 'description' => '' ),
        array( 'key' => 'per_fax', 'value' => 'Fax [Contact]', 'description' => '' ),
        array( 'key' => 'per_assistantname', 'value' => 'Assistant Name [Contact]', 'description' => '' ),
        array( 'key' => 'per_assistantphone', 'value' => 'Assistant Phone [Contact]', 'description' => '' ),
        array( 'key' => 'per_facebook', 'value' => 'Facebook [Contact]', 'description' => '' ),
        array( 'key' => 'per_linkedin', 'value' => 'LinkedIn [Contact]', 'description' => '' ),
        array( 'key' => 'per_twitter', 'value' => 'Twitter [Contact]', 'description' => '' ),
        array( 'key' => 'per_street', 'value' => 'Street [Contact]', 'description' => '' ),
        array( 'key' => 'per_city', 'value' => 'City [Contact]', 'description' => '' ),
        array( 'key' => 'per_state', 'value' => 'State [Contact]', 'description' => '' ),
        array( 'key' => 'per_postcode', 'value' => 'Post Code [Contact]', 'description' => '' ),
        array( 'key' => 'per_country', 'value' => 'Country [Contact]', 'description' => '' ),
        array( 'key' => 'per_dob', 'value' => 'Date Of Birth [Contact]', 'description' => '' ),
        array( 'key' => 'per_background', 'value' => 'Background [Contact]', 'description' => '' ),
        array( 'key' => 'per_tags', 'value' => 'Tags [Contact]', 'description' => 'Use comma for multiple tags' ),
    );

    foreach( $custom_fields as $custom_field ) {
        if( 'CONTACT' == $custom_field->FIELD_FOR ) {
            array_push( $per_fields, array( 'key' => 'percus_' . $custom_field->FIELD_NAME, 'value' => $custom_field->FIELD_LABEL . ' [Contact]', 'description' => '' ));
        }
    }

    $deal_fields = array(
        array( 'key' => 'deal_name', 'value' => 'Name [Opportunity]', 'description' => 'Required only for creating a Deal' ),
        array( 'key' => 'deal_description', 'value' => 'Description [Opportunity]', 'description' => '' ),
        array( 'key' => 'deal_closedate', 'value' => 'Close Date [Opportunity]', 'description' => '' ),
        // array( 'key' => 'deal_pipeline', 'value' => 'Pipeline_Stage ID [Opportunity]', 'description' => $pipelines ),
        array( 'key' => 'deal_value', 'value' => 'Value [Opportunity]', 'description' => '' ),
        array( 'key' => 'deal_winpercentage', 'value' => 'Win Percentage [Opportunity]', 'description' => '' )
    );

    foreach( $custom_fields as $custom_field ) {
        if( 'OPPORTUNITY' == $custom_field->FIELD_FOR ) {
            array_push( $deal_fields, array( 'key' => 'dealcus_' . $custom_field->FIELD_NAME, 'value' => $custom_field->FIELD_LABEL . ' [Opportunity]', 'description' => '' ));
        }
    }

    $final_data = array_merge( $com_fields, $per_fields, $deal_fields );

    wp_send_json_success( $final_data );
}

add_action( 'adfoin_insightlypro_job_queue', 'adfoin_insightlypro_job_queue', 10, 1 );

function adfoin_insightlypro_job_queue( $data ) {
    adfoin_insightlypro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Insightly API
 */
function adfoin_insightlypro_send_data( $record, $posted_data ) {
    $record_data = json_decode( $record["data"], true );

    if( array_key_exists( "cl", $record_data["action_data"] ) ) {
        if( $record_data["action_data"]["cl"]["active"] == "yes" ) {
            if( !adfoin_match_conditional_logic( $record_data["action_data"]["cl"], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data["field_data"];
    $task    = $record["task"];
    $owner   = $data["owner"];
    $com_id  = "";
    $per_id  = "";
    $deal_id = "";

    if( $task == "add_contact" ) {

        $holder       = array();
        $com_data     = array();
        $comcus_data  = array();
        $per_data     = array();
        $percus_data  = array();
        $deal_data    = array();
        $dealcus_data = array();

        foreach( $data as $key => $value ) {
            $holder[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );
        }

        foreach( $holder as $key => $value ) {
            if( substr( $key, 0, 4 ) == 'com_' && $value ) {
                $key = substr( $key, 4 );

                $com_data[$key] = $value;
            }

            if( substr( $key, 0, 7 ) == 'comcus_' && $value ) {
                $key = substr( $key, 7 );

                $comcus_data[$key] = $value;
            }

            if( substr( $key, 0, 4 ) == 'per_' && $value ) {
                $key = substr( $key, 4 );

                $per_data[$key] = $value;
            }

            if( substr( $key, 0, 7 ) == 'percus_' && $value ) {
                $key = substr( $key, 7 );

                $percus_data[$key] = $value;
            }

            if( substr( $key, 0, 5 ) == 'deal_' && $value ) {
                $key = substr( $key, 5 );

                $deal_data[$key] = $value;
            }

            if( substr( $key, 0, 8 ) == 'dealcus_' && $value ) {
                $key = substr( $key, 8 );

                $dealcus_data[$key] = $value;
            }
        }

        if( $com_data['name'] ) {
            $com_body = array(
                'ORGANISATION_NAME' => $com_data['name']
            );

            if( $owner ) { $com_body['OWNER_USER_ID'] = $owner; }
            if( isset( $com_data['background'] ) && $com_data['background'] ) { $com_body['BACKGROUND'] = $com_data['background']; }
            if( isset( $com_data['billingstreet'] ) && $com_data['billingstreet'] ) { $com_body['ADDRESS_BILLING_STREET'] = $com_data['billingstreet']; }
            if( isset( $com_data['billingpostcode'] ) && $com_data['billingpostcode'] ) { $com_body['ADDRESS_BILLING_POSTCODE'] = $com_data['billingpostcode']; }
            if( isset( $com_data['billingstate'] ) && $com_data['billingstate'] ) { $com_body['ADDRESS_BILLING_STATE'] = $com_data['billingstate']; }
            if( isset( $com_data['billingcity'] ) && $com_data['billingcity'] ) { $com_body['ADDRESS_BILLING_CITY'] = $com_data['billingcity']; }
            if( isset( $com_data['billingcountry'] ) && $com_data['billingcountry'] ) { $com_body['ADDRESS_BILLING_COUNTRY'] = $com_data['billingcountry']; }
            if( isset( $com_data['shippingstreet'] ) && $com_data['shippingstreet'] ) { $com_body['ADDRESS_SHIPPING_STREET'] = $com_data['shippingstreet']; }
            if( isset( $com_data['shippingpostcode'] ) && $com_data['shippingpostcode'] ) { $com_body['ADDRESS_SHIPPING_POSTCODE'] = $com_data['shippingpostcode']; }
            if( isset( $com_data['shippingstate'] ) && $com_data['shippingstate'] ) { $com_body['ADDRESS_SHIPPING_STATE'] = $com_data['shippingstate']; }
            if( isset( $com_data['shippingcity'] ) && $com_data['shippingcity'] ) { $com_body['ADDRESS_SHIPPING_CITY'] = $com_data['shippingcity']; }
            if( isset( $com_data['shippingcountry'] ) && $com_data['shippingcountry'] ) { $com_body['ADDRESS_SHIPPING_COUNTRY'] = $com_data['shippingcountry']; }
            if( isset( $com_data['phone'] ) && $com_data['phone'] ) { $com_body['PHONE'] = $com_data['phone']; }
            if( isset( $com_data['fax'] ) && $com_data['fax'] ) { $com_body['PHONE_FAX'] = $com_data['fax']; }
            if( isset( $com_data['emaildomain'] ) && $com_data['emaildomain'] ) { $com_body['EMAIL_DOMAIN'] = $com_data['emaildomain']; }
            if( isset( $com_data['website'] ) && $com_data['website'] ) { $com_body['WEBSITE'] = $com_data['website']; }
            if( isset( $com_data['linkedin'] ) && $com_data['linkedin'] ) { $com_body['SOCIAL_LINKEDIN'] = $com_data['linkedin']; }
            if( isset( $com_data['facebook'] ) && $com_data['facebook'] ) { $com_body['SOCIAL_FACEBOOK'] = $com_data['facebook']; }
            if( isset( $com_data['twitter'] ) && $com_data['twitter'] ) { $com_body['SOCIAL_TWITTER'] = $com_data['twitter']; }

            if( isset( $com_data['tags'] ) && $com_data['tags'] ) {
                $com_tags = explode( ',', $com_data['tags'] );
                $com_body['TAGS'] = array();

                foreach( $com_tags as $com_tag ) {
                    $com_body['TAGS'][] = array( 'TAG_NAME' => trim( $com_tag ) );
                }
            }

            if( $comcus_data ) {
                $com_body['CUSTOMFIELDS'] = array();

                foreach( $comcus_data as $comcus_key => $comcus_value ) {
                    array_push( $com_body['CUSTOMFIELDS'], array( 'FIELD_NAME' => $comcus_key, 'FIELD_VALUE' => $comcus_value ) );
                }
            }

            $exisiting_com = adfoin_insightly_organisation_exists( $com_data['name'] );

            if( isset( $exisiting_com['id'] ) ) {
                $com_id = $exisiting_com['id'];
                $com_body['ORGANISATION_ID'] = $com_id;

                $existing_tags = isset( $exisiting_com['data']['TAGS'] ) ? $exisiting_com['data']['TAGS'] : array();
                $com_body['TAGS'] = array_unique( array_merge( $com_body['TAGS'], $existing_tags ), SORT_REGULAR );
                $com_response = adfoin_insightly_request( '/v3.1/Organisations', 'PUT', $com_body, $record );
            } else {
                $com_response = adfoin_insightly_request( '/v3.1/Organisations', 'POST', $com_body, $record );
            }

            $com_response_body = json_decode( wp_remote_retrieve_body( $com_response ) );

            if( $com_response['response']['code'] == 200 ) {
                $com_id = $com_response_body->ORGANISATION_ID;
            }
        }

        if( $per_data['firstname'] ) {
            $per_body = array(
                'FIRST_NAME' => $per_data['firstname'],
            );

            $occupation = '';

            if( $owner ) { $per_body['OWNER_USER_ID'] = $owner; }
            if( $com_id ) { $per_body['ORGANISATION_ID'] = $com_id; }
            if( isset( $per_data['prefix'] ) && $per_data['prefix'] ) { $per_body['SALUTATION'] = $per_data['prefix']; }
            if( isset( $per_data['lastname'] ) && $per_data['lastname'] ) { $per_body['LAST_NAME'] = $per_data['lastname']; }
            if( isset( $per_data['occupation'] ) && $per_data['occupation'] ) { $occupation = $per_data['occupation'];}
            if( isset( $per_data['email'] ) && $per_data['email'] ) { $per_body['EMAIL_ADDRESS'] = $per_data['email']; }
            if( isset( $per_data['phone'] ) && $per_data['phone'] ) { $per_body['PHONE'] = $per_data['phone']; }
            if( isset( $per_data['homephone'] ) && $per_data['homephone'] ) { $per_body['PHONE_HOME'] = $per_data['homephone']; }
            if( isset( $per_data['mobilephone'] ) && $per_data['mobilephone'] ) { $per_body['PHONE_MOBILE'] = $per_data['mobilephone']; }
            if( isset( $per_data['fax'] ) && $per_data['fax'] ) { $per_body['PHONE_FAX'] = $per_data['fax']; }
            if( isset( $per_data['assistantname'] ) && $per_data['assistantname'] ) { $per_body['ASSISTANT_NAME'] = $per_data['assistantname']; }
            if( isset( $per_data['assistantphone'] ) && $per_data['assistantphone'] ) { $per_body['PHONE_ASSISTANT'] = $per_data['assistantphone']; }
            if( isset( $per_data['street'] ) && $per_data['street'] ) { $per_body['ADDRESS_MAIL_STREET'] = $per_data['street']; }
            if( isset( $per_data['city'] ) && $per_data['city'] ) { $per_body['ADDRESS_MAIL_CITY'] = $per_data['city']; }
            if( isset( $per_data['state'] ) && $per_data['state'] ) { $per_body['ADDRESS_MAIL_STATE'] = $per_data['state']; }
            if( isset( $per_data['postcode'] ) && $per_data['postcode'] ) { $per_body['ADDRESS_MAIL_POSTCODE'] = $per_data['postcode']; }
            if( isset( $per_data['country'] ) && $per_data['country'] ) { $per_body['ADDRESS_MAIL_COUNTRY'] = $per_data['country']; }
            if( isset( $per_data['dob'] ) && $per_data['dob'] ) { $per_body['DATE_OF_BIRTH'] = $per_data['dob']; }
            if( isset( $per_data['facebook'] ) && $per_data['facebook'] ) { $per_body['SOCIAL_FACEBOOK'] = $per_data['facebook']; }
            if( isset( $per_data['linkedin'] ) && $per_data['linkedin'] ) { $per_body['SOCIAL_LINKEDIN'] = $per_data['linkedin']; }
            if( isset( $per_data['twitter'] ) && $per_data['twitter'] ) { $per_body['SOCIAL_TWITTER'] = $per_data['twitter']; }
            if( isset( $per_data['background'] ) && $per_data['background'] ) { $per_body['BACKGROUND'] = $per_data['background']; }

            if( isset( $per_data['tags'] ) && $per_data['tags'] ) {
                $per_tags = explode( ',', $per_data['tags'] );
                $per_body['TAGS'] = array();

                foreach( $per_tags as $per_tag ) {
                    $per_body['TAGS'][] = array( 'TAG_NAME' => trim( $per_tag ) );
                }
            }

            if( $percus_data ) {
                $per_body['CUSTOMFIELDS'] = array();

                foreach( $percus_data as $percus_key => $percus_value ) {
                    array_push( $per_body['CUSTOMFIELDS'], array( 'FIELD_NAME' => $percus_key, 'FIELD_VALUE' => $percus_value ) );
                }
            }

            $existing_per = adfoin_insightly_person_exists( $per_data['email'] );

            if( isset( $existing_per['id'] ) ) {
                $per_body['CONTACT_ID'] = $existing_per['id'];
                $existing_per_tags = isset( $existing_per['data']['TAGS'] ) ? $existing_per['data']['TAGS'] : array();
                $per_body['TAGS'] = array_unique( array_merge( $per_body['TAGS'], $existing_per_tags ), SORT_REGULAR );
                $per_response = adfoin_insightly_request( '/v3.1/Contacts', 'PUT', $per_body, $record );
            } else {
                $per_response = adfoin_insightly_request( '/v3.1/Contacts', 'POST', $per_body, $record );
            }

            $per_response_body = json_decode( wp_remote_retrieve_body( $per_response ) );

            if( $per_response['response']['code'] == 200 ) {
                $per_id = $per_response_body->CONTACT_ID;
            }

            if( $com_id && $per_id && $occupation ) {
                $link_body = array(
                        "ROLE" => $occupation,
                        "OBJECT_NAME"=> "Organisation",
                        "OBJECT_ID" => $com_id,
                        "LINK_OBJECT_NAME" => "Contact",
                        "LINK_OBJECT_ID" => $per_id,
                        
                );

                $link_response = adfoin_insightly_request( '/v3.1/Organisations/' . $com_id . '/Links', 'POST', $link_body, $record );
                $link_response_body = json_decode( wp_remote_retrieve_body( $link_response ), true );

                if( $link_response['response']['code'] == 200 ) {
                    $link_id = $link_response_body['LINK_ID'];

                    if( null == $link_response_body['ROLE'] ) {
                        $link_body['LINK_ID'] = $link_id;
                        $link_response = adfoin_insightly_request( '/v3.1/Organisations/' . $com_id . '/Links/' . $link_id, 'PUT', $link_body, $record );
                    }
                }
            }
        }

        if( $deal_data['name'] ) {
            $deal_body = array(
                'OPPORTUNITY_NAME' => $deal_data['name']
            );

            if( $owner ) { 
                $deal_body['OWNER_USER_ID'] = $owner;
                $deal_body['RESPONSIBLE_USER_ID'] = $owner;
            }
            
            if( $com_id ) { $deal_body['ORGANISATION_ID'] = $com_id; }
            if( $per_id ) {  }

            if( isset( $deal_data['closedate'] ) && $deal_data['closedate'] ) { $deal_body['FORECAST_CLOSE_DATE'] = $deal_data['closedate']; }
            if( isset( $deal_data['description'] ) && $deal_data['description'] ) { $deal_body['OPPORTUNITY_DETAILS'] = $deal_data['description']; }
            if( isset( $deal_data['winpercentange'] ) && $deal_data['winpercentange'] ) { $deal_body['PROBABILITY'] = $deal_data['winpercentange']; }
            if( isset( $deal_data['value'] ) && $deal_data['value'] ) { $deal_body['OPPORTUNITY_VALUE'] = $deal_data['value']; }

            if( isset( $deal_data['tags'] ) && $deal_data['tags'] ) {
                $deal_tags = explode( ',', $deal_data['tags'] );
                $deal_body['TAGS'] = array();

                foreach( $deal_tags as $deal_tag ) {
                    $deal_body['TAGS'][] = array( 'TAG_NAME' => trim( $deal_tag ) );
                }
            }

            if( $dealcus_data ) {
                $deal_body['CUSTOMFIELDS'] = array();

                foreach( $dealcus_data as $dealcus_key => $dealcus_value ) {
                    array_push( $deal_body['CUSTOMFIELDS'], array( 'FIELD_NAME' => $dealcus_key, 'FIELD_VALUE' => $dealcus_value ) );
                }
            }

            $deal_response = adfoin_insightly_request( '/v3.1/Opportunities', 'POST', $deal_body, $record );
            $deal_resonse_body = json_decode( wp_remote_retrieve_body( $deal_response ) );

            if( $deal_response['response']['code'] == 200 ) {
                $deal_id = $deal_resonse_body->OPPORTUNITY_ID;
            }
        }
    }

    return;
}

function adfoin_insightly_organisation_exists( $name ) {
    $data = adfoin_insightly_request( "/v3.1/Organisations/Search?field_name=ORGANISATION_NAME&field_value={$name}" );

    if( is_wp_error( $data ) ) {
        return false;
    }

    $org = json_decode( wp_remote_retrieve_body( $data ), true );

    if( isset( $org[0], $org[0]['ORGANISATION_ID'] ) ){
        return array( 'id' => $org[0]['ORGANISATION_ID'], 'data' => $org[0] );
    }

    return false;
}

function adfoin_insightly_person_exists( $email ) {
    $data = adfoin_insightly_request( "/v3.1/Contacts/Search?field_name=EMAIL_ADDRESS&field_value={$email}" );

    if( is_wp_error( $data ) ) {
        return false;
    }

    $per = json_decode( wp_remote_retrieve_body( $data ), true );

    if( isset( $per[0], $per[0]['CONTACT_ID'] ) ){
        return array( 'id' => $per[0]['CONTACT_ID'], 'data' => $per[0] );
    }

    return false;
}