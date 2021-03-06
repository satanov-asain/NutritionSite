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
        modal = document.querySelector('.modal');
    const modalTimerId = setTimeout(openModal, 30000);

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
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal||e.target.getAttribute('data-close')=='') {
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

    //?????????????????????????? ?????????????? ?????? ???????????????? ????????-????????

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.course = 200;
            this.changeToTenge();
        }

        changeToTenge() {
            return (this.price * this.course);
        }

        renderMenu() {
            const cardElement = document.createElement('div');
            cardElement.innerHTML = ` 
            <div class="menu__item"><img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">???????? ${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">????????:</div>
                    <div class="menu__item-total"><span>${this.changeToTenge()}</span> ??????????/????????</div>
                </div>
            </div>`;
            this.parent.append(cardElement);
        }
    }
     async function getMenuCard(url){
        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`???????????? ?? ${url} ???? ??????????????. ???????????? - ${res.status}`);
        }
        return await res.json();
     }

     getMenuCard('http://localhost:3000/menu')
     .then(dataSeries=>{
         dataSeries.forEach(({img,altimg,title,descr,price})=>{
            new MenuCard(img,altimg,title,descr,price,'.menu__field div').renderMenu();
         });
     });
    // new MenuCard("img/tabs/vegy.jpg",
    //  "vegy",
    //  '"????????????"',
    //  '???????? "????????????" - ?????? ?????????? ???????????? ?? ?????????????????????????? ????????: ???????????? ???????????? ???????????? ?? ??????????????. ?????????????? ???????????????? ?? ???????????????? ??????????. ?????? ?????????????????? ?????????? ?????????????? ?? ?????????????????????? ?????????? ?? ?????????????? ??????????????????!',
    //  229,
    //  '.menu__field div'
    //  ).renderMenu();
    // new MenuCard("img/tabs/elite.jpg",
    // "elite",
    // '????????????????????',
    // '?? ???????? ???????????????????? ???? ???????????????????? ???? ???????????? ???????????????? ???????????? ????????????????, ???? ?? ???????????????????????? ???????????????????? ????????. ?????????????? ????????, ????????????????????????, ???????????? - ?????????????????????? ???????? ?????? ???????????? ?? ????????????????!',550,
    // '.menu__field div'
    // ).renderMenu();
    // new MenuCard("img/tabs/post.jpg",
    // "post",
    // '"??????????????"',
    // '???????? ???????????????????? - ?????? ???????????????????? ???????????? ????????????????????????: ???????????? ???????????????????? ?????????????????? ?????????????????? ??????????????????????????, ???????????? ???? ??????????????, ????????, ???????????? ?????? ????????????, ???????????????????? ???????????????????? ???????????? ???? ???????? ???????? ?? ?????????????????? ???????????????????????????? ??????????????.',
    // 430,
    // '.menu__field div'
    // ).renderMenu();

    /* //This ???????????????? ???????????? - ???????????? ???????????? ?????????????? ?? ??????????????(???????????????? ?????????????? ?????? ?????????????????? ?? ??????????????)
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


    // REST ????????????????
    function assa(a,b, ...rest){
        console.log( a, b, rest);
    }
    assa('SU students ','are ','satanov','ptuSHkin','skok'); */

    /* ???????????????? ?????????? ???? ???????????? ?? XMLHttpRequest. ?????? SVG */

    const forms = document.querySelectorAll('form');
    const message = {
        success: '??????????????. ???? ???????????????? ?? ???????? ?? ?????????????????? ??????????',
        loading: 'img/form/spinner.svg',
        failure: '?????????????????? ??????????????'
    };

    forms.forEach(form => {
        postData(form);
    });
    
    async function sendData(url, data){
        const res=await fetch(url, {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:data
        });
        return await res.json();
    }

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const loadingMessage = document.createElement('img');
            loadingMessage.src=message.loading;
            loadingMessage.style.cssText= `
            display:block;
            margin: 0 auto;
            `; 
            form.append(loadingMessage); 

            const myFormData = new FormData(form);
            const tempObj = {};
            myFormData.forEach((value, key) => {
                tempObj[key] = value;
            });
            const myJSON = JSON.stringify(tempObj);
            
            sendData('http://localhost:3000/requests',myJSON)
                .then(response=>{
                    console.log(response);
                    showThanksModal(message.success);
                    loadingMessage.remove();
                }).catch(()=>{
                    showThanksModal(message.failure);
                }).finally(()=>{
                    form.reset();
                });
        });
    }

    function showThanksModal(message){
        const prevModal=document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML=`
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>   
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModal.classList.remove('hide');
            prevModal.classList.add('show');
            closeModal();
        },4000);

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
        width = window.getComputedStyle(slidesWrapper).width;


    function isCurrentZero() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }
    }

    function dotActive() {
        dots.forEach(dot => dot.style.opacity = 0.5);
        dots[slideIndex - 1].style.opacity = 1;
    }

    function changeSlideIndex(operator) {
        switch (operator) {
            case '+':
                if (slideIndex == slides.length) {
                    slideIndex = 1;
                } else {
                    slideIndex++;
                }
                break;
            case '-':
                if (slideIndex == 1) {
                    slideIndex = slides.length;
                } else {
                    slideIndex--;
                }
                break;
        }
        return slideIndex;
    }

    function strToNum(str) {
        const Num = Number(str.replace(/\D/ig, ''));
        return Num;
    }

    slides.forEach(slide => {
        slide.style.width = width;
    });
    slider.style.position = 'relative';

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '1s all';

    slidesWrapper.style.overflow = 'hidden';

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = `${slides.length}`;
        current.textContent = `${slideIndex}`;
    }
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == strToNum(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += strToNum(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        changeSlideIndex('+');
        isCurrentZero();
        dotActive();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = strToNum(width) * (slides.length - 1);
        } else {
            offset -= strToNum(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        changeSlideIndex('-');
        isCurrentZero();
        dotActive();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = (slideIndex - 1) * strToNum(width);
            slidesField.style.transform = `translateX(-${offset}px)`;
            dotActive();
            isCurrentZero();

        });
    });

    // CALCULATOR DIET

    const resultCalories = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            resultCalories.textContent = '____';
            return;
        } else {
            switch (sex) {
                case 'female':
                    resultCalories.textContent = Math.round(ratio * (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)));
                    break;
                case 'male':
                    resultCalories.textContent = Math.round(ratio * (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)));
                    break;
            }
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +(e.target.getAttribute('data-ratio'));
                    localStorage.setItem('ratio', +(e.target.getAttribute('data-ratio')));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', (e) => {
            if (input.value.match(/\D/)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch (e.target.getAttribute('id')) {
                case 'height':
                    height = +e.target.value;
                    break;
                case 'weight':
                    weight = +e.target.value;
                    break;
                case 'age':
                    age = +e.target.value;
                    break;
            }
            calcTotal();
        });
    }

    function initialCalc(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initialCalc('#gender div', 'calculating__choose-item_active');
    initialCalc('.calculating__choose_big div', 'calculating__choose-item_active');
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    getDynamicInformation('#height');
    getDynamicInformation('#age');
    getDynamicInformation('#weight');



});