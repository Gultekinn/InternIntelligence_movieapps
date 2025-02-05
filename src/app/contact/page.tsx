"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  User,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const ContactPage = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  return (
    <div className="relative bg-black text-white min-h-screen px-6 py-12">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-cover bg-center filter blur-xl">
        <div className="movie-reel"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center"> <br/>
        <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4"> 
          Contact Us
        </h1>
        <p className="text-sm md:text-lg mb-6">
          We&apos;d love to hear from you! Fill out the form below to reach us.
        </p>
      </div>

      {/* Contact Form */}
      <div className="relative z-10 max-w-lg mx-auto bg-black bg-opacity-75 p-6 md:p-8 rounded-lg border border-gray-700">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center bg-gray-800 p-3 rounded-lg">
            <User size={20} className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-transparent text-white outline-none text-sm md:text-base"
              required
            />
          </div>
          <div className="mb-4 flex items-center bg-gray-800 p-3 rounded-lg">
            <Mail size={20} className="text-gray-400 mr-3" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent text-white outline-none text-sm md:text-base"
              required
            />
          </div>
          <div className="mb-4 flex items-center bg-gray-800 p-3 rounded-lg">
            <MessageCircle size={20} className="text-gray-400 mr-3" />
            <textarea
              placeholder="Write your message here"
              className="w-full bg-transparent text-white outline-none h-24 text-sm md:text-base"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-600 text-white py-2 px-6 md:py-3 md:px-8 rounded-full font-medium hover:bg-red-800 transition text-sm md:text-base"
            >
              Send Message
            </button>
          </div>
        </form>
        {isFormSubmitted && (
          <p className="mt-6 text-green-500 text-center text-sm md:text-base">
            Your message has been sent successfully!
          </p>
        )}
      </div>

      {/* Address and Social Media */}
      <div className="relative z-10 text-center mt-8">
        <p className="text-sm md:text-lg flex justify-center items-center gap-2">
          <MapPin /> 123 Main Street, City, Country
        </p>
        <p className="mt-2 text-sm md:text-lg flex justify-center items-center gap-2">
          <Phone /> +1 234 567 890
        </p>
        <div className="mt-6 flex justify-center gap-4 md:gap-6">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            <Facebook className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-600">
            <Twitter className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-700">
            <Instagram className="w-5 h-5 md:w-6 md:h-6" />
          </a>
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

export default ContactPage;
