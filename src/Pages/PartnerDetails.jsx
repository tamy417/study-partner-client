import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../Components/LoadingSpinner";

const PartnerDetails = () => {
  const { id } = useParams();
  const { user, loading, setLoading } = use(AuthContext);
  const navigate = useNavigate();

  const [partner, setPartner] = useState(null);
  const [sendingRequest, setSendingRequest] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    axios
      .get(`http://localhost:3000/partners/${id}`)
      .then((res) => setPartner(res.data))
      .catch(() => toast.error("Failed to load partner details."))
      .finally(() => setLoading(false));
  }, [id, user, navigate, setLoading]);

  const handleSendRequest = () => {
    if (!user) {
      toast.error("You must be logged in to send a request.");
      return;
    }

    setSendingRequest(true);

    axios
      .patch(`http://localhost:3000/sendRequest/${id}`)
      .then(() => {
        toast.success("Partner request sent successfully!");
        setPartner((prev) => ({
          ...prev,
          partnerCount: prev.partnerCount + 1,
        }));

        return axios.post("http://localhost:3000/partnerRequests", {
          partnerId: partner._id,
          partnerName: partner.name,
          partnerEmail: partner.email,
          requesterEmail: user.email,
          createdAt: new Date(),
        });
      })
      .catch(() => toast.error("Failed to send partner request."))
      .finally(() => setSendingRequest(false));
  };

  if (loading) return <LoadingSpinner />;

  if (!partner)
    return (
      <p className="text-center mt-10 text-gray-600">Partner not found.</p>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 bg-white rounded-lg shadow-md">
      <img
        src={
          partner.profileImage || "https://i.ibb.co/358cJ6cF/download-6.webp"
        }
        alt={partner.name}
        className="w-48 h-48 object-cover rounded-full mx-auto"
      />
      <h1 className="text-3xl font-bold text-center mt-4 text-blue-400">
        {partner.name}
      </h1>
      <p className="text-gray-600 text-center mt-1">📘 {partner.subject}</p>
      <p className="text-gray-600 text-center mt-1">
        Mode: {partner.studyMode}
      </p>
      <p className="text-gray-600 text-center mt-1">
        Availability: {partner.availabilityTime}
      </p>
      <p className="text-gray-600 text-center mt-1">
        Location: {partner.location}
      </p>
      <p className="text-gray-600 text-center mt-1">
        Experience: {partner.experienceLevel}
      </p>
      <p className="text-yellow-600 text-center mt-1 font-semibold">
        Rating: {partner.rating || 0}
      </p>
      <p className="text-gray-800 text-center mt-1">
        Partner Requests: {partner.partnerCount || 0}
      </p>

      <button
        onClick={handleSendRequest}
        disabled={sendingRequest}
        className="block mx-auto mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {sendingRequest ? "Sending Request..." : "Send Partner Request"}
      </button>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default PartnerDetails;
