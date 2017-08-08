//create object arraylist
var films = [];

films.push(new Film("The Matrix", "The Wachowski Brothers", "Warner Bros.", 1999, "Sci-fi", "463,517,383"));
films.push(new Film("Lethal Weapon 3", "Richard Donner", "Warner Bros.", 1992, "Action, Comedy", "321,731,527"));
films.push(new Film("The Lion King", "Roger Allers,Rob Minkoff", "Disney", 1994, "Animation,Musical", "766,964,132"));
films.push(new Film("Forrest Gump", "Robert Zemeckis", "Paramount", 1994, "Comedy,Drama", "677,387,716"));
films.push(new Film("The Bodyguard", "Mick Jackson", "Warner Bros.", 1992, "Romantic,Thriller", "411,006,740"));
films.push(new Film("Star Wars Episode I: The Phantom Menace", "George Lucas", "Fox", 1999, "Fantascience", "924,317,558"));
films.push(new Film("Pretty Woman", "Garry Marshall", "Touchstone Pictures", 1990, "Romantic,Comedy", "463,406,268"));
films.push(new Film("Top Gun", "Tony Scott", "Paramount", 1986, "Romantic,Action,Drama", "176,781,728"));
films.push(new Film("Ghost", "Jerry Zucker", "Paramount Pictures", 1990, "Romantic,Fantasy,Thriller", "505,702,588"));
films.push(new Film("The Lord of the Rings: The Two Towers", "Peter Jackson", "New Line Cinema", 2002, "Fantasy,Adventure", "926,047,111"));
films.push(new Film("Pirates of the Caribbean: Dead Man's Chest", "Gore Verbinski", "Disney", 2006, "Fantasy", "1,066,179,725"));
films.push(new Film("Spider-Man", "Sam Raimi", "Columbia", 2002, "Superhero", "821,708,551"));
films.push(new Film("The Da Vinci Code", "Ron Howard", "Columbia", 2006, "Thriller,Mystery", "758,239,851"));
films.push(new Film("Platoon", "Oliver Stone", "Orion Pictures", 1986, "War", "138,530,565"));


function getSelectedIndexes(selectedArray) {
    if (Array.isArray(selectedArray)) {
        var indexArray = [];
        for (var i = 0; i < selectedArray.length; i++) {
            if (selectedArray[i]) {
                indexArray.push(i);
            }
        }
        return indexArray;
    }
    else {
        return null;
    }
}

function retrieveDataStats(selectedArray) {
    var result = []; //0:rowSelected, 1:media guadagni, 2: min anno 3:max anno
    var selected = getSelectedIndexes(selectedArray);
    result.push(selected.length);

    var revenueSum = 0;
    for (var i = 0; i < selected.length; i++) {
        revenueSum += films[selected[i]].getNumericRavenue();
    }
    result.push((revenueSum / selected.length));

    var years = [];
    for (var i = 0; i < selected.length; i++) {
        years.push(films[selected[i]]["year"]);
    }
    result.push(min(years));
    result.push(max(years));
    return result;
}

function max(array) {
    return Math.max.apply(Math, array);
}

function min(array) {
    return Math.min.apply(Math, array);
}

function orderFilmsByField(field) {
    films.sort(propertySort(field));
}

// function printArray(arr){
//     for (var i = 0; i < arr.length; i++) {
//         console.log(i + " " + arr[i]["name"]);
//     }
// }

function propertySort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    if (property !== "revenue") {
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    else {
        return function (a, b) {
            var result = (a.getNumericRavenue() < b.getNumericRavenue()) ? -1 : (a.getNumericRavenue() > b.getNumericRavenue()) ? 1 : 0;
            return result * sortOrder;
        }
    }
}