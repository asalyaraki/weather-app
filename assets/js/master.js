const _section = document.querySelector('main>section')
const mood = document.getElementById('mood')
const location_btn = document.getElementById('location_btn')
const circle = document.getElementById('circle')
const locAcc = document.getElementById('locAcc')
const weatherInfo = document.getElementById('weatherInfo')
const wind_speed = document.getElementById('wind_speed')
const condition = document.getElementById('condition')
const temp = document.getElementById('temp')
const cloud = document.getElementsByClassName('cloud')
const sun = document.getElementsByClassName('sun')
const snow = document.getElementsByClassName('snow')
const rain = document.getElementsByClassName('rain')
const date = document.getElementById('date')
const time = document.getElementById('time')
const ctName = document.getElementById('ctName')
let flag = true



// darkMood lightMood start 

mood.addEventListener('click', () => {
    if (flag) {
        mood.style.background = '#1e40af'
        mood.children[0].style.transform = 'translateX(260%)'
        mood.children[0].style.background = '#60a5fa'
        mood.children[0].children[0].setAttribute('class', 'icon-moon-inv text-white scale-[1.5]')
        _section.style.background = '#181818'
        locAcc.style.color = 'white'
        location_btn.style.color = 'white'
        location_btn.classList.replace('shadow-black', 'shadow-white')
        circle.classList.add('shadow-white')
        weatherInfo.classList.add('text-white', 'shadow-white')
        flag = !flag




    }
    else {
        mood.style.background = '#fef08a'
        mood.children[0].style.transform = 'translateX(0)'
        mood.children[0].style.background = '#facc15'
        mood.children[0].children[0].setAttribute('class', 'icon-sun-filled text-white scale-[1.5]')
        _section.style.background = '#f3f4f6'
        locAcc.style.color = 'black'
        location_btn.style.color = 'black'
        location_btn.classList.replace('shadow-white', 'shadow-black')
        circle.classList.remove('shadow-white')
        weatherInfo.classList.remove('text-white', 'shadow-white')
        flag = !flag

    }
})

// darkMood lightMood end 

// tehran weather as a default 

onLoadApi()
// Tehran part end 


// date and time 

let _day = new Date().getDay()
let _month = new Date().getMonth()
let _year = new Date().getFullYear()
let _date = new Date().getDate()
let weekDay = ''
let month = ''

switch (true) {
    case _day == 1: weekDay = 'Monday'; break;
    case _day == 2: weekDay = 'Tuesday'; break;
    case _day == 3: weekDay = 'Wednesday'; break;
    case _day == 4: weekDay = 'Thursday'; break;
    case _day == 5: weekDay = 'Friday'; break;
    case _day == 6: weekDay = 'Saturday'; break;
    case _day == 7: weekDay = 'Sunday'; break;
}

switch (true) {
    case _month == 0: month = 'January'; break;
    case _month == 1: month = 'February'; break;
    case _month == 2: month = 'March'; break;
    case _month == 3: month = 'April'; break;
    case _month == 4: month = 'May'; break;
    case _month == 5: month = 'June'; break;
    case _month == 6: month = 'July'; break;
    case _month == 7: month = 'August'; break;
    case _month == 8: month = 'September'; break;
    case _month == 9: month = 'October'; break;
    case _month == 10: month = 'November'; break;
    case _month == 11: month = 'December'; break;

}

date.innerHTML = weekDay + ' , ' + _date + ' ' + month + ' , ' + _year

setInterval(() => {
    let _hour = new Date().getHours()
    let _minute = new Date().getMinutes()
    let _second = new Date().getSeconds()
    time.innerHTML = _hour + ':' + _minute + ':' + _second
}, 1000);


// end date and time 


// location access 
let _lat = 0
let _lon = 0
let num = 0


location_btn.addEventListener('click', () => {
    if (num % 2 == 0) {
        location_btn.style.color = '#3b82f6'
        navigator.geolocation.getCurrentPosition(position => {

            _lat = position.coords.latitude
            _lon = position.coords.longitude
            locationInfo()
            num++

        })

    }
    else {
        if (flag) {
            location_btn.style.color = 'black'
        }
        else {
            location_btn.style.color = 'white'
        }
        onLoadApi()
        num++
    }
})

// end location access 






// functions : 

function onLoadApi() {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=35.6892523&lon=51.3896004&appid=bac77571b2d23add8e79755bd340e014')
        .then(
            res => {
                if (res.ok) return res.json()
                return Promise.reject(error)
            }
        )

        .then(myData => {
            // console.log(myData);
            ctName.innerHTML = myData.name
            console.log(myData.weather[0].main);
            condition.innerHTML = myData.weather[0].main
            wind_speed.innerHTML = myData.wind.speed + 'km/h'
            temp.innerHTML = Math.floor((myData.main.temp) - 273) + '°'

            changeIcon(myData)


        })

        .catch(error => console.log('error is : ' + error))

}


function locationInfo() {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + _lat + '&lon=' + _lon + '&appid=bac77571b2d23add8e79755bd340e014')
        .then(
            res => {
                if (res.ok) return res.json()
                return Promise.reject(error)
            }
        )

        .then(myData => {
            // console.log(myData);
            console.log(myData.weather[0].main);
            ctName.innerHTML = myData.name
            condition.innerHTML = myData.weather[0].main
            wind_speed.innerHTML = myData.wind.speed + 'km/h'
            temp.innerHTML = Math.floor((myData.main.temp) - 273) + '°'

            changeIcon(myData)


        })

        .catch(error => console.log('error is : ' + error))


}


function changeIcon(myData) {
    switch (true) {
        case myData.weather[0].main == 'Clear': sun[0].classList.replace('hidden', 'block'); break;
        case myData.weather[0].main == 'Rain': rain[0].classList.replace('hidden', 'block'); rain[1].classList.replace('hidden', 'block'); break;
        case myData.weather[0].main == 'Snow': snow[0].classList.replace('hidden', 'block'); snow[1].classList.replace('hidden', 'block'); snow[2].classList.replace('hidden', 'block'); break;
        case myData.weather[0].main == 'Clouds': sun[0].classList.replace('hidden', 'block'); cloud[0].classList.replace('hidden', 'block'); cloud[1].classList.replace('hidden', 'block'); break;

    }
}
