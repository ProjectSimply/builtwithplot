<?php

add_filter( 'adfoin_action_providers', 'adfoin_pipedrivepro_actions', 10, 1 );

function adfoin_pipedrivepro_actions( $actions ) {

    $actions['pipedrivepro'] = array(
        'title' => __( 'Pipedrive [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'add_ocdna' => __( 'Create Organization, Person, Deal, Note, Activity', 'advanced-form-integration' ),
            'add_lead'  => __( 'Create New Lead', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_pipedrivepro_action_fields', 10, 1 );

function adfoin_pipedrivepro_action_fields() {
    ?>
    <script type="text/template" id="pipedrivepro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'add_ocdna' || action.task == 'add_lead'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">

                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'add_ocdna' || action.task == 'add_lead'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Owner', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <select name="fieldData[owner]" v-model="fielddata.owner" required="required">
                        <option value=""> <?php _e( 'Select Owner...', 'advanced-form-integration' ); ?> </option>
                        <option v-for="(item, index) in fielddata.ownerList" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': ownerLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'add_ocdna'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Allow Duplicate Person', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[duplicate]" value="true" v-model="fielddata.duplicate">
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'add_ocdna'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'Allow Duplicate Organization', 'advanced-form-integration' ); ?>
                    </label>
                </td>
                <td>
                    <input type="checkbox" name="fieldData[duplicateOrg]" value="true" v-model="fielddata.duplicateOrg">
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>
        </table>
    </script>
    <?php
}

add_action( 'wp_ajax_adfoin_get_pipedrive_lead_fields', 'adfoin_get_pipedrive_lead_fields', 10, 0 );

/*
 * Get Pipedrive Lead Fields
 */
function adfoin_get_pipedrive_lead_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $labels     = '';
    $label_data = adfoin_pipedrive_request( 'leadLabels' );
    $label_body = json_decode( $label_data['body'] );

    foreach( $label_body->data as $single ) {
        $labels .= $single->name . '/' . $single->color . ': ' . $single->id . ' ';
    }

    $lead_fields = array(
        array( 'key' => 'lead_title', 'value' => 'Title [Lead]', 'description' => '' ),
        array( 'key' => 'lead_note', 'value' => 'Note [Lead]', 'description' => '' ),
        array( 'key' => 'lead_value', 'value' => 'Value [Lead]', 'description' => '' ),
        array( 'key' => 'lead_currency', 'value' => 'Value Currency [Lead]', 'description' => '' ),
        array( 'key' => 'lead_expected_close_date', 'value' => 'Expected Close Date [Lead]', 'description' => 'format: YYYY-MM-DD' ),
        array( 'key' => 'lead_label_ids', 'value' => 'Label IDs [Deal]', 'description' => $labels )
    );

    $data = adfoin_pipedrive_request( 'dealFields' );

    if( is_wp_error( $data ) ) {
        wp_send_json_error();
    }

    $body = json_decode( $data['body'] );

    foreach( $body->data as $single ) {
        if( strlen( $single->key ) == 40 ) {

            $description = '';

            if( $single->field_type == 'enum' || $single->field_type == 'set' ) {
                foreach( $single->options as $value ) {
                    $description .= $value->label . ': ' . $value->id . '  ';
                }
            }

            array_push( $lead_fields, array( 'key' => 'lead_' . $single->key, 'value' => $single->name . ' [Lead]', 'description' => $description ) );
        }
    }

    wp_send_json_success( $lead_fields );
}

add_action( 'adfoin_pipedrivepro_job_queue', 'adfoin_pipedrivepro_job_queue', 10, 1 );

function adfoin_pipedrivepro_job_queue( $data ) {
    adfoin_pipedrivepro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Pipedrive API
 */
function adfoin_pipedrivepro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data          = $record_data['field_data'];
    $task          = $record['task'];
    $owner         = $data['owner'];
    $duplicate     = isset( $data['duplicate'] ) ? $data['duplicate'] : '';
    $duplicate_org = isset( $data['duplicateOrg'] ) ? $data['duplicateOrg'] : '';
    $org_id        = '';
    $person_id     = '';
    $deal_id       = '';

    if( $task == 'add_ocdna' ) {

        $holder      = array();
        $org_data    = array();
        $person_data = array();
        $deal_data   = array();
        $note_data   = array();
        $act_data    = array();

        foreach( $data as $key => $value ) {
            $holder[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );
        }

        foreach( $holder as $key => $value ) {
            if( substr( $key, 0, 4 ) == 'org_' && $value ) {
                $key = substr( $key, 4 );

                $org_data[$key] = $value;
            }

            if( substr( $key, 0, 4 ) == 'per_' && $value ) {
                $key = substr( $key, 4 );

                $person_data[$key] = $value;
            }

            if( substr( $key, 0, 5 ) == 'deal_' && $value ) {
                $key = substr( $key, 5 );

                $deal_data[$key] = $value;
            }

            if( substr( $key, 0, 5 ) == 'note_' && $value ) {
                $key = substr( $key, 5 );

                $note_data[$key] = $value;
            }

            if( substr( $key, 0, 4 ) == 'act_' && $value ) {
                $key = substr( $key, 4 );

                $act_data[$key] = $value;
            }
        }

        if( isset( $org_data['name'] ) && $org_data['name'] ) {
            $org_data['owner_id'] = $owner;

            $org_data = array_filter( array_map( 'trim', $org_data ) );
            $org_id   = adfoin_pipedrive_organization_exists( $org_data['name'] );

            if( $org_id && 'true' != $duplicate_org ) {
                $org_response = adfoin_pipedrive_request( 'organizations/' . $org_id, 'PUT', $org_data, $record );
            } else{
                $org_response = adfoin_pipedrive_request( 'organizations', 'POST', $org_data, $record );
                $org_body     = json_decode( wp_remote_retrieve_body( $org_response ) );

                if( $org_body->success == true ) {
                    $org_id = $org_body->data->id;
                }
            }
        }

        if( $person_data['name'] ) {            
            $person_data['owner_id'] = $owner;

            if( $org_id ) {
                $person_data['org_id'] = $org_id;
            }

            $person_data = array_filter( array_map( 'trim', $person_data ) );

            if( isset( $person_data['email'] ) ) {
                $person_id = adfoin_pipedrive_person_exists( $person_data['email'] );

                if( $person_id && 'true' != $duplicate ) {
                    $person_response = adfoin_pipedrive_request( 'persons/' . $person_id, 'PUT', $person_data, $record );
                } else{
                    $person_response = adfoin_pipedrive_request( 'persons', 'POST', $person_data, $record );
                    $person_body     = json_decode( wp_remote_retrieve_body( $person_response ) );

                    if( $person_body->success == true ) {
                        $person_id = $person_body->data->id;
                    }
                }
            }
        }

        if( isset( $deal_data['title'] ) && $deal_data['title'] ) {
            $deal_data['user_id'] = $owner;

            if( $org_id ) {
                $deal_data['org_id'] = $org_id;
            }

            if( $person_id ) {
                $deal_data['person_id'] = $person_id;
            }

            $deal_data     = array_filter( array_map( 'trim', $deal_data ) );
            $deal_response = adfoin_pipedrive_request( 'deals', 'POST', $deal_data, $record );
            $deal_body     = json_decode( wp_remote_retrieve_body( $deal_response ) );

            if( $deal_body->success == true ) {
                $deal_id = $deal_body->data->id;
            }
        }

        if( isset( $note_data['content'] ) && $note_data['content'] ) {
            $note_data['user_id'] = $owner;

            if( $org_id ) {
                $note_data['org_id'] = $org_id;
            }

            if( $person_id ) {
                $note_data['person_id'] = $person_id;
            }

            if( $deal_id ) {
                $note_data['deal_id'] = $deal_id;
            }

            $note_data     = array_filter( array_map( 'trim', $note_data ) );
            $note_response = adfoin_pipedrive_request( 'notes', 'POST', $note_data, $record );
            $note_body     = json_decode( wp_remote_retrieve_body( $note_response ) );
        }

        if( isset( $act_data['subject'] ) && $act_data['subject'] ) {
            $act_data['user_id'] = $owner;

            if( $org_id ) {
                $act_data['org_id'] = $org_id;
            }

            if( $person_id ) {
                $act_data['person_id'] = $person_id;
            }

            if( $deal_id ) {
                $act_data['deal_id'] = $deal_id;
            }

            if( isset( $act_data['after_days'] ) && $act_data['after_days'] ) {
                $after_days = (int) $act_data['after_days'];

                if( $after_days ) {
                    $timezone             = wp_timezone();
                    $date                 = date_create( '+' . $after_days . ' days', $timezone );
                    $formatted_date       = date_format( $date, 'Y-m-d' );
                    $act_data['due_date'] = $formatted_date;

                    unset( $act_data['after_days'] );
                }
            }

            $act_data     = array_filter( array_map( 'trim', $act_data ) );
            $act_response = adfoin_pipedrive_request( 'activities', 'POST', $act_data, $record );
            $act_body     = json_decode( wp_remote_retrieve_body( $act_response ) );
        }
    }

    if( $task == 'add_lead' ) {

        $holder      = array();
        $org_data    = array();
        $person_data = array();
        $lead_data   = array();
        $note_data   = array();
        $lead_note   = '';

        foreach( $data as $key => $value ) {
            $holder[$key] = adfoin_get_parsed_values( $data[$key], $posted_data );
        }

        foreach( $holder as $key => $value ) {
            if( substr( $key, 0, 4 ) == 'org_' && $value ) {
                $key = substr( $key, 4 );

                $org_data[$key] = $value;
            }

            if( substr( $key, 0, 4 ) == 'per_' && $value ) {
                $key = substr( $key, 4 );

                $person_data[$key] = $value;
            }

            if( substr( $key, 0, 5 ) == 'lead_' && $value ) {
                $key = substr( $key, 5 );

                $lead_data[$key] = $value;
            }
        }

        if( $org_data['name'] ) {
            $org_data['owner_id'] = $owner;

            $org_data     = array_filter( array_map( 'trim', $org_data ) );
            $org_response = adfoin_pipedrive_request( 'organizations', 'POST', $org_data, $record );
            $org_body     = json_decode( wp_remote_retrieve_body( $org_response ) );

            if( $org_body->success == true ) {
                $org_id = $org_body->data->id;
            }
        }

        if( isset( $person_data['name'] ) && $person_data['name'] ) {
            $person_data['owner_id'] = $owner;

            if( $org_id ) {
                $person_data['org_id'] = $org_id;
            }

            $person_data     = array_filter( array_map( 'trim', $person_data ) );
            $person_response = adfoin_pipedrive_request( 'persons', 'POST', $person_data, $record );
            $person_body     = json_decode( wp_remote_retrieve_body( $person_response ) );

            if( $person_body->success == true ) {
                $person_id = $person_body->data->id;
            }
        }

        if( isset( $lead_data['title'] ) && $lead_data['title'] ) {
            $lead_data['owner_id'] = (int) $owner;

            if( $org_id ) {
                $lead_data['organization_id'] = $org_id;
            }

            if( $person_id ) {
                $lead_data['person_id'] = $person_id;
            }

            if( $lead_data['label_ids'] ) {
                $lead_data['label_ids'] = array_map( 'trim', explode( ',', $lead_data['label_ids'] ) );
            }

            if( $lead_data['value'] ) {
                $value = $lead_data['value'];
                $lead_data['value'] = array( 'amount' => (int) $lead_data['value'], 'currency' => $lead_data['currency'] );
            }

            if( $lead_data['note'] ) {
                $lead_note = $lead_data['note'];
            }

            unset( $lead_data['currency'] );
            unset( $lead_data['note'] );

            $lead_data     = array_filter( $lead_data );
            $lead_response = adfoin_pipedrive_request( 'leads', 'POST', $lead_data, $record );
            $lead_body     = json_decode( wp_remote_retrieve_body( $lead_response ) );

            if( $lead_body->success == true ) {
                $lead_id = $lead_body->data->id;
            }
        }

        if( $lead_id && $lead_note ) {
            $note_data['user_id'] = $owner;
            $note_data['content'] = $lead_note;
            $note_data['lead_id'] = $lead_id;

            if( $org_id ) {
                $note_data['org_id'] = $org_id;
            }

            if( $person_id ) {
                $note_data['person_id'] = $person_id;
            }

            if( $deal_id ) {
                $note_data['deal_id'] = $deal_id;
            }

            $note_data     = array_filter( array_map( 'trim', $note_data ) );
            $note_response = adfoin_pipedrive_request( 'notes', 'POST', $note_data, $record );
        }
    }

    return;
}