(function () {

    var Testimonials,
        Flickity = require('flickity')

    Testimonials = {
        dom: {
            container : document.querySelector('.JS--testimonials'),
        },

        init: () => {
            
            if(Testimonials.dom.container && Testimonials.dom.container.children.length > 1)
                Testimonials.createCarousel()
                
            
        },

        createCarousel: () => {

            const settings = {
                cellAlign    : 'center',            
                wrapAround   : true,
                autoPlay     : false,
                imagesLoaded : true,
                pageDots     : false
            }

            new Flickity(Testimonials.dom.container, settings)

        }


    }

    module.exports = Testimonials

}())
