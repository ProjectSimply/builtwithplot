<section class="pricingSection sectionPadding">

    <div class="maxWidth">

        <?php plotGetTemplatePart('parts/plan-toggle') ?>

        <div class="pricingSection__mainFeatures">

            <div class="pricingSection__list" data-plot-smooth-scroll-element>

                <span class="small">What's included:</span>

                <?php while ( has_sub_field('main_features_included')) : ?>

                    <div class="pricingSection__item grownIn">

                        <h4><?= get_sub_field('feature') ?></h4>

                    </div>

                <?php endwhile; ?>

            </div>

            <div class="pricingSection__buttonWrap">
                <a href="<?= get_field('pricing_button_link') ?>" class="button button--X"><?=  get_field('pricing_button_text') ?></a>
            </div>

            <div class="textOnlyBanner__asset textOnlyBanner__asset--1">

                <?php plotGetTemplatePart('parts/cross-asset') ?>

            </div>

        </div>

        <div class="pricingSection__fullFeatures">

            <input id="listToggle" class="pricingSection__checkbox" type="checkbox" name="">
            <label for="listToggle" class="small JS--toggleList pricingSection__toggleList">View full feature set</label>
            
            <ul class="pricingSection__fullList">

                <?php while ( has_sub_field('full_features_list')) : ?>

                    <li class="pricingSection__item pricingSection__item--border">

                        <span class="pricingSection__tick">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.2308 0.273378C18.4485 -0.236404 17.4041 -0.0125973 16.8973 0.772986L7.44324 15.4171L2.83261 11.1331C2.14815 10.4973 1.08126 10.5391 0.448553 11.2269C-0.184158 11.9141 -0.14254 12.9874 0.541913 13.6226L6.59569 19.2472C6.59569 19.2472 6.76948 19.3975 6.8499 19.4501C7.13335 19.6355 7.45168 19.7236 7.76663 19.7236C8.31891 19.7236 8.86051 19.4512 9.1839 18.9505L19.728 2.61826C20.2352 1.83268 20.0125 0.782594 19.2308 0.273378Z" fill="#D95496"/>
                            </svg>
                        </span>

                        <p><?= get_sub_field('feature') ?></p>

                    </li>

                <?php endwhile; ?>

            </ul>

        </div>

    </div>

</section>