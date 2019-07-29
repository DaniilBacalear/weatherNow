const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const weather = require(path.join(__dirname,'/weather.js'))
const geocode = require(path.join(__dirname,'geocode.js'))
// configuring handlebars
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))
app.use(express.static(path.join(__dirname,'../public')))

// configuring express server
app.get('',(req,res)=>{
    res.render('',{
        section: 'WeatherNow'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send('You must provide an address')
    }
        geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
            if(error){
                res.send(error)
            }
            else{
                weather(longitude,latitude,(error,{temperature,conditions,wind})=>{
                    if(error){
                        res.send(error)
                    }
                    else{
                         res.send({temperature,location,conditions,wind})
                    }
                })
            }
        })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        section:'About'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        section:'Help'
    })
})

app.get('*',(req,res)=>{
    res.render('404')
})

app.listen(3000,()=>{
    console.log('listening')
})

