var columnSort = {
    sortedIdx: -1,
    isAscending: false,
    prevTh: null
}

var displayableFilmProperties = ["name", "director", "studio", "year", "genre", "revenue"];
var previousExpanded = null;
var dFilms = new DFilms();
var selectedFilms = new DFilms();

$(document).ready(function () {
    init();
});

function init() {
    generateMovieTable();
}


//create table with arrays
function generateMovieTable() {
    //Add extra th
    var tableHead = $("thead").eq(0);
    var newHeader = document.createElement("th");

    $("thead tr:first").append(newHeader);

    var tableBody = document.querySelector("tbody");
    for (var i = 0; i < films.length; i++) {
        var currentFilm = films[i];

        //Create tr and append to tableBody
        var currentTr = document.createElement("tr");

        $(tableBody).append(currentTr);
        currentTr.addEventListener("click", function () { selectRow(this) }, false);

        dFilms.put(films[i], currentTr);
        for (var field in currentFilm) {
            if (currentFilm.hasOwnProperty(field) && displayableFilmProperties.indexOf(field) !== -1) {
                //crea td e appendi a tr
                var currentTd = document.createElement("td");
                $(currentTr).append(currentTd);
                if (field !== "revenue") {
                    currentTd.innerHTML = currentFilm[field];
                }
                else {
                    currentTd.innerHTML = currentFilm[field].toLocaleString();
                }
            }
        }
        var expandTd = document.createElement("td");
        $(currentTr).append(expandTd)
        var expandImg = document.createElement("img");
        expandImg.src = "images/expand_icon.png";
        expandImg.alt = "expand icon";
        $(expandImg).addClass("expand");
        expandTd.addEventListener("click", function () { expandDetails(this) }, false);
        $(expandTd).append(expandImg);
    }

    //add onclickEvents for sort on headers
    for (var i = 0; i < displayableFilmProperties.length; i++) {
        var th = $("thead tr:first th").eq(i).click(function () { orderColumn(this) });
    }
}

function orderColumn(th) {
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

function selectRow(elem) {
    if (!$(elem).hasClass("selected")) {
        $(elem).addClass("selected");
        selectedFilms.putEntry(dFilms.getEntryByRow(elem));
    }
    else {
        $(elem).removeClass("selected");
        selectedFilms.removeEntryByRow(elem);
    }
    var dInfo = selectedFilms.retrieveDataStats();
    if (dInfo.selectedRows != 0) {
        displayStats(dInfo);
        $("#stats").css("display", "block");
    }
    else {
        $("#stats").css("display", "none");
    }

}

function expandDetails(elem) {
    if (previousExpanded !== null) {
        closePreviousRow();
    }
    if (previousExpanded !== $(elem).parent()[0]) {
        var selectedRow = $(elem).parent();
        selectedRow.addClass("active");
        var expandedRow = document.createElement("tr");
        selectedRow.after(expandedRow);
        var expandedCell = document.createElement("td");
        $(expandedRow).addClass("expandedRow");
        expandedRow.append(expandedCell);
        $(expandedCell).attr("colSpan", FIELD_SIZE + 1);
        var details = dFilms.getEntryByRow(selectedRow[0]).film.details;
        $(expandedCell).html(details);
        $(expandedCell).addClass("expanded");
        previousExpanded = selectedRow[0];
    }
    event.stopPropagation();
}

function closePreviousRow() {
    //chiudi la riga precedente
    var prevExpandedCell = $(".expanded")[0]; //td (cell)
    if (previousExpanded !== $(".active")[0]) {
        previousExpanded = null;
    }
    $(".expandedRow").remove();
    $(".active").removeClass("active");



}

// function insertClass(element, classToInsert) {
//     var className = element.className;
//     if (className === "") {
//         element.className = classToInsert;
//     }
//     else {
//         element.className += " " + classToInsert;
//     }
// }

// function removeClass(element, classToDelete) {
//     element.className = element.className.replace(classToDelete, "");
// }

function displayStats(stats) {
    $("#statsSelected").text(stats.selectedRows);
    $("#statsAvgRev").text(stats.avgRevenues.toLocaleString(undefined, { maximumFractionDigits: 2 }));
    $("#statsMinYear").text(stats.minYear);
    $("#statsMaxYear").text(stats.maxYear);
}

// function getElementIndex(node) {
//     var index = 0;
//     while ( (node = node.previousElementSibling) ) {
//         index++;
//     }
//     return index;
// }

function updateTable() {
    //clear the row
    $("tbody").empty();
    //remake rows with the new order
    var rows = dFilms.getRows();

    for (var i = 0; i < rows.length; i++) {
        var element = rows[i];
        $("tbody").append(element);

    }
}


function onSubmitSearch() {
    closePreviousRow();
    var input = $("#searchBar");
    var matches = dFilms.searchString(input.val(), false);

    var trs = $("tbody tr");

    for (var i = 0; i < dFilms.entries.length; i++) {
        var currEntry = dFilms.entries[i];
        var found = false;
        for (var j = 0; j < matches.length; j++) {
            var id = matches[j];
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



