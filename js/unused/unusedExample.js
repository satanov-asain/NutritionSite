  /* //This КОНТЕКСТ ВЫЗОВА - ПРИМЕР СЦЕПКИ ОБЪЕКТА К ФУНКЦИИ(ПЕРЕДАЧА ОБЪЕКТА КАК АРГУМЕНТА В ФУНКЦИЮ)
    function greeting(eventParty){
        console.log(`Welcome Mr.${this.name} to ${this.city} city.
        Would you use ${this.language} for communication?
        Would you us to prepare a gift to your wife Ms.${this.wifeLady},
        because You goes ${eventParty}`);
    }

    const Bezuhoff={
        name:"Bezuhoff",
        city:"Saint-Petersbirg",
        language:"Russian",
        wifeLady:"Rostova"
    };const Usmanov={
        name:"Usmanov",
        city:"Tashkent",
        language:"Uzbek",
        wifeLady:"Vinner"
    };

    const myGuest1=greeting.bind(Bezuhoff);
    myGuest1("Bolkonsky's bitrhday");
    const myGuest2=greeting.bind(Usmanov);
    myGuest2("Kabaeva's wedding");
    console.log(' //////////////////////////////////');
    greeting.call(Bezuhoff,"Bolkonsky's bitrhday");
    greeting.call(Usmanov,["Kabaeva's wedding"]);


    // REST оператор
    function assa(a,b, ...rest){
        console.log( a, b, rest);
    }
    assa('SU students ','are ','satanov','ptuSHkin','skok'); */


    