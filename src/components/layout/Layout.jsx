import { Outlet, Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

const Layout = () => {
    return (
        <div className="main-layout d-flex flex-column min-vh-100 bg-dark text-light font-sans">
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary sticky-top bg-opacity-75 backdrop-blur">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none group">
                            <div className="p-2 rounded bg-gradient-brand">
                                <Gamepad2 className="text-white" size={24} />
                            </div>
                            <span className="text-h3-b text-light">
                                PokéTeam
                            </span>
                        </Link>

                        <div className="d-flex align-items-center gap-3">
                            <div className="text-caption fw-medium text-secondary">
                                Master League
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container py-4 flex-grow-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-top border-secondary mt-auto py-4 text-center text-secondary text-caption">
                <p className="m-0">Pokémon Master League by G. Soler</p>
            </footer>
        </div>
    );
};

export default Layout;
