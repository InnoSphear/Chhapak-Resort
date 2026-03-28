import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Link } from "react-router-dom";

const galleryItems = [
  { id: 1, type: "image", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200", category: "weddings", title: "Grand Wedding Reception" },
  { id: 2, type: "image", src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200", category: "venues", title: "Lawn Setup" },
  { id: 3, type: "image", src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200", category: "celebrations", title: "Birthday Celebration" },
  { id: 4, type: "image", src: "https://images.unsplash.com/photo-1529543544277-065dc7f37fdf?w=1200", category: "anniversaries", title: "Anniversary Dinner" },
  { id: 5, type: "image", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200", category: "corporate", title: "Corporate Gala" },
  { id: 6, type: "image", src: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200", category: "venues", title: "Poolside Evening" },
  { id: 7, type: "image", src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200", category: "celebrations", title: "Anniversary Party" },
  { id: 8, type: "image", src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200", category: "weddings", title: "Wedding Ceremony" },
  { id: 9, type: "image", src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200", category: "weddings", title: "Bridal Preparations" },
  { id: 10, type: "image", src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200", category: "weddings", title: "Wedding Decor" },
  { id: 11, type: "image", src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200", category: "weddings", title: "Reception Setup" },
  { id: 12, type: "image", src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200", category: "celebrations", title: "Party Setup" },
  { id: 13, type: "image", src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200", category: "venues", title: "Rooftop View" },
  { id: 14, type: "image", src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200", category: "corporate", title: "Conference Room" },
  { id: 15, type: "image", src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=1200", category: "celebrations", title: "Birthday Decor" },
  { id: 16, type: "image", src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200", category: "weddings", title: "Wedding Venue" },
  { id: 17, type: "image", src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200", category: "corporate", title: "Event Setup" },
  { id: 18, type: "image", src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200", category: "corporate", title: "Presentation" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "weddings", label: "Weddings" },
  { id: "celebrations", label: "Celebrations" },
  { id: "corporate", label: "Corporate" },
  { id: "venues", label: "Venues" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = activeCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const currentIndex = filteredItems.findIndex(item => item.id === selectedImage?.id);

  const nextImage = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1]);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1]);
    }
  };

  return (
    <main>
      <Navbar />
      
      <section className="pt-32 pb-8 bg-cream">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="eyebrow-text">Gallery</span>
            <h1 className="heading-main mb-6">
              Our <span className="text-gradient-gold">Moments</span>
            </h1>
            <p className="heading-sub">
              A glimpse into the beautiful moments we create for weddings, birthdays, anniversaries, and corporate events.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-[rgb(145,118,90)] text-white"
                    : "bg-white text-charcoal hover:bg-sand"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="pb-24 bg-cream">
        <div className="container-luxury">
          <motion.div 
            layout
            className="masonry-grid"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="masonry-item group cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-medium text-gold uppercase tracking-wider mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-charcoal to-charcoal-light">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Want to See More?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Visit us to experience our beautiful venues in person and plan your perfect wedding, birthday, or event.
            </p>
            <Link to="/inquiry">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[rgb(145,118,90)] hover:bg-[rgb(125,100,75)] text-white font-semibold rounded-full flex items-center gap-2 mx-auto"
              >
                Book Your Event
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              disabled={currentIndex === 0}
              className="absolute left-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.img
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              disabled={currentIndex === filteredItems.length - 1}
              className="absolute right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white/60 text-sm">{currentIndex + 1} / {filteredItems.length}</p>
              <h3 className="text-white font-semibold mt-2">{selectedImage.title}</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
