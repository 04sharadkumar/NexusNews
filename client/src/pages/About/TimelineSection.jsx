// components/About/TimelineSection.js
import { Calendar } from "lucide-react";

export default function TimelineSection() {
  return (
    <section className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl mx-auto mb-12">
      <h2 className="text-3xl font-bold text-black flex items-center gap-2">
        <Calendar className="w-6 h-6 text-red-600" /> Our Journey
      </h2>
      <ul className="mt-4 text-gray-700 text-lg leading-relaxed">
        <li><span className="text-red-600 font-semibold">2020:</span> NewsScope was founded with a mission to deliver truthful journalism.</li>
        <li><span className="text-red-600 font-semibold">2021:</span> Expanded global reporting team and launched mobile app.</li>
        <li><span className="text-red-600 font-semibold">2023:</span> Reached 10 million monthly readers worldwide.</li>
      </ul>
    </section>
  );
}
