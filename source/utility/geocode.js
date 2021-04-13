const request = require('request')

const geocode = (address , callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibHVhbnRpYzEyMDciLCJhIjoiY2tuMWlneDlyMG81MTJ3bWhic21kbDJoaCJ9.pUhH5phsu7O1nKCOhVv0Ig&limit=1'

    request({url , json: true} , (error , {body}) =>{
if(error){
       callback('Error in processing',undefined)
    } else if(body.features.length === 0){
        callback('Cant Find the place',undefined)
    } else {
      callback(undefined ,{
          latitude : body.features[0].center[1],
          longitude : body.features[0].center[0],
          Place : body.features[0].place_name
      })
      }  
    })
    
}

module.exports = geocode