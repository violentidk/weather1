
const apiKey = "9b74006f20034bab863123522242411"; // Add your WeatherAPI key here.
const weatherWidget = document.getElementById("weather-widget");

async function fetchWeather() {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Tallinn&days=3&aqi=no&alerts=no`
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        document.getElementById("temperature").textContent = "Error loading data";
        document.getElementById("description").textContent = "";
        document.getElementById("forecast").innerHTML = "<p>Check API key or network.</p>";
    }
}

function displayWeather(data) {
    // Current weather
    const current = data.current;
    document.getElementById("temperature").textContent = `${Math.round(
        current.temp_c
    )}°C`;
    document.getElementById("description").textContent = current.condition.text;

    // 3-day forecast
    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = ""; // Clear previous forecast
    const forecastDays = data.forecast.forecastday;

    forecastDays.forEach((day) => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("forecast-day");
        dayElement.innerHTML = `
            <p>${new Date(day.date).toLocaleDateString("en-GB", {
                weekday: "short",
            })}</p>
            <p>${Math.round(day.day.avgtemp_c)}°C</p>
            <p>${day.day.condition.text}</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

fetchWeather();
