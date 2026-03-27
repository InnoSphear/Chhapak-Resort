import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Star } from "lucide-react";
import { adminApi } from "../../lib/api";
import { Button } from "../../components/ui/Button";
import { Input, Textarea } from "../../components/ui/Input";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    quote: "",
    rating: 5,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await adminApi.getTestimonials();
      setTestimonials(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await adminApi.updateTestimonial(editingTestimonial._id, formData);
      } else {
        await adminApi.createTestimonial(formData);
      }
      fetchTestimonials();
      closeModal();
    } catch (err) {
      alert("Failed to save testimonial");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await adminApi.deleteTestimonial(id);
      fetchTestimonials();
    } catch (err) {
      alert("Failed to delete testimonial");
    }
  };

  const openModal = (testimonial = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        designation: testimonial.designation,
        quote: testimonial.quote,
        rating: testimonial.rating || 5,
      });
    } else {
      setEditingTestimonial(null);
      setFormData({ name: "", designation: "", quote: "", rating: 5 });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTestimonial(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Testimonials Management</h1>
          <p className="text-slate-600">Manage guest reviews and testimonials</p>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-5 h-5 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                  <span className="text-gold font-bold text-lg">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-charcoal">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.designation}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-current" />
                ))}
              </div>
            </div>
            <p className="text-slate-600 italic mb-4 line-clamp-4">"{testimonial.quote}"</p>
            <div className="flex gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => openModal(testimonial)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(testimonial._id)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl">
          <Star className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No testimonials found</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-lg w-full"
          >
            <h2 className="text-2xl font-bold text-charcoal mb-6">
              {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Guest Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Designation"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="Wedding Host, Weekend Guest, etc."
                required
              />
              <Textarea
                label="Quote / Review"
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                rows={4}
                required
              />
              <div>
                <label className="block text-sm font-medium text-charcoal/80 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          rating <= formData.rating ? "text-gold fill-current" : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingTestimonial ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
