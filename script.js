// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
const API_KEY = '36d1477ae41d2e7411eaccf5433435e4';

function getWeather() {
    const locationInput = document.getElementById('location').value;
    let url;

    if (locationInput.trim() === '') {
        // If no location is entered, use the browser's geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
                fetchWeather(url);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    } else {
        // If a location is entered by the user, use it
        url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${API_KEY}&units=metric`;
        fetchWeather(url);
    }
}

function fetchWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Description: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

window.onload = getWeather;
