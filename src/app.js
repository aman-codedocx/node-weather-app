const path = require('path')
const express =  require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const public_path = path.join(__dirname, '../public')
const view_path = path.join(__dirname, '../templates/views')
const partial_path = path.join(__dirname, '../templates/partial')

app.set('view engine', 'hbs')
app.set('views', view_path)
hbs.registerPartials(partial_path)

app.use(express.static(public_path))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must have provide address'
        })
    }

    geocode(req.query.address, (error, result) => {
        if(result.message) {
            console.log('eeee----')
            //console.log(error)
            res.send( result.message )
        }
        
        forecast(result.result.lat, result.result.long, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: result.location,
                address: req.query.address
            })
            //res.render('index')
        })

    })

     
})

app.get('/about', (req, res) => {
    res.render('about') 
})

app.get('/about/*', (req, res) => {
    res.render('404')
})

app.get('/contact', (req, res) => {
    res.render('contact') 
})

app.get('*', (req, res) => {
    res.render('404') 
})

app.listen(3000, () => {
    console.log('Server started on 3000 port.')
})