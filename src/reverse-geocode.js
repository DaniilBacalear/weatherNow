const request =  require('request')
/*
'https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoiZGJhY2EiLCJhIjoiY2p5YWk2MTZxMGM3MTNjcWlmcm5tdmg1NCJ9.Su8RtXxNi02f2BIaMshbNA&types=place'
 */
const reverseGeocode = (longitude,latitude,callback) => {
    request({
            url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(longitude.toString()) + ',' + encodeURIComponent(latitude.toString()) + '.json?access_token=pk.eyJ1IjoiZGJhY2EiLCJhIjoiY2p5YWk2MTZxMGM3MTNjcWlmcm5tdmg1NCJ9.Su8RtXxNi02f2BIaMshbNA&types=place'
            , json: true
        }, (error, response) => {
            if (error) {
                return callback({error: 'Unable to connect to MapBox api'}, undefined)
            } else if (response.body.features.length === 0) {
                return callback({error: 'Invalid Coordinates!'}, undefined)
            }
            return callback(undefined, {location:response.body.features[0]['place_name']})
        }
    )
}
module.exports = reverseGeocode;