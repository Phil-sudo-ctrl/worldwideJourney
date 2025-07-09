const searchText = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');

let jsonData;

const api = fetch('./travel_recommendation_api.json', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
   .then(response => response.json())
   .then(function(response){jsonData = response});

function lowercase(word) {
    return String(word).toLowerCase();
}
function addTrailingS(word){
    let newWord;
    if (String(word).charAt(String(word).length - 1) === 's'){
        newWord = word;
    } else {
        if(String(word).charAt(String(word).length - 1) === 'y'){
            newWord = String(word).slice(0, String(word).length - 1) + "ies"
        } else {
            if(String(word).charAt(String(word).length - 1) === 'e'){
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
        if(unifiedKeyword == key){
            response = value;
        }
    })
    if(response == null){
        response = "no such keyword found";
    }
    return response;
}
function search(){
    console.log(trySearching(searchText.value))
}

searchButton.addEventListener('click', search);
