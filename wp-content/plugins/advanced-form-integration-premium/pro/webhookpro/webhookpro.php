<?php

add_filter( 'adfoin_action_providers', 'adfoin_webhookpro_actions', 10, 1 );

function adfoin_webhookpro_actions( $actions ) {

    $actions['webhookpro'] = array(
        'title' => __( 'Webhook [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'send_to_webhook'   => __( 'Send Data to Webhook', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_add_js_fields', 'adfoin_webhookpro_js_fields', 10, 1 );

function adfoin_webhookpro_js_fields( $field_data ) {}

add_action( 'adfoin_action_fields', 'adfoin_webhookpro_action_fields' );

function adfoin_webhookpro_action_fields() {
    ?>
    <script type="text/template" id="webhookpro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'send_to_webhook'">
                <th scope="row">
                    <?php esc_attr_e( 'Webhook Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                </td>
            </tr>
            <tr class="alternate" v-if="action.task == 'send_to_webhook'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'HTTP Method', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[method]" v-model="fielddata.method" required="required">
                        <option value="POST">POST</option>
                        <option value="GET">GET</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>
    <?php
}

add_action( 'adfoin_webhookpro_job_queue', 'adfoin_webhookpro_job_queue', 10, 1 );

function adfoin_webhookpro_job_queue( $data ) {
    adfoin_webhookpro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Webhook API
 */
function adfoin_webhookpro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record["data"], true );

    if( array_key_exists( "cl", $record_data["action_data"] ) ) {
        if( $record_data["action_data"]["cl"]["active"] == "yes" ) {
            if( !adfoin_match_conditional_logic( $record_data["action_data"]["cl"], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data["field_data"];
    $task    = $record["task"];

    if( $task == "send_to_webhook" ) {
        $url     = empty( $data["url"] ) ? "" : adfoin_get_parsed_values( $data["url"], $posted_data );
        $method  = empty( $data["method"] ) ? "" : adfoin_get_parsed_values( $data["method"], $posted_data );
        $headers = empty( $data["headers"] ) ? "" : adfoin_get_parsed_values( $data["headers"], $posted_data );
        $body    = empty( $data["body"] ) ? "" : adfoin_get_parsed_values( $data["body"], $posted_data );
        $userag  = empty( $data["useragent"] ) ? "" : adfoin_get_parsed_values( $data["useragent"], $posted_data );
        $basic   = empty( $data["basic"] ) ? "" : adfoin_get_parsed_values( $data["basic"], $posted_data );

        if( !$url ) {
            return;
        }

        $args = array(

            'headers' => array(
                'Content-Type' => 'application/json',
            ),
            'body' => json_encode( $posted_data )
        );

        if( $method ) {
            $args["method"] = $method;
        }

        if( $headers ) {
            $args["headers"] = json_decode( stripslashes( $headers ), true );
        }

        if( $body ) {
            $args["body"] = json_decode( stripslashes( $body ), true );

            if( $args["headers"]["Content-Type"] == "application/json" ) {
                $args["body"] = json_encode( $args["body"] );
            }
        }

        if( $userag ) {
            $args["user-agent"] = $userag;
        }

        if( $basic ) {
            $credentials = explode( "|", $basic );

            if( !empty( $credentials ) && count( $credentials ) == 2 ) {
                $args["headers"]["Authorization"] = "Basic " . base64_encode( $credentials[0] . ":" . $credentials[1] );
            }
        }

        $return = wp_remote_request( $url, $args );

        adfoin_add_to_log( $return, $url, $args, $record );
    }

    return;
}