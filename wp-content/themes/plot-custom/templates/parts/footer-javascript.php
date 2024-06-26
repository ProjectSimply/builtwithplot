<script>
    var temp_dir    = "<?php echo get_template_directory_uri(); ?>";
    var au          = "<?php echo admin_url( 'admin-ajax.php' ); ?>";
</script> 

<?php if(strpos($_SERVER['HTTP_HOST'],'test') !== false || strpos($_SERVER['HTTP_HOST'],'local') !== false || strpos($_SERVER['HTTP_HOST'],'pleasecheck') !== false)  : ?>
    <script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/main.js?v=<?= date('Ymdhis') ?>"></script>
<?php else : ?>
    <script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/main.min.js?v=<?= SITE_VERSION ?>"></script>
<?php endif; ?>

<script>Main.init();</script>

<!-- Start of HubSpot Embed Code -->
  <!--<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/3393359.js"></script>-->
<!-- End of HubSpot Embed Code -->

<?php while(has_sub_field('other_snippets','option')) : ?>

	<script>

		<?= get_sub_field('code') ?>

	</script> 

<?php endwhile; ?>