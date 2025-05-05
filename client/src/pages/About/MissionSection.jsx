// components/MissionSection.js
import { useState } from "react";
import { Globe, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

export default function MissionSection() {
  const [isMissionOpen, setIsMissionOpen] = useState(false);

  return (
    <section className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl mx-auto mb-12">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsMissionOpen(!isMissionOpen)}>
        <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
          <Globe className="w-6 h-6 text-red-600" /> Our Mission
        </h2>
        {isMissionOpen ? <ChevronUp className="w-6 h-6 text-gray-600" /> : <ChevronDown className="w-6 h-6 text-gray-600" />}
      </div>
      {isMissionOpen && (
        <motion.p 
          className="text-gray-700 text-lg mt-3 leading-relaxed"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          At <strong>NewsScope</strong>, we provide high-quality, fact-checked journalism to inform and educate readers globally.
        </motion.p>
      )}
    </section>
  );
}
