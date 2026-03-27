import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BedDouble,
  Calendar,
  CheckCircle,
  Clock,
  Image,
  TrendingUp,
  Users,
} from "lucide-react";
import { adminApi } from "../../lib/api";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          adminApi.getStats(),
          adminApi.getBookings()
        ]);
        setStatsData(statsRes.data.data);
        const bookings = bookingsRes.data.data || [];
        setRecentBookings(bookings.slice(0, 5));
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
        { label: "Total Rooms", value: statsData.stats.totalRooms || 0, icon: BedDouble, color: "bg-blue-500" },
        { label: "Active Bookings", value: statsData.stats.activeBookings || 0, icon: Calendar, color: "bg-green-500" },
        { label: "Pending Inquiries", value: statsData.stats.eventInquiries || 0, icon: Clock, color: "bg-amber-500" },
        { label: "Media Assets", value: statsData.stats.mediaAssets || 0, icon: Image, color: "bg-purple-500" },
      ]
    : [];

  const recentInquiries = statsData?.recentInquiries || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-charcoal">Welcome back, Admin</h1>
          <p className="text-slate-600">A quick pulse on rooms, bookings, inquiries, and content operations.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "Today", value: "Live" },
            { label: "Check-ins", value: "Smooth" },
            { label: "Team", value: "Ready" },
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
              <h2 className="text-lg font-bold text-charcoal">Recent Bookings</h2>
              <p className="text-sm text-slate-500">Immediate arrivals and pending guest requests</p>
            </div>
            <a href="/admin/bookings" className="text-sm font-medium text-gold hover:underline">
              View All
            </a>
          </div>

          <div className="space-y-4">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div key={booking._id} className="flex items-center justify-between rounded-2xl bg-slate-50/90 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                      <span className="font-semibold text-gold">{booking.guestName?.charAt(0) || "G"}</span>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">{booking.guestName}</p>
                      <p className="text-sm text-slate-500">{booking.roomName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        booking.status === "approved" || booking.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                    <p className="mt-1 text-xs text-slate-500">{new Date(booking.checkIn).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                No recent bookings yet.
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
                { label: "Add New Room", href: "/admin/rooms?action=add", color: "bg-blue-500" },
                { label: "View Bookings", href: "/admin/bookings", color: "bg-green-500" },
                { label: "Upload Gallery", href: "/admin/gallery?action=add", color: "bg-purple-500" },
                { label: "Manage Events", href: "/admin/events", color: "bg-amber-500" },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50/90 p-4 transition-colors hover:bg-slate-100"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color}`}>
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium text-charcoal">{action.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-lg shadow-black/5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10">
                <Users className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-charcoal">Latest Inquiries</h2>
                <p className="text-sm text-slate-500">Newest requests coming into the resort team</p>
              </div>
            </div>

            <div className="space-y-4">
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inquiry) => (
                  <div key={inquiry._id} className="rounded-2xl bg-slate-50/90 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-charcoal">{inquiry.name}</p>
                        <p className="text-sm text-slate-500">{inquiry.inquiryType}</p>
                      </div>
                      <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium capitalize text-gold">
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-500">Event date: {inquiry.eventDate}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl bg-slate-50/90 p-4 text-sm text-slate-500">
                  No recent inquiries yet.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
