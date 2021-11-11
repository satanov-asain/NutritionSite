function menuCards(){
     //ИСПОЛЬЗОВАНИЕ КЛАССОВ ДЛЯ СОЗДАНИЯ МЕНЮ-КАРТ

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
            <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.changeToTenge()}</span> тенге/день</div>
                </div>
            </div>`;
            this.parent.append(cardElement);
        }
    }
     async function getMenuCard(url){
        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`Данные с ${url} не приняты. Статус - ${res.status}`);
        }
        return await res.json();
     }

     getMenuCard('http://localhost:3000/menu')
     .then(dataSeries=>{
         dataSeries.forEach(({img,altimg,title,descr,price})=>{
            new MenuCard(img,altimg,title,descr,price,'.menu__field div').renderMenu();
         });
     });
    // new MenuCard("img/tabs/vegy.jpg",
    //  "vegy",
    //  '"Фитнес"',
    //  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //  229,
    //  '.menu__field div'
    //  ).renderMenu();
    // new MenuCard("img/tabs/elite.jpg",
    // "elite",
    // '“Премиум”',
    // 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',550,
    // '.menu__field div'
    // ).renderMenu();
    // new MenuCard("img/tabs/post.jpg",
    // "post",
    // '"Постное"',
    // 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    // 430,
    // '.menu__field div'
    // ).renderMenu();

}

module.exports=menuCards;