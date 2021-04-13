const weatherForm  = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#Message1')
const message2 = document.querySelector('#Message2')



weatherForm.addEventListener('submit' , (e) =>{
    e.preventDefault()

    const Location = search.value

    message1.textContent = 'Loading....'
    message2.textContent = '   '
    fetch('http://localhost:3000/weather?address=' + Location).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            message1.textContent = data.error
            console.log(data.error)
        }
        else{
            message1.textContent = data.Forecast
            message2.textContent = data.Location
        console.log(data.Forecast)
        console.log(data.Location)
        }
    })
})
})