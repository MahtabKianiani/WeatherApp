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

let apiKey = "5t90350834ca9900a73331c4o754bfbc";

function showTemprature(response) {
  console.log(response);
  let tempretureElement = document.querySelector("#temprature");
  tempretureElement.innerHTML =
    +Math.round(response.temperature.current) + "°C";
  let tempDescription = document.querySelector("#temp-description");
  tempDescription.innerHTML = response.condition.description;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML =
    " Feels Like: " + Math.round(response.temperature.feels_like) + " °C";
  let percipitation = document.querySelector("#percipitation");
  percipitation.innerHTML =
    "Percipitation: " + response.temperature.pressure + "%";
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = "Humidity: " + response.temperature.humidity + "%";
  let wind = document.querySelector("#wind");
  wind.innerHTML = "Wind: " + Math.round(response.wind.speed) + " mph";
  let cityName = document.querySelector("h2");
  cityName.innerHTML = response.city + ", " + response.country;
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

  let apiUrl = ` https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(showTemprature);
  ////////////////////////
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);
///////////// current location

function showCurrent() {
  function getPosition(position) {
    let latitude = position.coordinates.latitude;
    let longitude = position.coordinates.longitude;
    let apiUrl2 =
      "https://api.shecodes.io/weather/v1/current?lon=" +
      longitude +
      "&lat=" +
      latitude +
      "&key=" +
      apiKey +
      "&units=metric";
    axios.get(apiUrl2).then(showTemprature);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}
let current = document.querySelector("#current");
current.addEventListener("click", showCurrent);
