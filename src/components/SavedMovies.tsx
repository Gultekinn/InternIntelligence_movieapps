"use client"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { removeMovie } from "../redux/savedMoviesSlice";
import { Trash2, Play } from "lucide-react";
import Image from "next/image"; // Import Next.js Image component

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

const SavedMovies = () => {
  const savedMovies = useSelector((state: RootState) => state.savedMovies.savedMovies);
  const dispatch = useDispatch<AppDispatch>();
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerId, setTrailerId] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleRemoveMovie = (id: number) => {
    dispatch(removeMovie(id));
  };

  const handleShowTrailer = (movieId: number) => {
    const foundMovie = savedMovies.find((movie) => movie.id === movieId) as Movie | null;
  
    setShowTrailer(true);
    setSelectedMovie(foundMovie); // This should now work without error.
  
    if (foundMovie) {
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e6199d4a2ef9eb0080b02488fa05e890`)
        .then((response) => response.json())
        .then((data) => {
          const trailer = data.results.find(
            (video: { type: string; site: string }) => video.type === "Trailer" && video.site === "YouTube"
          );
          setTrailerId(trailer?.key || ""); // Trailer ID'yi güncelliyoruz
        })
        .catch((error) => {
          console.error("Trailer fetch error:", error);
          setTrailerId(""); // Hata durumunda trailerId'yi sıfırlıyoruz
        });
    }
  };
  

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {savedMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative max-w-xs mx-auto bg-black p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500} // Specify the width
                height={750} // Specify the height
                className="object-cover rounded-lg cursor-pointer"
              />
              <button
                onClick={() => handleShowTrailer(movie.id)}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full focus:outline-none"
              >
                <Play size={20} />
              </button>
            </div>

            <h2 className="text-sm sm:text-base text-white font-bold mt-4 line-clamp-1">{movie.title}</h2>
            <div className="flex items-center text-xs sm:text-sm text-gray-400 mt-2">
              <span className="mr-4">Rating: {movie.vote_average.toFixed(1)}</span>
              <span>Reviews: {movie.vote_count}+</span>
            </div>

            <div className="absolute bottom-9 right-1 flex space-x-2">
              <button
                onClick={() => handleRemoveMovie(movie.id)}
                className="p-2 rounded-full text-white hover:bg-red-700 transition"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showTrailer && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 text-white font-bold text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-white mb-4">{selectedMovie.title} - Trailer</h2>
            {trailerId ? (
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${trailerId}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Trailer"
                ></iframe>
              </div>
            ) : (
              <p className="text-gray-400">Trailer not available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedMovies;
