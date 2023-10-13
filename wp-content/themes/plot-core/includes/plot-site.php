<?php

/**
 * Plot setup
 */

// Initialise our PlotSite with settings passed. 
class PlotSite
{

  private $ajaxActions = [];
  private $templates = [];

    public function __construct($settings = [])
    {

      $defaults = [
        'ajaxActions'   => [],
        'excerptText'   => '...',
        'excerptLength' => 20,
        'imageSizes'    => [],
        'postTypes'     => [],
        'taxonomies'    => [],
        'templates'     => []

      ];

      $options = [];

      foreach($defaults as $item => $default) :

        if(isset($settings[$item])) :

          $options[$item] = $settings[$item];

        else :

          $options[$item] = $default;
        
        endif;

      endforeach;

      //remove emoji support
      remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
      remove_action( 'wp_print_styles', 'print_emoji_styles' ); 

      add_filter('excerpt_more', [$this,'new_excerpt_more']);

      $this->ajaxRouting($options['ajaxActions']);
      $this->imageSizes($options['imageSizes']);
      $this->customPostTypes($options['postTypes']);
      $this->customTaxonomies($options['taxonomies']);


      add_action( 'template_redirect', [$this,'plotRedirectToHomePageIfSiteHidden'] );

      add_action('init', [$this,'plotUnregisterTags']);
      add_action('init', [$this,'plotChangeSiteUrlInDB']);

      add_filter( 'document_title_parts', [$this,'maybeChangeTitle'], 99, 2 );
      add_action( 'wp_head', [$this,'addMeta'],0,0 );
      add_theme_support( 'title-tag' );

      add_action( 'wp_enqueue_scripts', [$this,'addMediaElementAlways'] );

      add_filter('gettext_with_context', [$this,'removeQuotesFromPlaylists'],10,4);

      add_filter('intermediate_image_sizes',[$this,'removeImageSizes']);

      if($options['templates']) :

        $this->templates = $options['templates'];
        add_filter( 'theme_page_templates', [$this,'addPageTemplates'],10,3 ,4);

      endif;

    }

    public function addPageTemplates( $post_templates, $theme, $post ) {

      foreach($this->templates as $slug => $name) :
        $post_templates['/templates/pages/' . $slug . '.php'] = $name;
      endforeach;

      return $post_templates;

    }

    public function plotChangeSiteUrlInDB() {

      if(AUTO_DOMAINS == true) {

        $allowedDomain = false;

        $siteURL = $this->siteURL();

        if($siteURL == get_field('domains_primary','option')) {
          $allowedDomain = true;
        }

        if($siteURL == HOLDING_DOMAIN && !get_field('domains_primary','option')) {
          $allowedDomain = true;
        }

        if(strpos($siteURL, '.test') !== false) {
          $allowedDomain = true;
        }
        
        if(get_bloginfo('url') != $siteURL && $allowedDomain == true) {
          //Run find and replace
          new PlotFindAndReplace(get_bloginfo('url'), $siteURL);
          header('Location: '.$this->siteURL() . '/'.$_SERVER['REQUEST_URI']);
          exit;

        }

      }

    }

    function siteURL()
    {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'];
        return $protocol.$domainName;
    }


    public function removeQuotesFromPlaylists($translated, $text, $context, $domain){
        if($context = 'playlist item title' && $text == '&#8220;%s&#8221;') $translated = "%s";
        return $translated;
    }

    public function addMediaElementAlways(){
        

      wp_enqueue_style( 'wp-mediaelement' );
      wp_enqueue_script('wp-mediaelement');
    }


    public function addMeta() {

      if(get_field('page_description')) :

        echo '<meta name="description" content="' . get_field('page_description') . '" />';
        echo '<meta name="og:description" content="' . get_field('page_description') . '" />';

      endif;

      if(get_field('social_share_image')) :

        echo '<meta property="og:image" content="' . get_field('social_share_image')['sizes']['blockLink'] . '" />';

      endif;

    }

    public function maybeChangeTitle($titleParts) {

      if(get_field('page_title')) :

        $titleParts['title'] = get_field('page_title');
        $titleParts['tagline'] = '';

      endif;

      return $titleParts;

    }

    // Remove tags support from posts
    public function plotUnregisterTags() {
        unregister_taxonomy_for_object_type('post_tag', 'post');
    }

    public function plotRedirectToHomePageIfSiteHidden() {

      if(!is_front_page() && !is_user_logged_in() && plotIsSiteHidden()) :
        wp_redirect( home_url() );
        exit;
      endif;

    }

    public function ajaxRouting($actions) {

      add_action("wp_ajax_plotLoadTemplatePart", 'plotLoadTemplatePartFromAjax');
      add_action("wp_ajax_nopriv_plotLoadTemplatePart", 'plotLoadTemplatePartFromAjax');

      foreach($actions as $action => $function) :

        add_action("wp_ajax_" . $action, $function);
        add_action("wp_ajax_nopriv_" . $action, $function);

      endforeach; 

    }

    public function customPostTypes($postTypes) {

      foreach($postTypes as $name => $options) :

        if(isset($options['slug'])) {

          $args = isset($options['args']) ? $options['args'] : [];

          $this->customPostTypesCreate($name, $options['slug'],$args);

        }

      endforeach;

    }

    public function customTaxonomies($taxonomies) {

      foreach($taxonomies as $name => $slug) :

          $this->createTaxonomies($name, $slug);

      endforeach;
    }

    public function removeImageSizes($sizes) {

      foreach($sizes as $i => $size) {

        if($size == '1536x1536' || $size == '2048x2048' || $size == 'medium_large') {
          unset($sizes[$i]);
        }
      }

      return $sizes;

    }

    public function imageSizes($sizes) {


      foreach($sizes as $size => $dimensions) :

          if(isset($dimensions['desktop'])) :

            if(isset($dimensions['desktop']['width']) && isset($dimensions['desktop']['height']) && isset($dimensions['desktop']['cropToSize'])) :

              add_image_size($size, $dimensions['desktop']['width'], $dimensions['desktop']['height'], $dimensions['desktop']['cropToSize'] );

            endif;

          endif;

          if(isset($dimensions['smallScreen'])) :

            if(isset($dimensions['smallScreen']['width']) && isset($dimensions['smallScreen']['height']) && isset($dimensions['smallScreen']['cropToSize'])) :

              add_image_size($size . '--small-screen', $dimensions['smallScreen']['width'], $dimensions['smallScreen']['height'], $dimensions['smallScreen']['cropToSize'] );

            endif;

          endif;

      endforeach; 

    }

    // Replaces the excerpt "Read More" text by a link
    public function new_excerpt_more($more) {
           global $post;
        return '...';
    }


    //A function for quickly adding post types, without having to write loads
    //of annoying labels of the same thing, which I find REAL BORING
    //It's not perfect and makes quite a few args assumptions,
    //but you can change anything here
    public function customPostTypesCreate($post_type_name = '',$slug= '',$overrideArgs = []) {

      if($post_type_name == '' || $slug == '')
        return false;

      $ptn = $post_type_name;
      
      if( function_exists('acf_add_local_field_group') ):
        if($ptn == 'Stage' && get_field('event_type','option') == 'location-based') {
          $ptn = 'Location';
          $overrideArgs['rewrite'] = ['slug' => 'location','with_front' => false];
        }
      endif;
      
      $plural = plotPluralise($ptn);

      $labels = array(
        'name'                  => $plural,
        'singular_name'         => $ptn,
        'add_new'               => 'Add New',
        'add_new_item'          => 'Add New ' .$ptn,
        'edit_item'             => 'Edit '. $ptn,
        'new_item'              => 'New '. $ptn,
        'all_items'             => 'All '. $plural,
        'view_item'             => 'View '. $ptn,
        'search_items'          => 'Search ' . $plural,
        'not_found'             =>  'No '. $plural . ' found',
        'not_found_in_trash'    => 'No '. $plural . ' found in Trash', 
        'parent_item_colon'     => '',
        'menu_name'             => $plural
      );


      $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true, 
        'show_in_menu' => true,
        'query_var' => true,
        'capability_type' => 'post',
        'has_archive' => true, 
        'hierarchical' => true,
        'menu_position' => null,
        'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
        ); 

      if($overrideArgs) :

         foreach($overrideArgs as $key => $value) : 
            
            $args[$key] = $value;
            
         endforeach;

      endif;

      register_post_type( $slug, $args );

      plotFlushRedirectRules();

    }


    //This function  creates new taxonomies based on what's passed
    //to it.
    public function createTaxonomies($taxonomy_name='',$post_type='post') {

      $slug = strtolower(str_replace(' ', '-', $taxonomy_name));

      // Add new taxonomy to post type selected
      register_taxonomy($slug, $post_type, array(
        // Hierarchical taxonomy (like categories)
        'hierarchical' => false,
        'show_in_nav_menus' => false,
        // This array of options controls the labels displayed in the WordPress Admin UI
        'labels' => array(
          'name' => _x( plotPluralise($taxonomy_name), 'taxonomy general name' ),
          'singular_name' => _x( $taxonomy_name, 'taxonomy singular name' ),
          'search_items' =>  __( 'Search ' . plotPluralise($taxonomy_name) ),
          'all_items' => __( 'All ' . plotPluralise($taxonomy_name) ),
          'parent_item' => __( 'Parent ' .$taxonomy_name ),
          'parent_item_colon' => __( 'Parent ' . $taxonomy_name . ':' ),
          'edit_item' => __( 'Edit ' . $taxonomy_name ),
          'update_item' => __( 'Update ' . $taxonomy_name ),
          'add_new_item' => __( 'Add New ' . $taxonomy_name ),
          'new_item_name' => __( 'New ' . $taxonomy_name . ' Name' ),
          'menu_name' => __( plotPluralise($taxonomy_name) ),
        ),
        // Control the slugs used for this taxonomy
        'rewrite' => array(
          'slug' => $slug, // This controls the base slug that will display before each term
          'with_front' => false, // Don't display the category base before "/locations/"
          'hierarchical' => false // This will allow URL's like "/locations/boston/cambridge/"
        ),
      ));
    }



    

}



