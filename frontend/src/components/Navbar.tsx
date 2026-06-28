import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Car,
  Menu,
  X,
  User,
  LogOut,
  ShieldCheck,
  Globe,
  DollarSign,
  CheckCircle2,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { lang, setLang, availableLanguages } = useLang();
  const { currency, setCurrency } = useCurrency();

  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Fleet", path: "/cars" },
    { label: "Explore", path: "/explore" },
    { label: "Partners", path: "/partners" },
    { label: "FAQ", path: "/faq" },
    { label: "About", path: "/about" },
    { label: "Support", path: "/support" },
  ];

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang as any);
    setLanguageOpen(false);
    
    if (newLang === "fr") {
      setCurrency("EUR");
    } else if (newLang === "en") {
      setCurrency("GBP");
    }
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    setCurrencyOpen(false);
  };

  const getLanguageLabel = (code: string) => {
    const map: Record<string, string> = {
      en: "English",
      fr: "Français",
    };
    return map[code] || code;
  };

  const getCurrencyFlag = (cur: string) => {
    const map: Record<string, string> = {
      MUR: "🇲🇺",
      EUR: "🇫🇷",
      GBP: "🇬🇧",
      USD: "🇺🇸",
    };
    return map[cur] || "💰";
  };

  const getLanguageFlag = (code: string) => {
    const map: Record<string, string> = {
      en: "🇬🇧",
      fr: "🇫🇷",
    };
    return map[code] || "🌐";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999]">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl border-b border-white/10" />

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-blue-600 via-white to-red-500 p-[2px] shadow-2xl">
            <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
              <Car className="text-white w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="text-white font-black text-xl tracking-wide">
              AM38
            </div>

            <div className="text-white/60 text-[10px] uppercase tracking-[0.3em]">
              Mauritius
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-2 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  active
                    ? "bg-white text-black shadow-xl"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setLanguageOpen(!languageOpen);
                setCurrencyOpen(false);
              }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-sm flex items-center gap-1.5 shadow-lg hover:scale-105 transition"
            >
              <Globe className="w-4 h-4" />
              {getLanguageFlag(lang)}
              <span>{getLanguageLabel(lang)}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            
            {languageOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white rounded-2xl shadow-2xl overflow-hidden z-[999] min-w-[160px] border border-blue-100">
                {availableLanguages.map((langOption) => (
                  <button
                    key={langOption.code}
                    onClick={() => handleLanguageChange(langOption.code)}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition text-sm text-slate-700 font-medium flex items-center gap-2"
                  >
                    <span>{langOption.flag}</span>
                    <span>{langOption.name}</span>
                    {lang === langOption.code && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setCurrencyOpen(!currencyOpen);
                setLanguageOpen(false);
              }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-sm flex items-center gap-1.5 shadow-lg hover:scale-105 transition"
            >
              <DollarSign className="w-4 h-4" />
              {getCurrencyFlag(currency)}
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            
            {currencyOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white rounded-2xl shadow-2xl overflow-hidden z-[999] min-w-[140px] border border-blue-100">
                {["MUR", "EUR", "GBP", "USD"].map((cur) => (
                  <button
                    key={cur}
                    onClick={() => handleCurrencyChange(cur)}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition text-sm text-slate-700 font-medium flex items-center gap-2"
                  >
                    <span>{getCurrencyFlag(cur)}</span>
                    <span>{cur}</span>
                    {currency === cur && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT SIDE - SPOTLIGHT + AUTH - ALWAYS VISIBLE */}
        <div className="flex items-center gap-3">
          {/* SEARCH BUTTON - ALWAYS VISIBLE (NOT hidden) */}
          <button
            onClick={() => {
              console.log("Search clicked!");
              document.dispatchEvent(new CustomEvent("open-spotlight"));
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white hidden sm:inline">Search</span>
          </button>
          
          {/* Login/Register - Desktop only */}
          <div className="hidden lg:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-2xl border border-white/20 text-white hover:bg-white/10 font-bold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-6 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-red-500 text-white font-black shadow-xl"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 border border-white/10">
                  <User className="w-4 h-4 text-white" />
                  <span className="text-white font-semibold text-sm">
                    {user?.full_name || user?.email}
                  </span>
                  {user?.role === "admin" && (
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  )}
                </div>

                <button
                  onClick={logout}
                  className="px-5 py-2 rounded-2xl bg-red-500 text-white font-bold flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
        >
          <div className="p-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="text-white font-bold"
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setLanguageOpen(!languageOpen);
                  setCurrencyOpen(false);
                }}
                className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-sm flex items-center justify-between shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {getLanguageFlag(lang)} {getLanguageLabel(lang)}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {languageOpen && (
                <div className="mt-1 bg-white rounded-2xl shadow-2xl overflow-hidden z-[999] border border-blue-100">
                  {availableLanguages.map((langOption) => (
                    <button
                      key={langOption.code}
                      onClick={() => {
                        handleLanguageChange(langOption.code);
                        setOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition text-sm text-slate-700 font-medium flex items-center gap-2"
                    >
                      <span>{langOption.flag}</span>
                      <span>{langOption.name}</span>
                      {lang === langOption.code && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Currency Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setCurrencyOpen(!currencyOpen);
                  setLanguageOpen(false);
                }}
                className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-sm flex items-center justify-between shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {getCurrencyFlag(currency)} {currency}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {currencyOpen && (
                <div className="mt-1 bg-white rounded-2xl shadow-2xl overflow-hidden z-[999] border border-blue-100">
                  {["MUR", "EUR", "GBP", "USD"].map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        handleCurrencyChange(cur);
                        setOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition text-sm text-slate-700 font-medium flex items-center gap-2"
                    >
                      <span>{getCurrencyFlag(cur)}</span>
                      <span>{cur}</span>
                      {currency === cur && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setOpen(false);
                document.dispatchEvent(new CustomEvent("open-spotlight"));
              }}
              className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <Search className="w-4 h-4" />
              Search...
            </button>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="px-5 py-3 rounded-2xl border border-white/20 text-white hover:bg-white/10 font-bold text-center"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-red-500 text-white font-black shadow-xl text-center"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="px-5 py-3 rounded-2xl bg-red-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}