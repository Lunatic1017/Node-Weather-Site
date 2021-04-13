const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utility/geocode')
const forecast = require('./utility/forecast')

const app = express()
const port = process.env.PORT || 3000

const viewpath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')
app.use(express.static(path.join(__dirname , '../public')))


app.set('view engine' , 'hbs')
app.set('views' , viewpath)
hbs.registerPartials(partialsPath)


app.get('' , (req , res) =>{
    res.render('index' , {
        title : 'Weather APP ',
        name : 'Deepanshu Gadia'
    })
})

app.get('/about' , (req , res) =>{
    res.render('about' , {
        title : 'Weather app ',
        name : 'Deepanshu Gadia'
    })
})

app.get('/help' , (req ,res) =>{
    res.render('help' , {
        help : 'Need any Help',
        title : 'Help',
        name : 'Deepanshu Gadia'
    })
})

app.get('/weather' , (req , res) => {
    if(!req.query.address){
         return res.send({
            error : 'Please enter a location'
        })
    }

    geocode( req.query.address, (error , { latitude , longitude , Place} = {} ) =>{
        if (error) {
            return res.send({
                error
            })
        }
        
        
            forecast(latitude, longitude, (error, ForecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
        
                res.send({
                    Forecast : ForecastData,
                    Location : Place ,
                    address : req.query.address
                })
              })
        })
    
    
})

app.get('/help/*' , (req , res)=>{
    res.render('error' , {
        title : '404',
        name : 'Deepanshu Gadia',
        errormessage : 'Help article not found'
    })
})

app.get('*' , (req , res) =>{
    res.render('error' , {
        title : '404',
        name : 'Deepanshu Gadia',
        errormessage : 'Page not found'
    })
})

app.listen(port , () =>{
    console.log('Server is set on port' + port)
})