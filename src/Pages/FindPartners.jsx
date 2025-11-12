import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";
import LoadingSpinner from "../Components/LoadingSpinner";
import { toast } from "react-toastify";

const FindPartners = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [partners, setPartners] = useState([]);
  const [displayed, setDisplayed] = useState([]);

  const [subjectSearch, setSubjectSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLocalLoading(true);

    axiosPublic
      .get("/partners")
      .then((res) => {
        if (!mounted) return;
        setPartners(res.data || []);
        setDisplayed(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load partners", err);
        toast.error("Failed to load partners.");
      })
      .finally(() => setLocalLoading(false));

    return () => {
      mounted = false;
    };
  }, [axiosPublic]);

  useEffect(() => {
    if (!subjectSearch && !sortOrder) {
      setDisplayed(partners);
      return;
    }

    const params = {};
    if (subjectSearch) params.subject = subjectSearch;
    if (sortOrder) params.sort = sortOrder;

    setLocalLoading(true);
    axiosPublic
      .get("/partners", { params })
      .then((res) => {
        setDisplayed(res.data || []);
      })
      .catch((err) => {
        console.warn(
          "Server filter failed, falling back to client filter",
          err
        );
        let list = partners.slice();

        if (subjectSearch) {
          const s = subjectSearch.trim().toLowerCase();
          list = list.filter((p) =>
            (p.subject || "").toLowerCase().includes(s)
          );
        }

        if (sortOrder) {
          const rank = (lvl) => {
            if (!lvl) return 0;
            const l = String(lvl).toLowerCase();
            if (l.includes("begin")) return 1;
            if (l.includes("inter")) return 2;
            if (l.includes("expert") || l.includes("advanced")) return 3;
            return 0;
          };
          list.sort((a, b) =>
            sortOrder === "asc"
              ? rank(a.experienceLevel) - rank(b.experienceLevel)
              : rank(b.experienceLevel) - rank(a.experienceLevel)
          );
        }

        setDisplayed(list);
      })
      .finally(() => setLocalLoading(false));
  }, [subjectSearch, sortOrder, partners, axiosPublic]);

  const handleViewProfile = (partnerId) => {
    if (!user) {
      navigate("/login", {
        state: { from: { pathname: `/partner/${partnerId}` } },
      });
      return;
    }
    navigate(`/partner/${partnerId}`);
  };

  const handleClear = () => {
    setSubjectSearch("");
    setSortOrder("");
    setDisplayed(partners);
  };

  if (authLoading || localLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-black mb-6">
          Find Partners
        </h1>

        {/* Controls row: Sort (left) - Search (right) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <label className="font-semibold text-black">
              Sort by experience:
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-black"
            >
              <option value="">None</option>
              <option value="asc">Experience: Beginner → Expert</option>
              <option value="desc">Experience: Expert → Beginner</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search subject (e.g. Math, Physics)"
              value={subjectSearch}
              onChange={(e) => setSubjectSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-black w-64"
            />
            <button
              onClick={() => {}}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Search
            </button>

            <button
              onClick={handleClear}
              className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 text-black"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Partners grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayed.length > 0 ? (
            displayed.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-lg p-5 relative border border-gray-200"
              >
                {p.rating >= 4 && (
                  <span className="absolute top-3 right-3 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm">
                    Top Rated
                  </span>
                )}

                <img
                  src={
                    p.profileImage ||
                    p.profileimage ||
                    "https://i.ibb.co/358cJ6cF/download-6.webp"
                  }
                  alt={p.name}
                  className="w-full h-44 object-cover rounded-xl mb-4"
                />

                <h3 className="text-2xl font-semibold text-black">{p.name}</h3>
                <p className="text-gray-800 mt-1">📘 {p.subject || "—"}</p>
                <p className="text-gray-800 mt-1">Mode: {p.studyMode || "—"}</p>
                <p className="text-gray-800 mt-1">
                  Experience: {p.experienceLevel || "—"}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => handleViewProfile(p._id)}
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    View Profile →
                  </button>

                  <div className="text-yellow-600 font-semibold">
                    ⭐ {p.rating || 0}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-700">No partners found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindPartners;
