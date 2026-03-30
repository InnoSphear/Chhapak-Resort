import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Link } from "react-router-dom";
import weddingImg1 from "../../assets/weeding/FTF_4783.JPG";
import weddingImg2 from "../../assets/weeding/FTF_4781.JPG";
import weddingImg3 from "../../assets/weeding/FTF_4779.JPG";
import weddingImg4 from "../../assets/weeding/FTF_4734.JPG";
import weddingImg5 from "../../assets/weeding/FTF_4707.JPG";
import weddingImg6 from "../../assets/weeding/FTF_4633.JPG";
import weddingImg7 from "../../assets/weeding/FTF_4211.JPG";
import weddingImg8 from "../../assets/weeding/FTF_4134.JPG";
import weddingImg9 from "../../assets/weeding/FTF_4085.JPG";
import weddingImg10 from "../../assets/weeding/DSC_9494.JPG";
import weddingImg11 from "../../assets/weeding/DSC_9414.JPG";
import weddingImg12 from "../../assets/weeding/DSC_9409.JPG";
import weddingImg13 from "../../assets/weeding/DSC_9405.JPG";
import weddingImg14 from "../../assets/weeding/DSC_9383.JPG";
import weddingImg15 from "../../assets/weeding/DSC_9378.JPG";
import weddingImg16 from "../../assets/weeding/DSC_9373.JPG";
import weddingImg17 from "../../assets/weeding/DSC_9369.JPG";
import weddingImg18 from "../../assets/weeding/DSC_9051.JPG";
import weddingImg19 from "../../assets/weeding/DSC_9046.JPG";
import weddingImg20 from "../../assets/weeding/DSC_9040.JPG";
import weddingImg21 from "../../assets/weeding/DSC_9028.JPG";
import weddingImg22 from "../../assets/weeding/DSC_9027.JPG";

const weddingImages = [
  weddingImg1, weddingImg2, weddingImg3, weddingImg4, weddingImg5,
  weddingImg6, weddingImg7, weddingImg8, weddingImg9, weddingImg10,
  weddingImg11, weddingImg12, weddingImg13, weddingImg14, weddingImg15,
  weddingImg16, weddingImg17, weddingImg18, weddingImg19, weddingImg20,
  weddingImg21, weddingImg22
];

const galleryItems = [
  { id: 1, type: "image", src: weddingImg1, category: "weddings", title: "Grand Wedding Reception" },
  { id: 2, type: "image", src: weddingImg2, category: "weddings", title: "Wedding Ceremony" },
  { id: 3, type: "image", src: weddingImg3, category: "weddings", title: "Wedding Decor" },
  { id: 4, type: "image", src: weddingImg4, category: "weddings", title: "Reception Setup" },
  { id: 5, type: "image", src: weddingImg5, category: "weddings", title: "Wedding Venue" },
  { id: 6, type: "image", src: weddingImg6, category: "weddings", title: "Wedding Moments" },
  { id: 7, type: "image", src: weddingImg7, category: "weddings", title: "Celebration" },
  { id: 8, type: "image", src: weddingImg8, category: "weddings", title: "Wedding Ceremony" },
  { id: 9, type: "image", src: weddingImg9, category: "weddings", title: "Bridal Preparations" },
  { id: 10, type: "image", src: weddingImg10, category: "weddings", title: "Wedding Decor" },
  { id: 11, type: "image", src: weddingImg11, category: "weddings", title: "Reception Setup" },
  { id: 12, type: "image", src: weddingImg12, category: "weddings", title: "Wedding Moments" },
  { id: 13, type: "image", src: weddingImg13, category: "weddings", title: "Celebration" },
  { id: 14, type: "image", src: weddingImg14, category: "weddings", title: "Wedding Ceremony" },
  { id: 15, type: "image", src: weddingImg15, category: "weddings", title: "Wedding Decor" },
  { id: 16, type: "image", src: weddingImg16, category: "weddings", title: "Wedding Venue" },
  { id: 17, type: "image", src: weddingImg17, category: "weddings", title: "Wedding Moments" },
  { id: 18, type: "image", src: weddingImg18, category: "weddings", title: "Celebration" },
  { id: 19, type: "image", src: weddingImg19, category: "weddings", title: "Wedding Ceremony" },
  { id: 20, type: "image", src: weddingImg20, category: "weddings", title: "Wedding Decor" },
  { id: 21, type: "image", src: weddingImg21, category: "weddings", title: "Reception Setup" },
  { id: 22, type: "image", src: weddingImg22, category: "weddings", title: "Wedding Moments" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "weddings", label: "Weddings" },
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
