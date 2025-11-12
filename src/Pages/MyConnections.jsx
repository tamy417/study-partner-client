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

  // Fetch requests
  const fetchRequests = async () => {
    if (!user) return;
    try {
      const res = await axios.get(
        `http://localhost:3000/requests?email=${user.email}`
      );
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load connections.");
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

  // Start updating
  const handleStartUpdate = (req) => {
    setUpdatingId(req._id);
    setUpdateForm({
      partnerName: req.partnerName,
      subject: req.subject,
      studyMode: req.studyMode,
    });
  };

  // Handle input change
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
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">My Connections</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-700">No connections found.</p>
      ) : (
        <table className="w-full border border-gray-300 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3 text-left text-gray-900">Partner</th>
              <th className="border p-3 text-gray-900">Subject</th>
              <th className="border p-3 text-gray-900">Mode</th>
              <th className="border p-3 text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-100">
                <td className="border p-3 flex items-center gap-3 text-gray-900">
                  <img
                    src={req.partnerImage}
                    alt={req.partnerName}
                    className="w-12 h-12 rounded-full border border-gray-300"
                  />
                  {req.partnerName}
                </td>
                <td className="border p-3 text-gray-900">{req.subject}</td>
                <td className="border p-3 text-gray-900">{req.studyMode}</td>
                <td className="border p-3 flex gap-2">
                  <button
                    onClick={() => handleStartUpdate(req)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Update Modal */}
      {updatingId && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg shadow-lg w-96 text-gray-900"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Update Request
            </h3>
            <div className="mb-3">
              <label className="block text-gray-900 font-medium">
                Partner Name
              </label>
              <input
                type="text"
                name="partnerName"
                value={updateForm.partnerName}
                readOnly
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-900 font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                value={updateForm.subject}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-900 font-medium">
                Study Mode
              </label>
              <select
                name="studyMode"
                value={updateForm.studyMode}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                required
              >
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setUpdatingId(null)}
                className="px-4 py-2 rounded border hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
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
