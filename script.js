const search = document.querySelector(".search-bar");

const Weather = {
    apiKey: "aaa3187e4cb897e454c902b65bd7456d",

    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=metric&appid=" + this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },

    displayWeather(data) {
        console.log(data);
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure } = data.main;
        const { speed } = data.wind;
        const { lon, lat } = data.coord;
        

        // updating data -------------------
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =  "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".des").innerText = description;


        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + '\xa0\xa0\xa0' + humidity + "%";
        document.querySelector(".pressure").innerText = "Pressure: " + '\xa0\xa0\xa0'    + pressure + " hPa";
        document.querySelector(".wind").innerText =  "Wind speed: "+ '\xa0\xa0\xa0' + speed + " km/h";

        document.querySelector(".long").innerText =  "Longitude: " + '\xa0\xa0\xa0' + lon + " deg";
        document.querySelector(".lat").innerText =  "Latitude: " + '\xa0\xa0\xa0' + lat + " deg";

    },

    search: function () {
        this.fetchWeather(search.value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    Weather.search();
});


search.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        Weather.search();
    }
});

Weather.fetchWeather("Dehradun");
