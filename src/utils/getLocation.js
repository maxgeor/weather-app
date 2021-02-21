const request = require('request')

const getLocation = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibWF4Z2VvcmdlIiwiYSI6ImNrbGFhazdzczI5Z3AydXBld3M0YWNhcXkifQ.7KXCWvYfdUktmryw5JUPqg&limit=1`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("We couldn't get the weather. Make sure you're connected to the internet and try again.")
        } else if (body.features.length === 0) {
            callback("Make sure you enter a valid location.")
        } else if (body.message === "Not Found") {
            callback("Please enter a location and try again.")
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = getLocation