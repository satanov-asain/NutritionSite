/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator(){
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");


function forms(modalTimerId,modalSelector,modalDialogSelector){
    /* ???????????????? ?????????? ???? ???????????? ?? Fetch API. With SVG */

    const forms = document.querySelectorAll('form');
    const message = {
        success: '??????????????. ???? ???????????????? ?? ???????? ?? ?????????????????? ??????????',
        loading: 'img/form/spinner.svg',
        failure: '?????????????????? ??????????????'
    };

    forms.forEach(form => {
        postData(form);
    });
    

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
            const myJSON = JSON.stringify(Object.fromEntries(myFormData.entries()));
            
            (0,_services_services_js__WEBPACK_IMPORTED_MODULE_1__.sendData)('http://localhost:3000/requests',myJSON)
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
        const prevModal=document.querySelector(modalDialogSelector);
        prevModal.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalTimerId,modalSelector);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add(modalDialogSelector.slice(1));
        thanksModal.innerHTML=`
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>   
        </div>
        `;
        document.querySelector(modalSelector).append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModal.classList.remove('hide');
            prevModal.classList.add('show');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
        },4000);

    }    
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/menuCards.js":
/*!*********************************!*\
  !*** ./js/modules/menuCards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");

function menuCards(parentSelector){
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
    

     (0,_services_services_js__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
     .then(dataSeries=>{
         dataSeries.forEach(({img,altimg,title,descr,price})=>{
            new MenuCard(img,altimg,title,descr,price,parentSelector).renderMenu();
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

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuCards);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
function openModal(modalTimerId,modalSelector) {
    const modalLocal=document.querySelector(modalSelector);
    modalLocal.classList.add('show');
    modalLocal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
}
function closeModal(modalSelector) {
    const modalLocal=document.querySelector(modalSelector);
    modalLocal.classList.remove('show');
    modalLocal.classList.add('hide');
    document.body.style.overflow = '';
} 
function modal(modalTimerId,modalSelector,modalTriggerSelector) {
    //M O D A L

    const modalTrigger = document.querySelectorAll(modalTriggerSelector),
        modal = document.querySelector(modalSelector);
    

   
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', ()=>{openModal(modalTimerId,modalSelector);});
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalTimerId,modalSelector);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({eachSlideSelector,sliderSelector,arrowPrevSelector,arrowNextSelector,totalCounterSelector,currentCounterSelector,wrapperSelector,fieldSelector,slideIndex}){
    // SLIDER VERSION DYNAMIC

    
    let offset = 0;

    const slides = document.querySelectorAll(eachSlideSelector),
        slider = document.querySelector(sliderSelector),
        prev = document.querySelector(arrowPrevSelector),
        next = document.querySelector(arrowNextSelector),
        total = document.querySelector(totalCounterSelector),
        current = document.querySelector(currentCounterSelector),
        slidesWrapper = document.querySelector(wrapperSelector),
        slidesField = document.querySelector(fieldSelector),
        widthReal = window.getComputedStyle(slidesWrapper).width;


    function isCurrentZero() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }
    }

    function dotActive(slideIndex) {
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
        slide.style.width = widthReal;
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
        if (offset == strToNum(widthReal) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += strToNum(widthReal);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        changeSlideIndex('+');
        isCurrentZero();
        dotActive(slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = strToNum(widthReal) * (slides.length - 1);
        } else {
            offset -= strToNum(widthReal);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        changeSlideIndex('-');
        isCurrentZero();
        dotActive(slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = (slideIndex - 1) * strToNum(widthReal);
            slidesField.style.transform = `translateX(-${offset}px)`;
            dotActive(slideIndex);
            isCurrentZero();

        });
    });
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs({tabsItemSelector,tabsContentSelector,tabsParentSelector,tabsActiveSelector}) {
    // Tabs

    let tabs = document.querySelectorAll(tabsItemSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(tabsActiveSelector.slice(1));
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(tabsActiveSelector.slice(1));
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains(tabsItemSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function  timer(timerSelector,deadline){
    //TIMER
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
    setClock(timerSelector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendData": () => (/* binding */ sendData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
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
async function getResource(url){
    const res = await fetch(url);
    if (!res.ok){
        throw new Error(`???????????? ?? ${url} ???? ??????????????. ???????????? - ${res.status}`);
    }
    return await res.json();
 }


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_menuCards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/menuCards */ "./js/modules/menuCards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");










window.addEventListener('DOMContentLoaded', function () {
    const modalTimerId = setTimeout(_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal, 30000);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])({
        tabsItemSelector: '.tabheader__item',
        tabsContentSelector: '.tabcontent',
        tabsParentSelector: '.tabheader__items',
        tabsActiveSelector: '.tabheader__item_active'
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', "2021-11-15");
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_1__["default"])(modalTimerId, '.modal', '.modal__dialog');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])(modalTimerId, '.modal', '[data-modal]');
    (0,_modules_menuCards__WEBPACK_IMPORTED_MODULE_4__["default"])('.menu__field div');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        eachSlideSelector: '.offer__slide',
        sliderSelector: '.offer__slider',
        arrowPrevSelector: '.offer__slider-prev',
        arrowNextSelector: '.offer__slider-next',
        totalCounterSelector: '#total',
        currentCounterSelector: '#current',
        wrapperSelector: '.offer__slider-wrapper',
        fieldSelector: '.offer__slider-inner',
        slideIndex:1
    });
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map