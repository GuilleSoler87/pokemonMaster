import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <div className="search-bar position-relative mb-3">
            <Search className="position-absolute text-secondary" size={18} style={{ top: '50%', left: '16px', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="form-control bg-black bg-opacity-25 border-secondary text-light py-2 rounded-pill text-body-2"
                style={{ paddingLeft: '3.5rem', boxShadow: 'none' }}
            />
        </div>
    );
};

export default SearchBar;
