// components/About/EditorialValues.js
import { CheckCircle } from "lucide-react";

export default function EditorialValues() {
  return (
    <section className="p-6 rounded-lg shadow-md max-w-3xl mx-auto mb-12 bg-black text-white">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <CheckCircle className="w-6 h-6 text-red-600" /> Our Editorial Principles
      </h2>
      <ul className="mt-4 text-lg leading-relaxed">
        <li>✅ <span className="text-red-600">Accuracy:</span> We fact-check every story before publication.</li>
        <li>✅ <span className="text-red-600">Impartiality:</span> No bias, just the truth.</li>
        <li>✅ <span className="text-red-600">Transparency:</span> We always cite sources.</li>
      </ul>
    </section>
  );
}
