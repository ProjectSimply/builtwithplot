<?php plotGetTemplatePart('parts/head'); ?>

<body <?php plotBodyClass() ?>> 
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KKZHF74"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-171294626-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-171294626-1');

      gtag('config', 'AW-619032347');
    </script>

    <?php plotGetNotifications() ?>  

    <div data-plot-smooth-scroll>

        <div class="siteWrap">

               <?php get_template_part('router'); ?>

        </div>

    </div>

    <?php plotGetTemplatePart('parts/schedule-download'); ?>

    <?php plotGetTemplatePart('parts/burger-menu') ?>

    <div class="siteOverlay"></div>

    <?php plotGetTemplatePart('parts/modal') ?>
    
    <?php plotGetTemplatePart('parts/site-status-note'); ?>  

    <?php plotGetTemplatePart('parts/custom-mouse') ?>

    <?php plotGetTemplatePart('parts/footer-javascript'); ?>

    <?php wp_footer(); ?>

    <?php plotGetTemplatePart('parts/live-reload'); ?>


    <script type="text/javascript"> _linkedin_partner_id = "2354756"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id); </script><script type="text/javascript"> (function(){var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})(); </script> <noscript> <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=2354756&fmt=gif" /> </noscript>

    <script type="text/javascript" src="https://static.leaddyno.com/js"></script>
    <script>
      LeadDyno.key = "a707867c49630b66341d10d32da9dcee5a6d65b0";
      LeadDyno.recordVisit();
      LeadDyno.autoWatch();
    </script>

    
</body>

</html>
