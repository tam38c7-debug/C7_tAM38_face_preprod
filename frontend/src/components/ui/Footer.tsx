import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/am38-logo.png"
              alt="AM38 Rent a Car"
              className="h-14 w-auto rounded-xl border border-slate-200 bg-white p-1"
            />
            <div>
              <p className="text-lg font-black text-slate-900">AM38 Rent a Car</p>
              <p className="text-sm text-slate-500">
                Instant booking • Instant delivery
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Modern Mauritius car rental with transparent pricing, airport pickup,
            hotel delivery, and quick local support.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#ef3027]">
            Explore
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <div><Link to="/" className="text-slate-600 transition hover:text-slate-950">Home</Link></div>
            <div><Link to="/cars" className="text-slate-600 transition hover:text-slate-950">Vehicles</Link></div>
            <div><Link to="/about-us" className="text-slate-600 transition hover:text-slate-950">About us</Link></div>
            <div><Link to="/support" className="text-slate-600 transition hover:text-slate-950">Support</Link></div>
            <div><Link to="/my-bookings" className="text-slate-600 transition hover:text-slate-950">My bookings</Link></div>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#ef3027]">
            Why AM38
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div>Unlimited mileage</div>
            <div>Low deposit</div>
            <div>No hidden fees</div>
            <div>Claim follow-up</div>
            <div>Friendly staff</div>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#ef3027]">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#165db8]" />
              +230 000 0000
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#165db8]" />
              support@am38.com
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#165db8]" />
              Mauritius
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-4 text-center text-sm text-slate-500">
        © AM38 Rent a Car. All rights reserved.
      </div>
    </footer>
  );
}




