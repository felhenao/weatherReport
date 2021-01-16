const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 //use the port value from heroku

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //customizing views directory
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather and Air Quality report'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'abouts'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { 
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                temperature: "Temperature: " + forecastData.current.temperature,
                pressure: "Pressure: " + forecastData.current.pressure, 
                humidity: "Humidity: " + forecastData.current.humidity,
                windSpeed: "Wind Speed: " + forecastData.current.wind_speed,
                windDir: "Wind Direction: " + forecastData.current.wind_dir,
                condition: "Current Condition: " + forecastData.current.weather_descriptions,
                rainChance: "Chance of Rain: " + forecastData.current.precip,
                uvIndex: "UV Index: " + forecastData.current.uv_index,
                feel: "Feels Like: " + forecastData.current.feelslike,
                visibility: "Visibility: " + forecastData.current.visibility,
                cloudCover: "Cloud Cover: " + forecastData.current.cloudcover,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})