const input = document.querySelector('#input')
const main = document.querySelector('main')
const goBtn = document.querySelector('#goBtn')
const Api_key = '53015ecfbd59c9ebf385bd744acd3563'

goBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log(input.value)
    getData(input.value)
})
const refresh = ()=>{
    window.location.reload()
}
const showData = (data)=>{
    const div = document.createElement('div')
    if(data.cod === '404'){
        div.innerHTML = `<h2> City not found</h2>
        <button class='deleteBtn refresh' onClick='refresh()'>Try Again</button>
        `
        div.setAttribute('class','notFound')
        main.append(div)
        return;
    }
   
    div.innerHTML = `
    <div class="box">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        <p>${data.weather[0].main}</p>
    </div>
    <div class="box">
        <div class='box-sm'>
        <p>City</p>
        <span class='capital'>${input.value}</span>
        </div>
        <div class='box-sm'>
        <p>Temprature</p>
        <span>${data.main.temp} ℃</span>
        </div>
    </div>
    
    <div class="box">
    <div class='box-sm'>
        <p>Humidity</p>
        <span>${data.main.humidity} %<span/>
    </div>
    <div class='box-sm'>
        <p>Air Pressure</p>
        <span>${data.main.pressure} hPa</span>
    </div>
        
    </div>
    <div class="box">
    <div class='box-sm'>
        <p>Wind speed</p>
        <span>${data.wind.speed} kmph</span>
    </div>
    <div class='box-sm'>
        <button class='deleteBtn' onClick='deleteItem()'>Delete</button>
    </div>
    </div>
`
div.setAttribute('class','weather')
    main.append(div)
    input.value = ''
}
const deleteItem = (e)=>{
    const div = document.querySelector('div')
    div.remove()
}
const getData = async (city)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    showData(data)
}