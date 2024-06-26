<?php

add_action( 'adfoin_custom_script', 'adfoin_pro_custom_script' );

function adfoin_pro_custom_script() {
    wp_enqueue_script( 'adfoin-pro-script', ADVANCED_FORM_INTEGRATION_URL . '/pro/assets/pro.js', array( 'adfoin-vuejs' ), '', 1 );
}