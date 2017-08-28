var FIELD_SIZE = 8;
var idCounter = 0;

//constructor
function Film(name, director, studio, year, genre, revenue, details) {
    //properties
    this.id = idCounter++;
    this.name = name;
    this.director = director;
    this.studio = studio;
    this.year = year;
    this.genre = genre;
    this.revenue = this.getNumericRavenue(revenue);
    this.details = details;
}

//methods
Film.prototype.getNumericRavenue = function (revenue) {
    var replaced = revenue.replace(new RegExp(",", 'g'), "");
    return parseFloat(replaced);
};
