<?php

add_filter( 'adfoin_action_providers', 'adfoin_copperpro_actions', 10, 1 );

function adfoin_copperpro_actions( $actions ) {

    $actions['copperpro'] = array(
        'title' => __( 'Copper [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'add_lead'    => __( 'Create New Lead', 'advanced-form-integration' ),
            'add_contact' => __( 'Create New Company, Person, Opportunity', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_add_js_fields', 'adfoin_copperpro_js_fields', 10, 1 );

function adfoin_copperpro_js_fields( $field_data ) {}

add_action( 'adfoin_action_fields', 'adfoin_copperpro_action_fields' );

function adfoin_copperpro_action_fields() {
    ?>
    <script type="text/template" id="copperpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'add_contact' || action.task == 'add_lead'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'add_contact' || action.task == 'add_lead'">
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

function adfoin_copperpro_get_custom_fields() {

    $data = adfoin_copper_request( 'custom_field_definitions', 'GET' );

    if( is_wp_error( $data ) ) {
        return array();
    }

    $fields = json_decode( wp_remote_retrieve_body( $data ) );

    return $fields;
}

add_action( 'wp_ajax_adfoin_get_copperpro_all_fields', 'adfoin_get_copperpro_all_fields', 10, 0 );

/*
 * Get Copper fields
 */
function adfoin_get_copperpro_all_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $contact_types  = adfoin_copper_get_contact_types();
    $pipelines      = adfoin_copper_get_pipelines();
    $sources        = adfoin_copper_get_sources();
    $custom_fields  = adfoin_copperpro_get_custom_fields();
    $ct_description = array();

    foreach( $contact_types as $contact_type ) {
        $ct_description[] = $contact_type->name . ': ' . $contact_type->id;
    }

    $com_fields = array(
        array( 'key' => 'com_name', 'value' => 'Name [Company]', 'description' => 'Required only for creating a Company' ),
        array( 'key' => 'com_workphone', 'value' => 'Work Phone [Company]', 'description' => '' ),
        array( 'key' => 'com_mobilephone', 'value' => 'Mobile Phone [Company]', 'description' => '' ),
        array( 'key' => 'com_homephone', 'value' => 'Home Phone [Company]', 'description' => '' ),
        array( 'key' => 'com_workwebsite', 'value' => 'Work Website [Company]', 'description' => '' ),
        array( 'key' => 'com_emaildomain', 'value' => 'Email Domain [Company]', 'description' => '' ),
        array( 'key' => 'com_linkedin', 'value' => 'LinkedIn [Company]', 'description' => '' ),
        array( 'key' => 'com_twitter', 'value' => 'Twitter [Company]', 'description' => '' ),
        array( 'key' => 'com_facebook', 'value' => 'Facebook [Company]', 'description' => '' ),
        array( 'key' => 'com_youtube', 'value' => 'Youtube [Company]', 'description' => '' ),
        array( 'key' => 'com_street', 'value' => 'Street [Company]', 'description' => '' ),
        array( 'key' => 'com_city', 'value' => 'City [Company]', 'description' => '' ),
        array( 'key' => 'com_state', 'value' => 'State [Company]', 'description' => '' ),
        array( 'key' => 'com_zip', 'value' => 'Zip [Company]', 'description' => '' ),
        array( 'key' => 'com_country', 'value' => 'Country [Company]', 'description' => '' ),
        array( 'key' => 'com_description', 'value' => 'Description [Company]', 'description' => '' ),
        array( 'key' => 'com_tags', 'value' => 'Tags [Company]', 'description' => __( 'Use comma without space for multiple tags', 'advanced-form-integration' ) ),
        array( 'key' => 'com_contacttype', 'value' => 'Contact Type ID [Company]', 'description' => implode( ', ', $ct_description ) )
    );

    foreach( $custom_fields as $custom_field ) {
        if( in_array( 'company', $custom_field->available_on ) ) {
            array_push( $com_fields, array( 'key' => 'comcus_' . $custom_field->id, 'value' => $custom_field->name . ' [Company]', 'description' => '' ));
        }
    }

    $per_fields = array(
        array( 'key' => 'per_name', 'value' => 'Name [Person]', 'description' => 'Required only for creating a Person' ),
        array( 'key' => 'per_workemail', 'value' => 'Email [Person]', 'description' => '' ),
        array( 'key' => 'per_title', 'value' => 'Title [Person]', 'description' => '' ),
        array( 'key' => 'per_workphone', 'value' => 'Work Phone [Person]', 'description' => '' ),
        array( 'key' => 'per_mobilephone', 'value' => 'Mobile Phone [Person]', 'description' => '' ),
        array( 'key' => 'per_homephone', 'value' => 'Home Phone [Person]', 'description' => '' ),
        // array( 'key' => 'per_personalemail', 'value' => 'Personal Email [Person]', 'description' => '' ),
        array( 'key' => 'per_workwebsite', 'value' => 'Work Website [Person]', 'description' => '' ),
        array( 'key' => 'per_personalwebsite', 'value' => 'Personal Website [Person]', 'description' => '' ),
        array( 'key' => 'per_linkedin', 'value' => 'LinkedIn [Person]', 'description' => '' ),
        array( 'key' => 'per_twitter', 'value' => 'Twitter [Person]', 'description' => '' ),
        array( 'key' => 'per_facebook', 'value' => 'Facebook [Person]', 'description' => '' ),
        array( 'key' => 'per_youtube', 'value' => 'Youtube [Person]', 'description' => '' ),
        array( 'key' => 'per_street', 'value' => 'Street [Person]', 'description' => '' ),
        array( 'key' => 'per_city', 'value' => 'City [Person]', 'description' => '' ),
        array( 'key' => 'per_state', 'value' => 'State [Person]', 'description' => '' ),
        array( 'key' => 'per_zip', 'value' => 'Zip [Person]', 'description' => '' ),
        array( 'key' => 'per_country', 'value' => 'Country [Person]', 'description' => '' ),
        array( 'key' => 'per_description', 'value' => 'Description [Person]', 'description' => '' ),
        array( 'key' => 'per_tags', 'value' => 'Tags [Person]', 'description' => __( 'Use comma without space for multiple tags', 'advanced-form-integration' ) ),
        array( 'key' => 'per_contacttype', 'value' => 'Contact Type ID [Person]', 'description' => implode( ', ', $ct_description ) )
    );

    foreach( $custom_fields as $custom_field ) {
        if( in_array( 'person', $custom_field->available_on ) ) {
            array_push( $per_fields, array( 'key' => 'percus_' . $custom_field->id, 'value' => $custom_field->name . ' [Person]', 'description' => '' ));
        }
    }

    $deal_fields = array(
        array( 'key' => 'deal_name', 'value' => 'Name [Opportunity]', 'description' => 'Required only for creating a Opportunity' ),
        array( 'key' => 'deal_closedate', 'value' => 'Close Date [Opportunity]', 'description' => '' ),
        array( 'key' => 'deal_description', 'value' => 'Description [Opportunity]', 'description' => '' ),
        array( 'key' => 'deal_pipeline', 'value' => 'Pipeline_Stage ID [Opportunity]', 'description' => $pipelines ),
        array( 'key' => 'deal_source', 'value' => 'Source ID [Opportunity]', 'description' => $sources ),
        array( 'key' => 'deal_priority', 'value' => 'Priority [Opportunity]', 'description' => 'None, Low, Medium, High' ),
        array( 'key' => 'deal_value', 'value' => 'Value [Opportunity]', 'description' => '' ),
        array( 'key' => 'deal_winpercentage', 'value' => 'Win Percentage [Opportunity]', 'description' => '' ),
        array( 'key' => 'deal_tags', 'value' => 'Tags [Opportunity]', 'description' => __( 'Use comma without space for multiple tags', 'advanced-form-integration' ) )
    );

    foreach( $custom_fields as $custom_field ) {
        if( in_array( 'opportunity', $custom_field->available_on ) ) {
            array_push( $deal_fields, array( 'key' => 'dealcus_' . $custom_field->id, 'value' => $custom_field->name . ' [Opportunity]', 'description' => '' ));
        }
    }

    $final_data = array_merge( $com_fields, $per_fields, $deal_fields );

    wp_send_json_success( $final_data );
}

function adfoin_copperpro_get_lead_types() {

    $data = adfoin_copper_request( 'lead_statuses', 'GET' );

    if( is_wp_error( $data ) ) {
        return array();
    }

    $types = json_decode( wp_remote_retrieve_body( $data ) );

    return $types;
}

add_action( 'wp_ajax_adfoin_get_copperpro_lead_fields', 'adfoin_get_copperpro_lead_fields', 10, 0 );

/*
 * Get Copper lead fields
 */
function adfoin_get_copperpro_lead_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $lead_types     = adfoin_copperpro_get_lead_types();
    $sources        = adfoin_copper_get_sources();
    $custom_fields  = adfoin_copperpro_get_custom_fields();
    $ld_description = array();

    foreach( $lead_types as $lead_type ) {
        $ld_description[] = $lead_type->name . ': ' . $lead_type->id;
    }

    $lead_fields = array(
        array( 'key' => 'lead_first_name', 'value' => 'First Name', 'description' => 'Required for creating a lead' ),
        array( 'key' => 'lead_middle_name', 'value' => 'Middle Name', 'description' => '' ),
        array( 'key' => 'lead_last_name', 'value' => 'Last Name', 'description' => '' ),
        array( 'key' => 'lead_email', 'value' => 'Email', 'description' => '' ),
        array( 'key' => 'lead_company_name', 'value' => 'Company Name', 'description' => '' ),
        array( 'key' => 'lead_title', 'value' => 'Title', 'description' => '' ),
        array( 'key' => 'lead_monetary_value', 'value' => 'Monetary Value', 'description' => '' ),
        array( 'key' => 'lead_monetary_unit', 'value' => 'Monetary Unit', 'description' => '' ),
        array( 'key' => 'lead_work_phone', 'value' => 'Work Phone', 'description' => '' ),
        array( 'key' => 'lead_mobile_phone', 'value' => 'Mobile Phone', 'description' => '' ),
        array( 'key' => 'lead_home_phone', 'value' => 'Home Phone', 'description' => '' ),
        array( 'key' => 'lead_other_phone', 'value' => 'Other Phone', 'description' => '' ),
        array( 'key' => 'lead_linkedin', 'value' => 'LinkedIn', 'description' => '' ),
        array( 'key' => 'lead_twitter', 'value' => 'Twitter', 'description' => '' ),
        array( 'key' => 'lead_facebook', 'value' => 'Facebook', 'description' => '' ),
        array( 'key' => 'lead_youtube', 'value' => 'YouTube', 'description' => '' ),
        array( 'key' => 'lead_work_website', 'value' => 'Work Website', 'description' => '' ),
        array( 'key' => 'lead_personal_website', 'value' => 'Personal Website', 'description' => '' ),
        array( 'key' => 'lead_other_website', 'value' => 'Other Website', 'description' => '' ),
        array( 'key' => 'lead_street', 'value' => 'Street', 'description' => '' ),
        array( 'key' => 'lead_city', 'value' => 'City', 'description' => '' ),
        array( 'key' => 'lead_state', 'value' => 'State', 'description' => '' ),
        array( 'key' => 'lead_zip', 'value' => 'Zip', 'description' => '' ),
        array( 'key' => 'lead_country', 'value' => 'Country', 'description' => '' ),
        array( 'key' => 'lead_details', 'value' => 'Description', 'description' => '' ),
        array( 'key' => 'lead_leadtype', 'value' => 'Lead Type ID', 'description' => implode( ', ', $ld_description ) ),
        array( 'key' => 'lead_source', 'value' => 'Source', 'description' => $sources ),
        array( 'key' => 'lead_tags', 'value' => 'Tags', 'description' => __( 'Use comma without space for multiple tags', 'advanced-form-integration' ) )
    );

    foreach( $custom_fields as $custom_field ) {
        if( in_array( 'lead', $custom_field->available_on ) ) {
            array_push( $lead_fields, array( 'key' => 'leadcus_' . $custom_field->id, 'value' => $custom_field->name, 'description' => '' ));
        }
    }

    wp_send_json_success( $lead_fields );
}

add_action( 'adfoin_copperpro_job_queue', 'adfoin_copperpro_job_queue', 10, 1 );

function adfoin_copperpro_job_queue( $data ) {
    adfoin_copperpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Copper API
 */
function adfoin_copperpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data']) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data['field_data'];
    $task    = $record['task'];
    $owner   = $data['owner'];
    $com_id  = '';
    $per_id  = '';
    $deal_id = '';
    $lead_id = '';
    $holder  = array();

    foreach( $data as $key => $value ) {
        $holder[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );
    }

    if( 'add_lead' == $task ) {
        $lead_data    = array();
        $leadcus_data = array();

        foreach( $holder as $key => $value ) {
            if( substr( $key, 0, 5 ) == 'lead_' && $value ) {
                $key = substr( $key, 5 );

                $lead_data[$key] = $value;
            }

            if( substr( $key, 0, 8 ) == 'leadcus_' && $value ) {
                $key = substr( $key, 8 );

                $leadcus_data[$key] = $value;
            }
        }

        if( $lead_data['first_name'] ) {

            $lead_url = 'https://api.copper.com/developer_api/v1/leads';

            $lead_body = array(
                'first_name' => $lead_data['first_name'],
            );

            if( $owner ) { $lead_body['assignee_id'] = $owner; }
            if( isset( $lead_data['middle_name'] ) && $lead_data['middle_name'] ) { $lead_body['middle_name'] = $lead_data['middle_name']; }
            if( isset( $lead_data['last_name'] ) && $lead_data['last_name'] ) { $lead_body['last_name'] = $lead_data['last_name']; }
            if( isset( $lead_data['company_name'] ) && $lead_data['company_name'] ) { $lead_body['company_name'] = $lead_data['company_name']; }
            if( isset( $lead_data['title'] ) && $lead_data['title'] ) { $lead_body['title'] = $lead_data['title']; }
            if( isset( $lead_data['details'] ) && $lead_data['details'] ) { $lead_body['details'] = $lead_data['details']; }
            if( isset( $lead_data['monetary_value'] ) && $lead_data['monetary_value'] ) { $lead_body['monetary_value'] = $lead_data['monetary_value']; }
            if( isset( $lead_data['monetary_unit'] ) && $lead_data['monetary_unit'] ) { $lead_body['monetary_unit'] = $lead_data['monetary_unit']; }
            if( isset( $lead_data['leadtype'] ) && $lead_data['leadtype'] ) { $lead_body['status_id'] = $lead_data['leadtype']; }
            if( isset( $lead_data['source'] ) && $lead_data['source'] ) { $lead_body['customer_source_id'] = $lead_data['source']; }
            if( isset( $lead_data['email'] ) && $lead_data['email'] ) { $lead_body['email'] = array( 'email' => $lead_data['email'], 'category' => 'work' ); }

            if( isset( $lead_data['tags'] ) && $lead_data['tags'] ) {
                $tags = explode( ',', $lead_data['tags'] );
                $lead_body['tags'] = $tags;
            }

            if( isset( $lead_data['work_phone'] ) || isset( $lead_data['mobile_phone'] ) || isset( $lead_data['home_phone'] ) || isset( $lead_data['other_phone'] ) ) {
                $lead_body['phone_numbers'] = array();

                if( $lead_data['work_phone'] ) {
                    array_push( $lead_body['phone_numbers'], array( 'number' => $lead_data['work_phone'], 'category' => 'work' ) );
                }

                if( $lead_data['mobile_phone'] ) {
                    array_push( $lead_body['phone_numbers'], array( 'number' => $lead_data['mobile_phone'], 'category' => 'mobile' ) );
                }

                if( $lead_data['home_phone'] ) {
                    array_push( $lead_body['phone_numbers'], array( 'number' => $lead_data['home_phone'], 'category' => 'home' ) );
                }

                if( $lead_data['other_phone'] ) {
                    array_push( $lead_body['phone_numbers'], array( 'number' => $lead_data['other_phone'], 'category' => 'other' ) );
                }
            }

            if( isset( $lead_data['linkedin'] ) || isset( $lead_data['twitter'] ) || isset( $lead_data['facebook'] ) || isset( $lead_data['youtube'] ) ) {
                $lead_body['socials'] = array();

                if( $lead_data['linkedin'] ) {
                    array_push( $lead_body['socials'], array( 'url' => $lead_data['linkedin'], 'category' => 'linkedin' ) );
                }

                if( $lead_data['twitter'] ) {
                    array_push( $lead_body['socials'], array( 'url' => $lead_data['twitter'], 'category' => 'twitter' ) );
                }

                if( $lead_data['facebook'] ) {
                    array_push( $lead_body['socials'], array( 'url' => $lead_data['facebook'], 'category' => 'facebook' ) );
                }

                if( $lead_data['youtube'] ) {
                    array_push( $lead_body['socials'], array( 'url' => $lead_data['youtube'], 'category' => 'youtube' ) );
                }
            }

            if( isset( $lead_data['work_website'] ) || isset( $lead_data['personal_website'] ) || isset( $lead_data['other_website'] ) ) {
                $lead_body['websites'] = array();

                if( $lead_data['work_website'] ) {
                    array_push( $lead_body['websites'], array( 'url' => $lead_data['work_website'], 'category' => 'work' ) );
                }

                if( $lead_data['personal_website'] ) {
                    array_push( $lead_body['websites'], array( 'url' => $lead_data['personal_website'], 'category' => 'personal' ) );
                }

                if( $lead_data['other_website'] ) {
                    array_push( $lead_body['websites'], array( 'url' => $lead_data['other_website'], 'category' => 'other' ) );
                }
            }

            if( isset( $lead_data['street'] ) && $lead_data['street'] ) {
                $lead_body['address'] = array();

                if( isset( $lead_data['street'] ) && $lead_data['street'] ) { $lead_body['address']['street'] = $lead_data['street']; }
                if( isset( $lead_data['city'] ) && $lead_data['city'] ) { $lead_body['address']['city'] = $lead_data['city']; }
                if( isset( $lead_data['state'] ) && $lead_data['state'] ) { $lead_body['address']['state'] = $lead_data['state']; }
                if( isset( $lead_data['zip'] ) && $lead_data['zip'] ) { $lead_body['address']['zip'] = $lead_data['zip']; }
                if( isset( $lead_data['country'] ) && $lead_data['country'] ) { $lead_body['address']['country'] = $lead_data['country']; }
            }

            if( $leadcus_data ) {
                $lead_body['custom_fields'] = array();

                foreach( $leadcus_data as $leadcus_key => $leadcus_value ) {
                    array_push( $lead_body['custom_fields'], array( 'custom_field_definition_id' => $leadcus_key, 'value' => $leadcus_value ) );
                }
            }

            $lead_args = array(
                'body'    => json_encode( $lead_body )
            );

            $lead_response = wp_remote_post( $lead_url, $lead_args );

            adfoin_add_to_log( $lead_response, $lead_url, $lead_args, $record );
        }
    }

    if( 'add_contact' == $task ) {

        $com_data     = array();
        $comcus_data  = array();
        $per_data     = array();
        $percus_data  = array();
        $deal_data    = array();
        $dealcus_data = array();

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

            $com_id = adfoin_copper_company_exists( $com_data['name'] );

            if( $com_id ) {
                $com_endpoint = "companies/{$com_id}";
                $com_method   = 'PUT';
            } else{
                $com_endpoint = 'companies';
                $com_method   = 'POST'; 
            }

            $com_body = array(
                'name'          => $com_data['name'],
                'phone_numbers' => array(),
                'address'       => array(),
                'websites'      => array(),
                'socials'       => array()
            );

            if( $owner ) { $com_body['assignee_id'] = $owner; }
            if( isset( $com_data['description'] ) && $com_data['description'] ) { $com_body['details'] = $com_data['description']; }
            if( isset( $com_data['contacttype'] ) && $com_data['contacttype'] ) { $com_body['contact_type_id'] = $com_data['contacttype']; }
            if( isset( $com_data['street'] ) && $com_data['street'] ) { $com_body['address']['street'] = $com_data['street']; }
            if( isset( $com_data['city'] ) && $com_data['city'] ) { $com_body['address']['city'] = $com_data['city']; }
            if( isset( $com_data['state'] ) && $com_data['state'] ) { $com_body['address']['state'] = $com_data['state']; }
            if( isset( $com_data['zip'] ) && $com_data['zip'] ) { $com_body['address']['zip'] = $com_data['zip']; }
            if( isset( $com_data['country'] ) && $com_data['country'] ) { $com_body['address']['country'] = $com_data['country']; }
            if( isset( $com_data['workphone'] ) && $com_data['workphone'] ) { $com_body['phone_numbers'][] = array( 'number' => $com_data['workphone'], 'category' => 'work' ); }
            if( isset( $com_data['mobilephone'] ) && $com_data['mobilephone'] ) { $com_body['phone_numbers'][] = array( 'number' => $com_data['mobilephone'], 'category' => 'mobile' ); }
            if( isset( $com_data['homephone'] ) && $com_data['homephone'] ) { $com_body['phone_numbers'][] = array( 'number' => $com_data['homephone'], 'category' => 'home' ); }
            if( isset( $com_data['workwebsite'] ) && $com_data['workwebsite'] ) { $com_body['websites'][] = array( 'url' => $com_data['workwebsite'], 'category' => 'work' ); }
            if( isset( $com_data['emaildomain'] ) && $com_data['emaildomain'] ) { $com_body['email_domain'] = $com_data['emaildomain']; }
            if( isset( $com_data['linkedin'] ) && $com_data['linkedin'] ) { $com_body['socials'][] = array( 'url' => $com_data['linkedin'], 'category' => 'linkedin' ); }
            if( isset( $com_data['twitter'] ) && $com_data['twitter'] ) { $com_body['socials'][] = array( 'url' => $com_data['twitter'], 'category' => 'twitter' ); }
            if( isset( $com_data['facebook'] ) && $com_data['facebook'] ) { $com_body['socials'][] = array( 'url' => $com_data['facebook'], 'category' => 'facebook' ); }
            if( isset( $com_data['youtube'] ) && $com_data['youtube'] ) { $com_body['socials'][] = array( 'url' => $com_data['youtube'], 'category' => 'youtube' ); }

            if( isset( $com_data['tags'] ) && $com_data['tags'] ) {
                $tags = explode( ',', $com_data['tags'] );
                $com_body['tags'] = $tags;
            }

            if( $comcus_data ) {
                $com_body['custom_fields'] = array();

                foreach( $comcus_data as $comcus_key => $comcus_value ) {
                    array_push( $com_body['custom_fields'], array( 'custom_field_definition_id' => $comcus_key, 'value' => $comcus_value ) );
                }
            }

            $com_response = adfoin_copper_request( $com_endpoint, $com_method, $com_body, $record );

            if( !$com_id ) {
                if( 200 == wp_remote_retrieve_response_code( $com_response ) ) {
                    $com_response_body = json_decode( wp_remote_retrieve_body( $com_response ) );
            
                    $com_id = $com_response_body->id;
                }
            }
        }

        if( $per_data['name'] ) {

            $per_email = isset( $per_data['workemail'] ) && $per_data['workemail'] ? $per_data['workemail'] : '';

            if( $per_email ) {
                $per_id = adfoin_copper_person_exists( $per_email );

                if( $per_id ) {
                    $per_endpoint = "people/{$per_id}";
                    $per_method   = 'PUT';

                    if( $com_id ) {
                        adfoin_copper_request( 'people/' . $per_id . '/related', 'POST', array( 'resource' => array( 'id' => $com_id, 'type' => 'company' ) ), $record );
                    }
                } else{
                    $per_endpoint = 'people';
                    $per_method   = 'POST'; 
                }
            }

            $per_body = array(
                'name'    => $per_data['name'],
                'phone_numbers' => array(),
                'emails'        => array(),
                'websites'      => array(),
                'address'       => array(),
                'socials'       => array()
            );

            if( $owner ) { $per_body['assignee_id'] = $owner; }
            if( isset( $per_data['title'] ) && $per_data['title'] ) { $per_body['title'] = $per_data['title']; }
            if( isset( $per_data['description'] ) && $per_data['description'] ) { $per_body['details'] = $per_data['description']; }
            if( isset( $per_data['contacttype'] ) && $per_data['contacttype'] ) { $per_body['contact_type_id'] = $per_data['contacttype']; }
            if( isset( $per_data['street'] ) && $per_data['street'] ) { $per_body['address']['street'] = $per_data['street']; }
            if( isset( $per_data['city'] ) && $per_data['city'] ) { $per_body['address']['city'] = $per_data['city']; }
            if( isset( $per_data['state'] ) && $per_data['state'] ) { $per_body['address']['state'] = $per_data['state']; }
            if( isset( $per_data['zip'] ) && $per_data['zip'] ) { $per_body['address']['zip'] = $per_data['zip']; }
            if( isset( $per_data['country'] ) && $per_data['country'] ) { $per_body['address']['country'] = $per_data['country']; }
            if( isset( $per_data['workphone'] ) && $per_data['workphone'] ) { $per_body['phone_numbers'][] = array( 'number' => $per_data['workphone'], 'category' => 'work' ); }
            if( isset( $per_data['mobilephone'] ) && $per_data['mobilephone'] ) { $per_body['phone_numbers'][] = array( 'number' => $per_data['mobilephone'], 'category' => 'mobile' ); }
            if( isset( $per_data['homephone'] ) && $per_data['homephone'] ) { $per_body['phone_numbers'][] = array( 'number' => $per_data['homephone'], 'category' => 'home' ); }
            if( isset( $per_data['workemail'] ) && $per_data['workemail'] ) { $per_body['emails'][] = array( 'email' => $per_data['workemail'], 'category' => 'work' ); }
            if( isset( $per_data['personalemail'] ) && $per_data['personalemail'] ) { $per_body['emails'][] = array( 'email' => $per_data['personalemail'], 'category' => 'personal' ); }
            if( isset( $per_data['workwebsite'] ) && $per_data['workwebsite'] ) { $per_body['websites'][] = array( 'url' => $per_data['workwebsite'], 'category' => 'work' ); }
            if( isset( $per_data['personalwebsite'] ) && $per_data['personalwebsite'] ) { $per_body['websites'][] = array( 'url' => $per_data['personalwebsite'], 'category' => 'personal' ); }
            if( isset( $per_data['linkedin'] ) && $per_data['linkedin'] ) { $per_body['socials'][] = array( 'url' => $per_data['linkedin'], 'category' => 'linkedin' ); }
            if( isset( $per_data['twitter'] ) && $per_data['twitter'] ) { $per_body['socials'][] = array( 'url' => $per_data['twitter'], 'category' => 'twitter' ); }
            if( isset( $per_data['facebook'] ) && $per_data['facebook'] ) { $per_body['socials'][] = array( 'url' => $per_data['facebook'], 'category' => 'facebook' ); }
            if( isset( $per_data['youtube'] ) && $per_data['youtube'] ) { $per_body['socials'][] = array( 'url' => $per_data['youtube'], 'category' => 'youtube' ); }
            if( $com_id ) { $per_body['company_id'] = $com_id; }

            if( isset( $per_data['tags'] ) && $per_data['tags'] ) {
                $per_tags = explode( ',', $per_data['tags'] );
                $per_body['tags'] = $per_tags;
            }

            if( $percus_data ) {
                $per_body['custom_fields'] = array();

                foreach( $percus_data as $percus_key => $percus_value ) {
                    array_push( $per_body['custom_fields'], array( 'custom_field_definition_id' => $percus_key, 'value' => $percus_value ) );
                }
            }

            $per_response = adfoin_copper_request( $per_endpoint, $per_method, $per_body, $record );

            if( !$per_id ) {
                if( 200 == wp_remote_retrieve_response_code( $per_response ) ) {
                    $per_response_body = json_decode( wp_remote_retrieve_body( $per_response ) );
            
                    $per_id = $per_response_body->id;
                }
            }
        }

        if( $deal_data['name'] ) {

            $deal_body = array(
                'name' => $deal_data['name']
            );

            if( $owner ) { $deal_body['assignee_id'] = $owner; }
            if( isset( $deal_data['closedate'] ) && $deal_data['closedate'] ) { $deal_body['close_date'] = $deal_data['closedate']; }
            if( isset( $deal_data['description'] ) && $deal_data['description'] ) { $deal_body['details'] = $deal_data['description']; }
            if( isset( $deal_data['source'] ) && $deal_data['source'] ) { $deal_body['customer_source_id'] = $deal_data['source']; }
            if( isset( $deal_data['priority'] ) && $deal_data['priority'] ) { $deal_body['priority'] = $deal_data['priority']; }
            if( isset( $deal_data['value'] ) && $deal_data['value'] ) { $deal_body['monetary_value'] = $deal_data['value']; }
            if( isset( $deal_data['winpercentage'] ) && $deal_data['winpercentage'] ) { $deal_body['win_probability'] = $deal_data['winpercentage']; }

            if( isset( $deal_data['pipeline'] ) && $deal_data['pipeline'] ) {
                $pipeline_stage = explode( '_', $deal_data['pipeline'], 2 );

                if( count( $pipeline_stage ) == 2 ) {
                    $deal_body['pipeline_id']       = $pipeline_stage[0];
                    $deal_body['pipeline_stage_id'] = $pipeline_stage[1];
                }
            }
            
            if( $com_id ) { $deal_body['company_id'] = $com_id; }
            if( $per_id ) { $deal_body['primary_contact_id'] = $per_id; }

            if( isset( $deal_data['tags'] ) && $deal_data['tags'] ) {
                $deal_tags = explode( ',', $deal_data['tags'] );
                $deal_body['tags'] = $deal_tags;
            }

            if( $dealcus_data ) {
                $deal_body['custom_fields'] = array();

                foreach( $dealcus_data as $dealcus_key => $dealcus_value ) {
                    array_push( $deal_body['custom_fields'], array( 'custom_field_definition_id' => $dealcus_key, 'value' => $dealcus_value ) );
                }
            }

            $deal_response = adfoin_copper_request( 'opportunities', 'POST', $deal_body, $record );

            if( !$deal_id ) {
                if( 200 == wp_remote_retrieve_response_code( $deal_response ) ) {
                    $deal_response_body = json_decode( wp_remote_retrieve_body( $deal_response ) );
            
                    $deal_id = $deal_response_body->id;
                }
            }
        }
    }

    return;
}