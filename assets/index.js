
const APIKey = '48427feaa511ceafa8aa18876ef42c9e'


const searchBtn = document.querySelector('#search-btn')
const searchBox = document.querySelector('#search-box')
const cityNameEl = document.querySelector('#city-name')
const todayDateEl = document.querySelector('#today-date')
const todayWeatherEl = document.querySelector('#today-weather')
const todayTempEl = document.querySelector('#today-temp')
const todayWindEl = document.querySelector('#today-wind')
const todayHumidEl = document.querySelector('#today-humidity')
const todayUVIEl = document.querySelector('#today-UVI')

searchBtn.addEventListener('click', () => {
    
    searchBox
    
    function createLi(input) {
        const piece = document.createElement('button')
        piece.textContent = input
        piece.addEventListener('click', () => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIKey}&units=imperial`).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                let date = moment().format("YYYY-MM-DD")

                cityNameEl.textContent = `${data.name}`
                todayDateEl.textContent = `Date: ${date}`
                todayTempEl.textContent = `Temp: ${data.main.temp}°F`
                todayWindEl.textContent = `Wind: ${data.wind.speed} kts`
                todayHumidEl.textContent = `Humidity: ${data.main.humidity}%`
                todayUVIEl.textContent = `UVI:`
                popTable(data.name)
            });
        })
        const ulEl = document.querySelector('#history')
        ulEl.append(piece)

    }


    function popTable(input) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${APIKey}&units=imperial`).then(function (response) {
            return response.json();
        }).then((res) => {
            const table = document.querySelector('.card-table')
            table.innerHTML = ''
            for (let i = 0; i < res.list.length; i= i+8) {
                console.log(res.list[i])
                const card = document.createElement('div')
                card.setAttribute("class", 'card col-2')
                card.innerHTML =
                    ` 
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Date: ${res.list[i].dt_txt.split(' ')[0]}</li>
                <li class="list-group-item"><img src="http://openweathermap.org/img/wn/${res.list[i].weather[0].icon}@2x.png"></li>
                <li class="list-group-item">Temp: ${res.list[i].main.temp}°F</li>
                <li class="list-group-item">Wind: ${res.list[i].wind.speed} kts</li>
                <li class="list-group-item">Humidity: ${res.list[i].main.humidity}%</li>
            </ul>`
                table.append(card)
            }
        })
    }

    let city = searchBox.value;
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`

    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data)
        let date = moment().format("YYYY-MM-DD")

        cityNameEl.textContent = `${data.name}`
        todayDateEl.textContent = `Date: ${date}`
        todayWeatherEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`
        todayTempEl.textContent = `Temp: ${data.main.temp}`
        todayWindEl.textContent = `Wind: ${data.wind.speed}`
        todayHumidEl.textContent = `Humidity: ${data.main.humidity}%`
        todayUVIEl.textContent = `UVI:`
        createLi(data.name)
        popTable(data.name)
    });

    searchBox.value = ''
})
