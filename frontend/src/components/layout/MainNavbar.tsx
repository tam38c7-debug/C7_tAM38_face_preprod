import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Globe, Menu, X, Sparkles, Crown, Headphones, HelpCircle, Handshake, Info } from "lucide-react";
import { useState } from "react";

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MainNavbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { name: "Fleet", path: "/cars", icon: Car },
    { name: "Explore", path: "/explore", icon: Sparkles },
    { name: "Partners", path: "/partners", icon: Handshake },
    { name: "FAQ", path: "/faq", icon: HelpCircle },
    { name: "About", path: "/about", icon: Info },
    { name: "Support", path: "/support", icon: Headphones },
  ];

  const scrollToBooking = () => {
    document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/10 backdrop-blur-2xl shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO – French flag style */}
        <Link to="/" className="flex items-center gap-4 group">
          <motion.div whileHover={{ scale: 1.05, rotate: 1 }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-red-500/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition" />
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-white to-red-500 flex items-center justify-center shadow-xl overflow-hidden border border-white/40">
              <motion.div className="absolute inset-0 bg-white/30" animate={{ x: ["-150%", "150%"] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} />
              <span className="text-white font-black text-2xl drop-shadow-md">A</span>
              <Car className="absolute bottom-1 right-1 w-3 h-3 text-white/70" />
            </div>
          </motion.div>
          <div className="leading-none">
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-white to-red-500 bg-clip-text text-transparent drop-shadow-md">
              AM38
            </h1>
            <p className="text-[9px] tracking-[0.3em] text-slate-700 font-bold mt-1">MAURITIUS MOBILITY</p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full bg-white/40 border border-white/60 backdrop-blur-sm shadow-sm">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={cx(
                  "relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 group",
                  active ? "text-blue-700" : "text-slate-700 hover:text-blue-600"
                )}
              >
                <Icon className={cx("w-4 h-4", active ? "text-blue-600" : "text-slate-500 group-hover:text-blue-500")} />
                <span>{item.name}</span>
                {active && (
                  <motion.div layoutId="active-navbar" className="absolute inset-0 rounded-xl bg-blue-100/60 border border-blue-300/40" />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language dropdown */}
          <div className="relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button className="px-4 py-2 rounded-full border border-white/50 bg-white/40 backdrop-blur text-slate-700 hover:bg-white/60 flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-blue-500" /> English
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-full right-0 mt-2 w-40 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg overflow-hidden">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-100 transition">
  <Globe className="w-4 h-4 text-blue-500" />
  <span>English</span>
</button>

<button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-100 transition">
  <span className="text-lg">🇫🇷</span>
  <span>Français</span>
</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/login" className="px-5 py-2 rounded-full border border-white/50 bg-white/40 text-slate-700 hover:bg-white/60">Login</Link>
          <Link to="/register" className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-red-500 text-white font-semibold shadow-md hover:shadow-lg transition">Register</Link>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToBooking}
            className="relative overflow-hidden px-7 py-2 rounded-full font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md flex items-center gap-2"
          >
            <motion.div className="absolute inset-0 bg-white/20" animate={{ x: ["-120%", "120%"] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <Car className="w-4 h-4 relative z-10" /><span className="relative z-10">BOOK NOW</span>
          </motion.button>
        </div>

        {/* MOBILE BUTTON */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-full bg-white/40 border border-white/50">
          {mobileOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-white/50 p-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-slate-800 hover:bg-blue-50 flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-blue-500" /> {item.name}
                </Link>
              ))}
              <div className="flex gap-3 pt-2 border-t border-white/50 mt-2">
                <Link to="/login" className="flex-1 text-center px-4 py-3 rounded-xl border border-white/50 text-slate-700 bg-white/50">Login</Link>
                <Link to="/register" className="flex-1 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-red-500 text-white font-bold">Register</Link>
              </div>
              <button onClick={scrollToBooking} className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold">BOOK NOW</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}