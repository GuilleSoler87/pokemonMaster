import { Battle } from '@/features/combat/logic/Battle';
import { Pokemon } from '@/features/pokemon/models/Pokemon';

describe('Battle', () => {
    const createPokemon = (id, name, speed, attack, defense, hp) => {
        return new Pokemon({
            id,
            name,
            stats: { speed, attack, defense, hp },
            hp,
            sprite: 'test-sprite-url'
        });
    };

    test('simulate() should run a battle to completion and declare a winner', () => {
        const charizard = createPokemon(1, 'Charizard', 100, 80, 50, 100);
        const team1Data = {
            name: 'Red',
            members: [charizard]
        };

        const caterpie = createPokemon(2, 'Caterpie', 20, 10, 10, 30);
        const team2Data = {
            name: 'Blue',
            members: [caterpie]
        };

        const battle = new Battle(team1Data, team2Data);
        const result = battle.simulate();

        expect(result).toHaveProperty('winner');
        expect(result.winner).toBe('Red');
        expect(result.rounds.length).toBeGreaterThan(0);

        const firstRound = result.rounds[0];
        expect(firstRound).toHaveProperty('reason');
        expect(firstRound.reason).toMatch(/Charizard/);
    });
});
