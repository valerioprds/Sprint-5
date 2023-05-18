document
	.getElementById("jokeGenerator")
	.addEventListener("click", generateJokes);

let JOKES_API = "https://icanhazdadjoke.com/"; // let JOKES_API : string = 'url api '

let reportAcudit = [];
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

			document.getElementById("jokesDisplayedHere").innerHTML = currentJoke.joke;
			document.getElementById('scoreButtons').style.display = 'block'
		})
		.catch((error) => {
			console.log("Error:", error);
		});
}
