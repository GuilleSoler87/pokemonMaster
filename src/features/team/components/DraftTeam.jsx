import React from 'react';
import { Users } from 'lucide-react';
import IconButton from '@/components/common/IconButton';

const DraftTeam = ({ draft, onDiscard, onResume }) => {
    return (
        <div className="draft-team card bg-dark border-secondary mb-5 shadow-lg bg-opacity-25">
            <div className="card-body p-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-3">
                    <div className="rounded p-3 bg-indigo-500 bg-opacity-25 text-indigo-400">
                        <Users size={24} />
                    </div>
                    <div>
                        <h3 className="text-h3-b text-light mb-1">Continue Editing: {draft.name}</h3>
                        <p className="text-body-2 text-secondary m-0">
                            {draft.members.length} Pokémon selected - Not saved yet
                        </p>
                    </div>
                </div>
                <div className="d-flex gap-2 w-100 w-md-auto">
                    <IconButton
                        onClick={() => {
                            if (window.confirm('Discard this draft?')) {
                                onDiscard();
                            }
                        }}
                        variant="outline-danger"
                        size={null}
                        textClassName=""
                        className="flex-grow-1 flex-md-grow-0"
                        label="Discard"
                    />
                    <IconButton
                        onClick={onResume}
                        variant="primary"
                        size={null}
                        textClassName=""
                        className="flex-grow-1 flex-md-grow-0"
                        label="Resume Edit"
                    />
                </div>
            </div>
        </div>
    );
};

export default DraftTeam;
