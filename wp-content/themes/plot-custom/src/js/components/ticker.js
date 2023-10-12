const tickerBanners = document.querySelectorAll('.JS--plot-ticker');


if(tickerBanners && tickerBanners.length){

    tickerBanners.forEach(tickerBanner=>{

        let maxWindowWidth = window.matchMedia("(min-width: 639px)");

        let resetBanner = ()=> {
            tickerBanner.classList.remove('animate');
            let containers = tickerBanner.querySelectorAll('.ticker-container');
            let messages = containers[0].querySelectorAll('.message');

            if(containers[1]){
                containers[1].remove();
            }

            if(messages.length > 1){
                messages.forEach((msg, index)=>{
                    if(index > 0){
                        msg.remove()
                    }
                })
            }

            if(!maxWindowWidth.matches){
                setupBanner();
            }

        }

        let setupBanner = ()=>{
            let tickerContainer = tickerBanner.querySelector('.ticker-container');
            let message = tickerBanner.querySelector('.message');
            let messageWidth = message.offsetWidth;
            let bannerWidth = tickerBanner.offsetWidth;
            let howManyFit = Math.ceil(bannerWidth / messageWidth);

            if(howManyFit){
                for(let i = 0; i < howManyFit; i++){
                    let clone = message.cloneNode(true);
                    tickerContainer.appendChild(clone);
                }
                let clone = tickerContainer.cloneNode(true);
                tickerBanner.appendChild(clone);
                tickerBanner.classList.add('animate');

                tickerBanner.querySelectorAll('.ticker-container').forEach(el=>{
                    let speed = bannerWidth > 600 ? bannerWidth : 600;
                    el.style.animationDuration = speed / 15 + 's';
                });

            }
        }

        // tickerBanner.addEventListener('mouseenter', ()=>{
        //     let tickerContainer = tickerBanner.querySelectorAll('.ticker-container');
        //     tickerContainer.forEach(container=>{
        //         container.style.animationPlayState = 'paused';
        //     })
    
        // })
        // tickerBanner.addEventListener('mouseleave', ()=>{
        //     let tickerContainer = tickerBanner.querySelectorAll('.ticker-container');
        //     tickerContainer.forEach(container=>{
        //         container.style.animationPlayState = 'running';
        //     })
        // })


        if(!maxWindowWidth.matches){
            setupBanner(); 
        }

        let screenSize = window.innerWidth;

        window.addEventListener('resize', ()=>{
            if(window.innerWidth !== screenSize){
                screenSize = window.innerWidth;
                resetBanner();
            }
        })
    })

}  