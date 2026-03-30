import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import weddingImg1 from "../../assets/weeding/FTF_4783.JPG";
import weddingImg2 from "../../assets/weeding/FTF_4781.JPG";
import weddingImg3 from "../../assets/weeding/FTF_4779.JPG";
import weddingImg4 from "../../assets/weeding/FTF_4734.JPG";

const experiences = [
  {
    id: "weddings",
    title: "Wedding",
    subtitle: "Fairytale Celebrations",
    description: "Create your dream wedding at our luxury resort. From intimate ceremonies to grand receptions, every detail is crafted with elegance.",
    image: weddingImg1,
    capacity: "Up to 600 Guests",
    icon: Heart,
    color: "from-rose-400 to-pink-500",
    gradient: "bg-gradient-to-br from-rose-50 to-pink-50",
    accent: "text-rose-500"
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
            <span className="eyebrow-text">Our Events</span>
            <h1 className="heading-main mb-6">
              Perfect <span className="text-gradient-gold">Celebrations</span> Await
            </h1>
            <p className="heading-sub">
              Weddings, birthdays, anniversaries, and corporate events. Discover the perfect experience for your special occasion at our resort.
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
                          <span>Learn More</span>
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
            <span className="text-gold text-sm font-semibold tracking-[0.3em] uppercase">Custom Events</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4 mb-6">
              Planning Something Special?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              We also host private parties, reunions, and custom celebrations. Contact us to discuss your vision.
            </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[rgb(145,118,90)] hover:bg-[rgb(125,100,75)] text-white font-semibold rounded-full transition-all"
                >
                  Plan Your Event
                </motion.button>
              </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
