import { useMemo, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { usePokemonList } from '@/features/pokemon/hooks/usePokemonQuery';

import usePokemonStore from '@/store/PokemonStore';
import PokemonCard from '@/features/pokemon/components/PokemonCard';
import TypeFilter from '@/components/common/TypeFilter';
import SearchBar from '@/components/common/SearchBar';

const DraggablePokemonNative = ({ pokemon, children }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `pokedex-${pokemon.id}`,
        data: {
            type: 'new-pokemon',
            pokemon
        }
    });

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} className={isDragging ? 'opacity-50' : ''}>
            {children}
        </div>
    );
};

const Pokedex = () => {
    const {
        pokedexFilters,
        setSearchTerm,
        setSelectedType,
        resetPokedexFilters,
        addPokemonToDraft,
        currentDraft
    } = usePokemonStore();

    const searchTerm = pokedexFilters.searchTerm;
    const selectedType = pokedexFilters.selectedType;

    useEffect(() => {
        return () => {
            resetPokedexFilters();
        };
    }, [resetPokedexFilters]);

    const currentMemberCount = currentDraft?.members.length || 0;


    const { data: allPokemon = [], isPending: isLoading, isError, error } = usePokemonList(151);

    const filteredPokemon = useMemo(() => {
        return allPokemon.filter(p => {
            const matchesSearch = p.name.includes(searchTerm.toLowerCase());
            const matchesType = selectedType ? p.types.includes(selectedType) : true;
            return matchesSearch && matchesType;
        });
    }, [allPokemon, searchTerm, selectedType]);

    const handleAdd = (pokemon) => {
        addPokemonToDraft(pokemon);
    };

    return (
        <div className="pokedex d-flex flex-column h-100 bg-dark bg-opacity-25">
            <div className="p-3 border-bottom border-secondary">
                <SearchBar
                    placeholder="Search loaded Pokémon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <TypeFilter selectedType={selectedType} onSelect={setSelectedType} />
            </div>

            <div className="flex-grow-1 overflow-auto p-3 custom-scrollbar">
                {isLoading && allPokemon.length === 0 ? (
                    <div className="d-flex flex-column items-center justify-content-center h-100 text-secondary gap-2 pt-5">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <span className="text-caption">Catching 'em all...</span>
                    </div>
                ) : isError ? (
                    <div className="d-flex flex-column items-center justify-content-center h-100 text-danger gap-2 pt-5">
                        <span className="text-caption">Error: {error.message}</span>
                    </div>
                ) : filteredPokemon.length === 0 ? (
                    <div className="text-center text-secondary py-5">
                        <p>No Pokémon found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="row g-3">
                        {filteredPokemon.map(poke => (
                            <div key={poke.id} className="col-12 col-xl-6">
                                <DraggablePokemonNative pokemon={poke}>
                                    <PokemonCard
                                        pokemon={poke}
                                        onAdd={handleAdd}
                                        isAdded={currentMemberCount >= 6}
                                    />
                                </DraggablePokemonNative>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pokedex;
