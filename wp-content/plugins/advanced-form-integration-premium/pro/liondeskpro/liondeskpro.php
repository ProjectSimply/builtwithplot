<?php

class ADFOIN_LionDeskPro extends ADFOIN_LionDesk {

    const service_name           = 'liondeskpro';
    const authorization_endpoint = 'https://api-v2.liondesk.com//oauth2/authorize';
    const token_endpoint         = 'https://api-v2.liondesk.com//oauth2/token';
    const refresh_token_endpoint = 'https://api-v2.liondesk.com//oauth2/token';

    private static $instance;

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

        $option = (array) maybe_unserialize( get_option( 'adfoin_liondesk_keys' ) );

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

        add_filter( 'adfoin_action_providers', array( $this, 'actions' ), 10, 1 );
        add_action( 'adfoin_action_fields', array( $this, 'action_fields' ), 10, 1 );
        add_action( 'wp_ajax_adfoin_get_liondeskpro_list', array( $this, 'get_list' ), 10, 0 );
        add_action( 'wp_ajax_adfoin_get_liondeskpro_fields', array( $this, 'get_fields' ), 10, 0 );
    }

    public function actions( $actions ) {

        $actions['liondeskpro'] = array(
            'title' => __( 'LionDesk [PRO]', 'advanced-form-integration' ),
            'tasks' => array(
                'add_contact'   => __( 'Create Contact', 'advanced-form-integration' )
            )
        );

        return $actions;
    }

    public function action_fields() {
        ?>
        <script type="text/template" id="liondeskpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'add_contact'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                    <div class="spinner" v-bind:class="{'is-active': fieldLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'add_contact'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Campaign', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId">
                        <option value=""> <?php _e( 'Select Campaign...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.list" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>
        <?php
    }

    public function get_list() {
        // Security Check
        if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
            die( __( 'Security check Failed', 'advanced-form-integration' ) );
        }

        $this->get_campaign_lists();
    }

    public function get_campaign_lists() {

        $response = $this->liondesk_request( 'campaigns?$limit=1000' );
        $body     = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( isset( $body['data'] ) && is_array( $body['data'] ) ) {
            $lists = wp_list_pluck( $body['data'], 'name', 'id' );

            wp_send_json_success( $lists );
        } else {
            wp_send_json_error();
        }
    }

    /*
    * Get LionDesk attributes
    */
    function get_fields() {
        // Security Check
        if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
            die( __( 'Security check Failed', 'advanced-form-integration' ) );
        }

        $sources_raw = $response = $this->liondesk_request( 'contact-sources' );
        $source_body = json_decode( wp_remote_retrieve_body( $sources_raw ) );
        $sources     = array();

        foreach ( $source_body->data as $single_source ) {
            $sources[] = $single_source->name . ": " . $single_source->id;
        }

        $sources = implode( ", ", $sources );

        $fields = array(
            array( 'key' => 'email', 'value' => 'Email', 'description' => '' ),
            array( 'key' => 'secondaryEmail', 'value' => 'Secondary Email', 'description' => '' ),
            array( 'key' => 'firstName', 'value' => 'First Name', 'description' => '' ),
            array( 'key' => 'lastName', 'value' => 'Last Name', 'description' => '' ),
            array( 'key' => 'mobilePhone', 'value' => 'Mobile Phone', 'description' => '' ),
            array( 'key' => 'homePhone', 'value' => 'Home Phone', 'description' => '' ),
            array( 'key' => 'officePhone', 'value' => 'Office Phone', 'description' => '' ),
            array( 'key' => 'fax', 'value' => 'Fax', 'description' => '' ),
            array( 'key' => 'company', 'value' => 'Company', 'description' => '' ),
            array( 'key' => 'birthday', 'value' => 'Birthday', 'description' => '' ),
            array( 'key' => 'spouseName', 'value' => 'Spouse Name', 'description' => '' ),
            array( 'key' => 'spouseEmail', 'value' => 'Spouse Email', 'description' => '' ),
            array( 'key' => 'spousePhone', 'value' => 'Spouse Phone', 'description' => '' ),
            array( 'key' => 'spouseBirthday', 'value' => 'Spouse Birthday', 'description' => '' ),
            array( 'key' => 'address1_type', 'value' => 'Address1 Type', 'description' => 'Possible values: Home, Main Office, Branch Office, Second Home, Investment, Mailing' ),
            array( 'key' => 'address1_street1', 'value' => 'Address1 Street1', 'description' => '' ),
            array( 'key' => 'address1_street2', 'value' => 'Address1 Street2', 'description' => '' ),
            array( 'key' => 'address1_zip', 'value' => 'Address1 ZIP', 'description' => '' ),
            array( 'key' => 'address1_city', 'value' => 'Address1 City', 'description' => '' ),
            array( 'key' => 'address1_state', 'value' => 'Address1 State', 'description' => '' ),
            array( 'key' => 'address2_type', 'value' => 'Address2 Type', 'description' => 'Possible values: Home, Main Office, Branch Office, Second Home, Investment, Mailing' ),
            array( 'key' => 'address2_street1', 'value' => 'Address2 Street1', 'description' => '' ),
            array( 'key' => 'address2_street12', 'value' => 'Address2 Street2', 'description' => '' ),
            array( 'key' => 'address2_zip', 'value' => 'Address2 ZIP', 'description' => '' ),
            array( 'key' => 'address2_city', 'value' => 'Address2 City', 'description' => '' ),
            array( 'key' => 'address2_state', 'value' => 'Address2 State', 'description' => '' ),
            array( 'key' => 'tags', 'value' => 'Tags', 'description' => '' ),
            array( 'key' => 'sourceId', 'value' => 'Source ID', 'description' => $sources ),
        );

        $cf_raw  = $this->liondesk_request( 'custom-fields' );
        $cf_body = json_decode( wp_remote_retrieve_body( $cf_raw ) );

        foreach( $cf_body->data as $single ) {
            array_push( $fields, array( 'key' => 'cf_' . $single->id, 'value' => $single->name, 'description' => '' ) );
        }

        wp_send_json_success( $fields );
    }
}

$liondeskpro = ADFOIN_LionDeskPro::get_instance();

add_action( 'adfoin_liondeskpro_job_queue', 'adfoin_liondeskpro_job_queue', 10, 1 );

function adfoin_liondeskpro_job_queue( $data ) {
    adfoin_liondeskpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to LionDesk API
 */
function adfoin_liondeskpro_send_data( $record, $posted_data ) {

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
    $task    = $record['task'];


    if( $task == 'add_contact' ) {
        $email            = empty( $data["email"] ) ? "" : adfoin_get_parsed_values( $data["email"], $posted_data );
        $s_email          = empty( $data["secondaryEmail"] ) ? "" : adfoin_get_parsed_values( $data["secondaryEmail"], $posted_data );
        $first_name       = empty( $data["firstName"] ) ? "" : adfoin_get_parsed_values( $data["firstName"], $posted_data );
        $last_name        = empty( $data["lastName"] ) ? "" : adfoin_get_parsed_values( $data["lastName"], $posted_data );
        $mobile_phone     = empty( $data["mobilePhone"] ) ? "" : adfoin_get_parsed_values( $data["mobilePhone"], $posted_data );
        $home_phone       = empty( $data["homePhone"] ) ? "" : adfoin_get_parsed_values( $data["homePhone"], $posted_data );
        $office_phone     = empty( $data["officePhone"] ) ? "" : adfoin_get_parsed_values( $data["officePhone"], $posted_data );
        $fax              = empty( $data["fax"] ) ? "" : adfoin_get_parsed_values( $data["fax"], $posted_data );
        $company          = empty( $data["company"] ) ? "" : adfoin_get_parsed_values( $data["company"], $posted_data );
        $birthday         = empty( $data["birthday"] ) ? "" : adfoin_get_parsed_values( $data["birthday"], $posted_data );
        $anniversary      = empty( $data["anniversary"] ) ? "" : adfoin_get_parsed_values( $data["anniversary"], $posted_data );
        $spouce_name      = empty( $data["spouseName"] ) ? "" : adfoin_get_parsed_values( $data["spouseName"], $posted_data );
        $spouce_email     = empty( $data["spouseEmail"] ) ? "" : adfoin_get_parsed_values( $data["spouseEmail"], $posted_data );
        $spouce_phone     = empty( $data["spousePhone"] ) ? "" : adfoin_get_parsed_values( $data["spousePhone"], $posted_data );
        $spouce_birthday  = empty( $data["spouseBirthday"] ) ? "" : adfoin_get_parsed_values( $data["spouseBirthday"], $posted_data );
        $source_id        = empty( $data["sourceId"] ) ? "" : adfoin_get_parsed_values( $data["sourceId"], $posted_data );
        $tags             = empty( $data["tags"] ) ? "" : adfoin_get_parsed_values( $data["tags"], $posted_data );
        $address1_type    = empty( $data["address1_type"] ) ? "" : adfoin_get_parsed_values( $data["address1_type"], $posted_data );
        $address1_street1 = empty( $data["address1_street1"] ) ? "" : adfoin_get_parsed_values( $data["address1_street1"], $posted_data );
        $address1_street2 = empty( $data["address1_street2"] ) ? "" : adfoin_get_parsed_values( $data["address1_street2"], $posted_data );
        $address1_zip     = empty( $data["address1_zip"] ) ? "" : adfoin_get_parsed_values( $data["address1_zip"], $posted_data );
        $address1_city    = empty( $data["address1_city"] ) ? "" : adfoin_get_parsed_values( $data["address1_city"], $posted_data );
        $address1_state   = empty( $data["address1_state"] ) ? "" : adfoin_get_parsed_values( $data["address1_state"], $posted_data );
        $address2_type    = empty( $data["address2_type"] ) ? "" : adfoin_get_parsed_values( $data["address2_type"], $posted_data );
        $address2_street1 = empty( $data["address2_street1"] ) ? "" : adfoin_get_parsed_values( $data["address2_street1"], $posted_data );
        $address2_street2 = empty( $data["address2_street2"] ) ? "" : adfoin_get_parsed_values( $data["address2_street2"], $posted_data );
        $address2_zip     = empty( $data["address2_zip"] ) ? "" : adfoin_get_parsed_values( $data["address2_zip"], $posted_data );
        $address2_city    = empty( $data["address2_city"] ) ? "" : adfoin_get_parsed_values( $data["address2_city"], $posted_data );
        $address2_state   = empty( $data["address2_state"] ) ? "" : adfoin_get_parsed_values( $data["address2_state"], $posted_data );

        $body = array(
            "first_name"       => $first_name,
            "last_name"        => $last_name,
            "email"            => $email,
            "secondary_email"  => $s_email,
            "mobile_phone"     => $mobile_phone,
            "home_phone"       => $home_phone,
            "office_phone"     => $office_phone,
            "fax"              => $fax,
            "company"          => $company,
            "birthday"         => $birthday,
            "anniversary"      => $anniversary,
            "spouce_name"      => $spouce_name,
            "spouce_email"     => $spouce_email,
            "spouce_phone"     => $spouce_phone,
            "spouce_birthday"  => $spouce_birthday,
            "source_id"        => $source_id,
            "tags"             => $tags
        );

        $cf_fields = array();

        foreach( $data as $key => $value ) {
            if ( substr( $key, 0, 3 ) == 'cf_' && $value ) {
                $original_key     = substr( $key, 3 );
                $cf_fields[$original_key] = empty( $data[$key] ) ? "" : adfoin_get_parsed_values( $data[$key], $posted_data );
            }
        }

        $cf_fields = array_filter( $cf_fields );

        if( !empty( $cf_fields ) ) {
            $body["custom_fields"] = array();
            foreach( $cf_fields as $key => $value ) {
                array_push( $body["custom_fields"], array( "id" => $key, "value" => $value ) );
            }
        }

        $body = array_filter( $body );

        $liondesk = ADFOIN_LionDeskPro::get_instance();
        $response = $liondesk->create_contact( $body, $record );

        $contact_id = '';

        if( !is_wp_error( $response ) ) {
            $response_body = json_decode( wp_remote_retrieve_body( $response ) );
            $contact_id  = $response_body->id;
        }

        if( $contact_id && $address1_type && $address1_street1 ) {
            $address1 = array(
                'type'             => $address1_type,
                'street_address_1' => $address1_street1
            );

            if( $address1_street2 ) {
                $address1['street_address_2'] = $address1_street2;
            }

            if( $address1_zip ) {
                $address1['zip'] = $address1_zip;
            }

            if( $address1_city ) {
                $address1['city'] = $address1_city;
            }

            if( $address1_state ) {
                $address1['state'] = $address1_state;
            }

            $address1_url = "contacts/{$contact_id}/addresses";
            $address1_response = $liondesk->liondesk_request( $address1_url, 'POST', $address1, $record );
        }

        if( $contact_id && $address2_type && $address2_street1 ) {
            $address2 = array(
                'type'             => $address2_type,
                'street_address_1' => $address2_street1
            );

            if( $address2_street2 ) {
                $address2['street_address_2'] = $address2_street2;
            }

            if( $address2_zip ) {
                $address2['zip'] = $address2_zip;
            }

            if( $address2_city ) {
                $address2['city'] = $address2_city;
            }

            if( $address2_state ) {
                $address2['state'] = $address2_state;
            }

            $address2_url = "contacts/{$contact_id}/addresses";
            $address2_response = $liondesk->liondesk_request( $address2_url, 'POST', $address2, $record );
        }

        if( $list_id && $contact_id ) {
            $campaign_url  = "campaigns/{$list_id}/contacts";
            $campaign_body = array( "contact_id" => $contact_id );

            $campaign_response = $liondesk->liondesk_request( $campaign_url, 'POST', $campaign_body, $record );
        }
    }

    return;
}