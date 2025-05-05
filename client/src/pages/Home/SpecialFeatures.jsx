import React from 'react';

const features = [
  {
    title: "The AI Revolution",
    excerpt: "How artificial intelligence is transforming industries",
    category: "TECHNOLOGY",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0eNQ8e8pLG0TJZU6W4sM3g_VAodZj-n8xtQ&s"
  },
  {
    title: "Climate Solutions",
    excerpt: "Innovative approaches to combat global warming",
    category: "ENVIRONMENT",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLAMTutDIxiXKzI1bOkCjCj9y4CNjQ8qNRVg&s"
  },
  {
    title: "Space Exploration",
    excerpt: "The next frontier for human civilization",
    category: "SPACE",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTmxDzxifUGrMnaayPavlWpEM4F55b6ft7oQ&s'
  },
  {
    title: "Health Tech",
    excerpt: "Breakthroughs in medical technology",
    category: "HEALTH",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1KpRmnQP-0Cg1-eZmaYEniGBDGdopopG9wA&s"
  }
];

const SpecialFeatures = () => {
  return (
    <section className="mt-4 p-6 bg-gray-100 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">In-Depth Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden shadow-md transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white"
          >
            <div className="relative h-48">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {feature.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors duration-300">
                <a href="#">{feature.title}</a>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialFeatures;
