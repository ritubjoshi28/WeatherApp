function setCurrent() {
  let abc = new Date();
  let today = abc.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[abc.getMonth()];
  let year = abc.getFullYear();
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${today} ${month},${year}`;
}
setCurrent();

function rightNow() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedensday",
    "Thursday",
    "Friday",
    "saturday",
  ];
  let currentDay = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${currentDay} ${hours}:${minutes}`;
}
rightNow();

function showCity(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("h2").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector(
    "#air"
  ).innerHTML = `Humidity ${response.data.main.humidity}%`;
  document.querySelector("#speed").innerHTML = `Wind speed:${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector("#howisit").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}
function showTemperature(event) {
  event.preventDefault();
  let apiKey = "dd148c52602d8cdd859f994ef40ed094";
  let searchInput = document.querySelector("#look-input");
  let city = searchInput.value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCity);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showTemperature);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let geoApiKey = "dd148c52602d8cdd859f994ef40ed094";
  let unit = "metric";
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${geoApiKey}&units=${unit}`;
  //let say = alert(`your latitude is${position.coords.latitude}`);
  console.log(position.coords.latitude);
  console.log(position.coords.latitude);
  axios.get(geoApiUrl).then(showCity);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
