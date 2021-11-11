import {openModal, closeModal} from './modal';
import {sendData} from '../services/services.js';
function forms(modalTimerId,modalSelector,modalDialogSelector){
    /* ОТПРАВКА ФОРМЫ НА СЕРВЕР С Fetch API. With SVG */

    const forms = document.querySelectorAll('form');
    const message = {
        success: 'Спасибо. Мы свяжемся с Вами в ближайщее время',
        loading: 'img/form/spinner.svg',
        failure: 'Неудачная попытка'
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
        const prevModal=document.querySelector(modalDialogSelector);
        prevModal.classList.add('hide');
        openModal(modalTimerId,modalSelector);
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
            closeModal(modalSelector);
        },4000);

    }    
}
export default forms;