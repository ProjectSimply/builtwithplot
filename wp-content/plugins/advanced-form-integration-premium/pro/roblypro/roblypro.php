<?php

add_filter( 'adfoin_action_providers', 'adfoin_roblypro_actions', 10, 1 );

function adfoin_roblypro_actions( $actions ) {

    $actions['roblypro'] = array(
        'title' => __( 'Robly [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Add Contact To List', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_roblypro_action_fields' );

function adfoin_roblypro_action_fields() {
?>
    <script type="text/template" id="roblypro-action-template">
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

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
            
        </table>
    </script>
<?php
}

add_action( 'wp_ajax_adfoin_get_roblypro_fields', 'adfoin_get_roblypro_fields', 10, 0 );

/*
 * Get Robly fields
 */
function adfoin_get_roblypro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $return = adfoin_robly_request( 'fields/show?include_all=true' );

    if( !is_wp_error( $return ) ) {
        $body   = json_decode( wp_remote_retrieve_body( $return ), true );
        $fields = array();

        if( is_array( $body ) ) {
            foreach( $body as $single ) {
                array_push( $fields, array( 'key' => $single['field_tag']['user_tag'], 'value' => $single['field_tag']['label'] ) );
            }
        }

        array_push( $fields, array( 'key' => 'tags', 'value' => 'Tags', 'description' => 'Must be pre-existed in your Robly account. Use comma to add multiple tags.' ) );

        wp_send_json_success( $fields );
    } else {
        wp_send_json_error();
    }
}

add_action( 'adfoin_roblypro_job_queue', 'adfoin_roblypro_job_queue', 10, 1 );

function adfoin_roblypro_job_queue( $data ) {
    adfoin_roblypro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Robly API
 */
function adfoin_roblypro_send_data( $record, $posted_data ) {
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
    $holder  = array();

    if( $task == 'subscribe' ) {

        if( isset( $data['tags'] ) && $data['tags'] ) {
            $tags = $data['tags'];

            unset( $data['tags'] );
        }

        unset( $data['listId'] );

        foreach( $data as $key => $value ) {
            $holder[$key] = adfoin_get_parsed_values( $value, $posted_data );
        }

        if( $list_id ) {
            $holder['sub_lists[]'] = $list_id;
        }

        if( $tags ) {
            $tags_array = explode( ',', adfoin_get_parsed_values( $tags, $posted_data ) );

            foreach( $tags_array as $tag ) {
                $holder['tags[]'] = trim( $tag );
            }
        }

        $holder['return_contact'] = 'true';
        $holder['include_fields'] = 'true';

        $contact_id = adfoin_robly_check_if_contact_exists( $holder['email'] );

        if( $contact_id ) {
            $return = adfoin_robly_request( 'contacts/update_full_contact?member_id=' . $contact_id, 'POST', $holder, $record );
        } else{
            $return = adfoin_robly_request( 'sign_up/generate', 'POST', $holder, $record );
        }
    }
}