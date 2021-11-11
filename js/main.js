window.addEventListener('DOMContentLoaded', function () {
    const tabs=require('./modules/tabs'),
    forms=require('./modules/forms'),
    timer=require('./modules/timer'),
    modal=require('./modules/modal'),
    menuCards=require('./modules/menuCards'),
    slider=require('./modules/slider'),
    calculator=require('./modules/calculator');
 

    tabs();
    timer();
    forms();
    modal();
    menuCards();
    slider();
    calculator();
});