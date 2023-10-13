<?php 

$locations = [
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
			'value' => 'post',
		],
	]
];


//If stage pages are public, show banner options here too.
// if(get_field('stage_pages','option')) :

// 	$locations[] = [
// 		[
// 			'param' => 'post_type',
// 			'operator' => '==',
// 			'value' => 'stage',
// 		],
// 	];

// endif;

// //If performance pages are public, show banner options here too.
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
	'key' => 'group_5cf918e0a43c1',
	'title' => 'Banner',
	'fields' => [
		[
			'key' => 'field_5de1133f683bf',
			'label' => 'Banner Type',
			'name' => 'banner_type',
			'type' => 'select',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => 'plotAcfHalfWithoutFloat',
				'id' => '',
			],
			'hide_admin' => 0,
			'choices' => [
				'text' => 'Text only',
				'fullImageOrVideo' => 'Full width image or video',
				'imageOrVideoToTheSide' => 'Image or video to the side'
			],
			'default_value' => [
				0 => 'text',
			],
			'allow_null' => 0,
			'multiple' => 0,
			'ui' => 0,
			'return_format' => 'value',
			'ajax' => 0,
			'placeholder' => '',
		],
		[
			'key' => 'field_5e458c81306b6',
			'label' => 'Banner height',
			'name' => 'plotcms_banner_height',
			'type' => 'select',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5de1133f683bf',
						'operator' => '==',
						'value' => 'fullImageOrVideo',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => 'plotAcfHalfWithoutFloat',
				'id' => '',
			],
			'hide_admin' => 0,
			'choices' => [
				'normal' => 'Normal',
				'large' => 'Large',
			],
			'default_value' => [
				0 => 'normal',
			],
			'allow_null' => 0,
			'multiple' => 0,
			'ui' => 0,
			'return_format' => 'value',
			'ajax' => 0,
			'placeholder' => '',
		],
		[
			'key' => 'field_5e9af73a754af',
			'label' => 'Banner media type',
			'name' => 'banner_media_type',
			'type' => 'radio',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5de1133f683bf',
						'operator' => '==',
						'value' => 'fullImageOrVideo',
					],
				],
				[
					[
						'field' => 'field_5de1133f683bf',
						'operator' => '==',
						'value' => 'imageOrVideoToTheSide',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => 'plotAcfHalf',
				'id' => '',
			],
			'hide_admin' => 0,
			'choices' => [
				'image' => 'Image',
				'video' => 'Video',
			],
			'allow_null' => 0,
			'other_choice' => 0,
			'default_value' => 'fullWidth',
			'layout' => 'vertical',
			'return_format' => 'value',
			'save_other_choice' => 0,
		],
		[
			'key' => 'field_5e4d6877770be',
			'label' => 'Banner width',
			'name' => 'plotcms_banner_width',
			'type' => 'radio',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5de1133f683bf',
						'operator' => '==',
						'value' => 'fullImageOrVideo',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => 'plotAcfHalf',
				'id' => '',
			],
			'hide_admin' => 0,
			'choices' => [
				'fullWidth' => 'As wide as the screen allows',
				'maxWidth' => 'As wide as your site\'s maximum width',
			],
			'allow_null' => 0,
			'other_choice' => 0,
			'default_value' => 'fullWidth',
			'layout' => 'vertical',
			'return_format' => 'value',
			'save_other_choice' => 0,
		],
		[
			'key' => 'field_5cf918e0b0c15',
			'label' => 'Banner Image',
			'name' => 'banner_image',
			'type' => 'image',
			'instructions' => 'An image for your banner on large screens like desktops. Around 2,500px please.',
			'required' => 1,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5e9af73a754af',
						'operator' => '==',
						'value' => 'image',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => 'plotAcfHalf plotBlockLinkPreview--bannerImage plotAcfHalf--withClear',
				'id' => '',
			],
			'hide_admin' => 0,
			'return_format' => 'array',
			'preview_size' => 'medium',
			'library' => 'all',
			'min_width' => '',
			'min_height' => '',
			'min_size' => '',
			'max_width' => '',
			'max_height' => '',
			'max_size' => '',
			'mime_types' => '',
		],
		[
			'key' => 'field_5de112f0683bd',
			'label' => 'Small Screen Banner Image',
			'name' => 'small_screen_banner_image',
			'type' => 'image',
			'instructions' => 'An optional image for smaller screens like phones. Around 1,200px please.',
			'required' => 0,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5e9af73a754af',
						'operator' => '==',
						'value' => 'image',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => 'plotAcfHalf plotBlockLinkPreview plotBlockLinkPreview--bannerImage plotBlockLinkPreview--bannerImage--smallScreen',
				'id' => '',
			],
			'hide_admin' => 0,
			'return_format' => 'array',
			'preview_size' => 'banner--small-screen',
			'library' => 'all',
			'min_width' => '',
			'min_height' => '',
			'min_size' => '',
			'max_width' => '',
			'max_height' => '',
			'max_size' => '',
			'mime_types' => '',
		],
		[
			'key' => 'field_5cf918e0b0c2a',
			'label' => 'Banner Video',
			'name' => 'banner_video',
			'type' => 'file',
			'instructions' => '',
			'required' => 1,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5e9af73a754af',
						'operator' => '==',
						'value' => 'video',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'hide_admin' => 0,
			'return_format' => 'url',
			'library' => 'all',
			'min_size' => '',
			'max_size' => '',
			'mime_types' => '',
		],
		[
			'key' => 'field_5de11325683be',
			'label' => 'Small Screen Banner Video',
			'name' => 'small_screen_banner_video',
			'type' => 'file',
			'instructions' => 'An optional video to render for small screens. Can be 640px wide, smaller the better in file size to keep things great and fast to load. Otherwise it\'ll load the main video.',
			'required' => 0,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5e9af73a754af',
						'operator' => '==',
						'value' => 'video',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'hide_admin' => 0,
			'return_format' => 'url',
			'library' => 'all',
			'min_size' => '',
			'max_size' => '',
			'mime_types' => '',
		],
		[
			'key' => 'field_5e2199b8ab80a',
			'label' => 'Brightness',
			'name' => 'brightness',
			'type' => 'range',
			'instructions' => 'You can slide the brightness down if your image or video is too bright.',
			'required' => 1,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5de1133f683bf',
						'operator' => '==',
						'value' => 'fullImageOrVideo',
					],
				],
				[
					[
						'field' => 'field_5de1133f683bf',
						'operator' => '==',
						'value' => 'imageOrVideoToTheSide',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => 'plotBlockLinkSlider plotBlockLinkSlider--bannerImage',
				'id' => '',
			],
			'hide_admin' => 0,
			'default_value' => 100,
			'min' => '',
			'max' => '',
			'step' => '',
			'prepend' => '',
			'append' => '',
		],
		[
			'key' => 'field_5e9ae2758d562',
			'label' => 'Text horizontal alignment',
			'name' => 'plotcms_banner_text_horizontal_alignment',
			'type' => 'select',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5de1133f683bf',
						'operator' => '==',
						'value' => 'fullImageOrVideo',
					],
				],
				[
					[
						'field' => 'field_5de1133f683bf',
						'operator' => '==',
						'value' => 'text',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => 'plotAcfHalf',
				'id' => '',
			],
			'hide_admin' => 0,
			'choices' => [
				'left' => 'Left',
				'center' => 'Centre',
			],
			'default_value' => [
				0 => 'bottom',
			],
			'allow_null' => 0,
			'multiple' => 0,
			'ui' => 0,
			'return_format' => 'value',
			'ajax' => 0,
			'placeholder' => '',
		],
		[
			'key' => 'field_5e458c64306b5',
			'label' => 'Text vertical position',
			'name' => 'plotcms_banner_text_vertical_alignment',
			'type' => 'select',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5de1133f683bf',
						'operator' => '==',
						'value' => 'fullImageOrVideo',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => 'plotAcfHalf',
				'id' => '',
			],
			'hide_admin' => 0,
			'choices' => [
				'top' => 'Overlaid at the top',
				'middle' => 'Overlaid in the middle',
				'bottom' => 'Overlaid at the bottom',
				'above' => 'Above the image or video',
				'below' => 'Below the image or video',
			],
			'default_value' => [
				0 => 'bottom',
			],
			'allow_null' => 0,
			'multiple' => 0,
			'ui' => 0,
			'return_format' => 'value',
			'ajax' => 0,
			'placeholder' => '',
		],
		[
			'key' => 'field_5e949a47b3504',
			'label' => 'Custom Title?',
			'name' => 'use_custom_title',
			'type' => 'true_false',
			'instructions' => 'If you\'d like this banner to have a different title to that of the page title, you can tick this one.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => 'plotAcfHalf plotAcfHalf--withClear',
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
			'key' => 'field_5cf918e0b0b4b',
			'label' => 'Custom Title',
			'name' => 'banner_title',
			'type' => 'text',
			'instructions' => 'What\'s the title you\'d like to include here?',
			'required' => 1,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5e949a47b3504',
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
			'default_value' => '',
			'placeholder' => '',
			'prepend' => '',
			'append' => '',
			'maxlength' => '',
		],
		[
			'key' => 'field_5e45c04e64d7f',
			'label' => 'Banner subheading',
			'name' => 'plotcms_banner_subheading',
			'type' => 'text',
			'instructions' => 'Optional subheading to appear below the main heading',
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
			'maxlength' => '',
		],
		[
			'key' => 'field_5cf918e0b0bea',
			'label' => 'Link',
			'name' => 'banner_link',
			'type' => 'url',
			'instructions' => 'Do you want this banner to link somewhere? You can by pasting a url in here. If you don\'t want it to be a link, you can just leave this blank.',
			'required' => 0,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5de1133f683bf',
						'operator' => '!=',
						'value' => 'text',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'default_value' => '',
			'placeholder' => '',
		],
		[
			'key' => 'field_5de269b7179c8',
			'label' => 'Open link in new tab?',
			'name' => 'banner_link_open_in_new_tab',
			'type' => 'true_false',
			'instructions' => 'If you\'d like the banner link to open up in a new tab or window, check this box.',
			'required' => 0,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5cf918e0b0bea',
						'operator' => '!=empty',
					],
					[
						'field' => 'field_5de1133f683bf',
						'operator' => '!=',
						'value' => 'text',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'message' => '',
			'default_value' => 0,
			'ui' => 0,
			'ui_on_text' => '',
			'ui_off_text' => '',
		],
		[
			'key' => 'field_5e219d7aab80c',
			'label' => 'Show button?',
			'name' => 'show_button',
			'type' => 'true_false',
			'instructions' => 'If you\'d like to include a button on this banner, check this.',
			'required' => 0,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5de1133f683bf',
						'operator' => '!=',
						'value' => 'text',
					],
					[
						'field' => 'field_5cf918e0b0bea',
						'operator' => '!=empty',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'message' => '',
			'default_value' => 0,
			'ui' => 0,
			'ui_on_text' => '',
			'ui_off_text' => '',
		],
		[
			'key' => 'field_5e219daeab80d',
			'label' => 'Button Text',
			'name' => 'button_text',
			'type' => 'text',
			'instructions' => 'What text do you want to say on the button?',
			'required' => 1,
			'conditional_logic' => [
				[
					[
						'field' => 'field_5e219d7aab80c',
						'operator' => '==',
						'value' => '1',
					],
				],
			],
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'default_value' => '',
			'placeholder' => '',
			'prepend' => '',
			'append' => '',
			'maxlength' => '',
		],
	],
	'location' => $locations,
	'menu_order' => 7,
	'position' => 'acf_after_title',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => [
		0 => 'the_content',
		1 => 'excerpt',
		2 => 'discussion',
		3 => 'comments',
		4 => 'author',
		5 => 'format',
		6 => 'page_attributes',
		7 => 'featured_image',
		8 => 'categories',
		9 => 'tags',
		10 => 'send-trackbacks',
	],
	'active' => true,
	'description' => 'Options for text only, image or video banners.',
]);