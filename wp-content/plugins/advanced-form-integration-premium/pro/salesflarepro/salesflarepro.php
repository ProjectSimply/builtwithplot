<?php

add_filter( 'adfoin_action_providers', 'adfoin_salesflarepro_actions', 10, 1 );
 
function adfoin_salesflarepro_actions( $actions ) {

    $actions['salesflarepro'] = array(
        'title' => __( 'Salesflare [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'add_data' => __( 'Add Account, Contact, Opportunity, Task', 'advanced-form-integration' )
        )
    );

    return $actions;
}
  
add_action( 'adfoin_action_fields', 'adfoin_salesflarepro_action_fields', 10, 1 );

function adfoin_salesflarepro_action_fields() {
    ?>
    <script type="text/template" id="salesflarepro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'add_data'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'add_data'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Owner', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[owner]" v-model="fielddata.owner" required="required">
                        <option value=""> <?php _e( 'Select Owner...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.ownerList" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': ownerLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'add_data'">
            <td scope="row-title">
                <label for="tablecell">
                    <?php esc_attr_e( 'Entities', 'advanced-form-integration' ); ?>
                </label>
            </td>
            <td>
                <div class="object_selection" style="display: inline;">
                    <input type="checkbox" id="account__chosen" value="true" v-model="fielddata.account__chosen" name="fieldData[account__chosen]">
                    <label style="margin-right:10px;" for="account__chosen">Account</label>
                    <input type="checkbox" id="contact__chosen" value="true" v-model="fielddata.contact__chosen" name="fieldData[contact__chosen]">
                    <label style="margin-right:10px;" for="contact__chosen">Contact</label>
                    <input type="checkbox" id="opportunity__chosen" value="true" v-model="fielddata.opportunity__chosen" name="fieldData[opportunity__chosen]">
                    <label style="margin-right:10px;" for="opportunity__chosen">Opportunity</label>
                    <input type="checkbox" id="task__chosen" value="true" v-model="fielddata.task__chosen" name="fieldData[task__chosen]">
                    <label style="margin-right:10px;" for="task__chosen">Task</label>
                </div>
                
                <button class="button-secondary" @click.stop.prevent="getFields">Get Fields</button>
                <div class="spinner" v-bind:class="{'is-active': fieldsLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                
            </td>
        </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>
    <?php
}

//Get Custom Fields
function adfoin_get_salesflarepro_custom_fields( $entity ) {
    $endpoint      = '';
    $custom_fields = array();
    
    if( 'account' == $entity ) {
        $endpoint = '/customfields/accounts';
    }
    
    if( 'contact' == $entity ) {
        $endpoint = '/customfields/contacts';
    }
    
    if( 'opportunity' == $entity ) {
        $endpoint = '/customfields/opportunities';
    }
        
    $data = adfoin_salesflare_request( $endpoint );
    $body = json_decode( wp_remote_retrieve_body( $data ) , true );
    
    if( isset( $body ) && is_array( $body ) ) {
        foreach( $body as $field ) {
            $custom_fields['cf_' . $field['api_field']] = $field['name'];
        }
    }
    
    return $custom_fields;
}
 
add_action( 'wp_ajax_adfoin_get_salesflarepro_all_fields', 'adfoin_get_salesflarepro_all_fields', 10, 0 );
 
/*
* Get Salesflare All Fields
*/
function adfoin_get_salesflarepro_all_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $final_data       = array();
    $selected_objects = isset( $_POST['selectedObjects'] ) ? adfoin_sanitize_text_or_array_field( $_POST['selectedObjects'] ) : array();

    if( in_array( 'account', $selected_objects ) ) {
        $acc_fields = array(
            array( 'key' => 'acc_name', 'value' => 'Name [Account]', 'description' => 'Required for creating an account, otherwise leave empty' ),
            array( 'key' => 'acc_website', 'value' => 'Website [Account]', 'description' => '' ),
            array( 'key' => 'acc_description', 'value' => 'Description [Account]', 'description' => '' ),
            array( 'key' => 'acc_size', 'value' => 'Size [Account]', 'description' => '' ),
            array( 'key' => 'acc_email', 'value' => 'Email [Account]', 'description' => '' ),
            array( 'key' => 'acc_phone', 'value' => 'Phone [Account]', 'description' => '' ),
            array( 'key' => 'acc_social', 'value' => 'Social Profile URL [Account]', 'description' => 'Use comma for multiple social profile URL.' ),
            array( 'key' => 'acc_street', 'value' => 'Street [Account]', 'description' => '' ),            
            array( 'key' => 'acc_zip', 'value' => 'Zip [Account]', 'description' => '' ),
            array( 'key' => 'acc_city', 'value' => 'City [Account]', 'description' => '' ),
            array( 'key' => 'acc_state', 'value' => 'State/Region [Account]', 'description' => '' ),
            array( 'key' => 'acc_country', 'value' => 'Country [Account]', 'description' => '' ),
            array( 'key' => 'acc_tag', 'value' => 'Tag [Account]', 'description' => 'Use comma for multiple tag' ),
        ); 

        $acc_custom_fields = adfoin_get_salesflarepro_custom_fields( 'account' );

        foreach( $acc_custom_fields as $key => $value ) {
            array_push( $acc_fields, array( 'key' => 'acc_' . $key, 'value' => $value . ' [Account]', 'description' => '' ) );
        }

        $final_data = array_merge( $final_data, $acc_fields );
    }

    if( in_array( 'contact', $selected_objects ) ) {
        $contact_fields = array(
            array( 'key' => 'contact_title', 'value' => 'Prefix/Title [Contact]', 'description' => '' ),
            array( 'key' => 'contact_firstName', 'value' => 'First Name [Contact]', 'description' => 'Required if you want to create a contact, otherwise leave empty' ),
            array( 'key' => 'contact_middleName', 'value' => 'Middle Name [Contact]', 'description' => '' ),
            array( 'key' => 'contact_lastName', 'value' => 'Last Name [Contact]', 'description' => '' ),
            array( 'key' => 'contact_suffix', 'value' => 'suffix [Contact]', 'description' => '' ),
            array( 'key' => 'contact_email', 'value' => 'Email [Contact]', 'description' => '' ),
            array( 'key' => 'contact_workPhone', 'value' => 'Work Phone [Contact]', 'description' => '' ),
            array( 'key' => 'contact_homePhone', 'value' => 'Home Phone [Contact]', 'description' => '' ),
            array( 'key' => 'contact_mobilePhone', 'value' => 'Mobile Phone [Contact]', 'description' => '' ),            
            array( 'key' => 'contact_addressType', 'value' => 'Address Type [Contact]', 'description' => 'Home | Postal | Office | Billing | Shipping' ),
            array( 'key' => 'contact_address', 'value' => 'Address [Contact]', 'description' => '' ),
            array( 'key' => 'contact_city', 'value' => 'City [Contact]', 'description' => '' ),
            array( 'key' => 'contact_state', 'value' => 'State [Contact]', 'description' => '' ),
            array( 'key' => 'contact_zip', 'value' => 'Zip [Contact]', 'description' => '' ),
            array( 'key' => 'contact_country', 'value' => 'Country [Contact]', 'description' => '' ),
            array( 'key' => 'contact_social', 'value' => 'Social Profile URL [Contact]', 'description' => 'Use comma for multiple social profile URLs' ),
            array( 'key' => 'contact_role', 'value' => 'Role [Contact]', 'description' => '' ),
            array( 'key' => 'contact_organisation', 'value' => 'Organisation [Contact]', 'description' => '' ),
            array( 'key' => 'contact_tag', 'value' => 'Tag [Contact]', 'description' => 'Use comma for multiple tags' ),
        );

        $cont_custom_fields = adfoin_get_salesflarepro_custom_fields( 'contact' );

        foreach( $cont_custom_fields as $key => $value ) {
            array_push( $contact_fields, array( 'key' => 'contact_' . $key, 'value' => $value . ' [Contact]', 'description' => '' ) );
        }

        $final_data = array_merge( $final_data, $contact_fields );
    }

    if( in_array( 'opportunity', $selected_objects ) ) {
        $stages = adfoin_get_salesflare_opportunity_stages();

        $opportunity_fields = array(
            array( 'key' => 'opportunity_name', 'value' => 'Name [Opportunity]', 'description' => '' ),
            array( 'key' => 'opportunity_stage', 'value' => 'Stage ID [Opportunity]', 'description' => implode( ', ',$stages ) ),
            array( 'key' => 'opportunity_value', 'value' => 'Value [Opportunity]', 'description' => '' ),
            array( 'key' => 'opportunity_expectedCloseOn', 'value' => 'Expected Close Date [Opportunity]', 'description' => '' ),
            array( 'key' => 'opportunity_tag', 'value' => 'Tag [Opportunity]', 'description' => 'Use comma for multiple tags' ),            
        );

        $oppor_custom_fields = adfoin_get_salesflarepro_custom_fields( 'opportunity' );

        foreach( $oppor_custom_fields as $key => $value ) {
            array_push( $opportunity_fields, array( 'key' => 'opportunity_' . $key, 'value' => $value . ' [Opportunity]', 'description' => '' ) );
        }

        $final_data = array_merge( $final_data, $opportunity_fields );
    }

    if( in_array( 'task', $selected_objects ) ) {
        $task_fields = array(
            array( 'key' => 'task_description', 'value' => 'Description [Task]', 'description' => 'Required if you want to create a tasks, otherwise leave empty' ),
            array( 'key' => 'task_reminderDate', 'value' => 'Reminder Date [Task]', 'description' => '' ),
            array( 'key' => 'task_assignee', 'value' => 'Assignee [Task]', 'description' => '' ),
        );

        $final_data = array_merge( $final_data, $task_fields );
    }

    wp_send_json_success( $final_data );
}

add_action( 'adfoin_salesflarepro_job_queue', 'adfoin_salesflarepro_job_queue', 10, 1 );

function adfoin_salesflarepro_job_queue( $data ) {
    adfoin_salesflarepro_send_data( $data['record'], $data['posted_data'] );
}
  
/*
* Handles sending data to Salesflare API
*/
function adfoin_salesflarepro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data           = $record_data['field_data'];
    $task           = $record['task'];
    $owner          = $data['owner'];
    $acc_id         = '';
    $contact_id     = '';
    $opportunity_id = '';
    $case_id        = '';

    if( $task == 'add_data' ) {

        $acc_data         = array();
        $contact_data     = array();
        $opportunity_data = array();
        $task_data        = array();

        foreach( $data as $key => $value ) {
            if( substr( $key, 0, 4 ) == 'acc_' && $value ) {
                $key = substr( $key, 4 );

                $acc_data[$key] = $value;
            }

            if( substr( $key, 0, 8 ) == 'contact_' && $value ) {
                $key = substr( $key, 8 );

                $contact_data[$key] = $value;
            }

            if( substr( $key, 0, 12 ) == 'opportunity_' && $value ) {
                $key = substr( $key, 12 );

                $opportunity_data[$key] = $value;
            }

            if( substr( $key, 0, 5 ) == 'task_' && $value ) {
                $key = substr( $key, 5 );

                $task_data[$key] = $value;
            }
        }

        if( isset( $acc_data['name'] ) && $acc_data['name'] ) {
            $endpoint           = 'accounts';
            $method             = 'POST';
            $acc_holder         = array();
            $acc_holder['name'] = adfoin_get_parsed_values( $acc_data['name'], $posted_data );

            if( isset( $acc_data['website'] ) && $acc_data['website'] ) { $acc_holder['website'] = adfoin_get_parsed_values( $acc_data['website'], $posted_data ); }
            if( isset( $acc_data['description'] ) && $acc_data['description'] ) { $acc_holder['description'] = adfoin_get_parsed_values( $acc_data['description'], $posted_data ); }
            if( isset( $acc_data['email'] ) && $acc_data['email'] ) { $acc_holder['email'] = adfoin_get_parsed_values( $acc_data['email'], $posted_data ); }
            if( isset( $acc_data['phone'] ) && $acc_data['phone'] ) { $acc_holder['phone_number'] = adfoin_get_parsed_values( $acc_data['phone'], $posted_data ); }
            if( isset( $acc_data['size'] ) && $acc_data['size'] ) { $acc_holder['size'] = adfoin_get_parsed_values( $acc_data['size'], $posted_data ); }
            if( isset( $acc_data['social'] ) && $acc_data['social'] ) { $acc_holder['social_profiles'] = array(adfoin_get_parsed_values( $acc_data['social'], $posted_data )); }
            
            if ( $acc_data['social'] ) {
                $acc_holder['social_profiles'] = array();
                $acc_social = explode(',', $acc_data['social'] );

                foreach( $acc_social as $social ){
                    array_push( $acc_holder['social_profiles'],  $social  );
                }
            }
                        
            if ( $acc_data['tag'] ) {
                $acc_holder['tags'] = array();
                $acc_tags = explode(',', $acc_data['tag'] );

                foreach( $acc_tags as $tag ){
                    array_push( $acc_holder['tags'],  $tag  );
                }
            }

            if( $owner ) {
                $acc_holder['owner'] = (int)$owner;
            };

            if ( isset( $acc_data['street'] )
            || isset( $acc_data['zip'] )
            || isset( $acc_data['city'] )
            || isset( $acc_data['state'] )
            || isset( $acc_data['country'] ) ) {
                $acc_holder['addresses'] = array(
                    array()
                );
            }

            if( isset( $acc_data['street'] ) && $acc_data['street'] ) { $acc_holder['addresses'][0]['street'] = adfoin_get_parsed_values( $acc_data['street'], $posted_data ); }
            if( isset( $acc_data['zip'] ) && $acc_data['zip'] ) { $acc_holder['addresses'][0]['zip'] = adfoin_get_parsed_values( $acc_data['zip'], $posted_data ); }
            if( isset( $acc_data['city'] ) && $acc_data['city'] ) { $acc_holder['addresses'][0]['city'] = adfoin_get_parsed_values( $acc_data['city'], $posted_data ); }
            if( isset( $acc_data['state'] ) && $acc_data['state'] ) { $acc_holder['addresses'][0]['state'] = adfoin_get_parsed_values( $acc_data['state'], $posted_data ); }
            if( isset( $acc_data['country'] ) && $acc_data['country'] ) { $acc_holder['addresses'][0]['country'] = adfoin_get_parsed_values( $acc_data['country'], $posted_data ); }

            $acc_id = adfoin_salesflare_item_exists( 'accounts', 'name', $acc_holder['name'] );

            if( $acc_id ) {
                $endpoint = "accounts/{$acc_id}";
                $method   = 'PUT';
            }

            $account_custom_fields = array();

            foreach( $acc_data as $key => $value ) {
                if( substr( $key, 0, 3 ) == 'cf_' && $value ) {
                    $original_key = substr( $key, 3 );
                    $account_custom_fields[$original_key] = adfoin_get_parsed_values( $value, $posted_data );
                }
            }

            if( $account_custom_fields ){
                $acc_holder['custom'] = $account_custom_fields;
            }

            $acc_holder   = array_filter( $acc_holder );
            $acc_response = adfoin_salesflare_request( $endpoint, $method,  $acc_holder, $record );
            $acc_body     = json_decode( wp_remote_retrieve_body( $acc_response ), true );

            if( isset( $acc_body['id'] ) ) {
                $acc_id = $acc_body['id'];
            }
        }

        if( isset( $contact_data['email'] ) && $contact_data['email'] ) {
            $endpoint       = 'contacts';
            $method         = 'POST';
            $contact_holder = array();
            if( isset( $contact_data['email'] ) && $contact_data['email'] ) { $contact_holder['email'] = adfoin_get_parsed_values( $contact_data['email'], $posted_data ); }
            if( isset( $contact_data['title'] ) && $contact_data['title'] ) { $contact_holder['prefix'] = adfoin_get_parsed_values( $contact_data['title'], $posted_data ); }
            if( isset( $contact_data['firstName'] ) && $contact_data['firstName'] ) { $contact_holder['firstname'] = adfoin_get_parsed_values( $contact_data['firstName'], $posted_data ); }
            if( isset( $contact_data['middleName'] ) && $contact_data['middleName'] ) { $contact_holder['middle'] = adfoin_get_parsed_values( $contact_data['middleName'], $posted_data ); }
            if( isset( $contact_data['lastName'] ) && $contact_data['lastName'] ) { $contact_holder['lastname'] = adfoin_get_parsed_values( $contact_data['lastName'], $posted_data ); }
            if( isset( $contact_data['suffix'] ) && $contact_data['suffix'] ) { $contact_holder['suffix'] = adfoin_get_parsed_values( $contact_data['suffix'], $posted_data ); }
            if( isset( $contact_data['birthdate'] ) && $contact_data['birthdate'] ) { $contact_holder['birth_date'] = adfoin_get_parsed_values( $contact_data['birthdate'], $posted_data ); }
            if( isset( $contact_data['workPhone'] ) && $contact_data['workPhone'] ) { $contact_holder['phone_number'] = adfoin_get_parsed_values( $contact_data['workPhone'], $posted_data ); }
            if( isset( $contact_data['homePhone'] ) && $contact_data['homePhone'] ) { $contact_holder['home_phone_number'] = adfoin_get_parsed_values( $contact_data['homePhone'], $posted_data ); }
            if( isset( $contact_data['mobilePhone'] ) && $contact_data['mobilePhone'] ) { $contact_holder['mobile_phone_number'] = adfoin_get_parsed_values( $contact_data['mobilePhone'], $posted_data ); }
            
            if ( $contact_data['social'] ) {
                $contact_holder['social_profiles'] = array();
                $contact_social = explode(',', $contact_data['social'] );

                foreach( $contact_social as $social ){
                    array_push( $contact_holder['social_profiles'],  $social  );
                }
            }

            if ( $contact_data['tag'] ) {
                $contact_holder['tags'] = array();
                $contact_tags = explode(',', $contact_data['tag'] );

                foreach( $contact_tags as $tag ){
                    array_push( $contact_holder['tags'],  $tag  );
                }
            }

            if( $owner ) {
                $contact_holder['owner'] = (int)$owner;
            }

            if ( isset( $contact_data['street'] )
            || isset( $contact_data['zip'] )
            || isset( $contact_data['city'] )
            || isset( $contact_data['state'] )
            || isset( $contact_data['country'] ) ) {
                $contact_holder['address'] = array();
            }
            if( isset( $contact_data['addressType'] ) && $contact_data['addressType'] ) { $contact_holder['address']['type'] = adfoin_get_parsed_values( $contact_data['addressType'], $posted_data ); }
            if( isset( $contact_data['street'] ) && $contact_data['street'] ) { $contact_holder['address']['street'] = adfoin_get_parsed_values( $contact_data['street'], $posted_data ); }
            if( isset( $contact_data['zip'] ) && $contact_data['zip'] ) { $contact_holder['address']['zip'] = adfoin_get_parsed_values( $contact_data['zip'], $posted_data ); }
            if( isset( $contact_data['city'] ) && $contact_data['city'] ) { $contact_holder['address']['city'] = adfoin_get_parsed_values( $contact_data['city'], $posted_data ); }
            if( isset( $contact_data['state'] ) && $contact_data['state'] ) { $contact_holder['address']['state'] = adfoin_get_parsed_values( $contact_data['state'], $posted_data ); }
            if( isset( $contact_data['country'] ) && $contact_data['country'] ) { $contact_holder['address']['country'] = adfoin_get_parsed_values( $contact_data['country'], $posted_data ); }

            if ( isset( $contact_data['role'] )
            && isset( $contact_data['organisation'] ) ) {
                $contact_holder['position'] = array();
            }

            if( isset( $contact_data['role'] ) && $contact_data['role'] ) { $contact_holder['position']['role'] = adfoin_get_parsed_values( $contact_data['role'], $posted_data ); }
            if( isset( $contact_data['organisation'] ) && $contact_data['organisation'] ) { $contact_holder['position']['organisation'] = adfoin_get_parsed_values( $contact_data['organisation'], $posted_data ); }


            if( $acc_id ) {
                $contact_holder['account'] = (int)$acc_id;
            }

            $contact_id = adfoin_salesflare_item_exists( 'contacts', 'email', $contact_holder['email'] );

            if( $contact_id ) {
                $endpoint = "contacts/{$contact_id}";
                $method   = 'PUT';
            }

            $contact_custom_fields = array();

            foreach( $contact_data as $key => $value ) {
                if( substr( $key, 0, 3 ) == 'cf_' && $value ) {
                    $original_key = substr( $key, 3 );
                    $contact_custom_fields[$original_key] = adfoin_get_parsed_values( $value, $posted_data );
                }
            }

            if( $contact_custom_fields ){
                $contact_holder['custom'] = $contact_custom_fields;
            }

            $contact_holder   = array_filter( $contact_holder );
            $contact_response = adfoin_salesflare_request( $endpoint, $method, $contact_holder, $record );
            $contact_body     = json_decode( wp_remote_retrieve_body( $contact_response ), true );

            if( isset( $contact_body['id'] ) ) {
                $contact_id = $contact_body['id'];
            }
        }

        if( isset( $opportunity_data['name'] ) && $opportunity_data['name'] ) {
            $endpoint                          = 'opportunities';
            $method                            = 'POST';
            $opportunity_holder                = array();
            $opportunity_holder['name']        = adfoin_get_parsed_values( $opportunity_data['name'], $posted_data );
            
            if( $owner ) {
                $opportunity_holder['owner']    = (int)$owner;
                $opportunity_holder['assignee'] = (int)$owner;
            }

            if( $acc_id ) {
                $opportunity_holder['account'] = (int)$acc_id;
            }
            if( isset( $opportunity_data['stage'] ) && $opportunity_data['stage'] ) { $opportunity_holder['stage'] = (int)adfoin_get_parsed_values( $opportunity_data['stage'], $posted_data ); }
            if( isset( $opportunity_data['value'] ) && $opportunity_data['value'] ) { $opportunity_holder['value'] = (int)adfoin_get_parsed_values( $opportunity_data['value'], $posted_data ); }
            if( isset( $opportunity_data['expectedCloseOn'] ) && $opportunity_data['expectedCloseOn'] ) { $opportunity_holder['close_date'] = adfoin_get_parsed_values( $opportunity_data['expectedCloseOn'], $posted_data ); }
    
            if ( $opportunity_data['tag'] ) {
                $opportunity_holder['tags'] = array();
                $opportunity_tags = explode(',', $opportunity_data['tag'] );

                foreach( $opportunity_tags as $tag ){
                    array_push( $opportunity_holder['tags'],  $tag  );
                }
            }

            if( $acc_id ) {
                $opportunity_holder['account'] = (int)$acc_id;
            }

            $opportunity_custom_fields = array();

            foreach( $opportunity_data as $key => $value ) {
                if( substr( $key, 0, 3 ) == 'cf_' && $value ) {
                    $original_key = substr( $key, 3 );
                    $opportunity_custom_fields[$original_key] = adfoin_get_parsed_values( $value, $posted_data );
                }
            }

            if( $opportunity_custom_fields ){
                $opportunity_holder['custom'] = $opportunity_custom_fields;
            }

            $opportunity_holder   = array_filter( $opportunity_holder );
            $opportunity_response = adfoin_salesflare_request( $endpoint, $method,  $opportunity_holder , $record );
            $opportunity_body     = json_decode( wp_remote_retrieve_body( $opportunity_response ), true );

            if( isset( $opportunity_body['id'] ) ) {
                $opportunity_id = $opportunity_body['id'];
            }
        }

        if( isset( $task_data['description'] ) && $task_data['description'] ) {
            $endpoint                   = 'tasks';
            $method                     = 'POST';
            $task_holder                = array();
            $task_holder['description'] = adfoin_get_parsed_values( $task_data['description'], $posted_data );

            if( $acc_id ) {
                $task_holder['account'] = (int)$acc_id;
            }

            if( isset( $task_data['reminderDate'] ) && $task_data['reminderDate'] ) { $task_holder['reminder_date'] = adfoin_get_parsed_values( $task_data['reminderDate'], $posted_data ); }
            if( isset( $task_data['assignee'] ) && $task_data['assignee'] ) { $task_holder['assignees'] = array( (int)adfoin_get_parsed_values( $task_data['assignee'], $posted_data )); }
    
            $task_holder   = array_filter( $task_holder );
            $task_response = adfoin_salesflare_request( $endpoint, $method, $task_holder, $record );
            $task_body     = json_decode( wp_remote_retrieve_body( $task_response ), true );
        }
    }

    return;
}