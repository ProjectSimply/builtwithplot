(function () {

    var CountdownTimer

    CountdownTimer = {
        
        dom: {
            countdownTimer: document.querySelector('.JS--countdownTimer')
        },
        addedToDom : false,
        releaseMonth : '',
        releaseDay : '',
        releaseHour : '',
        releaseMinute : '',
        releaseDate : '',
        periodicStartDate : '',
        periodicEndDate : '',
        periodicFrequency : '',
        customNextDate : '',
        countdownInterval : '',

        init: () => {
            if(CountdownTimer.dom.countdownTimer){
                CountdownTimer.releaseMonth =  CountdownTimer.dom.countdownTimer.dataset.month ? 
                                                CountdownTimer.dom.countdownTimer.dataset.month : 11;
                CountdownTimer.releaseDay =  CountdownTimer.dom.countdownTimer.dataset.day ?
                                                CountdownTimer.dom.countdownTimer.dataset.day : 28;
                CountdownTimer.releaseHour = CountdownTimer.dom.countdownTimer.dataset.hour ? 
                                                CountdownTimer.dom.countdownTimer.dataset.hour : 11;
                CountdownTimer.releaseMinute = CountdownTimer.dom.countdownTimer.dataset.minutes ? 
                                                CountdownTimer.dom.countdownTimer.dataset.minutes : 59;
                CountdownTimer.periodicStartDate = CountdownTimer.dom.countdownTimer.dataset.periodicStartDate ? CountdownTimer.dom.countdownTimer.dataset.periodicStartDate :
                                             null;
                CountdownTimer.periodicEndDate = CountdownTimer.dom.countdownTimer.dataset.periodicEndDate ? CountdownTimer.dom.countdownTimer.dataset.periodicEndDate :
                null;
                CountdownTimer.periodicFrequency = CountdownTimer.dom.countdownTimer.dataset.periodicFrequency ? CountdownTimer.dom.countdownTimer.dataset.periodicFrequency :
                null;
                CountdownTimer.customNextDate = CountdownTimer.dom.countdownTimer.dataset.customNextDate ? CountdownTimer.dom.countdownTimer.dataset.customNextDate :
                null;
            }

            CountdownTimer.initCountdownTimer()        
            
        }, 

        isValidDateTime : (dateTimeString) => {
            const parsedDate = Date.parse(dateTimeString);
            return !isNaN(parsedDate) && !isNaN(Date.parse(new Date(parsedDate).toISOString()));
        },

        initCountdownTimer : () => {

            function startCountdown() {
    
                const targetDateTime = CountdownTimer.customNextDate ? new Date(CountdownTimer.customNextDate) : CountdownTimer.getNextDate(CountdownTimer.periodicStartDate, CountdownTimer.periodicFrequency);
                CountdownTimer.countdownInterval = setInterval(updateCountdown, 1000);
    
                function updateCountdown() {
                    const currentTime = new Date();
                    const timeDifference = targetDateTime - currentTime;
    
                    if (timeDifference <= 0 || (CountdownTimer.periodicEndDate && new Date(CountdownTimer.periodicEndDate) < currentTime) || (CountdownTimer.periodicEndDate && new Date(CountdownTimer.periodicEndDate) < targetDateTime)) {
                        
                        CountdownTimer.setTimerToZero();

                        return;
                    }
    
                    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
                    const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                    let togglePlural = (unit, elem)=>{
                        let plural = elem.parentNode.querySelector('.countdownTimer__unitPlural');
                        if(unit !== 1){
                            plural.classList.remove('hide');
                        } else if(!plural.classList.contains('hide')){
                            plural.classList.add('hide');
                        }
                    }
    
                    document.getElementById('months').innerText = months < 10 ? `0${months}` : months,
                    document.getElementById('days').innerText = days < 10 ? `0${days}` : days,
                    document.getElementById('hours').innerText = hours < 10 ? `0${hours}` : hours,
                    document.getElementById('minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;

                    togglePlural(months, document.getElementById('months'));
                    togglePlural(days, document.getElementById('days'));
                    togglePlural(hours, document.getElementById('hours'));
                    togglePlural(minutes, document.getElementById('minutes'));
                    
                }
            }

            if(
                (CountdownTimer.periodicStartDate && CountdownTimer.isValidDateTime(CountdownTimer.periodicStartDate)) || 
                (CountdownTimer.customNextDate && CountdownTimer.isValidDateTime(CountdownTimer.customNextDate))
            ){
                startCountdown();
            }
            
        },

        setTimerToZero : ()=>{
            clearInterval(CountdownTimer.countdownInterval);
            document.getElementById('months').innerText = '00',
            document.getElementById('days').innerText = '00',
            document.getElementById('hours').innerText = '00',
            document.getElementById('minutes').innerText = '00';
            // document.getElementById('seconds').innerText = '0';
        },
        

        getNextDate : (periodicStartDate, periodicFrequency) => {
            const currentDate = new Date();
            const currentDay = currentDate.getDate();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            const currentHour = currentDate.getHours();
            const currentMinute = currentDate.getMinutes();

            let nextDate = '';
            let nextMonth;

            if(new Date(periodicStartDate) > currentDate ){
                nextDate = new Date(periodicStartDate);
            } else if(periodicStartDate && periodicFrequency == 'monthly'){

                nextDate = new Date(periodicStartDate);
                nextDate.setMonth(currentMonth);

                if (currentDay > nextDate.getDate() || 
                    (currentDay === nextDate.getDate() 
                        && (currentHour > nextDate.getHours() || (currentHour === nextDate.getHours() && currentMinute >= nextDate.getMinutes())))) {

                    nextMonth = (currentMonth + 1) % 12; // Wrap to January if December
                    nextDate.setMonth(nextMonth)

                    if (nextMonth === 0) {
                        nextDate.setYear(currentYear + 1);
                    }
                }

            } else if(periodicStartDate && periodicFrequency == 'every-other-month') {
                let startDateMonth = new Date(periodicStartDate).getMonth();

                function getNextOccurrence(startMonth, increment) {
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    const currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed in JavaScript (0 = January, 1 = February, ...)
                
                    let nextMonth = startMonth;
                
                    // Calculate the number of months between the current month and the start month
                    const monthsUntilNextOccurrence = (12 + nextMonth - currentMonth) % 12;
                
                    // Calculate the number of months to add for the next occurrence
                    const monthsToAdd = (monthsUntilNextOccurrence >= 1) ? increment : 1;
                
                    // Calculate the next month
                    nextMonth = (nextMonth + monthsToAdd) % 12;
                    if (nextMonth === 0) nextMonth = 12; // Handle December
                
                    let nextDate = new Date(currentYear, nextMonth - 1, 1);
                
                    while (nextDate.getMonth() < currentDate.getMonth()) {
                        nextDate.setMonth(nextDate.getMonth() + increment);
                    }
                
                    return nextDate.getMonth(); // Months are 0-indexed
                }

                nextDate = new Date(periodicStartDate);
                nextDate.setMonth(getNextOccurrence(startDateMonth + 1, 3));

                if(currentMonth === nextDate.getMonth()){
                    if (currentDay > nextDate.getDate() || 
                    (currentDay === nextDate.getDate() 
                        && (currentHour > nextDate.getHours() || (currentHour === nextDate.getHours() && currentMinute >= nextDate.getMinutes())))) {

                    nextMonth = (currentMonth + 2) % 12; // Wrap to January if December
                    nextDate.setMonth(nextMonth)

                    if (nextMonth === 0) {
                        nextDate.setYear(currentYear + 1);
                    }
                }
                }
            }
          
            return nextDate;
        }
          

    }

    module.exports = CountdownTimer

}())