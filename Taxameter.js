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

 //min klasse til taxametret. Danner ramme for mit strategy pattern
class Taxameter {

    //Constructor med mine parametre jeg kalder i decoratoren
    constructor(clock, priceStrategy) {
        this.priceStrategy = priceStrategy;
        this.calculatePrice = priceStrategy.calculatePrice;
        this.clock = clock
        this.afstand = 0;
        this.turStartetTidspunkt = undefined;
    }
        //Her nulstiller jeg starttidspunktet
    getStartetTidspunkt() {
        return this.turStartetTidspunkt;
    }
        //Her starter jeg turen, altså gemmer jeg det eksakte tidspunkt taxaen er kørt
    startTur() {
        this.turStartetTidspunkt = new Date();
    }
        //her slutter turen, der kaldes en pris til passageren, tiden nulstilles igen og afstand nulstilles
    slutTur() {
        alert("Det bliver: " + this.beregnPris() + " DKK");
        this.turStartetTidspunkt = undefined;
        this.afstand = 0;
    }
        //Her bestemmer jeg i forhold til delta_afst, hvor hurtigt kilometre tællesp5.BandPass()
        //Den er sat højt da det ellers tager lang til at se om der er kørt over eller under 1 km
    koer(delta_afst) {
        console.log(delta_afst);
        this.afstand += delta_afst*50;
    }
        //Her er det jeg har opsat selve funktionen til at beregne prisen.
        //Elementerne manipuleres i taxaernes strategy patterns.
    beregnPris() {
        return 0;
    }
}
//Her startes min decorator til krone taxa.
class DecoratorKrone{

    //Constructor med mine parametre jeg kalder i decoratoren
    constructor (taxameter){
        this.taxameter = taxameter;
        this.chaufør = "Kurt";
    }
        //Funktionen til starttidspunktet kaldes uændret.
    getStartetTidspunkt() {
        return this.taxameter.getStartetTidspunkt();
    }
        //Starttur kaldes med indholdet fra taxameter og der tilføjes navn på chauffør, der skrives i console.
    startTur() {
        if(storTaxa){
            this.chaufør = "Bent";
        }else{
            this.chaufør ="Kurt";
        }
        console.log(`Krone-taxa's lille vogn m. chauføren ${this.chaufør} er kørt en tur`);
        return this.taxameter.startTur();
    }
        //Sluttur kaldes med indholdet fra taxameter og der tilføjes en besked i console.
    slutTur() {
        console.log(`Krone-taxa's lille vogn m. chauføren ${this.chaufør} er kommet tilbage`);
        return this.taxameter.slutTur();
    }
        //Jeg kalder "get" for at hente den afstand taxaen er kørt.
    get afstand(){
        return this.taxameter.afstand;
    }

    // Jeg kalder funktionen "koer" uændret
    koer(delta_afst) {
        return this.taxameter.koer(delta_afst);
    }
        //Jeg kalder beregnpris uændret.
    beregnPris() {
        return this.taxameter.beregnPris();
    }
}
//Her laver jeg klassen til mit decorator overlay.
class DecoratorOverlay{

    //Constructor med mine parametre jeg kalder i decoratoren
    constructor (decoratorKrone){
        this.decoratorKrone = decoratorKrone;
        this.korteTure = 0;
        this.langeTure = 0;
    }
    //Kalder getStartetTidspunkt uændret
    getStartetTidspunkt() {
        return this.decoratorKrone.getStartetTidspunkt();
    }
        //Kalder startTur uændret
    startTur() {
        return this.decoratorKrone.startTur();
    }

        //Jeg laver en funktion kaldet "ProcentKorteTure",
        //der returnerer en værdi, der er lig procentdelen af korte ture kørt
    get procentKorteTure (){
        return (this.korteTure/(this.korteTure + this.langeTure))*100;
    }
        //Jeg laver en funktion kaldet "ProcentLangeTure",
        //der returnerer en værdi, der er lig procentdelen af lange ture kørt
    get procentLangeTure (){
        return (this.langeTure/(this.korteTure + this.langeTure))*100;
    }
    //Jeg kalder slutTur og definerer her at hvis turen er under 1 km er det en kort tur, er den over er det en lang.
    slutTur() {
        if(this.afstand > 1){
            this.langeTure ++;
        }else{
            this.korteTure ++;
        }
        //resultatet af korte og lange ture kaldes i consol i procenter.
        console.log(this.procentKorteTure + "% ture på under 1 km");
        console.log(this.procentLangeTure + "% ture på over 1 km");
        return this.decoratorKrone.slutTur();
    }
        //Jeg kalder afstand uændret
    get afstand(){
        return this.decoratorKrone.afstand;
    }
        //Jeg kalder "koer" uændret
    koer(delta_afst) {
        return this.decoratorKrone.koer(delta_afst);
    }
        //Jeg kalder beregnPris uændret
    beregnPris() {
        return this.decoratorKrone.beregnPris();
    }

}