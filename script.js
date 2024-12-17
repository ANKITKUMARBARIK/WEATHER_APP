const container = document.querySelector('.container')
const weather_box = document.querySelector('.weather-box')
const weather_details = document.querySelector('.weather-details')
const inputBox = document.querySelector('#inputBox')
const searchBtn = document.querySelector('#searchBtn')
const temperature = document.querySelector('#temperature')
const description = document.querySelector('#description')
const humidity = document.querySelector('#humidity')
const wind_speed = document.querySelector('#wind-speed')
const weather_img = document.querySelector('#weather-img')
const error = document.querySelector('.not-found')

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value)
})

async function checkWeather(city) {
    const api_key = '0b60bfb49641291b9b80dd9e4912432a'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const data = await fetch(`${url}`).then(response => response.json())
    // console.log(data)


    if (data.cod == '404') {
        container.style.height = '400px'
        weather_box.classList.remove('active')
        weather_details.classList.remove('active')
        error.classList.add('active')
        return
    }

    container.style.height = '555px'
    weather_box.classList.add('active')
    weather_details.classList.add('active')
    error.classList.remove('active')

    temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}<span>°C</span>`
    description.innerHTML = `${data.weather[0].description}`
    humidity.innerHTML = `${data.main.humidity}%`
    wind_speed.innerHTML = `${data.wind.speed}Km/h`

    switch (data.weather[0].main) {
        case 'Clouds':
            weather_img.src = 'cloud.png'
            break
        case 'Clear':
            weather_img.src = 'clear.png'
            break
        case 'Rain':
            weather_img.src = 'rain.png'
            break
        case 'Mist':
            weather_img.src = 'mist.png'
            break
        case 'Snow':
            weather_img.src = 'snow.png'
            break
        default:
            weather_img.src = 'cloud.png'
    }
}