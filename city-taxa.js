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

class CityPriceStrategy{
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


class DecoratorCity{
    constructor(taxameter){
        this.taxameter = taxameter;
        this.clock = new RealClock;
    }
    getStartetTidspunkt() {
        return this.taxameter.getStartetTidspunkt();
    }
    
    startTur() {
        return this.taxameter.startTur();
    }
    get minimumAfstandTilbage (){
        return 2 - this.afstand;
    }
    slutTur() {
        if(this.afstand < 2){
            alert(`Du har ikke kørt langt nok, du mangler at køre ${this.minimumAfstandTilbage} km`);
        }else{
            return this.taxameter.slutTur();
        }
    }
    
    get afstand(){
        return this.taxameter.afstand;
    }

    koer(delta_afst) {
        return this.taxameter.koer(delta_afst);
    }
    
    beregnPris() {
        return this.taxameter.beregnPris();
    }
}
const strategy = new CityPriceStrategy();
const taxameter = new Taxameter(new RealClock(), strategy);
const decoratorCity = new DecoratorCity(taxameter);
start(decoratorCity);