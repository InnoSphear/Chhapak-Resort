import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BedDouble, Users, ArrowRight, Grid, List, SlidersHorizontal } from "lucide-react";
import { ChevronDown } from "lucide-react";

const rooms = [
  { _id: 1, name: "Executive", slug: "executive", category: "Executive", price: 9500, bedType: "King Bed", capacity: 2, excerpt: "Quiet garden-facing rooms with private sit-out and marble bath.", size: "420 sq ft", images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"], amenities: ["Butler Call", "Rain Shower", "Smart TV", "Breakfast Included"] },
  { _id: 2, name: "Super Deluxe", slug: "super-deluxe", category: "Super Deluxe", price: 12800, bedType: "King + Lounge", capacity: 3, excerpt: "Generous suites with panoramic glazing and lounge seating.", size: "560 sq ft", images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"], amenities: ["Lake View", "Mini Bar", "Bath Tub", "Private Dining"] },
  { _id: 3, name: "Deluxe", slug: "deluxe", category: "Deluxe", price: 7800, bedType: "Queen Bed", capacity: 2, excerpt: "A refined category for weekend stays and celebratory bookings.", size: "380 sq ft", images: ["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600"], amenities: ["Work Desk", "Streaming TV", "Tea Service", "High-Speed WiFi"] },
  { _id: 4, name: "Dormitory", slug: "dormitory", category: "Dormitory", price: 4200, bedType: "Bunk + Twin", capacity: 8, excerpt: "For retreat groups, wedding entourages, and corporate teams.", size: "720 sq ft", images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600"], amenities: ["Group Storage", "AC", "Attached Bath", "Breakfast Add-on"] },
];

const categories = ["All", "Executive", "Super Deluxe", "Deluxe", "Dormitory"];

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
              <Link key={href} to={href} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${href === "/rooms" ? "text-amber-600 bg-amber-50" : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"}`}>
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

export default function Rooms() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  const filteredRooms = activeCategory === "All" ? rooms : rooms.filter(r => r.category === activeCategory);

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Luxurious <span className="text-amber-600">Rooms & Suites</span>
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover our collection of thoughtfully designed rooms and suites, each offering a unique blend of comfort and elegance.</p>
        </div>
      </section>

      <section className="py-4 bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-2 bg-gray-100 rounded-full p-1">
              <button onClick={() => setViewMode("grid")} className={`p-2 rounded-full ${viewMode === "grid" ? "bg-white shadow" : ""}`}><Grid className="w-4 h-4" /></button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded-full ${viewMode === "list" ? "bg-white shadow" : ""}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6 max-w-4xl mx-auto"}>
            {filteredRooms.map((room, i) => (
              <motion.div key={room._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link to={`/rooms/${room.slug}`} className="group block">
                  <div className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 ${viewMode === "list" ? "flex" : ""}`}>
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-1/3" : "aspect-[4/3]"}`}>
                      <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/95 rounded-full text-xs font-semibold">{room.category}</span>
                      </div>
                    </div>
                    <div className={`p-6 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600">{room.name}</h3>
                          <p className="text-sm text-gray-500">{room.size}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-amber-600">₹{room.price.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">per night</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{room.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><BedDouble className="w-4 h-4 text-amber-500" /> {room.bedType}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4 text-amber-500" /> {room.capacity} Guests</span>
                      </div>
                      <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2">
                        View Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
