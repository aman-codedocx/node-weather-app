const request = require('request')

const forecast = (lat, long, callback) => {
    const forCastUrl = 'https://api.darksky.net/forecast/30fec7fa06a0cf3fd5d495c2758e3e84/'+lat+','+long
    var obj = {}
    request({url: forCastUrl, json: true}, (error, { body }) => {
        //console.log(forCastUrl)
        if(error) {
            obj.message = 'Unable to connect location services'
        } else if(body.features == '') {
            obj.message = 'Unable to find location'
        } else {
            obj.result = {
                lat: body.currently
            }
        }
        callback(undefined, obj)
    })
}

module.exports = forecast