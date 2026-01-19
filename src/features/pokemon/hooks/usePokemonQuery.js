import { useQuery } from '@tanstack/react-query';
import usePokemonStore from '@/store/PokemonStore';

const getLocalData = (limit) => {
    try {
        const cacheString = window.localStorage.getItem('POKEDEX_CACHE');
        if (!cacheString) return undefined;
        const cache = JSON.parse(cacheString);
        const query = cache?.clientState?.queries?.find(q =>
            Array.isArray(q.queryKey) &&
            q.queryKey[0] === 'pokemonList' &&
            q.queryKey[1] === limit
        );
        return query?.state?.data;
    } catch (e) {
        console.warn('Failed to parse local cache', e);
        return undefined;
    }
};

//Default first generation
export const usePokemonList = (limit) => {
    const { fetchPokemons } = usePokemonStore();

    return useQuery({
        queryKey: ['pokemonList', limit],
        queryFn: () => fetchPokemons(limit),
        staleTime: 1000 * 60 * 60 * 24,
        // staleTime: Infinity,
        initialData: () => getLocalData(limit),
        refetchOnWindowFocus: false,
    });
};




