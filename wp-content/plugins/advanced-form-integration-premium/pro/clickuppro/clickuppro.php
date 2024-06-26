<?php

add_filter( 'adfoin_action_providers', 'adfoin_clickuppro_actions', 10, 1 );

function adfoin_clickuppro_actions( $actions ) {

    $actions['clickuppro'] = array(
        'title' => __( 'Clickup [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'create_task' => __( 'Create Task', 'advanced-form-integration' )
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_clickuppro_action_fields' );

function adfoin_clickuppro_action_fields() {
    ?>

    <script type="text/template" id="clickuppro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'create_task'">
                <th scope="row">
                    <?php esc_attr_e( 'Task Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                    <div class="spinner" v-bind:class="{'is-active': fieldsLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>
            <tr class="alternate" v-if="action.task == 'create_task'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'Workspace', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[workspaceId]" v-model="fielddata.workspaceId" required="true" @change="getSpaces">
                        <option value=""><?php _e( 'Select...', 'advanced-form-integration' ); ?></option>
                        <option v-for="(item, index) in fielddata.workspaces" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': workspaceLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr class="alternate" v-if="action.task == 'create_task'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'Space', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[spaceId]" v-model="fielddata.spaceId" required="true" @change="getFolders">
                        <option value=""><?php _e( 'Select...', 'advanced-form-integration' ); ?></option>
                        <option v-for="(item, index) in fielddata.spaces" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': spaceLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr class="alternate" v-if="action.task == 'create_task'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'Folder', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[folderId]" v-model="fielddata.folderId" @change="getLists">
                        <option value=""><?php _e( 'Select...', 'advanced-form-integration' ); ?></option>
                        <option v-for="(item, index) in fielddata.folders" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': folderLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr class="alternate" v-if="action.task == 'create_task'">
                <td>
                    <label for="tablecell">
                        <?php esc_attr_e( 'List', 'advanced-form-integration' ); ?>
                    </label>
                </td>

                <td>
                    <select name="fieldData[listId]" v-model="fielddata.listId" @change="getCustomFields">
                        <option value=""><?php _e( 'Select...', 'advanced-form-integration' ); ?></option>
                        <option v-for="(item, index) in fielddata.lists" :value="index" > {{item}}  </option>
                    </select>
                    <div class="spinner" v-bind:class="{'is-active': listLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <editable-field v-for="field in fields" v-bind:key="field.value" v-bind:field="field" v-bind:trigger="trigger" v-bind:action="action" v-bind:fielddata="fielddata"></editable-field>            
        </table>
    </script>

    <?php
}

add_action( 'wp_ajax_adfoin_get_clickuppro_custom_fields', 'adfoin_get_clickuppro_custom_fields', 20, 0 );
/*
 * Get Clickup custom fields
 */
function adfoin_get_clickuppro_custom_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $list_id = $_POST['listId'] ? sanitize_text_field( $_POST['listId'] ) : '';
    $return  = adfoin_clickup_request( 'list/' . $list_id . '/field' );

    if( !is_wp_error( $return ) ) {
        $body          = json_decode( wp_remote_retrieve_body( $return ), true );
        $custom_fields = array();

        if( isset( $body['fields'] ) && is_array( $body['fields'] ) ) {
            foreach( $body['fields'] as $field ) {
                if( 'attachment' == $field['type'] ) {
                    continue;
                }
                        
                array_push( $custom_fields, array( 'key' => 'cf__' . $field['id'], 'value' => $field['name'], 'description' => '' ) );
            }
        }

        wp_send_json_success( $custom_fields );
    } else {
        wp_send_json_error();
    }
}

add_action( 'adfoin_clickuppro_job_queue', 'adfoin_clickuppro_job_queue', 10, 1 );

function adfoin_clickuppro_job_queue( $data ) {
    adfoin_clickuppro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to ClickUp API
 */
function adfoin_clickuppro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record['data'], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data         = $record_data['field_data'];
    $task         = $record['task'];
    $workspace_id = empty( $data['workspaceId'] ) ? '' : $data['workspaceId'];
    $space_id     = empty( $data['spaceId'] ) ? '' : $data['spaceId'];
    $folder_id    = empty( $data['folderId'] ) ? '' : $data['folderId'];
    $list_id      = empty( $data['listId'] ) ? '' : $data['listId'];
    $name         = empty( $data['name'] ) ? '' : adfoin_get_parsed_values( $data['name'], $posted_data );
    $description  = empty( $data['description'] ) ? '' : adfoin_get_parsed_values( $data['description'], $posted_data );
    $start_date   = empty( $data['startDate'] ) ? '' : adfoin_get_parsed_values( $data['startDate'], $posted_data );
    $due_date     = empty( $data['dueDate'] ) ? '' : adfoin_get_parsed_values( $data['dueDate'], $posted_data );
    $due_on_x     = empty( $data["dueOnX"] ) ? "" : adfoin_get_parsed_values( $data["dueOnX"], $posted_data );
    $priority_id  = empty( $data['priorityId'] ) ? '' : adfoin_get_parsed_values( $data['priorityId'], $posted_data );
    $assignees    = empty( $data['assignees'] ) ? '' : adfoin_get_parsed_values( $data['assignees'], $posted_data );
    $tags         = empty( $data['tags'] ) ? '' : adfoin_get_parsed_values( $data['tags'], $posted_data );
    $attachments  = empty( $data['attachments'] ) ? '' : adfoin_get_parsed_values( $data['attachments'], $posted_data );
 
    if( $task == 'create_task' ) {

        $task_data = array(
            'name'        => $name,
            'description' => $description,
        );

        if( $start_date ) {
            $timezone           = wp_timezone();
            $date               = date_create( $start_date, $timezone );
            $start_timestamp    = date_format( $date, "U" );
            $start_timestamp_ms = (int) $start_timestamp * 1000;

            if( $start_timestamp_ms ) {
                $task_data['start_date'] = $start_timestamp_ms;
            }
        }

        if( $due_date ) {
            $timezone         = wp_timezone();
            $date             = date_create( $due_date, $timezone );
            $due_timestamp    = date_format( $date, "U" );
            $due_timestamp_ms = (int) $due_timestamp * 1000;

            if( $due_timestamp_ms ) {
                $task_data['due_date'] = $due_timestamp_ms;
            }
        }

        if( isset( $due_on_x ) && $due_on_x ) {
            $after_days = (int) $due_on_x;

            if( $after_days ) {
                $timezone              = wp_timezone();
                $date                  = date_create( '+' . $after_days . ' days', $timezone );
                $formatted_date        = date_format( $date, "U" );
                $due_timestamp    = date_format( $date, "U" );
                $due_timestamp_ms = (int) $due_timestamp * 1000;
                if( $due_timestamp_ms ) {
                    $task_data['due_date'] = $due_timestamp_ms;
                }
            }
        }

        if( $priority_id ) {
            $task_data['priority'] = (int) $priority_id;
        }

        if( $assignees ) {
            $assignee_ids = adfoin_get_clickup_assignee_ids( $workspace_id, $assignees );

            if( $assignee_ids && is_array( $assignee_ids ) ) {
                $task_data['assignees'] = $assignee_ids;
            }
        }

        if( $tags ) {
            $tags = explode( ',', $tags );

            if( is_array( $tags ) ) {
                $task_data['tags'] = $tags;
            }
        }

        $custom_fields = array();
        $raw_custom_fields = array();
        $raw_fields   = array();

        foreach( $data as $key => $value ) {
            if( substr( $key, 0, 4 ) == 'cf__' && $value ) {
                $original_key = substr( $key, 4 );
                $parsed_value = adfoin_get_parsed_values( $value, $posted_data );

                if( $parsed_value ) {
                    $raw_custom_fields[$original_key] = $parsed_value;
                }
            }
        }

        if( $raw_custom_fields ) {
            $field_result = adfoin_clickup_request( 'list/' . $list_id . '/field' );
            $field_body = json_decode( wp_remote_retrieve_body( $field_result ), true );

            if( isset( $field_body['fields'] ) && is_array( $field_body['fields'] ) ) {
                $raw_fields = $field_body['fields'];
            }

            foreach( $raw_custom_fields as $key => $value ) {
                foreach( $raw_fields as $field ) {
                    if( $key == $field['id'] ) {
    
                        if( 'drop_down' == $field['type'] ) {
                            if( isset( $field['type_config'], $field['type_config']['options'] ) ) {
                                foreach( $field['type_config']['options'] as $option ) {
                                    if( $value == $option['name'] ) {
                                        $value = $option['id'];
                                    }
                                }
                            }
                        }
    
                        if( 'labels' == $field['type'] ) {
                            if( isset( $field['type_config'] ) && isset( $field['type_config']['options'] ) ) {
    
                                $values           = explode( ',', $value );
                                $new_parsed_value = array();
    
                                foreach( $field['type_config']['options'] as $option ) {
                                    foreach( $values as $single_value ) {
                                        if( $single_value == $option['label'] ) {
                                            array_push( $new_parsed_value, $option['id'] );
                                        }
                                    }
                                    
                                    $value = $new_parsed_value;
                                }
                            }
                        }
    
                        if( 'date' == $field['type'] ) {
                            $timezone           = wp_timezone();
                            $date               = date_create( $value, $timezone );
                            if( $date ) {
                                $df       = date_format( $date, "U" );
                                $value_ms    = (int) $df * 1000;
                                $value       = $value_ms;
                            }
                        }
                    }
                }

                if( $value ) {
                    array_push( $custom_fields, array( 'id' => $key, 'value' => $value ) );
                }
            } 
        }

        if( $custom_fields ) {
            $task_data['custom_fields'] = $custom_fields;
        }

        $response = adfoin_clickup_request( 'list/' . $list_id . '/task', 'POST', $task_data, $record );
        $task_id  = '';

        if( $attachments ) {
            if( !is_wp_error( $response ) ) {
                $body = json_decode( wp_remote_retrieve_body( $response ), true );

                if( isset( $body['id'] ) ) {
                    $task_id = $body['id'];
                }

                $attachments = explode( ',', $attachments );

                if( is_array( $attachments ) ) {
                    foreach( $attachments as $attachment ) {
                        adfoin_clickuppro_file_upload( $task_id, trim( $attachment ) );
                    }
                }
            }
        }
    }

    return;
}


function adfoin_clickuppro_file_upload( $task_id, $file ) {

    $api_token = get_option( 'adfoin_clickup_api_token' );

    $curl = curl_init();

    $payload = array(
        "attachment" => new CURLFile( $file )
    );

    curl_setopt_array( $curl, [
        CURLOPT_HTTPHEADER => [
            "Authorization: " . $api_token,
            "Content-Type: multipart/form-data"
        ],
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_URL => "https://api.clickup.com/api/v2/task/" . $task_id . "/attachment",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => "POST",
    ] );

    $response = curl_exec($curl);
    $error = curl_error($curl);

    curl_close($curl);

    return;
}