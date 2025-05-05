import { useState } from "react";

export default function FAQs() {
  const [expanded, setExpanded] = useState(null);

  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I subscribe to your newsletter?",
      answer: "To stay up-to-date with the latest news, simply enter your email in the subscription box on our homepage.",
    },
    {
      question: "How can I access premium content?",
      answer: "Premium content is available to our subscribers. You can subscribe via our subscription page to unlock exclusive articles and content.",
    },
    {
      question: "Where can I find breaking news updates?",
      answer: "Breaking news updates are displayed on our homepage in the 'Breaking News' section, updated in real-time.",
    },
    {
      question: "Can I submit an article or guest post?",
      answer: "Yes, we welcome guest submissions. Please visit our 'Contribute' page for submission guidelines and requirements.",
    },
    {
      question: "How do I report a mistake or issue with an article?",
      answer: "If you spot an error in one of our articles, please contact us through our 'Contact Us' page or email us directly at support@newswebsite.com.",
    },
  ];

  return (
    <div className="mt-16 max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              className="w-full text-left bg-white p-4 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-between"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-xl font-medium text-gray-800">{faq.question}</h3>
              <span className="text-gray-500">{expanded === index ? '-' : '+'}</span>
            </button>
            {expanded === index && (
              <p className="bg-gray-50 p-4 text-gray-600 rounded-lg mt-2 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
