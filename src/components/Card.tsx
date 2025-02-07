"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Clock, Play } from "lucide-react";
import { addMovie, removeMovie } from "../redux/savedMoviesSlice";
import { RootState } from "../redux/store";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
}

const Card = ({ movie }: { movie: Movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerId, setTrailerId] = useState("");
  const [saved, setSaved] = useState(false);

  const dispatch = useDispatch();
  const savedMovies = useSelector(
    (state: RootState) => state.savedMovies.savedMovies
  );

  useEffect(() => {
    const isSaved = savedMovies.some(
      (savedMovie) => savedMovie.id === movie.id
    );
    setSaved(isSaved);
  }, [savedMovies, movie.id]);

  const toggleSaveMovie = () => {
    if (saved) {
      dispatch(removeMovie(movie.id));
    } else {
      dispatch(addMovie(movie));
    }
    setSaved(!saved);
  };

  useEffect(() => {
    if (showTrailer) {
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=e6199d4a2ef9eb0080b02488fa05e890`
      )
        .then((response) => response.json())
        .then((data) => {
          const trailer = data.results.find(
            (video: { type: string; site: string }) =>
              video.type === "Trailer" && video.site === "YouTube"
          );
          setTrailerId(trailer?.key || "");
        });
    }
  }, [showTrailer, movie.id]);

  return (
    <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      <div className="bg-black p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
        <div className="relative">
          <Link href={`/movie/${movie.id}`} passHref>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full h-auto object-cover rounded-lg cursor-pointer"
            />
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowTrailer(true);
            }}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full focus:outline-none"
          >
            <Play size={16} />
          </button>
        </div>
        <h2 className="text-lg text-white font-bold mt-4 line-clamp-1">
          {movie.title}
        </h2>
        <div className="flex flex-wrap items-center text-sm text-gray-400 mt-2">
          <span className="mr-4">Length: 01:37</span>
          <span className="mr-4">Lang: Eng</span>
          <span>Rating: {movie.vote_average.toFixed(1)}</span>
        </div>
        <div className="text-gray-400 text-sm mt-2">
          Review: {movie.vote_count}+
        </div>
        <div className="mt-2 text-yellow-400 font-bold">
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveMovie();
            }}
            className={`p-2 rounded-full ${
              saved ? "bg-blue-500" : "bg-transparent"
            } text-white transition duration-300`}
          >
            <Clock size={15} />
          </button>
        </div>
      </div>
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 text-white font-bold text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-white mb-4">
              {movie.title} - Trailer
            </h2>
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

export default Card;
