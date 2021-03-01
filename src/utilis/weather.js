
const request = require('request')
const weatherdata =(latitude,longitude,callback)=>{
    
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+encodeURI(latitude)+'&lon='+encodeURI(longitude)+'&appid=681d1dd01aedcbf0632d9dc2d1d2d527&units=metric'

    request({ url:url , json : true},(error , {body})=>{
        if(error){
            callback('not connected to weather services!',undefined)
           
        }else if(body.cod===400){
            callback('location not found!',undefined)
        }else{
            callback(undefined,
                 body.main.temp
            )
        //console.log('It is a ' +response.body.main.temp + ' temp in '+response.body.name)
        }
     
    })
}

module.exports = weatherdata