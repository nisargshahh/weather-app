import api_key from "./apikey.js";
const api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")


async function checkWeather(city) {
  const response = await fetch(api_url + city + `&appid=${api_key}`);

  if(response.status == 404){
    document.querySelector(".error").style.display = "block"
    document.querySelector(".weather").style.display = "none"
  } else {
    document.querySelector(".error").style.display = "none"
  }

  var data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".feels-like").innerHTML = "Feels like " + Math.round(data.main.temp) + "°C";
  document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

  switch(data.weather[0].main) {
    case "Clouds":
        weatherIcon.src = "./images/clouds.png"
        break;
    case "Clear":
        weatherIcon.src = "./images/clear.png"
        break;
    case "Rain":
        weatherIcon.src = "./images/rain.png"
        break;
    case "Drizzle":
        weatherIcon.src = "./images/drizzle.png"
        break;
    case "Mist":
        weatherIcon.src = "./images/mist.png"
        break;
    case "Snow":
        weatherIcon.src = "./images/snow.png"
        break;
    default:
      break;
  }
  document.querySelector(".weather").style.display = "block"

}

searchBtn.addEventListener("click", () => checkWeather(searchBox.value));
