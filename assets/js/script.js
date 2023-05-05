
var modalResponse = document.querySelector(".error")

function errorHandeler(event){
    
    var element = event.target;
    console.log(element)
    if(element.matches("button")){
        modalResponse.classList.add('invisible');
    }
}


modalResponse.addEventListener("click", errorHandeler)

//Jose Seto Code
var searchCity = $("#search-city")
var APIkey = "c8af164d906f1649b6b1089b5ec881b1"
var searchButtonEl = $("#search-button")
var clearButtonEl = $("#clear-button")


function getWeather(city){
    //Fetches data from geolocation api to parse out latitude and longitude for second fetch
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIkey)
    .then (function(response){
        response.json()
        .then (function(data){
            var lat = data[0].lat
            var lon = data[0].lon
            //Calls 5 day 3 hour forecast with previously obtained latitude and longitude
            fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey)
            .then(function(report){
                report.json()
                .then(function(data){
                    //The given values sets the loop to look at one specific time of day across the five days
                    for(i = 7; i < data.list.length; i += 8){
                        //Coverts the unix timestamp into a readable format via dayjs
                        var parseDays = dayjs.unix(data.list[i].dt).format('ddd')
                        forecast(parseDays, data);
                    }
                })
            })
        })
    })
}

//When called this will check if the given day is either Fri, Sat, or Sun
//If it is true, it will display the temperature, humidity and the date on the correct card.
function forecast(parseDays, data){
    if (parseDays == "Fri"){
        var date = dayjs.unix(data.list[i].dt).format('dddd, MMM D, YYYY')
        var humidity= data.list[i].main.humidity;
        var tempK= data.list[i].main.temp;
        var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);

        $("#fHumidity0").html(humidity+"%")
        $("#fDate0").html(date)
        $("#fTemp0").html(tempF+"&#8457");
    }
    else if(parseDays == "Sat"){
        var date = dayjs.unix(data.list[i].dt).format('dddd, MMM D, YYYY')
        var humidity= data.list[i].main.humidity;
        var tempK= data.list[i].main.temp;
        var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);

        $("#fHumidity1").html(humidity+"%")
        $("#fDate1").html(date)
        $("#fTemp1").html(tempF+"&#8457");
    }
    else if(parseDays == "Sun"){
        var date = dayjs.unix(data.list[i].dt).format('dddd, MMM D, YYYY')
        var humidity= data.list[i].main.humidity;
        var tempK= data.list[i].main.temp;
        var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);

        $("#fHumidity2").html(humidity+"%")
        $("#fDate2").html(date)
        $("#fTemp2").html(tempF+"&#8457");
    }
    else{
        return;
    }
}

//Trims user search and calls getWeather function
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        getWeather(city);
    }
}

//Adds the searched option into a history list
function addToList(event){
    event.preventDefault();
    var listEl= $("<li>" + city + "</li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value",city);
    $(".History").append(listEl);
}

//When a previous location is clicked, it will call the getWeather function with the previous search
function invokePastSearch(event){
    var liEl=event.target;
    if (event.target.matches("li")){
        city=liEl.textContent.trim();
        getWeather(city);
    }

}

//Clears the history list and resets the current weather display to blank
function clearHistory(event){
    event.preventDefault();
    $(".History").empty();
    for(var i = 0; i < 3; i++){
        $("#fDate" + i).empty();
        $("#fTemp" + i).empty();
        $("#fHumidity" + i).empty();
    }
}

//click events
$("#planner-button").on("click",function(){
    document.location.replace('./planner.html');
})
$(document).on("click",invokePastSearch);
searchButtonEl.on("click", displayWeather)
searchButtonEl.on("click", addToList)
clearButtonEl.on("click", clearHistory)

