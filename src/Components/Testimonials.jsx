import React from "react";

const testimonials = [
  {
    name: "Sara Ray",
    review:
      "StudyMate helped me find amazing partners. Learning together has never been this fun!",
    image: "https://i.ibb.co/m5vpQ9nj/OIP-6.webp",
  },
  {
    name: "Tim O'Farrell",
    review:
      "The platform is intuitive and I improved my grades with collaborative study sessions.",
    image: "https://i.ibb.co/spjsR27z/OIP-7.webp",
  },
  {
    name: "Jane Doe",
    review:
      "Finding partners with the same schedule and subjects is so easy now. Highly recommend!",
    image: "https://i.ibb.co/7tBQMJgQ/download-7.webp",
  },
  {
    name: "Keith M",
    review:
      "I love how easy it is to search for partners in my city. StudyMate rocks!",
    image: "https://i.ibb.co/8LXfmk8r/OIP-8.webp",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100 ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          What Our Users Say
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-6 max-w-sm hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full border-2 border-blue-500 mb-4"
                />
                <p className="text-gray-700 italic mb-4">"{t.review}"</p>
                <h3 className="font-semibold text-lg text-gray-900">
                  {t.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
