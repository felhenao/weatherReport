const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiZGF3YXlzIiwiYSI6ImNrZjhlbnFhczAwZjkydGwxNjE3MXFwdXgifQ.HuW9HVeqIDBMOHffjqbeqw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable ot connect to location services!', undefined)

        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)

        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longiture: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode