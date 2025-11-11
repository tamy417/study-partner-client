import React, { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const Home = () => {
  const [partners, setPartners] = useState([]);
  const { loading, setLoading } = use(AuthContext);
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
      <div className="text-center py-16 bg-blue-100">
        <h1 className="text-4xl font-bold text-blue-700">
          Welcome to StudyMate
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Find your perfect study partner and grow together!
        </p>
        <Link
          to="/find-partners"
          className="inline-block mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Find Partners
        </Link>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Top Study Partners
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : partners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner._id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={
                    partner.profileImage ||
                    "https://i.ibb.co/358cJ6cF/download-6.webp"
                  }
                  alt={partner.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-3 text-gray-800">
                  {partner.name}
                </h3>
                <p className="text-gray-600">📘 {partner.subject}</p>
                <p className="text-yellow-600 font-medium">
                  Rating: {partner.rating || 0}
                </p>
                <Link
                  to={`/partner/${partner._id}`}
                  className="inline-block mt-3 text-blue-600 hover:underline"
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
  );
};

export default Home;
