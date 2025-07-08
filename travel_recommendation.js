const api = fetch('./travel_recommendation_api.json', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
   .then(response => response.json())
   .then(response => console.log(JSON.stringify(response)));

function capitalize(word) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}

function trySearching(keyword) {
    let unifiedKeyword = capitalize(String(keyword).toLowerCase());
    let i = 0;
    //while i < 
}