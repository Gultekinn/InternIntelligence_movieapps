"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
}

const Product = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [scrollDirection, setScrollDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/discover/movie?api_key=e6199d4a2ef9eb0080b02488fa05e890")
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => console.error("API Error:", error));
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || movies.length === 0) return;

    const scrollMovies = () => {
      if (!slider) return;
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        setScrollDirection(-1);
      } else if (slider.scrollLeft <= 0) {
        setScrollDirection(1);
      }
      slider.scrollLeft += 2 * scrollDirection;
    };

    intervalRef.current = setInterval(scrollMovies, 20);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [movies, scrollDirection]);

  // Drag scroll fonksiyonları
  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;

    setIsDragging(true);
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const slider = sliderRef.current;
    if (!slider) return;

    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Hız katsayısı
    slider.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const slider = sliderRef.current;
    if (!slider) return;

    intervalRef.current = setInterval(() => {
      slider.scrollLeft += 4 * scrollDirection;
    }, 10);
  };

  return (
    <div className="w-full py-10">
      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex space-x-4 px-6 overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Dışarı çıkınca kaydırmayı durdur
        >
          {movies.concat(movies).map((movie, index) => (
            <div key={index} className="flex-shrink-0 w-[300px]">
              <Card movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
