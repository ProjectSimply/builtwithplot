<?php

add_filter( 'adfoin_action_providers', 'adfoin_activecampaignpro_actions', 10, 1 );

function adfoin_activecampaignpro_actions( $actions ) {

    $actions['activecampaignpro'] = array(
        'title' => __( 'ActiveCampaign [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Add Contact/Deal/Note', 'advanced-form-integration' )
        )
    );

    return $actions;
}


add_action( 'adfoin_add_js_fields', 'adfoin_activecampaignpro_js_fields', 10, 1 );

function adfoin_activecampaignpro_js_fields( $field_data ) { }

add_action( 'adfoin_action_fields', 'adfoin_activecampaignpro_action_fields' );

function adfoin_activecampaignpro_action_fields() {
    ?>
    <script type="text/template" id="activecampaignpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr class="alternate" v-if="action.task == 'subscribe'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'Instructions', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <p><?php _e('This action will create/update contact at first and then add it to other tasks if filled. For example if you want to add the contact to a list or automation or deal just select/fill those fields only, leave other fields blank.', 'advanced-form-integration' );?></p>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Account', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[accountId]" v-model="fielddata.accountId">
                        <option value=""> <?php _e( 'Select Account...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.accounts" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': accountLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'List', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId">
                        <option value=""> <?php _e( 'Select List...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.list" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Automation', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[automationId]" v-model="fielddata.automationId">
                        <option value=""> <?php _e( 'Select Automation...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.automations" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': automationLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Update if contact already exists', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[update]" value="true" v-model="fielddata.update">
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>

        </table>
    </script>


    <?php
}

add_action( 'wp_ajax_adfoin_get_activecampaignpro_list', 'adfoin_get_activecampaignpro_list', 10, 0 );

/*
 * Get ActiveCampaign subscriber lists
 */
function adfoin_get_activecampaignpro_list() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $all_lists = array();
    $offset = 0;
    $hasnext = true;

    do{
        $data  = adfoin_activecampaign_request( 'lists?limit=100&offset=' . $offset );

        if( is_wp_error( $data ) ) {
            wp_send_json_error();
        }

        $body  = json_decode( wp_remote_retrieve_body( $data ) );
        $lists = wp_list_pluck( $body->lists, 'name', 'id' );

        $all_lists = $all_lists + $lists;

        if( count( $lists ) == 100 ) {
            $offset = $offset + 100;
        }else{
            $hasnext = false;
        }
    } while($hasnext);
    
    wp_send_json_success( $all_lists );

}

//Get Contact Field Types
function adfoin_get_activecampaignpro_contact_field_types() {
    $types = array();

    $offset = 0;
    $hasnext = true;

    do{
        $data  = adfoin_activecampaign_request( 'fields?limit=100&offset=' . $offset );

        if( is_wp_error( $data ) ) {
            wp_send_json_error();
        }

        $body  = json_decode( wp_remote_retrieve_body( $data ) );
        $fields = wp_list_pluck( $body->fields, 'type', 'id' );

        $types = $types + $fields;

        if( count( $fields ) == 100 ) {
            $offset = $offset + 100;
        }else{
            $hasnext = false;
        }
    } while( $hasnext );

    return $types;
}

add_action( 'wp_ajax_adfoin_get_activecampaignpro_contact_fields', 'adfoin_get_activecampaignpro_contact_fields', 10, 0 );

/*
 * Get ActiveCampaign Contct Fields
 */
function adfoin_get_activecampaignpro_contact_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $offset = 0;
    $hasnext = true;
    $cus_fields = array();

    do{
        $data  = adfoin_activecampaign_request( 'fields?limit=100&offset=' . $offset );

        if( is_wp_error( $data ) ) {
            wp_send_json_error();
        }

        $body  = json_decode( wp_remote_retrieve_body( $data ) );
        $fields = wp_list_pluck( $body->fields, 'title', 'id' );

        $cus_fields = $cus_fields + $fields;

        if( count( $fields ) == 100 ) {
            $offset = $offset + 100;
        }else{
            $hasnext = false;
        }
    } while($hasnext);

    $raw_tags   = array();
    $tags       = '';
    $tag_data   = adfoin_activecampaign_request( 'tags?limit=100' );
    $tag_body   = json_decode( wp_remote_retrieve_body( $tag_data ) );

    foreach( $tag_body->tags as $single ) {
        if( 'contact' == $single->tagType ) {
            $raw_tags[] = $single->tag . ': ' . $single->id;
        }
    }

    if( $raw_tags ) {
        $tags = implode( ' ', $raw_tags );
        $tags = sprintf( '%s (Use comma for multiple)', $tags );
    }

    $contact_fields = array(
        array( 'key' => 'email', 'value' => 'Email [Contact]', 'description' => '' ),
        array( 'key' => 'firstName', 'value' => 'First Name [Contact]', 'description' => '' ),
        array( 'key' => 'lastName', 'value' => 'Last Name [Contact]', 'description' => '' ),
        array( 'key' => 'phoneNumber', 'value' => 'Phone [Contact]', 'description' => '' ),
        array( 'key' => 'note', 'value' => 'Note', 'description' => '' ),
        array( 'key' => 'contactTags', 'value' => 'Tag ID [Contact]', 'description' => $tags )
    );

    if( $cus_fields ) {
        foreach ( $cus_fields as $key => $value ) {
            array_push( $contact_fields, array( 'key' => 'con_' . $key, 'value' => $value . ' [Contact]', 'description' => '' ) );
        }
    }

    wp_send_json_success( $contact_fields );

    return;
}

add_action( 'wp_ajax_adfoin_get_activecampaignpro_deal_fields', 'adfoin_get_activecampaignpro_deal_fields', 10, 0 );

/*
 * Get ActiveCampaign Deal Fields
 */
function adfoin_get_activecampaignpro_deal_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $api_key  = get_option( 'adfoin_activecampaign_api_key' );
    $base_url = get_option( 'adfoin_activecampaign_url' );

    if( !$api_key || !$base_url ) {
        return array();
    }

    $url   = "{$base_url}/api/3/dealGroups?limit=100";

    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'Api-Token'    => $api_key
        )
    );

    $data  = wp_remote_get( $url, $args );

    $stages     = '';
    $stage_body = json_decode( wp_remote_retrieve_body( $data ) );

    $pipelines = wp_list_pluck( $stage_body->dealGroups, 'title', 'id' );

    foreach( $stage_body->dealStages as $single ) {
        $stages .= $pipelines[$single->group] . '/' . $single->title . ': ' . $single->id . ' ';
    }

    $user_url  = "{$base_url}/api/3/users?limit=100";
    $user_data = wp_remote_get( $user_url, $args );
    $users     = '';
    $user_body = json_decode( wp_remote_retrieve_body( $user_data ) );

    foreach( $user_body->users as $single ) {
        $users .= $single->username . ': ' . $single->id . ' ';
    }

    $deal_fields = array(
        array( 'key' => 'dealTitle', 'value' => 'Title [Deal]', 'description' => 'Required for deal creation, leave blank if not needed' ),
        array( 'key' => 'dealDescription', 'value' => 'Description [Deal]', 'description' => '' ),
        array( 'key' => 'dealCurrency', 'value' => 'Currency [Deal]', 'description' => '' ),
        array( 'key' => 'dealStage', 'value' => 'Stage ID [Deal]', 'description' => $stages ),
        array( 'key' => 'dealOwner', 'value' => 'Owner ID [Deal]', 'description' => $users ),
        array( 'key' => 'dealValue', 'value' => 'Value [Deal]', 'description' => '' )
    );

    $cus_url    = "{$base_url}/api/3/dealCustomFieldMeta?limit=100";
    $cus_data   = wp_remote_get( $cus_url, $args );
    $cus_fields = array();

    if( !is_wp_error( $cus_data ) ) {
        $cus_body   = json_decode( wp_remote_retrieve_body( $cus_data ) );
        $cus_fields = wp_list_pluck( $cus_body->dealCustomFieldMeta, 'fieldLabel', 'id' );
    }

    if( $cus_fields ) {
        foreach ( $cus_fields as $key => $value ) {
            array_push( $deal_fields, array( 'key' => 'del_' . $key, 'value' => $value . ' [Deal]', 'description' => '' ) );
        }
    }

    wp_send_json_success( $deal_fields );

    return;
}

add_action( 'adfoin_activecampaignpro_job_queue', 'adfoin_activecampaignpro_job_queue', 10, 1 );

function adfoin_activecampaignpro_job_queue( $data ) {
    adfoin_activecampaignpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to ActiveCampaign API
 */
function adfoin_activecampaignpro_send_data( $record, $posted_data ) {

    $api_key  = get_option( 'adfoin_activecampaign_api_key' ) ? get_option( 'adfoin_activecampaign_api_key' ) : '';
    $base_url = get_option( 'adfoin_activecampaign_url' ) ? get_option( 'adfoin_activecampaign_url' ) : '';

    if(!$api_key || !$base_url ) {
        exit;
    }

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data']) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data['field_data'];
    $list_id = $data['listId'];
    $aut_id  = $data['automationId'];
    $acc_id  = $data['accountId'];
    $task    = $record['task'];
    $update  = isset( $data['update'] ) ? $data['update'] : '';
    $email   = empty( $data['email'] ) ? '' : trim( adfoin_get_parsed_values($data['email'], $posted_data ) );

    if( $task == 'subscribe' ) {
        $first_name   = empty( $data['firstName'] ) ? '' : adfoin_get_parsed_values( $data['firstName'], $posted_data );
        $last_name    = empty( $data['lastName'] ) ? '' : adfoin_get_parsed_values( $data['lastName'], $posted_data );
        $phone_number = empty( $data['phoneNumber'] ) ? '' : adfoin_get_parsed_values( $data['phoneNumber'], $posted_data );
        $deal_title   = empty( $data['dealTitle'] ) ? '' : adfoin_get_parsed_values( $data['dealTitle'], $posted_data );
        $note         = empty( $data['note'] ) ? '' : adfoin_get_parsed_values( $data['note'], $posted_data);
        $contact_tags = $data['contactTags'];
        $con_fields   = array();
        $del_fields   = array();
        $holder       = array();

        foreach( $data as $key => $value ) {
            $holder[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );
        }

        foreach( $holder as $key => $value ) {
            if( substr( $key, 0, 4 ) == 'con_' && $value ) {
                $key = substr( $key, 4 );

                $con_fields[$key] = $value;
            }

            if( substr( $key, 0, 4 ) == 'del_' && $value ) {
                $key = substr( $key, 4 );

                $del_fields[$key] = $value;
            }
        }

        $url = "{$base_url}/api/3/contacts";

        if( 'true' == $update ) {
            $url = "{$base_url}/api/3/contact/sync";
        }

        $request_data = array(
            'contact' => array(
                'email'       => $email,
                'first_name'  => $first_name,
                'last_name'   => $last_name,
                'phone'       => $phone_number,
                'fieldValues' => array()
            )
        );

        if( $con_fields ) {
            $types = adfoin_get_activecampaignpro_contact_field_types();

            foreach( $con_fields as $key => $value ) {

                if( isset( $types[$key] ) && 'checkbox' == $types[$key] ) {
                    $value = explode( ',', $value );
                    $value = '||' . implode( '||', $value ) . '||';
                }

                if( isset( $types[$key] ) && 'datetime' == $types[$key] ) {
                    $timezone = wp_timezone();
                    $date     = date_create( $value, $timezone );
                    if( $date ) {
                    	$value    = date_format( $date, 'c' );
                    }
                }

                array_push( $request_data['contact']['fieldValues'], array( 'field' => $key, 'value' => $value ) );
            }
        }
        

        $request_data = array_map( 'array_filter', $request_data );

        $args = array(

            'headers' => array(
                'Content-Type' => 'application/json',
                'Api-Token'    => $api_key
            ),
            'body' => json_encode( $request_data )
        );

        $return = wp_remote_post( $url, $args );

        adfoin_add_to_log( $return, $url, $args, $record );

        $contact_id = '';

        if( !is_wp_error( $return ) ) {
            $return_body = json_decode( wp_remote_retrieve_body( $return ) );
            $contact_id  = $return_body->contact->id;
        }

        if( $contact_id && $contact_tags ) {
            $tags_array = explode( ',', $contact_tags );

            if( is_array( $tags_array ) ) {
                $tag_url  = "{$base_url}/api/3/contactTags";
                $tag_args = array(
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Api-Token'    => $api_key
                    )
                );

                foreach( $tags_array as $tag ) {
                    $tag_args['body'] = json_encode( array(
                        'contactTag'=> array(
                            'contact' => $contact_id,
                            'tag'     => adfoin_get_parsed_values( trim( $tag ), $posted_data )
                        )
                    ));

                    $tag_return = wp_remote_post( $tag_url, $tag_args );

                    adfoin_add_to_log( $tag_return, $tag_url, $tag_args, $record );
                }
            }
        }

        if( $contact_id && $list_id ) {

            $url = "{$base_url}/api/3/contactLists";

            $list_request_data = array(
                'contactList' => array(
                    'list'    => $list_id,
                    'contact' => $contact_id,
                    'status'  => 1
                )
            );

            $args = array(

                'headers' => array(
                    'Content-Type' => 'application/json',
                    'Api-Token'    => $api_key
                ),
                'body' => json_encode( $list_request_data )
            );

            $return = wp_remote_post( $url, $args );

            adfoin_add_to_log( $return, $url, $args, $record );
        }

        if( $contact_id && $aut_id ) {

            $url = "{$base_url}/api/3/contactAutomations";

            $aut_request_data = array(
                'contactAutomation' => array(
                    'automation' => $aut_id,
                    'contact'    => $contact_id
                )
            );

            $args = array(

                'headers' => array(
                    'Content-Type' => 'application/json',
                    'Api-Token'    => $api_key
                ),
                'body' => json_encode( $aut_request_data )
            );

            $return = wp_remote_post( $url, $args );

            adfoin_add_to_log( $return, $url, $args, $record );
        }

        if( $contact_id && $acc_id ) {

            $url = "{$base_url}/api/3/accountContacts";

            $acc_request_data = array(
                'accountContact' => array(
                    'account' => $acc_id,
                    'contact' => $contact_id
                )
            );

            $args = array(

                'headers' => array(
                    'Content-Type' => 'application/json',
                    'Api-Token'    => $api_key
                ),
                'body' => json_encode( $acc_request_data )
            );

            $return = wp_remote_post( $url, $args );

            adfoin_add_to_log( $return, $url, $args, $record );
        }

        if( $contact_id && $deal_title ) {

            $deal_description = empty( $data['dealDescription'] ) ? '' : adfoin_get_parsed_values( $data['dealDescription'], $posted_data );
            $deal_currency    = empty( $data['dealCurrency'] ) ? 'usd' : adfoin_get_parsed_values( $data['dealCurrency'], $posted_data );
            $deal_stage       = empty( $data['dealStage'] ) ? '' : adfoin_get_parsed_values( $data['dealStage'], $posted_data );
            $deal_owner       = empty( $data['dealOwner'] ) ? '' : adfoin_get_parsed_values( $data['dealOwner'], $posted_data );
            $deal_value       = empty( $data['dealValue'] ) ? '' : adfoin_get_parsed_values( $data['dealValue'], $posted_data );

            $url = "{$base_url}/api/3/deals";

            $deal_request_data = array(
                'deal' => array(
                    'title'       => $deal_title,
                    'description' => $deal_description,
                    'currency'    => $deal_currency,
                    'owner'       => $deal_owner,
                    'value'       => $deal_value ? $deal_value * 100 : '',
                    'stage'       => $deal_stage,
                    'contact'     => $contact_id,
                    'fields'      => array()
                )
            );

            foreach( $del_fields as $key => $value ) {
                array_push( $deal_request_data['deal']['fields'], array( 'customFieldId' => $key, 'fieldValue' => $value ) );
            }

            $args = array(

                'headers' => array(
                    'Content-Type' => 'application/json',
                    'Api-Token'    => $api_key
                ),
                'body' => json_encode( $deal_request_data )
            );

            $return = wp_remote_post( $url, $args );

            adfoin_add_to_log( $return, $url, $args, $record );

        }

        if( $contact_id && $note ) {

            $url = "{$base_url}/api/3/notes";

            $note_request_data = array(
                'note' => array(
                    'note' => $note,
                    'relid'    => $contact_id,
                    'reltype'    => 'Subscriber'
                )
            );

            $args = array(

                'headers' => array(
                    'Content-Type' => 'application/json',
                    'Api-Token'    => $api_key
                ),
                'body' => json_encode( $note_request_data )
            );

            $return = wp_remote_post( $url, $args );

            adfoin_add_to_log( $return, $url, $args, $record );
        }
    }
    return;
}