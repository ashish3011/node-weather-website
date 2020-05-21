const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=21e652ca182d31fb836b75354917e60e&query=' + longitude + ',' + latitude + '&units=f'

    request({url, json: true},(error, {body} = {}) => {
        if(error){
            callback('unable to connect to weather services', undefined)
        }
        else if(body.error){
            callback('unable to find the location', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degress out.!!!')
        }
    })
}
module.exports = forecast