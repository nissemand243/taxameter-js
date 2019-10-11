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

//Krone taxa's prisstrategi
class KronePriceStrategy{
    calculatePrice(afstand, tidGaaet){
        var price = (9 * Math.max(afstand-1, 0));
        var priceFoerstKm = (5 *Math.min(1, afstand));
        var prisTid = (6.25 * tidGaaet + 39);
        return price + priceFoerstKm + prisTid
    }
}

//Min konstant til mit strategy pattern
    const strategy = new KronePriceStrategy;

    //Min konstant til at kalde taxametret med strategien og tiden
    const taxameter = new Taxameter(new RealClock(), strategy);

    //Konstant til at kalde mit decorator pattern til krone taxa med taxametret
    const decoratorKrone = new DecoratorKrone(taxameter);

    //Konstant til at pakke min decorator ind i en ny decorator
    const overlay = new DecoratorOverlay(decoratorKrone);

    //Jeg starter selve programmet med funktionen start og kalder decoratorOverlay i denne
    start(overlay);
