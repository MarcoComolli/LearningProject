var searchProperties = ["name", "director", "studio", "year", "genre", "revenue", "details"];

// //constructor
function DFilms(films, rows) {
    this.entries = [];
    for (var i = 0; i < films.length; i++) {
        var entry = { film: films[i], row: rows[i] };
        entries.push(entry);
    }
}

//constructor
function DFilms() {
    this.entries = [];
}

//methods
DFilms.prototype.put = function (cFilm, cRow) {
    this.entries.push({ film: cFilm, row: cRow })
};

DFilms.prototype.putEntry = function (entry) {
    this.entries.push(entry)
};

DFilms.prototype.getEntryByFilm = function (film) {
    for (var i = 0; i < this.entries.length; i++) {
        if (film === this.entries[i].film) {
            return this.entries[i];
        }
    }
    return null;
}

DFilms.prototype.getEntryByRow = function (row) {
    for (var i = 0; i < this.entries.length; i++) {
        if (row === this.entries[i].row) {
            return this.entries[i];
        }
    }
    return null;
}

DFilms.prototype.getFilms = function () {
    var res = [];
    for (var i = 0; i < this.entries.length; i++) {
        res.push(this.entries[i].film);
    }
    return res;
}

DFilms.prototype.getRows = function () {
    var res = [];
    for (var i = 0; i < this.entries.length; i++) {
        res.push(this.entries[i].row);
    }
    return res;
}

DFilms.prototype.sortByField = function (field) {
    this.entries.sort(propertySortDFilm(field));
}

function propertySortDFilm(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a.film[property] < b.film[property]) ? -1 : (a.film[property] > b.film[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

DFilms.prototype.retrieveDataStats = function () {
    var filmsArr = this.getFilms();
    var revenueSum = filmsArr.reduce(function (a, b) {
        var newB = parseFloat(b.revenue);
        return (a + newB);
    }, 0);

    var years = [];
    for (var i = 0; i < filmsArr.length; i++) {
        years.push(filmsArr[i].year);
    }
    return new InfoDisplay(filmsArr.length, (revenueSum / filmsArr.length), min(years), max(years));
}

DFilms.prototype.removeEntryByRow = function (row) {
    var rows = this.getRows();
    if (rows.length != 0) {
        var idx = rows.indexOf(row);
        if (idx != -1) {
            this.entries.splice(idx, 1);
        }
    }
}

DFilms.prototype.removeEntryByFilm = function (film) {
    var films = this.getFilms();
    if (films.length != 0) {
        var idx = films.indexOf(row);
        if (idx != -1) {
            this.entries.splice(idx, 1);
        }
    }
}

DFilms.prototype.searchString = function (text, isCaseSensitive) {
    var matchedIDs = [];
    if (!isCaseSensitive) {
        text = text.toLowerCase();
    }
    for (var i = 0; i < this.entries.length; i++) {
        var currentFilm = this.entries[i].film;
        for (var j = 0; j < searchProperties.length; j++) {
            var currField = currentFilm[searchProperties[j]];
            if (!(currentFilm[searchProperties[j]] instanceof String)) {
                currField += "";
            }
            if (!isCaseSensitive) {
                currField = currField.toLowerCase();
            }
            if (currField.search(text) != -1){
                matchedIDs.push(this.entries[i].film.id);
                break;
            }
        }
    }
    return matchedIDs;
}



