import { Link } from 'react-router-dom';

function MovieCard({ movie, loading }) {
    if (loading || !movie) {
        return <div className="h-64 bg-gray-800 rounded-xl animate-pulse"></div>;
    }

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    return (
        <Link
            to={`/movie/${movie.id}`}
            className="group relative block rounded-xl overflow-hidden bg-gray-900 shadow-md hover:shadow-2xl transform hover:scale-[1.05] transition-all duration-500 ease-out"
        >
            <img
                src={poster}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:opacity-75 transition duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 ease-out"></div>
            <div className="absolute bottom-0 w-full p-3 text-center">
                <h2 className="text-white font-semibold text-sm md:text-base truncate drop-shadow-lg">
                    {movie.title}
                </h2>
                <div className="mt-1 flex justify-center items-center gap-1 text-yellow-400 text-xs font-semibold">
                    {movie.vote_average.toFixed(1)}
                </div>
            </div>
            <span className="absolute top-2 right-2 bg-yellow-400 text-black font-bold text-[10px] px-2 py-1 rounded-full shadow-md">
                {movie.vote_average.toFixed(1)}
            </span>
            <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 group-hover:ring-yellow-400/50 transition duration-500 ease-out"></div>
        </Link>
    );
}

export default MovieCard;
