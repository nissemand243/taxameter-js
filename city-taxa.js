/*
 * Denne fil kalder en funktion i filen start.js, der ligger i library-mappen, 
 * og som I ikke skal ændre ved i denne opgave. Til gengæld kunne man forestille 
 * sig at der her blev indsat et
 */

 //klasse til en funktion, der kalder den eksakte tid
class RealClock{
    now(){
        return new Date();
    }
}

//City taxa's pris strategi
class CityPriceStrategy{
    calculatePrice(afstand, tidGaaet){
        var price = (4.5 * (Math.floor(afstand)+1) + (7 * tidGaaet + 72));
        console.log(price);
        if(price < 75){
            return 75;
        }else{
            return price;
        }
    }
    
}

//Decorator til city taxa
class DecoratorCity{
    //Constructor med mine parametre jeg kalder i decoratoren
    constructor(taxameter){
        this.taxameter = taxameter;
        this.clock = new RealClock;
    }
    //Kalder getStartetTidspunkt uændret
    getStartetTidspunkt() {
        return this.taxameter.getStartetTidspunkt();
    }
        //Funktionen startTur kaldes uændret
    startTur() {
        return this.taxameter.startTur();
    }
    //Kalder minimumsafstand, der returnere 2 minus afstanden.
    get minimumAfstandTilbage (){
        return 2 - this.afstand;
    }
        //Kalder slutTur med ændringen at hvis afstanden er under 2 kan man ikke slutte turen.
    slutTur() {
        if(this.afstand < 2){
            alert(`Du har ikke kørt langt nok, du mangler at køre ${this.minimumAfstandTilbage} km`);
        }else{
            return this.taxameter.slutTur();
        }
    }
        //Funktionen afstand kaldes uændret
    get afstand(){
        return this.taxameter.afstand;
    }
        //Funktionen koer kaldes uændret
    koer(delta_afst) {
        return this.taxameter.koer(delta_afst);
    }
        //Funktionen beregnPris kaldes uændret
    beregnPris() {
        return this.taxameter.beregnPris();
    }
}

//Konstant til city taxa's prisstrategi
const strategy = new CityPriceStrategy();

//Konstant til taxameter strategien, der kaldes med prisstrategien og tiden
const taxameter = new Taxameter(new RealClock(), strategy);

//Konstant der kalder decoratoren til city taxa som overlay til taxametret
const decoratorCity = new DecoratorCity(taxameter);

//Starter taxametret med decorator city
start(decoratorCity);