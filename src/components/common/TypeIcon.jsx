import { Plus, Zap, Droplets, Flame, Skull, Mountain, Snowflake, Wind, Bug, Eye, Star, Moon, Shield, Sword } from 'lucide-react';

const TypeIcon = ({ type, size = '100%', padding = '2px', className = '', color = 'currentColor' }) => {
    const style = { width: size, height: size, padding };

    switch (type) {
        case 'fire': return <Flame style={style} className={className} fill={color} />;
        case 'water': return <Droplets style={style} className={className} fill={color} />;
        case 'electric': return <Zap style={style} className={className} fill={color} />;
        case 'grass': return <Bug style={style} className={className} fill={color} />;
        case 'psychic': return <Eye style={style} className={className} fill={color} />;
        case 'fighting': return <Sword style={style} className={className} fill={color} />;
        case 'rock':
        case 'ground': return <Mountain style={style} className={className} fill={color} />;
        case 'ice': return <Snowflake style={style} className={className} fill={color} />;
        case 'flying': return <Wind style={style} className={className} fill={color} />;
        case 'ghost': return <Moon style={style} className={className} fill={color} />;
        default: return <Star style={style} className={className} fill={color} />;
    }
};

export default TypeIcon;
