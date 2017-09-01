
export class InfoDisplay {
    
    selectedRows: number;
    avgRevenues: number;
    minYear: number;
    maxYear: number;

    constructor(nRowsSelected : number, avgRevenues :  number, minYear :  number , maxYear : number) {
        this.selectedRows = nRowsSelected;
        this.avgRevenues = avgRevenues;
        this.minYear = minYear;
        this.maxYear = maxYear;
    }

}


