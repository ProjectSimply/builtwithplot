<?php 

//Use this for cache busting on deployments. Incrementing by 1, will add this as a query string on JS and CSS. 
define('SITE_VERSION', 1.08); 

define('ARTISTS_PER_PAGE', 12); 
define('PERFORMANCES_PER_PAGE', 24); 

define('NEWS_PER_PAGE', 12); 

define('DATE_FORMAT','D jS M');

define('SITEBUILDER',true);

define('AUTO_DOMAINS',false);

define("CLOUDWAYS_APP_ID", '');
define("HOLDING_DOMAIN", '');

function plotInit() {

	require_once get_theme_file_path( 'includes/plot-site.php' );

	//All our initialisation settings go here. Set this up according to your current project.
	new PlotSite([
		'imageSizes'	=> [
						'banner' => [
								'desktop' => [
										'width' 		=> 2600,
										'height'		=> 1500,
										'cropToSize'	=> true
										],
								'smallScreen' => [ //Will make an image size called banner--small-screen.
										'width'			=> 1080,
										'height'		=> 1900,
										'cropToSize'	=> true
									]
							],
						'fiftyFifty' => [
								'desktop' => [
										'width' 		=> 1200,
										'height'		=> 1200,
										'cropToSize'	=> false
										]
							],
						'carouselImage'	=> [
								'desktop' => [
										'width' 		=> 1700,
										'height'		=> 1200,
										'cropToSize'	=> false
								],
								'smallScreen' => [ //Will make an image size called imageGrid--small-screen.
									'width'			=> 500,
									'height'		=> 350,
									'cropToSize'	=> false
								]
							],
						'galleryLandscape'	=> [
								'desktop' => [
										'width' 		=> 800,
										'height'		=> 550,
										'cropToSize'	=> false
										]
							],
						'galleryPortrait'	=> [
							'desktop' => [
									'width' 		=> 400,
									'height'		=> 700,
									'cropToSize'	=> false
									]
						],
						'blockLink'	=> [
							'desktop' => [
									'width' 		=> 1200,
									'height'		=> 1000,
									'cropToSize'	=> true
									]
						],
					'imageGrid'	=> [
							'desktop' => [
									'width' 		=> 1300,
									'height'		=> 1300,
									'cropToSize'	=> true
									]
						],
					'small'	=> [
							'desktop' => [
									'width' 		=> 300,
									'height'		=> 300,
									'cropToSize'	=> false
									]
						],
			],

		'postTypes'		=> [
						'FAQ' => [ 
								'slug' 	=> 'faq',
						 		'args' 	=> ['public'	=> false]
						 		],
						'Artist' => [
								'slug' 	=> 'artist'
								],
						'Stage' => [
								'slug' 	=> 'stage'
								],
						'Performance' => [
								'slug' 	=> 'performance',
								'args' 	=> ['public'	=> false]
								],
						'Partner' => [
								'slug' 	=> 'partner',
								'args' 	=> ['public'	=> false]
								],
						'Notification' => [
								'slug' => 'notification',
								'args' => ['public'		=> false]
								],
						'Holding Page' => [
								'slug' 	=> 'holding-page',
								'args'  => ['show_in_nav_menus' => false]
								]
					],
		'taxonomies'	=> [
						'Artist Type'   => 'artist', //Mapped for taxonomy name, to custom post type associated.
						'FAQ Type'		=> 'faq' 
							],
		'ajaxActions' 	=> [
						'exampleAjaxAction' => 'examplePHPFunction', //Here we map the JS 'action' post data through to which PHP function we want this to route to.
							],
		'excerptLength' => 20,
		'excerptText'   => '...'

	]);

}

add_action( 'after_setup_theme', 'plotInit' );