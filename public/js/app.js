// This fetch api is in modern browsers but not in express
// we call the endpoint then parse the response 

// the search element
const searchElement = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From js'

// Event listener for the search button
const weatherForm = document.querySelector('form')
weatherForm.addEventListener('submit', (e) => {
    // Stop the page from reloading
    e.preventDefault()

    // Wipe the messages
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const city = searchElement.value

    fetch('/weather?address=' + city).then( (response) => {
        response.json().then( (data) => {
            if (data.error) {
                messageOne.textContent = ''
                messageTwo.textContent = data.error
            } else{
                messageOne.textContent = data.location
                messageOne.textContent =  data.forecast 
            }
        })
    })

})