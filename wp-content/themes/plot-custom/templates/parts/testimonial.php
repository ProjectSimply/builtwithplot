<section class="testimonial sectionPadding" data-plot-smooth-scroll-element>

    <div class="maxWidth">    

        <div class="testimonial__innerWrap JS--testimonials">

            <?php while( has_sub_field('testimonials') ) : ?>

                <div class="testimonial__item">

                    <p class="testimonial__title growIn"><?= get_sub_field('testimonial_title'); ?></p>

                    <p class="testimonial__quote growIn"><?= get_sub_field('testimonial_quote') ?></p>

                    <div class="testimonial__imageWrap growIn">

                        <?php plotLazyload([
                                'image'                 => get_sub_field('testimonial_image'), 
                                'imageSize'             => 'thumbnail',
                                'class'                 => 'testimonial__image'
                            ]); ?>

                    </div>

                    <p class="testimonial__author growIn"><?= get_sub_field('testimonial_author') ?></p>

                </div>

            <?php endwhile; ?>

        </div>


    </div>

    <div class="testimonial__crossWrap">

        <?php plotGetTemplatePart('parts/cross-asset') ?>

    </div>

</section>