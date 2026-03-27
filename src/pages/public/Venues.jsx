import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, Check, Maximize2 } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

const venues = [
  {
    name: "Grand Lawn",
    tagline: "Under the Stars",
    description: "Our crown jewel offers a breathtaking open-air setting perfect for grand wedding receptions and spectacular outdoor celebrations. With capacity for 500-600 guests, the lawn transforms into a magical venue under our signature starlit canopy.",
    capacity: "500-600",
    size: "15,000 sq ft",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600"
    ],
    suitable: ["Wedding Reception", "Sangeet Night", "Mehndi Ceremony", "Cocktail Party", "Product Launch"],
    features: ["Starlit Canopy", "Central Stage", "Garden Landscaping", "Ambient Lighting", "Climate Control Options"]
  },
  {
    name: "Banquet Hall",
    tagline: "Indoor Elegance",
    description: "A sophisticated climate-controlled indoor venue that combines classic elegance with modern amenities. Ideal for wedding ceremonies, corporate galas, and formal celebrations requiring refined interiors.",
    capacity: "200-300",
    size: "8,000 sq ft",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600"
    ],
    suitable: ["Wedding Ceremony", "Corporate Events", "Birthday Gala", "Award Ceremony", "Annual Dinner"],
    features: ["Central AC", "Crystal Chandeliers", "Built-in Stage", "Sound System", "Modular Layout"]
  },
  {
    name: "Poolside Terrace",
    tagline: "Refined Waterside",
    description: "An enchanting poolside setting that blends natural beauty with sophisticated ambiance. Perfect for cocktail receptions, anniversary dinners, and intimate celebrations with a resort feel.",
    capacity: "100-150",
    size: "5,000 sq ft",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600",
      "https://images.unsplash.com/photo-1529543544277-065dc7f37fdf?w=600",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600"
    ],
    suitable: ["Cocktail Reception", "Anniversary Dinner", "Private Party", "Birthday Celebration", "Team Gathering"],
    features: ["Infinity Pool View", "Tropical Landscaping", "Ambient Music", "Fire Pit Seating", "Starlit Evenings"]
  },
  {
    name: "Rooftop Terrace",
    tagline: "Sky-High Panoramas",
    description: "Our rooftop venue offers breathtaking 360-degree views and an intimate atmosphere for exclusive gatherings. Perfect for corporate meetings, couple's celebrations, and sophisticated cocktail events.",
    capacity: "50-80",
    size: "3,000 sq ft",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600",
      "https://images.unsplash.com/photo-1529543544277-065dc7f37fdf?w=600",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600"
    ],
    suitable: ["Corporate Meetings", "Birthday Celebration", "Couple's Dinner", "Small Wedding", "Networking Event"],
    features: ["Panoramic Views", "Sky Lounge Setup", "Private Bar", "Climate Control", "Exclusive Access"]
  }
];

export default function Venues() {
  return (
    <main>
      <Navbar />
      
      <section className="pt-32 pb-16 bg-cream">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="eyebrow-text">Our Spaces</span>
            <h1 className="heading-main mb-6">
              Stunning <span className="text-gradient-gold">Venues</span> for Every Occasion
            </h1>
            <p className="heading-sub">
              Four distinct spaces, each designed to transform your vision into an unforgettable experience. From intimate gatherings to grand celebrations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 bg-cream">
        <div className="container-luxury space-y-16">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="relative rounded-3xl overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-charcoal flex items-center gap-2">
                      <Users className="w-4 h-4 text-gold" />
                      {venue.capacity} Guests
                    </span>
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-charcoal flex items-center gap-2">
                      <Maximize2 className="w-4 h-4 text-gold" />
                      {venue.size}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  {venue.images.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden">
                      <img src={img} alt="" className="w-full aspect-square object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="text-sm font-medium text-gold tracking-wider uppercase">{venue.tagline}</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mt-2 mb-4">{venue.name}</h2>
                <p className="text-charcoal/70 leading-relaxed mb-6">{venue.description}</p>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-charcoal mb-3">Perfect For</h3>
                  <div className="flex flex-wrap gap-2">
                    {venue.suitable.map((item, i) => (
                      <span key={i} className="px-3 py-1.5 bg-sand rounded-full text-sm text-charcoal/70">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-charcoal mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {venue.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-charcoal/70">
                        <Check className="w-4 h-4 text-gold" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/inquiry">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gold text-white font-semibold rounded-full flex items-center gap-2 hover:bg-gold-dark transition-colors"
                  >
                    Check Availability
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-sm font-semibold tracking-[0.3em] uppercase">Need Help Deciding?</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4 mb-6">
              Let Us Help You Choose
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Our event specialists can guide you in selecting the perfect venue based on your requirements and vision.
            </p>
            <Link to="/inquiry">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-gold to-gold-dark text-white font-semibold rounded-full"
              >
                Get Expert Advice
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
