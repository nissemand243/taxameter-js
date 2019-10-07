/*
 * Denne fil kalder en funktion i filen start.js, der ligger i library-mappen, 
 * og som I ikke skal ændre ved i denne opgave. Til gengæld kunne man forestille 
 * sig at der her blev indsat et
 */

class RealClock{
    now(){
        return new Date();
    }
}

class fakeClock{
    constructor(){
        this.time = new Date();
    }
}

class KronePriceStrategy{
    calculatePrice(afstand, tidGaaet){
        var price = (9 * Math.max(afstand-1, 0));
        var priceFoerstKm = (5 *Math.min(1, afstand));
        var prisTid = (6.25 * tidGaaet + 39);
        return price + priceFoerstKm + prisTid
    }
}


    const strategy = new KronePriceStrategy;
    const taxameter = new Taxameter(new RealClock(), strategy);
    const decoratorKrone = new DecoratorKrone(taxameter);
    const overlay = new DecoratorOverlay(decoratorKrone);
    start(overlay);
