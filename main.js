document
	.getElementById("jokeGenerator")
	.addEventListener("click", generateJokes);

let JOKES_API = "https://icanhazdadjoke.com/"; // let JOKES_API : string = 'url api '

let reportJokes = [];
let currentJoke = [];

function generateJokes() {
	fetch(JOKES_API, {
		headers: {
			Accept: "application/json",
		},
	})
		.then((response) => response.json())
		.then((data) => {
			// El chiste se encuentra en la propiedad 'joke' del objeto de datos
			const jokeData = data.joke;

			currentJoke = {
				joke: jokeData,
				score: null,
				date: null,
			};

			// Mostrar el chiste en pantalla

			document.getElementById("jokesDisplayedHere").innerHTML =
				currentJoke.joke;
			document.getElementById("scoreButtons").classList.remove("d-none");
		})
		.catch((error) => {
			console.log("Error:", error);
		});
}

function scoreJoke(score) {
	currentJoke.score = score;
	currentJoke.date = new Date().toISOString();

	console.log(currentJoke.score);
	console.log(currentJoke.date);

	reportJokes.push(currentJoke)

	console.log(reportJokes)
}



window.addEventListener("load", () => {
	let long;
	let lat;
	let API_key = "f20927826b09ebbe8aaa76319fac9f1c";

	let temperatureDescription = document.querySelector(
		".temperature-description"
	);
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationWeather = document.querySelector(".location-city");
	let iconWeather = document.getElementById("icon");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_key}&units=metric`;

			fetch(weatherApi)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					const temp = Math.floor(data.main.temp);
					const weatherDescription = data.weather[0].description;
					const location = data.name;
					const icon = data.weather[0].icon; //02d
					console.log(icon);

					// set DOM elements from the API
					temperatureDegree.textContent = `${temp} Celsius` ;
					temperatureDescription.textContent = weatherDescription;
					locationWeather.textContent = location;
					iconWeather.innerHTML = `<img src="./images/icons-temp/${icon}.png">`;
					
				});
		});
	}
});