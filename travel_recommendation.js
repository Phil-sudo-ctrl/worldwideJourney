const searchText = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const resetButton = document.getElementById('resetButton');
const resultDisplay = document.getElementById('searchResult');

const title_0 = document.getElementById('result_title_0');
const description_0 = document.getElementById('result_description_0');

const title_1 = document.getElementById('result_title_1');
const description_1 = document.getElementById('result_description_1');

let jsonData;
let type;

const api = fetch('./travel_recommendation_api.json', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
    .then(response => response.json())
    .then(function (response) { jsonData = response });

function lowercase(word) {
    return String(word).toLowerCase();
}
function addTrailingS(word) {
    let newWord;
    if (String(word).charAt(String(word).length - 1) === 's') {
        newWord = word;
    } else {
        if (String(word).charAt(String(word).length - 1) === 'y') {
            newWord = String(word).slice(0, String(word).length - 1) + "ies"
        } else {
            if (String(word).charAt(String(word).length - 1) === 'e') {
                newWord = word + 's';
            } else {
                newWord = word + 'es';
            }
        }
    }
    return newWord;
}

function trySearching(keyword) {
    let unifiedKeyword = addTrailingS(lowercase(keyword));
    let response;
    Object.entries(jsonData).forEach(([key, value]) => {
        if (unifiedKeyword == key) {
            type = key;
            response = value;
        }
    })
    if (response == null) {
        response = "no such keyword found";
    }
    return response;
}
function search() {
    let values = trySearching(searchText.value);
    
    resultDisplay.classList.remove("display_none");
    resultDisplay.classList.add("display_true");
    
    if (type == "countries") {
        title_0.innerHTML = values[0].cities[0].name;
        title_1.innerHTML = values[1].cities[0].name;
        description_0.innerHTML = values[0].cities[0].description;
        description_1.innerHTML = values[1].cities[0].description;
    } else {
        if (type == "temples" || type == "beaches"){   
            title_0.innerHTML = values[0].name;
            title_1.innerHTML = values[1].name;
            description_0.innerHTML = values[0].description;
            description_1.innerHTML = values[1].description;
        } else {
            reset()
        }
    }
}
function reset() {
    resultDisplay.classList.add("display_none");
    resultDisplay.classList.remove("display_true");
}


searchButton.addEventListener('click', search);
resetButton.addEventListener('click', reset);