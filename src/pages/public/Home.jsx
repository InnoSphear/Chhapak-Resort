import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, Star, Users, BedDouble, 
  Utensils, Waves, Dumbbell, Wifi, Coffee, Car,
  MapPin, Phone, Mail, Clock, Sparkles, ChevronDown
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const amenities = [
  { icon: Utensils, label: "Fine Dining", desc: "Multi-cuisine" },
  { icon: Waves, label: "Pool", desc: "Infinity pool" },
  { icon: Dumbbell, label: "Gym", desc: "24/7 fitness" },
  { icon: Wifi, label: "WiFi", desc: "High-speed" },
  { icon: Coffee, label: "Café", desc: "Premium coffee" },
  { icon: Car, label: "Parking", desc: "Complimentary" },
];

const rooms = [
  { _id: 1, name: "Executive", slug: "executive", category: "Executive", price: 9500, bedType: "King Bed", capacity: 2, excerpt: "Quiet garden-facing rooms with private sit-out.", images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"] },
  { _id: 2, name: "Super Deluxe", slug: "super-deluxe", category: "Super Deluxe", price: 12800, bedType: "King + Lounge", capacity: 3, excerpt: "Generous suites with panoramic glazing.", images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"] },
  { _id: 3, name: "Deluxe", slug: "deluxe", category: "Deluxe", price: 7800, bedType: "Queen Bed", capacity: 2, excerpt: "A refined category for weekend stays.", images: ["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600"] },
  { _id: 4, name: "Dormitory", slug: "dormitory", category: "Dormitory", price: 4200, bedType: "Bunk Layout", capacity: 8, excerpt: "For retreat groups and corporate teams.", images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600"] },
];

const events = [
  { _id: 1, title: "Weddings", slug: "weddings", capacity: "Up to 600 guests", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600" },
  { _id: 2, title: "Birthdays", slug: "birthdays", capacity: "Private to grand", image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600" },
  { _id: 3, title: "Anniversaries", slug: "anniversaries", capacity: "Up to 180 guests", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600" },
  { _id: 4, title: "Corporate Events", slug: "corporate-events", capacity: "Boardroom to summit", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600" },
];

const testimonials = [
  { _id: 1, name: "Ananya Mehra", designation: "Wedding Host", quote: "The team delivered a wedding experience that felt editorial, seamless, and deeply personal.", rating: 5 },
  { _id: 2, name: "Rohan Khanna", designation: "Weekend Guest", quote: "Every space feels considered. Lighting, scent, service, and silence were handled at a premium level.", rating: 5 },
  { _id: 3, name: "Naina Verma", designation: "Corporate Retreat Planner", quote: "The resort feels premium without being loud. It worked equally well for all occasions.", rating: 5 },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/98 backdrop-blur-xl shadow-lg py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div className="hidden sm:block">
                <h1 className={`font-bold text-xl tracking-tight ${isScrolled ? "text-gray-900" : "text-white"}`}>Chhapak</h1>
                <p className={`text-xs tracking-widest uppercase ${isScrolled ? "text-amber-600" : "text-amber-400"}`}>Resort</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {["Home", "Rooms", "Events", "Gallery", "Contact"].map((item) => (
                <Link key={item} to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isScrolled ? "text-gray-700 hover:text-amber-600 hover:bg-amber-50" : "text-white/90 hover:text-white hover:bg-white/10"}`}>
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link to="/rooms" className={`hidden sm:flex px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isScrolled ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-gray-900"}`}>
                Book Now
              </Link>
              <button onClick={() => setIsMobileOpen(!isMobileOpen)} className={`lg:hidden p-2 ${isScrolled ? "text-gray-900" : "text-white"}`}>
                {isMobileOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden">
          <div className="space-y-2">
            {[["Home", "/"], ["Rooms", "/rooms"], ["Events", "/events"], ["Gallery", "/gallery"], ["Contact", "/contact"]].map(([label, href]) => (
              <Link key={href} to={href} onClick={() => setIsMobileOpen(false)} className="block px-4 py-4 text-lg font-medium text-gray-900 hover:text-amber-600 hover:bg-amber-50 rounded-xl">
                {label}
              </Link>
            ))}
          </div>
          <Link to="/rooms" onClick={() => setIsMobileOpen(false)} className="mt-6 block">
            <button className="w-full py-4 bg-amber-500 text-white font-semibold rounded-full">Book Now</button>
          </Link>
        </div>
      )}
    </>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <motion.img style={{ y }} src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop" alt="Chhapak Resort" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-white/90 text-sm font-medium tracking-wide">Lakeside Private Resort</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight">
          A Cinematic Retreat for<br /><span className="text-amber-400">Stays & Celebrations</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-12">
          Chhapak Resort blends still water, sculpted stone, and warm service into an experience designed for intimate escapes and grand occasions.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/rooms">
            <button className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2">
              Reserve Your Suite <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <Link to="/events">
            <button className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 transition-all duration-300 hover:scale-105">
              Plan an Event
            </button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="grid grid-cols-3 gap-8 max-w-xl mx-auto">
          {[{ value: "33+", label: "Premium Rooms" }, { value: "6", label: "Event Venues" }, { value: "4.9", label: "Guest Rating" }].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-8 h-12 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <ChevronDown className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop" alt="Luxury Room" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-50 rounded-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-100/50 rounded-3xl -z-10" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">Our Story</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Where Luxury Meets <span className="text-amber-600">Nature</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Designed with a hospitality-first mindset, every edge of the resort balances privacy, ceremony, and premium comfort. The mood is restrained, tactile, and intentionally luxurious.
            </p>
            <div className="flex flex-wrap gap-8 mb-8">
              {[{ value: "33+", label: "Premium Rooms" }, { value: "6", label: "Event Venues" }, { value: "15+", label: "Years Experience" }].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-amber-600">{item.value}</p>
                  <p className="text-sm text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
            <Link to="/rooms">
              <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl flex items-center gap-2">
                Explore Our Rooms <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function RoomsSection() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">Accommodations</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Luxurious <span className="text-amber-600">Rooms & Suites</span></h2>
          <p className="text-lg text-gray-600">Each room is thoughtfully designed to offer maximum comfort with premium amenities.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms.map((room, i) => (
            <motion.div key={room._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={`/rooms/${room.slug}`} className="group block">
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">{room.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{room.name}</h3>
                      <p className="text-lg font-bold text-amber-600">₹{room.price.toLocaleString()}</p>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{room.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" /> {room.bedType}</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {room.capacity}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
          <Link to="/rooms">
            <button className="px-8 py-4 border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2 mx-auto">
              View All Rooms <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function AmenitiesSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">Amenities</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Premium Facilities</h2>
          <p className="text-lg text-gray-600">World-class amenities designed for your comfort and convenience.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {amenities.map((amenity, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group text-center">
              <div className="bg-gray-50 hover:bg-amber-50 rounded-3xl p-6 transition-all duration-300 border border-gray-100 hover:border-amber-200">
                <amenity.icon className="w-10 h-10 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-gray-900 font-semibold mb-1">{amenity.label}</h3>
                <p className="text-gray-400 text-xs">{amenity.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">Celebrations</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Unforgettable <span className="text-amber-600">Events</span></h2>
          <p className="text-lg text-gray-600">From intimate gatherings to grand celebrations, we create magical moments.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, i) => (
            <motion.div key={event._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={`/events/${event.slug}`} className="group block">
                <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="aspect-[3/4]">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-white/70 text-sm flex items-center gap-2"><Users className="w-4 h-4" /> {event.capacity}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
          <Link to="/events">
            <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl flex items-center gap-2 mx-auto">
              Plan Your Event <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">What Our <span className="text-amber-600">Guests Say</span></h2>
        </motion.div>

        <div className="relative">
          <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 lg:p-14 text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[current].rating)].map((_, i) => <Star key={i} className="w-6 h-6 text-amber-500 fill-amber-500" />)}
            </div>
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 italic">"{testimonials[current].quote}"</p>
            <p className="font-bold text-gray-900 text-lg">{testimonials[current].name}</p>
            <p className="text-gray-500">{testimonials[current].designation}</p>
          </motion.div>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-amber-500 hover:text-amber-500 flex items-center justify-center transition-all">←</button>
            <button onClick={next} className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-amber-500 hover:text-amber-500 flex items-center justify-center transition-all">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2000&auto=format&fit=crop" alt="CTA" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-6" />
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready for an Unforgettable Experience?</h2>
        <p className="text-xl text-white/70 mb-10">Book your stay or plan your event at Chhapak Resort today.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/rooms"><button className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl flex items-center gap-2">Book Your Stay <ArrowRight className="w-5 h-5" /></button></Link>
          <Link to="/contact"><button className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 transition-all duration-300">Contact Us</button></Link>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div>
                  <h2 className="font-bold text-xl">Chhapak</h2>
                  <p className="text-xs text-amber-400 tracking-widest uppercase">Resort</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">A cinematic retreat for stays, celebrations, and signature hospitality.</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors"><FaFacebookF className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors"><FaInstagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors"><FaTwitter className="w-5 h-5" /></a>
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["About Us", "Our Rooms", "Events", "Gallery", "Contact"].map((link) => (
                  <li key={link}><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-lg mb-6">Our Rooms</h3>
              <ul className="space-y-3">
                {["Executive Suite", "Super Deluxe", "Deluxe", "Dormitory"].map((link) => (
                  <li key={link}><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h3 className="font-semibold text-lg mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400 justify-center md:justify-end"><MapPin className="w-5 h-5 text-amber-400" /><span>Chhapak Lake, India</span></li>
                <li className="flex items-center gap-3 text-gray-400 justify-center md:justify-end"><Phone className="w-5 h-5 text-amber-400" /><a href="tel:+919876543210" className="hover:text-amber-400">+91 98765 43210</a></li>
                <li className="flex items-center gap-3 text-gray-400 justify-center md:justify-end"><Mail className="w-5 h-5 text-amber-400" /><a href="mailto:hello@chhapakresort.com" className="hover:text-amber-400">hello@chhapakresort.com</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 py-6 text-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Chhapak Resort. All rights reserved.</p>
        </div>
      </div>
      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <FaWhatsapp className="w-8 h-8 text-white" />
      </a>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <RoomsSection />
      <AmenitiesSection />
      <EventsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
