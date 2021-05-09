const container = document.getElementById('pokemonContainer');
const BASE_URL = 'https://pokeapi.co/api/v2/';
const POKE_URL = 'pokemon/';
// const TYPE_URL = `type/${type}`;
const numberOfPokemon = 150;

const colours = {
	normal: '#A8A878',
	fire: '#F08030',
	water: '#6890F0',
	grass: '#78C850',
	electric: '#F8D030',
	ice: '#98D8D8',
	fighting: '#C03028',
	poison: '#A040A0',
	ground: '#E0C068',
	flying: '#A890F0',
	psychic: '#F85888',
	bug: '#A8B820',
	rock: '#B8A038',
	ghost: '#705898',
	dark: '#705848',
	dragon: '#7038F8',
	steel: '#B8B8D0',
	fairy: '#F0B6BC',
};

const main_types = Object.keys(colours);

//use a loop to get all pokemon
const fetchPokemon = async () => {
	for (let i = 1; i <= numberOfPokemon; i++) {
		await getPokemon(i);
	}
};

async function getPokemon(id) {
	try {
		const pokeData = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);

		createPokemonCard(pokeData.data);
	} catch (err) {
		console.log(err);
	}
}

const createPokemonCard = (pokemon) => {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	//get the name and add the first letter as an uppercase
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

	//add the #00 for the pokemon
	const id = pokemon.id.toString().padStart(3, '0');

	//get the types from the pokemon api, map over and get the type name
	const typeNames = pokemon.types.map((type) => type.type.name);

	const type = main_types.find((type) => typeNames.indexOf(type) > -1);

	const colour = colours[type];

	pokemonEl.style.backgroundColor = colour;

	const pokemoncardInnerHTML = `				<div class="img-container">
					<img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="" />
				</div>
				<div class="poke-info">
					<span class="poke-num">#${id}</span>
					<h3 class="poke-name">${name}</h3>
					<small class="poke-type">Type: <span>${type}</span></small>
				</div>`;

	pokemonEl.innerHTML = pokemoncardInnerHTML;
	container.appendChild(pokemonEl);
};

fetchPokemon();
