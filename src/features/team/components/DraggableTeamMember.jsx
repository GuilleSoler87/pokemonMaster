import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash, GripVertical } from 'lucide-react';
import clsx from 'clsx';
import IconButton from '@/components/common/IconButton';
import ImageItem from '@/components/common/Items/ImageItem';
import ProgressBar from '@/components/common/ProgressBar';

const DraggableTeamMember = ({ pokemon, onRemove }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: pokemon.instanceId,
        data: {
            type: 'team-member',
            pokemon
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={clsx(
                "draggable-team-member position-relative group card border-secondary d-flex flex-row align-items-center p-2 mb-0 gap-3 hover-border-primary transition-all",
                isDragging ? "bg-dark shadow-lg border-primary" : "bg-dark bg-opacity-75"
            )}
        >
            {/* Drag Handle */}
            <div
                {...attributes}
                {...listeners}
                className="p-2 text-secondary cursor-grab active-cursor-grabbing"
            >
                <GripVertical size={20} />
            </div>

            <ImageItem
                src={pokemon.sprite}
                alt={pokemon.name}
                style={{ width: '64px', height: '64px' }}
            />

            <div className="flex-grow-1">
                <div className="d-flex align-items-baseline gap-2 mb-1">
                    <h5 className="m-0 text-body-2 fw-bold text-light text-capitalize">{pokemon.name}</h5>
                    <span className="text-caption font-monospace text-secondary">#{String(pokemon.id).padStart(3, '0')}</span>
                </div>
                <div className="d-flex gap-1">
                    {pokemon.types.map(t => (
                        <span key={t} className="badge bg-secondary bg-opacity-50 text-light text-capitalize fw-normal py-1 px-2 text-caption">{t}</span>
                    ))}
                </div>
            </div>

            <div className="d-none d-sm-flex flex-column gap-1 me-3" style={{ minWidth: '120px' }}>
                <div>
                    <div className="d-flex align-items-center gap-2 text-caption">
                        <span className="text-secondary fw-bold" style={{ width: '25px' }}>HP</span>
                        <ProgressBar value={pokemon.stats.hp} max={150} variant="success" />
                        <span className="text-secondary font-monospace text-end" style={{ width: '25px' }}>{pokemon.stats.hp}</span>
                    </div>
                </div>
                <div>
                    <div className="d-flex align-items-center gap-2 text-caption">
                        <span className="text-secondary fw-bold" style={{ width: '25px' }}>DEF</span>
                        <ProgressBar value={pokemon.stats.defense} max={150} variant="warning" />
                        <span className="text-secondary font-monospace text-end" style={{ width: '25px' }}>{pokemon.stats.defense}</span>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-2 text-caption">
                    <span className="text-secondary fw-bold" style={{ width: '25px' }}>ATK</span>
                    <ProgressBar value={pokemon.stats.attack} max={150} variant="danger" />
                    <span className="text-secondary font-monospace text-end" style={{ width: '25px' }}>{pokemon.stats.attack}</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-caption">
                    <span className="text-secondary fw-bold" style={{ width: '25px' }}>SPD</span>
                    <ProgressBar value={pokemon.stats.speed} max={150} variant="info" />
                    <span className="text-secondary font-monospace text-end" style={{ width: '25px' }}>{pokemon.stats.speed}</span>
                </div>
            </div>

            <IconButton
                onClick={() => onRemove(pokemon.instanceId)}
                variant="outline-danger"
                size="sm"
                className="p-2 rounded-3 border-0 bg-transparent"
                icon={<Trash size={18} />}
            />
        </div>
    );
};

export default DraggableTeamMember;
