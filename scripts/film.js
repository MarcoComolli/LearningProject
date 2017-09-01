define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FIELD_SIZE = 8;
    var idCounter = 0;
    var Film = (function () {
        function Film(name, director, studio, year, genre, revenue, details) {
            this.id = idCounter++;
            this.name = name;
            this.director = director;
            this.studio = studio;
            this.year = year;
            this.genre = genre;
            this.details = details;
            this.revenue = this.getNumericRavenue(revenue);
        }
        Film.prototype.getNumericRavenue = function (revenue) {
            var replaced = revenue.replace(new RegExp(",", 'g'), "");
            return parseFloat(replaced);
        };
        ;
        return Film;
    }());
    exports.Film = Film;
});
