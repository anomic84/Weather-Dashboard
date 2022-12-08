var cities = "";
var currentCity = $('current-city')
var currentTemp = $('current-temp')
var currentWind = $('current-Wind')
var currentHumid = $('current-humid')
var searchBtn = $('search-button')
var searchCity = $('search-city')

let sCity = [];


//current day
$(function () {
    var currentDate = dayjs().format('MMM' + ',' + 'DD' + ',' + 'YYYY')
    $("#currentDay").text(currentDate)

    var currentTime = dayjs().hour()
})





let APIkey = 29133cb53136c367b23f03a4b6a4783e


// fetch API that finds lists of all cities

    //use that list to find api of weather in those cities

    //write searched cities in JSON to be recalled to "searched-cities"



// display current-city with current-t/h/w 



//display 5 day forcast using classes for each day

    //changes icon based on weather prediction