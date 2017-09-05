const FIELD_SIZE: number = 8;
var idCounter: number = 0;

export class Film {
    [key: string] : any;//number | string
    id: number;
    name: string;
    studio: string;
    year: number;
    director: string;
    genre: string;
    revenue: number;
    details: string;

    constructor(name : string, director : string, studio : string, year : number, genre : string, revenue : string, details : string) {
        this.id = idCounter++;
        this.name = name;
        this.director = director;
        this.studio = studio;
        this.year = year;
        this.genre = genre;
        this.details = details;
        this.revenue = this.getNumericRavenue(revenue);
    }

    getNumericRavenue(revenue: string) {
        let replaced : string = revenue.replace(new RegExp(",", 'g'), "");
        return parseFloat(replaced);
    };
}