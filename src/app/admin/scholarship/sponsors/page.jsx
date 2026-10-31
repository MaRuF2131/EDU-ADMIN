
"use client";
import { useState } from "react";

const initialSponsors = [
  {
    id: "SPN-001",
    name: "ABC Foundation",
    type: "NGO",
    contact: "info@abcfoundation.org",
    phone: "+880 1712345678",
    contribution: 500000,
    status: "Active",
  },
  {
    id: "SPN-002",
    name: "XYZ Corporation",
    type: "Corporate",
    contact: "hr@xyzcorp.com",
    phone: "+880 1812345678",
    contribution: 800000,
    status: "Active",
  },
  {
    id: "SPN-003",
    name: "Education Welfare Trust",
    type: "Trust",
    contact: "contact@ewt.org",
    phone: "+880 1912345678",
    contribution: 350000,
    status: "Active",
  },
  {
    id: "SPN-004",
    name: "Government Education Board",
    type: "Government",
    contact: "support@education.gov.bd",
    phone: "+880 9612345678",
    contribution: 1200000,
    status: "Inactive",
  },
];

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState(initialSponsors);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    type: "NGO",
    contact: "",
    phone: "",
    contribution: "",
  });

  const addSponsor = (e) => {
    e.preventDefault();

    if (!form.name || !form.contact) return;

    setSponsors((prev) => [
      ...prev,
      {
        id: `SPN-${String(prev.length + 1).padStart(3, "0")}`,
        ...form,
        contribution: Number(form.contribution) || 0,
        status: "Active",
      },
    ]);

    setForm({
      name: "",
      type: "NGO",
      contact: "",
      phone: "",
      contribution: "",
    });

    setShowForm(false);
  };

  const filtered = sponsors.filter((s) =>
    `${s.name} ${s.id} ${s.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Scholarship Sponsors
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage funding organizations and scholarship partners
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          + Add Sponsor
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          ["Total Sponsors", sponsors.length, "bg-blue-50 border-blue-200 text-blue-700"],
          ["Active Sponsors", sponsors.filter((s) => s.status === "Active").length, "bg-green-50 border-green-200 text-green-700"],
          ["Total Contribution", `৳${sponsors.reduce((sum, s) => sum + s.contribution, 0).toLocaleString("en-BD")}`, "bg-purple-50 border-purple-200 text-purple-700"],
          ["NGO & Corporate", sponsors.filter((s) => ["NGO", "Corporate"].includes(s.type)).length, "bg-orange-50 border-orange-200 text-orange-700"],
        ].map(([label, value, color]) => (
          <div key={label} className={`p-4 rounded-lg border ${color}`}>
            <p className="text-xs font-medium opacity-80">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <form onSubmit={addSponsor} className="bg-white rounded-lg border border-slate-200 p-5 mb-6">
          <h2 className="font-bold text-slate-700 mb-4">Add New Sponsor</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input required placeholder="Organization Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />

            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
              {["NGO", "Corporate", "Government", "Trust", "Individual"].map((type) => <option key={type}>{type}</option>)}
            </select>

            <input required type="email" placeholder="Email Address" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />

            <input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />

            <input type="number" min="0" placeholder="Contribution Amount (BDT)" value={form.contribution} onChange={(e) => setForm({ ...form, contribution: e.target.value })} className="px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save Sponsor</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row justify-between gap-3">
          <h2 className="font-bold text-slate-700">All Sponsors</h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sponsor..."
            className="px-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {["Organization", "Type", "Email", "Phone", "Contribution", "Status", "Action"].map((heading) => (
                  <th key={heading} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase whitespace-nowrap">{heading}</th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.map((sponsor) => (
                <tr key={sponsor.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{sponsor.name}</p>
                    <p className="text-xs text-slate-400">{sponsor.id}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{sponsor.type}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{sponsor.contact}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{sponsor.phone || "—"}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-700 whitespace-nowrap">৳{sponsor.contribution.toLocaleString("en-BD")}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${sponsor.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{sponsor.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSponsors((prev) => prev.map((s) => s.id === sponsor.id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s))}
                      className="text-xs text-blue-600 font-medium"
                    >
                      {sponsor.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-sm text-slate-400">No sponsors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
