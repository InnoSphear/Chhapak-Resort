import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  Users,
  MessageSquare,
  ChevronDown,
  X,
  Loader2,
  Heart,
  PartyPopper,
  Briefcase,
  Wine,
  Sparkles
} from "lucide-react";
import { adminApi } from "../../lib/api";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

const eventIcons = {
  wedding: Heart,
  birthday: PartyPopper,
  corporate: Briefcase,
  anniversary: Wine,
  "private-party": Sparkles,
  other: MessageSquare
};

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" }
];

const eventTypeOptions = [
  { value: "all", label: "All Types" },
  { value: "wedding", label: "Wedding" },
  { value: "birthday", label: "Birthday" },
  { value: "corporate", label: "Corporate" },
  { value: "anniversary", label: "Anniversary" },
  { value: "private-party", label: "Private Party" },
  { value: "other", label: "Other" }
];

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await adminApi.getInquiries();
      setInquiries(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id, status) => {
    setUpdating(true);
    try {
      await adminApi.updateInquiry(id, { status });
      setInquiries(prev =>
        prev.map(inq => inq._id === id ? { ...inq, status } : inq)
      );
      if (selectedInquiry?._id === id) {
        setSelectedInquiry(prev => ({ ...prev, status }));
      }
    } catch (err) {
      console.error("Failed to update inquiry:", err);
    } finally {
      setUpdating(false);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter;
    const matchesType = typeFilter === "all" || inquiry.eventType === typeFilter;
    const matchesSearch = !searchQuery || 
      inquiry.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.phone?.includes(searchQuery);
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { bg: "bg-blue-100", text: "text-blue-700", label: "New" },
      contacted: { bg: "bg-amber-100", text: "text-amber-700", label: "Contacted" },
      closed: { bg: "bg-green-100", text: "text-green-700", label: "Closed" },
    };
    const config = statusConfig[status] || statusConfig.new;
    return { bg: config.bg, text: config.text, label: config.label };
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Event Inquiries</h1>
          <p className="text-slate-600">Manage and track all event inquiry requests</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-2xl border border-white/70 bg-white/85 px-4 py-2 shadow-sm">
            <span className="text-sm text-slate-500">Total: </span>
            <span className="font-semibold text-charcoal">{filteredInquiries.length}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-gold outline-none transition-colors bg-white"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-gold outline-none transition-colors bg-white text-sm"
          >
            {eventTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-gold outline-none transition-colors bg-white text-sm"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((inquiry, index) => {
            const status = getStatusBadge(inquiry.status);
            const EventIcon = eventIcons[inquiry.eventType] || MessageSquare;
            return (
              <motion.div
                key={inquiry._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-white/70 bg-white/85 p-6 shadow-lg shadow-black/5 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                      <EventIcon className="h-7 w-7 text-gold" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-charcoal text-lg">{inquiry.name}</h3>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${status.bg} ${status.text}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-charcoal/60 capitalize">{inquiry.eventType?.replace("-", " ")}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-charcoal/60">
                      <Calendar className="w-4 h-4" />
                      <span>{inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short',
                        year: 'numeric'
                      }) : "Date not set"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal/60">
                      <Users className="w-4 h-4" />
                      <span>{inquiry.guestCount || "N/A"} guests</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal/60">
                      <Phone className="w-4 h-4" />
                      <span>{inquiry.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-charcoal hover:bg-slate-200 transition-colors text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <div className="relative">
                      <select
                        value={inquiry.status}
                        onChange={(e) => updateInquiryStatus(inquiry._id, e.target.value)}
                        disabled={updating}
                        className="appearance-none pl-4 pr-10 py-2 rounded-xl bg-slate-100 text-charcoal hover:bg-slate-200 transition-colors text-sm font-medium cursor-pointer disabled:opacity-50"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-white/70 bg-white/85 p-12 text-center shadow-lg">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-xl font-semibold text-charcoal mb-2">No inquiries found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>

      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedInquiry(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-charcoal">Inquiry Details</h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10">
                  <span className="text-2xl font-bold text-gold">{selectedInquiry.name?.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal">{selectedInquiry.name}</h3>
                  <p className="text-slate-500 capitalize">{selectedInquiry.eventType?.replace("-", " ")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    Event Date
                  </div>
                  <p className="font-semibold text-charcoal">
                    {selectedInquiry.eventDate ? new Date(selectedInquiry.eventDate).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'long',
                      year: 'numeric'
                    }) : "Not specified"}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                    <Users className="w-4 h-4" />
                    Guest Count
                  </div>
                  <p className="font-semibold text-charcoal">{selectedInquiry.guestCount || "Not specified"}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold" />
                  <a href={`mailto:${selectedInquiry.email}`} className="text-charcoal hover:text-gold transition-colors">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold" />
                  <a href={`tel:${selectedInquiry.phone}`} className="text-charcoal hover:text-gold transition-colors">
                    {selectedInquiry.phone}
                  </a>
                </div>
              </div>

              {selectedInquiry.message && (
                <div>
                  <h4 className="font-semibold text-charcoal mb-2">Additional Message</h4>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-charcoal/70 whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <span className="text-sm text-slate-500">Status:</span>
                <div className="relative">
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => updateInquiryStatus(selectedInquiry._id, e.target.value)}
                    disabled={updating}
                    className="appearance-none pl-4 pr-10 py-2 rounded-xl bg-slate-100 text-charcoal font-medium cursor-pointer disabled:opacity-50"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[rgb(145,118,90)] text-white font-semibold hover:bg-[rgb(125,100,75)] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
