import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePokemonStore from '@/store/PokemonStore';
import { ArrowLeft, Save } from 'lucide-react';
import {
    DndContext,
    DragOverlay,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import TeamEditor from '@/features/team/components/TeamEditor';
import Pokedex from '@/features/pokemon/components/Pokedex';
import PokemonCard from '@/features/pokemon/components/PokemonCard';
import DraggableTeamMember from '@/features/team/components/DraggableTeamMember';
import IconButton from '@/components/common/IconButton';

const Editor = () => {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const {
        currentDraft,
        editTeam,
        startNewDraft,
        saveDraft,
        discardDraft,
        updateDraftName,
        addPokemonToDraft,
        reorderDraftMembers
    } = usePokemonStore();

    const [activeDragItem, setActiveDragItem] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        if (teamId) {
            editTeam(teamId);
        } else if (!currentDraft) {
            startNewDraft();
        }
    }, [teamId]);

    const handleSave = () => {
        saveDraft();
        navigate('/');
    };

    const handleDiscard = () => {
        if (window.confirm('Discard changes and return to home?')) {
            discardDraft();
            navigate('/');
        }
    };

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveDragItem(active.data.current);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveDragItem(null);

        if (!over) return;

        const activeType = active.data.current?.type;
        const overId = over.id;

        // Case 1: Dragging NEW Pokemon from Pokedex -> Team
        if (activeType === 'new-pokemon') {
            // If dropped over the team list droppable zone OR over any team member
            if (overId === 'team-list-droppable' || over.data.current?.type === 'team-member') {
                addPokemonToDraft(active.data.current.pokemon);
            }
        }

        // Case 2: Reordering Existing Members
        if (activeType === 'team-member') {
            if (active.id !== overId) {
                // If dropped over another member
                if (over.data.current?.type === 'team-member') {
                    reorderDraftMembers(active.id, overId);
                }
            }
        }
    };

    if (!currentDraft) return <div className="p-8 text-center">Loading team editor...</div>;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="editor-page row h-100 g-4">
                {/* Left Panel: Team Board */}
                <div className="col-12 col-lg-8 d-flex flex-column gap-3">
                    <header className="card bg-dark border-secondary bg-opacity-50">
                        <div className="card-body p-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div className="d-flex align-items-center gap-3 w-100 w-md-auto">
                                <IconButton
                                    onClick={() => navigate('/')}
                                    variant="outline-secondary"
                                    size={null}
                                    textClassName=""
                                    className="rounded-circle p-2 justify-content-center"
                                    style={{ width: '38px', height: '38px' }}
                                    icon={<ArrowLeft size={18} />}
                                />
                                <input
                                    type="text"
                                    value={currentDraft.name}
                                    onChange={(e) => updateDraftName(e.target.value)}
                                    className="form-control form-control-lg bg-transparent border-0 text-light text-h3-b px-2"
                                    style={{ boxShadow: 'none' }}
                                    placeholder="Team Name"
                                />
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <IconButton
                                    onClick={handleDiscard}
                                    variant="outline-danger"
                                    size={null}
                                    textClassName=""
                                    className="flex-grow-1 flex-md-grow-0"
                                    label="Discard"
                                />
                                <IconButton
                                    onClick={handleSave}
                                    variant="primary"
                                    size="sm"
                                    icon={<Save size={16} />}
                                    label="Save Team"
                                />
                            </div>
                        </div>
                    </header>

                    <div className="flex-grow-1 card bg-dark border-secondary bg-opacity-50 overflow-hidden">
                        <div className="card-body overflow-auto custom-scrollbar">
                            {/* Drag and Drop Area */}
                            <TeamEditor />
                        </div>
                    </div>
                </div>

                {/* Right Panel: Pokemon Picker */}
                <div className="col-12 col-lg-4 d-flex flex-column" style={{ height: 'calc(100vh - 140px)' }}>
                    <div className="card bg-dark border-secondary bg-opacity-50 h-100 overflow-hidden">
                        <div className="card-header bg-black bg-opacity-20 border-bottom border-secondary">
                            <h2 className="text-body-1 fw-bold text-light m-0">Pokédex</h2>
                        </div>
                        <div className="card-body p-0 overflow-hidden d-flex flex-column">
                            <div className="card-body p-0 overflow-hidden d-flex flex-column">
                                <Pokedex />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DragOverlay>
                {activeDragItem ? (
                    activeDragItem.type === 'new-pokemon' ? (
                        <div style={{ width: '200px', opacity: 0.9, transform: 'rotate(5deg)', cursor: 'grabbing' }}>
                            <PokemonCard pokemon={activeDragItem.pokemon} />
                        </div>
                    ) : activeDragItem.type === 'team-member' ? (
                        <div style={{ opacity: 0.9, transform: 'rotate(2deg)', cursor: 'grabbing' }}>
                            <DraggableTeamMember pokemon={activeDragItem.pokemon} onRemove={() => { }} />
                        </div>
                    ) : null
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default Editor;
