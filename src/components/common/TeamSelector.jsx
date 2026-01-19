import React from 'react';

const TeamSelector = ({ label, value, onChange, teams, disabledOptionId }) => {
    return (
        <div className="team-selector d-flex flex-column gap-2">
            <label className="form-label text-secondary text-caption text-uppercase fw-bold m-0">{label}</label>
            <select
                className="form-select bg-dark text-light border-secondary"
                value={value}
                onChange={onChange}
            >
                <option value="">Select a team...</option>
                {teams.map(t => (
                    <option key={t.id} value={t.id} disabled={t.id === disabledOptionId}>
                        {t.name} ({t.members.length} Members)
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TeamSelector;
