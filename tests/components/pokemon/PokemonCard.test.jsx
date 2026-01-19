import { render, screen } from '@testing-library/react';
import PokemonCard from '@/features/pokemon/components/PokemonCard';

describe('PokemonCard', () => {
    const mockPokemon = {
        id: 25,
        name: 'Pikachu',
        types: ['electric'],
        sprite: 'pikachu.png',
        stats: {
            hp: 35,
            attack: 55,
            defense: 40,
            speed: 90
        }
    };

    test('renders Pokemon name and stats correctly', () => {
        render(<PokemonCard pokemon={mockPokemon} />);

        expect(screen.getByText('Pikachu')).toBeInTheDocument();

        // Check Stats (HP value)
        expect(screen.getByText('35')).toBeInTheDocument();

        // Type badge
        expect(screen.getByText(/Electric/i)).toBeInTheDocument();

        // Check Image
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'pikachu.png');
        expect(img).toHaveAttribute('alt', 'Pikachu');
    });
});
