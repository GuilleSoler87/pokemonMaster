import { Pokemon } from '@/features/pokemon/models/Pokemon';
import { Battle } from '../logic/Battle';

/**
 * @param {Object} team1 
 * @param {Object} team2 
 * @returns {Object} 
 */
export const simulateBattle = (team1, team2) => {

    const player1 = {
        ...team1,
        members: team1.members.map(m => new Pokemon(m))
    };

    const player2 = {
        ...team2,
        members: team2.members.map(m => new Pokemon(m))
    };

    const battle = new Battle(player1, player2);
    return battle.simulate();
};
