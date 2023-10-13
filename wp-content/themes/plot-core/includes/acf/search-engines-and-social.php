<?php 


$locations = [
		[
			[
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'post',
			],
		],
		[
			[
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'page',
			],
		],
		[
			[
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'artist',
			],
		],
		[
			[
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'holding-page',
			]
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
	'key' => 'group_5e81bb5a18fe0',
	'title' => 'Search Engines & Social',
	'fields' => [
		[
			'key' => 'field_5e81bb680e359',
			'label' => 'Page Title',
			'name' => 'page_title',
			'type' => 'text',
			'instructions' => 'How do you want your page title to display on social shares, and on search engine results pages? If you leave this blank, it will default to the page title and the name of your event.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'default_value' => '',
			'placeholder' => '',
			'prepend' => '',
			'append' => '',
			'maxlength' => 60,
		],
		[
			'key' => 'field_5e81bbca0e35f',
			'label' => 'Page Description',
			'name' => 'page_description',
			'type' => 'textarea',
			'instructions' => 'A short description of your page, that shows up on Search Engine results pages and on social media shares. You can leave blank and your search engine will make a best guess, based on the content of the site.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'default_value' => '',
			'placeholder' => '',
			'maxlength' => 160,
			'rows' => '',
			'new_lines' => '',
		],
		[
			'key' => 'field_5e81bc260e360',
			'label' => 'Social Share Image',
			'name' => 'social_share_image',
			'type' => 'image',
			'instructions' => 'Pick an image to use when this image is shared on social media. Make sure it\'s at least 2,000 pixels wide, the system will resize it accordingly. 
If you leave it blank, your social media site will best guess an image from the page.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'return_format' => 'array',
			'preview_size' => 'thumbnail',
			'library' => 'all',
			'min_width' => '',
			'min_height' => '',
			'min_size' => '',
			'max_width' => '',
			'max_height' => '',
			'max_size' => '',
			'mime_types' => '',
		],
	],
	'location' => $locations,
	'menu_order' => 32,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => true,
	'description' => '',
]);