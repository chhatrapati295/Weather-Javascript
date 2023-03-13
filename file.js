const temp = document.querySelector('.temp')
const cityName = document.querySelector('.cityName')
const des = document.querySelector('.description')
const feels = document.querySelector('.feels')
const min = document.querySelector('.min')
const max = document.querySelector('.max')
const form = document.querySelector('form')
const input = document.querySelector('input')
const img = document.querySelector('img')
const hum = document.querySelector('.hum')
const press = document.querySelector('.press')

window.addEventListener('DOMContentLoaded',()=>{
    init('jaipur')
})
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    init(input.value)
    input.value=''
})
function init (city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=53015ecfbd59c9ebf385bd744acd3563`;
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
        if(res.cod == "404"){
            input.value = 'City not found'
            setTimeout(() => {
                input.value=''
            }, 3000);
        }else{
            document.querySelector('.box').style.display = 'block'
        // console.log(res)
        updateIcon(res)
        cityName.innerText = `${res.name}`
        city.innerText = `${res.name}`
        temp.innerText = `${res.main.temp} ℃`
        des.innerText =`${res.weather[0].main}`
        feels.innerText =`${res.main.feels_like} ℃`
        min.innerText =`${res.main.temp_min} ℃`
        max.innerText =`${res.main.temp_max} ℃`
        hum.innerText =`${res.main.humidity} %`
        press.innerText =`${res.main.pressure} hPa`
        }
    })
    .catch(err=>console.error(err))
}
function updateIcon (data){
    if(data.weather[0].main === 'Haze'){
        img.src = `https://www.svgrepo.com/show/344670/cloud-haze-1.svg`
    }else if(data.weather[0].main === 'Clear'){
        img.src = `https://www.svgrepo.com/show/493527/sun-flower.svg`
    }else if(data.weather[0].main === 'Clouds'){
        img.src = `https://www.svgrepo.com/show/499935/sun-rain.svg`
    }else{
        img.src = `https://www.svgrepo.com/show/499943/rain.svg`
    }
}

