import tabs from './modules/tabs';
import forms from './modules/forms';
import timer from './modules/timer';
import modal from './modules/modal';
import menuCards from './modules/menuCards';
import slider from './modules/slider';
import calculator from './modules/calculator';

import {
    openModal
} from './modules/modal';

window.addEventListener('DOMContentLoaded', function () {
    const modalTimerId = setTimeout(openModal, 30000);
    tabs({
        tabsItemSelector: '.tabheader__item',
        tabsContentSelector: '.tabcontent',
        tabsParentSelector: '.tabheader__items',
        tabsActiveSelector: '.tabheader__item_active'
    });
    timer('.timer', "2021-11-15");
    forms(modalTimerId, '.modal', '.modal__dialog');
    modal(modalTimerId, '.modal', '[data-modal]');
    menuCards('.menu__field div');
    slider({
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
    calculator();
});