import { useState } from "react";
import { FileText, Download, Shield, Globe, Clock, Trash2, AlertTriangle } from "lucide-react";

const retentionPolicies = [
  { country: "European Union", retentionYears: 3, deletionNote: "Data deleted after 3 years of inactivity, except where legal retention required." },
  { country: "Mauritius (Data Protection Act 2017)", retentionYears: 5, deletionNote: "Retained for 5 years for contractual and accounting purposes." },
  { country: "United Kingdom", retentionYears: 3, deletionNote: "GDPR-aligned, 3-year inactivity deletion." },
  { country: "United States", retentionYears: 4, deletionNote: "Varies by state; standard 4-year retention." },
  { country: "Australia", retentionYears: 3, deletionNote: "Privacy Act 1988 – 3 years." },
  { country: "India", retentionYears: 3, deletionNote: "IT Act 2000 – 3 years." },
];

const laws = [
  "GDPR (EU) 2016/679 – applies to all EU citizens' data.",
  "Mauritius Data Protection Act 2017 – local data protection law.",
  "UK GDPR – retained EU law post-Brexit.",
  "California Consumer Privacy Act (CCPA) – for California residents.",
  "Personal Information Protection and Electronic Documents Act (PIPEDA) – Canada.",
  "Lei Geral de Proteção de Dados (LGPD) – Brazil."
];

export default function GDPR() {
  const requestDeletion = () => {
    window.location.href = "/support?category=gdpr&title=GDPR%20Delete%20My%20Data";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-black mb-4 flex items-center gap-3"><Shield className="text-red-600" size={36} />GDPR & Data Protection</h1>
          <p className="text-gray-600 mb-6">AM38 Rent a Car is committed to protecting your personal data. This page explains how we collect, use, store, and delete your information in compliance with the General Data Protection Regulation (GDPR) (EU) 2016/679, the Mauritius Data Protection Act 2017, and other applicable laws.</p>

          {/* Rights */}
          <div className="bg-blue-50 p-4 rounded-xl mb-6">
            <h2 className="font-black text-lg">📌 Your Rights Under GDPR</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Right to access your data</li><li>Right to rectification</li><li>Right to erasure (“right to be forgotten”)</li>
              <li>Right to restrict processing</li><li>Right to data portability</li><li>Right to object to automated decision-making</li>
            </ul>
          </div>

          {/* Laws */}
          <h2 className="text-2xl font-black mt-8 mb-4 flex items-center gap-2"><Globe size={20} /> Applicable Laws</h2>
          <ul className="list-disc pl-5 mb-6 text-sm text-gray-700">{laws.map((law, i) => <li key={i}>{law}</li>)}</ul>

          {/* Retention table */}
          <h2 className="text-2xl font-black mt-8 mb-4 flex items-center gap-2"><Clock size={20} /> Data Retention by Country</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-100"><tr><th className="p-2 text-left">Country / Region</th><th className="p-2 text-left">Retention Period</th><th className="p-2 text-left">Notes</th></tr></thead>
              <tbody>{retentionPolicies.map((p, i) => <tr key={i} className="border-t"><td className="p-2">{p.country}</td><td className="p-2">{p.retentionYears} years</td><td className="p-2 text-xs">{p.deletionNote}</td></tr>)}</tbody>
            </table>
          </div>

          {/* Deletion request */}
          <h2 className="text-2xl font-black mt-8 mb-4 flex items-center gap-2"><Trash2 size={20} /> Request data deletion</h2>
          <p className="mb-4">If you wish to have all your personal data removed from our systems, please click the button below. A support ticket will be created, and our data protection officer will process your request within 30 days.</p>
          <button onClick={requestDeletion} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition">Request deletion of my data →</button>

          {/* Downloadable PDFs */}
          <div className="mt-8 bg-gray-100 p-4 rounded-xl text-sm">
            <h3 className="font-black">📄 Downloadable Legal Documents</h3>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              <a href="/pdfs/privacy-policy.pdf" className="flex items-center gap-2 text-blue-600 hover:underline"><Download size={16} /> Privacy Policy (PDF)</a>
              <a href="/pdfs/terms-of-service.pdf" className="flex items-center gap-2 text-blue-600 hover:underline"><Download size={16} /> Terms of Service (PDF)</a>
              <a href="/pdfs/cookie-policy.pdf" className="flex items-center gap-2 text-blue-600 hover:underline"><Download size={16} /> Cookie Policy (PDF)</a>
              <a href="/pdfs/data-processing-agreement.pdf" className="flex items-center gap-2 text-blue-600 hover:underline"><Download size={16} /> Data Processing Agreement (PDF)</a>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            Last updated: May 2026 • For questions, contact dpo@am38.com
          </div>
        </div>
      </div>
    </div>
  );
}


