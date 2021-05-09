const container = document.getElementById('pokemonContainer');
const BASE_URL = 'https://pokeapi.co/api/v2/';
const POKE_URL = 'pokemon/';
// const TYPE_URL = `type/${type}`;
const numberOfPokemon = 150;

const colours = {
	normal: '#a4acaf',
	fire: '#fd7d24',
	water: '#4592c4',
	grass: '#9bcc50',
	electric: '#eed535',
	ice: '#51c4e7',
	fighting: '#d56723',
	poison: '#b97fc9',
	ground: '#E0C068',
	flying: '#3dc7ef',
	psychic: '#f366b9',
	bug: '#729f3f',
	rock: '#a38c21',
	ghost: '#7b62a3',
	dark: '#707070',
	dragon: '#53a4cf',
	steel: '#9eb7b8',
	fairy: '#fdb9e9',
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
					<small class="poke-type"><span>${type}</span></small>
				</div>`;

	pokemonEl.innerHTML = pokemoncardInnerHTML;
	container.appendChild(pokemonEl);
};

fetchPokemon();
