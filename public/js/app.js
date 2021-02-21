const form = document.querySelector('form')
const input = document.querySelector('input')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const status = document.querySelector('#status')
    status.innerText = "Loading..."
    const location = input.value
    fetch(`http://localhost:3000/weather?location=${location}`).then((response) => {
        response.json().then((data) => {
            location.innerText = ""
            if (data.error) {
                status.innerText = data.error
            } else {
                status.innerText = ""
                const weatherDiv = document.querySelector('.weather-container')
                weatherDiv.style.display = 'inline-block'
                const { temperature, feelslike, precip, weather_icons, place } = data
                const placeEl = document.querySelector('#place')
                placeEl.innerText = place
                const temperatureEl = document.querySelector('#temperature')
                temperatureEl.innerText = temperature
                const feelslikeEl = document.querySelector('#feelslike')
                feelslikeEl.innerText = feelslike
                const precipEl = document.querySelector('#precip')
                precipEl.innerText = `Chance of rain: ${precip}%`
                const iconEl = document.querySelector('#icon')
                icon.src = weather_icons[0]
            }
        })
    })
})