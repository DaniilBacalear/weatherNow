const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const loc = document.querySelector('#loc')
const temp = document.querySelector('#temp')
const wind  = document.querySelector("#wind")
const conditions = document.querySelector('#cond')

weatherForm.addEventListener('submit',(e)=> {
        e.preventDefault()
        if (search.value) {
            fetch('/weather?address=' + encodeURIComponent(search.value)).then((response) => {
                response.json().then((data) => {
                        if (data.error) loc.textContent = data.error
                        else{
                            loc.textContent="Location: " + data.location
                            temp.textContent="Temperature: " + data.temperature +"°C"
                            wind.textContent="Wind Speed: " + data.wind +" km/h"
                            conditions.textContent="Conditions: " + data.conditions
                        }
                    }
                )
            })
        }


    }
)