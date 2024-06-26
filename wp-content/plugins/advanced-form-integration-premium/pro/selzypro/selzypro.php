<?php

add_filter( 'adfoin_action_providers', 'adfoin_selzypro_actions', 10, 1 );

function adfoin_selzypro_actions( $actions ) {

    $actions['selzypro'] = array(
        'title' => __( 'Selzy [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Add Contact To List', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_selzypro_action_fields' );

function adfoin_selzypro_action_fields() {
?>
    <script type="text/template" id="selzypro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                <div class="spinner" v-bind:class="{'is-active': fieldsLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'List', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId">
                        <option value=""> <?php _e( 'Select List...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.list" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Skip Double Opt-in', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[doubleOptin]" value="true" v-model="fielddata.doubleOptin">
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
             
        </table>
    </script>
<?php
}

add_action( 'wp_ajax_adfoin_get_selzypro_fields', 'adfoin_get_selzypro_fields', 10, 0 );

/*
 * Get Robly fields
 */
function adfoin_get_selzypro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $return = adfoin_selzy_request( 'getFields' );

    if( !is_wp_error( $return ) ) {
        $body   = json_decode( wp_remote_retrieve_body( $return ), true );
        $fields = array(
            array( 'key' => 'string__email', 'value' => 'Email', 'description' => '' ),
            array( 'key' => 'string__Name', 'value' => 'Name', 'description' => '' ),
            array( 'key' => 'string__phone', 'value' => 'Phone Number', 'description' => '' ),
        );

        if( isset( $body['result'] ) && is_array( $body['result'] ) ) {
            foreach( $body['result'] as $single ) {
                if( $single['name'] == 'Name' ) {
                    continue;
                }
                
                array_push( $fields, array( 'key' => $single['type'] . '__' . $single['name'], 'value' => $single['public_name'] ) );
            }
        }

        array_push( $fields, array( 'key' => 'tags', 'value' => 'Tags', 'description' => 'Must be pre-existed in your Selzy account. Use comma to add multiple tags.' ) );

        wp_send_json_success( $fields );
    } else {
        wp_send_json_error();
    }
}

add_action( 'adfoin_selzypro_job_queue', 'adfoin_selzypro_job_queue', 10, 1 );

function adfoin_selzypro_job_queue( $data ) {
    adfoin_selzypro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Selzy API
 */
function adfoin_selzypro_send_data( $record, $posted_data ) {
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
    $dopt    = isset( $data['doubleOptin'] ) ? $data['doubleOptin'] : '';
    $tags    = isset( $data['tags'] ) ? adfoin_get_parsed_values( $data['tags'], $posted_data ) : '';
    $task    = $record['task'];

    if( $task == 'subscribe' ) {

        unset( $data['listId'] );
        unset( $data['doubleOptin'] );
        unset( $data['tags'] );

        $req_data = array(
            'fields' => array()
        );

        foreach( $data as $key => $value ) {
            list( $type, $field_key ) = explode( '__', $key, 2 );

            $req_data['fields'][$field_key] = adfoin_get_parsed_values( $value, $posted_data );
        }

        if( $list_id ) {
            $req_data['list_ids'] = $list_id;
        }

        if( 'true' == $dopt ) {
            $req_data['double_optin'] = 3;
        }

        if( $tags ) {
            $tags_array       = array_map( 'trim', explode( ',', $tags ) );
            $trimmed_tags     = implode( ',', $tags_array );
            $req_data['tags'] = $trimmed_tags;
        }

        $return = adfoin_selzy_request( 'subscribe', 'GET', $req_data, $record );
    }

}