<?php 

acf_add_local_field_group([
	'key' => 'group_5e9436515129a',
	'title' => 'Sub Menu',
	'fields' => [
		[
			'key' => 'field_5e943659c3359',
			'label' => 'Menu Items',
			'name' => 'menu_items',
			'type' => 'repeater',
			'instructions' => 'Add up to 8 submenu items. They will show directly below the banner of your selected pages. You can add sub menus to your pages on your page edit screens.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => [
				'width' => '',
				'class' => '',
				'id' => '',
			],
			'hide_admin' => 0,
			'collapsed' => '',
			'min' => 1,
			'max' => 8,
			'layout' => 'table',
			'button_label' => 'Add Menu Item',
			'sub_fields' => [
				[
					'key' => 'field_5e94368bc335a',
					'label' => 'Menu Item',
					'name' => 'menu_item',
					'type' => 'post_object',
					'instructions' => '',
					'required' => 1,
					'conditional_logic' => 0,
					'wrapper' => [
						'width' => '',
						'class' => '',
						'id' => '',
					],
					'hide_admin' => 0,
					'post_type' => [
						0 => 'page',
					],
					'taxonomy' => '',
					'allow_null' => 0,
					'multiple' => 0,
					'return_format' => 'object',
					'ui' => 1,
				],
			],
		],
	],
	'location' => [
		[
			[
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'sub-menu',
			],
		],
	],
	'menu_order' => 8,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => [
		0 => 'permalink',
		1 => 'the_content',
		2 => 'excerpt',
		3 => 'discussion',
		4 => 'comments',
		5 => 'revisions',
		6 => 'slug',
		7 => 'author',
		8 => 'format',
		9 => 'page_attributes',
		10 => 'featured_image',
		11 => 'categories',
		12 => 'tags',
		13 => 'send-trackbacks',
	],
	'active' => true,
	'description' => '',
]);