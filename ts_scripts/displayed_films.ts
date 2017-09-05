import { Film } from "./film";
import { InfoDisplay } from "./info_display";

export class Entry {
    film: Film;
    row : HTMLElement;

    constructor(film: Film, row : HTMLElement) {
        this.film = film;
        this.row = row;
    }
}

export class DisplayedFilms {
    static searchProperties : string[] = ["name", "director", "studio", "year", "genre", "revenue", "details"];
    entries: Entry[] = [];

    constructor(){
        this.entries = [];
    }

    public init(films : Film[], rows : HTMLElement[]) {
        for (var i = 0; i < films.length; i++) {
            let entry: Entry = new Entry(films[i], rows[i]);
            this.entries.push(entry);
        }
    }


    public put(cFilm : Film, cRow : HTMLElement): void {
        this.entries.push(new Entry(cFilm, cRow));
    }


    public putEntry(entry : Entry): void {
        this.entries.push(entry);
    }


    public getEntryByFilm(film: Film): Entry | null {
        for (let i = 0; i < this.entries.length; i++) {
            if (film === this.entries[i].film) {
                return this.entries[i];
            }
        }
        return null;
    }


    public getEntryByRow(row : HTMLElement): Entry | null {
        for (let i = 0; i < this.entries.length; i++) {
            if (row === this.entries[i].row) {
                return this.entries[i];
            }
        }
        return null;
    }


    public getFilms(): Film[] {
        let res: Film[] = [];
        for (var i = 0; i < this.entries.length; i++) {
            res.push(this.entries[i].film);
        }
        return res;
    }


    public getRows() : HTMLElement[] {
        let res : HTMLElement[] = [];
        for (var i = 0; i < this.entries.length; i++) {
            res.push(this.entries[i].row);
        }
        return res;
    }


    public sortByField(field: string): void {
        this.entries.sort(this.propertySortDFilm(field));
    }


    public propertySortDFilm<T extends Entry>(property: string) {
        let sortOrder: number = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a : T, b : T) {
            let result: number = (a.film[property] < b.film[property]) ? -1 : (a.film[property] > b.film[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    public max<T>(array : T[]) {
        return Math.max.apply(Math, array);
    }

    public min<T>(array : T[]) {
        return Math.min.apply(Math, array);
    }


    public retrieveDataStats() : InfoDisplay {
        let filmsArr: Film[] = this.getFilms();
        let revenueSum : number = filmsArr.reduce(function (a :  number, b : Film) {
            return (a + b.revenue);
        }, 0);

        let years = [];
        for (let i = 0; i < filmsArr.length; i++) {
            years.push(filmsArr[i].year);
        }
        return new InfoDisplay(filmsArr.length, (revenueSum / filmsArr.length), this.min(years), this.max(years));
    }


    public removeEntryByRow(row : HTMLElement) : void{
        let rows = this.getRows();
        if (rows.length != 0) {
            let idx : number = rows.indexOf(row);
            if (idx != -1) {
                this.entries.splice(idx, 1);
            }
        }
    }

    public removeEntryByFilm(film : Film) : void {
        let films : Film[] = this.getFilms();
        if (films.length != 0) {
            var idx = films.indexOf(film);
            if (idx != -1) {
                this.entries.splice(idx, 1);
            }
        }
    }

    public searchString(text : string, isCaseSensitive : boolean) : number[]{
        let matchedIDs : number[] = [];
        if (!isCaseSensitive) {
            text = text.toLowerCase();
        }
        for (let i = 0; i < this.entries.length; i++) {
            let currentFilm : Film = this.entries[i].film;
            for (let j = 0; j < DisplayedFilms.searchProperties.length; j++) {
                let currField = currentFilm[DisplayedFilms.searchProperties[j]];
                if( !(currentFilm[DisplayedFilms.searchProperties[j]] instanceof String) ) {
                    currField += "";
                }
                if (!isCaseSensitive) {
                    currField = currField.toLowerCase();
                }
                if (currField.search(text) != -1) {
                    matchedIDs.push(this.entries[i].film.id);
                    break;
                }
            }
        }
        return matchedIDs;
    }
}
