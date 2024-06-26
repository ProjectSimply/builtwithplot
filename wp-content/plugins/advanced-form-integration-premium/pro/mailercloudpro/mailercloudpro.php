<?php

add_filter( 'adfoin_action_providers', 'adfoin_mailercloudpro_actions', 10, 1 );

function adfoin_mailercloudpro_actions( $actions ) {

    $actions['mailercloudpro'] = array(
        'title' => __( 'Mailercloud [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_mailercloudpro_action_fields' );

function adfoin_mailercloudpro_action_fields() {
    ?>
    <script type="text/template" id="mailercloudpro-action-template">
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
                        <?php esc_attr_e( 'Mailercloud List', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId" required="required">
                        <option value=""> <?php _e( 'Select List...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.list" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
            <?php
                if ( adfoin_fs()->is__premium_only() ) {
                    if ( adfoin_fs()->is_plan( 'professional', true ) ) {
                        ?>
                        <tr valign="top" v-if="action.task == 'subscribe'">
                            <th scope="row">
                                <?php esc_attr_e( 'You are using Pro', 'advanced-form-integration' ); ?>
                            </th>
                            <td scope="row">
                                <span><?php printf( __( 'To use the Pro features, please create a <a href="%s">new integration</a> and select Mailercloud [PRO] in the action field.', 'advanced-form-integration' ), admin_url('admin.php?page=advanced-form-integration-new') ); ?></span>
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
                            <span><?php printf( __( 'To unlock custom fields consider <a href="%s">upgrading to Pro</a>.', 'advanced-form-integration' ), admin_url('admin.php?page=advanced-form-integration-settings-pricing') ); ?></span>
                        </td>
                    </tr>
                    <?php
                }
            ?>
            
        </table>
    </script>
    <?php
}

add_action( 'wp_ajax_adfoin_get_mailercloudpro_contact_fields', 'adfoin_get_mailercloudpro_contact_fields', 10, 0 );

/*
* Get contact fields
*/
function adfoin_get_mailercloudpro_contact_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $contact_fidlds = array();
    $endpoint       = "contact/property/search";
    $params         = array(
        'limit'  => 100,
        'page'   => 1,
        'search' => ''
    );

    $data  = adfoin_mailercloud_request( $endpoint, 'POST', $params );

    if( is_wp_error( $data ) ) {
        wp_send_json_error();
    }

    $body = json_decode( wp_remote_retrieve_body( $data ) );

    foreach( $body->data as $single ) {
        if( $single->is_default == 0 ) {
            array_push( $contact_fidlds, array( 'key' => 'cus__' . $single->id, 'value' => $single->field_name ) );
            continue;
        }

        array_push( $contact_fidlds, array( 'key' => $single->field_value, 'value' => $single->field_name ) );
    }

    wp_send_json_success( array_reverse( $contact_fidlds ) );
}

add_action( 'adfoin_mailercloudpro_job_queue', 'adfoin_mailercloudpro_job_queue', 10, 1 );

function adfoin_mailercloudpro_job_queue( $data ) {
    adfoin_mailercloudpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to mailercloud API
 */
function adfoin_mailercloudpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record["data"], true );

    if( array_key_exists( "cl", $record_data["action_data"] ) ) {
        if( $record_data["action_data"]["cl"]["active"] == "yes" ) {
            if( !adfoin_match_conditional_logic( $record_data["action_data"]["cl"], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data['field_data'];
    $list_id = $data['listId'];
    $task    = $record['task'];
    $holder  = array();
    $cf      = array();

    unset( $data['listId'] );

    foreach( $data as $key => $value ) {

        if( substr( $key, 0, 5 ) == 'cus__' && $value ) {
            $key      = substr( $key, 5 );
            $cf[$key] = adfoin_get_parsed_values( $value, $posted_data );
            
            continue;
        }
        $holder[$key] = adfoin_get_parsed_values( $value, $posted_data );
    }

    if( $task == 'subscribe' ) {

        $holder = array_filter( $holder );

        if( $list_id ) {
            $holder['list_id'] = $list_id;
        }

        if( $cf ) {
            $holder['custom_fields'] = $cf;
        }

        $return = adfoin_mailercloud_request( 'contacts', 'POST', $holder, $record );
    }

    return;
}