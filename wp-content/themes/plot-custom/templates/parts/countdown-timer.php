<section class="countdownTimer plotLayout" >
    <div class="maxWidth">
        <div 
            class="JS--countdownTimer countdownTimer__innerWrap"
            <?php if(get_field( 'countdown_type' ) =='periodic') : ?>
                data-periodic-start-date="<?= get_field( 'periodic_start_date' ); ?>"
                data-periodic-frequency="<?= get_field( 'periodic_frequency' ); ?>"
                <?php if(get_field( 'periodic_add_end_date' )) : ?>
                    data-periodic-end-date="<?= get_field( 'periodic_end_date' ) ?>"
                <?php endif; ?>
            <?php endif; ?>
            <?php if(get_field( 'countdown_type' ) == 'custom') : ?>
                data-custom-next-date="<?= get_field( 'custom_date' ); ?>"
            <?php endif; ?>
        >  
            <h4 class="countdownTimer__title">Countdown to our next winner!</h4>
            <ul>
                <li><span id="months" class="countdownTimer__unit">00</span><span>Month<span class="countdownTimer__unitPlural">s</span></span></li>
                <li class="countdownTimer__unitSeperator">:</li>
                <li><span id="days" class="countdownTimer__unit">00</span><span>Day<span class="countdownTimer__unitPlural">s</span></span></li>
                <li class="countdownTimer__unitSeperator">:</li>
                <li><span id="hours" class="countdownTimer__unit">00</span><span>Hour<span class="countdownTimer__unitPlural">s</span></span></li>
                <li class="countdownTimer__unitSeperator">:</li>
                <li><span id="minutes" class="countdownTimer__unit">00</span><span>Minute<span class="countdownTimer__unitPlural">s</span></span></li>
                <!-- <li><span id="seconds">0</span>Seconds</li> -->
            </ul>
        </div>
    </div>
</section>