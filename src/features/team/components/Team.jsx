import React from 'react';
import { Trophy, Trash2 } from 'lucide-react';
import IconButton from '@/components/common/IconButton';
import ImageItem from '@/components/common/Items/ImageItem';

const Team = ({ team, onEdit, onDelete }) => {
    return (
        <div
            className="team card h-100 bg-dark border-secondary bg-opacity-50 hover-card shadow-sm transition-transform"
            style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
        >
            <div className="card-body position-relative">
                <div className="position-absolute top-0 end-0 p-3 opacity-0 hover-action transition-opacity">
                    <IconButton
                        onClick={(e) => onDelete(e, team.id)}
                        variant="danger"
                        size="sm"
                        className="rounded-circle p-2 justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                        icon={<Trash2 size={16} />}
                    />
                </div>

                <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="rounded p-2 bg-primary bg-opacity-25 text-primary">
                        <Trophy size={20} />
                    </div>
                    <h3 className="text-h3-b text-light m-0">{team.name}</h3>
                </div>

                <div className="row g-1 bg-black bg-opacity-25 p-2 rounded mb-3 border border-secondary border-opacity-25">
                    {team.members.map((member, idx) => (
                        <div key={idx} className="col-2">
                            <ImageItem
                                src={member.sprite}
                                alt={member.name}
                                style={{ aspectRatio: '1/1' }}
                            />
                        </div>
                    ))}
                    {[...Array(6 - team.members.length)].map((_, i) => (
                        <div key={`empty-${i}`} className="col-2">
                            <ImageItem isEmpty style={{ aspectRatio: '1/1' }} />
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-between text-secondary text-caption mt-auto">
                    <span>{team.members.length} / 6 Members</span>
                    <span
                        className="text-info cursor-pointer"
                        onClick={() => onEdit(team.id)}
                    >
                        Edit Team &rarr;
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Team;
