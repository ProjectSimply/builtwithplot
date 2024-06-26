<?php

add_filter( 'adfoin_action_providers', 'adfoin_woodpeckerpro_actions', 10, 1 );

function adfoin_woodpeckerpro_actions( $actions ) {

    $actions['woodpeckerpro'] = array(
        'title' => __( 'Woodpecker.co [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Add Subscriber', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_add_js_fields', 'adfoin_woodpeckerpro_js_fields', 10, 1 );

function adfoin_woodpeckerpro_js_fields( $field_data ) { }

add_action( 'adfoin_action_fields', 'adfoin_woodpeckerpro_action_fields' );

function adfoin_woodpeckerpro_action_fields() {
?>
    <script type="text/template" id="woodpeckerpro-action-template">
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
                        <?php esc_attr_e( 'Campaign', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[list_id]" v-model="fielddata.listId" required="required">
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

add_action( 'wp_ajax_adfoin_get_woodpreckerpro_list', 'adfoin_get_woodpreckerpro_list', 10, 0 );

/*
 * Get Mailchimp subscriber lists
 */
function adfoin_get_woodpreckerpro_list() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $api_key = get_option( 'adfoin_woodpecker_api_key' );

    if( ! $api_key ) {
        return array();
    }

    $url = ' https://api.woodpecker.co/rest/v1/campaign_list';

    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . base64_encode( $api_key . ':' . 'X' )
        )
    );

    $data = wp_remote_request( $url, $args );

    if( !is_wp_error( $data ) ) {
        $body  = json_decode( $data['body'] );
        $lists = wp_list_pluck( $body, 'name', 'id' );

        wp_send_json_success( $lists );
    } else {
        wp_send_json_error();
    }
}

add_action( 'adfoin_woodpeckerpro_job_queue', 'adfoin_woodpeckerpro_job_queue', 10, 1 );

function adfoin_woodpeckerpro_job_queue( $data ) {
    adfoin_woodpeckerpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Mailchimp API
 */
function adfoin_woodpeckerpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data['field_data'];
    $list_id = $data['list_id'];
    $task    = $record['task'];
    $email   = empty( $data['email'] ) ? '' : trim( adfoin_get_parsed_values($data['email'], $posted_data) );

    if( $task == 'subscribe' ) {
        $first_name = empty( $data['firstName'] ) ? '' : adfoin_get_parsed_values($data['firstName'], $posted_data);
        $last_name  = empty( $data['lastName'] ) ? '' : adfoin_get_parsed_values($data['lastName'], $posted_data);
        $company    = empty( $data['company'] ) ? '' : adfoin_get_parsed_values($data['company'], $posted_data);
        $website    = empty( $data['website'] ) ? '' : adfoin_get_parsed_values($data['website'], $posted_data);
        $industry   = empty( $data['industry'] ) ? '' : adfoin_get_parsed_values($data['industry'], $posted_data);
        $tags       = empty( $data['tags'] ) ? '' : adfoin_get_parsed_values($data['tags'], $posted_data);
        $title      = empty( $data['title'] ) ? '' : adfoin_get_parsed_values($data['title'], $posted_data);
        $phone      = empty( $data['phone'] ) ? '' : adfoin_get_parsed_values($data['phone'], $posted_data);
        $address    = empty( $data['address'] ) ? '' : adfoin_get_parsed_values($data['address'], $posted_data);
        $state      = empty( $data['state'] ) ? '' : adfoin_get_parsed_values($data['state'], $posted_data);
        $country    = empty( $data['country'] ) ? '' : adfoin_get_parsed_values($data['country'], $posted_data);
        $status     = empty( $data['status'] ) ? '' : adfoin_get_parsed_values($data['status'], $posted_data);
        $snippet1   = empty( $data['snippet1'] ) ? '' : adfoin_get_parsed_values($data['snippet1'], $posted_data);
        $snippet2   = empty( $data['snippet2'] ) ? '' : adfoin_get_parsed_values($data['snippet2'], $posted_data);
        $snippet3   = empty( $data['snippet3'] ) ? '' : adfoin_get_parsed_values($data['snippet3'], $posted_data);
        $snippet4   = empty( $data['snippet4'] ) ? '' : adfoin_get_parsed_values($data['snippet4'], $posted_data);
        $snippet5   = empty( $data['snippet5'] ) ? '' : adfoin_get_parsed_values($data['snippet5'], $posted_data);
        $snippet6   = empty( $data['snippet6'] ) ? '' : adfoin_get_parsed_values($data['snippet6'], $posted_data);
        $snippet7   = empty( $data['snippet7'] ) ? '' : adfoin_get_parsed_values($data['snippet7'], $posted_data);
        $snippet8   = empty( $data['snippet8'] ) ? '' : adfoin_get_parsed_values($data['snippet8'], $posted_data);
        $snippet9   = empty( $data['snippet9'] ) ? '' : adfoin_get_parsed_values($data['snippet9'], $posted_data);
        $snippet10  = empty( $data['snippet10'] ) ? '' : adfoin_get_parsed_values($data['snippet10'], $posted_data);
        $snippet11  = empty( $data['snippet11'] ) ? '' : adfoin_get_parsed_values($data['snippet11'], $posted_data);
        $snippet12  = empty( $data['snippet12'] ) ? '' : adfoin_get_parsed_values($data['snippet12'], $posted_data);
        $snippet13  = empty( $data['snippet13'] ) ? '' : adfoin_get_parsed_values($data['snippet13'], $posted_data);
        $snippet14  = empty( $data['snippet14'] ) ? '' : adfoin_get_parsed_values($data['snippet14'], $posted_data);
        $snippet15  = empty( $data['snippet15'] ) ? '' : adfoin_get_parsed_values($data['snippet15'], $posted_data);

        $prospect_data = array(
            'email'      => $email,
            'first_name' => $first_name,
            'last_name'  => $last_name,
            'company'    => $company,
            'website'    => $website,
            'industry'   => $industry,
            'tags'       => $tags,
            'title'      => $title,
            'phone'      => $phone,
            'address'    => $address,
            'state'      => $state,
            'country'    => $country,
            'status'     => $status,
            'snippet1'   => $snippet1,
            'snippet2'  => $snippet2,
            'snippet3'   => $snippet3,
            'snippet4'   => $snippet4,
            'snippet5'   => $snippet5,
            'snippet6'   => $snippet6,
            'snippet7'   => $snippet7,
            'snippet8'   => $snippet8,
            'snippet9'   => $snippet9,
            'snippet10'  => $snippet10,
            'snippet11'  => $snippet11,
            'snippet12'  => $snippet12,
            'snippet13'  => $snippet13,
            'snippet14'  => $snippet14,
            'snippet15'  => $snippet15
        );

        $subscriber_data = array(
            'prospects'  => array( array_filter( $prospect_data ) )
        );

        $endpoint = 'add_prospects_list';

        if( $list_id ) {
            $endpoint = 'add_prospects_campaign';

            $subscriber_data['campaign']['campaign_id'] = $list_id;
        }

        if( $prospect_id = adfoin_woodpecker_if_prospect_exists( $email ) ) {
            $subscriber_data['update'] = 'true';
            $subscriber_data['prospects'][0]['id'] = $prospect_id;
        }

        $return = adfoin_woodpecker_request( $endpoint, 'POST', $subscriber_data, $record );
    }
}

function adfoin_woodpecker_if_prospect_exists( $email ) {
    $prospect_id = '';
    $return      = adfoin_woodpecker_request( 'prospects?search=email=' . $email );
    $body        = json_decode( wp_remote_retrieve_body( $return ), true );

    if( isset( $body[0], $body[0]['id'] ) ) {
        $prospect_id = $body[0]['id'];
    }

    return $prospect_id;
}