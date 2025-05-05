// pages/contact.jsx
import ContactHeader from "./ContactHeader";
import ContactCards from "./ContactCards";
import ContactForm from "./ContactForm";
import MapSection from "./MapSection";
import FAQs from "./FAQs";


export default function Contact() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-indigo-200 py-16">
      {/* Header Section */}
      <ContactHeader />

      {/* Contact Cards Section */}
      <ContactCards />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Map Section */}
      <MapSection />

      {/* FAQs  */}
      <FAQs />
    </div>
  );
}
