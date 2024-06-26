<?php

class ADFOIN_ConstantContactPro extends Advanced_Form_Integration_OAuth2 {

    const service_name           = 'constant_contact';
    const authorization_endpoint = 'https://authz.constantcontact.com/oauth2/default/v1/authorize';
    const token_endpoint         = 'https://authz.constantcontact.com/oauth2/default/v1/token';
    const refresh_token_endpoint = 'https://authz.constantcontact.com/oauth2/default/v1/token';

    private static $instance;
    protected      $contact_lists = array();

    public static function get_instance() {

        if ( empty( self::$instance ) ) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    private function __construct() {

        $this->authorization_endpoint = self::authorization_endpoint;
        $this->token_endpoint         = self::token_endpoint;
        $this->refresh_token_endpoint = self::refresh_token_endpoint;

        $option = (array) maybe_unserialize( get_option( 'adfoin_constantcontact_keys' ) );

        if ( isset( $option['client_id'] ) ) {
            $this->client_id = $option['client_id'];
        }

        if ( isset( $option['client_secret'] ) ) {
            $this->client_secret = $option['client_secret'];
        }

        if ( isset( $option['access_token'] ) ) {
            $this->access_token = $option['access_token'];
        }

        if ( isset( $option['refresh_token'] ) ) {
            $this->refresh_token = $option['refresh_token'];
        }

        if ( $this->is_active() ) {
            if ( isset( $option['contact_lists'] ) ) {
                $this->contact_lists = $option['contact_lists'];
            }
        }

        add_filter( 'adfoin_action_providers', array( $this, 'adfoin_constantcontactpro_actions' ), 10, 1 );
        add_action( 'adfoin_action_fields', array( $this, 'action_fields' ), 10, 1 );
        add_action( 'wp_ajax_adfoin_get_constantcontactpro_custom_fields', array( $this, 'get_custom_fields' ), 10, 0 );
    }

    public function adfoin_constantcontactpro_actions( $actions ) {

        $actions['constantcontactpro'] = array(
            'title' => __( 'Constant Contact [PRO]', 'advanced-form-integration' ),
            'tasks' => array(
                'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' )
            )
        );

        return $actions;
    }

    public function action_fields() {
        ?>
        <script type="text/template" id="constantcontactpro-action-template">
            <table class="form-table">
                <tr valign="top" v-if="action.task == 'subscribe'">
                    <th scope="row">
                        <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                        <div class="spinner" v-bind:class="{'is-active': cfLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    </th>
                    <td scope="row">

                    </td>
                </tr>

                <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                    <td scope="row-title">
                        <label for="tablecell">
                            <?php esc_attr_e( 'Constant Contact List', 'advanced-form-integration' ); ?>
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
                            <?php esc_attr_e( 'Permission Type', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <select name="fieldData[permission]" v-model="fielddata.permission">
                            <option value="explicit"> <?php _e( 'Express', 'advanced-form-integration' ); ?> </option>
                            <option value="implicit"> <?php _e( 'Implied', 'advanced-form-integration' ); ?> </option>
                        </select>
                    </td>
                </tr>

                <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                    <td scope="row-title">
                        <label for="tablecell">
                            <?php esc_attr_e( 'Create Source', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <select name="fieldData[createSource]" v-model="fielddata.createSource">
                            <option value="Account"> <?php _e( 'Account', 'advanced-form-integration' ); ?> </option>
                            <option value="Contact"> <?php _e( 'Contact', 'advanced-form-integration' ); ?> </option>
                        </select>
                    </td>
                </tr>

                <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                    <td scope="row-title">
                        <label for="tablecell">
                            <?php esc_attr_e( 'Don\'t update if contact already exists', 'advanced-form-integration' ); ?>
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

    protected function save_data() {

        $data = (array) maybe_unserialize( get_option( 'adfoin_constantcontac_keys' ) );

        $option = array_merge(
            $data,
            array(
                'client_id'     => $this->client_id,
                'client_secret' => $this->client_secret,
                'access_token'  => $this->access_token,
                'refresh_token' => $this->refresh_token,
                'contact_lists' => $this->contact_lists,
            )
        );

        update_option( 'adfoin_constantcontact_keys', maybe_serialize( $option ) );
    }

    protected function reset_data() {

        $this->client_id     = '';
        $this->client_secret = '';
        $this->access_token  = '';
        $this->refresh_token = '';
        $this->contact_lists = [ ];

        $this->save_data();
    }

    public function request( $endpoint, $method = 'GET', $data = array(), $record = array() ) {
        $base_url = 'https://api.cc.email/v3/';
        $url      = $base_url . $endpoint;

        $args = array(
            'method'  => $method,
            'headers' => array(
                'Accept'       => 'application/json',
                'Content-Type' => 'application/json; charset=utf-8',
            ),
        );

        if ( 'POST' == $method || 'PUT' == $method ) {
            $args['body'] = json_encode( $data );
        }

        $response = $this->remote_request($url, $args);

        if ( $record ) {
            adfoin_add_to_log($response, $url, $args, $record);
        }

        return $response;
    }

    public function get_custom_fields() {

        // Security Check
        if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
            die( __( 'Security check Failed', 'advanced-form-integration' ) );
        }

        $response      = $this->request( 'contact_custom_fields?limit=500' );
        $response_body = wp_remote_retrieve_body( $response );

        if ( empty( $response_body ) ) {
            wp_send_json_error();
        }

        $response_body = json_decode( $response_body, true );
        $custom_fields = array();

        if ( !empty( $response_body['custom_fields'] ) ) {
            foreach( $response_body['custom_fields'] as $single ) {
                array_push( $custom_fields, array( 'key' => 'cf_' . $single['custom_field_id'], 'value' => $single['name'], 'description' => '' ) );
            }
        }
        
        wp_send_json_success( $custom_fields );
    }

    public function get_tags() {
        $response      = $this->request( 'contact_tags?limit=500' );
        $response_body = wp_remote_retrieve_body( $response );

        if ( empty( $response_body ) ) {
            return array();
        }

        $response_body = json_decode( $response_body, true );

        if ( !empty( $response_body['tags'] ) ) {
            $tags = wp_list_pluck( $response_body['tags'], 'tag_id', 'name' );

            return $tags;
        } else {
            return array();
        }
    }

    public function contact_exists( $email ) {
        $response      = $this->request( 'contacts?status=all&email=' . $email .'&include=custom_fields,list_memberships' );
        $response_body = wp_remote_retrieve_body( $response );
        $response_body = json_decode( $response_body, true );
        $contact_id    = '';

        if( isset( $response_body['contacts'] ) && is_array( $response_body['contacts'] ) ) {
            if( count( $response_body['contacts'] ) > 0 && $response_body['contacts'][0]['email_address']['address'] == $email ) {
                $contact_id = $response_body['contacts'][0]['contact_id'];

                if( $contact_id ) {
                    return array( 'id' => $contact_id, 'data' => $response_body['contacts'][0] );
                } else {
                    return false;
                }
            }
        }

        return false;
    }

    public function create_contact( $properties, $record = array() ) {
        $response = $this->request( 'contacts', 'POST', $properties, $record );

        return $response;
    }

    public function update_contact( $contact_id, $properties, $record = array() ) {
        $response = $this->request( 'contacts/' . $contact_id, 'PUT', $properties, $record );

        return $response;
    }

    public function create_tag( $properties, $record = array() ) {
        $response = $this->request( 'activities/contacts_taggings_add', 'POST', $properties, $record );

        return $response;
    }
}

$constantcontactpro = ADFOIN_ConstantContactPro::get_instance();

add_action( 'adfoin_constantcontactpro_job_queue', 'adfoin_constantcontactpro_job_queue', 10, 1 );

function adfoin_constantcontactpro_job_queue( $data ) {
    adfoin_constantcontactpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Constant Contact API
 */
function adfoin_constantcontactpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $constantcontactpro = ADFOIN_ConstantContactPro::get_instance();
    $data               = $record_data['field_data'];
    $list_id            = isset( $data['listId'] ) ? $data['listId'] : '';
    $update             = isset( $data['update'] ) ? $data['update'] : '';
    $permission         = isset( $data['permission'] ) ? $data['permission'] : 'explicit';
    $create_source      = isset( $data['createSource'] ) ? $data['createSource'] : 'Account';
    $task               = $record['task'];


    if( $task == 'subscribe' ) {
        $email      = empty( $data['email'] ) ? '' : trim( adfoin_get_parsed_values( $data['email'], $posted_data ) );
        $contact = $constantcontactpro->contact_exists( $email );
        $contact_id = $contact ? $contact['id'] : '';

        if( $contact_id && 'true' == $update ) {
            return;
        }

        $first_name     = empty( $data['firstName'] ) ? '' : adfoin_get_parsed_values($data['firstName'], $posted_data );
        $last_name      = empty( $data['lastName'] ) ? '' : adfoin_get_parsed_values($data['lastName'], $posted_data );
        $company_name   = empty( $data['companyName'] ) ? '' : adfoin_get_parsed_values($data['companyName'], $posted_data );
        $job_title      = empty( $data['jobTitle'] ) ? '' : adfoin_get_parsed_values($data['jobTitle'], $posted_data );
        $work_phone     = empty( $data['phoneNumber'] ) ? '' : adfoin_get_parsed_values($data['phoneNumber'], $posted_data );
        $home_phone     = empty( $data['homePhone'] ) ? '' : adfoin_get_parsed_values($data['homePhone'], $posted_data );
        $mobile_phone   = empty( $data['mobilePhone'] ) ? '' : adfoin_get_parsed_values($data['mobilePhone'], $posted_data );
        $birthday_month = empty( $data['birthdayMonth'] ) ? '' : adfoin_get_parsed_values($data['birthdayMonth'], $posted_data );
        $birthday_day   = empty( $data['birthdayDay'] ) ? '' : adfoin_get_parsed_values($data['birthdayDay'], $posted_data );
        $anniversary    = empty( $data['anniversary'] ) ? '' : adfoin_get_parsed_values($data['anniversary'], $posted_data );
        $address_type   = empty( $data['addressType'] ) ? '' : adfoin_get_parsed_values($data['addressType'], $posted_data );
        $address1       = empty( $data['address1'] ) ? '' : adfoin_get_parsed_values($data['address1'], $posted_data );
        $city           = empty( $data['city'] ) ? '' : adfoin_get_parsed_values($data['city'], $posted_data );
        $state          = empty( $data['state'] ) ? '' : adfoin_get_parsed_values($data['state'], $posted_data );
        $zip            = empty( $data['zip'] ) ? '' : adfoin_get_parsed_values($data['zip'], $posted_data );
        $country        = empty( $data['country'] ) ? '' : adfoin_get_parsed_values($data['country'], $posted_data );
        $tags           = empty( $data['tags'] ) ? '' : explode( ',', $data['tags'] );

        $properties = array();

        if( $email ) { $properties['email_address'] = array( 'address' => $email, 'permission_to_send' => $permission ); }
        if( $first_name ) { $properties['first_name'] = $first_name; }
        if( $last_name ) { $properties['last_name'] = $last_name; }
        if( $company_name ) { $properties['company_name'] = $company_name; }
        if( $job_title ) { $properties['job_title'] = $job_title; }
        if( $birthday_month ) { $properties['birthday_month'] = $birthday_month; }
        if( $birthday_day ) { $properties['birthday_day'] = $birthday_day; }
        if( $anniversary ) { $properties['anniversary'] = $anniversary; }

        if( $list_id ) {
            $properties['list_memberships'] = array( $list_id );
        }

        if( $work_phone || $home_phone || $mobile_phone ) {
            $properties['phone_numbers'] = array();

            if( $work_phone ) {
                array_push( $properties['phone_numbers'], array( 'phone_number' => $work_phone, 'kind' => 'work' ) );
            }

            if( $home_phone ) {
                array_push( $properties['phone_numbers'], array( 'phone_number' => $home_phone, 'kind' => 'home' ) );
            }

            if( $mobile_phone ) {
                array_push( $properties['phone_numbers'], array( 'phone_number' => $mobile_phone, 'kind' => 'mobile' ) );
            }
        }

        if( $address1 || $city || $state || $zip || $country ) {
            $kind = $address_type ? $address_type : 'home';
            $properties['street_addresses'] = array(array(
                'kind'        => $kind,
                'street'      => $address1,
                'city'        => $city,
                'state'       => $state,
                'postal_code' => $zip,
                'country'     => $country
            ));
        }

        $cf_fields = array();

        foreach( $data as $key => $value ) {
            if ( substr( $key, 0, 3 ) == 'cf_' && $value ) {
                $original_key             = substr( $key, 3 );
                $cf_value = empty( $data[$key] ) ? '' : adfoin_get_parsed_values( $data[$key], $posted_data );

                if( $cf_value ) {
                    array_push( $cf_fields, array( 'custom_field_id' => $original_key, 'value' => $cf_value ) );
                }
            }
        }

        if( $cf_fields ) {
            $properties['custom_fields'] = $cf_fields;
        }

        if( $contact_id ) {
            $previous_data = $contact['data'];
        
            if( isset( $previous_data['custom_fields'] ) ) {
                if( isset( $properties['custom_fields'] ) ) {
                    $ids = wp_list_pluck( $properties['custom_fields'], 'custom_field_id' );
                    foreach( $previous_data['custom_fields'] as $field ) {
                        if( !in_array( $field['custom_field_id'], $ids ) ) {
                            array_push( $properties['custom_fields'], $field );
                        }
                    }
                } else {
                    $properties['custom_fields'] = $previous_data['custom_fields'];
                }
            }
    
            if( isset( $previous_data['list_memberships'] ) ) {
                foreach( $previous_data['list_memberships'] as $list ) {
                    if( !in_array( $list, $properties['list_memberships'] ) ) {
                        array_push( $properties['list_memberships'], $list );
                    }
                }   
            }

            $properties['update_source'] = $create_source;
            $return = $constantcontactpro->update_contact( $contact_id, $properties, $record );
        } else {
            $properties['create_source'] = $create_source;
            $return = $constantcontactpro->create_contact( $properties, $record );
        }
        
        $response_body = wp_remote_retrieve_body( $return );
        $response_body = json_decode( $response_body, true );

        if( isset( $response_body['contact_id'] ) ) {
            if( $tags && is_array( $tags ) ) {
                $tag_ids = array();
                $all_tags = $constantcontactpro->get_tags();
    
                foreach( $tags as $tag ) {
                    $tag = trim( $tag );
                    $tag_ids[] = $all_tags[$tag];
                }
    
                if( $tag_ids ) {
                    $tag_data = array(
                        'source' => array(
                            'contact_ids' => array( $response_body['contact_id'] )
                        ),
                        'tag_ids' => $tag_ids
                    );

                    $constantcontactpro->create_tag( $tag_data, $record );
                }
            }
        }
    }

    return;
}