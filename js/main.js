window.addEventListener('DOMContentLoaded', function () {

    // Tabs

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //TIMER
    const deadline = "2021-12-07";

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / (1000)) % 60);
        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }
    const getZero = num => {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    };

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);



    //M O D A L

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');
    const modalTimerId = setTimeout(openModal, 3000);

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }
    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);



    /* //This КОНТЕКСТ ВЫЗОВА - ПРИМЕР СЦЕПКИ ОБЪЕКТА К ФУНКЦИИ(ПЕРЕДАЧА ОБЪЕКТА КАК АРГУМЕНТА В ФУНКЦИЮ)
    function greeting(eventParty){
        console.log(`Welcome Mr.${this.name} to ${this.city} city.
        Would you use ${this.language} for communication?
        Would you us to prepare a gift to your wife Ms.${this.wifeLady},
        because You goes ${eventParty}`);
    }

    const Bezuhoff={
        name:"Bezuhoff",
        city:"Saint-Petersbirg",
        language:"Russian",
        wifeLady:"Rostova"
    };const Usmanov={
        name:"Usmanov",
        city:"Tashkent",
        language:"Uzbek",
        wifeLady:"Vinner"
    };

    const myGuest1=greeting.bind(Bezuhoff);
    myGuest1("Bolkonsky's bitrhday");
    const myGuest2=greeting.bind(Usmanov);
    myGuest2("Kabaeva's wedding");
    console.log(' //////////////////////////////////');
    greeting.call(Bezuhoff,"Bolkonsky's bitrhday");
    greeting.call(Usmanov,["Kabaeva's wedding"]);


    // REST оператор
    function assa(a,b, ...rest){
        console.log( a, b, rest);
    }
    assa('SU students ','are ','satanov','ptuSHkin','skok'); */

    /* ОТПРАВКА ФОРМЫ НА СЕРВЕР С XMLHttpRequest. Без SVG */

    const forms = document.querySelectorAll('form');
    const message = {
        success: 'Успешно отправлено',
        loading: 'В Загрузке. Жди',
        failure: 'Неудачная попытка'
    };

    forms.forEach(form => {
        postData(form);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json');
            const myFormData = new FormData(form);
            const tempObj = {};
            myFormData.forEach((value, key) => {
                tempObj[key] = value;
            });
            const myJSON = JSON.stringify(tempObj);
            request.send(myJSON);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();

                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }

    //SLIDER

    // // SLIDER VERSION STATIC

    // let slideIndex = 1;

    // const slides = document.querySelectorAll('.offer__slide'),
    //     prev   = document.querySelector('.offer__slider-prev'),
    //     next   = document.querySelector('.offer__slider-next'),
    //     total = document.querySelector('#total'),
    //     current = document.querySelector('#current');

    // showSlides(slideIndex);

    // if(slides.length<10){
    //     total.textContent=`0${slides.length}`;
    // } else{
    //     total.textContent=`${slides.length}`;
    // }



    // function showSlides(n){
    //     if(n>slides.length){
    //         slideIndex=1;
    //     }
    //     if (n<1){
    //         slideIndex=slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideIndex-1].style.display='block';

    //     if(slides.length<10){
    //         current.textContent=`0${slideIndex}`;
    //     } else{
    //         current.textContent=`${slideIndex}`;
    //     }
    // }

    // function changeIndex(n){
    //     showSlides(slideIndex+=n);
    // }

    // prev.addEventListener('click',()=>{
    //     changeIndex(-1);
    // });

    // next.addEventListener('click',()=>{
    //     changeIndex(1);
    // }); 

    // SLIDER VERSION DYNAMIC

    let slideIndex = 1;
    let offset = 0;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        widthCSS = window.getComputedStyle(slidesWrapper).width,
        width = +widthCSS.slice(0, widthCSS.length - 2);

    slides.forEach(slide => {
        slide.style.width = widthCSS;
    });
    slider.style.position = 'relative';

    slidesField.style.width = 100 * slides.length + '%';

    slidesField.style.display = 'flex';
    slidesField.style.transition = '1s all';

    slidesWrapper.style.overflow = 'hidden';

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for ( let i = 0 ; i < slides.length ; i++ ) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = `${slides.length}`;
        current.textContent = `${slideIndex}`;
    }

    next.addEventListener('click', () => {
        if (offset == width * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += width;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }
        dots.forEach(dot => dot.style.opacity = 0.5);
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = width * (slides.length - 1);
        } else {
            offset -= width;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }
        dots.forEach(dot => dot.style.opacity = 0.5);
        dots[slideIndex - 1].style.opacity = 1;
    });

 

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = (slideIndex - 1) * width;
            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = 0.5);
            dots[slideIndex - 1].style.opacity = 1;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = `${slideIndex}`;
            }

        });
    });
});