import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Download,
  Eye,
  MessageSquare,
  Calendar,
  Car,
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { fetchAPI } from "@/lib/api";

interface Booking {
  id: number;
  reference: string;
  customer_name: string;
  fullName?: string;
  email: string;
  phone: string;
  make: string;
  model: string;
  plate_number?: string;
  status: string;
  payment_status: string;
  start_datetime: string;
  end_datetime: string;
  total_amount: number;
  final_price?: number;
  total_price?: number;
  internal_notes?: string;
  created_at: string;
  pickup_location?: string;
  dropoff_location?: string;
}

export default function AdminReservations() {
  const { formatPrice } = useCurrency();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadBookings() {
    setRefreshing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/bookings`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load bookings:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function patchBooking(id: number | string, status: string) {
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/admin/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        status,
        internal_notes: notes[String(id)] || "",
      }),
    });
    await loadBookings();
  }

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const hay = [
        b.reference,
        b.customer_name,
        b.fullName,
        b.email,
        b.phone,
        b.make,
        b.model,
        b.plate_number,
        b.status,
        b.payment_status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchSearch = hay.includes(search.toLowerCase());
      const matchStatus = filterStatus === "all" || b.status?.toLowerCase() === filterStatus.toLowerCase();
      const matchPayment = filterPayment === "all" || b.payment_status?.toLowerCase() === filterPayment.toLowerCase();

      return matchSearch && matchStatus && matchPayment;
    });
  }, [bookings, search, filterStatus, filterPayment]);

  const totalRevenue = useMemo(() => {
    return filteredBookings.reduce((sum, b) => {
      const amount = Number(b.final_price || b.total_price || b.total_amount || 0);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  }, [filteredBookings]);

  const stats = useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    completed: bookings.filter(b => b.status === "completed").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
    paid: bookings.filter(b => b.payment_status === "paid").length,
    unpaid: bookings.filter(b => b.payment_status === "unpaid").length,
  }), [bookings]);

  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s === "confirmed") return "bg-green-100 text-green-700 border-green-200";
    if (s === "pending") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (s === "completed") return "bg-blue-100 text-blue-700 border-blue-200";
    if (s === "cancelled") return "bg-red-100 text-red-700 border-red-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getPaymentBadge = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s === "paid") return "bg-green-100 text-green-700";
    if (s === "partial") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[28px] border border-gray-200 p-6 shadow-sm"
        >
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Reservations Command Center
              </h1>
              <p className="text-gray-500 mt-1">Manage all bookings, update status, and track revenue</p>
            </div>
            <button
              onClick={loadBookings}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
            >
              <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <StatCard title="Total" value={stats.total} color="blue" />
          <StatCard title="Pending" value={stats.pending} color="yellow" />
          <StatCard title="Confirmed" value={stats.confirmed} color="green" />
          <StatCard title="Completed" value={stats.completed} color="blue" />
          <StatCard title="Cancelled" value={stats.cancelled} color="red" />
          <StatCard title="Paid" value={stats.paid} color="green" />
          <StatCard title="Unpaid" value={stats.unpaid} color="red" />
        </div>

        {/* Revenue Summary */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <TrendingUp size={24} className="text-emerald-600" />
              <div>
                <p className="text-sm text-emerald-600 font-medium">Total Revenue (Filtered)</p>
                <p className="text-2xl font-black text-emerald-700">{formatPrice(totalRevenue)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <span>Based on {filteredBookings.length} bookings</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                placeholder="Search booking / customer / car / plate..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="partial">Partial</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredBookings.map((booking, idx) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: idx * 0.03 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap justify-between gap-4">
                  {/* Left Section */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm uppercase tracking-wider font-bold text-red-600">
                        {booking.reference || `BK-${booking.id}`}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(booking.status)}`}>
                        {booking.status || "pending"}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getPaymentBadge(booking.payment_status)}`}>
                        {booking.payment_status || "unpaid"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Car size={18} className="text-gray-400" />
                      <span className="text-xl font-black text-gray-900">
                        {booking.make} {booking.model}
                      </span>
                      {booking.plate_number && (
                        <span className="text-sm text-gray-500">• {booking.plate_number}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={16} className="text-gray-400" />
                      <span>{booking.customer_name || booking.fullName || "-"}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                      {booking.email && (
                        <div className="flex items-center gap-1">
                          <Mail size={14} />
                          <span>{booking.email}</span>
                        </div>
                      )}
                      {booking.phone && (
                        <div className="flex items-center gap-1">
                          <Phone size={14} />
                          <span>{booking.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="text-right">
                    <div className="text-2xl font-black text-red-600">
                      {formatPrice(Number(booking.total_amount || booking.final_price || 0))}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Created: {new Date(booking.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Date Grid */}
                <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} /> Pickup
                    </div>
                    <div className="font-semibold text-gray-900">
                      {booking.start_datetime || "-"}
                    </div>
                    {booking.pickup_location && (
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin size={10} /> {booking.pickup_location}
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} /> Dropoff
                    </div>
                    <div className="font-semibold text-gray-900">
                      {booking.end_datetime || "-"}
                    </div>
                    {booking.dropoff_location && (
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin size={10} /> {booking.dropoff_location}
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-semibold text-gray-900">
                      {(() => {
                        const start = new Date(booking.start_datetime);
                        const end = new Date(booking.end_datetime);
                        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                        return `${days} day${days !== 1 ? 's' : ''}`;
                      })()}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <DollarSign size={12} /> Per Day
                    </div>
                    <div className="font-semibold text-gray-900">
                      {formatPrice(Number(booking.total_amount) / Math.max(1, (() => {
                        const start = new Date(booking.start_datetime);
                        const end = new Date(booking.end_datetime);
                        return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                      })()))}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <textarea
                  value={notes[String(booking.id)] || booking.internal_notes || ""}
                  onChange={(e) =>
                    setNotes((prev) => ({ ...prev, [String(booking.id)]: e.target.value }))
                  }
                  placeholder="Internal notes (visible to staff only)"
                  className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  rows={2}
                />

                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowDetailsModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition text-sm font-medium"
                  >
                    <Eye size={16} /> Details
                  </button>
                  <button
                    onClick={() => patchBooking(booking.id, "confirmed")}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-xl text-white hover:bg-emerald-700 transition text-sm font-medium"
                  >
                    <CheckCircle size={16} /> Confirm
                  </button>
                  <button
                    onClick={() => patchBooking(booking.id, "completed")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition text-sm font-medium"
                  >
                    <CheckCircle size={16} /> Complete
                  </button>
                  <button
                    onClick={() => patchBooking(booking.id, "cancelled")}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-xl text-white hover:bg-red-700 transition text-sm font-medium"
                  >
                    <XCircle size={16} /> Cancel
                  </button>
                  <button
                    onClick={() => patchBooking(booking.id, "pending")}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 rounded-xl text-white hover:bg-amber-700 transition text-sm font-medium"
                  >
                    <Clock size={16} /> Reopen
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredBookings.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <AlertCircle size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-400">No bookings found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-xl font-black">Booking Details</h2>
                <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XCircle size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Reference</label>
                    <p className="font-medium">{selectedBooking.reference || `BK-${selectedBooking.id}`}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Status</label>
                    <p className={`font-medium ${getStatusBadge(selectedBooking.status)} inline-block px-2 py-0.5 rounded-full text-xs`}>
                      {selectedBooking.status}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Customer Name</label>
                    <p className="font-medium">{selectedBooking.customer_name || selectedBooking.fullName || "-"}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Email</label>
                    <p className="font-medium">{selectedBooking.email || "-"}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Phone</label>
                    <p className="font-medium">{selectedBooking.phone || "-"}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Vehicle</label>
                    <p className="font-medium">{selectedBooking.make} {selectedBooking.model}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Plate Number</label>
                    <p className="font-medium">{selectedBooking.plate_number || "-"}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Total Amount</label>
                    <p className="font-medium text-red-600">{formatPrice(Number(selectedBooking.total_amount || selectedBooking.final_price || 0))}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <label className="text-xs text-gray-500">Internal Notes</label>
                  <p className="text-sm text-gray-600 mt-1">{selectedBooking.internal_notes || "No notes"}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
  };
  return (
    <div className={`rounded-xl p-4 text-center ${colors[color as keyof typeof colors] || colors.blue}`}>
      <div className="text-2xl font-black">{value}</div>
      <div className="text-xs uppercase tracking-wide">{title}</div>
    </div>
  );
}