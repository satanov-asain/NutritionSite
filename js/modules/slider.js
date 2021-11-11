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

export default slider;