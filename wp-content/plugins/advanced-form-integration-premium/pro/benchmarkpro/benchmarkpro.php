<?php

add_filter( 'adfoin_action_providers', 'adfoin_benchmarkpro_actions', 10, 1 );

function adfoin_benchmarkpro_actions( $actions ) {

    $actions['benchmarkpro'] = array(
        'title' => __( 'Benchmark [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Add Contact', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_benchmarkpro_action_fields' );

function adfoin_benchmarkpro_action_fields() {
    ?>
    <script type="text/template" id="benchmarkpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Contact Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Contact List', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId" @change="getFields" required="required">
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

add_action( 'wp_ajax_adfoin_get_benchmarkpro_fields', 'adfoin_get_benchmarkpro_fields', 10, 0 );
/*
 * Get Benchmark list fields
 */
function adfoin_get_benchmarkpro_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $api_key = get_option( 'adfoin_benchmark_api_key' ) ? get_option( 'adfoin_benchmark_api_key' ) : "";
    $list_id = $_POST["listId"] ? sanitize_text_field( $_POST["listId"] ) : "";

    if(!$api_key || !$list_id ) {
        return;
    }

    $args = array(

        'headers' => array(
            'Content-Type' => 'application/json',
            'AuthToken'    => $api_key
        )
    );

    $contact_fields = array(
        array( 'key' => 'Email', 'value' => 'Email', 'description' => '' ),
        array( 'key' => 'FirstName', 'value' => 'Frist Name', 'description' => '' ),
        array( 'key' => 'MiddleName', 'value' => 'Middle Name', 'description' => '' ),
        array( 'key' => 'LastName', 'value' => 'Last Name', 'description' => '' ),
    );

    $url  = "https://clientapi.benchmarkemail.com/Contact/{$list_id}";
    $data = wp_remote_request( $url, $args );

    if( is_wp_error( $data ) ) {
        wp_send_json_error();
    }

    $body       = json_decode( $data["body"] );
    $raw_fields = $body->Response->Data;

    foreach( $raw_fields as $key => $value ) {
        if( strpos( $key, 'Field' ) !== false && strpos( $key, 'Name' ) !== false ) {
            $id = str_replace( 'Name', '', $key );

            array_push( $contact_fields, array( 'key' => $id, 'value' => $value, 'description' => '' ) );
        }
    }

    wp_send_json_success( $contact_fields );
}

add_action( 'adfoin_benchmarkpro_job_queue', 'adfoin_benchmarkpro_job_queue', 10, 1 );

function adfoin_benchmarkpro_job_queue( $data ) {
    adfoin_benchmarkpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Benchmark API
 */
function adfoin_benchmarkpro_send_data( $record, $posted_data ) {

    $api_key = get_option( 'adfoin_benchmark_api_key' ) ? get_option( 'adfoin_benchmark_api_key' ) : "";

    if(!$api_key ) {
        return;
    }

    $record_data = json_decode( $record["data"], true );

    if( array_key_exists( "cl", $record_data["action_data"]) ) {
        if( $record_data["action_data"]["cl"]["active"] == "yes" ) {
            if( !adfoin_match_conditional_logic( $record_data["action_data"]["cl"], $posted_data ) ) {
                return;
            }
        }
    }

    $data = $record_data["field_data"];
    $task = $record["task"];

    if( $task == "subscribe" ) {
        $list_id = $data["listId"];
        $url     = "https://clientapi.benchmarkemail.com/Contact/{$list_id}/ContactDetails";

        $subscriber_data = array(
            "Data" => array(
                "EmailPerm"  => 1,
            )
        );

        unset( $data['listId'] );

        if( is_array( $data ) ) {
            foreach( $data as $key => $value ) {
                $subscriber_data['Data'][$key] = adfoin_get_parsed_values( $value, $posted_data );
            }
        }

        $subscriber_data = array_filter( $subscriber_data );

        $args = array(

            'headers' => array(
                'Content-Type' => 'application/json',
                'AuthToken'    => $api_key
            ),
            'body' => json_encode( $subscriber_data )
        );

        $return = wp_remote_post( $url, $args );

        adfoin_add_to_log( $return, $url, $args, $record );
    }

    return;
}

