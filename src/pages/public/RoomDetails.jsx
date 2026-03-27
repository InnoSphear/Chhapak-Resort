import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, BedDouble, Users, Maximize, Check, ChevronLeft, ChevronRight, 
  Calendar, Clock, Phone, Mail, Star, Wifi, Coffee, Tv, Wind, Bath
} from "lucide-react";
import { publicApi } from "../../lib/api";
import { Button } from "../../components/ui/Button";
import { Input, Textarea, Select } from "../../components/ui/Input";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

const amenityIcons = {
  "WiFi": Wifi,
  "Breakfast Included": Coffee,
  "Smart TV": Tv,
  "Rain Shower": Wind,
  "Bath Tub": Bath,
  "default": Check,
};

export default function RoomDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomRes, allRoomsRes] = await Promise.all([
          publicApi.getRoom(slug),
          publicApi.getRooms(),
        ]);
        setRoom(roomRes.data.data);
        setRooms(allRoomsRes.data.data || []);
      } catch (err) {
        console.error(err);
        navigate("/rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, navigate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingSubmitting(true);
    try {
      await publicApi.submitBooking({
        ...bookingForm,
        roomId: room._id,
        roomName: room.name,
      });
      alert("Booking request submitted! We will contact you shortly.");
      setShowBooking(false);
    } catch (err) {
      alert("Failed to submit booking. Please try again.");
    } finally {
      setBookingSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!room) return null;

  const relatedRooms = rooms.filter((r) => r.category === room.category && r._id !== room._id).slice(0, 3);

  return (
    <main className="pt-20">
      <section className="relative">
        <div className="grid lg:grid-cols-2 gap-4 p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-[4/3] lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden"
          >
            <img
              src={room.images?.[selectedImage] || room.images?.[0] || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"}
              alt={room.name}
              className="w-full h-full object-cover"
            />
            <Link
              to="/rooms"
              className="absolute top-4 left-4 lg:top-8 lg:left-8 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {room.images?.slice(0, 4).map((img, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedImage(i)}
                className={`relative aspect-square rounded-2xl overflow-hidden ${
                  selectedImage === i ? "ring-4 ring-gold" : ""
                }`}
              >
                <img src={img} alt={`${room.name} ${i + 1}`} className="w-full h-full object-cover" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-gold/10 text-gold rounded-full text-sm font-medium">
                    {room.category}
                  </span>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-current" />
                  ))}
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-charcoal mb-4">{room.name}</h1>

                <div className="flex flex-wrap gap-6 text-charcoal/60 mb-8">
                  <span className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-gold" />
                    {room.bedType}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gold" />
                    {room.capacity} Guests
                  </span>
                  <span className="flex items-center gap-2">
                    <Maximize className="w-5 h-5 text-gold" />
                    {room.size}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center text-gold text-sm font-bold">{room.inventory}</span>
                    Rooms Available
                  </span>
                </div>

                <p className="text-lg text-charcoal/70 leading-relaxed mb-8">{room.description}</p>

                <h2 className="text-2xl font-bold text-charcoal mb-6">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                  {room.amenities?.map((amenity, i) => {
                    const Icon = amenityIcons[amenity] || amenityIcons.default;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-4 bg-cream rounded-xl"
                      >
                        <Icon className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="text-sm text-charcoal">{amenity}</span>
                      </motion.div>
                    );
                  })}
                </div>

                <h2 className="text-2xl font-bold text-charcoal mb-6">Policies</h2>
                <div className="grid sm:grid-cols-2 gap-6 p-6 bg-cream rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-charcoal">Check-in</p>
                      <p className="text-sm text-charcoal/60">From 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-charcoal">Check-out</p>
                      <p className="text-sm text-charcoal/60">Until 11:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-charcoal">Cancellation</p>
                      <p className="text-sm text-charcoal/60">Free cancellation up to 48 hours before</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-charcoal">Pets</p>
                      <p className="text-sm text-charcoal/60">Not allowed</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-28"
              >
                <div className="bg-white rounded-3xl shadow-luxury-lg border border-sand/50 p-8">
                  <div className="text-center mb-8">
                    <p className="text-sm text-charcoal/60 mb-1">Starting from</p>
                    <p className="text-4xl font-bold text-charcoal">
                      ₹{room.price?.toLocaleString()}
                      <span className="text-lg font-normal text-charcoal/60">/night</span>
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <Input
                      label="Check-in Date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={bookingForm.checkIn}
                      onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
                    />
                    <Input
                      label="Check-out Date"
                      type="date"
                      min={bookingForm.checkIn || new Date().toISOString().split("T")[0]}
                      value={bookingForm.checkOut}
                      onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
                    />
                    <Input
                      label="Number of Guests"
                      type="number"
                      min="1"
                      max={room.capacity}
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                    />
                  </div>

                  <Button className="w-full mb-4" size="lg" onClick={() => setShowBooking(!showBooking)}>
                    Book Now
                  </Button>

                  <Button variant="outline" className="w-full" size="lg">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Us
                  </Button>

                  <div className="mt-6 pt-6 border-t border-sand">
                    <p className="text-sm text-charcoal/60 text-center">
                      No payment required now. Pay at the property.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {showBooking && (
        <section className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-charcoal mb-6">Complete Your Booking</h2>
            <form onSubmit={handleBooking} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter your name"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                required
              />
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowBooking(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" loading={bookingSubmitting}>
                  Submit Request
                </Button>
              </div>
            </form>
          </motion.div>
        </section>
      )}

      {relatedRooms.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-charcoal mb-8">Similar Rooms</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedRooms.map((r) => (
                <Link key={r._id} to={`/rooms/${r.slug}`} className="group">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={r.images?.[0] || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-charcoal group-hover:text-gold transition-colors mb-2">{r.name}</h3>
                      <p className="text-gold font-bold">₹{r.price?.toLocaleString()}/night</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
