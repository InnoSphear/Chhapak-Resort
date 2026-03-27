import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Calendar,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  ShieldCheck,
  Star,
  Users,
  X,
  Inbox,
  Eye,
  CheckCircle,
  Clock,
  Phone,
  Mail
} from "lucide-react";

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Inquiries", href: "/admin/inquiries", icon: Inbox },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "CMS", href: "/admin/cms", icon: Settings },
];

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle =
    adminNav.find((item) => item.href === location.pathname)?.label || "Dashboard";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_32%),linear-gradient(180deg,_#fffdf7_0%,_#f8f5ee_38%,_#f3f4f6_100%)]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 border-r border-white/60 bg-white/90 shadow-2xl shadow-black/5 backdrop-blur-xl transition-all duration-300 lg:static ${
          isSidebarOpen ? "w-64" : "w-20"
        } ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex h-full flex-col">
          <div
            className={`flex h-20 items-center border-b border-slate-100 ${
              isSidebarOpen ? "px-6" : "justify-center px-4"
            }`}
          >
            {isSidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold via-amber-500 to-gold-dark shadow-lg shadow-gold/20">
                  <span className="text-lg font-bold text-white">C</span>
                </div>
                <div>
                  <h1 className="font-bold tracking-tight text-charcoal">Chhapak</h1>
                  <p className="text-xs uppercase tracking-[0.28em] text-gold">Admin Suite</p>
                </div>
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold via-amber-500 to-gold-dark shadow-lg shadow-gold/20">
                <span className="text-lg font-bold text-white">C</span>
              </div>
            )}
          </div>

          <div className="px-4 pt-5">
            <div className={`rounded-3xl bg-charcoal px-4 py-4 text-white ${!isSidebarOpen && "px-2"}`}>
              {isSidebarOpen ? (
                <>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-gold-light/80">Operations</p>
                      <p className="mt-1 text-lg font-semibold">Control room active</p>
                    </div>
                    <ShieldCheck className="mt-1 h-5 w-5 text-gold-light" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Inbox className="h-4 w-4 text-gold-light" />
                    Manage inquiries & content
                  </div>
                </>
              ) : (
                <ShieldCheck className="mx-auto h-5 w-5 text-gold-light" />
              )}
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {adminNav.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-gold/15 via-gold/10 to-transparent text-gold shadow-sm"
                      : "text-slate-600 hover:bg-white hover:text-charcoal hover:shadow-sm"
                  } ${!isSidebarOpen && "justify-center px-0"}`}
                >
                  <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-gold" : ""}`} />
                  {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 p-4">
            <button
              onClick={handleLogout}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-red-600 transition-all hover:bg-red-50 ${
                !isSidebarOpen && "justify-center px-0"
              }`}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-white/60 bg-white/75 px-4 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden rounded-xl p-2 transition-colors hover:bg-white lg:block"
            >
              <Menu className="h-5 w-5 text-slate-600" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl p-2 transition-colors hover:bg-white lg:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Admin panel</p>
              <h2 className="text-xl font-semibold text-charcoal">{pageTitle}</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-sm font-medium text-gold transition hover:bg-gold/10 sm:inline-flex"
            >
              View Website
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-2 py-2 shadow-sm">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-charcoal">Admin</p>
                <p className="text-xs text-slate-500">Secure session</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                <span className="font-semibold text-gold">A</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
