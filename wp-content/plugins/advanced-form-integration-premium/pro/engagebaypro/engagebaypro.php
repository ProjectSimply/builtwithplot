<?php

add_filter( 'adfoin_action_providers', 'adfoin_engagebaypro_actions', 10, 1 );

function adfoin_engagebaypro_actions( $actions ) {

    $actions['engagebaypro'] = array(
        'title' => __( 'EngageBay [PRO]', 'advanced-form-integration' ),
        'tasks' => array(
            'subscribe'   => __( 'Create New Contact', 'advanced-form-integration' ),
        )
    );

    return $actions;
}

add_action( 'adfoin_action_fields', 'adfoin_engagebaypro_action_fields' );

function adfoin_engagebaypro_action_fields() {
    ?>
    <script type="text/template" id="engagebaypro-action-template">
        <table class="form-table">
            <tr valign="top" v-if="action.task == 'subscribe'">
                <th scope="row">
                    <?php esc_attr_e( 'Map Fields', 'advanced-form-integration' ); ?>
                </th>
                <td scope="row">
                <div class="spinner" v-bind:class="{'is-active': fieldLoading}" style="float:none;width:auto;height:auto;padding:10px 0 10px 50px;background-position:20px 0;"></div>
                </td>
            </tr>

            <tr valign="top" class="alternate" v-if="action.task == 'subscribe'">
                <td scope="row-title">
                    <label for="tablecell">
                        <?php esc_attr_e( 'EngageBay List', 'advanced-form-integration' ); ?>
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

add_action( 'wp_ajax_adfoin_get_engagebay_fields', 'adfoin_get_engagebay_fields', 10, 0 );
/*
 * Get EngageBay Fields
 */
function adfoin_get_engagebay_fields() {
    // Security Check
    if (! wp_verify_nonce( $_POST['_nonce'], 'advanced-form-integration' ) ) {
        die( __( 'Security check Failed', 'advanced-form-integration' ) );
    }

    $data = adfoin_engagebay_request( 'panel/customfields/list/CONTACT' );

    if( is_wp_error( $data ) ) {
        wp_send_json_error();
    }

    $body   = json_decode( wp_remote_retrieve_body( $data ), true );
    $fields = array();

    if( is_array( $body ) && count( $body ) > 0 ) {
        foreach( $body as $field ) {
            array_push( $fields, array( 'key' => 'custom__' . $field['field_name'], 'value' => $field['field_label'] ) );
        }
        
    }

    wp_send_json_success( $fields );
}

add_action( 'adfoin_engagebaypro_job_queue', 'adfoin_engagebaypro_job_queue', 10, 1 );

function adfoin_engagebaypro_job_queue( $data ) {
    adfoin_engagebaypro_send_data( $data['record'], $data['posted_data'] );
}

/*
 * Handles sending data to EngageBay API
 */
function adfoin_engagebaypro_send_data( $record, $posted_data ) {

    $record_data = json_decode( $record["data"], true );

    if( array_key_exists( 'cl', $record_data['action_data'] ) ) {
        if( $record_data['action_data']['cl']['active'] == 'yes' ) {
            if( !adfoin_match_conditional_logic( $record_data['action_data']['cl'], $posted_data ) ) {
                return;
            }
        }
    }

    $data    = $record_data['field_data'];
    $task    = $record['task'];
    $list_id = $data['listId'];

    if( $task == 'subscribe' ) {
        
        $email      = empty( $data['email'] ) ? '' : trim( adfoin_get_parsed_values( $data['email'], $posted_data ) );
        $first_name = empty( $data['firstName'] ) ? '' : adfoin_get_parsed_values( $data['firstName'], $posted_data );
        $last_name  = empty( $data['lastName'] ) ? '' : adfoin_get_parsed_values( $data['lastName'], $posted_data );
        $phone      = empty( $data['phone'] ) ? '' : adfoin_get_parsed_values( $data['phone'], $posted_data );
        $role       = empty( $data['role'] ) ? '' : adfoin_get_parsed_values( $data['role'], $posted_data );
        $website    = empty( $data['website'] ) ? '' : adfoin_get_parsed_values( $data['website'], $posted_data );
        $address    = empty( $data['address'] ) ? '' : adfoin_get_parsed_values( $data['address'], $posted_data );
        $city       = empty( $data['city'] ) ? '' : adfoin_get_parsed_values( $data['city'], $posted_data );
        $state      = empty( $data['state'] ) ? '' : adfoin_get_parsed_values( $data['state'], $posted_data );
        $zip        = empty( $data['zip'] ) ? '' : adfoin_get_parsed_values( $data['zip'], $posted_data );
        $country    = empty( $data['country'] ) ? '' : adfoin_get_parsed_values( $data['country'], $posted_data );
        $company    = empty( $data['company'] ) ? '' : adfoin_get_parsed_values( $data['company'], $posted_data );
        $tags       = empty( $data['tags'] ) ? '' : $data['tags'];
        $company_id = '';

        if( $company ) {
            $is_company = adfoin_engagebay_maybe_record_exists( $company, 'Company' );
            $company_id = $is_company['id'];

            if( !$company_id ) {
                $company_id = adfoin_engagebay_create_company( $company, $record );
            }
        }

        $is_contact = adfoin_engagebay_maybe_record_exists( $email, 'Subscriber' );
        $contact_id = $is_contact['id'];

        $contact_data = array(
            'properties' => array()
        );

        if( !$contact_id ) {
            array_push( $contact_data['properties'], array( 'name' => 'email', 'value' => $email ) );
        }

        if( $first_name ) {
            array_push( $contact_data['properties'], array( 'name' => 'name', 'value' => $first_name ) );
        }

        if( $last_name ) {
            array_push( $contact_data['properties'], array( 'name' => 'last_name', 'value' => $last_name ) );
        }

        if( $phone ) {
            array_push( $contact_data['properties'], array( 'name' => 'phone', 'value' => $phone ) );
        }

        if( $role ) {
            array_push( $contact_data['properties'], array( 'name' => 'role', 'value' => $role ) );
        }

        if( $website ) {
            array_push( $contact_data['properties'], array( 'name' => 'website', 'value' => $website ) );
        }

        if( $country ) {
            array_push( $contact_data['properties'], array( 'name' => 'country', 'value' => $country ) );
        }

        if( $address || $city || $zip || $state || $country ) {
            if( isset( $is_contact['body']['properties'] ) ) {
                $old_address_data = array();
                foreach( $is_contact['body']['properties'] as $property ) {
                    if( $property['name'] == 'address' ) {
                        $old_address_data = json_decode( $property['value'], true );
                    }
                }
            }
            $address_data = array();

            if( $old_address_data ) {
                $address_data = $old_address_data;
            }

            if( $address ) { $address_data['address'] = $address; }
            if( $city ) { $address_data['city'] = $city; }
            if( $zip ) { $address_data['zip'] = $zip; }
            if( $state ) { $address_data['state'] = $state; }
            if( $country ) { $address_data['country'] = $country; }

            array_push( $contact_data['properties'], array( 'name' => 'address', 'value' => json_encode( $address_data ) ) );
        }

        foreach( $data as $key => $value ) {
            if( substr( $key, 0, 8 ) == 'custom__' && $value ) {
                $original_key = substr( $key, 8 );
                $parsed_value = adfoin_get_parsed_values( $value, $posted_data );
                if( $parsed_value ) {
                    array_push( $contact_data['properties'], array( 'name' => $original_key, 'value' => $parsed_value ) );
                }
            }
        }

        if( $company_id ) {
            $contact_data['companyIds'] = array( $company_id );
        }

        if( $list_id ) {
            $contact_data['listIds'] = array( $list_id );
        }

        if( $tags ) {
            $splitted    = explode( ',', $tags );
            $parsed_tags = array();

            if( is_array( $splitted ) ) {
                foreach( $splitted as $tag ) {
                    if( $tag ) {
                        $parsed_tag    = adfoin_get_parsed_values( $tag, $posted_data );
                        $parsed_tags[] = $parsed_tag;
                        $tag_body      = json_encode(
                            array(
                                'tag' => trim( $parsed_tag )
                            )
                        );
                        
                        adfoin_engagebay_request( 'panel/tags', 'POST', $tag_body, $record );
                    }
                }
            }
            $contact_data['tags'] = $parsed_tags;
        }

        if( $contact_id ) {
            $contact_data['id'] = $contact_id;
            $return = adfoin_engagebay_request( 'panel/subscribers/update-partial', 'PUT', $contact_data, $record );
        } else {
            $return = adfoin_engagebay_request( 'panel/subscribers/subscriber', 'POST', $contact_data, $record );
        }
    }

    return;
}