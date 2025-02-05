"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/Card";
import Product from "@/components/Product";
import SavedMovies from "@/components/SavedMovies";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [showGenres, setShowGenres] = useState<boolean>(false);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const genresRes = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=e6199d4a2ef9eb0080b02488fa05e890"
        );
        setGenres(genresRes.data.genres);

        const popularRes = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=e6199d4a2ef9eb0080b02488fa05e890&sort_by=popularity.desc${
            selectedGenre ? `&with_genres=${selectedGenre}` : ""
          }`
        );
        setPopularMovies(popularRes.data.results);
        setFeaturedMovie(popularRes.data.results[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMoviesData();
  }, [selectedGenre]);

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white relative">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-cover bg-center filter blur-xl">
          <div className="movie-reel"></div>
        </div>

        {/* Featured Movie Section */}
        {featuredMovie && (
          <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-end p-6 sm:p-10 bg-black overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 opacity-25"
            />
            <div className="relative z-10 text-center md:text-left max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold">
                {featuredMovie.title}
              </h2>
              <p className="mt-2 mb-4 text-sm sm:text-base md:text-lg">
                {featuredMovie.overview}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                <Link
                  href={`https://www.youtube.com/results?search_query=${featuredMovie.title} trailer`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 px-4 sm:px-6 py-2 rounded-full text-sm sm:text-lg font-semibold"
                >
                  Watch Movie
                </Link>
                <Link
                  href={`/movie/${featuredMovie.id}`}
                  className="border-2 border-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-lg font-semibold"
                >
                  View Info
                </Link>
                <div className="relative">
                  {showGenres && (
                    <div className="absolute bg-black bg-opacity-90 text-white p-4 rounded-lg mb-2 shadow-xl w-full md:w-auto z-50 max-h-60 overflow-y-auto left-0 bottom-full">
                      {genres.map((genre) => (
                        <div
                          key={genre.id}
                          className="cursor-pointer hover:text-pink-500 py-1 text-center md:text-left"
                          onClick={() => {
                            setSelectedGenre(genre.id);
                            setShowGenres(false);
                          }}
                        >
                          {genre.name}
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setShowGenres(!showGenres)}
                    className="border-2 border-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-lg font-semibold"
                  >
                    Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Movie Lists */}
        <div className="px-4 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold my-4">🎬 All movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {popularMovies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        </div>

        {/* Popular Movies */}
        <div className="px-4 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold my-4">🎬 Popular Movies</h2>
          <Product />
        </div>

        {/* Watch Later */}
        <div className="px-4 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold my-4">🎬 Watch later</h2>
          <SavedMovies/>
        </div>

        {/* Background Animation - Dynamic Gradient */}
        <style jsx>{`
          .movie-reel {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              60deg,
              rgba(255, 0, 150, 0.8),
              rgba(0, 204, 255, 0.8)
            );
            background-size: 400% 400%;
            animation: lightStreaks 10s ease-in-out infinite;
            opacity: 0.3;
          }

          @keyframes lightStreaks {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </div>
    </>
  );
}
