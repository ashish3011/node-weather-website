const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000


// Define the paths for express config

//setup handlebars engine and view location
const viewPath = path.join(__dirname, '../templates/views')
app.set('view engine', 'hbs')

const partialsPath = path.join(__dirname, '../templates/partials')
//app.set('views', 'templates')

app.set('views', viewPath)
hbs.registerPartials(partialsPath)


//setup static directory serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ashish'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page!!',
        name: 'Ashish'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help PAGE',
        name: 'Ashish',
        message: 'Hello this page is for help!!!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!!!'
        })
    }
    else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
               return res.send({
                   error: 'Address not found!!! Try another!!!'
               })
            }
            forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error: 'Location not specified correctly....'
                })
            }
                res.send({
                    location: location,
                    forecast: forecastdata,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        textArea: 'Help article not found',
        title: 'Not found!!!',
        name: 'ashish'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        textArea: 'Page not found!!!',
        title: 'Not found!!!',
        name: 'ashish'
    })
})

app.listen(port, () => {
    console.log('server is up on port ',+ port)
})