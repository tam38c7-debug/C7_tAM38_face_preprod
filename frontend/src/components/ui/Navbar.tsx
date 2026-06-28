import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  CarFront,
  Info,
  Phone,
  CircleHelp,
  LifeBuoy,
  House,
  FileText,
  BadgeCheck,
  Bell,
  Moon,
  Sun,
  Globe,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Search,
  Sparkles,
  MapPin,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

interface NavbarProps {
  isAuthenticated?: boolean;
  userRole?: "admin" | "staff" | "user";
  userName?: string;
  userAvatar?: string;
  unreadNotifications?: number;
  onLogout?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  onCurrencyChange?: (currency: string) => void;
  currentCurrency?: string;
}

const menuItems = [
  { label: "Home", to: "/", icon: House },
  { label: "Vehicles", to: "/cars", icon: CarFront },
  { label: "Explore Mauritius", to: "/tourism", icon: MapPin },
  { label: "About us", to: "/about-us", icon: Info },
  { label: "Support", to: "/support", icon: Phone },
  { label: "FAQ", to: "/support", icon: CircleHelp },
  { label: "Open a Ticket", to: "/support", icon: LifeBuoy },
  { label: "My Bookings", to: "/my-bookings", icon: FileText },
];

const currencies = [
  { code: "MUR", symbol: "Rs", name: "Mauritian Rupee" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "GBP", symbol: "£", name: "British Pound" },
];

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

function navClassName({ isActive }: { isActive: boolean }) {
  return isActive
    ? "text-blue-600 font-semibold bg-blue-50 rounded-xl px-4 py-2"
    : "text-slate-600 font-medium transition hover:text-blue-600 hover:bg-slate-50 rounded-xl px-4 py-2";
}

export default function Navbar({
  isAuthenticated = false,
  userRole,
  userName = "Guest",
  userAvatar,
  unreadNotifications = 0,
  onLogout,
  onThemeToggle,
  isDarkMode = false,
  onCurrencyChange,
  currentCurrency = "MUR",
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  
  const menuRef = useRef<HTMLDivElement | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Progress bar on route change
  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    onLogout?.();
    navigate("/login");
  };

  const liveBookingCounter = 142;

  const notifications = [
    { id: 1, title: "New booking #1234", time: "2 min ago", read: false },
    { id: 2, title: "Payment received", time: "1 hour ago", read: false },
    { id: 3, title: "Car returned #5678", time: "3 hours ago", read: true },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-lg"
          : "border-b border-slate-200 bg-white/90 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo with animated glow */}
        <Link to="/" className="flex min-w-0 items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300" />
            <img
              src="/am38-logo.png"
              alt="AM38 Rent a Car"
              className="relative h-12 w-auto rounded-xl border border-slate-200 bg-white p-1 group-hover:scale-105 transition"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              AM38 Rent a Car
            </p>
            <p className="truncate text-xs uppercase tracking-[0.28em] text-slate-400">
              Instant booking • Airport delivery
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 lg:flex">
          {menuItems.slice(0, 4).map((item) => (
            <NavLink key={item.to} to={item.to} className={navClassName}>
              {item.label}
            </NavLink>
          ))}

          {userRole === "admin" && (
            <NavLink to="/admin" className={navClassName}>
              Admin
            </NavLink>
          )}

          <Link
            to="/cars"
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-xl"
          >
            <Sparkles className="inline h-4 w-4 mr-2" />
            Book now
          </Link>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Live Booking Counter */}
          <div className="hidden md:flex items-center gap-2 bg-green-100 rounded-full px-3 py-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-green-800">{liveBookingCounter} cars available</span>
          </div>

          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-xl hover:bg-slate-100 transition"
          >
            <Search className="h-5 w-5 text-slate-600" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-xl hover:bg-slate-100 transition"
          >
            {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-slate-600" />}
          </button>

          {/* Currency Selector */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1 p-2 rounded-xl hover:bg-slate-100 transition"
            >
              <DollarSign className="h-5 w-5 text-slate-600" />
              <span className="text-sm font-medium">{currentCurrency}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {currencyOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border py-2 z-50">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onCurrencyChange?.(c.code);
                      setCurrencyOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-50 transition flex items-center gap-2"
                  >
                    <span className="font-medium">{c.symbol}</span> {c.code} - {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-1 p-2 rounded-xl hover:bg-slate-100 transition"
            >
              <Globe className="h-5 w-5 text-slate-600" />
              <ChevronDown className="h-3 w-3" />
            </button>
            {languageOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-2xl shadow-lg border py-2 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguageOpen(false)}
                    className="w-full px-4 py-2 text-left hover:bg-slate-50 transition flex items-center gap-2"
                  >
                    <span>{l.flag}</span> {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl hover:bg-slate-100 transition"
            >
              <Bell className="h-5 w-5 text-slate-600" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
            {notificationsOpen && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-lg border z-50">
                <div className="p-4 border-b">
                  <h3 className="font-black">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-4 border-b hover:bg-slate-50 transition ${!n.read ? "bg-blue-50" : ""}`}>
                      <p className="font-medium text-sm">{n.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t">
                  <button className="text-sm text-blue-600 font-medium w-full text-center">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-100 transition"
            >
              {userAvatar ? (
                <img src={userAvatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
              <span className="text-sm font-medium hidden md:inline">{userName.split("@")[0]}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {userMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border z-50">
                <div className="p-4 border-b">
                  <p className="font-black">{userName}</p>
                  <p className="text-xs text-slate-500 capitalize">{userRole || "guest"}</p>
                </div>
                <div className="py-2">
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition">
                    <User className="h-4 w-4" /> My Profile
                  </Link>
                  <Link to="/my-bookings" className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition">
                    <FileText className="h-4 w-4" /> My Bookings
                  </Link>
                  <Link to="/settings" className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition">
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  {userRole === "admin" && (
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition">
                      <Settings className="h-4 w-4" /> Admin Panel
                    </Link>
                  )}
                  <hr className="my-2" />
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 w-full transition">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Search Bar Dropdown */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-t bg-white p-4 shadow-lg"
          >
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for cars, destinations, or help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Mega Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-white overflow-hidden"
          >
            <div className="py-4 px-4 space-y-2 max-h-[80vh] overflow-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-4 text-slate-700 transition hover:bg-slate-50"
                  >
                    <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              {userRole === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-4 text-slate-700 transition hover:bg-slate-50"
                >
                  <div className="rounded-xl bg-purple-50 p-2 text-purple-600">
                    <Settings className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Admin Dashboard</span>
                </Link>
              )}
              <div className="border-t border-slate-200 mt-4 pt-4">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
                  <div className="rounded-xl bg-green-50 p-2 text-green-600">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Trusted local booking</p>
                    <p className="text-xs text-slate-500">Airport, hotel, and island delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}