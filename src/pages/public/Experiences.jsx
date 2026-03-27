import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, PartyPopper, Briefcase, Wine, Users, ArrowUpRight } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

const experiences = [
  {
    id: "weddings",
    title: "Wedding",
    subtitle: "Fairytale Celebrations",
    description: "Transform your dream wedding into an unforgettable reality. From intimate ceremonies to grand receptions, we craft every detail with elegance and precision.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    capacity: "Up to 600 Guests",
    icon: Heart,
    color: "from-rose-400 to-pink-500",
    gradient: "bg-gradient-to-br from-rose-50 to-pink-50",
    accent: "text-rose-500"
  },
  {
    id: "birthdays",
    title: "Birthday",
    subtitle: "Memorable Milestones",
    description: "Celebrate life's special moments in style. Whether it's a child's whimsical party or an elegant adult celebration, we create memories that last.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop",
    capacity: "10-200 Guests",
    icon: PartyPopper,
    color: "from-violet-400 to-purple-500",
    gradient: "bg-gradient-to-br from-violet-50 to-purple-50",
    accent: "text-violet-500"
  },
  {
    id: "corporate",
    title: "Corporate",
    subtitle: "Professional Excellence",
    description: "Host impactful corporate events that inspire and connect. From strategic meetings to large-scale conferences, our venues elevate your business presence.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    capacity: "20-500 Guests",
    icon: Briefcase,
    color: "from-blue-400 to-indigo-500",
    gradient: "bg-gradient-to-br from-blue-50 to-indigo-50",
    accent: "text-blue-500"
  },
  {
    id: "anniversaries",
    title: "Anniversary",
    subtitle: "Timeless Romance",
    description: "Commemorate your journey of love with a celebration that reflects your unique story. Intimate settings for couples and gatherings for family.",
    image: "https://images.unsplash.com/photo-1529543544277-065dc7f37fdf?q=80&w=1200&auto=format&fit=crop",
    capacity: "20-180 Guests",
    icon: Wine,
    color: "from-amber-400 to-orange-500",
    gradient: "bg-gradient-to-br from-amber-50 to-orange-50",
    accent: "text-amber-500"
  }
];

export default function Experiences() {
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
            <span className="eyebrow-text">Our Experiences</span>
            <h1 className="heading-main mb-6">
              Crafting <span className="text-gradient-gold">Extraordinary</span> Moments
            </h1>
            <p className="heading-sub">
              From intimate gatherings to grand celebrations, every event is an opportunity to create lasting memories. Discover the perfect experience for your special occasion.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 bg-cream">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/experiences/${exp.id}`}>
                  <div className={`${exp.gradient} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
                    <div className="grid md:grid-cols-2">
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <img
                          src={exp.image}
                          alt={exp.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${exp.color} opacity-20`} />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className={`inline-flex items-center gap-2 ${exp.accent} mb-4`}>
                          <exp.icon className="w-5 h-5" />
                          <span className="text-sm font-medium tracking-wider uppercase">{exp.subtitle}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-charcoal mb-4 group-hover:text-gold transition-colors">
                          {exp.title} Experience
                        </h2>
                        <p className="text-charcoal/70 leading-relaxed mb-6">
                          {exp.description}
                        </p>
                        <div className="flex items-center gap-2 text-charcoal/60 text-sm mb-6">
                          <Users className="w-4 h-4" />
                          <span>{exp.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2 font-semibold text-gold group-hover:gap-3 transition-all">
                          <span>Explore</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-sm font-semibold tracking-[0.3em] uppercase">Private Events</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4 mb-6">
              Looking for Something Else?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              We also host private parties, reunions, product launches, and custom celebrations. Let us know your vision.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white hover:text-charcoal transition-all"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
