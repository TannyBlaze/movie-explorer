import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [loading, setLoading] = useState(true);
    const apiKey = "3ee61c14232a3c0ab1187ad8b4b3df6c";

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
            .then((res) => {
                setMovie(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleWatchTrailer = async () => {
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
            );
            const trailer = res.data.results.find(
                (vid) => vid.type === "Trailer" && vid.site === "YouTube"
            );
            if (trailer) {
                setTrailerKey(trailer.key);
                setShowTrailer(true);
            } else {
                alert("Trailer not available");
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="animate-pulse w-full max-w-5xl flex flex-col md:flex-row gap-6 px-6">
                    <div className="w-full md:w-1/3 h-[500px] bg-gray-800 rounded-xl"></div>
                    <div className="flex-1 space-y-4">
                        <div className="h-8 bg-gray-700 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                        <div className="h-24 bg-gray-800 rounded"></div>
                        <div className="h-10 bg-gray-700 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    const bgImage = `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/85 to-black/95 backdrop-blur-[2px]"></div>

            <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 py-12 flex flex-col md:flex-row gap-10 items-center md:items-start text-white">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-2xl w-full md:w-1/3 object-cover shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col justify-center space-y-4 md:space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
                        {movie.title}
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base">
                        {movie.release_date} • {movie.runtime} min
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {movie.genres &&
                            movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 px-3 py-1 rounded-full text-xs uppercase tracking-wide"
                                >
                                    {genre.name}
                                </span>
                            ))}
                    </div>
                    <p className="text-gray-200 leading-relaxed max-w-2xl">{movie.overview}</p>
                    <div className="flex items-center gap-3">
                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                            <i className="fa-solid fa-star"></i> {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="text-gray-400 text-sm">
                            {movie.vote_count.toLocaleString()} votes
                        </span>
                    </div>
                    <button
                        onClick={handleWatchTrailer}
                        className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 w-fit"
                    >
                        Watch Trailer
                    </button>
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
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetail;
