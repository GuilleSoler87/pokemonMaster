import axios from 'axios';
import { Pokemon } from '../models/Pokemon';

const API_URL = 'https://pokeapi.co/api/v2';

export const pokeApi = {
    getPokemonList: async (limit = 151, offset = 0) => {
        const response = await axios.get(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
        const promises = response.data.results.map(async (pokemon) => {
            const detail = await axios.get(pokemon.url);
            return formatPokemonData(detail.data);
        });
        return Promise.all(promises);
    },
};

const formatPokemonData = (data) => {
    return new Pokemon({
        id: data.id,
        name: data.name,
        types: data.types.map((t) => t.type.name),
        // 1. Official Artwork 
        // sprite: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,

        // 2. Dream World 
        // sprite: data.sprites.other.dream_world.front_default || data.sprites.front_default,

        // 3. Home (3D)
        sprite: data.sprites.other.home.front_default || data.sprites.front_default,

        // 4. Showdown 
        // sprite: data.sprites.other.showdown.front_default || data.sprites.front_default,

        // 5. Pixel Art
        // sprite: data.sprites.front_default,
        stats: {
            hp: data.stats.find(s => s.stat.name === 'hp').base_stat,
            attack: data.stats.find(s => s.stat.name === 'attack').base_stat,
            defense: data.stats.find(s => s.stat.name === 'defense').base_stat,
            speed: data.stats.find(s => s.stat.name === 'speed').base_stat,
        }
    });
};
