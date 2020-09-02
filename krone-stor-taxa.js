/*
 * Denne fil kalder en funktion i filen start.js, der ligger i library-mappen, 
 * og som I ikke skal ændre ved i denne opgave. Til gengæld kunne man forestille 
 * sig at der her blev indsat et
 */

//Variabel til bestemmelse af om man er i en stor taxa eller ej, bruges i taxameter.js
var storTaxa = true;

 //klasse til en funktion, der kalder den eksakte tid
class realClock{
    now(){
        return new Date();
    }
}



//Her er stor krone taxa pris strategi, defineres her, kaldes i taxameter.js
class kroneStorPriceStrategy{
    calculatePrice(afstand, tidGaaet){
        return (12 * (afstand)) + (6.67 * tidGaaet + 69);
    }
}

//Danner en vaviabel der kalder et nyt "realClock"
var clock = new realClock();
//Laver en strategi til prisstrategien
const strategy = new kroneStorPriceStrategy;

//Tager mit strategy pattern og kalder det sammen med et nyt taxameter
const taxameter = new Taxameter(clock, strategy);

//Pakker mit taxameter ind i et decorator pattern
const decoratorKrone = new DecoratorKrone(taxameter);

//Jeg kalder selve funktionen der starter hele programmet sammen med decorator klassen
start(decoratorKrone);