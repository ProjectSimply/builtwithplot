<?php

add_filter( 'adfoin_action_providers', 'adfoin_asanapro_actions', 10, 1 );

function adfoin_asanapro_actions( $actions ) {

    $actions['asanapro'] = array(
        'title' => __( 'Asana [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'create_task' => __( 'Create Task', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_asanapro_action_fields' );

function adfoin_asanapro_action_fields() {
    ?>

    <script type="text/template" id="asanapro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'create_task'">
                <th scope="row">
                    <?php esc_attr_e( 'Task Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                    <div class="spinner" v-bind:class="{'is-active': customFieldsLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>
            <tr class="alternate" v-if="action.task == 'create_task'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'Workspace', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[workspaceId]" v-model="fielddata.workspaceId" required="true" @change="getProjects">
                        <option value=""><?php _e( 'Select...', 'advanced-form-integration' ); ?></option>
                        <option v-for="(item, index) in fielddata.workspaces" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': workspaceLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr class="alternate" v-if="action.task == 'create_task'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'Project', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[projectId]" v-model="fielddata.projectId" required="true" @change="getSections">
                        <option value=""><?php _e( 'Select...', 'advanced-form-integration' ); ?></option>
                        <option v-for="(item, index) in fielddata.projects" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': projectLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr class="alternate" v-if="action.task == 'create_task'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'Section', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[sectionId]" v-model="fielddata.sectionId">
                        <option value=""><?php _e( 'Select...', 'advanced-form-integration' ); ?></option>
                        <option v-for="(item, index) in fielddata.sections" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': sectionLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr class="alternate" v-if="action.task == 'create_task'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'Assignee', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[userId]" v-model="fielddata.userId">
                        <option value=""><?php _e( 'Select...', 'advanced-form-integration' ); ?></option>
                        <option v-for="(item, index) in fielddata.users" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': userLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>            
        </table>
    </script>

    <?php
}

function adfoin_get_asanapro_custom_fields_array( $project_id ) {
    $response = adfoin_asana_request( "projects/{$project_id}/custom_field_settings" );

    if( !is_wp_error( $response ) ) {
        $body          = json_decode( wp_remote_retrieve_body( $response ), true );
        $custom_fields = array();

        if( isset( $body['data'] ) && is_array( $body['data'] ) ) {
            $custom_fields = $body['data'];
        }

        return $custom_fields;
    }

    return array();
}

add_action( 'wp_ajax_adfoin_get_asanapro_custom_fields', 'adfoin_get_asanapro_custom_fields', 20, 0 );
/*
 * Get Asana Custom Fields
 */
function adfoin_get_asanapro_custom_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $project_id    = $_POST['projectId'] ? sanitize_text_field( $_POST['projectId'] ) : '';
    $custom_field_array = adfoin_get_asanapro_custom_fields_array( $project_id );
    // $response = adfoin_asana_request( "projects/{$project_id}/custom_field_settings" );
    $custom_fields = array();
    
    // if( !is_wp_error( $response ) ) {
    //     $body          = json_decode( wp_remote_retrieve_body( $response ), true );
        

        // if( isset( $body['data'] ) && is_array( $body['data'] ) ) {
            foreach( $custom_field_array as $field ) {
                $description = '';
                // if( 'enum' == $field['custom_field']['type'] ) {
                //     $enum_options = array();
                //     foreach( $field['custom_field']['enum_options'] as $option ) {
                //         $enum_options[] = "{$option['gid']}: {$option['name']}";
                //     }

                //     $description = "Add the ID. Possible values are: " . implode( ', ', $enum_options );
                //     array_push( $custom_fields, array( 'key' => 'custom__' . $field['custom_field']['type'] . '__' . $field['custom_field']['gid'], 'value' => $field['custom_field']['name'], 'description' => $description ) );

                //     continue;
                // }

                if( 'date' == $field['custom_field']['type'] ) {
                    $description = "Use YYYY-MM-DD format";
                }

                array_push( $custom_fields, array( 'key' => 'custom__' . $field['custom_field']['type'] . '__' . $field['custom_field']['gid'], 'value' => $field['custom_field']['name'], 'description' => $description ) );
            }
        // }

        wp_send_json_success( $custom_fields );
    // } else {
    //     wp_send_json_error();
    // }
}

add_action( 'adfoin_asanapro_job_queue', 'adfoin_asanapro_job_queue', 10, 1 );

function adfoin_asanapro_job_queue( $data ) {
    adfoin_asanapro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to Asana API
 */
function adfoin_asanapro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record["data"], true );

    if( array_key_exists( "cl", $record_data["action_data"] ) ) {
        if( $record_data["action_data"]["cl"]["active"] == "yes" ) {
            if( !adfoin_match_conditional_logic( $record_data["action_data"]["cl"], $posted_data ) ) {
                return;
            }
        }
    }

    $data         = $record_data["field_data"];
    $task         = $record["task"];
    $workspace_id = empty( $data["workspaceId"] ) ? "" : $data["workspaceId"];
    $project_id   = empty( $data["projectId"] ) ? "" : $data["projectId"];
    $section_id   = empty( $data["sectionId"] ) ? "" : $data["sectionId"];
    $user_id      = empty( $data["userId"] ) ? "" : $data["userId"];
    $name         = empty( $data["name"] ) ? "" : adfoin_get_parsed_values( $data["name"], $posted_data );
    $notes        = empty( $data["notes"] ) ? "" : adfoin_get_parsed_values( $data["notes"], $posted_data );
    $due_on       = empty( $data["dueOn"] ) ? "" : adfoin_get_parsed_values( $data["dueOn"], $posted_data );
    $due_on_x     = empty( $data["dueOnX"] ) ? "" : adfoin_get_parsed_values( $data["dueOnX"], $posted_data );

    if( $task == 'create_task' ) {

        $body = array(
            'data' => array(
                    'workspace' => $workspace_id,
                    'projects'  => array( $project_id ),
                    'name'      => $name,
                    'notes'     => $notes,
                    'due_on'    => $due_on
            )
        );

        if( isset( $due_on_x ) && $due_on_x ) {
            $after_days = (int) $due_on_x;

            if( $after_days ) {
                $timezone             = wp_timezone();
                $date                 = date_create( '+' . $after_days . ' days', $timezone );
                $formatted_date       = date_format( $date, 'Y-m-d' );
                $body['data']['due_on'] = $formatted_date;
            }
        }

        if( $user_id ) {
            $body['data']['assignee'] = $user_id;
        }

        $custom_fields = array();
        $custom_fields_array = adfoin_get_asanapro_custom_fields_array( $project_id );


        foreach( $data as $key => $value ) {
            if( substr( $key, 0, 8 ) == 'custom__' && $value ) {
                list( $cs, $data_type, $field_id ) = explode( '__', $key );

                if( 'date' == $data_type ) {
                    $date_value = adfoin_get_parsed_values( $value, $posted_data );

                    if( isset( $date_value ) && $date_value ) {
                        $formatted_date = date( 'Y-m-d', strtotime( $date_value ) );
                    }

                    if( $formatted_date  ) {
                        $date_array = array( 'date' => $formatted_date );
                        $custom_fields[$field_id] = $date_array;
                    }

                    continue;
                }

                if( 'enum' == $data_type ) {
                    $value = adfoin_get_parsed_values( $value, $posted_data );
                    
                    foreach( $custom_fields_array as $field ) {
                        if( $field['custom_field']['gid'] == $field_id ) {
                            foreach( $field['custom_field']['enum_options'] as $option ) {
                                if( $option['name'] == $value ) {
                                    $value = $option['gid'];
                                    break;
                                }
                            }
                        }
                    }

                    if( $value) {
                        $custom_fields[$field_id] = $value;
                    }

                    continue;
                }

                $parsed_value = adfoin_get_parsed_values( $value, $posted_data );

                if( $parsed_value ) {
                    $custom_fields[$field_id] = $parsed_value;
                }
            }
        }

        if( $custom_fields ) {
            $body['data']['custom_fields'] = $custom_fields;
        }
        
        $body['data'] = array_filter( $body['data'] );
        $response     = adfoin_asana_request( 'tasks', 'POST', $body, $record );
        $task_id      = '';

        if( $section_id ) {
            if( '201' == wp_remote_retrieve_response_code( $response ) ) {
                $body    = json_decode( wp_remote_retrieve_body( $response ) );
                $task_id = $body->data->gid;
    
                $body = array(
                    'data' => array(
                        'task' => $task_id
                    )
                );
        
                $response = adfoin_asana_request( "sections/{$section_id}/addTask", 'POST', $body, $record );                
            }
        }
    }

    return;
}