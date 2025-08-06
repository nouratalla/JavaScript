// API
const api_key = "YOUR_API_KEY_HERE";
const api_base_url = "https://api.openweathermap.org/data/2.5/weather";

// DOM elements
const searchInput =document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const cityElement = document.querySelector(".city")
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");

// Fetch data from api using arrow function

const getWeather = (city) => {
    const url = `${api_base_url}?q=${city}&units=metric&APPID=${api_key}`;

    fetch(url)
        .then( (response) => {
            if (!response.ok){
                throw new Error("City not found");
            }
            return response.json();
        })
        .then( (data) => {
            // Destructuring  data
            const { name, main: { temp, humidity }, wind: { speed }, weather } = data;
            // update text elements
            cityElement.textContent = name;
            tempElement.textContent = `${Math.round(temp)} °C`;
            humidityElement.textContent = `${humidity} %`;
            windElement.textContent = `${speed} km/h`;

            // update weather icon
            const mainWeather = weather[0].main.toLowerCase();
            if (mainWeather.includes("cloud"))
                weatherIcon.src = "images/clouds.png";
            else if (mainWeather.includes("rain"))
                weatherIcon.src = "images/rain.png";
            else if (mainWeather.includes("clear"))
                weatherIcon.src = "images/clear.png";
            else if (mainWeather.includes("drizzle"))
                weatherIcon.src = "images/drizzle.png";
            else if (mainWeather.includes("mist"))
                weatherIcon.src = "images/drizzle.png";

            // show weather details
            weatherContainer.style.display = "block";
            return data.name;
        })
        .then ( (name) => {
            console.log(`weather for ${name}`);
        })
        .catch( (error) => {
            console.error(`Fetch error ${error.message}`);
            alert("Could not get weather data. Try a different city.");
        });
};

// Event listeners for search
searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city){
        getWeather(city);
    }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});


