<?php

class ADFOIN_ZohoCRMPro extends ADFOIN_ZohoCRM {

    const authorization_endpoint = 'https://accounts.zoho.com/oauth/v2/auth';
    const token_endpoint         = 'https://accounts.zoho.com/oauth/v2/token';
    const refresh_token_endpoint = 'https://accounts.zoho.com/oauth/v2/token';

    public $data_center;
    private static $instance;

    public static function get_instance() {

        if ( empty( self::$instance ) ) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    public function __construct() {

        $this->authorization_endpoint = self::authorization_endpoint;
        $this->token_endpoint         = self::token_endpoint;
        $this->refresh_token_endpoint = self::refresh_token_endpoint;

        // $option = (array) maybe_unserialize( get_option( 'adfoin_zohocrm_keys' ) );

        // if ( isset( $option['data_center'] ) ) {
        //     $this->data_center = $option['data_center'];
        // }

        // if ( isset( $option['client_id'] ) ) {
        //     $this->client_id = $option['client_id'];
        // }

        // if ( isset( $option['client_secret'] ) ) {
        //     $this->client_secret = $option['client_secret'];
        // }

        // if ( isset( $option['access_token'] ) ) {
        //     $this->access_token = $option['access_token'];
        // }

        // if ( isset( $option['refresh_token'] ) ) {
        //     $this->refresh_token = $option['refresh_token'];
        // }
        
        add_filter( 'adfoin_action_providers', array( $this, 'adfoin_zohocrm_actions' ), 10, 1 );
        add_action( 'adfoin_action_fields', array( $this, 'action_fields' ), 10, 1 );
        add_action( 'wp_ajax_adfoin_get_zohocrmpro_module_fields', array( $this, 'get_fields' ) );
    }

    public function adfoin_zohocrm_actions( $actions ) {

        $actions['zohocrmpro'] = array(
            'title' => __( 'Zoho CRM [PRO]', 'advanced-form-integration' ),
            'tasks' => array(
                'subscribe' => __( 'Add new record', 'advanced-form-integration' )
            )
        );

        return $actions;
    }

    public function action_fields() {
        ?>
        <script type='text/template' id='zohocrmpro-action-template'>
            <table class='form-table'>
                <tr valign='top' v-if="action.task == 'subscribe'">
                    <th scope='row'>
                        <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                    </th>
                    <td scope='row'>

                    </td>
                </tr>

                <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                    <td scope="row-title">
                        <label for="tablecell">
                            <?php esc_attr_e( 'Zoho Account', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <select name="fieldData[credId]" v-model="fielddata.credId" @change="getUsers">
                        <option value=""> <?php _e( 'Select Account...', 'advanced-form-integration' ); ?> </option>
                            <?php
                                $this->get_credentials_list();
                            ?>
                        </select>
                    </td>
                </tr>

                <tr valign='top' class='alternate' v-if="action.task == 'subscribe'">
                    <td scope='row-title'>
                        <label for='tablecell'>
                            <?php esc_attr_e( 'Zoho User', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <select name="fieldData[userId]" v-model="fielddata.userId" @change="getModules">
                            <option value=''> <?php _e( 'Select User...', 'advanced-form-integration' ); ?> </option>
                            <option v-for='(item, index) in fielddata.users' :value='index' > {{item}}  </option>
                        </select>
                        <div class='spinner' v-bind:class="{'is-active': userLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    </td>
                </tr>

                <tr valign='top' class='alternate' v-if="action.task == 'subscribe'">
                    <td scope='row-title'>
                        <label for='tablecell'>
                            <?php esc_attr_e( 'Module', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <select name="fieldData[moduleId]" v-model="fielddata.moduleId" @change=getFields>
                            <option value=''> <?php _e( 'Select Module...', 'advanced-form-integration' ); ?> </option>
                            <option v-for='(item, index) in fielddata.modules' :value='index' > {{item}}  </option>
                        </select>
                        <div class='spinner' v-bind:class="{'is-active': moduleLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    </td>
                </tr>
                <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                    <td scope="row-title">
                        <label for="tablecell">
                            <?php esc_attr_e( 'Allow Duplicate Record', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <input type="checkbox" name="fieldData[duplicate]" value="true" v-model="fielddata.duplicate">
                    </td>
                </tr>


                <editable-field v-for='field in fields' v-bind:key='field.value' v-bind:field='field' v-bind:trigger='trigger' v-bind:action='action' v-bind:fielddata='fielddata'></editable-field>
            </table>
        </script>


        <?php
    }

    /*
    * Get Module Fields
    */
    public function get_fields() {
        // Security Check
        if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
            die( __( 'Security check Failed', 'advanced-form-integration' ) );
        }

        $final_data = array(
            array( 
                'key' => 'duplicate_check_fields',
                'value' => 'Duplicate Check Field', 
                'description' => 'User defined unique field name. Use only if needed'
            )
        );
        $module  = isset( $_POST['module'] ) ? sanitize_text_field( $_POST['module'] ) : '';
        $cred_id = isset( $_POST['credId'] ) ? sanitize_text_field( $_POST['credId'] ) : '';
        $this->set_credentials( $cred_id );

        if( $module ) {
            $response = $this->zohocrm_request( "settings/fields?module={$module}&type=all" );
            $body     = json_decode( wp_remote_retrieve_body( $response ), true );

            if( isset( $body['fields'] ) && is_array( $body['fields'] ) ) {

                $suppression_list = array( 'Created_By', 'Modified_By', 'Created_Time', 'Modified_Time', 'Layout', 'Recurring_Activity', 'BEST_TIME', 'What_Id' );

                foreach( $body['fields'] as $field ) {
                    $helptext      = '';
                    $data_type     = $field['data_type'];
                    $api_name      = $field['api_name'];
                    $display_label = $field['display_label'];

                    if( isset( $field['field_read_only'] ) && $field['field_read_only'] == true ) {
                        continue;
                    }

                    if( in_array( $api_name, $suppression_list ) ) {
                        continue;
                    }

                    if( 'Contact_Name' == $api_name || 'Who_Id' == $api_name ) {
                        $display_label = 'Contact Email';
                    }

                    if( 'bigint' == $data_type && 'Participants' == $api_name ) {
                        $helptext = 'Example: lead--john@example.com,contact--david@example.com';
                    }

                    if( 'multiselectpicklist' == $data_type && 'Tax' == $api_name ) {
                        $items = array();

                        if( isset( $field['pick_list_values'] ) && is_array( $field['pick_list_values'] ) ) {
                            foreach( $field['pick_list_values'] as $pick ) {
                                $items[] = $pick['display_value'] . ': ' . $pick['id'];
                            }
                        }

                        $helptext = implode( ', ', $items );
                    }

                    if( 'picklist' == $data_type && is_array( $field['pick_list_values'] ) ) {
                        $picklist = wp_list_pluck( $field['pick_list_values'], 'actual_value' );
                        $helptext = implode( ' | ', $picklist );
                    }

                    if( 'multiselectpicklist' == $data_type && is_array( $field['pick_list_values'] ) ) {
                        $picklist = wp_list_pluck( $field['pick_list_values'], 'actual_value' );
                        $helptext = implode( ' | ', $picklist );
                    }

                    array_push( $final_data, array( 'key' => $data_type . '__' . $api_name, 'value' => $display_label, 'description' => $helptext ) );
                }

                if( 'Tasks' == $module || 'Events' == $module ) {
                    array_push( $final_data, array( 'key' => 'text__$se_module', 'value' => 'Module Name', 'description' => 'Accounts | Deals' ) );
                    array_push( $final_data, array( 'key' => 'text__What_Id', 'value' => 'Module Record', 'description' => 'Account Name | Deal Name' ) );
                }
            }
        }

        array_push( $final_data, array( 'key' => 'fileupload__Attachment', 'value' => 'Attachment', 'description' => 'Attach file link here' ) );

        wp_send_json_success( $final_data );
    }

    /**
     * Retrieve tags associated with a module.
     *
     * This function retrieves tags associated with a specific module based on certain conditions.
     * It checks the module type (e.g., 'Leads', 'Contacts', 'Accounts'),
     * searches for the record, and extracts associated tags.
     *
     * @param string $module The module type (e.g., 'Leads', 'Contacts', 'Accounts').
     * @param array $holder An array containing submitted data, typically with 'Email' or 'Account_Name'.
     * @param mixed $record The integration data.
     *
     * @return array An array containing the tags associated with the specified module.
     */
    public function get_tags( $module, $holder, $record ) {

        $tags = array();

        if( 'Leads' == $module ) {
            $record = $this->search_record( 'Leads', 'Email', $holder['Email'], $record );
        }

        if( 'Contacts' == $module ) {
            $record = $this->search_record( 'Contacts', 'Email', $holder['Email'], $record );
        }

        if( 'Accounts' == $module ) {
            $record = $this->search_record( 'Accounts', 'Account_Name', $holder['Account_Name'], $record );
        }

        if( isset( $record, $record['data'], $record['data']['Tag'] ) && is_array( $record['data']['Tag'] ) ) {
            foreach( $record['data']['Tag'] as $tag ) {
                $tags[] = $tag['name'];
            }
        }

        return $tags;
    }

    public function upload_file( $module, $record_id, $file, $upload_type = 'fileupload', $is_attachment = false ) {
        // $file = $_FILES['file'];
        $payload_boundary = wp_generate_password( 24 );

        $file_path = $file;
        $file_name = basename( $file );
        $file_type = mime_content_type( $file_path );

        $endpoint = $is_attachment ? "{$module}/{$record_id}/Attachments" : "files";

        $payload = '';
        $payload .= $this->preparePayload( $payload_boundary, $file_path, $file_name, $file_type );

        if ( empty( $payload ) ) {
            return false;
        }

        $payload .= '--' . $payload_boundary . '--';
        $uploadResponse = $this->file_request( $endpoint, $payload, $payload_boundary );

        return $uploadResponse;
    
    }

    public function preparePayload( $payload_boundary, $file_path, $file_name, $file_type ) {
        $payload = '';

        if ( ( is_readable( "{$file_path}" ) && ! is_dir( "{$file_path}" ) )  || filter_var( $file_path, FILTER_VALIDATE_URL ) ) {
            $payload .= '--' . $payload_boundary;
            $payload .= "\r\n";
            $payload .= 'Content-Disposition: form-data; name="' . 'file' .
                '"; filename="' . basename( "{$file_name}" ) . '"' . "\r\n";
            $payload .= "\r\n";
            $payload .= file_get_contents( "{$file_path}" );
            $payload .= "\r\n";
        }

        return $payload;
    }

    public function file_request( $endpoint, $payload, $payload_boundary, $record = array() ) {

        $base_url = 'https://www.zohoapis.com/crm/v3/';


        if( $this->data_center && $this->data_center !== 'com' ) {
            $base_url = str_replace( 'com', $this->data_center, $base_url );
        }

        $url = $base_url . $endpoint;

        $args = array(
            'timeout' => 60,
            'method'  => 'POST',
            'headers' => array(
                'Accept'       => 'application/json',
                'Content-Type' => 'multipart/form-data; boundary=' . $payload_boundary,
            ),
            'body'    => $payload,
        );

        $response = $this->remote_request($url, $args, $record );
        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
        $file_id = isset( $response_body['data'], $response_body['data'][0], $response_body['data'][0]['details'], $response_body['data'][0]['details']['id'] ) ? $response_body['data'][0]['details']['id'] : '';

        return $file_id;
    }

}

$zohocrmpro = ADFOIN_ZohoCRMPro::get_instance();

add_action( 'adfoin_zohocrmpro_job_queue', 'adfoin_zohocrmpro_job_queue', 10, 1 );

function adfoin_zohocrmpro_job_queue( $data ) {
    adfoin_zohocrmpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to ZOHO API
 */
function adfoin_zohocrmpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data   = $record_data['field_data'];
    $owner  = isset( $data['userId'] ) ? $data['userId'] : '';
    $module = isset( $data['moduleId'] ) ? $data['moduleId'] : '';
    $cred_id = isset( $data['credId'] ) ? $data['credId'] : '';
    $duplicate = isset( $data['duplicate_check_fields'] ) ? $data['duplicate_check_fields'] : '';
    $duplicate_record = isset( $data['duplicate'] ) ? $data['duplicate'] : '';
    $task   = $record['task'];

    unset( $data['userId'] );
    unset( $data['moduleId'] );
    unset( $data['credId'] );
    unset( $data['duplicate_check_fields'] );

    if( $task == 'subscribe' ) {

        $zohocrmpro       = ADFOIN_ZohoCRMPro::get_instance();
        $holder           = array();
        $account_id       = '';
        $contact_id       = '';
        $vendor_id        = '';
        $campaign_id      = '';
        $task_module      = '';
        $tags             = '';
        $account_lookups  = array( 'Parent_Account', 'Account_Name' );
        $contact_lookups  = array( 'Contact_Name', 'Who_Id', 'Related_To' );
        $campaign_lookups = array( 'Parent_Campaign', 'Campaign_Source' );
        $attachment       = '';
        $zohocrmpro->set_credentials( $cred_id );

        foreach ( $data as $key => $value ) {
            list( $data_type, $original_key ) = explode( '__', $key, 2 );
            $value = adfoin_get_parsed_values( $value, $posted_data );

            if( 'datetime' == $data_type && $value ) {
                $timezone = wp_timezone();
                $date     = date_create( $value, $timezone );

                if( $date ) {
                    $value = date_format( $date, 'c' );
                }
            }

            if( 'multiselectpicklist' == $data_type && $value ) {
                if( 'Tax' == $original_key ) {
                    $formatted_tax_ids = array();
                    $tax_ids = explode( ',', $value );

                    foreach( $tax_ids as $tax_id ) {
                        array_push( $formatted_tax_ids, array( 'id' => $tax_id ) );
                    }

                    $value = $formatted_tax_ids;
                } else {
                    $separated = array_map( 'trim', explode( ',', $value ) );
                    $value     = $separated;
                }
            }

            if( 'bigint' == $data_type && $value ) {
                if( 'Participants' == $original_key ) {
                    $participants     = array();
                    $raw_participants = explode( ',', $value );

                    foreach( $raw_participants as $single ) {
                        list( $type, $email ) = explode( '--', $single );
                        
                        if( 'lead' == $type ) {
                            $participant_id = $zohocrmpro->search_record( 'Leads', 'Email', $email, $record )['id'];

                            if( $participant_id ) {
                                array_push( $participants, array( 'type' => 'lead', 'participant' => $participant_id ) );
                            }
                        }

                        if( 'contact' == $type ) {
                            $participant_id = $zohocrmpro->search_record( 'Contacts', 'Email', $email, $record )['id'];

                            if( $participant_id ) {
                                array_push( $participants, array( 'type' => 'contact', 'participant' => $participant_id ) );
                            }
                        }
                    }

                    $value = $participants;
                }
            }

            if( 'fileupload' == $data_type && $value ) {
                if( 'Attachment' == $original_key ) {
                    $attachment = $value;
                } else {
                    $value = $zohocrmpro->upload_file( 0, 0, $value, 'fileupload', false );
                }
            }

            if( 'lookup' == $data_type && $value ) {
                if( in_array( $original_key, $account_lookups ) ) {
                    $account_id = $zohocrmpro->search_record( 'Accounts', 'Account_Name', $value, $record )['id'];

                    if( !$account_id ) {
                        $return     = $zohocrmpro->zohocrm_request( 'Accounts', 'POST', array( 'data' => array( array( 'Account_Name' => $value, 'owner' => $owner ) ) ), $record );
                        $body       = json_decode( wp_remote_retrieve_body( $return ), true );
                        $account_id = isset( $body['data'], $body['data'][0], $body['data'][0]['details'], $body['data'][0]['details']['id'] ) ? $body['data'][0]['details']['id'] : '';
                    }

                    if( $account_id && $owner ) {
                        $zohocrmpro->zohocrm_request(
                            'Accounts/actions/change_owner',
                            'POST',
                            array(
                                'ids' => array( $account_id ),
                                'owner' => array(
                                    'id' => $owner
                                )
                            ),
                            $record
                        );
                    }

                    if( $account_id ) {
                        $value = $account_id;
                    }
                }

                if( in_array( $original_key, $contact_lookups ) ) {
                    $contact_id = $zohocrmpro->search_record( 'Contacts', 'Email', $value, $record )['id'];

                    if( $contact_id ) {
                        $value = $contact_id;
                    }
                }

                if( in_array( $original_key, $campaign_lookups ) ) {
                    $campaign_id = $zohocrmpro->search_record( 'Campaigns', 'Campaign_Name', $value, $record )['id'];

                    if( $campaign_id ) {
                        $value = $campaign_id;
                    }
                }

                if( 'Vendor_Name' == $original_key ) {
                    $vendor_id = $zohocrmpro->search_record( 'Vendors', 'Vendor_Name', $value, $record )['id'];

                    if( $vendor_id ) {
                        $value = $vendor_id;
                    }
                }

                if( 'Product_Name' == $original_key ) {
                    $product_id = $zohocrmpro->search_record( 'Products', 'Product_Name', $value, $record )['id'];

                    if( $product_id ) {
                        $value = $product_id;
                    }
                }

                if( 'Deal_Name' == $original_key ) {
                    $deal_id = $zohocrmpro->search_record( 'Deals', 'Deal_Name', $value, $record )['id'];

                    if( $deal_id ) {
                        $value = $deal_id;
                    }
                }

                if( 'Reporting_To' == $original_key && $account_id ) {
                    $contacts_response = $zohocrmpro->zohocrm_request( 'Accounts/' . $account_id . '/Contacts?fields=id,First_Name,Last_Name' );
                    $contacts_body     = json_decode( wp_remote_retrieve_body( $contacts_response ), true );

                    if( isset( $contacts_body['data'] ) && is_array( $contacts_body['data'] ) ) {
                        foreach( $contacts_body['data'] as $contact ) {
                            $contact_name = $contact['First_Name'] . ' ' . $contact['Last_Name'];
                            $contact_id   = $contact_name == $value ? $contact['id'] : '';

                            if( $contact_id ) {
                                $value = $contact_id;
                            }
                        }
                    }
                }
            }

            if( 'boolean' == $data_type ) {
                if( strtolower( $value ) == 'true' ) {
                    $value = true;
                } else {
                    $value = false;
                }
            }

            if( '$se_module' == $original_key ) {
                $task_module = $value;
            }

            if( 'What_Id' == $original_key ) {
                if( 'Accounts' == $task_module ) {
                    $account_id = $zohocrmpro->search_record( 'Accounts', 'Account_Name', $value, $record )['id'];

                if( $account_id ) {
                    $value = $account_id;
                }
                }
            }

            $holder[$original_key] = $value;
        }

        if( isset( $holder['Tag'] ) ) {
            $tags = $holder['Tag'];

            unset( $holder['Tag'] );

            $existing_tags = $zohocrmpro->get_tags( $module, $holder, $record );

            if( $tags ) {
                $new_tags = array_filter( array_map( 'trim', explode( ',', $tags ) ) );
            }

            if( is_array( $existing_tags ) && is_array( $new_tags ) && !empty( $new_tags ) ) {
                $all_tags = array();
                $merged = array_unique( array_merge( $existing_tags, $new_tags ) );

                foreach( $merged as $single_tag ) {
                    array_push( $all_tags, array( 'name' => $single_tag ) );
                }

                if( $all_tags ) {
                    $holder['Tag'] = $all_tags;
                }
            }
        }

        if( $owner ) {
            $holder['Owner'] = "{$owner}";
        }
        
        $request_data = array( 'data' => array( array_filter( $holder ) ) );

        if( $duplicate ) {
            $request_data['duplicate_check_fields'] = array( $duplicate );
        }

        if( $module && $holder ) {
            if( $duplicate_record ) {
                $return = $zohocrmpro->zohocrm_request( $module, 'POST', $request_data, $record );
            } else{
                $return = $zohocrmpro->zohocrm_request( $module . '/upsert', 'POST', $request_data, $record );
            }
            // $id = $zohocrmpro->is_duplicate( $module, $holder, $record );

            // if( $id ) {
            //     $return = $zohocrmpro->zohocrm_request( $module . '/' . $id, 'PUT', $request_data, $record );
            // } else {
                
            // }
            // $return    = $zohocrmpro->zohocrm_request( $module, 'POST', $request_data, $record );
            $body      = json_decode( wp_remote_retrieve_body( $return ), true );
            $record_id = isset( $body['data'], $body['data'][0], $body['data'][0]['details'], $body['data'][0]['details']['id'] ) ? $body['data'][0]['details']['id'] : '';
            
            if( $record_id && $module && $attachment ) {
                $zohocrmpro->upload_file( $module, $record_id, $attachment, 'fileupload', true );
            }

            if( $duplicate_record && $record_id && $owner ) {
                $zohocrmpro->zohocrm_request(
                    $module . '/actions/change_owner',
                    'POST',
                    array(
                        'ids' => array( $record_id ),
                        'owner' => array(
                            'id' => $owner
                        )
                    ),
                    $record
                );
            }
        }        
    }

    return;
}