<?php

add_filter( 'adfoin_action_providers', 'adfoin_convertkitpro_actions', 10, 1 );

function adfoin_convertkitpro_actions( $actions ) {

    $actions['convertkitpro'] = array(
        'title' => __( 'ConvertKit [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To Sequence', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_action( 'adfoin_add_js_fields', 'adfoin_convertkitpro_js_fields', 10, 1 );

function adfoin_convertkitpro_js_fields( $field_data ) {}

add_action( 'adfoin_action_fields', 'adfoin_convertkitpro_action_fields' );

function adfoin_convertkitpro_action_fields() {
    ?>
    <script type="text/template" id="convertkitpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Subscriber Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Sequence', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId">
                        <option value=""> <?php _e( 'Select Sequence...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.list" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                    <p class="description" id="code-description"><?php _e( 'Either sequence or form must be selected', 'advanced-form-integration' ); ?></a></p>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Form', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[formId]" v-model="fielddata.formId">
                        <option value=""> <?php _e( 'Select Form...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.forms" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': formsLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Tags', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[tags]" v-model="fielddata.tags">
                        <option value=""> <?php _e( 'Select Tag...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.tagList" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': tagLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>
    <?php
}

add_action( 'wp_ajax_adfoin_get_convertkitpro_tags', 'adfoin_get_convertkitpro_tags', 10, 0 );

/*
 * Get ConvertKit subscriber tags
 */
function adfoin_get_convertkitpro_tags() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $data = adfoin_convertkit_request( 'tags' );

    if( !is_wp_error( $data ) ) {
        $body = json_decode( wp_remote_retrieve_body( $data ) );
        $tags = wp_list_pluck( $body->tags, 'name', 'id' );

        wp_send_json_success( $tags );
    }
}

add_action( 'adfoin_convertkitpro_job_queue', 'adfoin_convertkitpro_job_queue', 10, 1 );

function adfoin_convertkitpro_job_queue( $data ) {
    adfoin_convertkitpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to ConvertKit API
 */
function adfoin_convertkitpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record["data"], true );

    if( array_key_exists( "cl", $record_data["action_data"] ) ) {
        if( $record_data["action_data"]["cl"]["active"] == "yes" ) {
            if( !adfoin_match_conditional_logic( $record_data["action_data"]["cl"], $posted_data ) ) {
                return;
            }
        }
    }

    $data = $record_data["field_data"];
    $task = $record["task"];

    if( $task == "subscribe" ) {
        $sequence_id   = isset( $data['listId'] ) ? $data['listId'] : '';
        $form_id       = isset( $data['formId'] ) ? $data['formId'] : '';
        $email         = empty( $data["email"] ) ? "" : adfoin_get_parsed_values( $data["email"], $posted_data );
        $first_name    = empty( $data["firstName"] ) ? "" : adfoin_get_parsed_values( $data["firstName"], $posted_data );
        $tags          = empty( $data["tags"] ) ? "" : adfoin_get_parsed_values( $data["tags"], $posted_data );
        $custom_fields = empty( $data["customFields"] ) ? "" : $data["customFields"];

        $data = array(
            "email"      => $email,
            "first_name" => $first_name
        );

        if( $custom_fields ) {
            $holder = explode( "|", $custom_fields );

            foreach( $holder as $single ) {
                $single = explode( "=", $single, 2 );

                $data["fields"][strtolower( $single[0] )] = adfoin_get_parsed_values( trim($single[1]), $posted_data );
            }
        }

        if( $tags ) {
            $tags_array = explode( ',', $tags );
            $data['tags'] = $tags_array;
        }

        if( $sequence_id ) {
            $sequence_endpoint = "sequences/{$sequence_id}/subscribe";
            $sequence_return   = adfoin_convertkit_request( $sequence_endpoint, 'POST', $data, $record );
        }

        if( $form_id ) {
            $form_endpoint = "forms/{$form_id}/subscribe";
            $form_return   = adfoin_convertkit_request( $form_endpoint, 'POST', $data, $record );
        }
    }

    return;
}

