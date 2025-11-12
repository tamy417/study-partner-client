import React, { useEffect, useState } from "react";

const stats = [
  {
    label: "Partners Connected",
    value: 1200,
    color: "from-beige-500 to-amber-200",
  },
  { label: "Subjects Covered", value: 35, color: "from-cyan-400 to-teal-200" },
  { label: "Active Users", value: 500, color: "from-blue-400 to-indigo-200" },
];

const FunStats = () => {
  const [count, setCount] = useState([0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) =>
        prev.map((c, i) =>
          c < stats[i].value ? c + Math.ceil(stats[i].value / 100) : c
        )
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className={`bg-linear-to-r ${s.color} rounded-2xl p-8 text-white shadow-2xl hover:scale-105 transform transition-all duration-500`}
          >
            <h2 className="text-4xl font-bold mb-2">{count[idx]}</h2>
            <p className="text-lg">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FunStats;
