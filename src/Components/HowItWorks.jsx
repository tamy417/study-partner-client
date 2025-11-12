import React from "react";
import { FaUserPlus, FaSearch, FaHandshake, FaChartLine } from "react-icons/fa";
import { Link } from "react-router";

const steps = [
  {
    icon: <FaUserPlus className="text-5xl text-amber-500 mb-4" />,
    title: "1️⃣ Create Your Profile",
    desc: "Sign up and share your interests, goals, and preferred study style to get personalized matches.",
  },
  {
    icon: <FaSearch className="text-5xl text-blue-500 mb-4" />,
    title: "2️⃣ Find Your Study Partner",
    desc: "Search for like-minded learners who study similar subjects or follow the same learning pace.",
  },
  {
    icon: <FaHandshake className="text-5xl text-green-500 mb-4" />,
    title: "3️⃣ Connect & Collaborate",
    desc: "Send requests, chat instantly, and plan study sessions together to stay motivated and consistent.",
  },
  {
    icon: <FaChartLine className="text-5xl text-pink-500 mb-4" />,
    title: "4️⃣ Track Your Growth",
    desc: "Keep track of your learning milestones, partner activity, and collaboration stats over time.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-linear-to-b from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 animate-fadeIn">
          🚀 How StudyMate Works
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto animate-fadeIn delay-200">
          Follow these simple steps to connect with your ideal study partner and
          take your learning to the next level!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-amber-400 dark:border-amber-500"
            >
              <div className="flex flex-col items-center text-center">
                {step.icon}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link to={"/register"} className="mt-16  animate-bounce-slow">
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full mt-10 text-lg font-semibold shadow-md hover:shadow-lg transition">
            ✨ Get Started Today
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;
