const request = require('request')

const geocode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW1hbm1laHJhIiwiYSI6ImNrMjI0ZTE4NTBpbmQzZ25ydHBkbDJqZmcifQ.76s-7SEm7_-VEASPGa6Ssw'
    var obj = {}
    //console.log(geoUrl)
    request({url: geoUrl, json: true}, (error, { body }) => {
        if(error) {
            obj.message = 'Unable to connect location services'
        } else if(body.features == '') {
            obj.message = 'Unable to find location'
        } else {
            obj.result = {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            }
        }
        callback(undefined, obj)
    })
}

module.exports = geocode