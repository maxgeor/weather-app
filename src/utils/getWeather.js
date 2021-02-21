const request = require('request')

const getWeather = (lat, long, place, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1b154f0a54590b28f125a7ea0c4f7536&query=${lat},${long}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
           callback("We couldn't get the weather. Make sure you're connected to the internet and try again.")
        } else if (body.error) {
            const error = body.error
            if (error.code === 101) {
                callback("Looks like something's broken on our end. Sorry about that. Let us know it's not working.")
            } else if (error.code === 601) {
                callback("We couldn't find the location you want. Make sure the location's name is spelt correctly.")
            }
        } else {
            const { temperature, feelslike, precip, weather_icons, weather_descriptions } = body.current
            callback(undefined, {
                temperature,
                feelslike,
                precip,
                place,
                weather_icons,
                weather_descriptions
            })
        }
    })
}

module.exports = getWeather