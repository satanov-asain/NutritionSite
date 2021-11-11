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
export default modal;
export {openModal,closeModal};