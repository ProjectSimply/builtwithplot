const { gsap } = require("gsap/dist/gsap");
const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");
gsap.registerPlugin(ScrollTrigger);

let mediaQuery = gsap.matchMedia();
mediaQuery.add("(min-width: 1024px)", ()=>{

    let tl = gsap.timeline();

    tl.fromTo(".spotlights__asset", {
        opacity:0,

    }, {
        duration: 0.5,
        stagger:0.2,
        opacity:1

    })

    tl.fromTo(".spotlights__asset", {
        scale:0.5,
    }, {
        duration: 1,
        scale:1,
        stagger:0.2,
    }, '<')
});
