<?php

// add_filter( 'adfoin_form_providers', 'adfoin_webhooksinbound_add_provider' );

// function adfoin_webhooksinbound_add_provider( $providers ) {

//     $providers['webhooksinbound'] = __( 'Webhooks', 'advanced-form-integration' );

//     return $providers;
// }

function adfoin_webhooksinbound_get_forms( $form_provider ) {

    if ( $form_provider != 'webhooksinbound' ) {
        return;
    }

    $triggers = array(
        '1' => __( 'Inbound Webhooks (JSON)', 'advanced-form-integration' )
    );

    return $triggers;
}

function adfoin_webhooksinbound_get_form_fields( $form_provider, $form_id ) {

    if ( $form_provider != 'webhooksinbound' ) {
        return;
    }

    $rand         = md5( uniqid( rand(), true ) );
    $webhook_url  = rest_url() . 'afi/webhooksinbound/' . $rand;
    $fields       = array( 'webhook_url' => $webhook_url );
    $special_tags = adfoin_get_special_tags();

    if( is_array( $fields ) && is_array( $special_tags ) ) {
        $fields = $fields + $special_tags;
    }

    return $fields;
}

add_action( 'adfoin_trigger_extra_fields', 'adfoin_webhooksinbound_trigger_fields' );

function adfoin_webhooksinbound_trigger_fields() {
    if ( adfoin_fs()->is__premium_only() ) {
        if ( adfoin_fs()->is_plan( 'professional', true ) ) {
    ?>
    <tr v-if="trigger.formProviderId == 'webhooksinbound' && trigger.formId == '1'" is="webhook-row" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fieldData"></tr>
    <?php
    }
    }
}

add_action( "adfoin_trigger_templates", "adfoin_webooksinbound_trigger_template" );

function adfoin_webooksinbound_trigger_template() {
    ?>
        <script type="text/template" id="webhook-row-template">
            <tr valign="top" class="alternate" id="webhook-row">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Webhook URL', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="text" class="large-text" v-model="trigger.formFields.webhook_url">
                </td>
            </tr>
        </script>
    <?php
}

add_action( "rest_api_init", "adfoin_webooksinbound_create_webhook_route" );

function adfoin_webooksinbound_create_webhook_route() {
    register_rest_route( 'afi', '/webhooksinbound/(?P<webhook_hash>[a-zA-Z0-9-]+)', array(
        array(
            'methods'  => WP_REST_Server::CREATABLE,
            'callback' => 'adfoin_webhooksinbound_get_webhook_data',
            'permission_callback' => '__return_true'
        ),
    ) );
}

function adfoin_webhooksinbound_normalize_array( $input_array ) {
 
    foreach( $input_array as $key1 => &$value1 ) {
        if( is_array( $value1 ) ) {
            foreach( $value1 as $key2 => &$value2 ) {
                $input_array[$key1 . '__' . $key2] = $value2;
            }
        }
    }
    
    return $input_array;
}

function adfoin_webhooksinbound_get_webhook_data( $request ) {
    global $wpdb, $post;

    $params        = $request->get_params();
    $webhook_hash  = $params['webhook_hash'];
    $saved_records = $wpdb->get_results( 'SELECT * FROM ' . $wpdb->prefix . 'adfoin_integration WHERE status = 1 AND form_provider = "webhooksinbound" AND form_id = 1 AND data LIKE "%' . $webhook_hash . '%"', ARRAY_A );

    if( count( $saved_records ) < 1 ) {
        return;
    }
    
    $posted_data  = array();
    $posted_data = adfoin_webhooksinbound_normalize_array( $params );

    foreach( $posted_data as $key => $value ) {
        if( is_array( $value ) ) {
            unset( $posted_data[$key] );
        }
    }
    $special_tag_values = adfoin_get_special_tags_values( $post );

    if( is_array( $posted_data ) && is_array( $special_tag_values ) ) {
        $posted_data = $posted_data + $special_tag_values;
    }

    foreach ( $saved_records as $record ) {
        $action_provider = $record['action_provider'];
        call_user_func( "adfoin_{$action_provider}_send_data", $record, $posted_data );
    }
}
