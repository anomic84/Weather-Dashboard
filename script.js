const input = document.getElementById("city-input");
const search = document.getElementById("search-button");
const clear = document.getElementById("clear-history");
const name = document.getElementById("city-name");
const currentPic = document.getElementById("current-pic");
const currentTemp = document.getElementById("temperature");
const currentHumidity = document.getElementById("humidity");
const currentWind = document.getElementById("wind-speed");
const currentUV = document.getElementById("UV-index");
const history = document.getElementById("history");
const searchedcity = document.querySelector('.cityhistory')
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory)

let APIkey = "29133cb53136c367b23f03a4b6a4783e"


// function to get API of searched city
function getApiData(city) {
    // actauly fetch from API 
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey + "&units=imperial")
        // Went over this with the tutor, arrow function
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            // Getting current date
            var currentDate = new Date(res.dt * 1000);
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            // formatting the date in my chosen order
            name.innerHTML = res.name + " (" + month + "/" + day + "/" + year + ") ";
            // sets Icon attributed to weather
            currentPic.setAttribute("src", "https://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png");
            currentPic.setAttribute("alt", res.weather[0].description);
            //rounds down decimal of temp to whole number, these set the t/h/w for current day
            currentTemp.innerHTML = "Temp: " + Math.floor(res.main.temp) + " &#176F"
            currentHumidity.innerHTML = "Humidity: " + Math.floor(res.main.humidity) + "%"
            currentWind.innerHTML = "Wind Speed: " + Math.floor(res.wind.speed) + " mph"
            // fetches entered city's data from API
            var cityID = res.id
            fetch("https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIkey + "&units=imperial")
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    var forecast = document.querySelectorAll(".forecast")

                    for (let i = 0; i < forecast.length; i++) {
                        forecast[i].innerHTML = "";
                        // API data splits every day into 8 sections so we multiply by 8 to only select one of those 8 parts, than do that 4 more times for the next four days
                        var forecastIndex = i * 8 + 4
                        var forecastDate = new Date(res.list[forecastIndex].dt * 1000);
                        var forecastDay = forecastDate.getDate();
                        var forecastMonth = forecastDate.getMonth() + 1;
                        var forecastYear = forecastDate.getFullYear();
                        var forecastDate = document.createElement("p");
                        // this adds the cards for each day in the 5 day forcast
                        forecastDate.setAttribute("class", "mt-3 mb-0 forecast-date");
                        forecastDate.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                        forecast[i].append(forecastDate);
                        var forecastImg = document.createElement("img");
                        forecastImg.setAttribute("src", "https://openweathermap.org/img/wn/" + res.list[forecastIndex].weather[0].icon + "@2x.png");
                        forecastImg.setAttribute("alt", res.list[forecastIndex].weather[0].description);
                        forecast[i].append(forecastImg);
                        var forecastTemp = document.createElement("p")
                        forecastTemp.innerHTML = "Temp: " + Math.floor(res.list[forecastIndex].main.temp) + " &#176F"
                        forecast[i].append(forecastTemp)
                        var forecastHumidity = document.createElement("p")
                        forecastHumidity.innerHTML = "Humidity: " + Math.floor(res.list[forecastIndex].main.humidity) + "%"
                        forecast[i].append(forecastHumidity)
                        var forecastWindSpeed = document.createElement("p")
                        forecastWindSpeed.innerHTML = "Wind Speed: " + Math.floor(res.list[forecastIndex].wind.speed) + " mph"
                        forecast[i].append(forecastWindSpeed)
                    }
                })
        })
}
// City Search button/function
search.addEventListener("click", function () {
    var city = input.value
    getApiData(city)
    // if statement to disallow duplicates
    if (searchHistory.indexOf(city.toLowerCase()) !== -1) {
        return
    }
    searchHistory.push(city.toLowerCase())
    localStorage.setItem("search", JSON.stringify(searchHistory))
    renderHistory()
})
// clear button
clear.addEventListener("click", function () {
    searchHistory = []
    renderHistory()
})

// Allows me to click on city in searched area to reload the 5-day forcast
function renderHistory() {
    history.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        var historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("style", "margin-bottom: 10px;")
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "form-control cityhistory d-block bg-grey");
        historyItem.setAttribute("value", searchHistory[i]);
        console.log("value", this.text)
        // turns the searched city list names into buttons to click
        historyItem.onclick = findHistory
        history.append(historyItem);
    }
}

function findHistory(event) {
    console.log(event.target.value)
    getApiData(event.target.value);

}
renderHistory()





