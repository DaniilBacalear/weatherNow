const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const port =  process.env.PORT||5000
const weather = require(path.join(__dirname,'/weather.js'))
const geocode = require(path.join(__dirname,'geocode.js'))
const reverseGeocode = require(path.join(__dirname,'reverse-geocode.js'))
const autoComplete = require(path.join(__dirname,'search-autocomplete.js'))
// configuring handlebars

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))
app.use(express.static(path.join(__dirname,'../public')))

// configuring express server

app.get('',(req,res)=>{
    res.render('',{
        section: 'WeatherSearch',
        a1:'highlight',
        testing:'test'
    })
})
app.get('/weather',(req,res)=>{
    if(req.query.longitude && req.query.latitude){
        weather(req.query.latitude,req.query.longitude,(error,{temperature,conditions,wind,iconId})=>{
            if(error){
                 res.send({error:error})
            }
            else{
                reverseGeocode(req.query.longitude,req.query.latitude,(error,{location})=>{
                    if(error) res.send({error:error})
                    else{
                        res.send({temperature,conditions,wind,location,iconId})
                    }
                })

            }
        })
    }
    else {
        if (!req.query.address) {
            return res.send('You must provide an address')
        }
        geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
            if (error) {
                res.send(error)
            } else {
                weather(longitude, latitude, (error,{temperature,conditions,iconId,wind}) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.send({temperature,
                            conditions,
                            //iconId,
                            wind,
                            location
                        })
                    }
                })
            }
        })
    }
})
app.get('/mylocation',(req,res)=>{
    res.render('mylocation',{
        section:'WeatherNow',
        a2:'highlight'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        section:'About',
        a3:'highlight'
    })
})
app.get('/autocomplete',(req,res)=>{
    if(req.query.location){
        autoComplete(req.query.location,(error,places)=>{
            if(error){
                res.send(error)
            }
            else{
                res.send(places)
            }
        })
    }
})
app.get('/help',(req,res)=>{
    res.render('help',{
        section:'Help',
        a4:'highlight'
    })
})

app.get('*',(req,res)=>{
    res.render('404')
})

app.listen(port,()=>{
    console.log('Running on port ' + port)
})

