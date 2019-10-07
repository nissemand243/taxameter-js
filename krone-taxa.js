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





class DecoratorKrone{
    constructor (taxameter){
        this.taxameter = taxameter;
        this.chaufør = "Kurt";
    }

    getStartetTidspunkt() {
        return this.taxameter.getStartetTidspunkt();
    }

    startTur() {
        console.log(`Krone-taxa's lille vogn m. chauføren ${this.chaufør} er kørt en tur`);
        return this.taxameter.startTur();
    }

    slutTur() {
        console.log(`Krone-taxa's lille vogn m. chauføren ${this.chaufør} er kommet tilbage`);
        return this.taxameter.slutTur();
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

class DecoratorOverlay{
    constructor (decoratorKrone){
        this.decoratorKrone = decoratorKrone;
        this.korteTure = 0;
        this.langeTure = 0;
    }
    getStartetTidspunkt() {
        return this.decoratorKrone.getStartetTidspunkt();
    }

    startTur() {
        return this.decoratorKrone.startTur();
    }


    get procentKorteTure (){
        return (this.korteTure/(this.korteTure + this.langeTure))*100;
    }
    get procentLangeTure (){
        return (this.langeTure/(this.korteTure + this.langeTure))*100;
    }
    slutTur() {
        if(this.afstand > 1){
            this.langeTure ++;
        }else{
            this.korteTure ++;
        }
        console.log(this.procentKorteTure + "% ture på under 1 km");
        console.log(this.procentLangeTure + "% ture på over 1 km");
        return this.decoratorKrone.slutTur();
    }

    get afstand(){
        return this.decoratorKrone.afstand;
    }

    koer(delta_afst) {
        return this.decoratorKrone.koer(delta_afst);
    }

    beregnPris() {
        return this.decoratorKrone.beregnPris();
    }

}


    const strategy = new KronePriceStrategy;
    const taxameter = new Taxameter(new RealClock(), strategy);
    const decoratorKrone = new DecoratorKrone(taxameter);
    const overlay = new DecoratorOverlay(decoratorKrone);
    start(overlay);
