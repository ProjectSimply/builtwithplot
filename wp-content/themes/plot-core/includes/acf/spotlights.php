<?php


acf_add_local_field_group([
	'key' => 'group_spotlights_countdown',
	'title' => 'Countdown',
	'fields' => [
		[
			'key' => 'field_spotlights_countdown_type',
			'label' => 'Countdown Type',
			'name' => 'countdown_type',
			'type' => 'radio',
            'choices' => [
                'periodic' => 'Periodic',
                'custom'   => 'Custom'
            ]
		],
        [
            'key' => "field_spotlights_countdown_type_periodic_start_date",
            'name' => "periodic_start_date",
            'label' => "Periodic Start Date",
            'display_format' => 'd/m/Y H:i',
	        'return_format' => 'Y-m-d H:i:s',
            'required' => 1,
            'type' => "date_time_picker",
            'conditional_logic' => [
                [
                    [
                        'field' => "field_spotlights_countdown_type",
                        'operator' => "==",
                        'value' => "periodic",
                    ]
                ]
            ],
        ],
        [
            'key' => "field_spotlights_countdown_custom_date",
            'name' => "custom_date",
            'label' => "Custom Date",
            'display_format' => 'd/m/Y H:i',
	        'return_format' => 'Y-m-d H:i:s',
            'required' => 1,
            'type' => "date_time_picker",
            'conditional_logic' => [
                [
                    [
                        'field' => "field_spotlights_countdown_type",
                        'operator' => "==",
                        'value' => "custom",
                    ]
                ]
            ],
        ],
        [
            'key' => "field_spotlights_countdown_type_periodic_frequency",
            'name' => "periodic_frequency",
            'label' => "Periodic Frequency",
            'required' => 1,
            'type' => "select",
            'choices' => [
                'monthly' => 'Monthly', 
                'every-other-month' => 'Every other month',
                'every-three-months' => 'Every three months' 
            ],
            'conditional_logic' => [
                [
                    [
                        'field' => "field_spotlights_countdown_type",
                        'operator' => "==",
                        'value' => "periodic",
                    ]
                ]
            ],
        ],
        [
            'key' => "field_spotlights_countdown_periodic_add_end_date",
            'name' => "periodic_add_end_date",
            'label' => "Add an end date for your periodic countdown timer?",
            'instructions'  => "Without an end date, the timer will continue repeating each period indefinitely",
            'type' => "true_false",
            'conditional_logic' => [
                [
                    [
                        'field' => "field_spotlights_countdown_type",
                        'operator' => "==",
                        'value' => "periodic",
                    ]
                ]
            ],
        ],
        [
            'key' => "field_spotlights_countdown_type_periodic_end_date",
            'name' => "periodic_end_date",
            'label' => "Periodic End Date",
            'display_format' => 'd/m/Y H:i',
	        'return_format' => 'Y-m-d H:i:s',
            'type' => "date_time_picker",
            'required' => 1,
            'conditional_logic' => [
                [
                    [
                        'field' => "field_spotlights_countdown_type",
                        'operator' => "==",
                        'value' => "periodic",
                    ],
                    [
                        'field' => "field_spotlights_countdown_periodic_add_end_date",
                        'operator' => "==",
                        'value' => "1",
                    ]
                ]
            ],
        ],
	],
	'location' => [
		[
			[
				'param' => 'page',
				'operator' => '==',
				'value' => '2961',
			],
		],
	],
	'menu_order' => 23,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => true,
	'description' => 'Features for the main News listing page',
]);
