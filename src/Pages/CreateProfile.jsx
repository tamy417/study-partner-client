import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";
import LoadingSpinner from "../Components/LoadingSpinner";

const CreateProfile = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    profileImage: "",
    subject: "",
    studyMode: "",
    experienceLevel: "",
    availability: "",
    location: "",
    gender: "",
    birthday: "",
  });

  const [submitting, setSubmitting] = useState(false);

  if (authLoading) return <LoadingSpinner />;

  if (!user) {
    navigate("/login", { state: { from: { pathname: "/create-profile" } } });
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axiosPublic.post("/partners", formData);
      if (res.data?.insertedId) {
        toast.success("Profile created successfully!");
        navigate("/find-partners");
      } else {
        toast.error("Failed to create profile.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 to-white py-12 px-4 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Create Your Study Partner Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* name */}
          <div>
            <label className="block font-semibold text-black mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          {/* subject */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="e.g. Mathematics"
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          {/* studyMode */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Study Mode
            </label>
            <select
              name="studyMode"
              value={formData.studyMode}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="In-person">In-person</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* experience */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            >
              <option value="">Select Experience</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* availability */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Availability
            </label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="e.g. Weekends, Evenings"
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          {/* location */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City or Area"
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          {/* gender */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* birthday */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Birthday
            </label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          {/* profile image */}
          <div>
            <label className="block font-semibold text-black mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              placeholder="https://example.com/myphoto.jpg"
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          {/* submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-xl mt-4 transition-all ${
              submitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {submitting ? "Creating..." : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
