var rowManager = {
    expandedIdx: -1,
    selectedRows: []
}

var columnSort = {
    sortedIdx: -1,
    isAscending: false,
    prevTh: null
}

var searchedCells  = [];
var occurrences = 0;

//create table with arrays
function generateMovieTable() {
    //Add extra th
    var tableHead = document.querySelector("thead");
    var newHeader = document.createElement("th");

    tableHead.getElementsByTagName("tr")[0].appendChild(newHeader);

    var tableBody = document.querySelector("tbody");
    for (var i = 0; i < films.length; i++) {
        var currentFilm = films[i];

        //Create tr and append to tableBody
        var currentTr = document.createElement("tr");
        tableBody.appendChild(currentTr);
        rowManager.selectedRows.push(false);
        currentTr.addEventListener("click", function () { selectRow(this) }, false);
        for (var field in currentFilm) {
            if (currentFilm.hasOwnProperty(field)) {
                //crea td e appendi a tr
                var currentTd = document.createElement("td");
                currentTr.appendChild(currentTd);
                currentTd.innerHTML = currentFilm[field];
            }
        }
        var expandTd = document.createElement("td");
        currentTr.appendChild(expandTd);
        var expandImg = document.createElement("img");
        expandImg.src = "images/expand_icon.png";
        expandImg.alt = "expand icon";
        insertClass(expandImg, "expand");
        expandTd.addEventListener("click", function () { expandDetails(this) }, false);
        expandTd.appendChild(expandImg);
    }

    //add onclickEvents for sort on headers
    var headerRow = tableHead.getElementsByTagName("tr")[0];
    for (var i = 0; i < FIELD_SIZE; i++) {
        var th = headerRow.getElementsByTagName("th")[i];

        th.addEventListener("click", function () { orderColumn(this) }, false);
    }

}

function orderColumn(th) {
    console.log("Entro " + th.cellIndex);
    if (columnSort.sortedIdx !== th.cellIndex) { //clicked on different column
        columnSort.isAscending = true;
        columnSort.sortedIdx = th.cellIndex;
        insertClass(th, "asc");
        if(columnSort.prevTh !== null){
            removeClass(columnSort.prevTh,"asc");
            removeClass(columnSort.prevTh,"desc");
        }
        columnSort.prevTh = th;
     
    }
    else {
        columnSort.isAscending = !columnSort.isAscending;
        if (columnSort.isAscending) {
            removeClass(th, "desc");
            insertClass(th, "asc");
        }
        else {
            removeClass(th, "asc");
            insertClass(th, "desc");
        }

    }
    switch (th.cellIndex) {
        case 0:
            if (columnSort.isAscending) {
                orderFilmsByField("name");
            }
            else {
                orderFilmsByField("-name");
            }
            break;
        case 1:
            if (columnSort.isAscending) {
                orderFilmsByField("director");
            }
            else {
                orderFilmsByField("-director");
            }
            break;
        case 2:
            if (columnSort.isAscending) {
                orderFilmsByField("studio");
            }
            else {
                orderFilmsByField("-studio");
            }
            break;
        case 3:
            if (columnSort.isAscending) {
                orderFilmsByField("year");
            }
            else {
                orderFilmsByField("-year");
            }
            break;
        case 4:
            if (columnSort.isAscending) {
                orderFilmsByField("genre");
            }
            else {
                orderFilmsByField("-genre");
            }
            break;
        case 5:
            if (columnSort.isAscending) {
                orderFilmsByField("revenue");
            }
            else {
                orderFilmsByField("-revenue");
            }
            break;
        default:
            break;
    }
    columnSort.sortedIdx
    replaceTableWithNewArray();


}

function selectRow(elem) {
    if (elem.className.indexOf("selected") === -1) {
        insertClass(elem, "selected");
        // if(rowManager.expandedIdx === 0 || rowManager.expandedIdx < (elem.rowIndex-1)){
        //     rowManager.selectedRows[elem.rowIndex-1] = true;
        //     console.log("0 " + (elem.rowIndex-1)); 
        // }
        // else{
        //     rowManager.selectedRows[elem.rowIndex-1] = true;
        //     console.log("1 " + (elem.rowIndex-1)); 
        // }
        rowManager.selectedRows[elem.rowIndex - 1] = true;
        console.log("Select " + (elem.rowIndex - 1));

    }
    else {
        removeClass(elem, "selected")
        rowManager.selectedRows[elem.rowIndex - 1] = false;
        console.log("Deselect " + (elem.rowIndex - 1));
        //    if(rowManager.expandedIdx === 0 || rowManager.expandedIdx < (elem.rowIndex-1)){
        //         rowManager.selectedRows[elem.rowIndex-1] = false;
        //         console.log("2 " + (elem.rowIndex-1)); 
        //     }
        //     else{
        //         rowManager.selectedRows[elem.rowIndex-1] = false;
        //         console.log("3 " + (elem.rowIndex-1)); 
        //     }
    }
    var dataRequest = retrieveDataStats(rowManager.selectedRows);
    if (dataRequest.length != 0 && dataRequest[0] > 0) {
        document.getElementById("stats").innerHTML = formatStats(dataRequest);
        document.getElementById("stats").style.display = "block";
    }
    else {
        document.getElementById("stats").style.display = "none";
    }

}

function expandDetails(elem) {
    var isSameRow = false;
    if (rowManager.expandedIdx !== -1) {
        //chiudi la riga precedente
        var previousExpanded = document.getElementsByClassName("expanded")[0]; //td (cell)

        removeClass(document.getElementsByClassName("active")[0], "active");
        previousExpanded.parentNode.removeChild(previousExpanded);
        if (rowManager.expandedIdx === elem.parentNode.rowIndex) {
            isSameRow = true;
        }
        rowManager.expandedIdx = -1;
    }
    if (rowManager.expandedIdx != elem.parentNode.rowIndex && !isSameRow) {
        rowManager.expandedIdx = elem.parentNode.rowIndex;
        var expandedRow = document.createElement("tr");
        elem.parentNode.insertAdjacentElement('afterend', expandedRow);

        var expandedCell = document.createElement("td");
        expandedCell.colSpan = FIELD_SIZE + 1;
        expandedCell.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed dapibus lorem. " +
            "Praesent rhoncus sagittis fringilla. Fusce suscipit aliquet sodales. Proin vehicula dui ac mauris dapibus, ac eleifend turpis varius." +
            " Donec vel ex sollicitudin, placerat odio eu, aliquet turpis. Morbi molestie ullamcorper nibh at vestibulum. " +
            " Vivamus placerat ullamcorper eros nec faucibus. Donec volutpat dignissim elit, sit amet lobortis turpis tincidunt vel. " +
            "Quisque ut rhoncus magna. Mauris convallis tortor et magna venenatis, vitae cursus eros venenatis. Nam a pulvinar eros. ";
        insertClass(expandedCell, "expanded");
        insertClass(elem.parentNode, "active");
        expandedRow.appendChild(expandedCell);
    }
    event.stopPropagation();
}

function insertClass(element, classToInsert) {
    var className = element.className;
    if (className === "") {
        element.className = classToInsert;
    }
    else {
        element.className += " " + classToInsert;
    }
}

function removeClass(element, classToDelete) {
    element.className = element.className.replace(classToDelete, "");
}

function formatStats(stats) {
    var resultStr = "";
    resultStr += "Selected: " + stats[0] + "<br>";
    resultStr += "AVG revenue: " + stats[1].toLocaleString() + "<br>";
    resultStr += "Years: MIN - " + stats[2] + " MAX - " + stats[3];
    return resultStr;
}

// function getElementIndex(node) {
//     var index = 0;
//     while ( (node = node.previousElementSibling) ) {
//         index++;
//     }
//     return index;
// }

function replaceTableWithNewArray() {

    var tableBody = document.querySelector("tbody");
    for (var i = 0; i < films.length; i++) {
        var currentFilm = films[i];

        //Get the tr and change its td's innerHTML 
        var currentTr = tableBody.getElementsByTagName("tr")[i];

        var cnt = 0;
        for (var field in currentFilm) {
            if (currentFilm.hasOwnProperty(field)) {
                var currentTd = currentTr.getElementsByTagName("td")[cnt];
                currentTd.innerHTML = currentFilm[field];
                cnt++;
            }
        }
    }
}

function onSubmitSearch() {
    occurrences = 0;
    var searchText = document.getElementById("searchBar").value;
    var displayCount = document.getElementById("searchResult");

    if(searchedCells.length !== 0){
        console.log("Entro if");
        var length = searchedCells.length;
        for (var i = 0; i < length; i++) {
            console.log("Entro for");
            removeClass(searchedCells.pop(),"found");
            
        }
    }
    if (searchText.length > 0) {
        recursiveSearch(document.getElementsByTagName("main")[0], searchText); //main
        recursiveSearch(document.getElementsByTagName("footer")[0], searchText); //footer
        console.log("Occurr " + occurrences);
    }
    displayCount.innerHTML = occurrences;
    console.log("Occ " + occurrences + " searched " + searchedCells.length);
    //console.log("ch " + document.body.childNodes.length);
}

function recursiveSearch(node, searchText) {
    var nodes = node.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType === 3 || nodes[i].nodeValue !== null) { //if is text node or has text value
            var text = nodes[i].nodeValue;
            var regxp = new RegExp(searchText, "gi");
            //var replaced = text.replace(regxp, "<span class='txtFound'>" + searchText + "</span>");
            var count = (text.match(regxp) || []).length;
            occurrences += count;
            if(count != 0){ //occurrence found
                var maybeTd = nodes[i].parentNode;
                if(maybeTd instanceof HTMLTableCellElement){
                    insertClass(maybeTd,"found");
                    searchedCells.push(maybeTd);
                }
            }

            // nodes[i].nodeValue = replaced;
            continue;
        }
        if (nodes[i].childNodes.length > 0) {
            recursiveSearch(nodes[i], searchText);
        }
    }
}


