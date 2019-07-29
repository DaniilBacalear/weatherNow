const request = require('request')
// DarkSky api
//url = 'https://api.darksky.net/forecast/7fa0fefe8d3371a2e97e12bdcf52d685/43.8563,-79.5085?units=ca';
const getWeather = (longitude,latitude,callback) =>{
    request({
        url: 'https://api.darksky.net/forecast/7fa0fefe8d3371a2e97e12bdcf52d685/'+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'?units=ca',
        json: true
    },(error,response)=>{
        if(error){
            callback({error:'Unable to connect to DarkSky API'},undefined)
        }
        else if(response.body.error){
            callback({error:response.body.error},undefined)
        }
        else{
            callback(undefined,{
                temperature:response.body.currently.temperature,
                conditions:response.body.currently.summary,
                wind:response.body.currently.windSpeed

            })
        }
    })
}
module.exports = getWeather