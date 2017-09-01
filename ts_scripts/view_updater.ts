import { DisplayedFilms } from "./displayed_films";
import { FilmArray } from "./film_array";
import { Film } from "./film";
import { InfoDisplay } from "./info_display";
import { Entry } from "./displayed_films";
import $ = require("jquery");


class ColumnSort {
    sortedIdx: number = -1;
    isAscending: boolean = false;
    prevTh: HTMLTableCellElement | null = null;
}

var displayableFilmProperties: string[] = ["name", "director", "studio", "year", "genre", "revenue"];
var previousExpanded: HTMLElement | null = null;
var dFilms: DisplayedFilms = new DisplayedFilms();
var selectedFilms: DisplayedFilms = new DisplayedFilms();
var filmArr: FilmArray = new FilmArray();
var columnSort: ColumnSort = new ColumnSort();

$(document).ready(function (): void {
    init();
});

function init(): void {

    $("#searchBar").on("keyup", function(){onSubmitSearch();});
    generateMovieTable();
}


//create table with arrays
function generateMovieTable() {
    //Add extra th
    let tableHead: JQuery<HTMLElement> = $("thead").eq(0);
    let newHeader: HTMLElement = document.createElement("th");

    $("thead tr:first").append(newHeader);

    let tableBody: JQuery<HTMLElement> = $("tbody");
    for (let i = 0; i < filmArr.films.length; i++) {
        let currentFilm: Film = filmArr.films[i];

        //Create tr and append to tableBody
        let currentTr: HTMLElement = document.createElement("tr");

        tableBody.append(currentTr);
        currentTr.addEventListener("click", function () { selectRow(this); }, false);

        dFilms.put(filmArr.films[i], currentTr);
        for (let field in currentFilm) {
            if (currentFilm.hasOwnProperty(field) && displayableFilmProperties.indexOf(field) !== -1) {
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
        expandTd.addEventListener("click", function (e: Event): void { expandDetails(this, e); }, false);
        $(expandTd).append(expandImg);
    }

    //add onclickEvents for sort on headers
    $("thead tr:first th").click(function (e: JQuery.Event) {
        if(this instanceof HTMLTableCellElement){
            let thisTH : HTMLTableCellElement = this as HTMLTableCellElement;
            orderColumn(thisTH, e);
        }
    });

}

function orderColumn(th: HTMLTableCellElement, e: JQuery.Event): void {
    if (columnSort.sortedIdx !== th.cellIndex) { //clicked on different column
        columnSort.isAscending = true;
        columnSort.sortedIdx = th.cellIndex;
        $(th).addClass("asc");
        if (columnSort.prevTh !== null) {
            $(columnSort.prevTh).removeClass("asc");
            $(columnSort.prevTh).removeClass("desc");
        }
        columnSort.prevTh = th;
    }
    else {
        columnSort.isAscending = !columnSort.isAscending;
        if (columnSort.isAscending) {
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
            if (columnSort.isAscending) {
                dFilms.sortByField("name");
            }
            else {
                dFilms.sortByField("-name");
            }
            break;
        case 1:
            if (columnSort.isAscending) {
                dFilms.sortByField("director");
            }
            else {
                dFilms.sortByField("-director");
            }
            break;
        case 2:
            if (columnSort.isAscending) {
                dFilms.sortByField("studio");
            }
            else {
                dFilms.sortByField("-studio");
            }
            break;
        case 3:
            if (columnSort.isAscending) {
                dFilms.sortByField("year");
            }
            else {
                dFilms.sortByField("-year");
            }
            break;
        case 4:
            if (columnSort.isAscending) {
                dFilms.sortByField("genre");
            }
            else {
                dFilms.sortByField("-genre");
            }
            break;
        case 5:
            if (columnSort.isAscending) {
                dFilms.sortByField("revenue");
            }
            else {
                dFilms.sortByField("-revenue");
            }
            break;
        default:
            break;
    }
    //columnSort.sortedIdx
    updateTable();


}

function selectRow(elem: HTMLElement) {
    if (!$(elem).hasClass("selected")) {
        $(elem).addClass("selected");
        let entry: Entry | null = dFilms.getEntryByRow(elem)
        if (entry !== null)
            selectedFilms.putEntry(entry);
    }
    else {
        $(elem).removeClass("selected");
        selectedFilms.removeEntryByRow(elem);
    }
    let dInfo: InfoDisplay = selectedFilms.retrieveDataStats();
    if (dInfo.selectedRows != 0) {
        displayStats(dInfo);
        $("#stats").css("display", "block");
    }
    else {
        $("#stats").css("display", "none");
    }

}

function expandDetails(elem: HTMLElement, e: Event) {
    if (previousExpanded !== null) {
        closePreviousRow();
    }
    if (previousExpanded !== $(elem).parent()[0]) {
        let selectedRow: JQuery<HTMLElement> = $(elem).parent();
        selectedRow.addClass("active");
        let expandedRow: HTMLElement = document.createElement("tr");
        selectedRow.after(expandedRow);
        let expandedCell: HTMLElement = document.createElement("td");
        $(expandedRow).addClass("expandedRow");
        $(expandedRow).append(expandedCell);
        $(expandedCell).attr("colSpan", DisplayedFilms.searchProperties.length + 1);
        let selectedEntry: Entry | null = dFilms.getEntryByRow(selectedRow[0]);
        if (selectedEntry !== null) {
            let details: string = selectedEntry.film.details;
            $(expandedCell).html(details);
            $(expandedCell).addClass("expanded");
            previousExpanded = selectedRow[0];
        }
    }
    e.stopPropagation();
}

function closePreviousRow() {
    //chiudi la riga precedente
    let prevExpandedCell: HTMLElement = $(".expanded")[0]; //td (cell)
    if (previousExpanded !== $(".active")[0]) {
        previousExpanded = null;
    }
    $(".expandedRow").remove();
    $(".active").removeClass("active");

}

function displayStats(stats: InfoDisplay) {
    $("#statsSelected").text(stats.selectedRows);
    $("#statsAvgRev").text(stats.avgRevenues.toLocaleString(undefined, { maximumFractionDigits: 2 }));
    $("#statsMinYear").text(stats.minYear);
    $("#statsMaxYear").text(stats.maxYear);
}


function updateTable() {
    //clear the row
    $("tbody").empty();
    //remake rows with the new order
    let rows: HTMLElement[] = dFilms.getRows();

    for (let i = 0; i < rows.length; i++) {
        let element: HTMLElement = rows[i];
        $("tbody").append(element);

    }
}


function onSubmitSearch() {
    closePreviousRow();
    let input: JQuery<HTMLElement> = $("#searchBar");
    let inputValue = input.val();
    if (inputValue !== undefined) {
        let val: string = inputValue.toString();
        let matches: number[] = dFilms.searchString(val, false);

        let trs: JQuery<HTMLElement> = $("tbody tr");

        for (let i = 0; i < dFilms.entries.length; i++) {
            let currEntry: Entry = dFilms.entries[i];
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



