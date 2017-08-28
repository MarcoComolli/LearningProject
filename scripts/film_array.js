var LOREM_IPSUM =  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed dapibus lorem. " +
            "Praesent rhoncus sagittis fringilla. Fusce suscipit aliquet sodales. Proin vehicula dui ac mauris dapibus, ac eleifend turpis varius." +
            " Donec vel ex sollicitudin, placerat odio eu, aliquet turpis. Morbi molestie ullamcorper nibh at vestibulum. " +
            " Vivamus placerat ullamcorper eros nec faucibus. Donec volutpat dignissim elit, sit amet lobortis turpis tincidunt vel. " +
            "Quisque ut rhoncus magna. Mauris convallis tortor et magna venenatis, vitae cursus eros venenatis. Nam a pulvinar eros. ";

//create object arraylist
var films = [];

films.push(new Film("The Matrix", "The Wachowski Brothers", "Warner Bros.", 1999, "Sci-fi", "463,517,383","Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. Morpheus awakens Neo to the real world, a ravaged wasteland where most of humanity have been captured by a race of machines that live off of the humans' body heat and electrochemical energy and who imprison their minds within an artificial reality known as the Matrix. As a rebel against the machines, Neo must return to the Matrix and confront the agents: super-powerful computer programs devoted to snuffing out Neo and the entire human rebellion."));
films.push(new Film("Lethal Weapon 3", "Richard Donner", "Warner Bros.", 1992, "Action, Comedy", "321,731,527","Police officers Riggs and Murtaugh team together for the third time. This time they must track down a guy who has robbed weapons from the Los Angeles police depot. Riggs and Murtaugh also have to deal with Leo Getz, the hectic guy from Lethal Weapon 2 and Riggs has very special problems with a young and beautiful female police officer."));
films.push(new Film("The Lion King", "Roger Allers,Rob Minkoff", "Disney", 1994, "Animation,Musical", "766,964,132","A young lion Prince is cast out of his pride by his cruel uncle, who claims he killed his father. While the uncle rules with an iron paw, the prince grows up beyond the Savannah, living by a philosophy: No worries for the rest of your days. But when his past comes to haunt him, the young Prince must decide his fate: will he remain an outcast, or face his demons and become what he needs to be?"));
films.push(new Film("Forrest Gump", "Robert Zemeckis", "Paramount", 1994, "Comedy,Drama", "677,387,716","A simple-minded but kind-hearted Alabama boy grows up with his best friend - a beautiful girl called Jenny. He succeeds in life through a mixture of luck and destiny and thus influences and is present at some of the most important events in the second half of the 20th century. Throughout his life he is told by other characters what life is about and whether it's all random or destined to happen, but he comes to his own conclusion towards the end."));
films.push(new Film("The Bodyguard", "Mick Jackson", "Warner Bros.", 1992, "Romantic,Thriller", "411,006,740","A pop singer has been receiving threatening notes, and her manager hires a bodyguard known for his good work. The bodyguard ruffles the singer's feathers and most of her entourage by tightening security more than they feel is necessary. The bodyguard is haunted by the fact that he was on Reagan's secret service staff but wasn't there to prevent the attack by Hinckley"));
films.push(new Film("Star Wars Episode I: The Phantom Menace", "George Lucas", "Fox", 1999, "Fantascience", "924,317,558","Two Jedi Knights escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their old glory."));
films.push(new Film("Pretty Woman", "Garry Marshall", "Touchstone Pictures", 1990, "Romantic,Comedy", "463,406,268","Edward is a rich, ruthless businessman who specializes in taking over companies and then selling them off piece by piece. He travels to Los Angeles for a business trip and decides to hire a prostitute. They take a liking to each other and he offers her money if she'll stay with him for an entire week while he makes the 'rich and famous' scene. Romantic comedy (and complications) ensue."));
films.push(new Film("Top Gun", "Tony Scott", "Paramount", 1986, "Romantic,Action,Drama", "176,781,728","Pete 'Maverick' Mitchell is an expert United States Naval Aviator. When he encounters a pair of MiGs over the Persian Gulf, his wingman is clearly outflown and freaks. On almost no fuel, Maverick is able to talk him back down to the carrier. When his wingman turns in his wings, Maverick is moved up in the standings and sent to the Top Gun Naval Flying School. There he fights the attitudes of the other pilots and an old story of his father's death in combat that killed others due to his father's error. Maverick struggles to be the best pilot, stepping on the toes of his other students and in another way to Charlie Blackwood, a civilian instructor to whom he is strongly attracted."));
films.push(new Film("Ghost", "Jerry Zucker", "Paramount Pictures", 1990, "Romantic,Fantasy,Thriller", "505,702,588","Sam Wheat is a banker, Molly Jensen is an artist, and the two are madly in love. However, when Sam is murdered by friend and corrupt business partner Carl Bruner over a shady business deal, he is left to roam the earth as a powerless spirit. When he learns of Carl's betrayal, Sam must seek the help of psychic Oda Mae Brown to set things right and protect Molly from Carl and his goons."));
films.push(new Film("The Lord of the Rings: The Two Towers", "Peter Jackson", "New Line Cinema", 2002, "Fantasy,Adventure", "926,047,111","While Frodo and Sam, now accompanied by a new guide, continue their hopeless journey towards the land of shadow to destroy the One Ring, each member of the broken fellowship plays their part in the battle against the evil wizard Saruman and his armies of Isengard."));
films.push(new Film("Pirates of the Caribbean: Dead Man's Chest", "Gore Verbinski", "Disney", 2006, "Fantasy", "1,066,179,725","When ghostly pirate Davy Jones comes to collect a blood debt, Capt. Jack Sparrow must find a way to avoid his fate lest his soul be damned for all time. Nevertheless, the wily ghost manages to interrupt the wedding plans of Jack's friends Will Turner and Elizabeth Swann."));
films.push(new Film("Spider-Man", "Sam Raimi", "Columbia", 2002, "Superhero", "821,708,551","Based off of the hit Marvel comics by Stan Lee, Spider-Man tells the story of a shy, nerdy high school teen, Peter Parker, who gets bitten by a radioactive spider, and soon gains super human abilities from it. But, after a tragic event occurs in his family, he realizes that his newly found powers should be used only for good."));
films.push(new Film("The Da Vinci Code", "Ron Howard", "Columbia", 2006, "Thriller,Mystery", "758,239,851","Professor Robert Langdon is in Paris on business when he's summoned to The Louvre. A dead body has been found, setting Langdon off on an adventure as he attempts to unravel an ancient code and uncover the greatest mystery of all time."));
films.push(new Film("Platoon", "Oliver Stone", "Orion Pictures", 1986, "War", "138,530,565","A gritty and emotional look at the lives of a platoon of American soldiers as they patrol, fight and die in the jungles of Vietnam as seen through the perspective of a young recruit. Two veteran sergeants clash when one of them precipitates a massacre of villagers."));



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
    var selected = getSelectedIndexes(selectedArray);

    var revenueSum = 0;
    for (var i = 0; i < selected.length; i++) {
        revenueSum += films[selected[i]].revenue;
    }

    var years = [];
    for (var i = 0; i < selected.length; i++) {
        years.push(films[selected[i]]["year"]);
    }
    return new InfoDisplay(selected.length,(revenueSum / selected.length),min(years),max(years));
}

function max(array) {
    return Math.max.apply(Math, array);
}

function min(array) {
    return Math.min.apply(Math, array);
}

function orderFilmsByField(arr,field) {
    arr.sort(propertySort(field));
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
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
}