define(["require", "exports", "./displayed_films", "./film_array", "jquery"], function (require, exports, displayed_films_1, film_array_1, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        var viewUpdater = new ViewUpdater();
        viewUpdater.init();
    });
    var ColumnSort = (function () {
        function ColumnSort() {
            this.sortedIdx = -1;
            this.isAscending = false;
            this.prevTh = null;
        }
        return ColumnSort;
    }());
    var ViewUpdater = (function () {
        function ViewUpdater() {
            this.displayableFilmProperties = ["name", "director", "studio", "year", "genre", "revenue"];
            this.previousExpanded = null;
            this.dFilms = new displayed_films_1.DisplayedFilms();
            this.selectedFilms = new displayed_films_1.DisplayedFilms();
            this.filmArr = new film_array_1.FilmArray();
            this.columnSort = new ColumnSort();
        }
        ViewUpdater.prototype.init = function () {
            var vuInstance = this; //for accessing inner handler scope
            $("#searchBar").on("keyup", function () { vuInstance.onSubmitSearch(); });
            this.generateMovieTable();
        };
        //create table with arrays
        ViewUpdater.prototype.generateMovieTable = function () {
            var vuInstance = this; //for accessing inner handler scope
            //Add extra th
            var tableHead = $("thead").eq(0);
            var newHeader = document.createElement("th");
            $("thead tr:first").append(newHeader);
            var tableBody = $("tbody");
            for (var i = 0; i < this.filmArr.films.length; i++) {
                var currentFilm = this.filmArr.films[i];
                //Create tr and append to tableBody
                var currentTr = document.createElement("tr");
                tableBody.append(currentTr);
                currentTr.addEventListener("click", function () { vuInstance.selectRow(this); }, false);
                this.dFilms.put(this.filmArr.films[i], currentTr);
                for (var field in currentFilm) {
                    if (currentFilm.hasOwnProperty(field) && this.displayableFilmProperties.indexOf(field) !== -1) {
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
                $(currentTr).append(expandTd);
                var expandImg = document.createElement("img");
                expandImg.src = "images/expand_icon.png";
                expandImg.alt = "expand icon";
                $(expandImg).addClass("expand");
                expandTd.addEventListener("click", function (e) { vuInstance.expandDetails(this, e); }, false);
                $(expandTd).append(expandImg);
            }
            //add onclickEvents for sort on headers
            $("thead tr:first th").click(function (e) {
                if (this instanceof HTMLTableCellElement) {
                    var thisTH = this;
                    vuInstance.orderColumn(thisTH, e);
                }
            });
        };
        ViewUpdater.prototype.orderColumn = function (th, e) {
            if (this.columnSort.sortedIdx !== th.cellIndex) {
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
        };
        ViewUpdater.prototype.selectRow = function (elem) {
            if (!$(elem).hasClass("selected")) {
                $(elem).addClass("selected");
                var entry = this.dFilms.getEntryByRow(elem);
                if (entry !== null)
                    this.selectedFilms.putEntry(entry);
            }
            else {
                $(elem).removeClass("selected");
                this.selectedFilms.removeEntryByRow(elem);
            }
            var dInfo = this.selectedFilms.retrieveDataStats();
            if (dInfo.selectedRows != 0) {
                this.displayStats(dInfo);
                $("#stats").css("display", "block");
            }
            else {
                $("#stats").css("display", "none");
            }
        };
        ViewUpdater.prototype.expandDetails = function (elem, e) {
            if (this.previousExpanded !== null) {
                this.closePreviousRow();
            }
            if (this.previousExpanded !== $(elem).parent()[0]) {
                var selectedRow = $(elem).parent();
                selectedRow.addClass("active");
                var expandedRow = document.createElement("tr");
                selectedRow.after(expandedRow);
                var expandedCell = document.createElement("td");
                $(expandedRow).addClass("expandedRow");
                $(expandedRow).append(expandedCell);
                $(expandedCell).attr("colSpan", displayed_films_1.DisplayedFilms.searchProperties.length + 1);
                var selectedEntry = this.dFilms.getEntryByRow(selectedRow[0]);
                if (selectedEntry !== null) {
                    var details = selectedEntry.film.details;
                    $(expandedCell).html(details);
                    $(expandedCell).addClass("expanded");
                    this.previousExpanded = selectedRow[0];
                }
            }
            e.stopPropagation();
        };
        ViewUpdater.prototype.closePreviousRow = function () {
            //chiudi la riga precedente
            var prevExpandedCell = $(".expanded")[0]; //td (cell)
            if (this.previousExpanded !== $(".active")[0]) {
                this.previousExpanded = null;
            }
            $(".expandedRow").remove();
            $(".active").removeClass("active");
        };
        ViewUpdater.prototype.displayStats = function (stats) {
            $("#statsSelected").text(stats.selectedRows);
            $("#statsAvgRev").text(stats.avgRevenues.toLocaleString(undefined, { maximumFractionDigits: 2 }));
            $("#statsMinYear").text(stats.minYear);
            $("#statsMaxYear").text(stats.maxYear);
        };
        ViewUpdater.prototype.updateTable = function () {
            //clear the row
            $("tbody").empty();
            //remake rows with the new order
            var rows = this.dFilms.getRows();
            for (var i = 0; i < rows.length; i++) {
                var element = rows[i];
                $("tbody").append(element);
            }
        };
        ViewUpdater.prototype.onSubmitSearch = function () {
            this.closePreviousRow();
            var input = $("#searchBar");
            var inputValue = input.val();
            if (inputValue !== undefined) {
                var val = inputValue.toString();
                var matches = this.dFilms.searchString(val, false);
                var trs = $("tbody tr");
                for (var i = 0; i < this.dFilms.entries.length; i++) {
                    var currEntry = this.dFilms.entries[i];
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
        };
        return ViewUpdater;
    }());
});
