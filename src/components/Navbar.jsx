import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/80 border-b border-yellow-400/20 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-center items-center py-4 px-4">
                <Link
                    to="/"
                    className="text-3xl font-extrabold text-yellow-400 tracking-wide hover:scale-105 hover:text-yellow-300 transition-transform duration-300"
                >
                    MovieExplorer
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
