<?php

add_filter( 'adfoin_action_providers', 'adfoin_googlesheetspro_actions', 10, 1 );

function adfoin_googlesheetspro_actions( $actions ) {

    $actions['googlesheetspro'] = array(
        'title' => __( 'Google Sheets [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'add_row'   => __( 'Add New Row', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_googlesheetspro_action_fields', 10, 1 );

function adfoin_googlesheetspro_action_fields() {
    ?>
    <script type="text/template" id="googlesheetspro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'add_row'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'add_row'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Spreadsheet', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[spreadsheetId]" v-model="fielddata.spreadsheetId" @change="getWorksheets" required="required">
                        <option value=""> <?php _e( 'Select Spreadsheet...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.spreadsheetList" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'add_row'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Worksheet', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[worksheetId]" v-model="fielddata.worksheetId" @change="getHeaders" required="required">
                        <option value=""> <?php _e( 'Select Worksheet...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.worksheetList" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': worksheetLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'add_row' && trigger.formProviderId == 'woocommerce'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Single row for each WooCommerce order item', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[wcMultipleRow]" value="true" v-model="fielddata.wcMultipleRow">
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
            <input type="hidden" name="fieldData[worksheetName]" :value="fielddata.worksheetName" />
            <input type="hidden" name="fieldData[worksheetList]" :value="JSON.stringify( fielddata.worksheetList )" />

        </table>

    </script>


    <?php
}

add_action( 'adfoin_googlesheetspro_job_queue', 'adfoin_googlesheetspro_job_queue', 10, 1 );

function adfoin_googlesheetspro_job_queue( $data ) {
    adfoin_googlesheetspro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Google Sheets API
 */
function adfoin_googlesheetspro_send_data( $record, $submitted_data ) {

    $record_data = json_decode( $record["data"], true );

    if( array_key_exists( "cl", $record_data["action_data"] ) ) {
        if( $record_data["action_data"]["cl"]["active"] == "yes" ) {
            if( !adfoin_match_conditional_logic( $record_data["action_data"]["cl"], $submitted_data ) ) {
                return;
            }
        }
    }

    $all_data = apply_filters(
        'afi_googlesheets_before_process',
        array( 
            'submitted_data' => $submitted_data,
            'record_data'    => $record_data
        )
    );

    $posted_data    = $all_data['submitted_data'];
    $data           = $all_data['record_data']["field_data"];
    $spreadsheet_id = $data["spreadsheetId"];
    $worksheet_name = $data["worksheetName"];
    $task           = $record["task"];


    if( $task == "add_row" ) {
        unset( $data["spreadsheetId"] );
        unset( $data["spreadsheetList"] );
        unset( $data["worksheetId"] );
        unset( $data["worksheetList"] );
        unset( $data["worksheetName"] );

        if( isset( $data["wcMultipleRow"] ) ) {
            unset( $data["wcMultipleRow"] );
        }

        $holder       = array();
        $googlesheets = ADFOIN_GoogleSheets::get_instance();

        if( empty( $data ) ) {
            $key = "A";

            if( is_array( $posted_data ) ) {
                $posted_data = array_filter( $posted_data );
                
                foreach( $posted_data as $value ) {
                    $holder[$key] = $value;
                    $key++;

                    if( $key == "ZZ" ) break;
                }
            }
        } else{
            foreach ( $data as $key => $value ) {
                $holder[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );
            }
        }

        $googlesheets->append_new_row( $record, $spreadsheet_id, $worksheet_name, $holder );
    }

    return;
}