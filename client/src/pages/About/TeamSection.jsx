// components/About/TeamSection.js
import { User } from "lucide-react";

export default function TeamSection() {
  return (
    <section className="p-6 rounded-lg shadow-md max-w-3xl mx-auto bg-gray-100 mb-12">
      <h2 className="text-3xl font-bold flex items-center gap-2 text-black">
        <User className="w-6 h-6 text-red-600" /> Meet Our Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Sharad Kumar</h3>
          <p className="text-gray-700">Chief Editor</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Sumit Singh</h3>
          <p className="text-gray-700">Senior Reporter</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Brijesh Kumar</h3>
          <p className="text-gray-700">Investigative Journalist</p>
        </div>
      </div>
    </section>
  );
}
