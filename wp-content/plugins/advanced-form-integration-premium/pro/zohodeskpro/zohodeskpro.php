<?php

class ADFOIN_ZohoDeskPro extends ADFOIN_ZohoDesk {

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

        add_filter( 'adfoin_action_providers', array( $this, 'adfoin_zohodesk_actions' ), 10, 1 );
        add_action( 'adfoin_action_fields', array( $this, 'action_fields' ), 10, 1 );
        add_action( 'wp_ajax_adfoin_get_zohodeskpro_fields', array( $this, 'get_fields' ) );
    }

    public function adfoin_zohodesk_actions( $actions ) {

        $actions['zohodeskpro'] = array(
            'title' => __( 'Zoho Desk [PRO]', 'advanced-form-integration' ),
            'tasks' => array(
                'subscribe' => __( 'Add new record', 'advanced-form-integration' )
            )
        );

        return $actions;
    }

    public function action_fields() {
        ?>
        <script type='text/template' id='zohodeskpro-action-template'>
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
                        <select name="fieldData[credId]" v-model="fielddata.credId" @change="getOrganizations">
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
                            <?php esc_attr_e( 'Organization', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <select name="fieldData[orgId]" v-model="fielddata.orgId" @change="getDepartments">
                            <option value=''> <?php _e( 'Select Organization...', 'advanced-form-integration' ); ?> </option>
                            <option v-for='(item, index) in fielddata.organizations' :value='index' > {{item}}  </option>
                        </select>
                        <div class='spinner' v-bind:class="{'is-active': organizationLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    </td>
                </tr>

                <tr valign='top' class='alternate' v-if="action.task == 'subscribe'">
                    <td scope='row-title'>
                        <label for='tablecell'>
                            <?php esc_attr_e( 'Department', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <select name="fieldData[departmentId]" v-model="fielddata.departmentId" @change=getFields>
                            <option value=''> <?php _e( 'Select Department...', 'advanced-form-integration' ); ?> </option>
                            <option v-for='(item, index) in fielddata.departments' :value='index' > {{item}}  </option>
                        </select>
                        <div class='spinner' v-bind:class="{'is-active': departmentLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    </td>
                </tr>

                <tr valign='top' class='alternate' v-if="action.task == 'subscribe'">
                    <td scope='row-title'>
                        <label for='tablecell'>
                            <?php esc_attr_e( 'Owner', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <select name="fieldData[ownerId]" v-model="fielddata.ownerId">
                            <option value=''> <?php _e( 'Select Owner...', 'advanced-form-integration' ); ?> </option>
                            <option v-for='(item, index) in fielddata.owners' :value='index' > {{item}}  </option>
                        </select>
                        <div class='spinner' v-bind:class="{'is-active': ownerLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    </td>
                </tr>


                <editable-field v-for='field in fields' v-bind:key='field.value' v-bind:field='field' v-bind:trigger='trigger' v-bind:action='action' v-bind:fielddata='fielddata'></editable-field>

                <?php
                    if ( adfoin_fs()->is__premium_only() ) {
                        if ( adfoin_fs()->is_plan( 'professional', true ) ) {
                            ?>
                            <tr valign="top" v-if="action.task == 'subscribe'">
                                <th scope="row">
                                    <?php esc_attr_e( 'You are using Pro', 'advanced-form-integration' ); ?>
                                </th>
                                <td scope="row">
                                    <span><?php printf( __( 'To use custom fields, tags and attachments, please create a <a href="%s">new integration</a> and select Zoho Desk [PRO] in the action field.', 'advanced-form-integration' ), admin_url('admin.php?page=advanced-form-integration-new') ); ?></span>
                                </td>
                            </tr>
                            <?php
                        }
                    }
                    
                    if(adfoin_fs()->is_not_paying() ){
                        ?>
                        <tr valign="top" v-if="action.task == 'subscribe'">
                            <th scope="row">
                                <?php esc_attr_e( 'Go Pro', 'advanced-form-integration' ); ?>
                            </th>
                            <td scope="row">
                                <span><?php printf( __( 'To unlock custom fields, tags and attachments, consider <a href="%s">upgrading to Pro</a>.', 'advanced-form-integration' ), admin_url('admin.php?page=advanced-form-integration-settings-pricing') ); ?></span>
                            </td>
                        </tr>
                        <?php
                    }
                ?>
            </table>
        </script>
        <?php
    }

    public function get_custom_fields( $org_id, $module ) {
        $response = $this->zohodesk_request( "organizationFields?module={$module}", 'GET', array(), array(), $org_id );
        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
        $fields = array();

        if ( !empty( $response_body['data'] ) && is_array( $response_body['data'] ) ) {
            $module_title = ucfirst( substr( $module, 0, -1 ) );

            foreach ( $response_body['data'] as $field ){
               if( $field['isCustomField'] == true ) {
                    $description = '';

                    if( in_array( $field['type'], array( 'Multiselect', 'Picklist' ) ) && isset( $field['allowedValues'] ) ) {
                        $options = wp_list_pluck( $field['allowedValues'], 'value' );
                        $description = implode( ', ', $options );
                    }

                    array_push( $fields, array( 'key' => $module . '__' . $field['apiName'], 'value' => $field['displayLabel'] . " [{$module_title}]", 'description' => $description ) );
               }
            }
        }

        return $fields;
    }

    /*
    * Get Module Fields
    */
    public function get_fields() {
        // Security Check
        if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
            die( __( 'Security check Failed', 'advanced-form-integration' ) );
        }

        // get teams from 'departments/{department_id}/teams'
        $cred_id = isset( $_POST['credId'] ) ? sanitize_text_field( $_POST['credId'] ) : '';
        $org_id = isset( $_POST['orgId'] ) ? sanitize_text_field( $_POST['orgId'] ) : '';
        $department_id = isset( $_POST['departmentId'] ) ? sanitize_text_field( $_POST['departmentId'] ) : '';
        $this->set_credentials( $cred_id );

        $teams = $this->get_teams( $department_id, $org_id );
        // $agents = $this->get_agents( $org_id );

        $account_fields = array(
            array( 'key' => 'accounts__accountName', 'value' => __( 'Name [Account]', 'advanced-form-integration' ) ),
            array( 'key' => 'accounts__description', 'value' => __( 'Description [Account]', 'advanced-form-integration' ) ),
            array( 'key' => 'accounts__email', 'value' => __( 'Email [Account]', 'advanced-form-integration' ) ),
            array( 'key' => 'accounts__website', 'value' => __( 'Website [Account]', 'advanced-form-integration' ) ),
            array( 'key' => 'accounts__fax', 'value' => __( 'Fax [Account]', 'advanced-form-integration' ) ),
            array( 'key' => 'accounts__industry', 'value' => __( 'Industry [Account]', 'advanced-form-integration' ) ),
            array( 'key' => 'accounts__city', 'value' => __( 'City [Account]', 'advanced-form-integration' ) ),
            array( 'key' => 'accounts__country', 'value' => __( 'Country [Account]', 'advanced-form-integration' ) ),
            array( 'key' => 'accounts__state', 'value' => __( 'State [Account]', 'advanced-form-integration' ) ),
            array( 'key' => 'accounts__street', 'value' => __( 'Street [Account]', 'advanced-form-integration' ) ),
            array( 'key' => 'accounts__code', 'value' => __( 'Zip Code [Account]', 'advanced-form-integration' ) ),
            array( 'key' => 'accounts__phone', 'value' => __( 'Phone [Account]', 'advanced-form-integration' ) ),
            array( 'key' => 'accounts__annualrevenue', 'value' => __( 'Annual Revenue [Account]', 'advanced-form-integration' ) )
        );

        $account_custom_fields = $this->get_custom_fields( $org_id, 'accounts' );
        $account_fields = array_merge( $account_fields, $account_custom_fields );

        $contact_fields = array(
            array( 'key' => 'contacts__firstName', 'value' => __( 'First Name [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__lastName', 'value' => __( 'Last Name [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__email', 'value' => __( 'Email [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__secondaryemail', 'value' => __( 'Secondary Email [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__phone', 'value' => __( 'Phone [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__mobile', 'value' => __( 'Mobile [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__description', 'value' => __( 'Description [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__title', 'value' => __( 'Title [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__type', 'value' => __( 'Contact Type [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__street', 'value' => __( 'Street [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__city', 'value' => __( 'City [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__state', 'value' => __( 'State [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__zip', 'value' => __( 'Zip Code [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__country', 'value' => __( 'Country [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__facebook', 'value' => __( 'Facebook [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__twitter', 'value' => __( 'Twitter [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__photoURL', 'value' => __( 'Photo URL [Contact]', 'advanced-form-integration' ) ),
            array( 'key' => 'contacts__webUrl', 'value' => __( 'Web URL [Contact]', 'advanced-form-integration' ) ),
        );

        $contact_custom_fields = $this->get_custom_fields( $org_id, 'contacts' );
        $contact_fields = array_merge( $contact_fields, $contact_custom_fields );

        $ticket_fields = array(
            array( 'key' => 'tickets__subject', 'value' => __( 'Subject [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__description', 'value' => __( 'Description [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__email', 'value' => __( 'Email [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__phone', 'value' => __( 'Phone [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__status', 'value' => __( 'Status [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__priority', 'value' => __( 'Priority [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__language', 'value' => __( 'Language [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__category', 'value' => __( 'Category [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__subCategory', 'value' => __( 'Sub Category [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__resolution', 'value' => __( 'Resolution [Ticket]', 'advanced-form-integration' ) ),
            // array( 'key' => 'tickets__assigneeId', 'value' => __( 'Assignee ID [Ticket]', 'advanced-form-integration' ), 'description' => $agents ),
            array( 'key' => 'tickets__dueDate', 'value' => __( 'Due Date [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__responseDueDate', 'value' => __( 'Response Due Date [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__classification', 'value' => __( 'Classification [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__webUrl', 'value' => __( 'Web URL [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__teamId', 'value' => __( 'Team ID [Ticket]', 'advanced-form-integration' ), 'description' => $teams ),
            array( 'key' => 'tickets__tags', 'value' => __( 'Tags [Ticket]', 'advanced-form-integration' ) ),
            array( 'key' => 'tickets__attachments', 'value' => __( 'Attachments [Ticket]', 'advanced-form-integration' ) )
        );

        $ticket_custom_fields = $this->get_custom_fields( $org_id, 'tickets' );
        $ticket_fields = array_merge( $ticket_fields, $ticket_custom_fields );

        wp_send_json_success( array_merge( $account_fields, $contact_fields, $ticket_fields ) );
    }

    public function add_tags( $ticket_id, $tags, $org_id, $record ) {
        $tags = explode( ',', $tags );
        $tags = array_map( 'trim', $tags );

        $response = $this->zohodesk_request( "tickets/{$ticket_id}/associateTag", 'POST', array( 'tags' => $tags ), $record, $org_id );
        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );

        return $response_body;
    }

    public function upload_file( $ticket_id, $file, $org_id, $record ) {
        $payload_boundary = wp_generate_password( 24 );

        $file_path = $file;
        $file_name = basename( $file );
        $file_type = mime_content_type( $file_path );

        $endpoint = "tickets/{$ticket_id}/attachments";

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

        $base_url = 'https://desk.zoho.com/api/v1/';


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
        $file_id = isset( $response_body['id'] ) ? $response_body['id'] : '';

        return $file_id;
    }

}

$zohodeskpro = ADFOIN_ZohoDeskPro::get_instance();

add_action( 'adfoin_zohodeskpro_job_queue', 'adfoin_zohodeskpro_job_queue', 10, 1 );

function adfoin_zohodeskpro_job_queue( $data ) {
    adfoin_zohodeskpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to ZOHO API
 */
function adfoin_zohodeskpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data   = $record_data['field_data'];
    $owner_id = isset( $data['ownerId'] ) ? $data['ownerId'] : '';
    $org_id = isset( $data['orgId'] ) ? $data['orgId'] : '';
    $dept_id = isset( $data['departmentId'] ) ? $data['departmentId'] : '';
    $cred_id = isset( $data['credId'] ) ? $data['credId'] : '';
    $task   = $record['task'];
    $tags = isset( $data['tickets__tags'] ) ? adfoin_get_parsed_values( $data['tickets__tags'], $posted_data ) : '';
    $attachments = isset( $data['tickets__attachments'] ) ? adfoin_get_parsed_values( $data['tickets__attachments'], $posted_data ) : '';

    unset( $data['ownerId'], $data['orgId'], $data['departmentId'], $data['credId'], $data['tickets__tags'], $data['tickets__attachments'] );

    if( $task == 'subscribe' ) {

        $zohodeskpro      = ADFOIN_ZohoDeskPro::get_instance();
        $holder           = array();
        $account_id       = '';
        $account_data      = array();
        $contact_id       = '';
        $contact_data      = array();
        $ticket_id       = '';
        $ticket_data      = array();
        $zohodeskpro->set_credentials( $cred_id );

        foreach( $data as $key => $value ) {
            $holder[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );
        }

        foreach( $holder as $key => $value ) {
            if( substr( $key, 0, 10 ) == 'accounts__' && $value ) {
                $key = substr( $key, 10 );

                $account_data[$key] = $value;
            }

            if( substr( $key, 0, 10 ) == 'contacts__' && $value ) {
                $key = substr( $key, 10 );

                $contact_data[$key] = $value;
            }

            if( substr( $key, 0, 9 ) == 'tickets__' && $value ) {
                $key = substr( $key, 9 );

                $ticket_data[$key] = $value;
            }
        }

        $account_data = array_filter( $account_data );
        $contact_data = array_filter( $contact_data );
        $ticket_data = array_filter( $ticket_data );

        if( $account_data ) {

            if( $owner_id ) {
                $account_data['ownerId'] = $owner_id;
            }

            $account_id = $zohodeskpro->is_duplicate( 'accounts', $account_data );

            if( $account_id ) {
                $zohodeskpro->update_account( $account_id, $account_data, $record, $org_id );
            } else{
                $account_id = $zohodeskpro->create_account( $account_data, $record, $org_id );
            }
        }
        
        if( $contact_data ) {

            if( $owner_id ) {
                $contact_data['ownerId'] = $owner_id;
            }
            if( $account_id ) {
                $contact_data['accountId'] = $account_id;
            }

            $contact_id = $zohodeskpro->is_duplicate( 'contacts', $contact_data );

            if( $contact_id ) {
                $zohodeskpro->update_contact( $contact_id, $contact_data, $record, $org_id );
            } else{
                $contact_id = $zohodeskpro->create_contact( $contact_data, $record, $org_id );
            }
        }

        if( $ticket_data ) {

            if( $owner_id ) {
                $ticket_data['assigneeId'] = $owner_id;
            }
            
            if( $contact_id ) {
                $ticket_data['contactId'] = $contact_id;
            }

            if( $dept_id ) {
                $ticket_data['departmentId'] = $dept_id;
            }

            $ticket_id = $zohodeskpro->create_ticket( $ticket_data, $record, $org_id );

            if( $tags && $ticket_id ) {
                $zohodeskpro->add_tags( $ticket_id, $tags, $org_id, $record );
            }

            if( $attachments && $ticket_id ) {
                $attachments = explode( ',', $attachments );

                foreach( $attachments as $attachment ) {
                    $zohodeskpro->upload_file( $ticket_id, $attachment, $org_id, $record );
                }
            }
        }
    }

    return;
}