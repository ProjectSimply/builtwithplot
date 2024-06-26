<?php

class ADFOIN_Aweber_Pro extends Advanced_Form_Integration_OAuth2 {

    const service_name           = 'aweberpro';
    const authorization_endpoint = 'https://auth.aweber.com/oauth2/authorize';
    const token_endpoint         = 'https://auth.aweber.com/oauth2/token';
    const refresh_token_endpoint = 'https://auth.aweber.com/oauth2/token';

    private static $instance;
    protected      $contact_lists = array();
    protected      $refresh_token_endpoint = '';
    protected      $auth_code;

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

        $option = (array) maybe_unserialize( get_option( 'adfoin_aweber_keys' ) );

        if ( isset( $option['auth_code'] ) ) {
            $this->auth_code = $option['auth_code'];
        }

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

//        add_action( 'admin_init', array( $this, 'auth_redirect' ) );
        add_filter( 'adfoin_action_providers', array( $this, 'adfoin_aweberpro_actions' ), 10, 1 );
        add_action( 'adfoin_action_fields', array( $this, 'action_fields' ), 10, 1 );
    }

    public function adfoin_aweberpro_actions( $actions ) {

        $actions['aweberpro'] = array(
            'title' => __( 'Aweber [PRO]', 'advanced-form-integration' ),
            'tasks' => array(
                'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' )
            )
        );

        return $actions;
    }

    public function action_fields() {
        ?>
        <script type="text/template" id="aweberpro-action-template">
            <table class="form-table">
                <tr valign="top" v-if="action.task == 'subscribe'">
                    <th scope="row">
                        <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                    </th>
                    <td scope="row">

                    </td>
                </tr>

                <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                    <td scope="row-title">
                        <label for="tablecell">
                            <?php esc_attr_e( 'Aweber Account', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <select name="fieldData[accountId]" v-model="fielddata.accountId" @change="getLists" required="required">
                            <option value=""> <?php _e( 'Select Account...', 'advanced-form-integration' ); ?> </option>
                            <option v-for="(item, index) in fielddata.accounts" :value="index" > {{item}}  </option>
                        </select>
                        <div class="spinner" v-bind:class="{'is-active': accountLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    </td>
                </tr>

                <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                    <td scope="row-title">
                        <label for="tablecell">
                            <?php esc_attr_e( 'Aweber List', 'advanced-form-integration' ); ?>
                        </label>
                    </td>
                    <td>
                        <select name="fieldData[listId]" v-model="fielddata.listId" required="required">
                            <option value=""> <?php _e( 'Select List...', 'advanced-form-integration' ); ?> </option>
                            <option v-for="(item, index) in fielddata.lists" :value="index" > {{item}}  </option>
                        </select>
                        <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
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

    public function create_contact( $properties, $account_id, $list_id, $update = false, $record = array() ) {

        $endpoint = "https://api.aweber.com/1.0/accounts/{$account_id}/lists/{$list_id}/subscribers";

        $request = [
            'method'  => 'POST',
            'headers' => [
                'Accept'       => 'application/json',
                'Content-Type' => 'application/json; charset=utf-8',
            ],
            'body'    => json_encode( $properties ),
        ];

        if( 'true' == $update ) {
            if( $this->adfoin_aweberpro_contact_exists( $account_id, $properties['email'] ) ) {
                $endpoint          = "https://api.aweber.com/1.0/accounts/{$account_id}/lists/{$list_id}/subscribers?subscriber_email={$properties['email']}";
                $request['method'] = 'PATCH';
            }
        }

        $response = $this->remote_request( $endpoint, $request, $record );

        return $response;
    }

    public function adfoin_aweberpro_contact_exists( $account_id, $email ) {
        $endpoint = "https://api.aweber.com/1.0/accounts/{$account_id}/?ws.op=findSubscribers&email={$email}";

        $request = [
            'method'  => 'GET',
            'headers' => array(
                'Accept'       => 'application/json',
                'Content-Type' => 'application/json; charset=utf-8',
            )
        ];

        $response = $this->remote_request( $endpoint, $request );

        if ( 200 != (int) wp_remote_retrieve_response_code( $response ) ) {
            return false;
        }

        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( empty( $response_body['entries'] ) ) {
            return false;
        } else {
            return true;
        }
    }

    protected function remote_request( $url, $request = array(), $record = array() ) {

        static $refreshed = false;

        $request = wp_parse_args( $request, [ ] );

        $request['headers'] = array_merge(
            $request['headers'],
            array( 'Authorization' => $this->get_http_authorization_header( 'bearer' ), )  
        );

        $response = wp_remote_request( esc_url_raw( $url ), $request );

        if( !empty( $record ) ) {
            adfoin_add_to_log( $response, $url, $request, $record );
        } else {
            adfoin_add_to_log( $response, $url, $request, array( 'id' => 999 ) );
        }

        if ( 401 === wp_remote_retrieve_response_code( $response )
            and !$refreshed
        ) {
            $this->refresh_token();
            $refreshed = true;

            $response = $this->remote_request( $url, $request );
        }

        return $response;
    }

    protected function refresh_token() {

        $endpoint = add_query_arg(
            array(
                'refresh_token' => $this->refresh_token,
                'grant_type'    => 'refresh_token',
                'client_id'     => $this->client_id
            ),
            $this->token_endpoint
        );

        $request = array(
            'headers' => array(
                'Content-Type' => 'application/x-www-form-urlencoded',
            ),
        );

        $response      = wp_remote_post( esc_url_raw( $endpoint ), $request );
        $response_code = (int) wp_remote_retrieve_response_code( $response );
        $response_body = wp_remote_retrieve_body( $response );
        $response_body = json_decode( $response_body, true );

        if ( 401 == $response_code ) { // Unauthorized
            $this->access_token  = null;
            $this->refresh_token = null;
        } else {
            if ( isset( $response_body['access_token'] ) ) {
                $this->access_token = $response_body['access_token'];
            } else {
                $this->access_token = null;
            }

            if ( isset( $response_body['refresh_token'] ) ) {
                $this->refresh_token = $response_body['refresh_token'];
            }
        }

        $this->save_data();

        return $response;
    }
}

$aweberpro = ADFOIN_Aweber_Pro::get_instance();

add_action( 'adfoin_aweberpro_job_queue', 'adfoin_aweberpro_job_queue', 10, 1 );

function adfoin_aweberpro_job_queue( $data ) {
    adfoin_aweberpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Aweber API
 */
function adfoin_aweberpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record["data"], true );

    if( array_key_exists( "cl", $record_data["action_data"] ) ) {
        if( $record_data["action_data"]["cl"]["active"] == "yes" ) {
            if( !adfoin_match_conditional_logic( $record_data["action_data"]["cl"], $posted_data ) ) {
                return;
            }
        }
    }

    $data       = $record_data["field_data"];
    $account_id = $data["accountId"];
    $list_id    = $data["listId"];
    $task       = $record["task"];
    $update     = $data["update"];

    if( $task == "subscribe" ) {
        $email         = empty( $data["email"] ) ? "" : adfoin_get_parsed_values( $data["email"], $posted_data );
        $name          = empty( $data["name"] ) ? "" : adfoin_get_parsed_values( $data["name"], $posted_data );
        $ip_address    = empty( $data["ipAddress"] ) ? "" : adfoin_get_parsed_values( $data["ipAddress"], $posted_data );
        $ad_tracking   = empty( $data["adTracking"] ) ? "" : adfoin_get_parsed_values( $data["adTracking"], $posted_data );
        $misc_notes    = empty( $data["miscNotes"] ) ? "" : adfoin_get_parsed_values( $data["miscNotes"], $posted_data );
        $tags          = empty( $data["tags"] ) ? "" : adfoin_get_parsed_values( $data["tags"], $posted_data );
        $custom_fields = empty( $data["customFields"] ) ? "" : adfoin_get_parsed_values( $data["customFields"], $posted_data );


        $properties = array(
            "email"       => $email,
            "name"        => $name,
            "ip_address"  => $ip_address,
            "ad_tracking" => $ad_tracking,
            "misc_notes"  => $misc_notes
        );

        if( $tags ) {
            $properties["tags"] = explode( ",", $tags );
        }

        if( $custom_fields ) {

            if( strpos( $custom_fields, "||" ) !== false ) {
                $holder = explode( "||", $custom_fields );
            } else {
                $holder = explode( ",", $custom_fields );
            }

            foreach( $holder as $single ) {
                if( strpos( $single, "=" ) !== false ) {
                    $single                       = explode( "=", $single, 2 );
                    $properties['custom_fields'][$single[0]] = $single[1];
                }
                
            }
        }

        $properties = array_filter( $properties );

        $aweberpro = ADFOIN_Aweber_Pro::get_instance();
        $return = $aweberpro->create_contact( $properties, $account_id, $list_id, $update, $record );
    }
    return;
}