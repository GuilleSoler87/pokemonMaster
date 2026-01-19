import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import IconButton from '@/components/common/IconButton';
import TeamSelection from '@/features/combat/components/TeamSelection';
import BattleResult from '@/features/combat/components/BattleResult';
import { simulateBattle } from '@/features/combat/services/combat';

const Combat = () => {
    const navigate = useNavigate();
    const [battleResult, setBattleResult] = useState(null);

    const handleFight = (team1, team2) => {
        const result = simulateBattle(team1, team2);
        setBattleResult(result);
    };

    const handleReset = () => {
        setBattleResult(null);
    };

    return (
        <div className="combat-page container py-4">
            <header className="text-center mb-5 position-relative">
                <div className="position-absolute top-0 start-0">
                    <IconButton
                        onClick={() => navigate('/')}
                        variant="outline-secondary"
                        size={null}
                        className="rounded-circle p-2 justify-content-center"
                        style={{ width: '40px', height: '40px' }}
                        icon={<ArrowLeft size={20} />}
                    />
                </div>
                <h1 className="text-h1-b title-gradient">Combat Arena</h1>
                <p className="text-body-1 text-secondary">Test your teams in the ultimate battle simulation</p>
            </header>

            {!battleResult ? (
                <TeamSelection onFight={handleFight} />
            ) : (
                <BattleResult result={battleResult} onReset={handleReset} />
            )}
        </div>
    );
};

export default Combat;
