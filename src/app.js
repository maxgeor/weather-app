const { response } = require('express')
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const getLocation = require('./utils/getLocation')
const getWeather = require('./utils/getWeather')

const app = express()

//define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirPath))

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/index/*', (req, res) => {
    res.render('404')
})

app.get('/index.hbs', (req, res) => {
    res.render('index')
})

app.get('/index.hbs/*', (req, res) => {
    res.render('404')
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You have to enter a location!'
        })
    }
    getLocation(req.query.location, (error, { lat, long, place } = {}) => {
        if (error) {
            return res.send({ error })
        } 
        getWeather(lat, long, place, (error, { temperature, feelslike, precip, place, weather_icons, weather_descriptions } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                temperature,
                feelslike,
                precip,
                place,
                weather_icons,
                weather_descriptions
            })
        })
    }) 
})

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(3000, () => {
    console.log("Server is up!")
})