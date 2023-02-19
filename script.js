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
function displayForecast(response) {
  console.log(response.data.daily);
}

function getForecast(coordinates) {
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiForecastUrl);
  axios.get(apiForecastUrl).then(displayForecast);
}

function showTemprature(response) {
  console.log(response.data);
  celsiusTemp = response.data.temperature.current;
  let tempretureElement = document.querySelector("#temprature");
  tempretureElement.innerHTML = +Math.round(celsiusTemp);
  let tempDescription = document.querySelector("#temp-description");
  tempDescription.innerHTML = response.data.condition.description;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML =
    " Feels Like: " + Math.round(response.data.temperature.feels_like) + " °C";
  let percipitation = document.querySelector("#percipitation");
  percipitation.innerHTML =
    "Percipitation: " + response.data.temperature.pressure + "%";
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = "Humidity: " + response.data.temperature.humidity + "%";
  let wind = document.querySelector("#wind");
  wind.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + " mph";
  let cityName = document.querySelector("h2");
  cityName.innerHTML = response.data.city + ", " + response.data.country;
  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.setAttribute(
    "src",
    `${response.data.condition.icon_url}`,
    "alt",
    `${response.data.condition.description}`
  );
  getForecast(response.data.coordinates);
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
    console.log(position);
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiUrl2 = ` https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=metric`;

    axios.get(apiUrl2).then(showTemprature);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}
let current = document.querySelector("#current");
current.addEventListener("click", showCurrent);

function displayFarenhite(event) {
  event.preventDefault();
  let centigradeTemp = document.querySelector("#temprature");
  let farenhiteTemp = celsiusTemp * 1.8 + 32;
  console.log(farenhiteTemp);
  centigradeTemp.innerHTML = Math.round(farenhiteTemp);
  farenhiteLink.classList.add("active");
  celsiusLink.classList.remove("active");
}
function displayCelsius(event) {
  event.preventDefault();
  let centigradeTemp = document.querySelector("#temprature");
  centigradeTemp.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  farenhiteLink.classList.remove("active");
}
let celsiusTemp = null;
let farenhiteLink = document.querySelector("#farenhite-link");
farenhiteLink.addEventListener("click", displayFarenhite);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let forecastElement = document.querySelector("#forecast");
let forecastDays = ["Mon", "Thue", "Wed", "Thur", "Fri"];
let forecastHTML = `<div class="row">`;
forecastDays.forEach(function (days) {
  forecastHTML =
    forecastHTML +
    `<div class="col-2">
            <div class="weather-forecast-day">${days}</div>

            <img
              src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
              alt=""
            />
            <div class="weather-forecast-temperatur">
              <span class="weather-forecast-max">18°</span
              ><span class="weather-forecast-min"> 12°</span>
            </div>`;
  forecastHTML = forecastHTML + `</div>`;
});
forecastElement.innerHTML = forecastHTML;
