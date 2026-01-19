import React from 'react';

const BattlePokemonList = ({ list, isFainted = false, isFinished = true }) => {
    if (!isFinished) return <p className="text-secondary text-caption text-center my-3">Battle in progress...</p>;
    if (list.length === 0) return <p className="text-secondary text-caption text-center my-3">None</p>;

    return (
        <div className="battle-pokemon-list row g-2">
            {list.map((p, i) => (
                <div key={i} className="col-3">
                    <div className={`ratio ratio-1x1 ${isFainted ? 'bg-danger' : 'bg-success'} bg-opacity-10 rounded border ${isFainted ? 'border-danger' : 'border-success'} border-opacity-25 p-1 ${isFainted ? 'grayscale' : ''}`} title={p.name}>
                        <img src={p.sprite} alt={p.name} className={`img-fluid object-fit-contain ${isFainted ? 'opacity-50' : ''}`} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BattlePokemonList;
