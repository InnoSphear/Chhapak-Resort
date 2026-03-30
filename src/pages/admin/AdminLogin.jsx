import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Eye, EyeOff, LogIn, ShieldCheck, Sparkles } from "lucide-react";
import { authApi } from "../../lib/api";
import heroImage from "../../assets/hero.JPG";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authApi.login({ email, password });
      const token = response.data?.data?.token;

      if (!token) {
        throw new Error("Login response did not include an auth token");
      }

      localStorage.setItem("adminToken", token);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.26),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(23,37,84,0.18),_transparent_28%),linear-gradient(135deg,_#fffdf7_0%,_#f8f1df_42%,_#f4f7fb_100%)] px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-2xl shadow-black/10 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="relative hidden min-h-[640px] overflow-hidden lg:block">
          <img
            src={heroImage}
            alt="Chhapak Resort"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(20,15,8,0.22)_0%,_rgba(20,15,8,0.72)_72%,_rgba(20,15,8,0.86)_100%)]" />

          <div className="relative flex h-full flex-col justify-between p-10 text-white">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-gold-light" />
              <span className="text-sm font-medium tracking-wide">Private operations portal</span>
            </div>

            <div className="max-w-xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-gold-light" />
                Hospitality control for stays, events, and content
              </p>
              <h1 className="text-5xl font-semibold leading-tight tracking-tight">
                A sharper command center for the resort team.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/75">
                Monitor bookings, update inventory, manage gallery assets, and keep the property presentation aligned in one secure workspace.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "33+", label: "Rooms tracked" },
                { value: "24/7", label: "Front desk cycle" },
                { value: "1", label: "Unified admin flow" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-white/65">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex items-center bg-white/55 px-6 py-8 sm:px-10 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-charcoal/70 transition hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to website
            </Link>

            <div className="mb-8">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-gold via-amber-500 to-gold-dark shadow-lg shadow-gold/20">
                <span className="text-2xl font-bold text-white">C</span>
              </div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold">Admin sign in</p>
              <h2 className="text-3xl font-bold tracking-tight text-charcoal">Welcome back</h2>
              <p className="mt-3 text-slate-600">
                Use the resort admin credentials to access bookings, rooms, events, and CMS controls.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-charcoal/80">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@chhapakresort.com"
                  className="w-full rounded-2xl border border-slate-200 bg-white/85 px-5 py-4 text-charcoal shadow-sm transition-all placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/10"
                  autoComplete="username"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-charcoal/80">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-slate-200 bg-white/85 px-5 py-4 pr-12 text-charcoal shadow-sm transition-all placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/10"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-charcoal py-4 font-medium text-white shadow-lg shadow-charcoal/15 transition hover:bg-charcoal/95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Sign In to Admin
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white/70 p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <p className="font-medium text-charcoal">Access note</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    If the backend is running without MongoDB, the default local admin fallback still applies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
