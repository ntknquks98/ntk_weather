

function changeTemp(response) {

  let day = new Date();
  let tempValue = document.querySelector(".temperature");

  tempValue.innerHTML = Math.round(`${response.data.daily[day.getDay()].temperature.maximum}`);
}

function changeIcon(response){

  let day = new Date();

  let icon = document.querySelector(".icon");
  icon.innerHTML = `<img class="day-icon" src="${response.data.daily[day.getDay()].condition.icon_url}" />`
  
}

function changeSky(response) {

  let day = new Date();
  let skyCondition = document.querySelector(".sky");

  skyCondition.innerHTML = response.data.daily[day.getDay()].condition.icon;
  
}

function changeSpeed(response) {

  let day = new Date();
  let speedValue = document.querySelector(".speed");

  speedValue.innerHTML = response.data.daily[day.getDay()].wind.speed;
  
}


function changeHumidity(response) {

  let day = new Date();
  console.log(response);
  let humidityValue = document.querySelector(".humidity");

  humidityValue.innerHTML = Math.round(`${response.data.daily[day.getDay()].temperature.humidity}`);
}


function changePressure(response) {
  console.log(response);

  let pressureValue = document.querySelector(".pressure");

  pressureValue.innerHTML = Math.round(`${response.data.temperature.pressure}`);
}


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}


function formatDay(timestamp){
  let date = new Date(timestamp*1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return days[date.getDay()];
}


function displayForecast(response) {
  console.log(response);
  

  let forecastHtml = "";
  
  response.data.daily.forEach(function(day, index){
    if (index<5){

      forecastHtml =  forecastHtml +
        `
          <div class="day">
            <div>
              ${formatDay(day.time)}
            </div>
            <div>
              <img id="type" src="${day.condition.icon_url}"> 
            </div>

            <div id="temp-value">
              <div id="temperature-value">${ Math.round(day.temperature.maximum)}&#176; </div>
              <div id="temperature-value"> ${Math.round(day.temperature.minimum)}&#176; </div>
            </div>
          </div>            
        `;
    }

  

  })

let forecast = document.querySelector("#forecast");
forecast.innerHTML = forecastHtml;
};




function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-input");
  let cityElement = document.querySelector("#change-city");
  cityElement.innerHTML = searchInputElement.value;


  let key = "6b90c613e500ac1f467bft96eea4oe2a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${searchInputElement.value}&key=${key}&units=metric`;
  
  axios.get(apiUrl).then(changeTemp);
  axios.get(apiUrl).then(changeSpeed);
  axios.get(apiUrl).then(changeHumidity);
  /*axios.get(apiUrl).then(changePressure);*/
  axios.get(apiUrl).then(changeSky);
  axios.get(apiUrl).then(changeIcon);
  axios.get(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#datetime");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
alert("Welcome")



