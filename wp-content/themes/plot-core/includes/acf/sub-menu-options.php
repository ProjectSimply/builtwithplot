<?php 

$locations = [
	[
		[
			'param' => 'post_type',
			'operator' => '==',
			'value' => 'page',
		],
		[
			'param' => 'page',
			'operator' => '!=',
			'value' => '2',
		],
	]
];

//If stage pages are public, show options here too.
// if(get_field('stage_pages','option')) :

// 	$locations[] = [
// 		[
// 			'param' => 'post_type',
// 			'operator' => '==',
// 			'value' => 'stage',
// 		],
// 	];

// endif;

// //If performance pages are public, show options here too.
// if(get_field('performance_pages','option')) :

// 	$locations[] = [
// 		[
// 			'param' => 'post_type',
// 			'operator' => '==',
// 			'value' => 'performance',
// 		],
// 	];

// endif;

acf_add_local_field_group([
	'key' => 'group_5e94376b5c2d7',
	'title' => 'Sub Menu Options',
	'fields' => [
		[
			'key' => 'field_5e943774c2dfa',
			'label' => 'Include a sub menu',
			'name' => 'include_a_sub_menu',
			'type' => 'true_false',
			'instructions' => 'If you would like a sub menu to appear below the banner, please pick this option.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'hide_admin' => 0,
			'message' => '',
			'default_value' => 0,
			'ui' => 0,
			'ui_on_text' => '',
			'ui_off_text' => '',
		],
		[
			'key' => 'field_5e943791c2dfb',
			'label' => 'Sub Menu',
			'name' => 'sub_menu',
			'type' => 'post_object',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5e943774c2dfa',
						'operator' => '==',
						'value' => '1',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => 'plotAcfHalf',
				'id' => '',
			],
			'hide_admin' => 0,
			'post_type' => [
				0 => 'sub-menu',
			],
			'taxonomy' => '',
			'allow_null' => 0,
			'multiple' => 0,
			'return_format' => 'id',
			'ui' => 1,
		],
	],
	'location' => $locations,
	'menu_order' => 9,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => true,
	'description' => '',
]);