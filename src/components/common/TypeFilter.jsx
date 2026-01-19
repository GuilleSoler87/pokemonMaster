import TypeIcon from '@/components/common/TypeIcon';
import IconButton from '@/components/common/IconButton';
import { LayoutGrid } from 'lucide-react';

const types = [
    'all', 'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'steel', 'fairy'
];

const TypeFilter = ({ selectedType, onSelect }) => {
    return (
        <div className="type-filter d-flex flex-wrap gap-2 pb-3 justify-content-center">
            {types.map(type => {
                const isSelected = selectedType === type || (type === 'all' && !selectedType);

                return (
                    <IconButton
                        key={type}
                        onClick={() => onSelect((selectedType === type || type === 'all') ? null : type)}
                        isActive={isSelected}
                        variant="outline-light"
                        className="text-capitalize"
                        style={{ whiteSpace: 'nowrap', minWidth: 'fit-content' }}
                        icon={type === 'all' ? <LayoutGrid size={14} /> : <TypeIcon type={type} size={14} />}
                        label={type}
                    />
                );
            })}
        </div>
    );
};

export default TypeFilter;
