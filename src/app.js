const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utilis/geocode')
const weatherdata = require('./utilis/weather')
//console.log(path.join(__dirname,'../public/hel'))
//console.log(__filename)

const app = express()

const filepath1 = path.join(__dirname, '../public')

const viewpath = path.join(__dirname, '../temp/views')
const partialpath = path.join(__dirname, '../temp/partials')
hbs.registerPartials(partialpath)
app.set('view engine', 'hbs')
app.set('views', viewpath)
app.use(express.static(filepath1))

const ad = {
    title: 'Weather',
    name: 'Jay',
    mssg: 'must provide address!!',
    address: 'none'
}

app.get('', (req, res) => {
    res.render('index',{
        title : 'Weather',
        name: 'Jay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ME',
        name: 'JAY'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need help?',
        name: 'Jay'
    })
})


// app.get('',(req,res)=>{
//     res.send('Home Page!')
// })


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('Provided wrong address')
    }
    else {
        geocode(req.query.address, (error, { latitude, longitude, place }={}) => {
            if (error) {
                return res.send({error})
            }

            weatherdata(latitude, longitude, (errori, weatherdata) => {
                if (error) {
                    return res.send({error})
                }
                console.log(place)
                console.log(weatherdata)
                console.log(req.query) 
                res.send({
                        title: 'Weather',
                        name: 'Jay',
                        addrhess: place,
                        mssg : 'It is '+ weatherdata+' temperature in '+place,
                        
                    })
            })
        })


    }
})
app.get('/help/*', (req, res) => {
    res.render('nohelp', {
        data1: 'no more help not found!!!'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        data: '404 page not found!!!'
    })
})


app.listen(3000, () => {
    console.log('Server is set up!')
})