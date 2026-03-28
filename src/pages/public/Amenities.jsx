import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Utensils, Music, Camera, Flower2, Car, Shield, Wifi, Waves, Sparkles, Palmtree, ConciergeBell, Drum, BarChart2, PartyPopper, Baby, Gift } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

const amenities = [
  {
    category: "Culinary",
    icon: Utensils,
    items: [
      { name: "Multi-Cuisine Catering", desc: "Indian, Continental, Chinese, and regional specialties prepared by expert chefs" },
      { name: "Live Cooking Stations", desc: "Interactive food experiences with live counters and chef presentations" },
      { name: "Custom Menus", desc: "Tailored menu curation based on your preferences and dietary requirements" },
      { name: "Dessert Stations", desc: "Live dessert counters, chocolate fountains, and custom wedding cakes" }
    ]
  },
  {
    category: "Entertainment",
    icon: Music,
    items: [
      { name: "Professional DJ Services", desc: "State-of-the-art sound systems with experienced DJs for all genres" },
      { name: "Live Band Performances", desc: "Classical, Bollywood, Western, and fusion live music options" },
      { name: "Dance Floor Setup", desc: "Professionally designed dance floors with ambient lighting" },
      { name: "Entertainment Programs", desc: "Stand-up comics, magic shows, and interactive entertainment" }
    ]
  },
  {
    category: "Photography",
    icon: Camera,
    items: [
      { name: "Professional Photography", desc: "Experienced photographers capturing every precious moment" },
      { name: "Videography & Cinema", desc: "Cinematic video coverage with drone footage options" },
      { name: "Photo Booths", desc: "Instant photo booths with fun props and custom backgrounds" },
      { name: "Album Design", desc: "Premium wedding albums and coffee table books" }
    ]
  },
  {
    category: "Decor & Florals",
    icon: Flower2,
    items: [
      { name: "Custom Floral Design", desc: "Fresh flower arrangements and stunning floral installations" },
      { name: "Theme Decorations", desc: "Complete theming from elegant to whimsical based on your vision" },
      { name: "Lighting Design", desc: "Ambient, uplighting, and theatrical lighting solutions" },
      { name: "Stage & Mandap Setup", desc: "Traditional and modern mandap designs with expert setup" }
    ]
  },
  {
    category: "Logistics",
    icon: Car,
    items: [
      { name: "Valet Parking", desc: "Premium valet service for all your guests' vehicles" },
      { name: "Airport Transfers", desc: "Luxury transport arrangements for outstation guests" },
      { name: "Guest Transportation", desc: "Shuttle services within the property and local area" },
      { name: "Guest Accommodation", desc: "On-site rooms for wedding families and close guests" }
    ]
  },
  {
    category: "Security & Safety",
    icon: Shield,
    items: [
      { name: "Event Security", desc: "Professional security personnel for all events" },
      { name: "CCTV Surveillance", desc: "Complete coverage with trained monitoring staff" },
      { name: "Fire Safety", desc: "Full compliance with fire safety regulations and protocols" },
      { name: "First Aid", desc: "On-site medical assistance and first aid facilities" }
    ]
  }
];

const eventServices = [
  { icon: PartyPopper, name: "Event Planning", desc: "Dedicated planners for seamless execution" },
  { icon: Baby, name: "Kids Zone", desc: "Supervised activities for young guests" },
  { icon: Gift, name: "Return Gifts", desc: "Curated gift options for guests" },
  { icon: Drum, name: "Sangeet Programs", desc: "Traditional and modern entertainment" },
  { icon: BarChart2, name: "Corporate Services", desc: "AV equipment and business support" },
  { icon: ConciergeBell, name: "Concierge", desc: "24/7 guest assistance" }
];

export default function Amenities() {
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
            <span className="eyebrow-text">Our Services</span>
            <h1 className="heading-main mb-6">
              Everything You <span className="text-gradient-gold">Need</span>
            </h1>
            <p className="heading-sub">
              From catering to decor, we provide complete event services for your special celebrations. Let us make your event perfect.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 bg-cream">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12">
            {amenities.map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center">
                    <category.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h2 className="text-2xl font-bold text-charcoal">{category.category}</h2>
                </div>
                
                <div className="space-y-5">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center mt-1">
                        <Check className="w-3 h-3 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal mb-1">{item.name}</h3>
                        <p className="text-charcoal/60 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="eyebrow-text">Special Services</span>
            <h2 className="heading-main">
              Additional <span className="text-gradient-gold">Event Services</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {eventServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-sand/50">
                  <service.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                  <h3 className="font-semibold text-charcoal mb-2">{service.name}</h3>
                  <p className="text-charcoal/50 text-xs">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-charcoal to-charcoal-light">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-sm font-semibold tracking-[0.3em] uppercase">Custom Packages</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4 mb-6">
              Need Something Special?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              We offer customized packages for your unique requirements. Contact us to discuss your vision.
            </p>
            <Link to="/inquiry">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[rgb(145,118,90)] hover:bg-[rgb(125,100,75)] text-white font-semibold rounded-full flex items-center gap-2 mx-auto"
              >
                Plan Your Event
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
