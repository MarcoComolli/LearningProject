import { DisplayedFilms } from "./displayed_films";
import { FilmArray } from "./film_array";
import { Film } from "./film";
import { InfoDisplay } from "./info_display";
import { Entry } from "./displayed_films";
import $ = require("jquery");


$(document).ready(function (): void {
    var viewUpdater: ViewUpdater = new ViewUpdater();
    viewUpdater.init();
});

class ColumnSort {
    sortedIdx: number = -1;
    isAscending: boolean = false;
    prevTh: HTMLTableCellElement | null = null;
}

class ViewUpdater {
    displayableFilmProperties: string[];
    previousExpanded: HTMLElement | null;
    dFilms: DisplayedFilms;
    selectedFilms: DisplayedFilms;
    filmArr: FilmArray;
    columnSort: ColumnSort;

    constructor() {
        this.displayableFilmProperties = ["name", "director", "studio", "year", "genre", "revenue"];
        this.previousExpanded = null;
        this.dFilms = new DisplayedFilms();
        this.selectedFilms = new DisplayedFilms();
        this.filmArr = new FilmArray();
        this.columnSort = new ColumnSort();
    }

    public init() : void {
        let vuInstance : this = this; //for accessing inner handler scope
        $("#searchBar").on("keyup", function() {vuInstance.onSubmitSearch(); });
        this.generateMovieTable();
    }

    //create table with arrays
    public generateMovieTable(): void {
        let vuInstance : this = this; //for accessing inner handler scope

        //Add extra th
        let tableHead: JQuery<HTMLElement> = $("thead").eq(0);
        let newHeader: HTMLElement = document.createElement("th");

        $("thead tr:first").append(newHeader);

        let tableBody: JQuery<HTMLElement> = $("tbody");
        for (let i = 0; i < this.filmArr.films.length; i++) {
            let currentFilm: Film = this.filmArr.films[i];

            //Create tr and append to tableBody
            let currentTr: HTMLElement = document.createElement("tr");

            tableBody.append(currentTr);
            currentTr.addEventListener("click", function () { vuInstance.selectRow(this); }, false);

            this.dFilms.put(this.filmArr.films[i], currentTr);
            for (let field in currentFilm) {
                if (currentFilm.hasOwnProperty(field) && this.displayableFilmProperties.indexOf(field) !== -1) {
                    //crea td e appendi a tr
                    let currentTd: HTMLElement = document.createElement("td");
                    $(currentTr).append(currentTd);
                    if (field !== "revenue") {
                        currentTd.innerHTML = currentFilm[field];
                    }
                    else {
                        currentTd.innerHTML = currentFilm[field].toLocaleString();
                    }
                }
            }
            let expandTd: HTMLElement = document.createElement("td");
            $(currentTr).append(expandTd)
            let expandImg: HTMLImageElement = document.createElement("img");
            expandImg.src = "images/expand_icon.png";
            expandImg.alt = "expand icon";
            $(expandImg).addClass("expand");
            expandTd.addEventListener("click", function (e: Event): void { vuInstance.expandDetails(this, e); }, false);
            $(expandTd).append(expandImg);
        }

        //add onclickEvents for sort on headers
        $("thead tr:first th").click(function (e: JQuery.Event) {
            if (this instanceof HTMLTableCellElement) {
                let thisTH: HTMLTableCellElement = this as HTMLTableCellElement;
                vuInstance.orderColumn(thisTH, e);
            }
        });
    }

    public orderColumn(th: HTMLTableCellElement, e: JQuery.Event): void {
        if (this.columnSort.sortedIdx !== th.cellIndex) { //clicked on different column
            this.columnSort.isAscending = true;
            this.columnSort.sortedIdx = th.cellIndex;
            $(th).addClass("asc");
            if (this.columnSort.prevTh !== null) {
                $(this.columnSort.prevTh).removeClass("asc");
                $(this.columnSort.prevTh).removeClass("desc");
            }
            this.columnSort.prevTh = th;
        }
        else {
            this.columnSort.isAscending = !this.columnSort.isAscending;
            if (this.columnSort.isAscending) {
                $(th).addClass("asc");
                $(th).removeClass("desc");
            }
            else {
                $(th).addClass("desc");
                $(th).removeClass("asc");
            }

        }
        switch (th.cellIndex) {
            case 0:
                if (this.columnSort.isAscending) {
                    this.dFilms.sortByField("name");
                }
                else {
                    this.dFilms.sortByField("-name");
                }
                break;
            case 1:
                if (this.columnSort.isAscending) {
                    this.dFilms.sortByField("director");
                }
                else {
                    this.dFilms.sortByField("-director");
                }
                break;
            case 2:
                if (this.columnSort.isAscending) {
                    this.dFilms.sortByField("studio");
                }
                else {
                    this.dFilms.sortByField("-studio");
                }
                break;
            case 3:
                if (this.columnSort.isAscending) {
                    this.dFilms.sortByField("year");
                }
                else {
                    this.dFilms.sortByField("-year");
                }
                break;
            case 4:
                if (this.columnSort.isAscending) {
                    this.dFilms.sortByField("genre");
                }
                else {
                    this.dFilms.sortByField("-genre");
                }
                break;
            case 5:
                if (this.columnSort.isAscending) {
                    this.dFilms.sortByField("revenue");
                }
                else {
                    this.dFilms.sortByField("-revenue");
                }
                break;
            default:
                break;
        }
        //columnSort.sortedIdx
        this.updateTable();

    }

    public selectRow(elem: HTMLElement): void {
        if (!$(elem).hasClass("selected")) {
            $(elem).addClass("selected");
            let entry: Entry | null = this.dFilms.getEntryByRow(elem)
            if (entry !== null)
                this.selectedFilms.putEntry(entry);
        }
        else {
            $(elem).removeClass("selected");
            this.selectedFilms.removeEntryByRow(elem);
        }
        let dInfo: InfoDisplay = this.selectedFilms.retrieveDataStats();
        if (dInfo.selectedRows != 0) {
            this.displayStats(dInfo);
            $("#stats").css("display", "block");
        }
        else {
            $("#stats").css("display", "none");
        }

    }

    public expandDetails(elem: HTMLElement, e: Event): void {
        if (this.previousExpanded !== null) {
            this.closePreviousRow();
        }
        if (this.previousExpanded !== $(elem).parent()[0]) {
            let selectedRow: JQuery<HTMLElement> = $(elem).parent();
            selectedRow.addClass("active");
            let expandedRow: HTMLElement = document.createElement("tr");
            selectedRow.after(expandedRow);
            let expandedCell: HTMLElement = document.createElement("td");
            $(expandedRow).addClass("expandedRow");
            $(expandedRow).append(expandedCell);
            $(expandedCell).attr("colSpan", DisplayedFilms.searchProperties.length + 1);
            let selectedEntry: Entry | null = this.dFilms.getEntryByRow(selectedRow[0]);
            if (selectedEntry !== null) {
                let details: string = selectedEntry.film.details;
                $(expandedCell).html(details);
                $(expandedCell).addClass("expanded");
                this.previousExpanded = selectedRow[0];
            }
        }
        e.stopPropagation();
    }

    public closePreviousRow(): void {
        //chiudi la riga precedente
        let prevExpandedCell: HTMLElement = $(".expanded")[0]; //td (cell)
        if (this.previousExpanded !== $(".active")[0]) {
            this.previousExpanded = null;
        }
        $(".expandedRow").remove();
        $(".active").removeClass("active");

    }


    public displayStats(stats: InfoDisplay): void {
        $("#statsSelected").text(stats.selectedRows);
        $("#statsAvgRev").text(stats.avgRevenues.toLocaleString(undefined, { maximumFractionDigits: 2 }));
        $("#statsMinYear").text(stats.minYear);
        $("#statsMaxYear").text(stats.maxYear);
    }

    public updateTable(): void {
        //clear the row
        $("tbody").empty();
        //remake rows with the new order
        let rows: HTMLElement[] = this.dFilms.getRows();

        for (let i = 0; i < rows.length; i++) {
            let element: HTMLElement = rows[i];
            $("tbody").append(element);

        }
    }

    public onSubmitSearch(): void {
        this.closePreviousRow();
        let input: JQuery<HTMLElement> = $("#searchBar");
        let inputValue = input.val();
        if (inputValue !== undefined) {
            let val: string = inputValue.toString();
            let matches: number[] = this.dFilms.searchString(val, false);

            let trs: JQuery<HTMLElement> = $("tbody tr");

            for (let i = 0; i < this.dFilms.entries.length; i++) {
                let currEntry: Entry = this.dFilms.entries[i];
                let found: boolean = false;
                for (let j = 0; j < matches.length; j++) {
                    let id: number = matches[j];
                    if (currEntry.film.id === matches[j]) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    $(currEntry.row).addClass("notFound");
                }
                else {
                    $(currEntry.row).removeClass("notFound");
                }
            }
        }
    }
}


























