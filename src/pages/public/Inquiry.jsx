import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Calendar, User,
  MessageSquare, Heart, PartyPopper, Briefcase,
  Wine, Sparkles, Send, Loader2, Mail, Phone
} from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const eventTypes = [
  { id: "wedding", label: "Wedding", icon: Heart },
  { id: "birthday", label: "Birthday", icon: PartyPopper },
  { id: "corporate", label: "Corporate", icon: Briefcase },
  { id: "anniversary", label: "Anniversary", icon: Wine },
  { id: "private-party", label: "Private Party", icon: Sparkles },
  { id: "other", label: "Other Event", icon: MessageSquare }
];

const steps = [
  { id: 1, title: "Event Type" },
  { id: 2, title: "Details" },
  { id: 3, title: "Contact" },
  { id: 4, title: "Confirm" }
];

export default function Inquiry() {
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    eventType: "",
    eventDate: "",
    guestCount: "",
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

  const update = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const next = () => currentStep < 4 && setCurrentStep(p => p + 1);
  const prev = () => currentStep > 1 && setCurrentStep(p => p - 1);

  const canProceed = () => {
    if (currentStep === 1) return formData.eventType;
    if (currentStep === 2) return formData.eventDate && formData.guestCount;
    if (currentStep === 3) return formData.name && formData.email && formData.phone;
    return true;
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/events/inquiry`, formData);
      setIsSubmitted(true);
    } catch {
      alert("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <Navbar />

      <section className="min-h-screen bg-cream pt-24 sm:pt-28 pb-12 sm:pb-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Book Your <span className="text-gold">Event</span>
            </h1>
            <p className="text-sm sm:text-base text-charcoal/70 max-w-xl mx-auto">
              Tell us about your celebration. We specialize in weddings, birthdays, anniversaries, and corporate events.
            </p>
          </div>

          {/* STEP INDICATOR */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full font-semibold ${
                  currentStep >= s.id ? "bg-[rgb(145,118,90)] text-white" : "bg-sand text-charcoal/40"
                }`}>
                  {currentStep > s.id ? <Check /> : s.id}
                </div>
                <span className="hidden sm:block text-sm">{s.title}</span>
              </div>
            ))}
          </div>

          {/* CONTENT */}
          {!isSubmitted ? (
            <>
              <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8">

                <AnimatePresence mode="wait">

                  {/* STEP 1 */}
                  {currentStep === 1 && (
                    <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {eventTypes.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => update("eventType", t.id)}
                            className={`p-4 sm:p-6 rounded-2xl border-2 transition ${
                              formData.eventType === t.id
                                ? "border-[rgb(145,118,90)] bg-[rgb(145,118,90)]/5"
                                : "border-sand"
                            }`}
                          >
                            <t.icon className="w-6 h-6 mb-2" />
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2 */}
                  {currentStep === 2 && (
                    <motion.div key="2" className="space-y-4 max-w-xl mx-auto px-2">
                      <input type="date"
                        value={formData.eventDate}
                        onChange={(e)=>update("eventDate",e.target.value)}
                        className="w-full p-3 border rounded-xl"
                      />
                      <input type="number"
                        placeholder="Guests"
                        value={formData.guestCount}
                        onChange={(e)=>update("guestCount",e.target.value)}
                        className="w-full p-3 border rounded-xl"
                      />
                    </motion.div>
                  )}

                  {/* STEP 3 */}
                  {currentStep === 3 && (
                    <motion.div key="3" className="space-y-4 max-w-xl mx-auto px-2">
                      <input placeholder="Name" className="w-full p-3 border rounded-xl"
                        onChange={(e)=>update("name",e.target.value)} />
                      <input placeholder="Email" className="w-full p-3 border rounded-xl"
                        onChange={(e)=>update("email",e.target.value)} />
                      <input placeholder="Phone" className="w-full p-3 border rounded-xl"
                        onChange={(e)=>update("phone",e.target.value)} />
                      <textarea placeholder="Message" className="w-full p-3 border rounded-xl"
                        onChange={(e)=>update("message",e.target.value)} />
                    </motion.div>
                  )}

                  {/* STEP 4 */}
                  {currentStep === 4 && (
                    <motion.div key="4" className="text-center">
                      <p className="mb-4">Confirm your details</p>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:justify-between">

                  <button
                    onClick={prev}
                    disabled={currentStep === 1}
                    className="w-full sm:w-auto px-6 py-3 border rounded-full"
                  >
                    Back
                  </button>

                  {currentStep < 4 ? (
                    <button
                      onClick={next}
                      disabled={!canProceed()}
                      className="w-full sm:w-auto px-6 py-3 bg-[rgb(145,118,90)] hover:bg-[rgb(125,100,75)] text-white rounded-full"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      className="w-full sm:w-auto px-6 py-3 bg-[rgb(145,118,90)] hover:bg-[rgb(125,100,75)] text-white rounded-full"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  )}

                </div>

              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
              <p className="text-charcoal/70 mb-4">Your inquiry has been submitted successfully. We will contact you soon.</p>
              <Link to="/" className="text-gold hover:text-[rgb(145,118,90)]">Go Home</Link>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}