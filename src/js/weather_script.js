const searchBtn = document.getElementById('search-btn');
const addressInput = document.getElementById('address');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', () => {
    const address = addressInput.value;
    if (address.length === 0) {
        showErrorMessage('Введите адрес');
        return;
 }

 const apiKey = '24cd4f7d03dc28ec4126f49267bf37f9'; 

 const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${apiKey}&units=metric&lang=ru`;

 fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
    if (data.cod === '404') {
    showErrorMessage(`Адрес "${address}" не найден`);
    } 
    else
    {
        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const description = data.weather[0].description;
        const cityName = data.name;
        const countryName = data.sys.country;

        const weatherData = `
            <h2>${cityName}, ${countryName}</h2>
            <p>Температура: ${temp} &#8451; (ощущается как ${feelsLike} &#8451;)</p>
            <p>Погодные условия: ${description}</p>
        `;

        weatherInfo.innerHTML = weatherData;
    }
    })
    .catch(error => {
        showErrorMessage(`Произошла ошибка: ${error.message}`);
    });
});

function showErrorMessage(message) {
    weatherInfo.innerHTML = '';
    const errorMessage = `<p id="error-msg">${message}</p>`;
    weatherInfo.insertAdjacentHTML('beforeend', errorMessage);
}