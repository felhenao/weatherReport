const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5f74b512c7df9d9ea83daef3dc0d8fa8&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable ot connect to weather services!', undefined)

        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)

        } else {
            callback(undefined, body)
        }
    })
}

module.exports = forecast