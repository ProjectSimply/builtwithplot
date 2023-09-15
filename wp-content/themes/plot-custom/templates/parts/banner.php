<?php if(get_field('banner_type') != 'text') : ?>

	<section class="banner sectionWithVerticalSpacing">

		<?php if(get_field('banner_link')) : ?>

			<a href="<?= get_field('banner_link') ?>" <?= get_field('banner_link_open_in_new_tab') ? 'target="_blank"' : '' ?>>

		<?php endif; ?>

			<div class="banner__backgroundWrap" style="opacity: <?= get_field('brightness') / 100 ?>">

				<?php if(get_field('banner_media_type') == 'image') : ?>

					<?php plotLazyload([
						'image' 				=> get_field('banner_image'), 
						'imageSize'				=> 'banner', 
						'smallScreenImage' 		=> get_field('small_screen_banner_image'), 
						'smallScreenImageSize'	=> 'banner--small-screen',
						'class'					=> 'banner__image'
					]); ?>

				<?php else : ?>

					<?php plotLazyload([
						'video' 				=> get_field('banner_video'), 
						'smallScreenVideo' 		=> get_field('small_screen_banner_video'),
						'class'					=> 'banner__video'
					]); ?>


				<?php endif; ?>

			</div>

			<div class="banner__contentWrap">

				<div class="maxWidth">

					<?php if( is_category() ) : ?>

						<h1 class="banner__title"><?= get_queried_object()->name; ?> Articles</h1>

					<?php else : ?>

						<?php if(get_field('banner_title')) : ?>

							<h1 class="banner__title"><?= get_field('banner_title') ?></h1>

						<?php endif; ?>

						<?php if(get_field('show_button')) : ?>

							<div class="plotButton banner__button"><?= get_field('button_text') ?></div>

						<?php endif; ?>

					<?php endif; ?>

				</div>

			</div>

		<?php if(get_field('banner_link')) : ?>

			</a>

		<?php endif; ?>

	</section>

<?php else : ?>

	<section class="textOnlyBanner sectionWithVerticalSpacing">

		<div class="textOnlyBanner__asset textOnlyBanner__asset--1">

			<?php plotGetTemplatePart('parts/cross-asset') ?>

		</div>

		<div class="textOnlyBanner__asset textOnlyBanner__asset--2">

			<?php plotGetTemplatePart('parts/cross-asset') ?>

		</div>

		<div class="banner__contentWrap">

			<div class="maxWidth">

				<?php if( is_category() ) : ?>

					<h1 class="textOnlyBanner__title"><?= get_queried_object()->name; ?> Articles</h1>

				<?php else : ?>

					<h1 class="textOnlyBanner__title"><?= get_field('banner_title') ?></h1>

				<?php endif; ?>

				<p class="banner__subHeading"><?= get_field('plotcms_banner_subheading') ?></p>

			</div>

		</div>

	</section>	

<?php endif; ?>
