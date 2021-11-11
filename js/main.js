import tabs from './modules/tabs';
import forms from './modules/forms';
import timer from './modules/timer';
import modal from './modules/modal';
import menuCards from './modules/menuCards';
import slider from './modules/slider';
import calculator from './modules/calculator';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function () {
    const modalTimerId = setTimeout(openModal, 30000);
    tabs();
    timer();
    forms(modalTimerId,'.modal');
    modal(modalTimerId,'.modal');
    menuCards();
    slider();
    calculator();
});