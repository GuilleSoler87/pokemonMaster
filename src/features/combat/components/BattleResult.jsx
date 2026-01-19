import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Skull, Activity, ArrowLeft, Play, Pause, FastForward, RotateCcw } from 'lucide-react';
import IconButton from '@/components/common/IconButton';
import BattlePokemonList from '@/features/combat/components/BattlePokemonList';
import LogItem from '@/features/combat/components/items/LogItem';
import '@/styles/BattleResult.scss';


const BattleResult = ({ result, onReset }) => {
    const { rounds, team1Survivors, team2Survivors, team1Fainted, team2Fainted, winner } = result;

    // Animation State
    const [currentRoundIndex, setCurrentRoundIndex] = useState(-1); // -1 = Start, rounds.length = Finished
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1500);
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    // Reset animation trigger on round change to force replay
    useEffect(() => {
        setTriggerAnimation(false);
        const timer = setTimeout(() => {
            setTriggerAnimation(true);
        }, 50);
        return () => clearTimeout(timer);
    }, [currentRoundIndex]);

    // Playback Logic
    useEffect(() => {
        let interval;
        if (isPlaying && currentRoundIndex < rounds.length) {
            interval = setInterval(() => {
                setCurrentRoundIndex(prev => {
                    const next = prev + 1;
                    if (next >= rounds.length) {
                        setIsPlaying(false);
                        return rounds.length;
                    }
                    return next;
                });
            }, playbackSpeed);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentRoundIndex, rounds.length, playbackSpeed]);

    const handlePlayPause = () => setIsPlaying(!isPlaying);
    const handleResetAnimation = () => {
        setIsPlaying(false);
        setCurrentRoundIndex(-1);
    };
    const handleSkip = () => {
        setIsPlaying(false);
        setCurrentRoundIndex(rounds.length);
    };

    const isFinished = currentRoundIndex >= rounds.length;
    const currentRound = rounds[Math.min(currentRoundIndex, rounds.length - 1)];

    const displayRound = currentRoundIndex === -1 ? rounds[0] : (currentRound || rounds[rounds.length - 1]);

    // Determine animation classes based on result
    const getPokemon1Class = () => {
        if (!triggerAnimation || currentRoundIndex === -1 || isFinished) return "";
        if (currentRound.winner.id === currentRound.pokemon1.id) return "animate-attack-right z-2"; // Winner attacks
        return "animate-shake"; // Loser shakes/gets hit
    };

    const getPokemon2Class = () => {
        if (!triggerAnimation || currentRoundIndex === -1 || isFinished) return "";
        if (currentRound.winner.id === currentRound.pokemon2.id) return "animate-attack-left z-2";
        return "animate-shake";
    };

    return (
        <div className="battle-result container py-4">
            <IconButton
                onClick={onReset}
                variant="outline-secondary"
                size={null}
                textClassName=""
                className="mb-4"
                icon={<ArrowLeft size={16} />}
                label="New Battle"
            />

            {/* BATTLE ARENA */}
            <div className="card battle-arena mb-4">
                <div className="arena-overlay" />
                <div className="card-body position-relative d-flex flex-column justify-content-between p-0">
                    {/* Header */}
                    <div className="header-bar">
                        {isFinished ? (
                            <div className="animate-bounce">
                                <h2 className="text-h1-b title-gradient m-0">{winner} Wins!</h2>
                            </div>
                        ) : (
                            <h3 className="text-h2-b text-light m-0">
                                {currentRoundIndex === -1 ? "Ready to Fight" : `Round ${currentRoundIndex + 1}`}
                            </h3>
                        )}
                    </div>

                    {/* Arena Center */}
                    <div className="flex-grow-1 d-flex align-items-center justify-content-center gap-5 px-4 py-5">
                        <div className={`text-center transition-all pokemon-spot ${getPokemon1Class()}`}>
                            <div className="position-relative">
                                <img
                                    src={displayRound?.pokemon1.sprite}
                                    alt={displayRound?.pokemon1.name}
                                    className={`img-fluid drop-shadow-lg pokemon-image-battle ${isFinished && !team1Survivors.find(p => p.id === displayRound.pokemon1.id) ? 'grayscale opacity-50' : ''}`}
                                />
                            </div>
                            <div className="mt-3">
                                <h4 className="fw-bold text-info mb-1">{displayRound?.pokemon1.name}</h4>
                            </div>
                        </div>

                        {!isFinished && <div className="text-h3-b text-secondary opacity-25 fst-italic">VS</div>}

                        <div className={`text-center transition-all pokemon-spot ${getPokemon2Class()}`}>
                            <div className="position-relative">
                                <img
                                    src={displayRound?.pokemon2.sprite}
                                    alt={displayRound?.pokemon2.name}
                                    className={`img-fluid drop-shadow-lg pokemon-image-battle ${isFinished && !team2Survivors.find(p => p.id === displayRound.pokemon2.id) ? 'grayscale opacity-50' : ''}`}
                                />
                            </div>
                            <div className="mt-3">
                                <h4 className="fw-bold text-warning mb-1">{displayRound?.pokemon2.name}</h4>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="controls-bar">
                        <IconButton
                            onClick={handleResetAnimation}
                            variant="outline-secondary"
                            size="lg"
                            textClassName="" className="rounded-circle p-2 justify-content-center"
                            title="Restart"
                            icon={<RotateCcw size={20} />}
                        />
                        {!isFinished ? (
                            <IconButton
                                onClick={handlePlayPause}
                                variant={isPlaying ? 'outline-warning' : 'primary'}
                                size="sm"
                                className="px-4 rounded-pill fw-bold"
                                icon={isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                                label={isPlaying ? "Pause" : "Start Battle"}
                            />
                        ) : (
                            <div className="d-flex align-items-center gap-2 text-success fw-bold"><Trophy size={20} /> Battle Finished</div>
                        )}
                        <IconButton
                            onClick={handleSkip}
                            variant="outline-secondary"
                            size="sm"
                            className="rounded-circle p-2 justify-content-center"
                            title="Skip to End"
                            disabled={isFinished}
                            icon={<FastForward size={20} />}
                        />
                    </div>

                    {/* Log Overlay */}
                    {currentRoundIndex !== -1 && !isFinished && (
                        <div className="log-overlay-container">
                            <div className="log-pill">
                                {currentRound.reason}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="row g-4">
                {/* Team 1 Stats */}
                <div className="col-md-4">
                    <div className="card stat-card bg-dark border-secondary bg-opacity-50">
                        <div className="card-header bg-transparent border-secondary py-3">
                            <h3 className="text-h3-b m-0 text-info">Team 1 Results</h3>
                        </div>
                        <div className="card-body">
                            <h6 className="text-secondary text-uppercase text-caption fw-bold mb-3">Survivors</h6>
                            <BattlePokemonList list={team1Survivors} isFinished={isFinished} />

                            <hr className="border-secondary opacity-25 my-3" />

                            <h6 className="text-secondary text-uppercase text-caption fw-bold mb-3">Fainted</h6>
                            <BattlePokemonList list={team1Fainted} isFainted={true} isFinished={isFinished} />
                        </div>
                    </div>
                </div>

                {/* Log */}
                <LogItem rounds={rounds} currentRoundIndex={currentRoundIndex} />

                {/* Team 2 Stats */}
                <div className="col-md-4">
                    <div className="card stat-card bg-dark border-secondary bg-opacity-50">
                        <div className="card-header bg-transparent border-secondary py-3">
                            <h3 className="text-h3-b m-0 text-warning">Team 2 Results</h3>
                        </div>
                        <div className="card-body">
                            <h6 className="text-secondary text-uppercase text-caption fw-bold mb-3">Survivors</h6>
                            <BattlePokemonList list={team2Survivors} isFinished={isFinished} />

                            <hr className="border-secondary opacity-25 my-3" />

                            <h6 className="text-secondary text-uppercase text-caption fw-bold mb-3">Fainted</h6>
                            <BattlePokemonList list={team2Fainted} isFainted={true} isFinished={isFinished} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BattleResult;
