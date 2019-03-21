<?php get_template_part('templates/parts/header') ?>

<div class="siteWrap">

    <div class="backgroundWrap">

        <div class="mouseFollow backgroundWrap--inner" data-twist-factor="6">

            <video id="backgroundVideo" class="backgroundWrap--video" src="/wp-content/uploads/2019/03/Plot_home_v2_1.mp4" paused loop muted playsinline></video>

            <svg class="backgroundWrap--xMask" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 1227.2" preserveAspectRatio="xMidYMid slice">

                <defs>
                  <mask id="mask" x="0" y="0" width="100%" height="100%" >

                    <rect x="0" y="0" width="100%" height="100%" fill="white" />

                    <path class="crossBit" d="M1428.5,410.2l-169.1-169.4L1064.3,436L869.1,240.8L700,410.2l195.1,195.1L700,800.5l169.1,169.1l195.1-195.1
        l195.1,195.1l169.1-169.1l-195.1-195.1L1428.5,410.2z" fill="black" />


                  </mask>

                  <mask id="invertedMask" x="0" y="0" width="100%" height="100%" >

                    <rect x="0" y="0" width="100%" height="100%" fill="black" />

                    <path class="crossBit" d="M1428.5,410.2l-169.1-169.4L1064.3,436L869.1,240.8L700,410.2l195.1,195.1L700,800.5l169.1,169.1l195.1-195.1
        l195.1,195.1l169.1-169.1l-195.1-195.1L1428.5,410.2z" fill="white" />

                  </mask>

                  <pattern id="dotsPattern" viewBox="0,0,10,10" width="1.4%" height="1.4%">
                      <circle cx="1" cy="1" r="1"/>
                  </pattern>


                </defs>

                <g class="cross">
                    <rect class="clipped" x="0" y="0" width="100%" height="100%" />
                    <rect class="clipped pink" x="0" y="0" width="100%" height="100%" />
                    <rect class="clipped clippedDots" x="0" y="0" width="100%" height="100%" />
                    <rect class="overlayColour" x="0" y="0" width="100%" height="100%" />
                    <rect class="overlayColour pink" x="0" y="0" width="100%" height="100%" />
                </g>

            </svg>

        </div>

    </div>

    <div class="introSection">

        <div class="inner">

            <img src="<?= IMAGES ?>/logo.png" class="introSection--logo mouseFollow" data-twist-factor="1">

            <div class="introSection--openingStatement mouseFollow weirdOnHover" data-twist-factor="1">Powering your <span class="outline">event websites</span>  with Plot saves our clients time,  stress and money.</div> 


            <div class="introSection--linkWrap" >
                <div class="mouseFollow" data-twist-factor="1">
                    <a class="introSection--link revealWordByWord" href="#" data-link="featureZone">
                        <span class="introSection--linkSubHeading">Great for admins</span>
                        <span class="introSection--linkHeading">Features
                            <svg width="31" height="16" viewBox="0 0 31 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M-3.0598e-07 7.67871L30 7.67871M30 7.67871L23 14.6787M30 7.67871L23 0.67871"/>
                            </svg>
                        </span>
                        <p class="introSection--linkExplainers revealWordByWordParts">Our design process delivers amazing online experiences in record time.</p>
                    </a>
                </div>
            </div>

            <div class="introSection--linkWrap introSection--linkWrap__design">
                <div class="mouseFollow" data-twist-factor="2">
                    <a class="introSection--link revealWordByWord" href="#" data-link="designZone">
                        <span class="introSection--linkSubHeading">Great for users</span>
                        <span class="introSection--linkHeading">Design
                            <svg width="31" height="16" viewBox="0 0 31 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M-3.0598e-07 7.67871L30 7.67871M30 7.67871L23 14.6787M30 7.67871L23 0.67871"/>
                            </svg>
                        </span> 
                        <p class="introSection--linkExplainers revealWordByWordParts">Our design process delivers amazing online experiences in record time.</p>
                    </a>
                </div>
            </div>

        </div>

    </div>


    <div class="sideNavigation">

        <div class="sideNavigation--backToPS">

            <a href="https://projectsimply.com" target="_blank">
                <svg class="sideNavigation--backArrow" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.49231 1.28882L1.49231 6.28882L6.49231 11.2888" stroke="white"/>
                </svg>


                <svg class="sideNavigation--PSIcon" viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.3792 0.699568C17.2986 0.626224 17.1922 0.589553 17.0859 0.600554C14.2658 0.853588 11.7502 2.41213 10.2613 4.80312C8.78342 3.81299 7.06719 3.29225 5.27394 3.29225C5.27028 3.29225 5.26294 3.29225 5.25928 3.29225L0.95036 3.29225C0.737664 3.29225 0.565308 3.46461 0.565308 3.6773L0.565308 23.5937C0.565308 23.8064 0.737664 23.9787 0.95036 23.9787H5.25561C5.4683 23.9787 5.64066 23.8064 5.64066 23.5937V21.298C8.75775 21.166 11.5998 19.4204 13.1253 16.6737C13.8661 15.3425 14.2548 13.8353 14.2548 12.3098C14.2548 12.0714 14.2438 11.8294 14.2255 11.591C14.1962 11.2243 14.1375 10.8466 14.0531 10.4285C14.0421 10.3699 14.0201 10.2672 14.0055 10.1278C13.9761 9.88948 13.9651 9.55577 13.9651 9.55577C13.9651 7.63417 15.2596 6.14164 17.1812 5.84093C17.3682 5.81159 17.5076 5.65024 17.5076 5.45954V0.981939C17.5039 0.871924 17.4599 0.769244 17.3792 0.699568ZM9.06579 11.25C9.06946 11.272 9.07312 11.3013 9.08046 11.3197L9.10613 11.4407C9.10613 11.4444 9.18314 11.8514 9.19781 12.2365V12.2951C9.19781 12.2988 9.19781 12.3025 9.19781 12.3025C9.19781 14.3487 7.63193 16.032 5.64433 16.2227L5.64433 8.3676C7.26155 8.51062 8.54872 9.5851 9.06579 11.25ZM1.33541 23.2086L1.33541 4.06236L5.23727 4.06236C5.25194 4.06236 5.26294 4.06236 5.27761 4.06236C6.93517 4.06236 8.51938 4.55009 9.8799 5.47421C9.27849 6.65871 8.94111 7.96788 8.90444 9.29906C8.03532 8.20992 6.75548 7.58283 5.27028 7.58283H5.25561C5.04291 7.58283 4.87056 7.75519 4.87056 7.96788L4.87056 16.538C4.86322 16.5674 4.85589 16.6004 4.85589 16.6334L4.85589 20.924C4.85589 20.957 4.85955 20.9863 4.87056 21.0193V23.2123H1.33541V23.2086ZM16.7338 5.1405C14.5995 5.61357 13.1913 7.3518 13.1913 9.56677C13.1913 9.58144 13.2024 9.94448 13.239 10.2232C13.261 10.3882 13.283 10.5129 13.2977 10.5862C13.3784 10.9713 13.4297 11.3197 13.4591 11.6534C13.4774 11.8697 13.4847 12.0898 13.4847 12.3098C13.4847 13.707 13.129 15.0858 12.4506 16.2997C11.0607 18.8007 8.47538 20.3959 5.63699 20.5279L5.63699 17.0001C8.05365 16.8057 9.95691 14.7778 9.96058 12.3171C9.96058 12.3135 9.96058 12.3135 9.96058 12.3098V12.2365C9.96058 12.2291 9.96058 12.2255 9.96058 12.2181C9.94591 11.8221 9.87623 11.4187 9.85423 11.305C9.85423 11.3013 9.85423 11.294 9.85056 11.2903L9.83956 11.239C9.83956 11.2243 9.83956 11.2133 9.83956 11.1987L9.75155 10.3112C9.61586 8.91035 9.81389 7.53149 10.3236 6.32866C10.4373 6.06096 10.5657 5.80059 10.705 5.54389C10.705 5.54022 10.705 5.54022 10.7087 5.53656C11.9702 3.28858 14.1925 1.77038 16.7228 1.411V5.1405H16.7338Z" fill="white" stroke="white" stroke-width="0.5"/>
                </svg>

            </a>


        </div>

    </div>

    <div class="featuresContent">

        <div class="inner">

            <div class="mouseFollow" data-twist-factor="3">
                <h2 class="revealWordByWord always"><div class="revealWordByWordParts">Powering event websites with  Plot saves our clients time, stress and money.</div></h2>
            </div>
        

            <div class='segment'>
                <blockquote class="mouseFollow" data-twist-factor="4.3">SBeing able to have confidence in your web team is a major win for us. We've worked with several companies over the years. A lot of times our vision just hasn't been translated the way we wanted. And that is simply due to the fact that the other teams just didn't have the expertise or creative ability that PS does."</blockquote>

                <cite class="mouseFollow" data-twist-factor="2.2">Scott Osburn - Lights All Night, Dallas</cite>
            </div>

            <div class='segment'>
                <blockquote class="mouseFollow" data-twist-factor="3">SBeing able to have confidence in your web team is a major win for us. We've worked with several companies over the years. A lot of times our vision just hasn't been translated the way we wanted. And that is simply due to the fact that the other teams just didn't have the expertise or creative ability that PS does."</blockquote>

                <cite class="mouseFollow" data-twist-factor="2.2">Scott Osburn - Lights All Night, Dallas</cite>
            </div>

            <div class='segment'>  
                <blockquote class="mouseFollow" data-twist-factor="1.3">SBeing able to have confidence in your web team is a major win for us. We've worked with several companies over the years. A lot of times our vision just hasn't been translated the way we wanted. And that is simply due to the fact that the other teams just didn't have the expertise or creative ability that PS does."</blockquote>

                <cite class="mouseFollow" data-twist-factor="1.2">Scott Osburn - Lights All Night, Dallas</cite>
            </div>

            <div class='segment'>
                <blockquote class="mouseFollow" data-twist-factor="3">SBeing able to have confidence in your web team is a major win for us. We've worked with several companies over the years. A lot of times our vision just hasn't been translated the way we wanted. And that is simply due to the fact that the other teams just didn't have the expertise or creative ability that PS does."</blockquote>

                <cite class="mouseFollow" data-twist-factor="2.2">Scott Osburn - Lights All Night, Dallas</cite>
            </div>

            <div class='segment'>
                <blockquote class="mouseFollow" data-twist-factor="1.3">SBeing able to have confidence in your web team is a major win for us. We've worked with several companies over the years. A lot of times our vision just hasn't been translated the way we wanted. And that is simply due to the fact that the other teams just didn't have the expertise or creative ability that PS does."</blockquote>

                <cite class="mouseFollow" data-twist-factor="1.2">Scott Osburn - Lights All Night, Dallas</cite>
            </div>

            <div class='segment'>
                <blockquote class="mouseFollow" data-twist-factor="3">SBeing able to have confidence in your web team is a major win for us. We've worked with several companies over the years. A lot of times our vision just hasn't been translated the way we wanted. And that is simply due to the fact that the other teams just didn't have the expertise or creative ability that PS does."</blockquote>

                <cite class="mouseFollow" data-twist-factor="2.2">Scott Osburn - Lights All Night, Dallas</cite>
            </div>
           

        </div>

    </div>

    <?php get_template_part('templates/parts/get-in-touch') ?>

</div>

<div class="grainWrap">

    <div class="grainWrap--grain">

    </div>

</div>