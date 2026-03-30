import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ChevronDown, 
  Sparkles, 
  Heart, 
  Users, 
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Check,
  Menu,
  X,
  Image as ImageIcon,
  Camera,
  Utensils,
  Music,
  Car,
  Shield,
  Flower2
} from "lucide-react";
import heroImage from "../../assets/hero.JPG";
import weddingImg1 from "../../assets/weeding/FTF_4783.JPG";
import weddingImg2 from "../../assets/weeding/FTF_4781.JPG";
import weddingImg3 from "../../assets/weeding/FTF_4779.JPG";
import weddingImg4 from "../../assets/weeding/FTF_4734.JPG";
import weddingImg5 from "../../assets/weeding/FTF_4707.JPG";
import weddingImg6 from "../../assets/weeding/FTF_4633.JPG";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const experiences = [
  {
    id: "weddings",
    title: "Wedding",
    subtitle: "Fairytale Celebrations",
    description: "Create your dream wedding at our luxury resort. From intimate ceremonies to grand receptions, every detail is crafted with elegance and perfection.",
    image: weddingImg1,
    capacity: "Up to 600 Guests",
    icon: Heart,
    features: ["Mandap Setup", "Bridal Suite", "Custom Catering", "Decor Design"],
    color: "from-rose-400 to-pink-500"
  }
];

const venues = [
  {
    name: "Grand Lawn",
    description: "Open-air elegance perfect for grand celebrations",
    capacity: "500-600",
    image: weddingImg2,
    suitable: ["Wedding Reception", "Anniversary Party", "Birthday Celebration"]
  },
  {
    name: "Banquet Hall",
    description: "Indoor sophistication for elegant events",
    capacity: "200-300",
    image: weddingImg3,
    suitable: ["Wedding Ceremony", "Corporate Events", "Birthday Gala"]
  },
  {
    name: "Poolside",
    description: "Beautiful waterside setting for special moments",
    capacity: "100-150",
    image: weddingImg4,
    suitable: ["Cocktail Party", "Anniversary Dinner", "Birthday Celebration"]
  },
  {
    name: "Rooftop Terrace",
    description: "Intimate sky-high venue for exclusive gatherings",
    capacity: "50-80",
    image: weddingImg5,
    suitable: ["Corporate Meetings", "Birthday Dinner", "Anniversary Celebration"]
  }
];

const amenities = [
  { icon: Utensils, label: "Gourmet Catering", desc: "Multi-cuisine fine dining" },
  { icon: Music, label: "Live Entertainment", desc: "DJ, Band & Artists" },
  { icon: Camera, label: "Photography", desc: "Professional coverage" },
  { icon: Flower2, label: "Floral Design", desc: "Custom arrangements" },
  { icon: Car, label: "Valet Parking", desc: "Premium vehicle service" },
  { icon: Shield, label: "Event Security", desc: "Complete safety assurance" }
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/experiences" },
  { label: "Venues", href: "/venues" },
  { label: "Gallery", href: "/gallery" },
  { label: "Amenities", href: "/amenities" },
  { label: "Contact", href: "/contact" },
];

const testimonials = [
  {
    name: "Priya & Arjun Sharma",
    type: "Wedding",
    quote: "Our wedding at Chhapak Resort was absolutely magical. Every detail was perfect, from the mandap to the final farewell. Truly unforgettable!",
    rating: 5,
    image: weddingImg1
  },
  {
    name: "Vikram Malhotra",
    type: "Corporate Event",
    quote: "We've hosted multiple corporate events here. The professionalism, venues, and service quality are truly exceptional.",
    rating: 5,
    image: weddingImg2
  },
  {
    name: "Neha Kapoor",
    type: "Birthday Celebration",
    quote: "My 50th birthday celebration was absolutely perfect. The team understood my vision and delivered beyond expectations.",
    rating: 5,
    image: weddingImg3
  }
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/experiences" },
    { label: "Venues", href: "/venues" },
    { label: "Gallery", href: "/gallery" },
    { label: "Services", href: "/amenities" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-ivory/95 backdrop-blur-xl shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-gold/20 transition-shadow"
              >
                <span className="text-white font-bold text-xl">C</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className={`font-bold text-xl tracking-tight transition-colors ${isScrolled ? "text-charcoal" : "text-white"}`}>
                  Chhapak
                </h1>
                <p className={`text-xs tracking-[0.3em] uppercase ${isScrolled ? "text-gold" : "text-gold-light"}`}>
                  Resort
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isScrolled
                      ? "text-charcoal hover:text-[rgb(145,118,90)] hover:bg-[rgb(145,118,90)]/5"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/inquiry"
                className={`hidden sm:flex px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isScrolled
                    ? "bg-[rgb(145,118,90)] hover:bg-[rgb(125,100,75)] text-white"
                    : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-charcoal"
                }`}
              >
                Book Your Event
              </Link>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`lg:hidden p-2 rounded-xl transition-colors ${
                  isScrolled ? "text-charcoal hover:bg-sand" : "text-white hover:bg-white/10"
                }`}
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-ivory shadow-2xl"
            >
              <div className="flex flex-col h-full pt-24 px-6 pb-8">
                <div className="flex-1 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="block px-4 py-4 text-lg font-medium text-charcoal hover:text-gold hover:bg-gold/5 rounded-2xl transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <Link to="/inquiry" onClick={() => setIsMobileOpen(false)} className="mt-6">
                  <button className="w-full py-4 bg-[rgb(145,118,90)] hover:bg-[rgb(125,100,75)] text-white font-semibold rounded-full">
                    Book Your Event
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroImage}
          alt="Chhapak Resort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8"
        >
          <Sparkles className="w-5 h-5 text-gold-light" />
          <span className="text-white/90 text-sm font-medium tracking-wide">Luxury Celebration Destination</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight"
        >
         Elevating Celebrations Into
          <span className="block mt-2 bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent">
            Unforgettable Experiences
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-12"
        >
          Perfect venue for weddings, birthdays, anniversaries, and corporate events. Experience luxury redefined.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/inquiry">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[rgb(145,118,90)] hover:bg-[rgb(125,100,75)] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl flex items-center gap-2"
            >
              Book Your Event <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <Link to="/experiences">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-charcoal"
            >
              Explore Packages
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 max-w-xl mx-auto"
        >
          {[
            { value: "500+", label: "Events Hosted" },
            { value: "4", label: "Premium Venues" },
            { value: "4.9", label: "Guest Rating" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-8 h-12 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
        >
          <ChevronDown className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ExperiencesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-padding bg-cream">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="eyebrow-text">Our Events</span>
          <h2 className="heading-main mb-6">
            Perfect <span className="text-gradient-gold">Celebrations</span> Await
          </h2>
          <p className="heading-sub">
            Weddings, birthdays, anniversaries, and corporate events. Create unforgettable moments at our luxury resort.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/experiences/${exp.id}`}>
                <div className="card-luxury hover-lift">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${exp.color} opacity-20`} />
                    <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                      <span className="text-sm font-medium text-charcoal flex items-center gap-2">
                        <exp.icon className="w-4 h-4" /> {exp.capacity}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="text-sm font-medium text-gold tracking-wider uppercase">{exp.subtitle}</span>
                    <h3 className="text-2xl font-bold text-charcoal mt-2 mb-4 group-hover:text-gold transition-colors">
                      {exp.title} Experience
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed mb-6">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {exp.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 bg-sand rounded-full text-xs font-medium text-charcoal/70">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-gold font-semibold group-hover:gap-3 transition-all">
                      <span>Book Now</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VenuesSection() {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="eyebrow-text">Our Venues</span>
          <h2 className="heading-main mb-6">
            Beautiful <span className="text-gradient-gold">Spaces</span> for Your Events
          </h2>
          <p className="heading-sub">
            Choose from our stunning venues designed for weddings, birthdays, anniversaries, and corporate celebrations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="card-luxury hover-lift cursor-pointer">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{venue.name}</h3>
                    <p className="text-white/70 text-sm">{venue.description}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-gold" />
                    <span className="text-sm font-medium text-charcoal">{venue.capacity} Guests</span>
                  </div>
                  <div className="space-y-1">
                    {venue.suitable.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-charcoal/60">
                        <Check className="w-3 h-3 text-gold" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const images = [
    weddingImg1,
    weddingImg2,
    weddingImg3,
    weddingImg4,
    weddingImg5,
    weddingImg6,
  ];

  return (
    <section className="section-padding bg-charcoal">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="eyebrow-text text-gold-light">Gallery</span>
            <h2 className="heading-main text-white">
              Moments We <span className="text-gold-light">Create</span>
            </h2>
          </div>
          <Link to="/gallery" className="flex items-center gap-2 text-gold-light font-semibold hover:gap-3 transition-all">
            View Full Gallery <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="masonry-grid">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="masonry-item group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AmenitiesSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="eyebrow-text">Our Services</span>
          <h2 className="heading-main mb-6">
            Everything You <span className="text-gradient-gold">Need</span>
          </h2>
          <p className="heading-sub">
            From catering to decor, we provide complete event services for your special celebrations.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {amenities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group text-center"
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg shadow-charcoal/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-sand/50">
                <item.icon className="w-10 h-10 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-charcoal font-semibold mb-1">{item.label}</h3>
                <p className="text-charcoal/50 text-xs">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding bg-ivory">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="eyebrow-text">Testimonials</span>
          <h2 className="heading-main mb-6">
            Happy <span className="text-gradient-gold">Clients</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-sand to-champagne rounded-3xl p-10 lg:p-14 text-center"
              >
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-xl lg:text-2xl text-charcoal leading-relaxed mb-8 italic">
                  "{testimonials[current].quote}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-bold text-charcoal">{testimonials[current].name}</p>
                    <p className="text-gold text-sm">{testimonials[current].type}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border-2 border-sand hover:border-gold hover:text-gold flex items-center justify-center transition-all"
              >
                ←
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border-2 border-sand hover:border-gold hover:text-gold flex items-center justify-center transition-all"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="CTA Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/80 to-charcoal/90" />
      </div>
      <div className="relative z-10 container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <Sparkles className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Plan Your <span className="text-gold-light">Perfect</span> Event?
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Contact us today for weddings, birthdays, anniversaries, and corporate events. Let's create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/inquiry">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[rgb(145,118,90)] hover:bg-[rgb(125,100,75)] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl flex items-center gap-2"
              >
                Plan Your Celebration <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white hover:text-charcoal"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-luxury">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <Link to="/" className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div>
                  <h2 className="font-bold text-xl">Chhapak</h2>
                  <p className="text-xs tracking-[0.3em] uppercase text-gold">Resort</p>
                </div>
              </Link>
              <p className="text-white/70 leading-relaxed mb-6">
                A premier resort destination for weddings, birthdays, anniversaries, and corporate events. Create unforgettable moments with us.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["Home", "Experiences", "Venues", "Gallery", "Amenities", "Contact"].map((link) => (
                  <li key={link}>
                    <Link
                      to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                      className="text-white/70 hover:text-[rgb(145,118,90)] transition-colors inline-flex items-center gap-2 group"
                    >
                      {link}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">Events</h3>
              <ul className="space-y-3">
                {["Weddings", "Birthdays", "Anniversaries", "Corporate Events", "Private Parties"].map((link) => (
                  <li key={link}>
                    <Link
                      to={`/experiences/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-white/70 hover:text-[rgb(145,118,90)] transition-colors inline-flex items-center gap-2 group"
                    >
                      {link}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-white/70">
                  <MapPin className="w-5 h-5 text-[rgb(145,118,90)] flex-shrink-0 mt-0.5" />
                  <span>Chhapak Lake, Near National Highway, India</span>
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Phone className="w-5 h-5 text-[rgb(145,118,90)] flex-shrink-0" />
                    <a href="tel:+919876543210" className="hover:text-[rgb(145,118,90)] transition-colors">+91 98765 43210</a>
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Mail className="w-5 h-5 text-[rgb(145,118,90)] flex-shrink-0" />
                    <a href="mailto:hello@chhapakresort.com" className="hover:text-[rgb(145,118,90)] transition-colors">hello@chhapakresort.com</a>
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Clock className="w-5 h-5 text-[rgb(145,118,90)] flex-shrink-0" />
                  <span>Open 24/7 for events</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Chhapak Resort. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {["facebook", "instagram", "twitter"].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[rgb(145,118,90)] flex items-center justify-center transition-colors capitalize"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-transform animate-pulse"
      >
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ExperiencesSection />
      <VenuesSection />
      <GalleryPreview />
      <AmenitiesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
