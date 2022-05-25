(function () {

    var Pricing

    Pricing = {
        dom: {
            container        : document.querySelector('.JS--TogglePrice'),
            annualButton     : document.querySelector('.JS--planToggle--annual'),
            monthlyButton    : document.querySelector('.JS--planToggle--monthly'),
            currencySymbols  : Array.from(document.querySelectorAll('.JS--currency')),
            priceAnnual      : document.querySelector('.JS--price--annual'),
            priceMonthly     : document.querySelector('.JS--price--monthly'),
            annualTotalPrice : document.querySelector('.JS--annualTotal')
        },

        init: () => {

            // Update price if user is based in the US
            Pricing.checkUsersCountry()

            // Update data set with 
            Pricing.dom.annualButton.addEventListener('click', Pricing.showAnnual)

            Pricing.dom.monthlyButton.addEventListener('click', Pricing.showMonthly)
            
        },

        showAnnual: () => {
            
            if(Pricing.dom.container.dataset.plan = "annual") 
                return;

            Pricing.dom.container.dataset.plan = "annaul"
        },

        showMonthly: () => {
            if(Pricing.dom.container.dataset.plan = "monthly") 
                return;

            Pricing.dom.container.dataset.plan = "monthly"
        },

        checkUsersCountry: () => {
            
            fetch('https://api.ipregistry.co/?key=bp1l88lcp678q96z')
                .then(res => res.json())
                .then(payload => {
                    
                    if(payload.location.continent.code == 'US') {

                        // Switch to dollar
                        Pricing.dom.currencySymbols.map(symbol => symbol.textContent = '$')

                        Pricing.dom.priceMonthly.textContent = '400'

                        Pricing.dom.priceAnnual.textContent = '333'

                        Pricing.dom.annualTotalPrice.textContent = '$4000'
                    }

                })
                .catch(err => console.log(err))

        }


    }

    module.exports = Pricing

}())
