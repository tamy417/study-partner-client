import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaLaptopCode,
  FaLightbulb,
} from "react-icons/fa";
import { Link } from "react-router";

const slides = [
  {
    title: "Find Your Perfect Study Partner",
    desc: "Connect with peers who share your subjects, goals, and schedule.",
    bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
    icon: (
      <FaUserGraduate className="text-6xl md:text-8xl animate-bounce text-white/30 absolute top-10 left-10" />
    ),
    btn: { text: "Find Partners", link: "/find-partners" },
  },
  {
    title: "Collaborate and Learn",
    desc: "Study together online or offline to improve your understanding.",
    bg: "bg-gradient-to-r from-cyan-400 to-teal-500",
    icon: (
      <FaChalkboardTeacher className="text-6xl md:text-8xl animate-spin-slow text-white/30 absolute bottom-10 right-10" />
    ),
    btn: { text: "Join a Study Group", link: "/find-partners" },
  },
  {
    title: "Track Your Progress",
    desc: "Keep a count of your study connections and enhance your skills.",
    bg: "bg-gradient-to-r from-yellow-400 to-orange-400",
    icon: (
      <FaBook className="text-6xl md:text-8xl animate-pulse text-white/30 absolute top-1/3 right-1/4" />
    ),
    btn: { text: "View My Connections", link: "/my-connections" },
  },
  {
    title: "Boost Your Knowledge",
    desc: "Explore new subjects and expand your learning horizons.",
    bg: "bg-gradient-to-r from-purple-500 to-pink-500",
    icon: (
      <FaLightbulb className="text-6xl md:text-8xl animate-bounce text-white/20 absolute top-1/4 left-1/3" />
    ),
    btn: { text: "Explore Subjects", link: "/find-partners" },
  },
  {
    title: "Learn Modern Skills",
    desc: "Access coding, tech, and other modern subjects with peers.",
    bg: "bg-gradient-to-r from-green-400 to-lime-500",
    icon: (
      <FaLaptopCode className="text-6xl md:text-8xl animate-spin-slow text-white/30 absolute bottom-1/4 right-1/3" />
    ),
    btn: { text: "Start Learning", link: "/find-partners" },
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
    <section className="relative w-full h-[450px] md:h-[650px] overflow-hidden rounded-lg shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full top-0 left-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          } ${
            slide.bg
          } flex flex-col justify-center items-center text-white px-6 text-center`}
        >
          {slide.icon}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-fadeInUp">
            {slide.title}
          </h1>
          <p className="text-lg md:text-2xl drop-shadow-md animate-fadeInUp delay-200">
            {slide.desc}
          </p>
          {slide.btn && (
            <Link
              to={slide.btn.link}
              className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-50 transition"
            >
              {slide.btn.text}
            </Link>
          )}

          <span className="absolute w-24 h-24 bg-white/10 rounded-full top-10 left-1/4 animate-bounce-slow"></span>
          <span className="absolute w-32 h-32 bg-white/5 rounded-full bottom-10 right-1/3 animate-pulse-slow"></span>
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
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 6s infinite;
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s infinite;
          }
        `}
      </style>
    </section>
  );
};

export default HeroSlider;
