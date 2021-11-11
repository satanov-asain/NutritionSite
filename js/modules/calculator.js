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
module.exports=calculator;