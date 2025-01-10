const fetchWeatherData = async (city) => {
    const apiKey = 'e64b37006cd6dc9e54adfb6f91860ab2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        document.getElementById('city-name').innerHTML = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').innerHTML = `${data.main.temp}°C`;
        document.getElementById('Weather-description').innerHTML = `${data.weather[0].description}`;
        document.getElementById('current-date').innerHTML = new Date().toDateString();
        document.getElementById('current-location').innerHTML = `${data.name}, ${data.sys.country}`;
        // Get the timezone offset in seconds
        const timezoneOffset = data.timezone; 
        // Get the current UTC time
        const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        // Calculate the local time in the city
        const localTime = new Date(utcTime + timezoneOffset * 1000);
        // Format the local time to a readable format
        const formattedTime = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        // Display the formatted local time
        document.getElementById('current-time').innerHTML = formattedTime;

        document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
        document.getElementById('current-wind-speed').innerHTML = `${data.wind.speed} m/s`;
        document.getElementById('weather-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`;
        document.getElementById('current-pressure').innerHTML = `${data.main.pressure} hPa`;

    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        document.getElementById('city-name').innerHTML = 'Error fetching data';
        document.getElementById('temperature').innerHTML = '';
    }
};

const fetchDailyForecast = async (city) => {
    const apiKey = 'e64b37006cd6dc9e54adfb6f91860ab2';
    // let ul =   `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=3&appid=${apiKey}`;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        // Filter the forecast data to get one entry per day
        const dailyForecast = data.list.filter((reading) => reading.dt_txt.includes('12:00:00'));

        dailyForecast.forEach((day, index) => {
            if (index === 0) {
                document.getElementById('day-one-degree').innerHTML = `${day.main.temp}℃`;
                document.getElementById('day-one-date').innerHTML = new Date(day.dt_txt).toDateString();
                document.getElementById('day-one-description').innerHTML = `${day.weather[0].description}`;
            }
            if (index === 1) {
                document.getElementById('day-two-degree').innerHTML = `${day.main.temp}℃`;
                document.getElementById('day-two-date').innerHTML = new Date(day.dt_txt).toDateString();
                document.getElementById('day-two-description').innerHTML = `${day.weather[0].description}`;
            }
            if (index === 2) {
                document.getElementById('day-three-degree').innerHTML = `${day.main.temp}℃`;
                document.getElementById('day-three-date').innerHTML = new Date(day.dt_txt).toDateString();
                document.getElementById('day-three-description').innerHTML = `${day.weather[0].description}`;
            }
            if (index === 3) {
                document.getElementById('day-four-degree').innerHTML = `${day.main.temp}℃`;
                document.getElementById('day-four-date').innerHTML = new Date(day.dt_txt).toDateString();
                document.getElementById('day-four-description').innerHTML = `${day.weather[0].description}`;
            }
            if (index === 4) {
                document.getElementById('day-five-degree').innerHTML = `${day.main.temp}℃`;
                document.getElementById('day-five-date').innerHTML = new Date(day.dt_txt).toDateString();
                document.getElementById('day-five-description').innerHTML = `${day.weather[0].description}`;
            }
        });

    } catch (error) {
        console.error('Failed to fetch forecast data:', error);
    }
};

function getUserCity() {
    const city = document.getElementById('input-city').value.trim();

    if (city) {
        fetchWeatherData(city);
        fetchDailyForecast(city);
    } else {
        console.error('City name is required.');
        alert('Please enter a city name');
    }
}

// Added an event listener to the form to prevent page reload on submit
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    getUserCity();
});

const backgrounds = [
    'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg',
    'https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg',
    'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg',
    'https://images.pexels.com/photos/552785/pexels-photo-552785.jpeg',
    'https://images.pexels.com/photos/462023/pexels-photo-462023.jpeg'
  ];

  let index = 0;

  function changeBackground() {
    const allDiv = document.querySelector('.all');
    allDiv.style.transition = 'background-image 1.5s ease-in-out';
    allDiv.style.backgroundImage = `url(${backgrounds[index]})`;
    index = (index + 1) % backgrounds.length;
  }

  setInterval(changeBackground, 120000);
  changeBackground();
  
