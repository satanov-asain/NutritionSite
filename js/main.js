import tabs from './modules/tabs';
import forms from './modules/forms';
import timer from './modules/timer';
import modal from './modules/modal';
import menuCards from './modules/menuCards';
import slider from './modules/slider';
import calculator from './modules/calculator';

window.addEventListener('DOMContentLoaded', function () {
    tabs();
    timer();
    forms();
    modal();
    menuCards();
    slider();
    calculator();
});