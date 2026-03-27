import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

const galleryImages = [
  { id: 1, title: "Luxury Pool", category: "resort", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600" },
  { id: 2, title: "Executive Suite", category: "room", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600" },
  { id: 3, title: "Wedding Venue", category: "wedding", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600" },
  { id: 4, title: "Fine Dining", category: "resort", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600" },
  { id: 5, title: "Super Deluxe", category: "room", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600" },
  { id: 6, title: "Birthday Setup", category: "birthday", image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600" },
  { id: 7, title: "Anniversary", category: "anniversary", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600" },
  { id: 8, title: "Corporate Event", category: "corporate", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600" },
  { id: 9, title: "Garden View", category: "resort", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600" },
  { id: 10, title: "Deluxe Room", category: "room", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600" },
  { id: 11, title: "Resort Facade", category: "resort", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600" },
  { id: 12, title: "Lounge Area", category: "resort", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600" },
];

const categories = ["All", "resort", "room", "wedding", "birthday", "anniversary", "corporate"];

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
              <Link key={href} to={href} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${href === "/gallery" ? "text-amber-600 bg-amber-50" : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"}`}>
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

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = activeCategory === "All" ? galleryImages : galleryImages.filter(img => img.category === activeCategory);
  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage?.id);

  const next = () => setSelectedImage(filteredImages[(currentIndex + 1) % filteredImages.length]);
  const prev = () => setSelectedImage(filteredImages[(currentIndex - 1 + filteredImages.length) % filteredImages.length]);

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            A Visual <span className="text-amber-600">Journey</span>
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Explore our stunning resort through these carefully curated images.</p>
        </div>
      </section>

      <section className="py-4 bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filteredImages.map((img, index) => (
                <motion.div key={img.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}
                  className={`relative group cursor-pointer overflow-hidden rounded-2xl ${index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                  onClick={() => setSelectedImage(img)}>
                  <img src={img.image} alt={img.title} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Expand className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium">{img.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center" onClick={() => setSelectedImage(null)}><X className="w-6 h-6 text-white" /></button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center" onClick={(e) => { e.stopPropagation(); prev(); }}><ChevronLeft className="w-6 h-6 text-white" /></button>
            <motion.img key={selectedImage.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} src={selectedImage.image} alt={selectedImage.title} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center" onClick={(e) => { e.stopPropagation(); next(); }}><ChevronRight className="w-6 h-6 text-white" /></button>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white text-lg font-medium">{selectedImage.title}</p>
              <p className="text-white/60 text-sm mt-1">{currentIndex + 1} / {filteredImages.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </main>
  );
}
