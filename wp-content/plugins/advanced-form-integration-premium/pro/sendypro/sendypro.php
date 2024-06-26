<?php
add_filter( 'adfoin_action_providers', 'adfoin_sendypro_actions', 10, 1 );

function adfoin_sendypro_actions( $actions ) {

    $actions['sendypro'] = array(
        'title' => __( 'Sendy [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' ),
            'unsubscribe' => __( 'Unsubscribe From List', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_sendypro_action_fields' );

function adfoin_sendypro_action_fields() {
    ?>
    <script type="text/template" id="sendypro-action-template">
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
                        <?php esc_attr_e( 'Sendy List ID', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input  name="fieldData[listId]" type="text" v-model="fielddata.listId"  required="required">

                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>
    <?php
}

add_action( 'adfoin_sendypro_job_queue', 'adfoin_sendypro_job_queue', 10, 1 );

function adfoin_sendypro_job_queue( $data ) {
    adfoin_sendypro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Mailjet API
 */
function adfoin_sendypro_send_data( $record, $posted_data ) {

    $api_key = get_option( 'adfoin_sendy_api_key' ) ? get_option( 'adfoin_sendy_api_key' ) : "";
    $ins_url = get_option( 'adfoin_sendy_url' ) ? get_option( 'adfoin_sendy_url' ) : "";

    if( !$api_key || !$ins_url ) {
        exit;
    }

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
    $list_id = $data["listId"];
    $email   = empty( $data["email"] ) ? "" : adfoin_get_parsed_values( $data["email"], $posted_data );

    if( $task == "subscribe" ) {
        $name          = empty( $data["name"] ) ? "" : adfoin_get_parsed_values( $data["name"], $posted_data );
        $country       = empty( $data["country"] ) ? "" : adfoin_get_parsed_values( $data["country"], $posted_data );
        $ipaddress     = empty( $data["ipaddress"] ) ? "" : adfoin_get_parsed_values( $data["ipaddress"], $posted_data );
        $referrer      = empty( $data["referrer"] ) ? "" : adfoin_get_parsed_values( $data["referrer"], $posted_data );
        $custom_fields = empty( $data["custom_fields"] ) ? "" : adfoin_get_parsed_values( $data["custom_fields"], $posted_data );

        $data = array(
            'api_key' => $api_key,
            'list'    => $list_id,
            'name'    => $name,
            'email'   => $email
        );

        if( $country ) { $data['country'] = $country; }
        if( $ipaddress ) { $data['ipaddress'] = $ipaddress; }
        if( $referrer ) { $data['referrer'] = $referrer; }
        if( $custom_fields ) {
            $custom_fields = explode( ',', trim( $custom_fields) );

            foreach( $custom_fields as $single ) {
                $parts = explode( ':', $single );

                $data[$parts[0]] = $parts[1];
            }
        }

        $url = $ins_url . "/subscribe";

        $args = array(

            'headers' => array(
                'Content-Type' => 'application/x-www-form-urlencoded'
            ),
            'body' => $data
        );

        $return = wp_remote_post( $url, $args );

        adfoin_add_to_log( $return, $url, $args, $record );
    }

    if( $task == "unsubscribe" ) {
        $url = $ins_url . "/unsubscribe";

        $data = array(
            'api_key' => $api_key,
            'list'    => $list_id,
            'email'   => $email
        );

        $args = array(

            'headers' => array(
                'Content-Type' => 'application/x-www-form-urlencoded'
            ),
            'body' => $data
        );

        $return = wp_remote_post( $url, $args );

        adfoin_add_to_log( $return, $url, $args, $record );
    }

    return;
}