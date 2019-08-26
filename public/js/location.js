'use strict'
const geolocation = navigator.geolocation;
const getWeatherButton = document.querySelector("#get-my-location-weather")
const loc = document.querySelector("#loc")
const temp = document.querySelector("#temp")
const wind = document.querySelector("#wind")
const cond = document.querySelector("#cond")
getWeatherButton.addEventListener('click',(e)=>{
    console.log('clicked')
    if(geolocation){
        geolocation.getCurrentPosition((position)=>{
            fetch('/weather?longitude='+encodeURIComponent(position.coords.longitude.toString())+'&latitude='+encodeURIComponent(position.coords.latitude.toString())).then((response)=>{
               response.json().then((data)=>{
                   if(data) {
                       console.log(position.coords.longitude,position.coords.latitude)
                       loc.innerHTML = 'Your Current Location: ' + data.location
                       temp.innerHTML = 'Current Temperature: ' + data.temperature + '°C'
                       wind.innerHTML = 'Wind: ' + data.wind +'km/h'
                       cond.innerHTML = 'Current Conditions: ' + data.conditions
                   }
                   else{
                       temp.innerHTML = 'Error'
                   }
               })
            }).catch(()=>{
                temp.innerHTML = "error"
            })
        },(error)=>{
            alert('error')
        })

    }
    else{
        alert("Need location permission to work")
    }
})
