
let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let replayButton = document.querySelector('#replay')

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available

// TODO when the page loads, select an element at random from the countriesAndCodes array
// TODO display the country's name in the randomCountryElement

newCountry()

// Function
function newCountry () {
    let countryIndex = Math.floor(Math.random()*countriesAndCodes.length)
    let country =  countriesAndCodes[index].name
    randomCountryElement.innerHTML = country
}

// When submit button is clicked
submitButton.addEventListener('click', function (countryIndex) {
    let answer = userAnswerElement.value
    // Create url based on country code
    let url = `http://api.worldbank.org/v2/country/${countriesAndCodes[countryIndex]['alpha-2']}?format=json`
    // Get the data for the country in question
    fetch(url)
        .then( res => res.json() )
        .then( countryData => {
            // Locate capital city in json data, compare it to user answer and display message
            let result = countryData[1][0].capitalCity
            if (result.toLowerCase() === answer.toLowerCase()) {
                resultTextElement.innerHTML = `Yes! ${result} is correct.`
            } else {
                resultTextElement.innerHTML = `Sorry, no. ${result} is the correct answer.`
            }
        })
        .catch( err => {        // Error handling
            console.log(err)
        })
})



// When the replay button is clicked
replayButton.addEventListener('click', function () {
    userAnswerElement.value = ''            // clear answer
    resultTextElement.innerHTML = ''            // clear result
    newCountry()

})



