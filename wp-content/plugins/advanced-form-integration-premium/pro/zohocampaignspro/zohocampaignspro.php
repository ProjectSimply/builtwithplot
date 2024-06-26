<?php

add_filter( 'adfoin_action_providers', 'adfoin_zohocampaignspro_actions', 10, 1 );

function adfoin_zohocampaignspro_actions( $actions ) {

    $actions['zohocampaignspro'] = array(
        'title' => __( 'ZOHO Campaigns [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Subscribe To List', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_zohocampaignspro_action_fields' );

function adfoin_zohocampaignspro_action_fields() {
?>
    <script type="text/template" id="zohocampaignspro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                    <div class="spinner" v-bind:class="{'is-active': fieldLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Mailing List', 'advanced-form-integration' ); ?>
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

add_action( 'adfoin_zohocampaignspro_job_queue', 'adfoin_zohocampaignspro_job_queue', 10, 1 );

function adfoin_zohocampaignspro_job_queue( $data ) {
    adfoin_zohocampaignspro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Zoho Campaign API
 */
function adfoin_zohocampaignspro_send_data( $record, $posted_data ) {

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

    unset( $data['listId'] );


    if( $task == 'subscribe' ) {
        $properties = array();

        foreach( $data as $key => $value ) {
            $properties[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );
        }

        $properties    = array_filter( $properties );
        $zohocampaigns = ADFOIN_ZohoCampaigns::get_instance();
        $return        = $zohocampaigns->create_contact( $list_id, $properties, $record );
    }

    return;
}