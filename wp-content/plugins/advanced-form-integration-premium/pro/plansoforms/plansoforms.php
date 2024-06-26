<?php

// add_filter( 'adfoin_form_providers', 'adfoin_plansoforms_add_provider' );

// function adfoin_plansoforms_add_provider( $providers ) {

//     if ( is_plugin_active( 'planso-forms/index.php' ) ) {
//         $providers['plansoforms'] = __( 'PlanSo Forms', 'advanced-form-integration' );
//     }

//     return $providers;
// }

function adfoin_plansoforms_get_forms( $form_provider ) {

    if ( $form_provider != 'plansoforms' ) {
        return;
    }

    global $wpdb;

    $form_data = get_posts( array(
        'post_type'           => 'psfb',
        'post_status'         => -1,
        'posts_per_page'      => -1
    ) );

    $forms = wp_list_pluck( $form_data, "post_title", "ID" );

    return $forms;
}

function adfoin_plansoforms_get_form_fields( $form_provider, $form_id ) {

    if ( $form_provider != 'plansoforms' ) {
        return;
    }

    if( !$form_id ) {
        return;
    }

    $form_data  = get_post( $form_id );
    $data       = json_decode( $form_data->post_content );
    $field_data = array();
    $converted  = (array) $data->fields;

    foreach( $data->fields as $field ) {
        foreach( $field as $single ) {
            array_push( $field_data, $single );
        }
    }

    $fields       = wp_list_pluck( $field_data, "label", "name" );
    $special_tags = adfoin_get_special_tags();

    if( is_array( $fields ) && is_array( $special_tags ) ) {
        $fields = $fields + $special_tags;
    }

    return $fields;
}

/*
 * Get Form name by form id
 */
function adfoin_plansoforms_get_form_name( $form_provider, $form_id ) {

    if ( $form_provider != "plansoforms" ) {
        return;
    }

    $form      = get_post( $form_id );
    $form_name = $form->post_title;

    return $form_name;
}

add_action( 'psfb_submit_after_error_check_success', 'adfoin_plansoforms_submission' );

function adfoin_plansoforms_submission() {
    $posted_data = array();

    foreach( $_POST as $key => $value ) {
        $posted_data[$key] = adfoin_sanitize_text_or_array_field( $value );
    }

    $form_id                        = $posted_data["psfb_form_id"];
    $posted_data["submission_date"] = date( "Y-m-d H:i:s" );
    $posted_data["user_ip"]         = adfoin_get_user_ip();

    global $wpdb, $post;

    $special_tag_values = adfoin_get_special_tags_values( $post );

    if( is_array( $posted_data ) && is_array( $special_tag_values ) ) {
        $posted_data = $posted_data + $special_tag_values;
    }

    $saved_records = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}adfoin_integration WHERE status = 1 AND form_provider = 'plansoforms' AND form_id = " . $form_id, ARRAY_A );

    foreach ( $saved_records as $record ) {
        $action_provider = $record['action_provider'];
        call_user_func( "adfoin_{$action_provider}_send_data", $record, $posted_data );
    }
}
