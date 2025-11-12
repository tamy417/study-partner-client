import React, { useState, useEffect } from "react";
import { FaBook, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

const slides = [
  {
    title: "Find Your Perfect Study Partner",
    desc: "Connect with peers who share your subjects, goals, and schedule.",
    bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
    icon: (
      <FaUserGraduate className="text-6xl md:text-8xl animate-bounce text-white/30 absolute top-10 left-10" />
    ),
  },
  {
    title: "Collaborate and Learn",
    desc: "Study together online or offline to improve your understanding.",
    bg: "bg-gradient-to-r from-cyan-400 to-teal-500",
    icon: (
      <FaChalkboardTeacher className="text-6xl md:text-8xl animate-spin-slow text-white/30 absolute bottom-10 right-10" />
    ),
  },
  {
    title: "Track Your Progress",
    desc: "Keep a count of your study connections and enhance your skills.",
    bg: "bg-gradient-to-r from-beige-400 to-amber-300",
    icon: (
      <FaBook className="text-6xl md:text-8xl animate-pulse text-white/30 absolute top-1/3 right-1/4" />
    ),
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-lg shadow-lg ">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full top-0 left-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          } ${
            slide.bg
          } flex flex-col justify-center items-center text-white px-4 text-center`}
        >
          {slide.icon}

          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-fadeInUp">
            {slide.title}
          </h1>
          <p className="text-lg md:text-2xl drop-shadow-md animate-fadeInUp delay-200">
            {slide.desc}
          </p>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white"
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 1s ease forwards;
          }
          .animate-spin-slow {
            animation: spin 20s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default HeroSlider;
