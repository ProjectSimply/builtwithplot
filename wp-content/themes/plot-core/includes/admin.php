<?php

    // Here lies all our functions that help create a more bespoke 
    // admin experience based on the needs of Plot sites. 
    class PlotThemeAdmin
    {
        public $protectedPosts = [
            'news'              => 393,
            'home'              => 2,
            'artists'           => 409,
            'past-artists'      => 3828,
            'schedule'          => 919,
            'whats-on'          => 3834,
            'past-performances' => 3878,
            'stages'            => 992,
            'faqs'              => 904,
            'lineup-poster'     => 1119,
            'gallery'           => 1133,
            'tickets'           => 398,
            'newsletterForm'    => 381
        ];

        public function __construct()
        {

            add_filter( 'show_admin_bar', '__return_false' );
            add_filter('the_generator', [$this,'removeWpVersion']);
            add_action( 'admin_init', [$this,'removeMenuPages'],20,2 );
            add_action('admin_init', [$this,'disableAllCommenting'],20,2);
            add_filter('comments_open', [$this,'disableCommentsStatus'], 20, 2);
            add_filter('pings_open', [$this,'disableCommentsStatus'], 20, 2);
            add_filter('comments_array', [$this,'disableExistingComments'], 10, 2);
            add_filter('comments_array', [$this,'disableExistingComments'], 10, 2);
            add_action('admin_menu', [$this,'disableAdminMenuComments']);
            add_action('admin_init', [$this,'disableCommentsForAdminWithRedirect']);
            add_action('admin_init', [$this,'disableCommentsFromTheAdminBar']);
            add_action('edit_form_before_permalink', [$this,'preventSlugEdits']);
            add_action('init', [$this,'psRedirect'],10,2);
            add_filter('admin_footer_text', [$this,'removeFooterAdmin']);
            add_filter( 'get_user_option_admin_color', [$this,'updateAdminColor'], 5 );
            add_action('admin_head', [$this,'hideHelpAndOptions']);
            add_action( 'login_head', [$this,'loginPageFont'] );

            add_action( 'admin_menu', [$this,'changePostLabelInMenuToArticles'] );
            add_action( 'admin_menu', [$this,'changePostLabelsToArticles'] );
            add_action( 'admin_menu', [$this,'changeMenusPosition']);
            add_action( 'admin_init', [$this,'allowEditorsToSeeMenus'] );

            add_action( 'wp_dashboard_setup', [$this,'removeDefaultDashboardWidgets'], 10,5 );
            add_action( 'wp_dashboard_setup', [$this,'addDashboardWidgets'],999,5 );
            add_filter( 'screen_layout_columns', [$this,'makeDashboardSingleColumn'] );
            add_filter( 'get_user_option_screen_layout_dashboard', [$this,'makeEntireDashboardSingleColumn'] );
            add_action( 'admin_init', [$this,'orderDashboardTheWayWeWantIt'] );

            add_action( 'admin_enqueue_scripts', [$this,'adminStyle']);
            add_action( 'login_enqueue_scripts', [$this,'adminStyle'] );

            add_action( 'after_setup_theme', [$this,'editorStyle'],999 );

            add_action( 'admin_head', [$this,'hideTheDashboardTextOnTheDashboard'] );
            add_filter( 'login_headerurl', [$this,'sendClickingOntheAdminLogoToTheHomePage'] );

            add_filter( 'gettext', [$this,'changeLostPasswordText'] );

            add_action('init',[$this,'addMenuItems']);

            add_filter( 'editable_roles', [$this, 'editableRoles']);
            add_filter( 'map_meta_cap', [$this, 'preventNonAdminsEditingAdmins'], 10, 4);

            if ( !current_user_can('manage_options') ) {
                add_filter('page_row_actions',[$this,'removeQuickEdit'],10,1);
                add_filter( 'admin_menu', [$this,'hideAppearanceForNonAdmins'],999);
                add_action( 'admin_head',[$this,'hideMenuDeleteCreateOptionsForNonAdmins'],500);
                add_action( 'admin_menu', [$this,'plotHideWPFormsItemsFromEditors'],999 );
                add_filter('page_row_actions',[$this,'removeQuickEdit'],10,1);
                add_filter('post_row_actions',[$this,'removeQuickEdit'],10,1);
            }
            

            add_action( 'admin_init', [$this,'allowEditorsToManageUsers'] );
            add_action('pre_user_query',[$this,'plotHidePsAdmin']);
            add_filter('upload_mimes', [$this,'edit_upload_types']);

            add_filter('rewrite_rules_array',[$this,'removeAttachmentRedirects']);
            add_filter( 'attachment_link', [$this,'cleanupAttachmentLink'] );

            add_filter("views_users", [$this,"plotHideAdminFromTotalAdmins"]);

            add_action('before_delete_post', [$this,'plotRestrictPostDeletion'], 10, 1);

            add_filter( 'wpforms_manage_cap', [$this,'wpforms_custom_capability'] );

            add_filter('acf/prepare_field', [$this,'hideSitebuilderFields']);
            add_filter('acf/prepare_field', [$this,'convertStageToLocation']);
            add_filter('acf/load_field/key=performances_info_day', [$this,'setDefaultDayToLastInserted']);
            add_filter('acf/prepare_field', [$this,'hideFieldsIfPagesNotPublic']);
            add_action( 'init', [$this,'hideContentEditorWhenNotNeeded'], 99);

            if(SITEBUILDER) {
                add_action( 'admin_enqueue_scripts', [$this,'limitMenuDepth'] );
            }

            add_action( 'customize_register', [$this,'allowEditorsToModifySiteIdentity'], 1000 );


            add_filter( 'acf/fields/wysiwyg/toolbars', [$this,'plotRemoveCrapMCEButtonsFromEditor'],10);
            add_filter('acf/fields/post_object/query', [$this,'hideNewsletterFormFromFormDropdown'], 10, 3);
            add_action('admin_init', [$this,'removeTitleFromPerformances']);

            add_action('acf/save_post',[$this,'addPerformanceTitleOnSave'], 5);
            add_action('acf/save_post',[$this,'changeToStagesOrLocations'], 5);
            add_action('acf/save_post',[$this,'storeQueriableDateTimeOnPerformances'],5);
            add_action('acf/validate_save_post',[$this,'validateDomains'], 5);

            add_action('admin_enqueue_scripts', [$this,'adminJavascript']);
            add_action('acf/input/admin_enqueue_scripts', [$this,'acfJS']);

            add_filter('wp_editor_settings', [$this,'hideTextEditorForEditors']);


            add_action( 'admin_footer', [$this,'addLiveReloadToFooter'] ); // For back-end

            add_action( 'wp_playlist_scripts', 'wpse_296966_hook_new_playlist_templates', 20 );

            add_action( 'wp_trash_post', [$this,'preventArtistsFromBeingDeletedIfTheyHaveAPerformance'],10,1);

            add_action('admin_notices', [$this,'customAlertForPerformanceExists']);

            add_filter( 'parse_query', [$this,'hideWhatsOnPageIfNoPerformancePages'] );

            add_action( 'init', [$this,'preventAutoTrash'] );
            
        }

        function setDefaultDayToLastInserted($field) {

            $newDate = get_option('plotPerformanceLastDate');

            if($newDate) {
                $field['default_value'] = $newDate;
            }
            

            return $field;
        }

        function storeQueriableDateTimeOnPerformances() {
            
             if(isset($_POST['acf'])) {

                if(isset($_POST['acf']['performances_info_day']) && isset($_POST['acf']['performances_info_start_time'])) :

                    $startDateTime = DateTime::createFromFormat('YmdH:i:s', $_POST['acf']['performances_info_day'] . $_POST['acf']['performances_info_start_time']);


                    update_post_meta( $_POST['post_ID'], 'plot_performance_datetime', $startDateTime->format('YmdHis') );

                endif;
             }
        }

        function preventAutoTrash(){
            remove_action( 'wp_scheduled_delete', 'wp_scheduled_delete' );
        }

        function hideWhatsOnPageIfNoPerformancePages($query) {
            global $pagenow,$post_type;

            if (is_admin() && $pagenow=='edit.php' && $post_type =='page' && !get_field('performance_pages','option')) {
                $query->query_vars['post__not_in'] = [$this->protectedPosts['whats-on'],$this->protectedPosts['past-performances']];
            }
        }


        function customAlertForPerformanceExists(){

            if( !get_option('flashMessageRead') ) :
                update_option('flashMessageRead',true);
                echo '<div class="notice notice-info is-dismissible error">
                      <p>You can\'t remove this as it has a current live performance associated. Delete the performance and try again.</p>
                     </div>';

            endif;
        }

        function preventArtistsFromBeingDeletedIfTheyHaveAPerformance( $postId ){


            $args = [
                'post_type'         => 'performance',
                'posts_per_page'    => -1,
                'meta_query'        => [  
                    
                        'relation' => 'OR',
                     
                        [
                            'key'       => 'artists_$_artist',
                            'value'     => $postId,
                            'compare'   => 'LIKE'
                        ],
                        [
                            'key'       => 'stage',
                            'value'     => $postId,
                            'compare'   => 'LIKE'
                        ]
                        
                    
                ]
            ];

            $performanceQuery = new WP_Query($args);

            if($performanceQuery->have_posts()) :

                update_option('flashMessageRead',false);

                wp_redirect(wp_get_referer() . '&pba=1');  

                exit;

            endif;
            
            return false;
        }

        function addLiveReloadToFooter() {

            plotGetTemplatePart('parts/live-reload');

        }

        function convertStageToLocation($field) {

            if(get_field('event_type','option') == 'stage-based')
                return $field;

            $field['instructions'] = str_replace('stage', 'location', $field['instructions']);
            $field['instructions'] = str_replace('Stage', 'Location', $field['instructions']);
            $field['label'] = str_replace('stage', 'location', $field['label']);
            $field['label'] = str_replace('Stage', 'Location', $field['label']);
            
            return $field;
        }

        function removeQuickEdit($actions) {

            unset($actions['inline hide-if-no-js']);
            return $actions;
        }

        function changeToStagesOrLocations($id) {


            if(isset($_POST['acf'])) {

                if($id == 'options' && isset($_POST['acf']['field_5e945eeb916fc'])) {

                    $stagePage = get_post($this->protectedPosts['stages']);

                    $update = false;

                    if($_POST['acf']['field_5e945eeb916fc'] == 'stage-based' && $stagePage->post_name != 'stages') {

                        $title      = 'Stages';
                        $slug       = 'stages';
                        $update     = true;
                        $old        = "stage";
                        $new        = "location";

                      
                    }
                    
                    if($_POST['acf']['field_5e945eeb916fc'] == 'location-based' && $stagePage->post_name != 'locations') {

                        $title      = 'Locations';
                        $slug       = 'locations';
                        $update     = true;
                        $old        = "stage";
                        $new        = "location";
                        
                    }

                    if($update == true) {

                        $post_update = [
                            'ID'         => $stagePage->ID,
                            'post_title' => $title,
                            'post_name'  => $slug
                        ];

                        wp_update_post( $post_update );

                        update_option( 'plotFlushRedirectFlag', 'true');

                    }

                    if($_POST['acf']['field_5e8f0e285f356'] == 1) {

                        wp_untrash_post($this->protectedPosts['whats-on']);
                        wp_untrash_post($this->protectedPosts['past-performances']);
                        
                    } else {
                        wp_trash_post($this->protectedPosts['whats-on']);
                        wp_trash_post($this->protectedPosts['past-performances']);
                    }

                    
                }
            }
        }

        function validateDomains() {


            if(empty($_POST['acf']['domains_primary']))
                return true;

            $domains = [$_POST['acf']['domains_primary']];

            foreach($_POST['acf']['domains_additional'] as $domain) :

                $domains[] = $domain['domains_additional_url'];

            endforeach;

            $cloudways = new PlotCloudways();
            $response = $cloudways->setAliases($domains);

            if(!$response['success']) :

                if(!empty($response['response']->{'aliases.0'}[0])) {
                    acf_add_validation_error( 'acf[domains_primary]', 'Please add a valid primary domain' );
                }

                for($i=1;$i<5;$i++) {
                    if(!empty($response['response']->{'aliases.' .  $i}[0])) {
                        acf_add_validation_error( 'acf[domains_additional][row-'.($i-1).'][domains_additional_url]', 'Please add a valid primary domain' );
                    }
                }

            endif;

        }

       

        function hideMenuDeleteCreateOptionsForNonAdmins () {
            echo  '<style type="text/css">
                    .manage-menus form .add-new-menu-action, #nav-menu-footer .delete-action {
                                display: none;
                            }
                </style>';
        }

        function hideContentEditorWhenNotNeeded() {

            remove_post_type_support( 'performance', 'editor' );
            remove_post_type_support( 'stage', 'editor' );

        }

         function hideFieldsIfPagesNotPublic( $field ) {

            if( $field['_name'] == 'performance_links'  && !plotHasPerformancePages()) {
               
                return false;
                
            }

            return $field;
            
        }

        function cleanupAttachmentLink($link) {
            return;
        }

        function removeAttachmentRedirects( $rules ) {
            foreach ( $rules as $regex => $query ) {
                if ( strpos( $regex, 'attachment' ) || strpos( $query, 'attachment' ) ) {
                    unset( $rules[ $regex ] );
                }
            }

            return $rules;
        }



        function hideTextEditorForEditors($settings) {
            if ( ! current_user_can('administrator') ) {
                $settings['quicktags'] = false;
                return $settings;
            } else {
                $settings['quicktags'] = true;
                return $settings;
            }
        }

        function edit_upload_types($existing_mimes = array()) {
            // allow .woff
            $existing_mimes['woff'] = 'font/woff';
         
            return $existing_mimes;
        }

        function addPerformanceTitleOnSave( $id ) {

            // Get previous values.
            $prev_values = get_fields( $id );

            // Get submitted values.
            $values = $_POST['acf'];
            if(isset($_POST['post_type'])) :

                if($_POST['post_type'] == 'performance' && !$prev_values) :

                    $newTitle = "";

                    if($values['performances_info_has_custom_title'] != 'artistList') :

                        $newTitle = $values['performances_info_custom_title'];

                    else :

                        $i = 0;
                        $max = sizeof($values['performances_info_artists']);

                        foreach($values['performances_info_artists'] as $artist) :

                            $artist = get_post($artist['performances_info_artist']);
                            $newTitle .= $artist->post_title;

                            if($i + 2 == $max)
                                $newTitle .= ' & ';
                            elseif($i + 1 == $max)
                                $newTitle .= '';
                            else
                                $newTitle .= ', ';

                            $i++;

                        endforeach;


                    endif;
                    // unhook this function so it doesn't loop infinitely
                    remove_action('post_updated',[$this,'addPerformanceTitleOnSave']);

                    $post_update = [
                        'ID'         => $id,
                        'post_title' => $newTitle,
                        'post_name'  => sanitize_title($newTitle)
                    ];

                    wp_update_post( $post_update );

                    // unhook this function so it doesn't loop infinitely
                    add_action('post_updated',[$this,'addPerformanceTitleOnSave']);

                endif;


                if($values['performances_info_day']) {
                    update_option('plotPerformanceLastDate',$values['performances_info_day']);
                }

            endif;


            return $id;
            
        }

        function removeTitleFromPerformances() {

            // remove_post_type_support('performance', 'title');

        }

        function plotRemoveCrapMCEButtonsFromEditor( $toolbars ) {

     
            $toolbars['Full' ] = [];
            $toolbars['Full' ][1] = ['formatselect','bold','italic','underline','blockquote','bullist','numlist','alignleft','aligncenter','alignright','link','fullscreen'];

         
            $toolbars['Basic' ] = [];
            $toolbars['Basic' ][1] = ['bold','italic','underline','link'];
            return $toolbars;
        }

        function allowEditorsToModifySiteIdentity($wp_customize) {

            if( current_user_can('editor'))     {
               $wp_customize->get_setting( 'blogdescription' )->capability = 'edit_theme_options';
               $wp_customize->get_setting( 'blogname' )->capability = 'edit_theme_options';
               $wp_customize->get_setting( 'site_icon' )->capability = 'edit_theme_options';
            }

        }

        function limitMenuDepth( $hook ) {
          if ( $hook != 'nav-menus.php' ) return;

          $globalDepth = 0;

          //Main menu can have sub items. Others can't.
          if(!empty($_GET['menu'])) {
              if($_GET['menu'] == 2)
                $globalDepth = 1;
          }

          wp_add_inline_script( 'nav-menu', 'wpNavMenu.options.globalMaxDepth = ' . $globalDepth . ';', 'after' );
        }

        function hideSitebuilderFields( $field ) {

            if( strpos($field['_name'], 'plotcms') !== false && SITEBUILDER == false) {
               
                return false;
                
            }

            return $field;
            
        }

        /**
         * Change WPForms capability requirement.
         *
         * @param string $cap
         * @return string
         */
        function wpforms_custom_capability( $cap ) {
         
            // unfiltered_html by default means Editors and up.
            // See more about WordPress roles and capabilities
            // https://codex.wordpress.org/Roles_and_Capabilities
            return 'unfiltered_html';
        }


        function plotRestrictPostDeletion($post_ID){

            if(current_user_can('administrator'))
                return true;

            if(in_array($post_ID, $this->protectedPosts)){
                echo "You are not authorized to delete this page.";
                exit;
            }
        }

        function plotHideAdminFromTotalAdmins($views){
           $users = count_users();
           $admins_num = $users['avail_roles']['administrator'] - 1;
           $all_num = $users['total_users'] - 1;
           $class_adm = ( strpos($views['administrator'], 'current') === false ) ? "" : "current";
           $class_all = ( strpos($views['all'], 'current') === false ) ? "" : "current";
           $views['administrator'] = '<a href="users.php?role=administrator" class="' . $class_adm . '">' . translate_user_role('Administrator') . ' <span class="count">(' . $admins_num . ')</span></a>';
           $views['all'] = '<a href="users.php" class="' . $class_all . '">' . __('All') . ' <span class="count">(' . $all_num . ')</span></a>';
           return $views;
        }

        function plotHidePsAdmin($user_search) {
          global $current_user;
          $username = $current_user->user_login;

          if ($username == 'psadmin') { 

          }

          else {
            global $wpdb;
            $user_search->query_where = str_replace('WHERE 1=1',
              "WHERE 1=1 AND {$wpdb->users}.user_login != 'psadmin'",$user_search->query_where);
          }
        }

        public function hideAppearanceForNonAdmins(){
            remove_menu_page( 'themes.php' );
            global $current_user;
            $current_user = wp_get_current_user();

            //check condition for the user means show menu for this user
            if(is_admin() ) {
                //We need this because the submenu's link (key from the array too) will always be generated with the current SERVER_URI in mind.
                $customizer_url = add_query_arg( 'return', urlencode( remove_query_arg( wp_removable_query_args(), wp_unslash( $_SERVER['REQUEST_URI'] ) ) ), 'customize.php' );
                remove_submenu_page( 'themes.php', $customizer_url );
                remove_submenu_page('upload.php', 'tiny-bulk-optimization');
           }
        }

        /*
         * Let Editors manage users, and run this only once.
         */
        public function allowEditorsToManageUsers() {
                $edit_editor = get_role('editor'); // Get the user role
                if(!isset($edit_editor->capabilities['edit_users'])) :
                    $edit_editor->add_cap('edit_users');
                    $edit_editor->add_cap('list_users');
                    $edit_editor->add_cap('promote_users');
                    $edit_editor->add_cap('create_users');
                    $edit_editor->add_cap('add_users');
                    $edit_editor->add_cap('delete_users');
                endif;

        }

        public function hideNewsletterFormFromFormDropdown( $args, $field, $post_id ) {

            $args['post__not_in'] = [381];

            return $args;
        }


        // Remove 'Administrator' from the list of roles if the current user is not an admin
        public function editableRoles( $roles ){
            if( isset( $roles['administrator'] ) && !current_user_can('administrator') ){
              unset( $roles['administrator']);
            }
            return $roles;
        }

        // If someone is trying to edit or delete and admin and that user isn't an admin, don't allow it
        public function preventNonAdminsEditingAdmins( $caps, $cap, $user_id, $args ){

            switch( $cap ){
                case 'edit_user':
                case 'remove_user':
                case 'promote_user':
                    if( isset($args[0]) && $args[0] == $user_id )
                        break;
                    elseif( !isset($args[0]) )
                        $caps[] = 'do_not_allow';
                    $other = new WP_User( absint($args[0]) );
                    if( $other->has_cap( 'administrator' ) ){
                        if(!current_user_can('administrator')){
                            $caps[] = 'do_not_allow';
                        }
                    }
                    break;
                case 'delete_user':
                case 'delete_users':
                    if( !isset($args[0]) )
                        break;
                    $other = new WP_User( absint($args[0]) );
                    if( $other->has_cap( 'administrator' ) ){
                        if(!current_user_can('administrator')){
                            $caps[] = 'do_not_allow';
                        }
                    }
                    break;
                default:
                    break;
            }
            return $caps;
        }

        public function preventSlugEdits($post) {

            if(in_array($post->ID,$this->protectedPosts)) { ?>

                <style type="text/css">
                    #edit-slug-buttons .edit-slug {
                                display: none;
                            }
                </style>
            <?php }


        }
        
        //Take off tools and profile pages from the main admin 
        // menu
        public function removeMenuPages() {

            global $user_ID;

            if (!current_user_can('manage_options')){

                remove_menu_page('tools.php');
                remove_menu_page('profile.php');

            }        
        }

        // Disable support for comments and trackbacks in post types
        public function disableAllCommenting() {
            $post_types = get_post_types();
            foreach ($post_types as $post_type) {
                if(post_type_supports($post_type, 'comments')) {
                    remove_post_type_support($post_type, 'comments');
                    remove_post_type_support($post_type, 'trackbacks');
                }
            }
        }

        //Public comments are turned off.
        public function disableCommentsStatus() {
            return false;
        }

        //Disable existing comments
        public function disableExistingComments($comments) {
            $comments = [];
            return $comments;
        }

        //Turn off the comments button on the admin menu
        public function disableAdminMenuComments() {
            remove_menu_page('edit-comments.php');
        }

        //Redirect the comments page should someone land on it
        public function disableCommentsForAdminWithRedirect() {
            global $pagenow;
            if ($pagenow === 'edit-comments.php') {
                wp_redirect(admin_url()); exit;
            }
        }

        //Disable comments from the admin bar
        public function disableCommentsFromTheAdminBar() {
            if (is_admin_bar_showing()) {
                remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
            }
        }

        //In the menu by default it says 'posts' 
        //and we prefer it to say 'articles' as it's a bit more 
        //intuitive sounding
        public function changePostLabelInMenuToArticles() {
            global $menu;
            global $submenu;
            $menu[5][0] = 'Articles';
            $submenu['edit.php'][5][0] = 'Articles';
            $submenu['edit.php'][10][0] = 'Add Articles'; 

        }

        //hiding off the features they don't need to see, so they
        //can just have editor access to create and manage forms
        public function plotHideWPFormsItemsFromEditors() {
            global $menu;
            global $submenu;
            $menu['57.7'][3] = 'Forms';
            $menu['57.7'][0] = 'Forms';
            if(isset($submenu['wpforms-overview'][3])) {
                unset($submenu['wpforms-overview'][3]);
            }
            if(isset($submenu['wpforms-overview'][4])) {
                unset($submenu['wpforms-overview'][4]);
            }
            if(isset($submenu['wpforms-overview'][5])) {
                unset($submenu['wpforms-overview'][5]);
            }
            if(isset($submenu['wpforms-overview'][6])) {
                unset($submenu['wpforms-overview'][6]);
            }
            if(isset($submenu['wpforms-overview'][7])) {
                unset($submenu['wpforms-overview'][7]);
            }
            if(isset($submenu['wpforms-overview'][8])) {
                unset($submenu['wpforms-overview'][8]);
            }
            if(isset($submenu['wpforms-overview'][9])) {
                unset($submenu['wpforms-overview'][9]);
            }
        }

        //This just changes the text from posts to articles
        //throughout wordpress
        public function changePostLabelsToArticles() {
            global $wp_post_types;
            $labels = &$wp_post_types['post']->labels;
            $labels->name = 'Articles';
            $labels->singular_name = 'Article';
            $labels->add_new = 'Add Article';
            $labels->add_new_item = 'Add Article';
            $labels->edit_item = 'Edit Article';
            $labels->new_item = 'Articles';
            $labels->view_item = 'View Article';
            $labels->search_items = 'Search Articles';
            $labels->not_found = 'No Articles found';
            $labels->not_found_in_trash = 'No Articles found in Trash';
            $labels->all_items = 'All Articles';
            $labels->menu_name = 'Articles';
            $labels->name_admin_bar = 'Articles';
        }

        //Let's put menus in a different place in the 
        // admin menu
        public function changeMenusPosition() {

            // Remove old menu
            remove_submenu_page( 'themes.php', 'nav-menus.php' );

            //Add new menu page
             add_menu_page(
               'Menus',
               'Menus',
               'edit_theme_options',
               'nav-menus.php',
               '',
               'dashicons-list-view',
               68
            );

             register_nav_menus();
        }

        public function allowEditorsToSeeMenus(){

            $role_object = get_role( 'editor' );
            if (!$role_object->has_cap('edit_theme_options')) : 
                $role_object->add_cap( 'edit_theme_options' );    
            endif;
        }

        /**
         * Remove Default WordPress Dashboard Widgets
         */
        public function removeDefaultDashboardWidgets() {

            
            global $wp_meta_boxes;
            $wp_meta_boxes['dashboard']['normal']['core'] = array();
            $wp_meta_boxes['dashboard']['side']['core'] = array();

            remove_action('welcome_panel', 'wp_welcome_panel');
           
        }

        /**
         * Custom Dashboard
         */
        public function addDashboardWidgets() {

            $function = function() {

                get_template_part('templates/admin/dashboard');

            };

            wp_add_dashboard_widget( 'ps_dashboard', 'My Dashboard', $function, 'dashboard' );

        }


        public function adminStyle() {
          wp_enqueue_style('admin-styles', get_template_directory_uri() . "/assets/css/admin.css?v=" . date('ymdhis') );
          wp_enqueue_style('fieldwork-fonts', 'https://use.typekit.net/ocm4gqo.css');
          wp_enqueue_style('jquery-ui-styles','//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
          
        }

        public function acfJS() {
            ?>
            <script type='text/javascript'>
                /* <![CDATA[ */
                var plotOptions = 
                {
                    endOfDay : "<?= get_field('day_end','option') ?>"

                }
                /* ]]> */
            </script>

            <?php
            wp_enqueue_script('admin-acf-js', get_template_directory_uri().'/assets/js/acf.js',['jquery']);
        }

         public function adminJavascript() {
            wp_enqueue_script('admin-js', get_template_directory_uri().'/assets/js/admin.js',['jquery'],999);
        }

        public function editorStyle() {

            if(is_admin()) :


                add_editor_style(get_stylesheet_directory_uri() . '/assets/css/style.css');

            endif;

        }


        public function hideTheDashboardTextOnTheDashboard(  ){
            if ( $GLOBALS['pagenow'] != 'index.php' ){
                return;
            }

            $GLOBALS['title'] =  __( '' ); 
        }
              
        public function sendClickingOntheAdminLogoToTheHomePage() {
            return home_url();
        }

        public function psRedirect() {

          if($_SERVER['REQUEST_URI'] === '/core_page_ps') {

             echo md5('core_wordpress'); die;

            }
        }

        public function changeLostPasswordText($text) {

            if ($text == 'Lost your password?'){
                 $text = 'Oh no I can\'t remember my password';

            }
            return $text;
        }

        public function addMenuItems() {

            if( function_exists('acf_add_options_page') ) {
                
                $page = acf_add_options_page(array(
                    'page_title'    => 'Event Settings',
                    'menu_title'    => 'Event Settings',
                    'menu_slug'     => 'event-settings',
                    'capability'    => 'edit_posts',
                    'icon_url'      => 'dashicons-admin-settings',
                    'redirect'      => false
                ));

                $page = acf_add_options_page(array(
                    'page_title'    => 'Site Status',
                    'menu_title'    => 'Site Status',
                    'menu_slug'     => 'site-status',
                    'capability'    => 'edit_posts',
                    'icon_url'      => 'dashicons-visibility',
                    'redirect'      => false
                ));
                
                $page = acf_add_options_page(array(
                    'page_title'    => 'Social Media',
                    'menu_title'    => 'Social Media',
                    'menu_slug'     => 'social-media',
                    'capability'    => 'edit_posts',
                    'icon_url'      => 'dashicons-share',
                    'redirect'      => false
                ));
                
                $page = acf_add_options_page(array(
                    'page_title'    => 'Big Tickets Button',
                    'menu_title'    => 'Big Tickets Button',
                    'menu_slug'     => 'big-tickets-button',
                    'capability'    => 'edit_posts',
                    'icon_url'      => 'dashicons-tickets-alt',
                    'redirect'      => false
                ));
                
                $page = acf_add_options_page(array(
                    'page_title'    => '404 Page Options',
                    'menu_title'    => '404 Page Options',
                    'menu_slug'     => '404-page',
                    'capability'    => 'edit_posts',
                    'icon_url'      => 'dashicons-admin-page',
                    'redirect'      => false
                ));

                $page = acf_add_options_page(array(
                    'page_title'    => 'Partner Options',
                    'menu_title'    => 'Partner Options',
                    'menu_slug'     => 'partner-options',
                    'capability'    => 'edit_posts',
                    'icon_url'      => 'dashicons-buddicons-friends',
                    'redirect'      => false
                ));

                $page = acf_add_options_page(array(
                    'page_title'    => 'Footer',
                    'menu_title'    => 'Footer',
                    'menu_slug'     => 'footer',
                    'capability'    => 'edit_posts',
                    'icon_url'      => 'dashicons-carrot',
                    'redirect'      => false
                ));

                $page = acf_add_options_page(array(
                    'page_title'    => 'Tracking Scripts',
                    'menu_title'    => 'Tracking Scripts',
                    'menu_slug'     => 'tracking-scripts',
                    'capability'    => 'edit_posts',
                    'icon_url'      => 'dashicons-analytics',
                    'redirect'      => false
                ));

                $page = acf_add_options_page(array(
                    'page_title'    => 'Domains',
                    'menu_title'    => 'Domains',
                    'menu_slug'     => 'domains',
                    'capability'    => 'edit_posts',
                    'icon_url'      => 'dashicons-admin-site-alt',
                    'redirect'      => false
                ));

                $page = acf_add_options_page(array(
                    'page_title'    => 'SSL',
                    'menu_title'    => 'SSL',
                    'menu_slug'     => 'ssl',
                    'capability'    => 'edit_posts',
                    'icon_url'      => 'dashicons-lock',
                    'redirect'      => false
                ));
            }
        }

        public function removeWpVersion() {
            return '';
        }

        // make dashboard a single column
        public function makeDashboardSingleColumn( $columns ) {
            $columns['dashboard'] = 1;
            return $columns;
        }
        

        public function makeEntireDashboardSingleColumn(){return 1;}
        
        public function orderDashboardTheWayWeWantIt() {
            $user = wp_get_current_user(); //we need to know who we're updating
            $meta_value = array(
                'normal'  => 'ps_dashboard' //first key/value pair from the above serialized array
            );

            update_user_meta( $user->ID, 'meta-box-order_dashboard', $meta_value ); //update the user meta with the user's ID, the meta_key meta-box-order_dashboard, and the new meta_value
        }

        public function removeFooterAdmin () {
 
            echo 'Built with Plot by <a href="http://www.projectsimply.com" target="_blank">Project Simply</a> | Powered by Wordpress</p>';
        }




        public function updateAdminColor( $color_scheme ) {
            $color_scheme = 'midnight';

            return $color_scheme;
        }

        public function hideHelpAndOptions() {
            $screen = get_current_screen();

            if($screen->base == 'dashboard' || $screen->base == 'upload') {
                ?>
                <style>#show-settings-link{display:none;}</style>
                <?php
            }
            $screen->remove_help_tabs();
        } 


        public function removeScreenOptionsTab()
        {
            return false;
        }

        public function loginPageFont() {
             wp_enqueue_style('fieldwork-fonts', 'https://use.typekit.net/ocm4gqo.css');
          
        }
    }

    new PlotThemeAdmin();