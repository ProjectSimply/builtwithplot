<?php

add_filter( 'adfoin_action_providers', 'adfoin_emailoctopuspro_actions', 10, 1 );

function adfoin_emailoctopuspro_actions( $actions ) {

    $actions['emailoctopuspro'] = array(
        'title' => __( 'EmailOctopus [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_emailoctopuspro_action_fields' );

function adfoin_emailoctopuspro_action_fields() {
    ?>
    <script type="text/template" id="emailoctopuspro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe' || action.task == 'unsubscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe' || action.task == 'unsubscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'EmailOctopus List', 'advanced-form-integration' ); ?>
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

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Double Opt-in', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[doubleoptin]" value="true" v-model="fielddata.doubleoptin">
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Update if contact already exists', 'advanced-form-integration' ); ?>
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

add_action( 'adfoin_emailoctopuspro_job_queue', 'adfoin_emailoctopuspro_job_queue', 10, 1 );

function adfoin_emailoctopuspro_job_queue( $data ) {
    adfoin_emailoctopuspro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to emailoctopus API
 */
function adfoin_emailoctopuspro_send_data( $record, $posted_data ) {

    $api_key = get_option( 'adfoin_emailoctopus_api_key' ) ? get_option( 'adfoin_emailoctopus_api_key' ) : "";

    if(!$api_key ) {
        exit;
    }

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data         = $record_data['field_data'];
    $list_id      = $data['listId'];
    $task         = $record['task'];
    $update       = $data['update'];
    $doubleoption = isset( $data['doubleoptin'] ) && $data['doubleoptin'] ? $data['doubleoptin'] : '';
    $email        = empty( $data['email'] ) ? '' : trim( adfoin_get_parsed_values($data['email'], $posted_data) );

    if( $task == 'subscribe' ) {
        $first_name = empty( $data['firstName'] ) ? '' : adfoin_get_parsed_values($data['firstName'], $posted_data);
        $last_name  = empty( $data['lastName'] ) ? '' : adfoin_get_parsed_values($data['lastName'], $posted_data);
        $cf         = empty( $data['customFields'] ) ? '' : adfoin_get_parsed_values( $data['customFields'], $posted_data );

        $subscriber_data = array(
            'api_key'       => $api_key,
            'email_address' => $email,
            'status'        => 'SUBSCRIBED',
            'fields' => array(
                'FirstName' => $first_name,
                'LastName'  => $last_name
            )
        );

        if( $cf ) {
            $holder = explode( '|', $cf );

            foreach( $holder as $single ) {
                $single = explode( '=', $single, 2 );

                $subscriber_data['fields'][$single[0]] = $single[1];
            }
        }

        if( 'true' == $doubleoption ) {
            unset( $subscriber_data['status'] );
        }

        $sub_url = "https://emailoctopus.com/api/1.6/lists/{$list_id}/contacts";

        $sub_args = array(
            'method'  => 'POST',
            'headers' => array(
                'Content-Type'  => 'application/json',
                'Authorization' => 'api_key ' . $api_key
            ),
            'body' => json_encode( $subscriber_data )
        );

        if( 'true' == $update ) {
            $email_hash     = md5( strtolower( $email ) );
            $contact_exists = adfoin_emailoctopuspro_if_contact_exists( $email_hash, $list_id, $api_key );

            if( $contact_exists ) {
                $sub_url = "https://emailoctopus.com/api/1.6/lists/{$list_id}/contacts/{$email_hash}";
                $sub_args['method'] = 'PUT';
            } else{
                $sub_url = "https://emailoctopus.com/api/1.6/lists/{$list_id}/contacts";
                $sub_args['method'] = 'POST';
            }
            
        }

        $return = wp_remote_request( $sub_url, $sub_args );

        adfoin_add_to_log( $return, $sub_url, $sub_args, $record );

        return;
    }
}

/*
* Check if contact exists
*/
function adfoin_emailoctopuspro_if_contact_exists( $contact_hash, $list_id, $api_key ) {
    if( !$contact_hash || !$list_id || !$api_key ) {
        return false;
    }

    $url    = "https://emailoctopus.com/api/1.6/lists/{$list_id}/contacts/{$contact_hash}?api_key={$api_key}";
    $return = wp_remote_get( $url );

    if ( $return['response']['code'] == 200 ) {
        return true;
    } else {
        return false;
    }

}