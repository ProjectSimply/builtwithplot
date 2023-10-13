<section class="carouselSection">

    <div class="maxWidth">

        <?php if(get_sub_field('carousel_title')) : ?>

            <h2 class="growIn"><?= get_sub_field('carousel_title') ?></h2>

        <?php endif; ?>

        <?php if(get_sub_field('carousel_subtext')) : ?>

            <p class="carouselSection__text growIn"><?= get_sub_field('carousel_subtext') ?></p>

        <?php endif; ?>

    </div>

    <div class="JS--carousel carouselSection__slider" data-plot-carousel-type="image" data-plot-smooth-scroll-element>

	    <?php $i = 0; while(has_sub_field('carousel_slider')) : ?>

            <?php if(get_sub_field('site_link')) : ?>

                <a target="_blank" href="<?= get_sub_field('site_link') ?>" class="carousel__imageWrap carousel__slide JS--carousel__slideWrap <?= $i == 1 ? "is-initial-select" : "" ; ?>">
                        
                    <img class="imageCarousel__image" data-flickity-lazyload="<?= get_sub_field('image')['sizes']['carouselImage'] ?>" />

                </a>

            <?php else : ?>

                <div class="carousel__imageWrap carousel__slide JS--carousel__slideWrap <?= $i == 1 ? "is-initial-select" : "" ; ?>">

                    <img class="imageCarousel__image" data-flickity-lazyload="<?= get_sub_field('image')['sizes']['carouselImage'] ?>" />

                </div>

            <?php endif; ?>

		<?php $i++; endwhile; ?>

	</div>
    <?php if(get_sub_field('carousel_add_link')) : ?>

        <div class="carouselSection__buttonWrap button__wrap growIn">
            <a href="<?= get_sub_field('carousel_link') ?>" class="button button--X">
                <span><?=  get_sub_field('carousel_link_text') ?></span>
            </a>
        </div>

        <?php endif; ?>

    <div class="carouselSection__asset carouselSection__asset--1">

        <?php plotGetTemplatePart('parts/svg-asset--p') ?>

    </div>

    <div class="carouselSection__asset carouselSection__asset--2">

        <?php plotGetTemplatePart('parts/svg-asset--t') ?>

    </div>

</section>