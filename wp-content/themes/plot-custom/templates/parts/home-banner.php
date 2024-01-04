<section class="homeBanner" data-plot-smooth-scroll-frame>

    <div class="maxWidth">

        <div class="homeBanner__grid">

            <div class="homeBanner__item homeBanner__item--titleWrap">

                <div class="vCentered">

                    <h1 class="homeBanner__title"><?= get_field('home_title') ?></h1>

                    <p class="homeBanner__subtitle"><?= get_field('home_banner_subheading') ?></p>

                </div>

                <div class="perfectFor">

                    <p>Perfect for:</p>

                    <div class="meta">
                        <span>venues</span>
                        <span>festivals</span>
                        <span>promoters</span>
                        <span>events</span>
                    </div>

                </div>

            </div>

            <div class="homeBanner__item homeBanner__item--imageWrap">

                <?php plotLazyload([
                    'image' 				=> get_field('home_banner_image'), 
                    'imageSize'				=> 'carouselImage',
                    'smallScreenImageSize'	=> 'banner--small-screen',
                    'class'					=> 'home_banner_image'
					]); ?>
            </div>

        
        </div>
    
    </div>

</section>