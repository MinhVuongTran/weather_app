const APP_ID = "16c8f05ef8b52bcbbde2111462fabce5";

const searchInput = document.querySelector("#search-input");
const cityName = document.querySelector(".city-name");
const weatherState = document.querySelector(".weather-state");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");

const sunrise = document.querySelector(".sunrise");
const sundown = document.querySelector(".sundown");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");

searchInput.addEventListener("change", (e) => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&limit=5&appid=${APP_ID}`
  ).then(async (res) => {
    const data = await res.json();
    const lat = data[0].lat;
    const lon = data[0].lon;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=metric&lang=vi`
    ).then(async (res) => {
      const data = await res.json();
      console.log(data);
      cityName.innerHTML = data.name;
      weatherState.innerHTML = data.weather[0].description;
      weatherIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      temperature.innerHTML = Math.round(data.main.temp);
      sunrise.innerHTML = moment.unix(data.sys.sunrise).format("H:mm");
      sundown.innerHTML = moment.unix(data.sys.sunset).format("H:mm");
      humidity.innerHTML = data.main.humidity;
      windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2);
    });
  });
});
