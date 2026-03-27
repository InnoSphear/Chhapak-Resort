import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Heart, Cake, Sparkles, Briefcase } from "lucide-react";

const events = [
  { _id: 1, title: "Weddings", slug: "weddings", capacity: "Up to 600 guests", description: "Multi-day wedding hosting with haldi lawns, sangeet staging, baraat transitions, and luxury room blocks.", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600" },
  { _id: 2, title: "Birthdays", slug: "birthdays", capacity: "Private to grand", description: "Premium birthday experiences with decor curation, entertainment setup, and gourmet menus.", image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600" },
  { _id: 3, title: "Anniversaries", slug: "anniversaries", capacity: "Up to 180 guests", description: "Intimate celebratory layouts with candlelit tables, live music, and private dining zones.", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600" },
  { _id: 4, title: "Corporate Events", slug: "corporate-events", capacity: "Boardroom to summit", description: "Retreat-ready infrastructure for leadership meets, launches, and offsites with hospitality layering.", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600" },
];

const eventIcons = { weddings: Heart, birthdays: Cake, anniversaries: Sparkles, "corporate-events": Briefcase };

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
              <Link key={href} to={href} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${href === "/events" ? "text-amber-600 bg-amber-50" : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"}`}>
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

export default function Events() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", eventType: "", eventDate: "", guests: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We will contact you within 24 hours.");
    setShowForm(false);
  };

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Create Unforgettable <span className="text-amber-600">Moments</span>
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">From intimate gatherings to grand celebrations, our versatile venues and dedicated team ensure every event is nothing short of extraordinary.</p>
          <button onClick={() => setShowForm(true)} className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all hover:shadow-xl">
            Plan Your Event
          </button>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event, i) => {
              const Icon = eventIcons[event.slug] || Heart;
              return (
                <motion.div key={event._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="bg-gray-50 rounded-3xl overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-amber-600" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 flex-1">{event.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Users className="w-4 h-4 text-amber-500" /> {event.capacity}
                      </div>
                      <button onClick={() => { setFormData({ ...formData, eventType: event.title }); setShowForm(true); }}
                        className="w-full py-3 border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-semibold rounded-full transition-all">
                        Get Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">How We Make It Happen</h2>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {[{ step: "01", title: "Consultation", desc: "Share your vision with our event specialists." }, { step: "02", title: "Planning", desc: "We create a detailed plan for your event." }, { step: "03", title: "Execution", desc: "Our team handles every detail." }, { step: "04", title: "Celebration", desc: "You relax while we make your dreams real." }].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-amber-500">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input type="text" required className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" required className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" required className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                  <input type="date" className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Guests</label>
                  <input type="number" className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your event</label>
                <textarea rows={4} className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none resize-none" placeholder="Share your vision..." />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full">Submit</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      <Footer />
    </main>
  );
}
