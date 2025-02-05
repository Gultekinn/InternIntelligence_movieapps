"use client"; // Bu satırı ekledik

import React, { useState, useEffect } from "react";
import Image from "next/image";

// BlogPost türünü tanımladık
interface BlogPost {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]); // BlogPost tipini kullandık
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?api_key=e6199d4a2ef9eb0080b02488fa05e890"
        );
        const data = await response.json();
        setBlogPosts(data.results); // blogPosts'un tipi artık BlogPost[] olduğu için uyumlu
      } catch (error) {
        // error ile ilgili kodu kaldırdık
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative bg-gray-900 text-white min-h-screen px-6 py-12">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-cover bg-center filter blur-xl">
        <div className="movie-reel"></div>
      </div>

      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase mb-4">
          Movie Creators&apos; Blog
        </h1>
        <p className="text-lg sm:text-xl mt-2">
          Behind the scenes, cinematic masterpieces, and everything in between.
        </p>
      </div>

      <div className="relative z-10 mb-6 text-center">
        <input
          type="text"
          placeholder="Search for posts..."
          className="w-full sm:w-96 p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-400">Loading...</p>}

      {/* Blog Posts */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-600 p-4 rounded-lg bg-black bg-opacity-75 transition-transform transform hover:scale-105"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${post.poster_path}`}
                alt={post.title}
                width={500}
                height={750}
                className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg"
              />
              <h2 className="text-xl sm:text-2xl font-semibold mt-4">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                {new Date(post.release_date).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-300">{post.overview}</p>
              <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out">
                Read More
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-gray-400">
            No blog posts found.
          </div>
        )}
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
  );
};

export default BlogPage;
