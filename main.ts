//alert('hola')
document.getElementById("jokeGenerator")?.addEventListener("click", generateJokes);


//const JOKES_API: string = "https://icanhazdadjoke.com/";
interface Joke {
	joke: string;
	score: number | null;
	date: string | null;
}

let reportJokes: Joke[] = [];
let currentJoke: Joke | null = null;

function generateJokes(): void {
    const jokesApis: string[] = [
        "https://icanhazdadjoke.com/",
        "https://api.chucknorris.io/jokes/random"
    ];
    const randomApiIndex: number = Math.floor(Math.random() * jokesApis.length);
    const selectedApi: string = jokesApis[randomApiIndex];

    fetch(selectedApi, {
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let jokeData: string = "";

            if (selectedApi === "https://icanhazdadjoke.com/") {
                jokeData = data.joke;
            } else if (selectedApi === "https://api.chucknorris.io/jokes/random") {
                jokeData = data.value;
            }

            currentJoke = {
                joke: jokeData,
                score: null,
                date: null,
            };

            const jokesDisplayedHere: HTMLElement | null = document.querySelector("#jokesDisplayedHere") as HTMLElement;
            jokesDisplayedHere.innerHTML = currentJoke.joke;

            (document.getElementById("scoreButtons") as HTMLElement).classList.remove("d-none");
        })
        .catch((error) => {
            console.log("Error:", error);
        });
}


function scoreJoke(score: number): void {
	if (currentJoke) {
		currentJoke.score = score;
		currentJoke.date = new Date().toISOString();

		console.log(currentJoke.score);
		console.log(currentJoke.date);

		reportJokes.push(currentJoke);

		console.log(reportJokes);
	}
}


window.addEventListener("load", () => {
	let long: number | undefined;
	let lat: number | undefined;
	let API_key: string = "f20927826b09ebbe8aaa76319fac9f1c";

	let temperatureDescription = document.querySelector(
		".temperature-description"
	) as HTMLElement;
	let temperatureDegree = document.querySelector(".temperature-degree") as HTMLElement;
	let locationWeather = document.querySelector(".location-city") as HTMLElement;
	let iconWeather = document.getElementById("icon") as HTMLElement;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const weatherApi: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_key}&units=metric`;

			fetch(weatherApi)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					const temp: number = Math.floor(data.main.temp);
					const weatherDescription: string = data.weather[0].description;
					const location: string = data.name;
					const icon: string = data.weather[0].icon; //02d
					console.log(icon);

					// set DOM elements from the API
					temperatureDegree.textContent = `${temp} Celsius`;
					temperatureDescription.textContent = weatherDescription;
					locationWeather.textContent = location;
					iconWeather.innerHTML = `<img src="./images/icons-temp/${icon}.png">`;
				});
		});
	}
});

