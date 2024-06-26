<?php

class VerticalResponsePro extends VerticalResponse {

    private static $instance;

    public static function get_instance() {

        if ( empty( self::$instance ) ) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    private function __construct() {

        $option = (array) maybe_unserialize( get_option( 'adfoin_verticalresponse_keys' ) );

        if ( isset( $option['client_id'] ) ) {
            $this->client_id = $option['client_id'];
        }

        if ( isset( $option['client_secret'] ) ) {
            $this->client_secret = $option['client_secret'];
        }

        if ( isset( $option['access_token'] ) ) {
            $this->access_token = $option['access_token'];
        }

        add_filter( 'adfoin_action_providers', array( $this, 'actions' ), 10, 1 );
        add_action( 'adfoin_action_fields', array( $this, 'action_fields' ), 10, 1 );
        add_action( 'wp_ajax_adfoin_get_verticalresponsepro_fields', array( $this, 'get_fields' ), 10, 0 );
    }

    public function actions( $actions ) {

        $actions['verticalresponsepro'] = array(
            'title' => __( 'Vertical Response [PRO]', 'advanced-form-integration' ),
            'tasks' => array(
                'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' )
            )
        );

        return $actions;
    }

    
    public function action_fields() {
        ?>
        <script type="text/template" id="verticalresponsepro-action-template">
            <table class="form-table">
                <tr valign="top" v-if="action.task == 'subscribe'">
                    <th scope="row">
                        <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                    </th>
                    <td scope="row">
                    <div class="spinner" v-bind:class="{'is-active': fieldLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    </td>
                </tr>

                <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                    <td scope="row-title">
                        <label for="tablecell">
                            <?php esc_attr_e( 'Email List', 'advanced-form-integration' ); ?>
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

                <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
            </table>
        </script>
        <?php
    }

    public function get_fields() {
        // Security Check
        if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
            die( __( 'Security check Failed', 'advanced-form-integration' ) );
        }
    
        $data = $this->request( 'custom_fields' );
    
        if( is_wp_error( $data ) ) {
            wp_send_json_error();
        }
    
        $body = json_decode( wp_remote_retrieve_body( $data ) );
        // $contact_meta = wp_list_pluck( $body->items, 'name' );
    
        $contact_fields = array(
            // array( 'key' => 'email', 'value' => 'Email', 'description' => '' ),
        );
    
        if( is_array( $body->items ) ) {
            foreach( $body->items as $item ) {
                array_push( $contact_fields, array( 'key' => 'custom__' . $item->attributes->name, 'value' => $item->attributes->name, 'description' => '' ) );
            }
        }
    
        wp_send_json_success( $contact_fields );
    }
}

$verticalresponsepro = VerticalResponsePro::get_instance();

add_action( 'adfoin_verticalresponsepro_job_queue', 'adfoin_verticalresponsepro_job_queue', 10, 1 );

function adfoin_verticalresponsepro_job_queue( $data ) {
    adfoin_verticalresponsepro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Vertical Response API
 */
function adfoin_verticalresponsepro_send_data( $record, $posted_data ) {

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


    if( $task == 'subscribe' ) {
        unset( $data['listId'] );
        unset( $data['task'] );

        $properties        = array();
        $custom_properties = array();

        foreach( $data as $key => $value ) {
            if( $value ) {
                if( substr( $key, 0, 8 ) == 'custom__' && $value ) {
                    $custom_key = substr( $key, 8 );
                    $custom_properties[$custom_key] = adfoin_get_parsed_values( $value, $posted_data );
    
                    continue;
                }

                $parsed_value = adfoin_get_parsed_values( $value, $posted_data );

                if( $parsed_value ) {
                    $properties[$key] = $parsed_value;
                }
            }
        }

        if( $custom_properties ) {
            $properties['custom'] = $custom_properties;
        }
        
        $verticalresponsepro = VerticalResponsePro::get_instance();

        $verticalresponsepro->create_contact( $properties, $record );

        if( $list_id ) {
            $verticalresponsepro->add_to_list( $list_id, $properties['email'], $record );
        }
    }

    return;
}