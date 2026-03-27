import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Search, Image as ImageIcon } from "lucide-react";
import { adminApi } from "../../lib/api";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

const mediaTypes = [
  { value: "room", label: "Room" },
  { value: "event", label: "Event" },
  { value: "resort", label: "Resort" },
];

const sectionKeys = [
  { value: "hero", label: "Hero Section" },
  { value: "executive", label: "Executive Rooms" },
  { value: "super-deluxe", label: "Super Deluxe" },
  { value: "deluxe", label: "Deluxe Rooms" },
  { value: "dormitory", label: "Dormitory" },
  { value: "weddings", label: "Weddings" },
  { value: "birthdays", label: "Birthdays" },
  { value: "anniversaries", label: "Anniversaries" },
  { value: "corporate-events", label: "Corporate Events" },
];

export default function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    mediaType: "resort",
    sectionKey: "hero",
    url: "",
    image: "",
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await adminApi.getGallery();
      setGallery(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData };
      if (formData.image && !formData.url) {
        data.url = formData.image;
      }
      
      if (editingItem) {
        await adminApi.updateGalleryItem(editingItem._id, data);
      } else {
        await adminApi.createGalleryItem(data);
      }
      fetchGallery();
      closeModal();
    } catch (err) {
      alert("Failed to save image");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      await adminApi.deleteGalleryItem(id);
      fetchGallery();
    } catch (err) {
      alert("Failed to delete image");
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        mediaType: item.mediaType,
        sectionKey: item.sectionKey,
        url: item.url || item.image,
        image: item.image || item.url,
      });
    } else {
      setEditingItem(null);
      setFormData({ title: "", mediaType: "resort", sectionKey: "hero", url: "", image: "" });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const filteredGallery = filter === "all" 
    ? gallery 
    : gallery.filter((item) => item.mediaType === filter);

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
          <h1 className="text-2xl font-bold text-charcoal">Gallery Management</h1>
          <p className="text-slate-600">Upload and manage gallery images</p>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-5 h-5 mr-2" />
          Add Image
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all", "resort", "room", "event"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === type
                ? "bg-gold text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:border-gold"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredGallery.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
          >
            <div className="aspect-square">
              <img
                src={item.image || item.url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(item)}
                  className="p-2 bg-white rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-slate-600" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-charcoal/80 to-transparent">
              <p className="text-white text-sm font-medium truncate">{item.title}</p>
              <p className="text-white/60 text-xs">{item.sectionKey}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredGallery.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No images found</p>
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
              {editingItem ? "Edit Image" : "Add New Image"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/80 mb-2">Media Type</label>
                  <select
                    value={formData.mediaType}
                    onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-sand bg-white focus:border-gold focus:outline-none"
                  >
                    {mediaTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/80 mb-2">Section</label>
                  <select
                    value={formData.sectionKey}
                    onChange={(e) => setFormData({ ...formData, sectionKey: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-sand bg-white focus:border-gold focus:outline-none"
                  >
                    {sectionKeys.map((key) => (
                      <option key={key.value} value={key.value}>{key.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Input
                label="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value, url: e.target.value })}
                placeholder="https://..."
                required
              />
              {formData.image && (
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-100">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingItem ? "Update" : "Add"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
