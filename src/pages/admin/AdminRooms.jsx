import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Search, BedDouble, Users, ImagePlus } from "lucide-react";
import { adminApi } from "../../lib/api";
import { Button } from "../../components/ui/Button";
import { Input, Textarea } from "../../components/ui/Input";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { StatusBadge } from "../../components/ui/Badge";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "Executive",
    inventory: 1,
    size: "",
    price: "",
    capacity: 2,
    bedType: "",
    excerpt: "",
    description: "",
    amenities: "",
    images: [],
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await adminApi.getRooms();
      setRooms(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: Number(formData.price),
        inventory: Number(formData.inventory),
        capacity: Number(formData.capacity),
        amenities: formData.amenities.split(",").map((a) => a.trim()).filter(Boolean),
        images: formData.images,
      };

      if (editingRoom) {
        await adminApi.updateRoom(editingRoom._id, data);
      } else {
        await adminApi.createRoom(data);
      }
      fetchRooms();
      closeModal();
    } catch (err) {
      alert("Failed to save room");
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setUploading(true);
    const uploadedUrls = [];
    
    for (const file of files) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("folder", "rooms");
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/upload`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
          },
          body: formDataUpload
        });
        const result = await response.json();
        if (result.data?.url) {
          uploadedUrls.push(result.data.url);
        } else {
          uploadedUrls.push(URL.createObjectURL(file));
        }
      } catch (err) {
        uploadedUrls.push(URL.createObjectURL(file));
      }
    }
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls]
    }));
    setUploading(false);
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    try {
      await adminApi.deleteRoom(id);
      fetchRooms();
    } catch (err) {
      alert("Failed to delete room");
    }
  };

  const openModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        name: room.name,
        slug: room.slug,
        category: room.category,
        inventory: room.inventory,
        size: room.size,
        price: room.price,
        capacity: room.capacity,
        bedType: room.bedType,
        excerpt: room.excerpt,
        description: room.description,
        amenities: room.amenities?.join(", ") || "",
        images: room.images || [],
      });
    } else {
      setEditingRoom(null);
      setFormData({
        name: "",
        slug: "",
        category: "Executive",
        inventory: 1,
        size: "",
        price: "",
        capacity: 2,
        bedType: "",
        excerpt: "",
        description: "",
        amenities: "",
        images: [],
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRoom(null);
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-charcoal">Rooms Management</h1>
          <p className="text-slate-600">Manage your resort rooms and suites</p>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-5 h-5 mr-2" />
          Add Room
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search rooms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/10"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Room</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Inventory</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRooms.map((room) => (
                <tr key={room._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={room.images?.[0] || "https://via.placeholder.com/100"}
                        alt={room.name}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-charcoal">{room.name}</p>
                        <p className="text-sm text-slate-500">{room.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium">
                      {room.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-charcoal">
                    ₹{room.price?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {room.capacity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{room.inventory}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(room)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <BedDouble className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No rooms found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-charcoal mb-6">
              {editingRoom ? "Edit Room" : "Add New Room"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Room Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="Slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/80 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-sand bg-white focus:border-gold focus:outline-none"
                  >
                    <option>Executive</option>
                    <option>Super Deluxe</option>
                    <option>Deluxe</option>
                    <option>Dormitory</option>
                  </select>
                </div>
                <Input
                  label="Size (e.g., 420 sq ft)"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  required
                />
                <Input
                  label="Price per night"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <Input
                  label="Capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  required
                />
                <Input
                  label="Inventory"
                  type="number"
                  value={formData.inventory}
                  onChange={(e) => setFormData({ ...formData, inventory: e.target.value })}
                  required
                />
                <Input
                  label="Bed Type"
                  value={formData.bedType}
                  onChange={(e) => setFormData({ ...formData, bedType: e.target.value })}
                  required
                />
              </div>
              <Input
                label="Short Description"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
              />
              <Textarea
                label="Full Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
              <Input
                label="Amenities (comma separated)"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                placeholder="WiFi, Breakfast, Pool Access"
              />
              <div>
                <label className="block text-sm font-medium text-charcoal/80 mb-2">Room Images</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-gold transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="room-image-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="room-image-upload" className="cursor-pointer">
                    {uploading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <ImagePlus className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">Click to upload images</p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                      </>
                    )}
                  </label>
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Room ${idx + 1}`} className="w-full h-20 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingRoom ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
