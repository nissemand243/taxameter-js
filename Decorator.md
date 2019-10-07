# Taxameter.js
## Nu også en opgave i Decorator Pattern

Følgende opgaver handler om Decorator Pattern. Husk at en decorator altid startes som en klasse der kan det samme som det den dekorerer. F.eks.:
```javascript
class MinKlasse {
    gørNoget() {
        //...
    }
}

class MinKlasseDecorator {
    constructor(minKlasse) {
        this.minKlasse = minKlasse;
    }

    gørNoget() {
        return this.minKlasse.gørNoget();
    }
}
```

### Opgave 1
Hvis ikke allerede du har løst opgaverne i README.md, løs disse. Hvis ikke de er løst med strategy pattern, kan denne opgave godt løses alligevel, men der opfordres til at bruge strategy pattern.

### Opgave 2
KroneTaxa vil gerne vide hvilke vogne der er ledige. Lav en decorator (i Taxameter.js eller en ny fil) som sender en besked til Krone Taxas central (bare brug console.log) når en tur starter og når den slutter. Beskederne skal indeholde navnet på chaufføren. F.eks.: "Mike har taget en tur og er optaget" og "Lotte har netop afsluttet en tur og er ledig". Brug decoratoren i krone-taxa.js og krone-taxa-stor-vogn.js.
Hint: du kan give navnet på chaufføren i contructoren til decoratoren.

### Opgave 3
KroneTaxa vil gerne føre statistik på hvor mange korte ture (under 1km) der køres i deres små vogne. Lav en decorator i krone-taxa.js der holder styr på hvor mange ture der er over og under 1 km. Vær opmærksom på at taxameteret allerede er dekoreret en gang - man kan sagtens lægge en decorator uden på en anden decorator.
Ekstra: gem decoratoren som en global variabel og giv den en metode (metoder er funktioner der er tilknyttet objekter) der fortæller hvor mange procent af turene der indtil videre er under 1km.

### Bonus opgave
CityBilens direktør, Herman, er en ond mand. Han vil ikke have at hans kunder rejser mere end 2 km. Lav en decorator i city-bilen.js der afbryder kaldet til slutTur hvis afstanden er mindre end 2 km.