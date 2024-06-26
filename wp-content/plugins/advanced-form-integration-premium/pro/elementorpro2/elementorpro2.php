<?php
add_action( 'elementor_pro/init', 'elementorpro2_init' );

function elementorpro2_init() {

    include_once( dirname(__FILE__).'/class-afi.php' );
    $afi         = new AFI_Elementor();

    if ( defined( 'ELEMENTOR_PRO_VERSION' ) && version_compare( ELEMENTOR_PRO_VERSION, '3.5.0', '>')) {
        \ElementorPro\Plugin::instance()->modules_manager->get_modules( 'forms' )->actions_registrar->register( $afi, $afi->get_name() );
    } else {
        \ElementorPro\Plugin::instance()->modules_manager->get_modules( 'forms' )->add_form_action( $afi->get_name(), $afi );
    }
}

function adfoin_elementorpro2_get_forms( $form_provider ) {
    if ( $form_provider != 'elementorpro2' ) {
        return;
    }

    return array( '1' => __( 'Manaually add form field IDs', 'advanced-form-integratino' ) );
}

function adfoin_elementorpro2_get_form_fields( $form_provider, $form_id ) {

    if ( $form_provider != 'elementorpro2' ) {
        return;
    }

    $fields       = array();
    $special_tags = adfoin_get_special_tags();

    if( is_array( $fields ) && is_array( $special_tags ) ) {
        $fields = $fields + $special_tags;
    }

    return $fields;
}

function adfoin_elementorpro2_get_form_name( $form_provider, $form_id ) {

    if ( $form_provider != "elementorpro2" ) {
        return;
    }

    return __( 'Manaually add form field IDs', 'advanced-form-integratino' );

}


