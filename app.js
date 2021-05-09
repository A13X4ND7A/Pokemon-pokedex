const BASE_URL = 'https://pokeapi.co/api/v2/';

async function getAll() {
	try {
		const {data} = await axios(BASE_URL);
	} catch (err) {
		console.log(err);
	}
}

getAll();
