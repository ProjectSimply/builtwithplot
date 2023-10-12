<?php plotGetTemplatePart('parts/header') ?>

<?php plotGetTemplatePart('parts/banner--spotlights') ?>

<?php plotGetTemplatePart('parts/subnavigation'); ?>

<?php plotGetTemplatePart('plot-layouts/main-loop'); ?> 

<section class="fixedFiftyFifty">
    <div class="maxWidth">
        <div class="fixedFiftyFifty__inner fixedFiftyFifty__inner--desktop">
            <div class="fixedFiftyFifty__images">
                <div class="fixedFiftyFifty__imagesInner">
                    <div class="fixedFiftyFifty__imageWrap">
                        <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/fifty-asset-4.jpg' ?>" alt="spotlights-example">
                    </div>
                    <div class="fixedFiftyFifty__imageWrap">
                        <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/fifty-asset-2.jpg' ?>" alt="spotlights-example">
                    </div>
                    <div class="fixedFiftyFifty__imageWrap">
                        <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/fifty-asset-3.jpg' ?>" alt="spotlights-example">
                    </div>
                </div>
            </div>
            <div class="fiftyFifty__indicators">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="textContentWrapper">
                <div class="textContent">
                    <h2>What is Spotlights?</h2>
                    <p>Plot Spotlights is a programme to champion pioneering music festivals, events and venues by rewarding them with a free website Built by Plot worth over £3000!</p>
                    <a href="#" class="button">Sign up now</a>
                </div>
                <div class="textContent">
                    <h2>Who is it for?</h2>
                    <p>This is for businesses who are looking to make a huge cultural impact in the music space—for festivals, events and venues.</p>
                    <a href="#" class="button">Sign up now</a>
                </div>
                <div class="textContent">
                    <h2>How do I join?</h2>
                    <p>Sign up using for the form below and every 2 months we will notify the lucky winner.</p>
                    <a href="#" class="button">Sign up now</a>
                </div>
            </div>
        </div>
        <div class="fixedFiftyFifty__inner fixedFiftyFifty__inner--mobile">
            <div class="fiftyFifty__slide">
                <div class="fixedFiftyFifty__images">
                    <div class="fixedFiftyFifty__imagesInner">
                        <div class="fixedFiftyFifty__imageWrap">
                            <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/fifty-asset-4.jpg' ?>" alt="spotlights-example">
                        </div>
                    </div>
                </div>
                <div class="textContentWrapper">
                    <div class="textContent">
                        <h2>Test 1</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum recusandae asperiores in.</p>
                        <a href="#" class="button">Button</a>
                    </div>
                </div>
            </div>
            <div class="fiftyFifty__slide">
                <div class="fixedFiftyFifty__images">
                    <div class="fixedFiftyFifty__imagesInner">
                        <div class="fixedFiftyFifty__imageWrap">
                            <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/fifty-asset-2.jpg' ?>" alt="spotlights-example">
                        </div>
                    </div>
                </div>
                <div class="textContentWrapper">
                    <div class="textContent">
                        <h2>Test 1</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum recusandae asperiores in.</p>
                        <a href="#" class="button">Button</a>
                    </div>
                </div>
            </div>
            <div class="fiftyFifty__slide">
                <div class="fixedFiftyFifty__images">
                    <div class="fixedFiftyFifty__imagesInner">
                        <div class="fixedFiftyFifty__imageWrap">
                            <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/fifty-asset-3.jpg' ?>" alt="spotlights-example">
                        </div>
                    </div>
                </div>
                <div class="textContentWrapper">
                    <div class="textContent">
                        <h2>Test 1</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum recusandae asperiores in.</p>
                        <a href="#" class="button">Button</a>
                    </div>
                </div>
            </div>
        </div>
        <a class="slider-control slider-control--prev" href="#" data-carousel-prev>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 13 20" fill="none">
                <path d="M11 18L3 10L11 2" stroke="white" stroke-width="3"/>
            </svg>
        </a>
        <a class="slider-control slider-control--next" href="#" data-carousel-next>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 13 20" fill="none">
                <path d="M2 2L10 10L2 18" stroke="white" stroke-width="3"/>
            </svg>
        </a>
    </div>
    
</section>

<div class="spotlights__cardsWrapper">
    <?php plotGetTemplatePart('parts/cards'); ?> 
</div>

<?php plotGetTemplatePart('parts/countdown-timer'); ?>


