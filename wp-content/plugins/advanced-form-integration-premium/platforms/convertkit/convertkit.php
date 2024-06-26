<?php

add_filter( 'adfoin_action_providers', 'adfoin_convertkit_actions', 10, 1 );

function adfoin_convertkit_actions( $actions ) {

    $actions['convertkit'] = array(
        'title' => __( 'ConvertKit', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To Sequence', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_filter( 'adfoin_settings_tabs', 'adfoin_convertkit_settings_tab', 10, 1 );

function adfoin_convertkit_settings_tab( $providers ) {
    $providers['convertkit'] = __( 'ConvertKit', 'advanced-form-integration' );

    return $providers;
}

add_action( 'adfoin_settings_view', 'adfoin_convertkit_settings_view', 10, 1 );

function adfoin_convertkit_settings_view( $current_tab ) {
    if( $current_tab != 'convertkit' ) {
        return;
    }

    $nonce     = wp_create_nonce( "adfoin_convertkit_settings" );
    $api_key = get_option( 'adfoin_convertkit_api_key' ) ? get_option( 'adfoin_convertkit_api_key' ) : "";
    ?>

    <form name="convertkit_save_form" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>"
          method="post" class="container">

        <input type="hidden" name="action" value="adfoin_convertkit_save_api_key">
        <input type="hidden" name="_nonce" value="<?php echo $nonce ?>"/>

        <table class="form-table">
            <tr valign="top">
                <th scope="row"> <?php _e( 'API Key', 'advanced-form-integration' ); ?></th>
                <td>
                    <input type="text" name="adfoin_convertkit_api_key"
                           value="<?php echo esc_attr( $api_key ); ?>" placeholder="<?php _e( 'Please enter API Key', 'advanced-form-integration' ); ?>"
                           class="regular-text"/>
                    <p class="description" id="code-description"><?php _e( 'Please go to Account Settings > Advanced to get API Key', 'advanced-form-integration' ); ?></a></p>
                </td>
            </tr>
        </table>
        <?php submit_button(); ?>
    </form>

    <?php
}

add_action( 'admin_post_adfoin_convertkit_save_api_key', 'adfoin_save_convertkit_api_key', 10, 0 );

function adfoin_save_convertkit_api_key() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'adfoin_convertkit_settings' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $api_key = sanitize_text_field( $_POST["adfoin_convertkit_api_key"] );

    // Save tokens
    update_option( "adfoin_convertkit_api_key", $api_key );

    advanced_form_integration_redirect( "admin.php?page=advanced-form-integration-settings&tab=convertkit" );
}

add_action( 'adfoin_add_js_fields', 'adfoin_convertkit_js_fields', 10, 1 );

function adfoin_convertkit_js_fields( $field_data ) {}

add_action( 'adfoin_action_fields', 'adfoin_convertkit_action_fields' );

function adfoin_convertkit_action_fields() {
    ?>
    <script type="text/template" id="convertkit-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Subscriber Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Sequence', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId">
                        <option value=""> <?php _e( 'Select Sequence...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.list" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    <p class="description" id="code-description"><?php _e( 'Either sequence or form must be selected', 'advanced-form-integration' ); ?></a></p>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Form', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[formId]" v-model="fielddata.formId">
                        <option value=""> <?php _e( 'Select Form...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.forms" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': formsLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
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
                                <span><?php printf( __( 'To use the Pro features, please create a <a href="%s">new integration</a> and select ConvertKit [PRO] in the action field.', 'advanced-form-integration' ), admin_url('admin.php?page=advanced-form-integration-new') ); ?></span>
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
                            <span><?php printf( __( 'To unlock custom fields and tags consider <a href="%s">upgrading to Pro</a>.', 'advanced-form-integration' ), admin_url('admin.php?page=advanced-form-integration-settings-pricing') ); ?></span>
                        </td>
                    </tr>
                    <?php
                }
            ?>
            
        </table>
    </script>
    <?php
}

add_action( 'wp_ajax_adfoin_get_convertkit_list', 'adfoin_get_convertkit_list', 10, 0 );
/*
 * Get ConvertKit subscriber lists
 */
function adfoin_get_convertkit_list() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $data = adfoin_convertkit_request( 'sequences' );

    if( !is_wp_error( $data ) ) {
        $body  = json_decode( wp_remote_retrieve_body( $data ) );
        $lists = wp_list_pluck( $body->courses, 'name', 'id' );

        wp_send_json_success( $lists );
    }
}

add_action( 'wp_ajax_adfoin_get_convertkit_forms', 'adfoin_get_convertkit_forms', 10, 0 );
/*
 * Get ConvertKit subscriber forms
 */
function adfoin_get_convertkit_forms() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $data = adfoin_convertkit_request( 'forms' );

    if( !is_wp_error( $data ) ) {
        $body  = json_decode( wp_remote_retrieve_body( $data ) );
        $forms = wp_list_pluck( $body->forms, 'name', 'id' );

        wp_send_json_success( $forms );
    }
}

add_action( 'adfoin_convertkit_job_queue', 'adfoin_convertkit_job_queue', 10, 1 );

function adfoin_convertkit_job_queue( $data ) {
    adfoin_convertkit_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to ConvertKit API
 */
function adfoin_convertkit_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record["data"], true );

    if( array_key_exists( 'cl', $record_data['action_data']) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data = $record_data['field_data'];
    $task = $record['task'];

    if( $task == 'subscribe' ) {
        $sequence_id = isset( $data['listId'] ) ? $data['listId'] : '';
        $form_id     = isset( $data['formId'] ) ? $data['formId'] : '';
        $email       = empty( $data['email'] ) ? '' : trim( adfoin_get_parsed_values( $data['email'], $posted_data ) );
        $first_name  = empty( $data['firstName'] ) ? '' : adfoin_get_parsed_values( $data['firstName'], $posted_data );

        $data = array(
            'email'      => $email,
            'first_name' => $first_name
        );

        if( $sequence_id ) {
            $sequence_endpoint = "sequences/{$sequence_id}/subscribe";
            $sequence_return   = adfoin_convertkit_request( $sequence_endpoint, 'POST', $data, $record );
        }

        if( $form_id ) {
            $form_endpoint = "forms/{$form_id}/subscribe";
            $form_return   = adfoin_convertkit_request( $form_endpoint, 'POST', $data, $record );
        }
    }

    return;
}

function adfoin_convertkit_request( $endpoint, $method = 'GET', $data = array(), $record = array() ) {

    $api_key = get_option( 'adfoin_convertkit_api_key' ) ? get_option( 'adfoin_convertkit_api_key' ) : "";

    if(!$api_key ) {
        return;
    }

    $base_url = 'https://api.convertkit.com/v3/';
    $url      = $base_url . $endpoint;
    $url      = add_query_arg( 'api_key', $api_key, $url );

    $args = array(
        'method'  => $method,
        'headers' => array(
            'Content-Type' => 'application/json'
        )
    );

    if( 'POST' == $method || 'PUT' == $method ) {
        $args['body'] = json_encode( $data );
    }

    $response = wp_remote_request( $url, $args );

    if( $record ) {
        adfoin_add_to_log( $response, $url, $args, $record );
    }

    return $response;
}