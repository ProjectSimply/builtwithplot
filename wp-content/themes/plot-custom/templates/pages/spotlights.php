<?php plotGetTemplatePart('parts/header') ?>

<?php plotGetTemplatePart('parts/banner--spotlights') ?>

<?php plotGetTemplatePart('parts/subnavigation'); ?>

<?php plotGetTemplatePart('plot-layouts/main-loop'); ?> 

<section class="fixedFiftyFifty">
    <div class="maxWidth">
        <div class="fixedFiftyFifty__inner">
            <div class="fixedFiftyFifty__images">
                <div class="fixedFiftyFifty__imagesInner">
                    <div class="fixedFiftyFifty__imageWrap">
                        <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/desktop-asset-1-bs.png' ?>" alt="spotlights-example">
                    </div>
                    <div class="fixedFiftyFifty__imageWrap">
                        <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/desktop-asset-2-bs.png' ?>" alt="spotlights-example">
                    </div>
                    <div class="fixedFiftyFifty__imageWrap">
                        <img src="<?= get_stylesheet_directory_uri() . '/assets/img/spotlights/desktop-asset-1-bs.png' ?>" alt="spotlights-example">
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
                    <h1>Test 1</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum recusandae asperiores in.</p>
                    <a href="#" class="button">Button</a>
                </div>
                <div class="textContent">
                    <h1>Another 2</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum recusandae asperiores in.</p>
                    <a href="#" class="button">Button</a>
                </div>
                <div class="textContent">
                    <h1>The last 3</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum recusandae asperiores in.</p>
                    <a href="#" class="button">Button</a>
                </div>
            </div>
        </div>
    </div>
    
</section>

<div class="spotlights__cardsWrapper">
    <?php plotGetTemplatePart('parts/cards'); ?> 
</div>

<?php plotGetTemplatePart('parts/countdown-timer'); ?>


