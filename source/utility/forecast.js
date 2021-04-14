const request = require('request')

const forecast = (lat , long , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ae9a20a6ed39b242441b1bd9ee7d94af&query='+ lat + ',' + long 
 
request({url , json : true} , (error, {body}) =>{
    if(error){
        callback('Error in processing', undefined)
   
    } else if(body.error){
         callback('Cant find the location' , undefined)
    } else{
        callback(undefined , body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out, but it feels like ' + body.current.feelslike + ' degrees out. ' + 'The humidity is' + body.current.humidity + '%'
        )
    }
})
}
 
module.exports = forecast