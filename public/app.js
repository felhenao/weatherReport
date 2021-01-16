const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const locationUi = document.querySelector('#location-ui')
const temperature = document.querySelector('#temperature')
const pressure = document.querySelector('#pressure')
const humidity = document.querySelector('#humidity')
const windSpeed = document.querySelector('#wind-speed')
const windDir = document.querySelector('#wind-dir')
const condition = document.querySelector('#condition')
const rainChance = document.querySelector('#rain-chance')
const uvIndex = document.querySelector('#uv-index')
const feel = document.querySelector('#feel')
const cloudCover = document.querySelector('#cloud-cover')
const visibility = document.querySelector('#visibility')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    locationUi.textContent = 'Loading...'
    temperature.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationUi.textContent = data.error
            } else {
                locationUi.textContent = data.location
                temperature.textContent = data.temperature
                pressure.textContent = data.pressure
                humidity.textContent = data.humidity
                windSpeed.textContent = data.windSpeed
                windDir.textContent = data.windDir
                condition.textContent = data.condition
                rainChance.textContent = data.rainChance
                uvIndex.textContent = data.uvIndex
                cloudCover.textContent = data.cloudCover
                feel.textContent = data.feel
                visibility.textContent = data.visibility
            }
        })
    })
})