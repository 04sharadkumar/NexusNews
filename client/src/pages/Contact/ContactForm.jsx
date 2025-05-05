import { useState } from "react";
import { useFormik } from "formik";
import { Send } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const [step, setStep] = useState(1);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          toast.error("Something went wrong!", {
            position: "top-right",
            theme: "colored",
          });
          throw new Error("Failed to submit form");
        }

        resetForm();
        setStep(1);

        toast.success("Message sent successfully!", {
          position: "bottom-left",
          theme: "dark",
        });

      } catch (error) {
        console.error("Form submission error:", error);
        // Already handled above
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto mt-16 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900 font-poppins">
        {step === 1 ? "Enter Your Details" : "Your Message"}
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {step === 1 && (
          <>
            <div>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Your Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Your Email"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                placeholder="Your Mobile Number"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:w-auto bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Next Step
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <textarea
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                rows="5"
                placeholder="Your Message"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center gap-2"
              >
                <Send className="w-6 h-6" /> Send Message
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto bg-gray-300 text-black p-4 rounded-lg text-lg font-semibold hover:bg-gray-400 transition duration-300"
              >
                Back
              </button>
            </div>
          </>
        )}
      </form>

      {/* ToastContainer outside the form, once only */}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
