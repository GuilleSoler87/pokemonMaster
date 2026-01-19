import { useNavigate } from 'react-router-dom';
import { Plus, Users, Swords } from 'lucide-react';
import Team from '@/features/team/components/Team';
import DraftTeam from '@/features/team/components/DraftTeam';
import usePokemonStore from '@/store/PokemonStore';
import IconButton from '@/components/common/IconButton';

const Home = () => {
    const navigate = useNavigate();
    const {
        savedTeams,
        startNewDraft,
        deleteTeam,
        currentDraft,
        discardDraft
    } = usePokemonStore();

    const handleCreateNew = () => {
        startNewDraft();
        navigate('/editor');
    };

    const handleEdit = (teamId) => {
        navigate(`/editor/${teamId}`);
    };

    const handleDelete = (e, teamId) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this team?')) {
            deleteTeam(teamId);
        }
    }

    return (
        <div className="home-page container">
            <header className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 className="text-h1-b title-gradient mb-2">My Teams</h1>
                    <p className="text-body-1 text-secondary">Manage and organize your Pokémon squads.</p>
                </div>
                <div className="d-flex gap-3">
                    <IconButton
                        onClick={() => navigate('/combat')}
                        variant="outline-danger"
                        size={null}
                        textClassName=""
                        className="fw-bold"
                        icon={<Swords size={20} />}
                        label="Battle Arena"
                    />
                    <IconButton
                        onClick={handleCreateNew}
                        variant="primary"
                        size={null}
                        textClassName=""
                        icon={<Plus size={20} />}
                        label="Create New Team"
                    />
                </div>
            </header>

            {/* Resume Draft Section */}
            {currentDraft && currentDraft.members.length > 0 && (
                <DraftTeam
                    draft={currentDraft}
                    onDiscard={discardDraft}
                    onResume={() => navigate('/editor')}
                />
            )}

            {savedTeams.length === 0 ? (
                <div className="card bg-dark border-secondary bg-opacity-50 py-5">
                    <div className="card-body text-center d-flex flex-column align-items-center">
                        <div className="rounded-circle bg-secondary bg-opacity-25 p-4 mb-4">
                            <Users size={40} className="text-secondary" />
                        </div>
                        <h2 className="text-h3-b text-light mb-2">No teams found</h2>
                        <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '400px' }}>
                            You haven't created any teams yet. Start your journey by assembling your first squad!
                        </p>
                        <IconButton
                            onClick={handleCreateNew}
                            variant="link"
                            size={null}
                            textClassName=""
                            className="text-decoration-none fw-bold text-info"
                            label="Build a Team →"
                        />
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {savedTeams.map((team) => (
                        <div key={team.id} className="col-12 col-md-6 col-lg-4">
                            <Team team={team} onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
