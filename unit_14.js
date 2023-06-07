const cities = {
    2643743: "London", //GB
    625144: "Minsk", //BY
    2509954: "Valencia", //ES
    4350175: "Cambridge", //MD, US
    2950158: "Berlin" //DE
}

const select = document.createElement('select');
select.classList.add('cities__select');

for (let id in cities) {
    console.log(id);
    const option = document.createElement('option');
    option.classList.add('cities__option');
    option.value = id;
    option.text = cities[id];
    select.append(option);
}

document.querySelector('.cities__list').after(select);



const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "daa60c4633c993ab9190487234921c50"
}

function getWeather() {
    const cityId = document.querySelector('.cities__select').value;

    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);

}

function showWeather(data) {
    console.log(data);

    document.querySelector('.weather__city').textContent = data.name;
    document.querySelector('.weather__temperature').innerHTML = `${Math.round(data.main.temp)}&#8451;`;
    document.querySelector('.weather__descript').textContent = data.weather[0]['description'];
    document.querySelector('.weather__pic').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    document.querySelector('.weather__item--speed span').textContent = `${data.wind.speed} m/s`;
    document.querySelector('.weather__item--pressure span').textContent = `${data.main.pressure} hPa`;
    document.querySelector('.weather__item--direct svg').style.transform = `rotate(${data.wind.deg}deg)`;
    document.querySelector('.weather__item--direct span').innerHTML = `${data.wind.deg}&deg;`;
}

getWeather();
document.querySelector('.cities__select').onchange = getWeather;