// components/WhyChooseUs.js
import { motion } from "framer-motion";
import { Users, Globe, Newspaper, Shield } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    { Icon: Newspaper, title: "Unbiased Reporting", desc: "We report facts with no political bias.", color: "text-blue-600" },
    { Icon: Users, title: "Award-Winning Journalists", desc: "Our team includes Pulitzer Prize winners.", color: "text-green-600" },
    { Icon: Globe, title: "Global Coverage", desc: "We report news from all around the world.", color: "text-yellow-600" },
  ];

  return (
    <section className="max-w-4xl mx-auto mb-12">
      <h2 className="text-3xl font-bold flex items-center justify-center gap-2 text-gray-800">
        <Shield className="w-6 h-6 text-red-600" /> Why Trust <span className="text-red-600">NewsScope?</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {features.map(({ Icon, title, desc, color }, index) => (
          <motion.div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Icon className={`w-12 h-12 mx-auto mb-4 ${color}`} />
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600 mt-2 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
