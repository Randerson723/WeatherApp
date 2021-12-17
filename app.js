//Select Elements
const iconElement = document.querySelector(".weather-icon")
const tempElement = document.querySelector(".temperature-value p")
const descElement = document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".location p")
const notificationElement = document.querySelector(".notification")

//App data
const weather = {}
//creating a weather object
weather.temperature = {
    unit: "celsius"
}

// APP CONST AND VARS
const KELVIN = 273;
//API KEY
const key = "978f95f353244cae10dd0359ae40b034";

//Check if Browser supports geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block"
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>"
}

//Set Users Position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);

}
// Show error when there is an issue with geolocation
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`

    
}
//Get Weather from API
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?
    lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
        
    })
    .then(function(data){
            getWeather.temperature.value =  Math.floor(data.main.temp - KELVIN);
            getWeather.description = data.weather[0].description;
            weather.iconId = date.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sy.country;
        
        })
        .then(function(){
            displayWeather();
        })
} 
//Display Weather to UI      
function displayWeather(){
    iconElement.innerHTML = `<img src = "/Weather-App-JavaScript/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<spn>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
