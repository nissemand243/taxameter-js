/**
 * Skal have følgende felter
 * - turStartetTidspunkt: et dato objekt for hvornår turen er startet. 
 *   Hvis turen ikke er startet, er den undefined
 * - afstand: hvor langt taxaen har kørt i KM. Denne værdi sendes til scriptet
 *   udefra (i dette tilfælde fra funktionen start(Taxameter), som ligger i 
 *   library-mappen, og som er det script, der styrer applikationen).
 * 
 * Skal have følgende metoder/funktioner, som alle kaldes fra start.js
 * - startTur(): sætter turStartetTidspunkt til nuværende tidspunkt
 * - slutTur(): skal nulstille taxameteret 
 *   ved at  sætte turStartetTidspunkt til undefined og afstand til 0
 * - koer(delta_afst): skal tælle afstand op med det ekstra antal km, som
 *   bilen har kørt siden sidste beregning. 
 * - beregnPris(): skal returnere prisen beregnet udfra taxaselskabets prissætning
 */
class Taxameter {

    // clock.now -> dato
    constructor(clock, priceStrategy) {
        this.priceStrategy = priceStrategy;
        this.calculatePrice = priceStrategy.calculatePrice;
        this.clock = clock
        this.afstand = 0;
        this.turStartetTidspunkt = undefined;
    }

    getStartetTidspunkt() {
        return this.turStartetTidspunkt;
    }

    startTur() {
        this.turStartetTidspunkt = this.clock.now();
    }

    slutTur() {
        alert("Det bliver: " + this.beregnPris() + " DKK");
        this.turStartetTidspunkt = undefined;
        this.afstand = 0;
    }

    koer(delta_afst) {
        console.log(delta_afst);
        this.afstand += delta_afst*50;
    }

    beregnPris() {
        
        if(this.turStartetTidspunkt == undefined){
            return 0;
        }else{
            var tidGaaet = (((this.clock.now() - this.turStartetTidspunkt)/1000)/60);
        return this.calculatePrice(this.afstand, tidGaaet);
        }
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