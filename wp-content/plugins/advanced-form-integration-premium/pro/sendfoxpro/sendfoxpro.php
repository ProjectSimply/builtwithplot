<?php

add_filter( 'adfoin_action_providers', 'adfoin_sendfoxpro_actions', 10, 1 );

function adfoin_sendfoxpro_actions( $actions ) {

    $actions['sendfoxpro'] = array(
        'title' => __( 'SendFox [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_sendfoxpro_action_fields' );

function adfoin_sendfoxpro_action_fields() {
?>
    <script type="text/template" id="sendfoxpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe' || action.task == 'unsubscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                <div class="spinner" v-bind:class="{'is-active': fieldsLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe' || action.task == 'unsubscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'SendFox List', 'advanced-form-integration' ); ?>
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
        </table>
    </script>
<?php
}

add_action( 'wp_ajax_adfoin_get_sendfoxpro_fields', 'adfoin_get_sendfoxpro_fields', 10, 0 );

/*
 * Get Sendfox Contact Fields
 */
function adfoin_get_sendfoxpro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $contact_fields = array(
        array( 'key' => 'email', 'value' => 'Email', 'description' => '' ),
        array( 'key' => 'first_name', 'value' => 'First Name', 'description' => '' ),
        array( 'key' => 'last_name', 'value' => 'Last Name', 'description' => '' ),
    );

    $additional_fields = adfoin_sendfox_request( 'contact-fields' );
    $body = json_decode( wp_remote_retrieve_body( $additional_fields ), true );

    if( is_array( $body['data'] ) ) {
        foreach( $body['data'] as $single_field ) {
            $description = '';

            if( $single_field['name'] == 'birthday' ) {
                $description = 'Use YYYY-MM-DD format';
            }
            array_push( $contact_fields, array( 'key' => $single_field['name'], 'value' => $single_field['label'], 'description' => $description ) );
        }
    }

    wp_send_json_success( $contact_fields );
}

add_action( 'adfoin_sendfoxpro_job_queue', 'adfoin_sendfoxpro_job_queue', 10, 1 );

function adfoin_sendfoxpro_job_queue( $data ) {
    adfoin_sendfoxpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to SendFox API
 */
function adfoin_sendfoxpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data['field_data'];
    $list_id = $data['listId'];
    $task    = $record['task'];
    $email   = empty( $data['email'] ) ? '' : trim( adfoin_get_parsed_values($data['email'], $posted_data) );

    if( $task == 'subscribe' ) {
        $first_name = empty( $data['first_name'] ) ? '' : adfoin_get_parsed_values($data['first_name'], $posted_data);
        $last_name  = empty( $data['last_name'] ) ? '' : adfoin_get_parsed_values($data['last_name'], $posted_data);

        $subscriber_data = array(
            'email' => $email
        );

        if( $first_name ) { $subscriber_data['first_name'] = $first_name; }
        if( $last_name ) { $subscriber_data['last_name'] = $last_name; }

        if( $list_id ) {
            $subscriber_data['lists'] = array( $list_id );
        }

        unset( $data['listId'] );
        unset( $data['email'] );
        unset( $data['first_name'] );
        unset( $data['last_name'] );

        if( count( $data ) > 0 ) {
            $data = array_filter( $data );
            $subscriber_data['contact_fields'] = array();

            foreach( $data as $key => $value ) {
                $subscriber_data['contact_fields'][] = array( 'name' => $key, 'value' => adfoin_get_parsed_values( $value, $posted_data ) );
            }
        }

        $return = adfoin_sendfox_request( 'contacts', 'POST', $subscriber_data, $record );

        return;
    }
}