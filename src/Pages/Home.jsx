import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import Testimonials from "../Components/Testimonials";
import HeroSlider from "../Components/HeroSlider";
import FunStats from "../Components/FunStats";

const Home = () => {
  const [partners, setPartners] = useState([]);
  const { loading, setLoading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/topPartners")
      .then((res) => {
        setPartners(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load top study partners!");
        setLoading(false);
      });
  }, [axiosPublic, setLoading]);

  return (
    <div className="min-h-screen bg-liner-to-b from-blue-50 to-white">
      <HeroSlider></HeroSlider>
      <FunStats></FunStats>
      <div className="text-center py-20 bg-linear-to-r from-blue-400 via-blue-100 to-blue-400">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800">
          Welcome to StudyMate
        </h1>
        <p className="text-gray-700 mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Find your perfect study partner and grow together! Collaborate, learn,
          and succeed.
        </p>
        <Link
          to="/find-partners"
          className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300"
        >
          Find Partners
        </Link>
        <div className="max-w-7xl mx-auto py-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
            Top Study Partners
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : partners.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {partners.map((partner) => (
                <div
                  key={partner._id}
                  className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl hover:scale-105 transition-transform duration-300 relative"
                >
                  {partner.rating >= 4 && (
                    <span className="absolute top-3 right-3 bg-yellow-400 text-white px-3 py-1 rounded-full font-semibold text-sm shadow-md">
                      Top Rated
                    </span>
                  )}
                  <img
                    src={
                      partner.profileImage ||
                      "https://i.ibb.co/358cJ6cF/download-6.webp"
                    }
                    alt={partner.name}
                    className="w-full h-52 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 mt-1">📘 {partner.subject}</p>
                  <p className="text-yellow-500 font-medium mt-1">
                    ⭐ Rating: {partner.rating || 0}
                  </p>
                  <Link
                    to={`/partner/${partner._id}`}
                    className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
                  >
                    View Profile →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No top partners found yet.
            </p>
          )}
        </div>
      </div>

      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
