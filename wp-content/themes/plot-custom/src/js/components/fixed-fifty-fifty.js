const { gsap } = require("gsap/dist/gsap");
const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");
const Flickity = require('flickity');

gsap.registerPlugin(ScrollTrigger);

const fixedFiftyFifties = document.querySelectorAll('.fixedFiftyFifty');

const slideTimeline = (textContent, image, indicator, isLast, isFirst) =>{
    let tl = gsap.timeline();
    if(!isFirst){
        tl.fromTo(image, {y:'100%'}, {y:'0', duration:3})
        tl.to(indicator, {backgroundColor:'var(--strong-pink)', duration:0}, '<.25')
        tl.to(textContent, {opacity:1, zIndex:1, duration:1}, '<.5')
    } 
    

    if(!isLast){
        tl.to(textContent, {opacity:0, zIndex:0, duration:2}, "+=1.5")
        tl.to(indicator, {backgroundColor:'var(--grey)', duration:0}, '<1')
    } else {
        //so there is a pause at the end
        tl.to(textContent, {opacity:1, zIndex:1, duration:1}, '+=1')
    }

    return tl;
}

if(fixedFiftyFifties && fixedFiftyFifties.length){
    fixedFiftyFifties.forEach(fixedFiftyFifty=>{
        let fiftyFiftyDesktopInner = fixedFiftyFifty.querySelector('.fixedFiftyFifty__inner--desktop')
        let textContent = fiftyFiftyDesktopInner.querySelectorAll('.textContent');
        let images = fiftyFiftyDesktopInner.querySelectorAll('.fixedFiftyFifty__imageWrap');
        let indicators = fiftyFiftyDesktopInner.querySelectorAll('.fiftyFifty__indicators span');

        let mediaQuery = gsap.matchMedia();
        mediaQuery.add("(min-width: 1024px)", ()=>{
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger:fixedFiftyFifty,
                    start:"top top",
                    scrub:.3,
                    // onEnter, onLeave, onEnterBack, and onLeaveBack
                    // toggleActions: "play pause reverse pause",
                    pin:true,
                    end:()=>{
                        return "+=" + (textContent.length * fixedFiftyFifty.offsetHeight) * 2.5 + 'px'
                    },
                    // markers:true
                }
        });

            // let indicatorsTimeline = gsap.timeline();
            // // indicatorsTimeline.to(indicators[0], {backgroundColor:'pink', duration:0});
            // indicatorsTimeline.to(indicators[0], {backgroundColor:'grey', duration:0}, '+=4');
            // indicatorsTimeline.to(indicators[1], {backgroundColor:'pink', duration:0});
            // indicatorsTimeline.to(indicators[1], {backgroundColor:'grey', duration:0}, '+=4');
            // indicatorsTimeline.to(indicators[2], {backgroundColor:'pink', duration:0});
    
            textContent.forEach((tc, i)=>{
                tl.add(slideTimeline(tc, images[i], indicators[i], i == textContent.length - 1, i == 0), i > 0 ? '-=0.9' : '<');
            })
        })

        let fixedFiftyFiftyMobileInner = fixedFiftyFifty.querySelector('.fixedFiftyFifty__inner--mobile');

        const settings = {            
            wrapAround      : false,
            autoPlay        : false,
            imagesLoaded    : true,
            pageDots        : false,
            prevNextButtons : false,  
            contain         : true,                                          
            cellAlign       : 'left', 
            watchCSS: true                                                                         
        }    
        
        const flkty = new Flickity(fixedFiftyFiftyMobileInner, settings);

        fixedFiftyFifty.querySelector('[data-carousel-prev]').addEventListener('click', (e) => {   
            e.preventDefault();                     
            flkty.previous()
        })

        fixedFiftyFifty.querySelector('[data-carousel-next]').addEventListener('click', (e) => {
            e.preventDefault();                     
            flkty.next()
        })
        
    })
}


