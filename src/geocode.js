'use strict'
const request =  require('request');
//mapbox location api
//https://api.mapbox.com/geocoding/v5/mapbox.places/toronto.json?access_token=pk.eyJ1IjoiZGJhY2EiLCJhIjoiY2p5YWk2MTZxMGM3MTNjcWlmcm5tdmg1NCJ9.Su8RtXxNi02f2BIaMshbNA
const getGeoCode = (address,callback) => {
    request({url:'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGJhY2EiLCJhIjoiY2p5YWk2MTZxMGM3MTNjcWlmcm5tdmg1NCJ9.Su8RtXxNi02f2BIaMshbNA',
        json:true},(error,response)=>{
        if(error){
            callback({error:'Unable to connect to MapBox API'},undefined)
        }
        else if(response.body.features.length===0){
            callback({error:'Unable to process given address'},undefined)
        }
        else{
            callback(undefined,{longitude:response.body.features[0].center[1]
                ,latitude:response.body.features[0].center[0],location:response.body.features[0].place_name,
                longlat: String(this.longitude) + ',' +String(this.latitude)
            })
        }
    })
}
module.exports = getGeoCode;