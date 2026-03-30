import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, Check, Calendar, Sparkles, ArrowUp } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import weddingImg1 from "../../assets/weeding/FTF_4783.JPG";
import weddingImg2 from "../../assets/weeding/FTF_4781.JPG";
import weddingImg3 from "../../assets/weeding/FTF_4779.JPG";
import weddingImg4 from "../../assets/weeding/FTF_4734.JPG";
import weddingImg5 from "../../assets/weeding/FTF_4707.JPG";
import weddingImg6 from "../../assets/weeding/FTF_4633.JPG";

const experienceData = {
  weddings: {
    title: "Wedding",
    subtitle: "Fairytale Celebrations",
    description: "Create your dream wedding at our luxury resort. From intimate ceremonies to grand receptions, we craft every detail with elegance and precision.",
    heroImage: weddingImg1,
    capacity: "Up to 600 Guests",
    priceRange: "₹3 Lakhs - ₹25+ Lakhs",
    features: [
      { icon: Calendar, title: "Complete Planning", desc: "Dedicated wedding planner from start to finish" },
      { icon: Heart, title: "Mandap Setup", desc: "Traditional and modern mandap designs" },
      { icon: Users, title: "Bridal Suite", desc: "Luxurious preparation spaces for the couple" },
      { icon: Sparkles, title: "Decor Design", desc: "Custom floral and lighting arrangements" },
      { icon: Calendar, title: "Multi-day Events", desc: "Haldi, Mehndi, Sangeet, Wedding & Reception" },
      { icon: Check, title: "Guest Management", desc: "Complete hospitality for all attendees" }
    ],
    gallery: [weddingImg1, weddingImg2, weddingImg3, weddingImg4, weddingImg5, weddingImg6],
    testimonials: [
      { name: "Priya & Arjun Sharma", quote: "Our wedding was absolutely magical. The team understood our vision and executed it flawlessly." },
      { name: "Meera & Karan Patel", quote: "From the mandap to the final farewell, every moment was perfect. Thank you for our dream wedding." }
    ],
    color: "from-rose-400 to-pink-500",
    icon: Heart
  },
  birthdays: {
    title: "Birthday Party",
    subtitle: "Memorable Celebrations",
    description: "Celebrate your special day with us. From children's wonderland parties to elegant adult celebrations, we create birthday memories that last forever.",
    heroImage: weddingImg1,
    capacity: "10-200 Guests",
    priceRange: "₹50,000 - ₹5+ Lakhs",
    features: [
      { icon: Sparkles, title: "Theme Design", desc: "Custom themes from whimsical to sophisticated" },
      { icon: ArrowUp, title: "Entertainment", desc: "Games, performers, and activities" },
      { icon: Calendar, title: "Party Packages", desc: "All-inclusive celebration packages" },
      { icon: Check, title: "Cake Service", desc: "Custom cakes and dessert stations" },
      { icon: Users, title: "Photo Moments", desc: "Instant photography and keepsakes" },
      { icon: Check, title: "Catering", desc: "Kid-friendly and adult menus available" }
    ],
    gallery: [],
    testimonials: [
      { name: "Neha Kapoor", quote: "My 50th birthday was absolutely magical. The team understood my vision perfectly." },
      { name: "Raj Malhotra", quote: "The kids had an absolute blast! Best birthday party we've ever hosted." }
    ],
    color: "from-violet-400 to-purple-500",
    icon: ArrowUp
  },
  corporate: {
    title: "Corporate Event",
    subtitle: "Business Excellence",
    description: "Host impactful corporate events that inspire. From strategic meetings to large conferences, elevate your business presence with our professional venues.",
    heroImage: weddingImg1,
    capacity: "20-500 Guests",
    priceRange: "₹1 Lakh - ₹15+ Lakhs",
    features: [
      { icon: ArrowUp, title: "Meeting Rooms", desc: "Intimate boardrooms to large conference halls" },
      { icon: Sparkles, title: "AV Equipment", desc: "State-of-the-art presentation technology" },
      { icon: Check, title: "Catering Service", desc: "Business lunches and networking events" },
      { icon: Users, title: "Breakout Spaces", desc: "Private areas for discussions" },
      { icon: Calendar, title: "Team Building", desc: "Activities and retreats" },
      { icon: Check, title: "High-Speed WiFi", desc: "Enterprise-grade connectivity" }
    ],
    gallery: [],
    testimonials: [
      { name: "Vikram Malhotra", quote: "We've hosted multiple corporate events here. The professionalism and venues are truly exceptional." },
      { name: "Sunita Reddy", quote: "Our annual conference was a huge success. The team was incredibly responsive." }
    ],
    color: "from-blue-400 to-indigo-500",
    icon: ArrowUp
  },
  anniversaries: {
    title: "Anniversary",
    subtitle: "Timeless Romance",
    description: "Celebrate your love story with us. From intimate dinners to family gatherings, honor your journey with elegant anniversary celebrations.",
    heroImage: weddingImg1,
    capacity: "20-180 Guests",
    priceRange: "₹75,000 - ₹8+ Lakhs",
    features: [
      { icon: Heart, title: "Romantic Setup", desc: "Customized décor reflecting your journey" },
      { icon: ArrowUp, title: "Special Menu", desc: "Curated multi-course dinners" },
      { icon: Sparkles, title: "Photography", desc: "Professional capture of your celebration" },
      { icon: ArrowUp, title: "Live Music", desc: "Serenades and instrumental performances" },
      { icon: Check, title: "Video Montage", desc: "Your story displayed beautifully" },
      { icon: Users, title: "Family Events", desc: "Inclusive celebrations for loved ones" }
    ],
    gallery: [],
    testimonials: [
      { name: "Deepa & Rajesh Mehta", quote: "They surprised us with a beautiful video of our 25-year journey. We were moved to tears." },
      { name: "Anita & Sanjay Gupta", quote: "Our 10th anniversary celebration was perfect. The attention to detail was remarkable." }
    ],
    color: "from-amber-400 to-orange-500",
    icon: Heart
  }
};

function ExperienceHero({ data, type }) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={data.heroImage}
          alt={data.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6"
        >
          <data.icon className="w-5 h-5 text-gold-light" />
          <span className="text-white/90 text-sm font-medium tracking-wide">Experience</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
        >
          <span className={`bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
            {data.title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-white font-medium flex items-center gap-2">
              <Users className="w-4 h-4" /> {data.capacity}
            </span>
          </div>
          <Link to="/inquiry" state={{ eventType: type }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[rgb(145,118,90)] hover:bg-[rgb(125,100,75)] text-white font-semibold rounded-full transition-all hover:shadow-xl"
            >
              Book Your Event
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection({ features }) {
  return (
    <section className="section-padding bg-cream">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="eyebrow-text">What's Included</span>
          <h2 className="heading-main">
            Everything For Your <span className="text-gradient-gold">Perfect Event</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg shadow-charcoal/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">{feature.title}</h3>
              <p className="text-charcoal/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ gallery, title }) {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="eyebrow-text">Visual Stories</span>
          <h2 className="heading-main">
            <span className="text-gradient-gold">{title}</span> Gallery
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group cursor-pointer ${
                index === 0 || index === 3 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-square">
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
                  <ArrowUp className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials }) {
  return (
    <section className="section-padding bg-sand">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="eyebrow-text">Guest Stories</span>
          <h2 className="heading-main">
            What Our <span className="text-gradient-gold">Clients</span> Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-5 h-5 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-lg text-charcoal/80 italic mb-6">"{testimonial.quote}"</p>
              <p className="font-bold text-charcoal">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ type }) {
  return (
    <section className="py-24 bg-gradient-to-r from-charcoal to-charcoal-light">
      <div className="container-luxury text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Book Your Event?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Contact us today to plan your wedding, birthday, anniversary, or corporate event. Let's create something extraordinary together.
          </p>
          <Link to="/inquiry" state={{ eventType: type }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[rgb(145,118,90)] hover:bg-[rgb(125,100,75)] text-white font-semibold rounded-full"
            >
              Plan Your Celebration
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function ExperienceDetail({ params }) {
  const type = params?.slug || 'weddings';
  const data = experienceData[type] || experienceData.weddings;

  return (
    <main>
      <Navbar />
      <ExperienceHero data={data} type={type} />
      <FeaturesSection features={data.features} />
      <GallerySection gallery={data.gallery} title={data.title} />
      <TestimonialsSection testimonials={data.testimonials} />
      <CTASection type={type} />
      <Footer />
    </main>
  );
}
