import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-white/10 mt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-14">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.45)]">
                <span className="text-white font-black text-3xl">A</span>
              </div>
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">AM38</h2>
                <p className="text-xs tracking-[0.35em] text-cyan-300/60 font-bold">MAURITIUS MOBILITY</p>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed">
              Premium Mauritius airport rental platform with intelligent booking, airport delivery and 24/7 support since 2013.
            </p>
            <div className="flex gap-4 mt-8">
              {[Facebook, Instagram, Twitter, Globe].map((Icon, index) => (
                <div key={index} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer">
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black mb-6 text-white">Navigation</h3>
            <div className="space-y-4 text-white/60">
              <Link to="/" className="block hover:text-cyan-300 transition-all duration-300">Home</Link>
              <Link to="/cars" className="block hover:text-cyan-300 transition-all duration-300">Fleet</Link>
              <Link to="/explore" className="block hover:text-cyan-300 transition-all duration-300">Explore</Link>
              <Link to="/partners" className="block hover:text-cyan-300 transition-all duration-300">Partners</Link>
              <Link to="/faq" className="block hover:text-cyan-300 transition-all duration-300">FAQ</Link>
              <Link to="/support" className="block hover:text-cyan-300 transition-all duration-300">Support</Link>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black mb-6 text-white">Why AM38</h3>
            <div className="space-y-4 text-white/60">
              <p>✓ Airport Delivery</p>
              <p>✓ Premium Fleet</p>
              <p>✓ Fast Booking</p>
              <p>✓ Smart Mobility</p>
              <p>✓ 24/7 WhatsApp</p>
              <p>✓ Mauritius Experts</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black mb-6 text-white">Contact</h3>
            <div className="space-y-5 text-white/60">
              <div className="flex gap-3 items-start"><Phone className="w-5 h-5 text-cyan-300 mt-1" /> +230 5835 7166</div>
              <div className="flex gap-3 items-start"><Mail className="w-5 h-5 text-cyan-300 mt-1" /> support@am38.com</div>
              <div className="flex gap-3 items-start"><MapPin className="w-5 h-5 text-cyan-300 mt-1" /> Plaine Magnien, Mauritius</div>
              <div className="flex gap-3 items-start"><MessageCircle className="w-5 h-5 text-cyan-300 mt-1" /> WhatsApp Support 24/7</div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-white/40 text-sm">
          <p>© 2026 AM38 Mauritius Mobility. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link to="/terms" className="hover:text-cyan-300 transition-all">Terms</Link>
            <Link to="/privacy" className="hover:text-cyan-300 transition-all">Privacy</Link>
            <Link to="/support" className="hover:text-cyan-300 transition-all">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}