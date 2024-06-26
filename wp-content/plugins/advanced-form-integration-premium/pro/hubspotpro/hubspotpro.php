<?php
 
add_filter( 'adfoin_action_providers', 'adfoin_hubspotpro_actions', 10, 1 );
 
function adfoin_hubspotpro_actions( $actions ) {
 
    $actions['hubspotpro'] = array(
        'title' => __( 'Hubspot CRM [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'add_contact'   => __( 'Create New Record', 'advanced-form-integration' )
        )
    );
 
    return $actions;
}
 
add_action( 'adfoin_action_fields', 'adfoin_hubspotpro_action_fields', 10, 1 );
 
function adfoin_hubspotpro_action_fields() {
    ?>
    <script type="text/template" id="hubspotpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'add_contact'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
 
                </td>
            </tr>
 
            <tr valign='top' class='alternate' v-if="action.task == 'add_contact'">
                    <td scope='row-title'>
                        <label for='tablecell'>
                            <?php esc_attr_e( 'Owner', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <select name="fieldData[userId]" v-model="fielddata.userId">
                            <option value=''> <?php _e( 'Select Owner...', 'advanced-form-integration' ); ?> </option>
                            <option v-for='(item, index) in fielddata.users' :value='index' > {{item}}  </option>
                        </select>
                        <div class='spinner' v-bind:class="{'is-active': userLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    </td>
                </tr>
 
                <tr valign='top' class='alternate' v-if="action.task == 'add_contact'">
                    <td scope='row-title'>
                        <label for='tablecell'>
                            <?php esc_attr_e( 'Object', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <select name="fieldData[objectId]" v-model="fielddata.objectId" @change=getFields>
                            <option value=''> <?php _e( 'Select Object...', 'advanced-form-integration' ); ?> </option>
                            <option value='contacts' >Contacts</option>
                            <option value='companies' >Companies</option>
                            <option value='deals' >Deals</option>
                            <option value='tickets' >Tickets</option>
                            <option value='tasks' >Tasks</option>
                            <option value='notes' >Notes</option>
                        </select>
                        <div class='spinner' v-bind:class="{'is-active': objectLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    </td>
                </tr>
 
            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>
    <?php
}

add_action( 'wp_ajax_adfoin_get_hubspotpro_users', 'adfoin_get_hubspotpro_users', 10, 0 );
/**
 * Get Users
 */
function adfoin_get_hubspotpro_users() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }
 
    $response      = adfoin_hubspot_request( 'owners' );
    $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
 
    if ( empty( $response_body ) ) {
        wp_send_json_error();
    }
 
    if ( !empty( $response_body['results'] ) && is_array( $response_body['results'] ) ) {
        $users = array();
        foreach ( $response_body['results'] as $value ){
           $users[$value['id']] = $value['firstName'] . ' ' . $value['lastName'];
        }
   
        wp_send_json_success( $users );
    } else {
        wp_send_json_error();
    }
}
 
add_action( 'wp_ajax_adfoin_get_hubspotpro_object_fields', 'adfoin_get_hubspotpro_object_fields', 10, 0 );
 
/*
 * Get Hubspot Peson Fields
 */
function adfoin_get_hubspotpro_object_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }
 
    $final_data = array();
    $object     = isset( $_POST['object'] ) ? $_POST['object'] : '';
 
    if( $object ) {

        if( 'notes' == $object ) {
            array_push( $final_data, array( 'type' => 'textarea', 'key' => 'text__note_body', 'value' => 'Note Body', 'description' => '' ) );
            array_push( $final_data, array( 'type' => 'text', 'key' => 'text__contact_email', 'value' => 'Associated Contact Email', 'description' => '' ) );
            array_push( $final_data, array( 'type' => 'text', 'key' => 'text__company', 'value' => 'Associated Company Name', 'description' => '' ) );

            wp_send_json_success( $final_data );
        }

        $response = adfoin_hubspot_request( "properties/{$object}" );
        $body     = json_decode( wp_remote_retrieve_body( $response ) );

        $suppression_list = array( 'googleplus_page', 'photo', 'hubspot_owner_id', 'pipeline', 'dealstage', 'hs_pipeline', 'hs_pipeline_stage' );

 
        if( isset( $body->results ) && is_array( $body->results ) ) {
            foreach( $body->results as $single ) {
                $data_type = $single->type;

                if( in_array( $single->name, $suppression_list ) ) {
                    continue;
                }

                if( false == $single->modificationMetadata->readOnlyValue ) {
                    $description = $single->description;
   
                    if( $single->options ) {
                        if( is_array( $single->options ) ) {
                            $description .= ' Possible values are: ';
                            $values = wp_list_pluck( $single->options, 'value' );
                            $description .= implode( ' | ', $values );
                        }
                    }
   
                    array_push( $final_data, array( 'key' => $data_type. '__' .$single->name, 'value' => $single->label, 'description' => $description ) );
                }
            }

            if( 'contacts' == $object ) {
                array_push( $final_data, array( 'key' => 'text__associated_company', 'value' => 'Associated Company Name', 'description' => 'Name of the associated company' ) );
            }

            if( 'deals' == $object ) {
                array_push( $final_data, array( 'key' => 'text__associated_company', 'value' => 'Associated Company Name', 'description' => 'Name of the associated company' ) );
                array_push( $final_data, array( 'key' => 'text__associated_contact', 'value' => 'Associated Contact Email', 'description' => 'Email of the associated contact' ) );

                $pipeline_request = adfoin_hubspot_request( 'pipelines/deals' );

                if( !is_wp_error( $pipeline_request ) ) {
                    $pipeline_body = json_decode( wp_remote_retrieve_body( $pipeline_request ), true );
                    $pipelines = array();
                    $stages    = array();

                    if( isset( $pipeline_body['results'] ) && is_array( $pipeline_body['results'] ) ) {
                        foreach( $pipeline_body['results'] as $single_pipeline ) {
                            $pipelines[] = $single_pipeline['label'] . ': ' . $single_pipeline['id'];

                            foreach( $single_pipeline['stages'] as $single_stage ) {
                                $stages[] = $single_pipeline['label'] . '/' . $single_stage['label'] . ': ' . $single_stage['id'];
                            }
                        }

                        array_push( $final_data, array( 'key' => 'text__pipeline', 'value' => 'Pipeline ID', 'description' => implode( ', ', $pipelines ) ) );
                        array_push( $final_data, array( 'key' => 'text__dealstage', 'value' => 'Deal Stage ID', 'description' => implode( ', ', $stages ) ) );
                    }
                }
                
            }

            if( 'tickets' == $object ) {
               
                $tickets_pipeline_request = adfoin_hubspot_request( 'pipelines/tickets' );

                if( !is_wp_error( $tickets_pipeline_request ) ) {
                    $tickets_pipeline_body = json_decode( wp_remote_retrieve_body( $tickets_pipeline_request ), true );
                    $tickets_pipelines = array();
                    $tickets_status    = array();

                    if( isset( $tickets_pipeline_body['results'] ) && is_array( $tickets_pipeline_body['results'] ) ) {
                        foreach( $tickets_pipeline_body['results'] as $single_pipeline ) {
                            $tickets_pipelines[] = $single_pipeline['label'] . ': ' . $single_pipeline['id'];

                            foreach( $single_pipeline['stages'] as $single_status ) {
                                $tickets_status[] = $single_pipeline['label'] . '/' . $single_status['label'] . ': ' . $single_status['id'];
                            }
                        }

                        array_push( $final_data, array( 'key' => 'text__hs_pipeline', 'value' => 'Pipeline ID', 'description' => implode( ', ', $tickets_pipelines ) ) );
                        array_push( $final_data, array( 'key' => 'text__hs_pipeline_stage', 'value' => 'Status ID', 'description' => implode( ', ', $tickets_status ) ) );
                    }
                }
                
            }
            
        }
    }
 
    wp_send_json_success( $final_data );
}

add_action( 'adfoin_hubspotpro_job_queue', 'adfoin_hubspotpro_job_queue', 10, 1 );

function adfoin_hubspotpro_job_queue( $data ) {
    adfoin_hubspotpro_send_data( $data['record'], $data['posted_data'] );
}
 
/*
 * Handles sending data to Hubspot API
 */
function adfoin_hubspotpro_send_data( $record, $posted_data ) {
 
    $record_data = json_decode( $record['data'], true );
 
    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }
 
    $data = $record_data['field_data'];
    $task = $record['task'];
 
    if( $task == 'add_contact' ) {
 
        $holder     = array();
        $contact_id = '';
        $method     = 'POST';
        $objectName = $data['objectId'];
        $endpoint   ='objects/' . $objectName;
        $user_id    = $data['userId'];
        $object_id  = '';
        $company_id = '';
        $contact_id = '';
        

        unset($data['userId']);
        unset($data['objectId']);

        if( $data ) {

            $sleep = 0;

            foreach ( $data as $key => $value ) {
                list( $data_type, $original_key ) = explode( '__', $key, 2 );
                                
                if( 'text' == $data_type && 'associated_company' == $original_key ) {
                    $company_name = adfoin_get_parsed_values( $value, $posted_data );
                    sleep(5);
                    $sleep      = 1;
                    $company_id = adfoin_hubspotpro_search_object( 'companies', 'name', $company_name, $record );

                    continue;
                }

                if( 'text' == $data_type && 'associated_contact' == $original_key ) {
                    $contact_email = adfoin_get_parsed_values( $value, $posted_data );

                    if( $sleep == 0 ){
                        sleep(5);
                    }
                    
                    $contact_id = adfoin_hubspotpro_search_object( 'contacts', 'email', $contact_email, $record );

                    continue;
                }
                
                $holder[$original_key] = adfoin_get_parsed_values( $value, $posted_data );
            }

            if( 'notes' == $objectName ) {
                sleep(5);
                $note_body = isset( $holder['note_body'] ) ? $holder['note_body'] : '';
                $timezone  = wp_timezone();
                $date      = date_create( 'now', $timezone );
                $time      = date_format( $date, 'c' );

                $note_data = array(
                    'properties' => array(
                        'hs_note_body'     => $note_body,
                        'hubspot_owner_id' => $user_id,
                        'hs_timestamp'     => $time
                    ),
                    'associations' => array()
                );

                $email = isset( $holder['contact_email'] ) ? $holder['contact_email'] : '';

                if( $email ) {
                    $contact_id = adfoin_hubspotpro_search_object( 'contacts', 'email', $email, $record );

                    if( $contact_id ) {
                        $note_data['associations'][] = array(
                            
                            'to' => array(
                                'id' => $contact_id
                            ),
                            'types' => array(
                                array(
                                    'associationCategory' => 'HUBSPOT_DEFINED',
                                    'associationTypeId' => 202
                                )
                            )
                        );
                    }
                }

                $company = isset( $holder['company'] ) ? $holder['company'] : '';

                if( $company ) {
                    $company_id = adfoin_hubspotpro_search_object( 'companies', 'name', $company, $record );

                    if( $company_id ) {
                        $note_data['associations'][] = array(
                            'to' => array(
                                'id' => $company_id
                            ),
                            'types' => array(
                                array(
                                    'associationCategory' => 'HUBSPOT_DEFINED',
                                    'associationTypeId' => 190
                                )
                            )
                        );
                    }
                }

                $note_response = adfoin_hubspot_request( 'objects/notes', 'POST', $note_data, $record );

                return;
            }

            if( 'contacts' == $objectName ) {
                $email = isset( $holder['email'] ) ? $holder['email'] : '';

                if( $email ) {
                    $contact_id = adfoin_hubspotpro_search_object( 'contacts', 'email', $email, $record );
                
                    if( $contact_id ) {
                        $method   = 'PATCH';
                        $endpoint = "objects/contacts/{$contact_id}";
                    }
                }
            }
            
            if( $user_id ) {
                $holder['hubspot_owner_id'] = $user_id;
            }
        } 

        $body     = array( 'properties' => array_filter( $holder ) );
        $response = adfoin_hubspot_request( $endpoint, $method, $body, $record );

        if( !is_wp_error( $response ) ) {
            $object_response_body = json_decode( wp_remote_retrieve_body( $response ), true );

            if( isset( $object_response_body['id'] ) ) {
                $object_id = $object_response_body['id'];
            }

            if( 'contacts' == $objectName && $company_id && $object_id ) {
                $body = array(
                    'inputs' => array(
                        array(
                            'from' => array( 'id' => $object_id ),
                            'to' => array( 'id' => $company_id ),
                            'type' => 'contact_to_company'
                        ),
                        
                    )
                );

                $contact_assoc_response = adfoin_hubspot_request( 'associations/contacts/companies/batch/create', 'POST', $body, $record );
            } 

            if( ('deals' == $objectName && $object_id && $company_id) || ('deals' == $objectName && $object_id && $contact_id)  ) {

                if ( $company_id){

                    $body = array(
                        'inputs' => array(
                            array(
                                'from' => array( 'id' => $object_id ),
                                'to'   => array( 'id' => $company_id ),
                                'type' => 'deal_to_company'
                            ),
                            
                        )
                    );

                    $deal_company_assoc_response = adfoin_hubspot_request( 'associations/deals/companies/batch/create', 'POST', $body, $record );
                }
                
                if( $contact_id ){
                    $body = array(
                        'inputs' => array(
                            array(
                                'from' => array( 'id' => $object_id ),
                                'to'   => array( 'id' => $contact_id ),
                                'type' => 'deal_to_contact'
                            ),
                            
                        )
                    );

                    $deal_contact_assoc_response = adfoin_hubspot_request( 'associations/deals/contacts/batch/create', 'POST', $body, $record );
                }
            } 

            if( ('tickets' == $objectName && $object_id && $company_id) || ( 'tickets' == $objectName && $object_id && $contact_id )  ) {

                if ( $company_id){

                    $body = array(
                        'inputs' => array(
                            array(
                                'from' => array( 'id' => $object_id ),
                                'to'   => array( 'id' => $company_id ),
                                'type' => 'ticket_to_company'
                            ),
                            
                        )
                    );

                    $deal_company_assoc_response = adfoin_hubspot_request( 'associations/tickets/companies/batch/create', 'POST', $body, $record );
                }
                
                if( $contact_id ){
                    $body = array(
                        'inputs' => array(
                            array(
                                'from' => array( 'id' => $object_id ),
                                'to'   => array( 'id' => $contact_id ),
                                'type' => 'ticket_to_contact'
                            ),
                            
                        )
                    );

                    $deal_contact_assoc_response = adfoin_hubspot_request( 'associations/tickets/contacts/batch/create', 'POST', $body, $record );
                }
            }
        }
    
    }

    return;
}

/**
 * Search Hubpost Object
 */
function adfoin_hubspotpro_search_object( $object, $key, $value, $record ) {
    if( !$object || !$key || !$value ) {
        return;
    }

    $body = array(
        'filters' => array(
            array(
                'propertyName' => $key,
                'operator'     => 'EQ',
                'value'        => $value
            )
        )
    );

    $response = adfoin_hubspot_request( 'objects/' . $object . '/search', 'POST', $body, $record );
    $body     = json_decode( wp_remote_retrieve_body( $response ), true );
    $id       = '';

    if( $body['results'] && is_array( $body['results'] ) && count( $body['results'] ) > 0 ) {
        $id = $body['results'][0]['id'];
    }

    return $id;
}