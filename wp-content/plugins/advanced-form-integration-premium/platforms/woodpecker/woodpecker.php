<?php

add_filter( 'adfoin_action_providers', 'adfoin_woodpecker_actions', 10, 1 );

function adfoin_woodpecker_actions( $actions ) {

    $actions['woodpecker'] = array(
        'title' => __( 'Woodpecker.co', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Add Subscriber', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_filter( 'adfoin_settings_tabs', 'adfoin_woodpecker_settings_tab', 10, 1 );

function adfoin_woodpecker_settings_tab( $providers ) {
    $providers['woodpecker'] = __( 'Woodpecker.co', 'advanced-form-integration' );

    return $providers;
}

add_action( 'adfoin_settings_view', 'adfoin_woodpecker_settings_view', 10, 1 );

function adfoin_woodpecker_settings_view( $current_tab ) {
    if( $current_tab != 'woodpecker' ) {
        return;
    }

    $nonce     = wp_create_nonce( 'adfoin_woodpecker_settings' );
    $api_key = get_option( 'adfoin_woodpecker_api_key' ) ? get_option( 'adfoin_woodpecker_api_key' ) : '';
    ?>

    <form name="woodpecker_save_form" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>"
          method="post" class="container">

        <input type="hidden" name="action" value="adfoin_save_woodpecker_api_key">
        <input type="hidden" name="_nonce" value="<?php echo $nonce ?>"/>

        <table class="form-table">
            <tr valign="top">
                <th scope="row"> <?php _e( 'Woodpecker.co API Key', 'advanced-form-integration' ); ?></th>
                <td>
                    <input type="text" name="adfoin_woodpecker_api_key"
                           value="<?php echo esc_attr( $api_key ); ?>" placeholder="<?php _e( 'Please enter API Key', 'advanced-form-integration' ); ?>"
                           class="regular-text"/>
                    <p class="description" id="code-description"><?php _e( 'Go to Prospects > Integrations > API Keys', 'advanced-form-integration' ); ?></a></p>
                </td>
            </tr>
        </table>
        <?php submit_button(); ?>
    </form>

    <?php
}

add_action( 'admin_post_adfoin_save_woodpecker_api_key', 'adfoin_save_woodpecker_api_key', 10, 0 );

function adfoin_save_woodpecker_api_key() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'adfoin_woodpecker_settings' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $api_key = sanitize_text_field( $_POST['adfoin_woodpecker_api_key'] );

    // Save tokens
    update_option( 'adfoin_woodpecker_api_key', $api_key );

    advanced_form_integration_redirect( 'admin.php?page=advanced-form-integration-settings&tab=woodpecker' );
}

add_action( 'adfoin_add_js_fields', 'adfoin_woodpecker_js_fields', 10, 1 );

function adfoin_woodpecker_js_fields( $field_data ) { }

add_action( 'adfoin_action_fields', 'adfoin_woodpecker_action_fields' );

function adfoin_woodpecker_action_fields() {
?>
    <script type="text/template" id="woodpecker-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

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
                                <span><?php printf( __( 'To use the Pro features, please create a <a href="%s">new integration</a> and select Woodpecker.co [PRO] in the action field.', 'advanced-form-integration' ), admin_url('admin.php?page=advanced-form-integration-new') ); ?></span>
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

/*
 * Saves connection mapping
 */
function adfoin_woodpecker_save_integration() {
    $params = array();
    parse_str( adfoin_sanitize_text_or_array_field( $_POST['formData'] ), $params );

    $trigger_data = isset( $_POST['triggerData'] ) ? adfoin_sanitize_text_or_array_field( $_POST['triggerData'] ) : array();
    $action_data  = isset( $_POST['actionData'] ) ? adfoin_sanitize_text_or_array_field( $_POST['actionData'] ) : array();
    $field_data   = isset( $_POST['fieldData'] ) ? adfoin_sanitize_text_or_array_field( $_POST['fieldData'] ) : array();

    $integration_title = isset( $trigger_data['integrationTitle'] ) ? $trigger_data['integrationTitle'] : '';
    $form_provider_id  = isset( $trigger_data['formProviderId'] ) ? $trigger_data['formProviderId'] : '';
    $form_id           = isset( $trigger_data['formId'] ) ? $trigger_data['formId'] : '';
    $form_name         = isset( $trigger_data['formName'] ) ? $trigger_data['formName'] : '';
    $action_provider   = isset( $action_data['actionProviderId'] ) ? $action_data['actionProviderId'] : '';
    $task              = isset( $action_data['task'] ) ? $action_data['task'] : '';
    $type              = isset( $params['type'] ) ? $params['type'] : '';

    $all_data = array(
        'trigger_data' => $trigger_data,
        'action_data'  => $action_data,
        'field_data'   => $field_data
    );

    global $wpdb;

    $integration_table = $wpdb->prefix . 'adfoin_integration';

    if ( $type == 'new_integration' ) {

        $result = $wpdb->insert(
            $integration_table,
            array(
                'title'           => $integration_title,
                'form_provider'   => $form_provider_id,
                'form_id'         => $form_id,
                'form_name'       => $form_name,
                'action_provider' => $action_provider,
                'task'            => $task,
                'data'            => json_encode( $all_data, true ),
                'status'          => 1
            )
        );
    }

    if ( $type == 'update_integration' ) {

        $id = esc_sql( trim( $params['edit_id'] ) );

        if ( $type != 'update_integration' &&  !empty( $id ) ) {
            return;
        }

        $result = $wpdb->update( $integration_table,
            array(
                'title'           => $integration_title,
                'form_provider'   => $form_provider_id,
                'form_id'         => $form_id,
                'form_name'       => $form_name,
                'data'            => json_encode( $all_data, true ),
            ),
            array(
                'id' => $id
            )
        );
    }

    if ( $result ) {
        wp_send_json_success();
    } else {
        wp_send_json_error();
    }
}

add_action( 'adfoin_woodpecker_job_queue', 'adfoin_woodpecker_job_queue', 10, 1 );

function adfoin_woodpecker_job_queue( $data ) {
    adfoin_woodpecker_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Woodpecker API
 */
function adfoin_woodpecker_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data  = $record_data['field_data'];
    $task  = $record['task'];
    $email = empty( $data['email'] ) ? '' : adfoin_get_parsed_values( $data['email'], $posted_data );

    if( $task == 'subscribe' ) {
        $first_name   = empty( $data['firstName'] ) ? '' : adfoin_get_parsed_values($data['firstName'], $posted_data);
        $last_name    = empty( $data['lastName'] ) ? '' : adfoin_get_parsed_values($data['lastName'], $posted_data);

        $subscriber_data = array(
            'prospects'  => array(
                array(
                    'email'      => trim( $email ),
                    'first_name' => $first_name,
                    'last_name'  => $last_name
                )
            )
        );

        $return = adfoin_woodpecker_request( 'add_prospects_list', 'POST', $subscriber_data, $record );
    }

}

/*
 * Woodpecker API Request
 */
function adfoin_woodpecker_request( $endpoint, $method = 'GET', $data = array(), $record = array() ) {

    $api_key = get_option( 'adfoin_woodpecker_api_key' ) ? get_option( 'adfoin_woodpecker_api_key' ) : '';

    if( !$api_key ) {
        return;
    }

    $base_url = 'https://api.woodpecker.co/rest/v1/';
    $url      = $base_url . $endpoint;

    $args = array(
        'method'  => $method,
        'headers' => array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . base64_encode( $api_key . ':' . 'X' )
        ),
    );

    if ( 'POST' == $method || 'PUT' == $method ) {
        $args['body'] = json_encode( $data );
    }

    $response = wp_remote_request( $url, $args );

    if ( $record ) {
        adfoin_add_to_log( $response, $url, $args, $record );
    }

    return $response;
}