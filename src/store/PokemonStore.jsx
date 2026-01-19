import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { pokeApi } from '@/features/pokemon/services/pokemon';

const usePokemonStore = create(
    persist(
        (set, get) => ({
            pokemons: [],
            savedTeams: [],
            currentDraft: null,
            pokedexFilters: {
                searchTerm: '',
                selectedType: null,
            },

            fetchPokemons: async (limit) => {
                const data = await pokeApi.getPokemonList(limit);
                set({ pokemons: data });
                return data;
            },

            startNewDraft: () => {
                set({
                    currentDraft: {
                        id: null,
                        name: 'New Team',
                        members: [],
                    },
                });
            },

            editTeam: (teamId) => {
                const team = get().savedTeams.find((t) => t.id === teamId);
                if (team) {
                    const membersWithIds = team.members.map(m => ({
                        ...m,
                        instanceId: m.instanceId || crypto.randomUUID()
                    }));
                    set({ currentDraft: { ...team, members: membersWithIds } });
                }
            },

            updateDraftName: (name) => {
                set((state) => ({
                    currentDraft: state.currentDraft ? { ...state.currentDraft, name } : null,
                }));
            },

            addPokemonToDraft: (pokemon) => {
                const { currentDraft } = get();
                if (!currentDraft) return;

                if (currentDraft.members.length >= 6) {
                    console.warn("Team is full!");
                    return;
                }

                const newMember = {
                    ...pokemon,
                    instanceId: crypto.randomUUID()
                };

                set({
                    currentDraft: {
                        ...currentDraft,
                        members: [...currentDraft.members, newMember],
                    },
                });
            },

            removePokemonFromDraft: (instanceId) => {
                const { currentDraft } = get();
                if (!currentDraft) return;

                set({
                    currentDraft: {
                        ...currentDraft,
                        members: currentDraft.members.filter((m) => m.instanceId !== instanceId),
                    },
                });
            },

            reorderDraftMembers: (activeId, overId) => {
                const { currentDraft } = get();
                if (!currentDraft) return;

                const oldIndex = currentDraft.members.findIndex(m => m.instanceId === activeId);
                const newIndex = currentDraft.members.findIndex(m => m.instanceId === overId);

                if (oldIndex === -1 || newIndex === -1) return;

                const newMembers = [...currentDraft.members];
                const [moved] = newMembers.splice(oldIndex, 1);
                newMembers.splice(newIndex, 0, moved);

                set({
                    currentDraft: { ...currentDraft, members: newMembers }
                });
            },

            randomizeOrder: () => {
                const { currentDraft } = get();
                if (!currentDraft) return;

                const shuffled = [...currentDraft.members].sort(() => Math.random() - 0.5);
                set({
                    currentDraft: { ...currentDraft, members: shuffled }
                });
            },

            sortByStat: (statName) => {
                const { currentDraft } = get();
                if (!currentDraft) return;

                const sorted = [...currentDraft.members].sort((a, b) => {
                    return b.stats[statName] - a.stats[statName];
                });
                set({
                    currentDraft: { ...currentDraft, members: sorted }
                });
            },

            setDraftMembers: (members) => {
                const { currentDraft } = get();
                if (!currentDraft) return;
                set({
                    currentDraft: { ...currentDraft, members },
                });
            },

            saveDraft: () => {
                const { currentDraft, savedTeams } = get();
                if (!currentDraft) return;

                if (currentDraft.id) {
                    set({
                        savedTeams: savedTeams.map((t) => (t.id === currentDraft.id ? currentDraft : t)),
                        currentDraft: null,
                    });
                } else {
                    const newTeam = { ...currentDraft, id: crypto.randomUUID() };
                    set({
                        savedTeams: [...savedTeams, newTeam],
                        currentDraft: null,
                    });
                }
            },

            discardDraft: () => {
                set({ currentDraft: null });
            },

            deleteTeam: (teamId) => {
                set((state) => ({
                    savedTeams: state.savedTeams.filter(t => t.id !== teamId)
                }))
            },

            setSearchTerm: (term) => {
                set((state) => ({
                    pokedexFilters: { ...state.pokedexFilters, searchTerm: term }
                }));
            },

            setSelectedType: (type) => {
                set((state) => ({
                    pokedexFilters: { ...state.pokedexFilters, selectedType: type }
                }));
            },

            resetPokedexFilters: () => {
                set((state) => ({
                    pokedexFilters: { searchTerm: '', selectedType: null }
                }));
            },

        }),
        {
            name: 'pokemon-team-storage',
            partialize: (state) => ({
                savedTeams: state.savedTeams,
                currentDraft: state.currentDraft
            }),
        }
    )
);

export default usePokemonStore;
