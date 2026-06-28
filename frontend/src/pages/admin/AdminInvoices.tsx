import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  XCircle,
  CheckCircle2,
  ReceiptText,
  Download,
  RefreshCw,
  Search,
  CreditCard,
  AlertTriangle,
  Eye,
  Printer,
  Mail,
  DollarSign,
} from "lucide-react";
import { fetchAPI } from "@/lib/api";

type InvoiceRow = {
  id: number;
  booking_id?: number | null;
  invoice_number?: string;
  invoiceNumber?: string;
  customer_name?: string;
  customerName?: string;
  customer_email?: string;
  customerEmail?: string;
  total_amount?: number | string;
  totalMUR?: number | string;
  status?: string;
  created_at?: string;
  payment_method?: string;
  due_date?: string;
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function money(value: any) {
  const n = Number(value || 0);
  return n.toLocaleString("en-MU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " MUR";
}

function invoiceTone(status: string) {
  const s = String(status || "").toLowerCase();
  if (s === "paid") return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (s === "issued") return "bg-sky-100 text-sky-800 border-sky-200";
  if (s === "cancelled") return "bg-rose-100 text-rose-800 border-rose-200";
  if (s === "overdue") return "bg-red-100 text-red-800 border-red-200";
  return "bg-amber-100 text-amber-800 border-amber-200";
}

function getInvoiceNumber(inv: InvoiceRow) {
  return inv.invoice_number || inv.invoiceNumber || `AM38-INV-${String(inv.id).padStart(6, "0")}`;
}

function getCustomerName(inv: InvoiceRow) {
  return inv.customer_name || inv.customerName || "Customer";
}

function getCustomerEmail(inv: InvoiceRow) {
  return inv.customer_email || inv.customerEmail || "-";
}

function getTotal(inv: InvoiceRow) {
  return Number(inv.total_amount ?? inv.totalMUR ?? 0);
}

function pdfUrl(id: number) {
  const token = localStorage.getItem("token");
  return `${API_BASE}/invoices/${id}/pdf${token ? `?token=${encodeURIComponent(token)}` : ""}`;
}

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRow | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAPI("/invoices");
      setInvoices(Array.isArray(data) ? data : data?.data || []);
    } catch (err: any) {
      setError(err?.message || "Failed to load invoices");
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  }

  async function updateInvoiceStatus(id: number, nextStatus: string) {
    try {
      await fetchAPI(`/invoices/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      await loadInvoices();
    } catch (err: any) {
      alert(err?.message || "Invoice update failed");
    }
  }

  async function sendInvoiceEmail(id: number) {
    try {
      await fetchAPI(`/invoices/${id}/email`, { method: "POST" });
      alert("Invoice sent successfully!");
    } catch (err: any) {
      alert("Failed to send invoice");
    }
  }

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      const hay = [
        getInvoiceNumber(inv),
        getCustomerName(inv),
        getCustomerEmail(inv),
        inv.status,
        inv.booking_id,
      ]
        .join(" ")
        .toLowerCase();
      const matchSearch = hay.includes(query.toLowerCase());
      const matchStatus = status === "all" || String(inv.status || "").toLowerCase() === status;
      return matchSearch && matchStatus;
    });
  }, [invoices, query, status]);

  const summary = useMemo(() => ({
    total: invoices.length,
    draft: invoices.filter((i) => String(i.status).toLowerCase() === "draft").length,
    issued: invoices.filter((i) => String(i.status).toLowerCase() === "issued").length,
    paid: invoices.filter((i) => String(i.status).toLowerCase() === "paid").length,
    cancelled: invoices.filter((i) => String(i.status).toLowerCase() === "cancelled").length,
    overdue: invoices.filter((i) => String(i.status).toLowerCase() === "overdue").length,
    value: invoices.reduce((sum, inv) => sum + getTotal(inv), 0),
  }), [invoices]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading invoices...</p>
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
              <p className="text-sm font-semibold uppercase tracking-wide text-red-600">Admin finance</p>
              <h1 className="text-3xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Invoices and payment control
              </h1>
              <p className="text-gray-500 mt-1">
                Manage AM38 invoices, payment states, PDF downloads, and booking-linked financial records.
              </p>
            </div>
            <button
              onClick={loadInvoices}
              className="flex items-center gap-2 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-gray-800 transition"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard title="Total" value={summary.total} icon={ReceiptText} color="blue" />
          <StatCard title="Draft" value={summary.draft} icon={FileText} color="gray" />
          <StatCard title="Issued" value={summary.issued} icon={Mail} color="sky" />
          <StatCard title="Paid" value={summary.paid} icon={CheckCircle2} color="green" />
          <StatCard title="Overdue" value={summary.overdue} icon={AlertTriangle} color="red" />
          <StatCard title="Cancelled" value={summary.cancelled} icon={XCircle} color="rose" />
        </div>

        {/* Portfolio Value Banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <DollarSign size={24} className="text-emerald-600" />
              <div>
                <p className="text-sm text-emerald-600 font-medium">Portfolio Value</p>
                <p className="text-2xl font-black text-emerald-700">{money(summary.value)}</p>
              </div>
            </div>
            <div className="text-sm text-emerald-600">
              Based on {summary.total} invoices
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search invoice, customer, email, booking..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="all">All statuses</option>
              <option value="draft">Draft</option>
              <option value="issued">Issued</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Invoices List */}
        {!error && filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <ReceiptText size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400">No invoices found</p>
          </div>
        )}

        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map((inv, idx) => {
              const invoiceNumber = getInvoiceNumber(inv);
              const total = getTotal(inv);
              const currentStatus = String(inv.status || "draft").toLowerCase();

              return (
                <motion.div
                  key={inv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.03 }}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-wrap justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-wider font-bold text-red-600">
                        {invoiceNumber}
                      </p>
                      <h2 className="mt-2 text-2xl font-black text-gray-900">
                        {getCustomerName(inv)}
                      </h2>
                      <div className="mt-1 text-sm text-gray-500">
                        {getCustomerEmail(inv)}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${invoiceTone(currentStatus)}`}>
                          {currentStatus}
                        </span>
                        <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-semibold text-gray-700">
                          Booking #{inv.booking_id || "-"}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">Total due</div>
                      <div className="mt-1 text-3xl font-black text-gray-900">
                        {money(total)}
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        Created: {inv.created_at ? new Date(inv.created_at).toLocaleDateString() : "-"}
                      </div>
                      {inv.due_date && (
                        <div className="text-xs text-gray-400">
                          Due: {new Date(inv.due_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setSelectedInvoice(inv);
                        setShowDetailsModal(true);
                      }}
                      className="flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-200 transition"
                    >
                      <Eye className="h-4 w-4" />
                      Details
                    </button>
                    <button
                      onClick={() => updateInvoiceStatus(inv.id, "issued")}
                      className="flex items-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700 transition"
                    >
                      <FileText className="h-4 w-4" />
                      Issue
                    </button>
                    <button
                      onClick={() => updateInvoiceStatus(inv.id, "paid")}
                      className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Mark Paid
                    </button>
                    <button
                      onClick={() => sendInvoiceEmail(inv.id)}
                      className="flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 transition"
                    >
                      <Mail className="h-4 w-4" />
                      Send Email
                    </button>
                    <button
                      onClick={() => updateInvoiceStatus(inv.id, "cancelled")}
                      className="flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-3 text-sm font-bold text-white hover:bg-rose-700 transition"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel
                    </button>
                    <a
                      href={pdfUrl(inv.id)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-gray-800 transition"
                    >
                      <Download className="h-4 w-4" />
                      PDF
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedInvoice && (
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
                <h2 className="text-xl font-black">Invoice Details</h2>
                <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XCircle size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Invoice Number</label>
                    <p className="font-medium">{getInvoiceNumber(selectedInvoice)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Status</label>
                    <p className="font-medium">{selectedInvoice.status}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Customer Name</label>
                    <p className="font-medium">{getCustomerName(selectedInvoice)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Customer Email</label>
                    <p className="font-medium">{getCustomerEmail(selectedInvoice)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Booking ID</label>
                    <p className="font-medium">#{selectedInvoice.booking_id || "-"}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Total Amount</label>
                    <p className="font-medium text-red-600">{money(getTotal(selectedInvoice))}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Created At</label>
                    <p className="font-medium">{selectedInvoice.created_at ? new Date(selectedInvoice.created_at).toLocaleString() : "-"}</p>
                  </div>
                  {selectedInvoice.payment_method && (
                    <div>
                      <label className="text-xs text-gray-500">Payment Method</label>
                      <p className="font-medium">{selectedInvoice.payment_method}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    sky: "bg-sky-50 text-sky-600",
    gray: "bg-gray-50 text-gray-600",
    rose: "bg-rose-50 text-rose-600",
  };
  return (
    <div className={`rounded-xl p-4 ${colors[color] || colors.blue}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-black">{value.toLocaleString()}</div>
          <div className="text-xs uppercase tracking-wide mt-1">{title}</div>
        </div>
        <Icon size={24} className="opacity-50" />
      </div>
    </div>
  );
}