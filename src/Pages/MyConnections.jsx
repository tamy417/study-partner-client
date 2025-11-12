import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import LoadingSpinner from "../Components/LoadingSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyConnections = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    partnerName: "",
    subject: "",
    studyMode: "",
  });

  // Fetch all requests for the logged-in user
  const fetchRequests = async () => {
    if (!user) return;
    try {
      const res = await axios.get(
        `http://localhost:3000/requests?email=${user.email}`
      );
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your connections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user]);

  // Delete request
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/requests/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success("Request deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete request.");
    }
  };

  // Start update process
  const handleStartUpdate = (req) => {
    setUpdatingId(req._id);
    setUpdateForm({
      partnerName: req.partnerName,
      subject: req.subject,
      studyMode: req.studyMode,
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/requests/${updatingId}`,
        updateForm
      );
      setRequests((prev) =>
        prev.map((r) => (r._id === updatingId ? { ...r, ...updateForm } : r))
      );
      toast.success("Request updated successfully!");
      setUpdatingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update request.");
    }
  };

  if (loading || authLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">My Connections</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No connections found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Partner</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Mode</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td className="border p-2 flex items-center gap-2">
                  <img
                    src={req.partnerImage}
                    alt={req.partnerName}
                    className="w-10 h-10 rounded-full"
                  />
                  {req.partnerName}
                </td>
                <td className="border p-2">{req.subject}</td>
                <td className="border p-2">{req.studyMode}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleStartUpdate(req)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Update Form Modal */}
      {updatingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg shadow-md w-96"
          >
            <h3 className="text-xl font-bold mb-4">Update Request</h3>
            <div className="mb-2">
              <label className="block text-gray-700 font-medium">
                Partner Name
              </label>
              <input
                type="text"
                name="partnerName"
                value={updateForm.partnerName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                value={updateForm.subject}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-medium">
                Study Mode
              </label>
              <select
                name="studyMode"
                value={updateForm.studyMode}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setUpdatingId(null)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyConnections;
