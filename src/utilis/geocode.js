const request = require('request')



const geocode = (address,callback)=>{
    const gurl ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address) + '.json?access_token=pk.eyJ1IjoiZWwwMTEiLCJhIjoiY2trcW5vcjJjMGp3bjJvbXI3ODRwZmllYSJ9.mk-p4Cn3Lprtueysq0zysA&limit=1'

    request({ url:gurl, json :true},(error,{body})=>{
        if(error){
            callback('not connected to weather services!',undefined)
        }else if(body.features.length===0){
            callback('wrong !! loaction not found!',undefined)
        }else{
            callback(undefined,{
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                place : body.features[0].place_name
                
            })
           
        }
        
    })

}

module.exports = geocode