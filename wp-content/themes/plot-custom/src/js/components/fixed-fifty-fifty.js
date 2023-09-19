const { gsap } = require("gsap/dist/gsap");
const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");

gsap.registerPlugin(ScrollTrigger);

const fixedFiftyFifties = document.querySelectorAll('.fixedFiftyFifty');

const slideTimeline = (textContent, image, indicator, isLast) =>{
    let tl = gsap.timeline();
    tl.to(textContent, {opacity:1, zIndex:1})
    tl.to(image, {opacity:1, zIndex:1}, '<')
    tl.to(indicator, {backgroundColor:'pink', duration:0}, '<')

    if(!isLast){
        tl.to(textContent, {opacity:0, zIndex:0})
        tl.to(image, {opacity:0, zIndex:0}, '<')
        tl.to(indicator, {backgroundColor:'grey', duration:0})
    }

    return tl;
}

if(fixedFiftyFifties && fixedFiftyFifties.length){
    fixedFiftyFifties.forEach(fixedFiftyFifty=>{
        let textContent = fixedFiftyFifty.querySelectorAll('.textContent');
        let images = fixedFiftyFifty.querySelectorAll('.fixedFiftyFifty__imageWrap');
        let indicators = fixedFiftyFifty.querySelectorAll('.fiftyFifty__indicators span');

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger:fixedFiftyFifty,
                start:"top top",
                scrub:true,
                pin:true,
                end:()=>{
                    return "+=" + (textContent.length * fixedFiftyFifty.offsetHeight) + 'px'
                },
                // markers:true
            }
        });

        textContent.forEach((tc, i)=>{
            tl.add(slideTimeline(tc, images[i], indicators[i], i == textContent.length - 1));
        })
        
    })
}