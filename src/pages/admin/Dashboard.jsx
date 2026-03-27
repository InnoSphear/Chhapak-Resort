import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Inbox,
  MessageSquare,
  Image,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  ArrowUpRight,
  Eye,
  Calendar
} from "lucide-react";
import { adminApi } from "../../lib/api";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState(null);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await adminApi.getStats();
        setStatsData(statsRes.data.data);
        const inquiries = statsRes.data.data?.recentInquiries || [];
        setRecentInquiries(inquiries.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const stats = statsData?.stats
    ? [
        { label: "Total Inquiries", value: statsData.stats.totalInquiries || 0, icon: Inbox, color: "bg-blue-500" },
        { label: "New Inquiries", value: statsData.stats.newInquiries || 0, icon: MessageSquare, color: "bg-green-500" },
        { label: "Media Assets", value: statsData.stats.mediaAssets || 0, icon: Image, color: "bg-purple-500" },
        { label: "Testimonials", value: statsData.stats.testimonials || 0, icon: Star, color: "bg-amber-500" },
      ]
    : [];

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { bg: "bg-blue-100", text: "text-blue-700", label: "New" },
      contacted: { bg: "bg-amber-100", text: "text-amber-700", label: "Contacted" },
      closed: { bg: "bg-green-100", text: "text-green-700", label: "Closed" },
    };
    const config = statusConfig[status] || statusConfig.new;
    return { bg: config.bg, text: config.text, label: config.label };
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-charcoal">Welcome back, Admin</h1>
          <p className="text-slate-600">A quick overview of inquiries, content, and operations.</p>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
          {[
            { label: "Today", value: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) },
            { label: "Status", value: "Active" },
            { label: "System", value: "Online" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-center shadow-sm">
              <p className="text-lg font-semibold text-charcoal">{item.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-lg shadow-black/5"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <TrendingUp className="mr-1 inline h-3.5 w-3.5" />
                Live
              </div>
            </div>
            <p className="mb-1 text-3xl font-bold text-charcoal">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-lg shadow-black/5"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-charcoal">Recent Inquiries</h2>
              <p className="text-sm text-slate-500">Latest event inquiries from potential clients</p>
            </div>
            <Link to="/admin/inquiries" className="text-sm font-medium text-gold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentInquiries.length > 0 ? (
              recentInquiries.map((inquiry) => {
                const status = getStatusBadge(inquiry.status);
                return (
                  <div key={inquiry._id} className="flex items-center justify-between rounded-2xl bg-slate-50/90 p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                        <span className="font-semibold text-gold">{inquiry.name?.charAt(0) || "G"}</span>
                      </div>
                      <div>
                        <p className="font-medium text-charcoal">{inquiry.name}</p>
                        <p className="text-sm text-slate-500 capitalize">{inquiry.eventType?.replace("-", " ")} - {inquiry.guestCount} guests</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
                      <p className="mt-1 text-xs text-slate-500">
                        {inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short',
                          year: 'numeric'
                        }) : "Date not set"}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-slate-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>No inquiries yet.</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-8"
        >
          <div className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-lg shadow-black/5">
            <h2 className="mb-6 text-lg font-bold text-charcoal">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {[
                { label: "View All Inquiries", href: "/admin/inquiries", color: "bg-blue-500" },
                { label: "Manage Gallery", href: "/admin/gallery", color: "bg-purple-500" },
                { label: "Update Testimonials", href: "/admin/testimonials", color: "bg-amber-500" },
                { label: "Edit CMS Content", href: "/admin/cms", color: "bg-green-500" },
              ].map((action) => (
                <Link
                  key={action.label}
                  to={action.href}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50/90 p-4 transition-colors hover:bg-slate-100"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color}`}>
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium text-charcoal">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-lg shadow-black/5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10">
                <Phone className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-charcoal">Contact Info</h2>
                <p className="text-sm text-slate-500">Quick access to contact details</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-charcoal/70">
                <Phone className="w-5 h-5 text-gold" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-charcoal/70">
                <Mail className="w-5 h-5 text-gold" />
                <span>hello@chhapakresort.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
