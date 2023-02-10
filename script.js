let now = new Date();
let Day = now.getDay();
let Hour = now.getHours();
let Minute = now.getMinutes();
let Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let h1 = document.querySelector("h1");
h1.innerHTML = `${Days[Day]} ${Hour}:${Minute}`;

let apiKey = "c45e3635643cac8877a0c24f2bebf7da";

function showTemprature(response) {
  console.log(response);
  let tempretureElement = document.querySelector("#temprature");

  tempretureElement.innerHTML = +Math.round(response.data.main.temp) + "°C";
  let tempDescription = document.querySelector("#temp-description");
  tempDescription.innerHTML = response.data.weather[0].description;
  let feelsLike = document.querySelector("#feels-like");

  feelsLike.innerHTML =
    " Feels Like: " + Math.round(response.data.main.feels_like) + " °C";
  let percipitation = document.querySelector("#percipitation");
  percipitation.innerHTML = "Percipitation: " + response.data.clouds.all + "%";
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  let wind = document.querySelector("#wind");
  wind.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + " mph";
  let cityName = document.querySelector("h2");
  cityName.innerHTML = response.data.name;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
  if (city) {
    let h2 = document.querySelector("h2");
    h2.innerHTML = `${city} `;
  } else {
    alert("Please Enter a city name!");
  }
  //////// api connection

  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";

  axios.get(apiUrl).then(showTemprature);
  ////////////////////////
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);
///////////// current location

function showCurrent() {
  function getPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl2 =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=metric";
    axios.get(apiUrl2).then(showTemprature);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}
let current = document.querySelector("#current");
current.addEventListener("click", showCurrent);
