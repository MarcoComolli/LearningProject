//constructor
function Film(name, director, studio, year, genre, revenue) {
    //properties
    this.name = name;
    this.director = director;
    this.studio = studio;
    this.year = year;
    this.genre = genre;
    this.revenue = revenue;
}

//methods
Film.prototype.getNumericRavenue = function () {
    var replaced = this.revenue.replace(new RegExp(",", 'g'), "");
    return parseFloat(replaced);
};


var FIELD_SIZE = 6;