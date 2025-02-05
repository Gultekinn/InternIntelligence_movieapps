"use client";
import React from "react";

const AboutPage = () => {
  return (
    <div className="relative bg-black text-white min-h-screen px-6 py-12">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-cover bg-center filter blur-xl">
        <div className="movie-reel"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12"> <br/>
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">
            About Us
          </h1>
          <button className="bg-red-600 hover:bg-red-800 text-white py-2 px-6 md:px-8 rounded-full font-medium text-sm md:text-base">
            Find Showtimes
          </button>
        </div>

        {/* Perks Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All the Perks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[ 
              { title: "Immersive Experience", desc: "Our theaters offer state-of-the-art sound and visuals for an unforgettable movie experience." },
              { title: "Luxury Seating", desc: "Relax in our premium recliner seats designed for maximum comfort." },
              { title: "Gourmet Snacks", desc: "Enjoy hand-crafted snacks and beverages delivered right to your seat." },
              { title: "Exclusive Rewards", desc: "Join our loyalty program to earn points and unlock special perks." },
            ].map((perk, index) => (
              <div key={index} className="border border-gray-600 p-4 rounded-lg bg-black bg-opacity-75">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{perk.title}</h3>
                <p className="text-gray-400 text-sm md:text-base">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-red-500 mb-4">Our Story</h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto text-sm md:text-base">
            Established in 1995, our cinema has been a cornerstone of entertainment for movie lovers. From hosting premiere nights to community film festivals, we’ve brought the magic of cinema to life for decades. Our mission is to create unforgettable moments, one movie at a time.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why <span className="text-red-500">Choose Us</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[ 
              "We feature cutting-edge technology for an immersive experience.",
              "Our theaters are family-friendly with a warm, welcoming atmosphere.",
              "We support local filmmakers by showcasing their work alongside blockbusters.",
            ].map((reason, index) => (
              <div key={index} className="border border-gray-600 p-6 rounded-lg text-center bg-black bg-opacity-75">
                <p className="text-gray-400 italic text-sm md:text-base">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Button */}
        <div className="text-center">
          <button className="bg-purple-600 hover:bg-purple-800 text-white py-3 px-8 rounded-full font-medium text-sm md:text-base">
            See All Offers and Promotions
          </button>
        </div>
      </div>

      {/* Background Animation - Dynamic Gradient */}
      <style jsx>{`
  .movie-reel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(60deg, rgba(255, 0, 150, 0.8), rgba(0, 204, 255, 0.8));
    background-size: 400% 400%;
    animation: lightStreaks 10s ease-in-out infinite;
    opacity: 0.3;
  }

  @keyframes lightStreaks {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`}</style>











    </div>
  );
};

export default AboutPage;
