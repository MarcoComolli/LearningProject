define(["require", "exports", "./info_display"], function (require, exports, info_display_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Entry = (function () {
        function Entry(film, row) {
            this.film = film;
            this.row = row;
        }
        return Entry;
    }());
    exports.Entry = Entry;
    var DisplayedFilms = (function () {
        function DisplayedFilms() {
            this.entries = [];
            this.entries = [];
        }
        DisplayedFilms.prototype.init = function (films, rows) {
            for (var i = 0; i < films.length; i++) {
                var entry = new Entry(films[i], rows[i]);
                this.entries.push(entry);
            }
        };
        DisplayedFilms.prototype.put = function (cFilm, cRow) {
            this.entries.push(new Entry(cFilm, cRow));
        };
        DisplayedFilms.prototype.putEntry = function (entry) {
            this.entries.push(entry);
        };
        DisplayedFilms.prototype.getEntryByFilm = function (film) {
            for (var i = 0; i < this.entries.length; i++) {
                if (film === this.entries[i].film) {
                    return this.entries[i];
                }
            }
            return null;
        };
        DisplayedFilms.prototype.getEntryByRow = function (row) {
            for (var i = 0; i < this.entries.length; i++) {
                if (row === this.entries[i].row) {
                    return this.entries[i];
                }
            }
            return null;
        };
        DisplayedFilms.prototype.getFilms = function () {
            var res = [];
            for (var i = 0; i < this.entries.length; i++) {
                res.push(this.entries[i].film);
            }
            return res;
        };
        DisplayedFilms.prototype.getRows = function () {
            var res = [];
            for (var i = 0; i < this.entries.length; i++) {
                res.push(this.entries[i].row);
            }
            return res;
        };
        DisplayedFilms.prototype.sortByField = function (field) {
            this.entries.sort(this.propertySortDFilm(field));
        };
        DisplayedFilms.prototype.propertySortDFilm = function (property) {
            var sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a, b) {
                var result = (a.film[property] < b.film[property]) ? -1 : (a.film[property] > b.film[property]) ? 1 : 0;
                return result * sortOrder;
            };
        };
        DisplayedFilms.prototype.max = function (array) {
            return Math.max.apply(Math, array);
        };
        DisplayedFilms.prototype.min = function (array) {
            return Math.min.apply(Math, array);
        };
        DisplayedFilms.prototype.retrieveDataStats = function () {
            var filmsArr = this.getFilms();
            var revenueSum = filmsArr.reduce(function (a, b) {
                return (a + b.revenue);
            }, 0);
            var years = [];
            for (var i = 0; i < filmsArr.length; i++) {
                years.push(filmsArr[i].year);
            }
            return new info_display_1.InfoDisplay(filmsArr.length, (revenueSum / filmsArr.length), this.min(years), this.max(years));
        };
        DisplayedFilms.prototype.removeEntryByRow = function (row) {
            var rows = this.getRows();
            if (rows.length != 0) {
                var idx = rows.indexOf(row);
                if (idx != -1) {
                    this.entries.splice(idx, 1);
                }
            }
        };
        DisplayedFilms.prototype.removeEntryByFilm = function (film) {
            var films = this.getFilms();
            if (films.length != 0) {
                var idx = films.indexOf(film);
                if (idx != -1) {
                    this.entries.splice(idx, 1);
                }
            }
        };
        DisplayedFilms.prototype.searchString = function (text, isCaseSensitive) {
            var matchedIDs = [];
            if (!isCaseSensitive) {
                text = text.toLowerCase();
            }
            for (var i = 0; i < this.entries.length; i++) {
                var currentFilm = this.entries[i].film;
                for (var j = 0; j < DisplayedFilms.searchProperties.length; j++) {
                    var currField = currentFilm[DisplayedFilms.searchProperties[j]];
                    if (!(currentFilm[DisplayedFilms.searchProperties[j]] instanceof String)) {
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
        };
        DisplayedFilms.searchProperties = ["name", "director", "studio", "year", "genre", "revenue", "details"];
        return DisplayedFilms;
    }());
    exports.DisplayedFilms = DisplayedFilms;
});
