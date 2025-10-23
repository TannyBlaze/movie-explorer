import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

function Home() {
    const [movies, setMovies] = useState([]);
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [trailerKey, setTrailerKey] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [loading, setLoading] = useState(true);
    const apiKey = '3ee61c14232a3c0ab1187ad8b4b3df6c';

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
            .then((res) => {
                setMovies(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const featuredMovies = movies.slice(0, 5);

    useEffect(() => {
        if (featuredMovies.length > 0) {
            const interval = setInterval(() => {
                setFeaturedIndex((prev) => (prev + 1) % featuredMovies.length);
            }, 8000);
            return () => clearInterval(interval);
        }
    }, [featuredMovies]);

    const handleWatchTrailer = async (movieId) => {
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
            );
            const trailer = res.data.results?.find(
                (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
            );
            if (trailer) {
                setTrailerKey(trailer.key);
                setShowTrailer(true);
            } else {
                alert('Trailer not available');
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <div className="animate-pulse w-full max-w-6xl space-y-6 px-6">
                    <div className="h-[70vh] bg-gray-800 rounded-xl"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="h-64 bg-gray-800 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const featured = featuredMovies[featuredIndex];
    const bgImage = featured?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${featured.backdrop_path}`
        : '/fallback-image.jpg';

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <div
                className="relative h-[75vh] w-full bg-cover bg-center flex items-end transition-all duration-[2000ms] ease-in-out"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div className="relative z-10 p-6 md:p-12 max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                        {featured?.title}
                    </h1>
                    <p className="text-gray-300 mb-6 line-clamp-3">{featured?.overview}</p>
                    <button
                        onClick={() => handleWatchTrailer(featured.id)}
                        className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300"
                    >
                        Watch Trailer
                    </button>
                </div>
            </div>
            <div className="p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Popular Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="transform hover:scale-105 transition-transform duration-300 hover:z-10"
                        >
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
            {showTrailer && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-3xl aspect-video">
                        <iframe
                            className="w-full h-full rounded-lg shadow-2xl"
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                            title="Movie Trailer"
                            allowFullScreen
                        ></iframe>
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-full"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
