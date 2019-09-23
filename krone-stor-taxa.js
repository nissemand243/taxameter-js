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

class kroneStorPriceStrategy{
    calculatePrice(afstand, tidGaaet){
        return (12 * (afstand)) + (6.67 * tidGaaet + 69);
    }
}


var clock = new realClock();
start(new Taxameter(clock, new kroneStorPriceStrategy()));