/*
'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=geocode&key=AIzaSyDEEiCrFPzvgrxYx1p-gAs7IV1Mlt2t2qY'
 */
const request = require('request')

const autoComplete = (input,callback) =>{
    request({url:'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+encodeURIComponent(input)+'&types=geocode&key=AIzaSyDEEiCrFPzvgrxYx1p-gAs7IV1Mlt2t2qY',json:true},
        (error,response)=>{
            if(error) {
                callback({error: 'Failed to connect to google places api'}, undefined)
            }
            else {
                const places = [];
                for(let i in response.body.predictions){
                    places.push(response.body.predictions[i].description)
                }
                 callback(undefined,{places:places})
            }

        })
}
module.exports = autoComplete
