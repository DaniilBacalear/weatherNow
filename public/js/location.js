'use strict'
const geolocation = navigator.geolocation;
const path = require('path')
//const geocode = require(path.join(__dirname,'/geocode.js'))
//const weather = require(path.join(__dirname,'../src/weather.js'))
const getWeatherButton = document.getElementById("get-my-location-weather")
const loc = document.querySelector("#loc")
const temp = document.querySelector("#temp")
const wind = document.querySelector("#wind")
const cond = document.querySelector("#cond")
getWeatherButton.addEventListener('click',(e)=>{
    if(geolocation){
        geolocation.getCurrentPosition((position)=>{
            fetch('/weather?longitude='+encodeURIComponent(position.coords.longitude.toString())+'&latitude='+encodeURIComponent(position.coords.latitude.toString())).then((response)=>{
               response.json().then((data)=>{
                   if(data) {
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
