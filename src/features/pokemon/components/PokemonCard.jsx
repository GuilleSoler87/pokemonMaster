import { Plus, Shield } from 'lucide-react';
import TypeIcon from '@/components/common/TypeIcon';
import IconButton from '@/components/common/IconButton';
import '@/styles/PokemonTypes.scss';
import '@/styles/PokemonCard.scss';

const PokemonCard = ({ pokemon, onAdd, isAdded }) => {
    const mainType = pokemon.types[0];

    return (
        <div className={`pokemon-card h-100 type-${mainType} `}>
            <div className="inner-content">

                <div className="d-flex justify-content-between align-items-center mb-2 position-relative" style={{ zIndex: 10 }}>
                    <div className="d-flex align-items-center">
                        <div>
                            <span className="m-0 text-body-2 fw-bold text-capitalize pokemon-name">{pokemon.name}</span>
                        </div>
                    </div>

                    <div className="d-flex align-items-center">
                        <span className="me-1">
                            <span className="text-caption fw-bold me-1 stat-label">PS</span>
                            <span className="text-body-2 fw-bold stat-value">{pokemon.stats.hp}</span>
                        </span>
                        <div className="rounded-circle d-flex align-items-center justify-content-center border border-white type-circle">
                            <TypeIcon type={mainType} />
                        </div>
                    </div>
                </div>

                <div className="image-frame">
                    <div className="w-100 bg-white border border-secondary position-relative overflow-hidden rounded-1 image-container">
                        <img
                            src={pokemon.sprite}
                            className="img-fluid d-block position-relative pokemon-image"
                            alt={pokemon.name}
                        />

                        <div className="position-absolute top-0 start-0 w-100 h-100 image-overlay"></div>

                        {onAdd && (
                            <IconButton
                                onClick={() => onAdd(pokemon)}
                                disabled={isAdded}
                                aria-label="Add to team"
                                variant={null}
                                size="sm"
                                className={`position-absolute top-0 end-0 m-1 rounded-circle p-0 justify-content-center shadow-lg border-0 add-button ${isAdded ? 'added' : ''}`}
                                icon={<Plus size={18} strokeWidth={3} />}
                            />
                        )}
                    </div>
                </div>

                <div className="gold-bar">
                    <small className="skew-text text-caption">
                        No. {String(pokemon.id).padStart(3, '0')}
                    </small>
                </div>

                <div className="stats-container">

                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center gap-1">
                            <div className="d-flex align-items-center justify-content-center rounded-circle shadow-sm stat-icon-circle">
                                <TypeIcon type={mainType} />
                            </div>
                            <span className="text-caption fw-bold text-dark">Speed</span>
                        </div>
                        <span className="text-caption fw-bold text-dark">{pokemon.stats.speed}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2 border-top border-secondary border-opacity-25">
                        <div className="d-flex align-items-center gap-1 mt-2">
                            <div className="d-flex gap-1">
                                <div className="d-flex align-items-center justify-content-center rounded-circle shadow-sm stat-icon-circle">
                                    <TypeIcon type={mainType} />
                                </div>
                                <div className="d-flex align-items-center justify-content-center rounded-circle shadow-sm stat-icon-circle">
                                    <TypeIcon type={mainType} />
                                </div>
                            </div>
                            <span className="text-caption fw-bold text-dark">Attack</span>
                        </div>
                        <span className="text-caption fw-bold text-dark">{pokemon.stats.attack}</span>
                    </div>

                    <div className="d-flex justify-content-start align-items-center mt-auto pt-2 border-top border-secondary border-opacity-25">
                        <div className="d-flex align-items-center gap-2">
                            <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center shadow-sm defense-icon-circle">
                                <Shield size={12} />
                            </div>
                            <span className="text-caption fw-bold text-dark">Defense</span>

                            <span className="text-caption fw-bold text-dark">{pokemon.stats.defense}</span>
                        </div>
                    </div>

                    <div className="border-top border-dark opacity-10 my-1"></div>

                    <div className="d-flex justify-content-center gap-2 mt-2">
                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                className="badge rounded-pill text-capitalize type-badge"
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="silver-bottom-edge" />
            </div>
        </div>
    );
};

export default PokemonCard;
