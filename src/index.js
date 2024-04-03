import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Pet } from "./Pet";

const App = () => {
	const [pets, setPets] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		async function fetchPets() {
			try {
				let response = await fetch("http://localhost:3001/pets");
				let data = await response.json();
				setPets(data);
			} catch (e) {
				console.log(e);
			}
		}

		setLoading(true);
		fetchPets();
		setLoading(false);

		// fetch("http://localhost:3001/pets")
		// 	.then((res) => res.json())
		// 	.then((pets) => setPets(pets));
	}, []);

	return (
		<main>
			<h1>Adopt-a-Pet</h1>
			{loading ? (
				<div className="loading">Loading...</div>
			) : (
				pets.map((pet) => {
					return (
						<li key={pet.id}>
							<Pet pet={pet}></Pet>
						</li>
					);
				})
			)}
			<ul>
				<li>pets go here</li>
			</ul>
			<button>Add a Pet</button>
		</main>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
