import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Calendar, Users, DollarSign, Phone, Mail, User, MessageSquare, Heart, PartyPopper, Briefcase, Wine, Sparkles, Send, Loader2 } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const eventTypes = [
  { id: "wedding", label: "Wedding", icon: Heart, desc: "Ceremony & Reception" },
  { id: "birthday", label: "Birthday", icon: PartyPopper, desc: "All Age Celebrations" },
  { id: "corporate", label: "Corporate", icon: Briefcase, desc: "Business Events" },
  { id: "anniversary", label: "Anniversary", icon: Wine, desc: "Romantic Celebrations" },
  { id: "private-party", label: "Private Party", icon: Sparkles, desc: "Custom Events" },
  { id: "other", label: "Other", icon: MessageSquare, desc: "Special Occasions" }
];

const budgetRanges = [
  { id: "1-3", label: "₹1 - 3 Lakhs", desc: "Intimate Events" },
  { id: "3-5", label: "₹3 - 5 Lakhs", desc: "Mid-Size Celebrations" },
  { id: "5-10", label: "₹5 - 10 Lakhs", desc: "Grand Events" },
  { id: "10-25", label: "₹10 - 25 Lakhs", desc: "Premium Celebrations" },
  { id: "25+", label: "₹25+ Lakhs", desc: "Luxury Experiences" }
];

const steps = [
  { id: 1, title: "Event Type", icon: Heart },
  { id: 2, title: "Details", icon: Calendar },
  { id: 3, title: "Contact", icon: User },
  { id: 4, title: "Confirm", icon: Check }
];

export default function Inquiry() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    venue: "",
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    if (location.state?.eventType) {
      setFormData(prev => ({ ...prev, eventType: location.state.eventType }));
    }
  }, [location.state]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!formData.eventType;
      case 2:
        return !!formData.eventDate && !!formData.guestCount;
      case 3:
        return !!formData.name && !!formData.email && !!formData.phone;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/events/inquiry`, formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
      alert("Failed to submit your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold transition-all duration-300 ${
              currentStep > step.id
                ? "bg-gold text-white"
                : currentStep === step.id
                ? "bg-gold text-white ring-4 ring-gold/20"
                : "bg-sand text-charcoal/40"
            }`}
          >
            {currentStep > step.id ? (
              <Check className="w-6 h-6" />
            ) : (
              <step.icon className="w-5 h-5" />
            )}
          </motion.div>
          <span className={`hidden sm:block ml-3 font-medium ${
            currentStep >= step.id ? "text-charcoal" : "text-charcoal/40"
          }`}>
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-12 sm:w-20 h-0.5 mx-4 transition-colors duration-300 ${
              currentStep > step.id ? "bg-gold" : "bg-sand"
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const Step1_EventType = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      {eventTypes.map((type) => (
        <motion.button
          key={type.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => updateFormData("eventType", type.id)}
          className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
            formData.eventType === type.id
              ? "border-gold bg-gold/5 shadow-lg shadow-gold/10"
              : "border-sand hover:border-gold/50 bg-white"
          }`}
        >
          <type.icon className={`w-8 h-8 mb-4 ${
            formData.eventType === type.id ? "text-gold" : "text-charcoal/40"
          }`} />
          <h3 className="font-bold text-charcoal mb-1">{type.label}</h3>
          <p className="text-sm text-charcoal/60">{type.desc}</p>
        </motion.button>
      ))}
    </motion.div>
  );

  const Step2_Details = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 max-w-xl mx-auto"
    >
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Event Date *</label>
        <input
          type="date"
          value={formData.eventDate}
          onChange={(e) => updateFormData("eventDate", e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-5 py-4 rounded-xl border-2 border-sand focus:border-gold outline-none transition-colors bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Expected Guest Count *</label>
        <input
          type="number"
          value={formData.guestCount}
          onChange={(e) => updateFormData("guestCount", e.target.value)}
          placeholder="Enter number of guests"
          min="10"
          className="w-full px-5 py-4 rounded-xl border-2 border-sand focus:border-gold outline-none transition-colors bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Budget Range</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {budgetRanges.map((range) => (
            <motion.button
              key={range.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateFormData("budget", range.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.budget === range.id
                  ? "border-gold bg-gold/5"
                  : "border-sand hover:border-gold/50 bg-white"
              }`}
            >
              <p className="font-semibold text-charcoal">{range.label}</p>
              <p className="text-xs text-charcoal/60">{range.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Preferred Venue (Optional)</label>
        <select
          value={formData.venue}
          onChange={(e) => updateFormData("venue", e.target.value)}
          className="w-full px-5 py-4 rounded-xl border-2 border-sand focus:border-gold outline-none transition-colors bg-white"
        >
          <option value="">Select venue preference</option>
          <option value="grand-lawn">Grand Lawn</option>
          <option value="banquet-hall">Banquet Hall</option>
          <option value="poolside">Poolside</option>
          <option value="rooftop">Rooftop Terrace</option>
          <option value="any">No Preference</option>
        </select>
      </div>
    </motion.div>
  );

  const Step3_Contact = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 max-w-xl mx-auto"
    >
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            placeholder="Enter your full name"
            className="w-full pl-12 pr-5 py-4 rounded-xl border-2 border-sand focus:border-gold outline-none transition-colors bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Email Address *</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            placeholder="your@email.com"
            className="w-full pl-12 pr-5 py-4 rounded-xl border-2 border-sand focus:border-gold outline-none transition-colors bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Phone Number *</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full pl-12 pr-5 py-4 rounded-xl border-2 border-sand focus:border-gold outline-none transition-colors bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Additional Details (Optional)</label>
        <textarea
          value={formData.message}
          onChange={(e) => updateFormData("message", e.target.value)}
          placeholder="Tell us more about your event vision..."
          rows={4}
          className="w-full px-5 py-4 rounded-xl border-2 border-sand focus:border-gold outline-none transition-colors bg-white resize-none"
        />
      </div>
    </motion.div>
  );

  const Step4_Confirm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-xl mx-auto"
    >
      <div className="bg-sand/50 rounded-3xl p-8 mb-8">
        <h3 className="font-bold text-charcoal mb-6 text-lg">Review Your Inquiry</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-sand">
            <span className="text-charcoal/60">Event Type</span>
            <span className="font-medium text-charcoal capitalize">
              {eventTypes.find(t => t.id === formData.eventType)?.label || "-"}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b border-sand">
            <span className="text-charcoal/60">Event Date</span>
            <span className="font-medium text-charcoal">
              {formData.eventDate ? new Date(formData.eventDate).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              }) : "-"}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b border-sand">
            <span className="text-charcoal/60">Guest Count</span>
            <span className="font-medium text-charcoal">{formData.guestCount || "-"} guests</span>
          </div>
          <div className="flex justify-between py-3 border-b border-sand">
            <span className="text-charcoal/60">Budget</span>
            <span className="font-medium text-charcoal">
              {budgetRanges.find(r => r.id === formData.budget)?.label || "Not specified"}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b border-sand">
            <span className="text-charcoal/60">Name</span>
            <span className="font-medium text-charcoal">{formData.name}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-sand">
            <span className="text-charcoal/60">Email</span>
            <span className="font-medium text-charcoal">{formData.email}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-charcoal/60">Phone</span>
            <span className="font-medium text-charcoal">{formData.phone}</span>
          </div>
        </div>
      </div>

      <p className="text-center text-charcoal/60 text-sm">
        By submitting, you agree to be contacted by our team regarding your event inquiry.
      </p>
    </motion.div>
  );

  const SuccessScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center max-w-md mx-auto py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Check className="w-10 h-10 text-gold" />
      </motion.div>
      <h2 className="text-3xl font-bold text-charcoal mb-4">Inquiry Submitted!</h2>
      <p className="text-charcoal/70 mb-8">
        Thank you for your interest in Chhapak Resort. Our team will review your inquiry and reach out to you within 24 hours.
      </p>
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gold text-white font-semibold rounded-full"
        >
          Back to Home
        </motion.button>
      </Link>
    </motion.div>
  );

  return (
    <main>
      <Navbar />
      
      <section className="min-h-screen bg-cream pt-28 pb-16">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="eyebrow-text">Get Started</span>
            <h1 className="heading-main mb-4">
              Plan Your <span className="text-gradient-gold">Event</span>
            </h1>
            <p className="heading-sub max-w-2xl mx-auto">
              Fill out this simple form and our team will create a personalized proposal for your special occasion.
            </p>
          </motion.div>

          {isSubmitted ? (
            <SuccessScreen />
          ) : (
            <>
              <StepIndicator />

              <div className="max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && <Step1_EventType key="step1" />}
                  {currentStep === 2 && <Step2_Details key="step2" />}
                  {currentStep === 3 && <Step3_Contact key="step3" />}
                  {currentStep === 4 && <Step4_Confirm key="step4" />}
                </AnimatePresence>

                <div className="flex justify-between mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                      currentStep === 1
                        ? "text-charcoal/30 cursor-not-allowed"
                        : "text-charcoal hover:text-gold"
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </motion.button>

                  {currentStep < 4 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${
                        canProceed()
                          ? "bg-gold text-white hover:bg-gold-dark"
                          : "bg-sand text-charcoal/40 cursor-not-allowed"
                      }`}
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3 bg-gold text-white font-semibold rounded-full hover:bg-gold-dark transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Inquiry
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
