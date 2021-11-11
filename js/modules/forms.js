function forms(){
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
}
module.exports=forms;