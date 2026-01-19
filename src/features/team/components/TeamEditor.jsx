import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Shuffle, ArrowDownWideNarrow, AlertCircle } from 'lucide-react';
import usePokemonStore from '@/store/PokemonStore';
import DraggableTeamMember from '@/features/team/components/DraggableTeamMember';
import IconButton from '@/components/common/IconButton';
import clsx from 'clsx';

const TeamEditor = () => {
    const {
        currentDraft,
        removePokemonFromDraft,
        randomizeOrder,
        sortByStat
    } = usePokemonStore();

    // We make the whole team area a droppable zone
    const { setNodeRef, isOver } = useDroppable({
        id: 'team-list-droppable',
        data: { accept: ['new-pokemon', 'team-member'] }
    });

    if (!currentDraft) return null;

    return (
        <div className="team-editor d-flex flex-column gap-3">
            {/* Toolbar */}
            <div className="d-flex flex-wrap items-center justify-content-between gap-3 pb-3 border-bottom border-secondary">
                <h3 className="text-caption text-secondary text-uppercase fw-bold m-0 pl-1">
                    Team Composition ({currentDraft.members.length} / 6)
                </h3>

                <div className="d-flex items-center gap-2">
                    <IconButton
                        onClick={() => randomizeOrder()}
                        variant="outline-light"
                        size="sm"
                        title="Shuffle"
                        icon={<Shuffle size={14} />}
                        label="Shuffle"
                    />

                    <div className="vr h-50 my-auto text-secondary mx-2" />

                    <IconButton
                        onClick={() => sortByStat('attack')}
                        variant="outline-light"
                        size="sm"
                        title="Sort by Attack"
                        icon={<ArrowDownWideNarrow size={14} />}
                        label="Attack"
                    />
                </div>
            </div>

            <div
                ref={setNodeRef}
                className={clsx(
                    "rounded-3 p-3 transition-colors",
                    isOver ? "bg-primary bg-opacity-10 border border-primary dashed-border" : "bg-transparent border border-transparent"
                )}
                style={{ minHeight: '400px', borderStyle: isOver ? 'dashed' : 'none' }}
            >
                {currentDraft.members.length === 0 ? (
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center text-secondary rounded-3 border border-secondary p-5 bg-dark bg-opacity-25">
                        <AlertCircle size={40} className="mb-3 opacity-50" />
                        <p className="text-body-1 fw-medium m-0">Your team is empty!</p>
                        <p className="text-caption m-0">Drag Pokémon here from the list.</p>
                    </div>
                ) : (
                    <SortableContext
                        items={currentDraft.members.map(m => m.instanceId)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="d-flex flex-column gap-2">
                            {currentDraft.members.map((member) => (
                                <DraggableTeamMember
                                    key={member.instanceId}
                                    pokemon={member}
                                    onRemove={removePokemonFromDraft}
                                    index={currentDraft.members.indexOf(member)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                )}
            </div>
        </div>
    );
};

export default TeamEditor;
