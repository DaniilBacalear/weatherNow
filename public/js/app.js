const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const loc = document.querySelector('#loc')
const temp = document.querySelector('#temp')
const wind  = document.querySelector("#wind")
const conditions = document.querySelector('#cond')
const resultsDiv = document.querySelector('#sss')
const dataList = document.querySelector('#datalist')
//const icon = document.querySelector('#icon')
weatherForm.addEventListener('keypress',(e)=>{
        while(dataList.firstChild){
            dataList.removeChild(dataList.firstChild)
        }
    if(search.value) {
        fetch('/autocomplete?location='+encodeURIComponent(search.value.toString())).then((response)=>{
            response.json().then((data)=> {
                    for (let i in data.places) {
                            const option = document.createElement('OPTION')
                            const att = document.createAttribute('value')
                            att.value = data.places[i]
                            option.setAttributeNode(att)
                            dataList.appendChild(option)
                            //places.data.places[i] = data.places[i]
                        }


                }
                )
            }
        ).catch((e)=>console.log('error: ' + e.toString()))
    }

})

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
                            //icon.textContent = "Icon: " + data.iconId
                        }
                    }
                )
            })
        }


    }
)