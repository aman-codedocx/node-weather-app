console.log('js file')



const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('.messageOne')
const messageTwo = document.querySelector('.messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var location = search.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?address='+location).then((response) => {
        response.json().then(data => {
            
            console.log(data)
            if(data.message) {
                messageOne.textContent = data.message;
            } else {
                messageOne.textContent = data.forecast.result.lat.temperature;
                
            }
        })
    })

})