<?php

add_filter( 'adfoin_action_providers', 'adfoin_mailchimppro_actions', 10, 1 );

function adfoin_mailchimppro_actions( $actions ) {

    $actions['mailchimppro'] = array(
        'title' => __( 'Mailchimp [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_add_js_fields', 'adfoin_mailchimppro_js_fields', 10, 1 );

function adfoin_mailchimppro_js_fields( $field_data ) { }

add_action( 'adfoin_action_fields', 'adfoin_mailchimppro_action_fields' );

function adfoin_mailchimppro_action_fields() {
?>
    <script type="text/template" id="mailchimppro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe' || action.task == 'unsubscribe'">
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
                        <?php esc_attr_e( 'Mailchimp List', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId" required="required" @change="getFields">
                        <option value=""> <?php _e( 'Select List...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.list" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    <p class="description" id="code-description"><?php _e( 'Select list to get merge fields', 'advanced-form-integration' ); ?></a></p>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Double Opt-In', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[doubleoptin]" value="true" v-model="fielddata.doubleoptin">
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Update Contact (If Exists)', 'advanced-form-integration' ); ?>
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

add_action( 'wp_ajax_adfoin_get_mailchimppro_mergefields', 'adfoin_get_mailchimppro_mergefields', 10, 0 );

/*
 * Get Mailchimp List merge fields
 */
function adfoin_get_mailchimppro_mergefields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $list_id    = isset( $_POST['listId'] ) ? sanitize_text_field( $_POST['listId'] ) : '';
    $endpoint   = "lists/{$list_id}/merge-fields?count=100";
    $data       = adfoin_mailchimp_request( $endpoint, 'GET' );
    $attributes = array();

    if( !is_wp_error( $data ) ) {
        $body  = json_decode( wp_remote_retrieve_body( $data ) );

        foreach( $body->merge_fields as $single ) {

            if( 'address' == $single->type ) {
                array_push( $attributes, array( 'key' => 'address__' . $single->tag . '_addr1', 'value' => 'Street Address', 'description' => '' ) );
                array_push( $attributes, array( 'key' => 'address__' . $single->tag . '_addr2', 'value' => 'Address Line 2', 'description' => '' ) );
                array_push( $attributes, array( 'key' => 'address__' . $single->tag . '_city', 'value' => 'City', 'description' => '' ) );
                array_push( $attributes, array( 'key' => 'address__' . $single->tag . '_state', 'value' => 'State', 'description' => '' ) );
                array_push( $attributes, array( 'key' => 'address__' . $single->tag . '_zip', 'value' => 'Zip', 'description' => '' ) );
                array_push( $attributes, array( 'key' => 'address__' . $single->tag . '_country', 'value' => 'Country', 'description' => '' ) );

                continue;
            }
            array_push( $attributes, array( 'key' => $single->tag, 'value' => $single->name, 'description' => '' ) );
        }

        $interests = array();
        $interest_categories_return = adfoin_mailchimp_request( "lists/{$list_id}/interest-categories?count=100", 'GET' );

        if( !is_wp_error( $interest_categories_return ) && 200 == wp_remote_retrieve_response_code( $interest_categories_return ) ) {
            $interest_categories_body = json_decode( wp_remote_retrieve_body( $interest_categories_return ), true );

            if( isset( $interest_categories_body['categories'] ) && is_array( $interest_categories_body['categories'] ) ) {
                foreach( $interest_categories_body['categories'] as $interest_category ) {
                    $interests_return = adfoin_mailchimp_request( "lists/{$list_id}/interest-categories/{$interest_category['id']}/interests?count=100", 'GET' );

                    if( !is_wp_error( $interests_return ) && 200 == wp_remote_retrieve_response_code( $interests_return ) ) {
                        $interests_body = json_decode( wp_remote_retrieve_body( $interests_return ), true );

                        if( isset( $interests_body['interests'] ) && is_array( $interests_body['interests'] ) ) {
                            foreach( $interests_body['interests'] as $interest ) {
                                $interests[] = $interest['name'] . ': ' . $interest['id'];
                            }
                        }
                    }
                }
            }
        }

        if( $interests ) {
            $interests_text = implode( ', ', $interests );
            array_push( $attributes, array( 'key' => 'interests', 'value' => 'Groups', 'description' => 'Insert group ID. Use comma to add multiple groups. Group ID List: '. $interests_text ) );
        }

        array_push( $attributes, array( 'key' => 'tags', 'value' => 'Tags', 'description' => 'Use comma (without space) for multiple tags' ) );

        wp_send_json_success( $attributes );
    } else {
        wp_send_json_error();
    }
}

/*
 * Get member details
 */
function adfoin_mailchimppro_get_member_details( $email, $record = array() ) {

    $endpoint = "search-members?query={$email}";
    $member = adfoin_mailchimp_request( $endpoint, 'GET', array(), $record );

    if( !is_wp_error( $member ) ) {
        $body = json_decode( $member['body'], true );

        if( isset( $body['exact_matches']['members'] ) && count( $body['exact_matches']['members'] ) > 0 ) {
            return $body['exact_matches']['members'][0];
        } else {
            return false;
        }
        
    }

    return false;
}

add_action( 'adfoin_mailchimppro_job_queue', 'adfoin_mailchimppro_job_queue', 10, 1 );

function adfoin_mailchimppro_job_queue( $data ) {
    adfoin_mailchimppro_send_data( $data['record'], $data['posted_data'] );
}

/*0
 * Handles sending data to Mailchimp API
 */
function adfoin_mailchimppro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data      = $record_data['field_data'];
    $list_id   = isset( $data['listId'] ) ? $data['listId'] : '';
    $dopt      = isset( $data['doubleoptin'] ) ? $data['doubleoptin'] : '';
    $update    = isset( $data['update'] ) ? $data['update'] : '';
    $interests = isset( $data['interests'] ) ? $data['interests'] : '';
    $task      = isset( $record['task'] ) ? $record['task'] : '';
    $email     = empty( $data['email'] ) ? '' : trim( adfoin_get_parsed_values($data['email'], $posted_data ) );

    if( $task == 'subscribe' ) {

        $tags = array();

        if( isset( $data['tags'] ) ) {
            $tags = explode( ',', $data['tags'] );
        }

        unset( $data['email'] );
        unset( $data['list'] );
        unset( $data['listId'] );
        unset( $data['tags'] );
        unset( $data['doubleoptin'] );
        unset( $data['update'] );
        unset( $data['interests'] );

        $holder = array();

        foreach ( $data as $key => $value ) {
            if( substr( $key, 0, 9 ) == 'address__' && $value ) {
                $key = substr( $key, 9 );
                list( $field_key, $field ) = explode( '_', $key );
                $holder[$field_key][$field] = adfoin_get_parsed_values( $value, $posted_data );

                continue;
            }

            $holder[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );
        }

        $holder = array_filter( $holder );
        $status = 'true' == $dopt ? 'pending' : 'subscribed';

        $subscriber_data = array(
            'email_address'  => $email,
            'status' => $status
        );

        if( !empty( $holder ) ) {
            $subscriber_data['merge_fields'] = $holder;
        }

        if( !empty( array_filter( $tags ) ) ) {
            $parsed_tags = array();

            foreach( $tags as $tag ) {
                $parsed_tags[] = adfoin_get_parsed_values( $tag, $posted_data );
            }

            $subscriber_data['tags'] = $parsed_tags;
        }

        if( $interests ) {
            $interests_request_data = array();
            $interests_array        = explode( ',', adfoin_get_parsed_values( $interests, $posted_data ) );

            foreach( $interests_array as $interest_key ) {
                $interest_key = trim( $interest_key );
                $interests_request_data[$interest_key] = true;
            }

            $subscriber_data['interests'] = $interests_request_data;
        }

        $member = adfoin_mailchimppro_get_member_details( $email, $record );

        if( $member && 'true' == $update ) {
            $member_id    = isset( $member['id'] ) ? $member['id'] : '';
            $sub_endpoint = "lists/{$list_id}/members/{$member_id}";
            $method       = 'PUT';

            if( $tags ) {
                $formatted_tags = array( 'tags' => array(), 'is_syncing' => false );

                foreach( $tags as $tag ) {
                    array_push( $formatted_tags['tags'], array( 'name' => adfoin_get_parsed_values( $tag, $posted_data ), 'status' => 'active' ) );
                }

                $tags_endpont = "lists/{$list_id}/members/{$member_id}/tags";
                $tag_return   = adfoin_mailchimp_request( $tags_endpont, 'POST', $formatted_tags, $record );

            }
        } else{
            $sub_endpoint = "lists/{$list_id}/members";
            $method       = 'POST';
        }

        $return = adfoin_mailchimp_request( $sub_endpoint, $method, $subscriber_data, $record );
        return;
    }

    if( $task == 'unsubscribe' ) {

        $search_endpoint  = "search-members?query={$email}";
        $member           = adfoin_mailchimp_request( $search_endpoint, 'GET', array(), $record );

        if( !is_wp_error( $member ) ) {
            $body          = json_decode( $member['body'], true );
            $id            = $body['exact_matches']['members'][0]['id'];
            $unsub_endpont = "lists/{$list_id}/members/{$id}";
            $return        = adfoin_mailchimp_request( $unsub_endpont, 'DELETE', array(), $record );
        }
    }

    return;
}