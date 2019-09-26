/*
 * Denne fil kalder en funktion i filen start.js, der ligger i library-mappen, 
 * og som I ikke skal ændre ved i denne opgave. Til gengæld kunne man forestille 
 * sig at der her blev indsat et
 */

class realClock{
    now(){
        return new Date();
    }
}

class fakeClock{
    constructor(){
        this.time = new Date();
    }
}

class cityPriceStrategy{
    calculatePrice(afstand, tidGaaet){
        var price = (8.5 * (afstand)) + (6.25 * tidGaaet + 72);
        console.log(price);
        if(price < 75){
            return 75;
        }else{
            return price;
        }
    }
    
}


var clock = new realClock();
start(new Taxameter(clock, new cityPriceStrategy()));