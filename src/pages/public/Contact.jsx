import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useState(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/98 backdrop-blur-xl shadow-lg py-3" : "bg-white py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl text-gray-900">Chhapak</h1>
              <p className="text-xs text-amber-600 tracking-widest uppercase">Resort</p>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {[["Home", "/"], ["Rooms", "/rooms"], ["Events", "/events"], ["Gallery", "/gallery"], ["Contact", "/contact"]].map(([label, href]) => (
              <Link key={href} to={href} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${href === "/contact" ? "text-amber-600 bg-amber-50" : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"}`}>
                {label}
              </Link>
            ))}
          </div>
          <Link to="/rooms" className="hidden sm:flex px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition-all">
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Chhapak Resort. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: MapPin, title: "Visit Us", details: ["Chhapak Lake", "Near National Highway", "India"] },
    { icon: Phone, title: "Call Us", details: ["+91 98765 43210", "+91 98765 43211"] },
    { icon: Mail, title: "Email Us", details: ["hello@chhapakresort.com", "reservations@chhapakresort.com"] },
    { icon: Clock, title: "Working Hours", details: ["Reception: 24/7", "Check-in: 2:00 PM", "Check-out: 11:00 AM"] },
  ];

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            We'd Love to <span className="text-amber-600">Hear From You</span>
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Have a question or want to plan your perfect getaway? Our team is here to help.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
              <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full">Send Another Message</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                        <input type="text" required className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-all" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input type="email" required className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-all" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-all" placeholder="+91 98765 43210" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <input type="text" required className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-all" placeholder="How can we help?" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                      <textarea rows={6} required className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-all resize-none" placeholder="Tell us more about your inquiry..." />
                    </div>
                    <button type="submit" className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all flex items-center gap-2">
                      <Send className="w-5 h-5" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                      {info.details.map((detail, j) => <p key={j} className="text-gray-600 text-sm">{detail}</p>)}
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
                <MessageCircle className="w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg mb-2">Chat With Us</h3>
                <p className="text-white/80 text-sm mb-4">Get instant responses on WhatsApp. We're available 24/7.</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-amber-600 px-5 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  <FaWhatsapp className="w-5 h-5" /> WhatsApp Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
