import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, HelpCircle } from "lucide-react";
import axios from "axios";

const iconMap = {
  Mail: <Mail className="w-10 h-10 text-blue-600" />,
  Phone: <Phone className="w-10 h-10 text-green-600" />,
  MapPin: <MapPin className="w-10 h-10 text-red-600" />,
  HelpCircle: <HelpCircle className="w-10 h-10 text-yellow-600" />,
};

export default function ContactCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cards");
        setCards(res.data.cards); // ✅ Accessing `cards` from response
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-blue-100 p-3 sm:p-4 rounded-full mb-4 inline-flex items-center justify-center">
            {iconMap[card.icon] || <HelpCircle className="w-10 h-10 text-gray-400" />}
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {card.title}
          </h3>

          <p className="text-gray-600 text-sm sm:text-base mt-2">
            {card.info}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
