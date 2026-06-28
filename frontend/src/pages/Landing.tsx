import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Plane,
  Phone,
  MessageCircle,
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Calendar,
  Trophy,
  Users,
  Headphones,
  HelpCircle,
  X,
  Compass,
  DollarSign,
  Globe,
  Sparkles,
  Crown,
  CheckCircle2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Luggage,
  Ticket,
  Building,
  ChevronRight,
  Mail,
} from "lucide-react";

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
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

const MAURITIUS_LOCATIONS = [
  { id: "ssr-airport", name: "SSR International Airport", type: "airport", region: "Plaine Magnien" },
  { id: "grand-baie", name: "Grand Baie", type: "tourist", region: "Rivière du Rempart" },
  { id: "flic-en-flac", name: "Flic en Flac", type: "beach", region: "Black River" },
  { id: "port-louis", name: "Port Louis", type: "city", region: "Port Louis" },
  { id: "curepipe", name: "Curepipe", type: "city", region: "Plaines Wilhems" },
  { id: "tamarin", name: "Tamarin", type: "beach", region: "Black River" },
  { id: "belle-mare", name: "Belle Mare", type: "beach", region: "Flacq" },
  { id: "le-morne", name: "Le Morne", type: "mountain", region: "Black River" },
  { id: "mahebourg", name: "Mahebourg", type: "town", region: "Grand Port" },
  { id: "blue-bay", name: "Blue Bay", type: "beach", region: "Grand Port" },
];

const AWARDS = [
  { name: "Discover Cars Excellence Award", year: "2023", icon: Trophy, desc: "Top Car Rental Partner" },
  { name: "Discover Cars Excellence Award", year: "2024", icon: Trophy, desc: "Outstanding Service" },
  { name: "Discover Cars Excellence Award", year: "2025", icon: Crown, desc: "Premium Partner" },
];

const PARTNERS = [
  { name: "Discover Cars", url: "https://www.discovercars.com", logo: "🚗", rating: 4.9 },
  { name: "CarJet", url: "https://www.carjet.com", logo: "✈️", rating: 4.8 },
  { name: "Rentilles", url: "https://www.rentilles.com", logo: "🏝️", rating: 4.9 },
  { name: "Booking.com", url: "https://www.booking.com", logo: "🏨", rating: 4.8 },
];

const PAYMENT_METHODS = [
  { name: "Visa", logo: "💳", bg: "bg-blue-100", text: "text-blue-700" },
  { name: "Mastercard", logo: "💳", bg: "bg-red-100", text: "text-red-700" },
  { name: "American Express", logo: "💳", bg: "bg-blue-100", text: "text-blue-700" },
  { name: "MCB Juice", logo: "🪙", bg: "bg-green-100", text: "text-green-700" },
  { name: "Bank Transfer", logo: "🏦", bg: "bg-gray-100", text: "text-gray-700" },
  { name: "Cash", logo: "💵", bg: "bg-yellow-100", text: "text-yellow-700" },
];

const REVIEWS = [
  { id: 1, name: "Emma Richardson", country: "UK", flag: "🇬🇧", rating: 5, text: "Booked before landing. The AM38 handover was ready at SSR Airport. Smooth process!", date: "March 2026" },
  { id: 2, name: "Daniel Schmidt", country: "Germany", flag: "🇩🇪", rating: 5, text: "Clear pricing, no hidden fees, fast WhatsApp support.", date: "February 2026" },
  { id: 3, name: "Naveen Kumar", country: "India", flag: "🇮🇳", rating: 5, text: "I booked while waiting for luggage. Delivery was instant.", date: "January 2026" },
  { id: 4, name: "Sophie Laurent", country: "France", flag: "🇫🇷", rating: 5, text: "Service impeccable! Voiture propre, personnel charmant.", date: "December 2025" },
  { id: 5, name: "Michael Chen", country: "China", flag: "🇨🇳", rating: 5, text: "Best rental experience. Car was spotless, pickup instant.", date: "November 2025" },
  { id: 6, name: "Isabella Rossi", country: "Italy", flag: "🇮🇹", rating: 5, text: "Servizio eccellente! L'auto era perfetta.", date: "October 2025" },
];

const PICKUP_STEPS = [
  { step: 1, title: "Choose Your Vehicle", desc: "150+ premium cars", icon: Car },
  { step: 2, title: "Share Arrival Details", desc: "Flight number & time", icon: Plane },
  { step: 3, title: "Meet at Airport", desc: "SSR Arrival Hall", icon: MapPin },
  { step: 4, title: "Drive Anywhere", desc: "Explore Mauritius freely", icon: Compass },
];

const FAQS = [
  { q: "What documents do I need?", a: "Valid driving license, passport/ID, credit card for deposit." },
  { q: "Is insurance included?", a: "Basic insurance included, excess reduction Rs 300/day." },
  { q: "Free cancellation?", a: "Free up to 24h before pickup." },
  { q: "Airport delivery?", a: "Yes, free delivery at SSR Airport arrival hall." },
  { q: "Anywhere delivery?", a: "Yes – hotels, villas, any location in Mauritius." },
  { q: "Payment methods?", a: "Visa, Mastercard, Amex, Bank Transfer, Cash, MCB Juice." },
  { q: "Minimum age?", a: "21 years with license held for 2+ years." },
  { q: "Fuel policy?", a: "Full-to-full – return with same fuel level." },
];

const worldCities = [
  { code: "MU", city: "Mauritius", tz: "Indian/Mauritius" },
  { code: "GB", city: "London", tz: "Europe/London" },
  { code: "US", city: "New York", tz: "America/New_York" },
  { code: "AE", city: "Dubai", tz: "Asia/Dubai" },
  { code: "JP", city: "Tokyo", tz: "Asia/Tokyo" },
  { code: "FR", city: "Paris", tz: "Europe/Paris" },
  { code: "AU", city: "Sydney", tz: "Australia/Sydney" },
];

function TermsPreview() {
  return (
    <section className="py-20 bg-black/45 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-950/78 backdrop-blur-2xl rounded-[32px] border border-white/20 p-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-black text-[#f8fbff] drop-shadow-[0_6px_24px_rgba(0,0,0,0.8)]">
              Terms & Conditions
            </h2>
            <p className="mt-4 text-cyan-100 text-lg font-black drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
              AM38 Mauritius Rental Policies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-slate-100 leading-relaxed">
            <div className="bg-black/55 rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="font-black text-xl mb-3 text-white">Rental Conditions</h3>
              <ul className="space-y-2 text-slate-100 font-medium">
                <li>• Driver must hold valid driving license.</li>
                <li>• Vehicle must be returned with same fuel level.</li>
                <li>• Vehicle must be returned in same condition.</li>
                <li>• Rental extension must be informed.</li>
                <li>• Vehicle abandonment is prohibited.</li>
              </ul>
            </div>

            <div className="bg-black/55 rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="font-black text-xl mb-3 text-white">Driver Responsibility</h3>
              <ul className="space-y-2 text-slate-100 font-medium">
                <li>• Driver is responsible under alcohol influence.</li>
                <li>• No reckless or illegal driving permitted.</li>
                <li>• Accident must be reported within 4 hours.</li>
                <li>• Damage responsibility applies where necessary.</li>
                <li>• Passenger transport restrictions apply.</li>
              </ul>
            </div>

            <div className="bg-black/55 rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="font-black text-xl mb-3 text-white">Airport & Insurance</h3>
              <ul className="space-y-2 text-slate-100 font-medium">
                <li>• Free SSR airport handover.</li>
                <li>• Driver waits during flight delays.</li>
                <li>• Insurance conditions apply.</li>
                <li>• Cyclone and Mauritius weather policies apply.</li>
                <li>• Jurisdiction: Republic of Mauritius.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="/pdfs/Legal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-red-500 text-white font-black shadow-2xl hover:scale-105 transition"
            >
              📄 View Full Legal Documents
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [pickupLocationSearch, setPickupLocationSearch] = useState("");
  const [returnLocationSearch, setReturnLocationSearch] = useState("");
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showReturnSuggestions, setShowReturnSuggestions] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("10:00");
  const [vehicleType, setVehicleType] = useState("any");
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [childSeat, setChildSeat] = useState(false);
  const [gps, setGps] = useState(false);
  const [additionalDriver, setAdditionalDriver] = useState(false);
  const [insurance, setInsurance] = useState("basic");
  const [promoCode, setPromoCode] = useState("");
  const [hotelDelivery, setHotelDelivery] = useState(false);
  const [priorityPickup, setPriorityPickup] = useState(false);
  const [flightDelayProtection, setFlightDelayProtection] = useState(false);
  const [terminal, setTerminal] = useState("main");
  const [specialRequests, setSpecialRequests] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [rentalDays, setRentalDays] = useState(0);
  const [basePricePerDay, setBasePricePerDay] = useState(0);
  const [extrasTotal, setExtrasTotal] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const [videoMuted, setVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [routeStarted, setRouteStarted] = useState(false);
  const [routeArrived, setRouteArrived] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [selectedLang, setSelectedLang] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("MUR");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const languages = ["English", "Français", "Deutsch", "Italiano"];
  const currencies = ["MUR", "EUR", "USD", "GBP"];

  // Generate 24-hour time options in 30-minute intervals
  const timeOptions = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hourStr = h.toString().padStart(2, '0');
      const minStr = m.toString().padStart(2, '0');
      timeOptions.push(`${hourStr}:${minStr}`);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const updateProgress = () => {
      if (!video.duration) return;
      const progress = video.currentTime / video.duration;
      setVideoProgress(progress);

      if (progress >= 0.995) {
        setVideoProgress(1);
        setRouteArrived(true);
        setIsVideoPlaying(false);
        video.pause();
      }
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const locationSuggestions = (search: string) =>
    MAURITIUS_LOCATIONS.filter(
      (loc) =>
        loc.name.toLowerCase().includes(search.toLowerCase()) ||
        loc.region.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 6);

  const calculatePriceEstimate = useCallback(() => {
    if (pickupDate && returnDate) {
      const startDate = new Date(pickupDate);
      const endDate = new Date(returnDate);
      
      // If return date is before pickup date, use 1 day minimum
      let days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      if (days < 1) days = 1;

      let basePrice = 1500; // economy default
      if (vehicleType === "luxury") basePrice = 3500;
      else if (vehicleType === "suv") basePrice = 2500;
      else if (vehicleType === "7seater") basePrice = 3000;
      else if (vehicleType === "economy") basePrice = 1200;
      else basePrice = 1500; // any

      let extras = 0;
      if (childSeat) extras += 200;
      if (gps) extras += 150;
      if (additionalDriver) extras += 300;
      if (hotelDelivery) extras += 500;
      if (priorityPickup) extras += 400;
      if (flightDelayProtection) extras += 350;

      setRentalDays(days);
      setBasePricePerDay(basePrice);
      setExtrasTotal(extras);
      setEstimatedPrice(days * basePrice + extras);
    } else {
      setRentalDays(0);
      setBasePricePerDay(0);
      setExtrasTotal(0);
      setEstimatedPrice(0);
    }
  }, [
    pickupDate,
    returnDate,
    vehicleType,
    childSeat,
    gps,
    additionalDriver,
    hotelDelivery,
    priorityPickup,
    flightDelayProtection,
  ]);

  useEffect(() => {
    calculatePriceEstimate();
  }, [calculatePriceEstimate]);

  const scrollToBooking = () =>
    document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" });

  const handleSearch = () => {
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);

      window.location.href = `/cars?search=${encodeURIComponent(
        JSON.stringify({
          pickupLocation,
          returnLocation,
          pickupDate,
          returnDate,
          pickupTime,
          returnTime,
          vehicleType,
          passengers,
          luggage,
          childSeat,
          gps,
          additionalDriver,
          insurance,
          hotelDelivery,
          priorityPickup,
          flightDelayProtection,
          terminal,
          specialRequests,
          currency: selectedCurrency,
          language: selectedLang,
        })
      )}`;
    }, 1000);
  };

  const selectLocation = (
    loc: { id: string; name: string; type: string; region: string },
    type: "pickup" | "return"
  ) => {
    if (type === "pickup") {
      setPickupLocation(loc.name);
      setPickupLocationSearch(loc.name);
      setShowPickupSuggestions(false);
    } else {
      setReturnLocation(loc.name);
      setReturnLocationSearch(loc.name);
      setShowReturnSuggestions(false);
    }
  };

  const openDriverTracking = () => {
    const token = localStorage.getItem("token");
    if (!token) setShowAuthModal(true);
    else setShowDriverModal(true);
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAuthModal(false);
    setShowDriverModal(true);
  };

  const startVideoAndRoute = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    video.currentTime = 0;
    setRouteStarted(true);
    setRouteArrived(false);
    setIsVideoPlaying(true);
    setVideoProgress(0);

    await video.play();
  };

  const pauseVideoAndRoute = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsVideoPlaying(false);
  };

  const toggleVideoPlay = () => {
    if (isVideoPlaying) {
      pauseVideoAndRoute();
    } else {
      startVideoAndRoute();
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoMuted;
    setVideoMuted(!videoMuted);
  };

  const mauritiusTime = currentTime.toLocaleTimeString("en-MU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      {/* FULLSCREEN VITARA BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/vitara_image.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        />
        <div className="absolute inset-0 bg-black/48" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/60 via-black/20 to-red-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
      </div>

      {/* Header Area with Language & Currency Controls */}
      <div className="relative z-40 max-w-[1600px] mx-auto px-6 pt-4">
        <div className="flex justify-end">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xl rounded-full border border-white/80 shadow-xl px-4 py-2">
            <button
              type="button"
              onClick={() => {
                setLanguageOpen(!languageOpen);
                setCurrencyOpen(false);
              }}
              className="flex items-center gap-1.5 px-2 py-1 rounded-full hover:bg-blue-50 transition text-sm font-semibold text-slate-700"
            >
              <Globe className="w-4 h-4 text-blue-600" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            <div className="w-px h-5 bg-slate-200" />

            <button
              type="button"
              onClick={() => {
                setCurrencyOpen(!currencyOpen);
                setLanguageOpen(false);
              }}
              className="flex items-center gap-1.5 px-2 py-1 rounded-full hover:bg-blue-50 transition text-sm font-semibold text-slate-700"
            >
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span>{selectedCurrency}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {languageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-blue-100 rounded-2xl shadow-2xl overflow-hidden z-[999] min-w-[140px]">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLanguageOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition text-sm text-slate-700 font-medium"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}

            {currencyOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-blue-100 rounded-2xl shadow-2xl overflow-hidden z-[999] min-w-[140px]">
                {currencies.map((cur) => (
                  <button
                    key={cur}
                    onClick={() => {
                      setSelectedCurrency(cur);
                      setCurrencyOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition text-sm text-slate-700 font-medium"
                  >
                    {cur}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen pt-8 overflow-hidden">
        <div className="relative z-20 max-w-[1600px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* AM38 Logo Next To Title */}
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 flex-wrap">
              <img 
                src="/am38-logo.png" 
                alt="AM38 Logo" 
                className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-[-0.04em] text-[#f8fbff] drop-shadow-[0_6px_28px_rgba(0,0,0,0.85)]">
                Drive Mauritius <br />
                <span className="bg-gradient-to-r from-cyan-100 via-white to-red-200 bg-clip-text text-transparent drop-shadow-[0_6px_28px_rgba(0,0,0,0.6)]">
                  with AM38
                </span>
              </h1>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/90 backdrop-blur-md px-5 py-2 text-sm font-black text-white border border-red-200/80 mb-6 shadow-[0_12px_40px_rgba(239,68,68,0.45)]">
              <Sparkles className="w-4 h-4" /> Your Virtual Car Rental Counter in Mauritius
            </div>

            <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mt-6 bg-black/38 backdrop-blur-md p-5 rounded-2xl border border-white/25 shadow-xl font-semibold">
              Trusted by locals and visitors for reliable, affordable and hassle-free car rental services in Mauritius.
              AM38 makes travelling simple from the moment you arrive.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={scrollToBooking}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-2xl font-black shadow-[0_10px_40px_rgba(37,99,235,0.45)] flex items-center gap-2"
              >
                <Car className="w-5 h-5" /> Book Your Car Now
              </motion.button>

              <Link
                to="/explore"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-2xl font-black shadow-[0_10px_40px_rgba(37,99,235,0.45)] flex items-center gap-2 hover:scale-105 transition"
              >
                <Compass className="w-5 h-5" /> Explore Mauritius
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-5">
              <div className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black shadow-xl border border-white/30">
                🌍 Anywhere Around The Island
              </div>

              <div className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-red-500 text-white font-black shadow-xl">
                ⚡ Online Booking Available 24/7
              </div>

              <div className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black shadow-xl border border-white/30">
                ✈ SSR Airport Delivery
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-2xl flex items-center justify-center text-2xl"
              >
                📍
              </motion.div>

              <p className="text-3xl md:text-5xl font-black bg-gradient-to-r from-cyan-100 via-white to-red-200 bg-clip-text text-transparent drop-shadow-[0_6px_20px_rgba(0,0,0,0.75)]">
                Land. Book. Go.
              </p>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-pink-500 shadow-2xl flex items-center justify-center text-2xl"
              >
                🚗
              </motion.div>
            </div>

            <div className="mt-10 flex justify-center">
              <div className="px-6 py-3 rounded-full bg-white/72 backdrop-blur-xl border border-white/70 shadow-xl">
                <p className="text-slate-900 font-black">🔥 27 Vehicles Booked Today</p>
              </div>
            </div>
          </motion.div>

          {/* BOOKING ENGINE */}
          <div id="booking-section" className="relative mt-6 lg:-mt-8 z-30 max-w-[1700px] mx-auto px-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-visible rounded-[40px] border border-white/80 bg-gradient-to-br from-white/95 via-blue-50/95 to-red-50/95 backdrop-blur-[30px] shadow-[0_40px_140px_rgba(37,99,235,0.22)] px-5 py-5 lg:px-8 lg:py-8"
            >
              <div className="absolute -top-24 -left-24 w-[320px] h-[320px] bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-[320px] h-[320px] bg-red-400/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-white/60 mb-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={openDriverTracking}
                      className="flex items-center gap-2 bg-green-500/30 border border-green-500/50 px-3 py-1.5 rounded-full hover:bg-green-500/40 text-sm font-bold text-green-800"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      LIVE SSR AIRPORT ARRIVALS
                    </button>

                    <button
                      onClick={openDriverTracking}
                      className="flex items-center gap-2 bg-blue-500/30 border border-blue-500/50 px-3 py-1.5 rounded-full hover:bg-blue-500/40 text-sm font-bold text-blue-800"
                    >
                      <Plane className="w-4 h-4" /> TRACK YOUR DRIVER
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    <div className="bg-white/70 border border-white/80 px-3 py-1.5 rounded-full shadow-sm">
                      <span className="text-slate-800 font-bold">🇲🇺 {mauritiusTime}</span>
                    </div>

                    <div className="bg-white/70 border border-white/80 px-3 py-1.5 rounded-full shadow-sm">
                      <span className="text-slate-800 font-bold">🚗 152 Cars Available</span>
                    </div>

                    <div className="bg-white/70 border border-white/80 px-3 py-1.5 rounded-full shadow-sm">
                      <span className="text-slate-800 font-bold">⚡ 8 Bookings Today</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-start">
                  <LocationInput
                    label="Pickup Location"
                    value={pickupLocationSearch}
                    setValue={setPickupLocationSearch}
                    show={showPickupSuggestions}
                    setShow={setShowPickupSuggestions}
                    suggestions={locationSuggestions(pickupLocationSearch)}
                    onSelect={(loc) => selectLocation(loc, "pickup")}
                  />

                  <LocationInput
                    label="Return Location"
                    value={returnLocationSearch}
                    setValue={setReturnLocationSearch}
                    show={showReturnSuggestions}
                    setShow={setShowReturnSuggestions}
                    suggestions={locationSuggestions(returnLocationSearch)}
                    onSelect={(loc) => selectLocation(loc, "return")}
                  />

                  {/* Pickup Date and Return Date stacked vertically */}
                  <div className="flex flex-col gap-3">
                    <InputBlock icon={Calendar} label="Pickup Date">
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="input-premium"
                      />
                    </InputBlock>

                    <InputBlock icon={Calendar} label="Return Date">
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="input-premium"
                      />
                    </InputBlock>
                  </div>

                  <InputBlock icon={Clock} label="Pickup Time">
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="input-premium"
                    >
                      {timeOptions.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </InputBlock>

                  <InputBlock icon={Clock} label="Return Time">
                    <select
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="input-premium"
                    >
                      {timeOptions.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </InputBlock>

                  <InputBlock icon={Car} label="Vehicle Class">
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="input-premium"
                    >
                      <option value="any">Any Vehicle (from Rs 1500/day)</option>
                      <option value="economy">Economy (Rs 1200/day)</option>
                      <option value="suv">SUV (Rs 2500/day)</option>
                      <option value="luxury">Luxury (Rs 3500/day)</option>
                      <option value="7seater">7-Seater (Rs 3000/day)</option>
                    </select>
                  </InputBlock>

                  <InputBlock icon={Users} label="Passengers">
                    <input
                      type="number"
                      min="1"
                      max="8"
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="input-premium"
                    />
                  </InputBlock>

                  <InputBlock icon={Luggage} label="Luggage">
                    <input
                      type="number"
                      min="0"
                      max="6"
                      value={luggage}
                      onChange={(e) => setLuggage(Number(e.target.value))}
                      className="input-premium"
                    />
                  </InputBlock>

                  <CheckBox id="childSeat" checked={childSeat} onChange={setChildSeat} label="Child Seat (+Rs 200/day)" />
                  <CheckBox id="gps" checked={gps} onChange={setGps} label="GPS Navigation (+Rs 150/day)" />
                  <CheckBox id="addDriver" checked={additionalDriver} onChange={setAdditionalDriver} label="Additional Driver (+Rs 300/day)" />

                  <InputBlock icon={ShieldCheck} label="Insurance">
                    <select
                      value={insurance}
                      onChange={(e) => setInsurance(e.target.value)}
                      className="input-premium"
                    >
                      <option value="basic">Basic (included)</option>
                      <option value="full">Full Coverage (+Rs 500/day)</option>
                      <option value="premium">Premium Zero Excess (+Rs 800/day)</option>
                    </select>
                  </InputBlock>

                  <InputBlock icon={Ticket} label="Promo Code">
                    <input
                      type="text"
                      placeholder="SAVE10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="input-premium"
                    />
                  </InputBlock>

                  <CheckBox id="hotelDelivery" checked={hotelDelivery} onChange={setHotelDelivery} label="Hotel / Villa Delivery (+Rs 500)" />
                  <CheckBox id="priorityPickup" checked={priorityPickup} onChange={setPriorityPickup} label="Airport Priority Pickup (+Rs 400)" />
                  <CheckBox id="delayProtection" checked={flightDelayProtection} onChange={setFlightDelayProtection} label="Flight Delay Protection (+Rs 350)" />

                  <InputBlock icon={Building} label="Terminal">
                    <select
                      value={terminal}
                      onChange={(e) => setTerminal(e.target.value)}
                      className="input-premium"
                    >
                      <option value="main">Main Terminal</option>
                      <option value="domestic">Domestic Terminal</option>
                      <option value="private">Private Jet Terminal</option>
                    </select>
                  </InputBlock>

                  <div className="lg:col-span-2">
                    <label className="label-premium">
                      <MessageCircle className="w-3 h-3 text-blue-600" /> Special Requests
                    </label>

                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Any special requirements?"
                      className="input-premium resize-none"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="w-full h-[58px] bg-gradient-to-r from-blue-600 via-cyan-500 to-red-500 text-white rounded-2xl font-black text-lg tracking-wide shadow-[0_18px_60px_rgba(37,99,235,0.4)] hover:scale-[1.02] transition-all disabled:opacity-70"
                    >
                      {isSearching ? (
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto" />
                      ) : (
                        "SEARCH VEHICLES →"
                      )}
                    </button>
                  </div>
                </div>

                {estimatedPrice > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-xl border border-white/80"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <span className="text-slate-800 font-medium">💰 AI Estimated Price:</span>

                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <span className="text-3xl font-black text-blue-700">
                          {selectedCurrency} {estimatedPrice}
                        </span>
                      </motion.div>

                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-700 text-xs">Live Pricing</span>
                      </div>
                    </div>

                    {/* Detailed pricing breakdown */}
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="bg-white/50 rounded-lg p-2 text-center">
                        <p className="text-slate-500 text-xs">Rental Days</p>
                        <p className="font-bold text-slate-800">{rentalDays} days</p>
                      </div>
                      <div className="bg-white/50 rounded-lg p-2 text-center">
                        <p className="text-slate-500 text-xs">Base/Day</p>
                        <p className="font-bold text-slate-800">{selectedCurrency} {basePricePerDay}</p>
                      </div>
                      <div className="bg-white/50 rounded-lg p-2 text-center">
                        <p className="text-slate-500 text-xs">Extras Total</p>
                        <p className="font-bold text-slate-800">{selectedCurrency} {extrasTotal}</p>
                      </div>
                      <div className="bg-blue-100/70 rounded-lg p-2 text-center border border-blue-200">
                        <p className="text-slate-500 text-xs">Total</p>
                        <p className="font-bold text-blue-700">{selectedCurrency} {estimatedPrice}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-600" /> Free cancellation
                  </span>

                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-600" /> Best price guaranteed
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-600" /> Instant confirmation
                  </span>

                  <span className="flex items-center gap-1">
                    <Headphones className="w-3 h-3 text-blue-600" /> 24/7 support
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-24 flex justify-center pb-12 relative">
          <h2 className="relative text-center text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.12em] bg-gradient-to-r from-cyan-100 via-white to-red-200 bg-clip-text text-transparent drop-shadow-[0_6px_28px_rgba(0,0,0,0.75)]">
            AM38 AT YOUR SERVICE SINCE 2013
          </h2>
        </div>
      </section>

      {/* PICKUP STEPS */}
      <Section title="Your Pick-Up Process" subtitle="See how quick it is!">
        <div className="grid md:grid-cols-4 gap-6">
          {PICKUP_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-slate-950/78 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:bg-slate-900/90 transition-all shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/30 to-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-10 h-10 text-cyan-200" />
              </div>

              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                {step.step}
              </div>

              <h3 className="font-black text-2xl text-white mb-2">{step.title}</h3>
              <p className="text-slate-100 text-base font-semibold">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* VIDEO + SYNCED MAP */}
      <section className="py-24 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative rounded-[36px] overflow-hidden border border-white/25 shadow-[0_35px_120px_rgba(0,0,0,0.45)] bg-black/45 backdrop-blur-md">
              <video
                ref={videoRef}
                muted={videoMuted}
                playsInline
                controls
                className="w-full h-[500px] object-cover"
                poster="/vitara_image.jpg"
              >
                <source src="/am38-drive.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              {!isVideoPlaying && (
                <button
                  onClick={startVideoAndRoute}
                  className="absolute inset-0 flex items-center justify-center z-20"
                >
                  <div className="w-24 h-24 rounded-full bg-white/22 backdrop-blur-xl border border-white/35 flex items-center justify-center shadow-2xl hover:scale-110 transition">
                    <Play className="w-12 h-12 text-white ml-1" />
                  </div>
                </button>
              )}

              <div className="absolute top-5 left-5 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-black shadow-xl flex items-center gap-2 z-30">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE DRIVER DELIVERY
              </div>

              <div className="absolute bottom-6 left-6 flex gap-3 z-30">
                <button
                  onClick={toggleVideoPlay}
                  className="bg-white/90 backdrop-blur p-3 rounded-full shadow-xl"
                >
                  {isVideoPlaying ? (
                    <Pause className="w-5 h-5 text-slate-800" />
                  ) : (
                    <Play className="w-5 h-5 text-slate-800" />
                  )}
                </button>

                <button
                  onClick={toggleVideoMute}
                  className="bg-white/90 backdrop-blur p-3 rounded-full shadow-xl"
                >
                  {videoMuted ? (
                    <VolumeX className="w-5 h-5 text-slate-800" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-slate-800" />
                  )}
                </button>

                <button
                  onClick={() => videoRef.current?.requestFullscreen?.()}
                  className="bg-white/90 backdrop-blur px-4 py-3 rounded-full shadow-xl text-slate-900 font-black text-sm"
                >
                  ⛶
                </button>
              </div>

              {routeArrived && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute bottom-6 right-6 bg-green-500 text-white px-5 py-4 rounded-2xl shadow-2xl z-30"
                >
                  <p className="font-black text-lg">✅ Driver Arrived</p>
                  <p className="text-sm text-white/90">Welcome to AM38 Mauritius</p>
                </motion.div>
              )}
            </div>

            <div className="relative rounded-[36px] overflow-hidden border border-white/25 shadow-[0_35px_120px_rgba(37,99,235,0.28)] bg-black/35 backdrop-blur-xl p-5">
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-black text-xs shadow-lg">
                  ● LIVE ROUTE
                </div>

                <div className="bg-white text-slate-700 px-4 py-2 rounded-full font-black text-xs shadow-lg">
                  SSR Airport → AM38 Office
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full font-black text-xs shadow-lg">
                  GOOGLE MAP
                </div>
              </div>

              <div className="relative h-[500px] rounded-[28px] overflow-hidden border border-white/25 shadow-inner">
                <iframe
                  title="AM38 Route"
                  src="https://maps.google.com/maps?saddr=Sir%20Seewoosagur%20Ramgoolam%20International%20Airport%2C%20Mauritius&daddr=Plaine%20Magnien%2C%20Mauritius&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />

                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 10 73 C 20 65, 31 58, 42 50 S 62 35, 77 26"
                    fill="none"
                    stroke="rgba(34,211,238,0.95)"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                </svg>

                <div className="absolute top-5 right-5 z-40 flex flex-col gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white/95 text-slate-900 font-black shadow-xl">+</button>
                  <button className="w-10 h-10 rounded-xl bg-white/95 text-slate-900 font-black shadow-xl">−</button>
                </div>

                <div className="absolute left-5 top-5 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl max-w-[230px] z-40">
                  <p className="font-black text-slate-900">
                    {routeArrived ? "Driver Arrived" : isVideoPlaying ? "Driver En Route" : "Ready To Start"}
                  </p>
                  <p className="text-sm text-slate-600">SSR Airport to AM38 Office</p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-blue-50 rounded-xl p-2">
                      <p className="text-xs text-slate-500">Distance</p>
                      <p className="font-black text-blue-700">{routeArrived ? "0 km" : `${Math.max(0, 3 - videoProgress * 3).toFixed(1)} km`}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-2">
                      <p className="text-xs text-slate-500">ETA</p>
                      <p className="font-black text-green-700">{routeArrived ? "Arrived" : `${Math.max(0, Math.ceil(5 - videoProgress * 5))} min`}</p>
                    </div>
                  </div>
                </div>

                {routeStarted && (
                  <motion.div
                    style={{
                      left: `${9 + Math.min(videoProgress, 1) * 68}%`,
                      top: `${70 - Math.min(videoProgress, 1) * 46}%`,
                    }}
                    className="absolute z-30 transition-all duration-150 linear"
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 bg-cyan-400/40 blur-xl rounded-full" />
                      <div className="relative text-5xl drop-shadow-2xl">🚗</div>
                    </div>
                  </motion.div>
                )}

                {/* SSR Airport Pin - Clear visible */}
                <div className="absolute left-[9%] top-[70%] z-20">
                  <div className="relative">
                    <div className="w-7 h-7 bg-blue-600 rounded-full border-4 border-white shadow-xl animate-pulse" />
                    <div className="absolute -inset-2 bg-blue-500/30 rounded-full blur-md" />
                  </div>
                  <p className="mt-1 font-black text-white text-xs drop-shadow-lg bg-black/60 px-2 py-0.5 rounded">SSR Airport</p>
                </div>

                {/* AM38 Office Pin - Clear visible */}
                <div className="absolute left-[77%] top-[24%] z-20">
                  <div className="relative">
                    <div className="w-7 h-7 bg-red-500 rounded-full border-4 border-white shadow-xl animate-pulse" />
                    <div className="absolute -inset-2 bg-red-500/30 rounded-full blur-md" />
                  </div>
                  <p className="mt-1 font-black text-white text-xs drop-shadow-lg bg-black/60 px-2 py-0.5 rounded">AM38 Office</p>
                </div>

                {routeArrived && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute bottom-6 right-6 bg-green-500 text-white px-5 py-4 rounded-2xl shadow-2xl z-40"
                  >
                    <p className="font-black text-lg">✅ We Arrived</p>
                    <p className="text-sm text-white/90">Destination reached safely</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS with Google Rating 4.9/5 */}
      <Section title="🏆 Award-Winning Excellence" subtitle="Recognized for outstanding service in Mauritius 2023–2025">
        <div className="grid md:grid-cols-3 gap-8">
          {AWARDS.map((award, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-950/78 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.48)]"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <award.icon className="w-10 h-10 text-cyan-200" />
              </div>

              <p className="font-black text-2xl text-white">{award.name}</p>
              <p className="text-3xl font-black text-cyan-200 mt-1">{award.year}</p>
              <p className="text-base text-slate-100 mt-2 font-semibold">{award.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Google Rating 4.9/5 in award center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/24px-Google_%22G%22_Logo.svg.png" 
              alt="Google" 
              className="h-8 w-8"
            />
            <span className="text-white font-black text-2xl">Google Rating</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-5xl font-black text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">4.9/5</span>
          </div>
          <p className="text-yellow-200 font-semibold text-lg mt-2">⭐ Based on 10,000+ reviews</p>
        </motion.div>
      </Section>

      {/* Trusted Partners - Brighter background */}
      <section className="py-20 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-cyan-900/40 backdrop-blur-sm border-y border-white/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-[#f8fbff] drop-shadow-[0_6px_24px_rgba(0,0,0,0.8)] mb-4">
              🤝 Our Trusted Partners
            </h2>

            <p className="text-cyan-100 font-black text-xl mb-12 drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
              Book with confidence
            </p>

            <div className="flex flex-wrap justify-center gap-8">
              {PARTNERS.map((p, idx) => (
                <motion.a
                  key={idx}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="bg-white/90 backdrop-blur border border-white/90 rounded-2xl p-8 min-w-[180px] shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="text-6xl mb-3">{p.logo}</div>
                  <p className="font-black text-2xl text-slate-900">{p.name}</p>

                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-slate-700 text-lg">{p.rating}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <ShieldCheck className="w-10 h-10 text-green-300 drop-shadow-lg" />
              <h2 className="text-4xl font-black text-[#f8fbff] drop-shadow-[0_6px_24px_rgba(0,0,0,0.8)]">
                Secure Payments
              </h2>
            </div>

            <p className="text-white text-lg mb-6 font-semibold drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
              Multiple methods accepted
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {PAYMENT_METHODS.map((m, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className={`${m.bg} ${m.text} px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md`}
                >
                  <span className="text-3xl">{m.logo}</span>
                  <span>{m.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live World Clock - Brighter cards */}
      <Section title="Live World Clock" subtitle="We serve customers worldwide, 24/7">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
          {worldCities.map((city, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white/95 backdrop-blur border border-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all"
            >
              <p className="text-slate-500 text-sm font-black">{city.code}</p>
              <p className="text-slate-900 font-black text-xl">{city.city}</p>

              <p className="text-blue-700 font-black text-2xl mt-3 tracking-wide">
                {new Intl.DateTimeFormat("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: city.tz,
                }).format(currentTime)}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* REVIEWS */}
      <section className="py-20 bg-black/22 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <h2 className="text-5xl font-black text-[#f8fbff] drop-shadow-[0_6px_24px_rgba(0,0,0,0.8)]">
              What Our Customers Say
            </h2>

            <p className="text-cyan-100 font-black text-xl mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
              4.9/5 from 10k+ reviews on Google
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-slate-950/72 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-red-500 rounded-full flex items-center justify-center text-white font-black text-2xl">
                    {review.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-black text-white text-lg">{review.name}</p>
                    <p className="text-slate-300 text-base">
                      {review.flag} {review.country}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-slate-100 text-base leading-relaxed font-medium">"{review.text}"</p>
                <p className="text-slate-400 text-sm mt-3">{review.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Clickable cards routing to /faq */}
      <Section title="Frequently Asked Questions" subtitle="Find answers to common questions about renting with AM38">
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {FAQS.map((faq, idx) => (
            <Link
              key={idx}
              to="/faq"
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.5)" }}
                className="bg-black/78 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] cursor-pointer transition-all"
              >
                <p className="font-black text-white text-lg mb-2 flex items-start gap-2">
                  <HelpCircle className="w-6 h-6 text-cyan-300 flex-shrink-0" /> {faq.q}
                </p>

                <p className="text-slate-100 text-base pl-8 font-medium">{faq.a}</p>
                
                <div className="mt-3 text-right">
                  <span className="text-cyan-300 text-sm font-bold inline-flex items-center gap-1">
                    View Answer <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-red-500 text-white font-black text-lg rounded-2xl shadow-2xl hover:scale-105 transition-all"
          >
            ❓ Visit Full FAQ Page <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </Section>

      <TermsPreview />

      {/* LEGAL LINKS BAR */}
      <section className="py-10 bg-black/55 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 text-base">
            <a href="/pdfs/condition.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-100 font-black hover:text-white hover:scale-105 transition drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              Terms & Conditions
            </a>

            <a href="/pdfs/Legal.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-100 font-black hover:text-white hover:scale-105 transition drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              Privacy Policy
            </a>

            <a href="/pdfs/refund.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-100 font-black hover:text-white hover:scale-105 transition drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              Refund Policy
            </a>

            <a href="/pdfs/Amendments.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-100 font-black hover:text-white hover:scale-105 transition drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              GDPR
            </a>

            <a href="/pdfs/Legal.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-100 font-black hover:text-white hover:scale-105 transition drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              Legal Information
            </a>
          </div>
        </div>
      </section>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a href="https://wa.me/23058357166" className="bg-green-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition">
          <MessageCircle className="w-6 h-6" />
        </a>

        <a href="tel:+23058357166" className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition">
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {/* MOBILE BOOK BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-xl border-t border-white/80 px-4 py-3 lg:hidden">
        <button
          onClick={scrollToBooking}
          className="w-full bg-gradient-to-r from-blue-600 to-red-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
        >
          <Car className="w-5 h-5" /> Book Now
        </button>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showDriverModal && (
          <Modal onClose={() => setShowDriverModal(false)} title="Live Driver Tracking">
            <div className="h-48 bg-slate-100 rounded-xl mb-4 overflow-hidden border border-slate-200 flex items-center justify-center">
              <p className="text-slate-500">Live map preview</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-100 rounded-xl p-3">
                <p className="text-slate-600">Driver</p>
                <p className="text-slate-800 font-bold">Rajesh Kumar</p>
              </div>

              <div className="bg-slate-100 rounded-xl p-3">
                <p className="text-slate-600">Vehicle</p>
                <p className="text-slate-800 font-bold">Suzuki Vitara (Blue)</p>
              </div>

              <div className="bg-slate-100 rounded-xl p-3">
                <p className="text-slate-600">ETA to Airport</p>
                <p className="text-blue-600 font-bold text-xl">5 min</p>
              </div>

              <div className="bg-slate-100 rounded-xl p-3">
                <p className="text-slate-600">Status</p>
                <p className="text-green-600 font-bold">Approaching</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2 text-xs text-slate-500 justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live GPS • Updated 2s ago
            </div>
          </Modal>
        )}

        {showAuthModal && (
          <Modal onClose={() => setShowAuthModal(false)} title="Login Required">
            <p className="text-slate-600 text-center mb-6">
              Please login to track your driver or book a vehicle.
            </p>

            <form onSubmit={handleAuth} className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-800"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-800"
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-bold shadow-md"
              >
                Login / Register
              </button>
            </form>

            <div className="text-center mt-4">
              <Link to="/register" className="text-blue-600 text-sm">
                Create new account
              </Link>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <style>{`
        .input-premium {
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(219,234,254,0.9);
          border-radius: 0.75rem;
          color: #1e293b;
          outline: none;
          font-size: 0.95rem;
        }

        .input-premium:focus {
          box-shadow: 0 0 0 2px rgba(59,130,246,0.45);
          border-color: #93c5fd;
        }

        .label-premium {
          font-size: 0.72rem;
          font-weight: 800;
          color: #334155;
          margin-bottom: 0.3rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 1024px) {
          #booking-section { margin-top: 2rem !important; }
        }
      `}</style>
    </div>
  );
}

function InputBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label-premium">
        <Icon className="w-3 h-3 text-blue-600" /> {label}
      </label>
      {children}
    </div>
  );
}

function CheckBox({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 py-1">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-blue-600"
      />

      <label htmlFor={id} className="text-slate-800 text-sm font-medium cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
}

function LocationInput({
  label,
  value,
  setValue,
  show,
  setShow,
  suggestions,
  onSelect,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  show: boolean;
  setShow: (v: boolean) => void;
  suggestions: { id: string; name: string; type: string; region: string }[];
  onSelect: (loc: { id: string; name: string; type: string; region: string }) => void;
}) {
  return (
    <div className="relative">
      <label className="label-premium">
        <MapPin className="w-3 h-3 text-blue-600" /> {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setShow(true);
        }}
        placeholder="SSR Airport"
        className="input-premium"
      />

      <AnimatePresence>
        {show && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white/98 backdrop-blur-md rounded-xl border border-white/80 z-[200] max-h-60 overflow-auto shadow-xl"
          >
            {suggestions.map((loc) => (
              <button
                key={loc.id}
                onClick={() => onSelect(loc)}
                className="w-full px-3 py-2.5 text-left hover:bg-blue-50 text-slate-800 flex items-center gap-2 text-sm"
              >
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" /> {loc.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-20 bg-black/18 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-[#f8fbff] drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)]">
            {title}
          </h2>

          <p className="bg-gradient-to-r from-cyan-100 via-white to-red-200 bg-clip-text text-transparent font-black text-xl mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </section>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 border border-blue-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-black text-slate-800">{title}</h3>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {children}
      </motion.div>
    </motion.div>
  );
}