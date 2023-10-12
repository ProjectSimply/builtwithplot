<section class="textOnlyBanner textOnlyBanner--spotlights sectionWithVerticalSpacing">

    <div class="textOnlyBanner__asset textOnlyBanner__asset--1">

        <?php plotGetTemplatePart('parts/cross-asset') ?>

    </div>

    <div class="textOnlyBanner__asset textOnlyBanner__asset--2">

        <?php plotGetTemplatePart('parts/cross-asset') ?>

    </div>

    <div class="banner__contentWrap">

        <?php plotGetTemplatePart('parts/spotlights-logo') ?>

        <div class="maxWidth">

            <h1 class="textOnlyBanner__title"><?= get_field('banner_title') ?></h1>

            <p class="banner__subHeading"><?= get_field('plotcms_banner_subheading') ?></p>

            <a href="#" class="button banner__button--spotlights">Enter Now</a>

        </div>

    </div>

    <div class="JS--plot-ticker plot-ticker spotlights__assetsWrapper">
        <div class="ticker-container">
            <div class="spotlights__assetsWrapper__inner message">
                <div class="spotlights__asset spotlights__asset--mobile spotlights__asset--1"> 
                    <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/mobile-asset-1-bs.png' ?>" alt="spotlights-example">
                </div>

                <div class="spotlights__asset spotlights__asset--desktop spotlights__asset--2"> 
                    <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/desktop-asset-1-bs.png' ?>" alt="spotlights-example">
                </div>

                <div class="spotlights__asset spotlights__asset--mobile spotlights__asset--3"> 
                    <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/mobile-asset-2-bs.png' ?>" alt="spotlights-example">
                </div>
            </div>
        </div>
    </div>
    
    <div class="JS--plot-ticker plot-ticker reverse">
        <div class="ticker-container">
            <div class="spotlights__assetsWrapper message">
                <div class="spotlights__asset spotlights__asset--desktop spotlights__asset--4"> 
                    <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/desktop-asset-2-bs.png' ?>" alt="spotlights-example">
                </div>

                <div class="spotlights__asset spotlights__asset--mobile spotlights__asset--5"> 
                    <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/mobile-asset-3-bs.png' ?>" alt="spotlights-example">
                </div>

                <div class="spotlights__asset spotlights__asset--mobile spotlights__asset--6"> 
                    <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/mobile-asset-4-bs-2.png' ?>" alt="spotlights-example">
                </div>
            </div>
        </div>
    </div>

</section>	