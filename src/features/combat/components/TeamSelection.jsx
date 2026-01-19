import React, { useState } from 'react';
import usePokemonStore from '@/store/PokemonStore';
import IconButton from '@/components/common/IconButton';
import TeamSelector from '@/components/common/TeamSelector';
import { Swords } from 'lucide-react';

const TeamSelection = ({ onFight }) => {
    const { savedTeams } = usePokemonStore();
    const [team1Id, setTeam1Id] = useState('');
    const [team2Id, setTeam2Id] = useState('');

    const handleFight = () => {
        const team1 = savedTeams.find(t => t.id === team1Id);
        const team2 = savedTeams.find(t => t.id === team2Id);
        if (team1 && team2) {
            onFight(team1, team2);
        }
    };

    const isReady = team1Id && team2Id && team1Id !== team2Id;

    if (savedTeams.length < 2) {
        return (
            <div className="text-center py-5">
                <h3 className="text-warning">Not enough teams!</h3>
                <p className="text-secondary">You need at least 2 saved teams to start a battle.</p>
            </div>
        );
    }

    return (
        <div className="team-selection card bg-dark border-secondary bg-opacity-50 p-4 max-w-2xl mx-auto">
            <h2 className="text-center text-light mb-4 text-h2-b">Select Teams</h2>

            <div className="row g-4 align-items-center mb-5">
                <div className="col-md-5">
                    <TeamSelector
                        label="Team 1"
                        value={team1Id}
                        onChange={(e) => setTeam1Id(e.target.value)}
                        teams={savedTeams}
                        disabledOptionId={team2Id}
                    />
                </div>

                <div className="col-md-2 text-center">
                    <div className="rounded-circle bg-danger bg-opacity-25 p-3 d-inline-flex">
                        <Swords size={32} className="text-danger" />
                    </div>
                </div>

                <div className="col-md-5">
                    <TeamSelector
                        label="Team 2"
                        value={team2Id}
                        onChange={(e) => setTeam2Id(e.target.value)}
                        teams={savedTeams}
                        disabledOptionId={team1Id}
                    />
                </div>
            </div>

            <div className="d-flex flex-column align-items-center">
                <IconButton
                    onClick={handleFight}
                    disabled={!isReady}
                    variant="danger"
                    size="lg"
                    className="px-5 fw-bold shadow-lg"
                    style={{
                        transform: isReady ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.2s'
                    }}
                    label="FIGHT!"
                />
                {!isReady && team1Id && team2Id && team1Id === team2Id && (
                    <p className="text-danger text-caption mt-2">Cannot battle the same team!</p>
                )}
            </div>
        </div>
    );
};

export default TeamSelection;
