import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";
import LoadingSpinner from "../Components/LoadingSpinner";

const PartnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);

  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/partners/${id}`);
        setPartner(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load partner details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPartner();
  }, [id]);

  const handleSendRequest = async () => {
    if (!user) {
      toast.error("You must be logged in to send a request!");
      navigate("/login", { state: { from: `/partner/${id}` } });
      return;
    }

    setSendingRequest(true);
    try {
      // Increment partnerCount
      await axios.patch(`http://localhost:3000/sendRequest/${id}`);
      setPartner((prev) => ({ ...prev, partnerCount: prev.partnerCount + 1 }));

      // Save request in requests collection
      await axios.post("http://localhost:3000/requests", {
        partnerId: id,
        partnerName: partner.name,
        partnerImage: partner.profileImage,
        subject: partner.subject,
        studyMode: partner.studyMode,
        userEmail: user.email,
        createdAt: new Date(),
      });

      toast.success("Partner request sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setSendingRequest(false);
    }
  };

  if (loading || authLoading) return <LoadingSpinner />;

  if (!partner)
    return (
      <p className="text-center mt-10 text-gray-600">Partner not found.</p>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <img
        src={
          partner.profileImage || "https://i.ibb.co/358cJ6cF/download-6.webp"
        }
        alt={partner.name}
        className="w-40 h-40 rounded-full mx-auto object-cover"
      />
      <h1 className="text-3xl font-bold text-center mt-4">{partner.name}</h1>
      <p className="text-center text-gray-600 mt-1">
        📘 Subject: {partner.subject}
      </p>
      <p className="text-center text-gray-600 mt-1">
        Mode: {partner.studyMode}
      </p>
      <p className="text-center text-gray-600 mt-1">
        Availability: {partner.availabilityTime || "Not specified"}
      </p>
      <p className="text-center text-gray-600 mt-1">
        Location: {partner.location || "Not specified"}
      </p>
      <p className="text-center text-gray-600 mt-1">
        Experience: {partner.experienceLevel || "Not specified"}
      </p>
      <p className="text-center text-yellow-600 font-semibold mt-1">
        Rating: {partner.rating || 0}
      </p>
      <p className="text-center text-gray-800 mt-1">
        Partner Requests: {partner.partnerCount || 0}
      </p>

      <button
        onClick={handleSendRequest}
        disabled={sendingRequest}
        className="block mx-auto mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {sendingRequest ? "Sending Request..." : "Send Partner Request"}
      </button>

      <ToastContainer />
    </div>
  );
};

export default PartnerDetails;
