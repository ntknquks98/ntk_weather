

function changeTemp(response) {

  let tempValue = document.querySelector(".temperature");

  tempValue.innerHTML = Math.round(`${response.data.temperature.current}`);
}

function changeIcon(response){
  let icon = document.querySelector(".icon");
  
  icon.innerHTML = `<img class="day-icon" src="${response.data.condition.icon_url}" />`
}

function changeSky(response) {

  let skyCondition = document.querySelector(".sky");

  skyCondition.innerHTML = response.data.condition.icon;
}

function changeSpeed(response) {

  let speedValue = document.querySelector(".speed");

  speedValue.innerHTML = response.data.wind.speed;
}


function changeHumidity(response) {
  console.log(response);

  let humidityValue = document.querySelector(".humidity");

  humidityValue.innerHTML = Math.round(`${response.data.temperature.humidity}`);
}


function changePressure(response) {
  console.log(response);

  let pressureValue = document.querySelector(".pressure");

  pressureValue.innerHTML = Math.round(`${response.data.temperature.pressure}`);
}





function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-input");
  let cityElement = document.querySelector("#change-city");
  cityElement.innerHTML = searchInputElement.value;


  let key = "6b90c613e500ac1f467bft96eea4oe2a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${key}`;
  axios.get(apiUrl).then(changeTemp);
  axios.get(apiUrl).then(changeSpeed);
  axios.get(apiUrl).then(changeHumidity);
  axios.get(apiUrl).then(changePressure);
  axios.get(apiUrl).then(changeSky);
  axios.get(apiUrl).then(changeIcon);

}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  console.log(day)

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


function displayForecast(){
  let forecast = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHtml = "";
  
  days.forEach(function(day){
    forecastHtml =  forecastHtml +
`
    <div class="day">
                    ${day}
                    <div>
                        &#9748;
                    </div>
                    <div id="temp-value">
                        <div id="temperature-value"> -10&#176; </div>
                        <div id="temperature-value"> -10&#176;</div>
                    </div>
                </div>            
`;
  })

forecast.innerHTML = forecastHtml;
};

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#datetime");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
alert("Welcome")

displayForecast();

