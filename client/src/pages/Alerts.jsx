import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "https://first-responders-alert-platform.onrender.com";

const TYPES   = ["All", "Road Accident", "Medical Emergency", "Fire Accident", "Flood Rescue", "Crime Alert", "Other"];
const STATUSES = ["All", "Pending", "Ongoing", "Completed"];
const SEVERITIES = ["All", "Critical", "High", "Medium", "Low"];

function getSeverity(type = "") {
  const t = type.toLowerCase();
  if (t.includes("fire") || t.includes("explosion")) return "Critical";
  if (t.includes("accident") || t.includes("crime"))  return "High";
  if (t.includes("medical") || t.includes("flood"))   return "Medium";
  return "Low";
}

function typeIcon(type = "") {
  const t = type.toLowerCase();
  if (t.includes("fire"))     return "🔥";
  if (t.includes("medical"))  return "🚑";
  if (t.includes("accident")) return "🚗";
  if (t.includes("flood"))    return "🌊";
  if (t.includes("crime"))    return "🚔";
  return "⚠️";
}

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/* ── Skeleton Card ──────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="h-5 w-32 rounded-lg animate-shimmer" />
        <div className="h-5 w-20 rounded-lg animate-shimmer" />
      </div>
      <div className="h-4 w-full rounded-lg animate-shimmer" />
      <div className="h-4 w-3/4 rounded-lg animate-shimmer" />
      <div className="h-4 w-1/2 rounded-lg animate-shimmer" />
      <div className="h-10 w-full rounded-xl animate-shimmer mt-1" />
    </div>
  );
}

/* ── Incident Card ──────────────────────────────── */
function IncidentCard({ req, onUpdateStatus }) {
  const severity = getSeverity(req.emergencyType);
  const sevClass = {
    Critical: "severity-critical", High: "severity-high",
    Medium: "severity-medium", Low: "severity-low",
  }[severity];
  const statusClass = {
    Pending: "status-pending", Ongoing: "status-responding", Completed: "status-resolved",
  }[req.status] || "status-pending";

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-3 hover:border-white/15 hover:bg-white/5 transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{typeIcon(req.emergencyType)}</span>
          <h3 className="font-bold text-base leading-tight group-hover:text-red-400 transition-colors">
            {req.emergencyType}
          </h3>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${statusClass}`}>
          {req.status === "Ongoing" ? "Responding" : req.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{req.description}</p>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
        <span>📍 {req.location?.slice(0, 60)}{req.location?.length > 60 ? "…" : ""}</span>
        <span>⏰ {timeAgo(req.createdAt)}</span>
      </div>

      {/* Severity + Status row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${sevClass}`}>
          {severity}
        </span>
        {req.latitude && req.longitude && (
          <a
            href={`https://maps.google.com/?q=${req.latitude},${req.longitude}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs px-2.5 py-1 rounded-full bg-blue-600/15 text-blue-400 border border-blue-500/30 hover:bg-blue-600/25 transition-colors"
          >
            📌 View on Map
          </a>
        )}
      </div>

      {/* Action */}
      {req.status !== "Completed" && (
        <button
          onClick={() => onUpdateStatus(req._id)}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
            req.status === "Pending"
              ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20"
              : "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20"
          }`}
        >
          {req.status === "Pending" ? "🚀 Start Response" : "✅ Mark Resolved"}
        </button>
      )}
      {req.status === "Completed" && (
        <div className="w-full py-2.5 rounded-xl text-sm font-semibold text-center bg-green-600/10 text-green-400 border border-green-500/20">
          ✅ Resolved
        </div>
      )}
    </div>
  );
}

/* ── Main Alerts Page ───────────────────────────── */
function Alerts() {
  const [requests, setRequests]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [showAlert, setShowAlert]   = useState(false);
  const prevCount = useState(0);

  const fetchRequests = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/requests`);
      if (res.data.length > prevCount[0] && prevCount[0] !== 0) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);
      }
      prevCount[0] = res.data.length;
      setRequests(res.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
    const t = setInterval(fetchRequests, 10000);
    return () => clearInterval(t);
  }, [fetchRequests]);

  const handleUpdateStatus = async (id) => {
    const req = requests.find((r) => r._id === id);
    const next = req.status === "Pending" ? "Ongoing" : "Completed";
    try {
      await axios.put(`${API}/api/requests/${id}`, { status: next });
      fetchRequests();
    } catch (e) { console.log(e); }
  };

  /* ── Filtering ── */
  const filtered = requests.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.emergencyType.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q);
    const matchType   = typeFilter === "All"     || r.emergencyType === typeFilter;
    const matchStatus = statusFilter === "All"   || r.status === statusFilter;
    const matchSev    = severityFilter === "All" || getSeverity(r.emergencyType) === severityFilter;
    const matchDate   = !dateFilter || new Date(r.createdAt).toLocaleDateString("en-CA") === dateFilter;
    return matchSearch && matchType && matchStatus && matchSev && matchDate;
  });

  const active    = requests.filter((r) => r.status === "Pending").length;
  const responding = requests.filter((r) => r.status === "Ongoing").length;
  const resolved  = requests.filter((r) => r.status === "Completed").length;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">
            Live <span className="gradient-text">Incident Feed</span>
          </h1>
          <p className="text-gray-400">Real-time emergency reports from your area — auto-refreshes every 10 seconds</p>
        </div>

        {/* New alert banner */}
        {showAlert && (
          <div className="mb-6 px-5 py-4 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-300 font-semibold flex items-center gap-3 animate-fade-up">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            🚨 New emergency report received!
          </div>
        )}

        {/* Status summary strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-red-400">{active}</div>
            <div className="text-xs text-gray-500 mt-1">Active</div>
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse mt-2" />
          </div>
          <div className="glass-card rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-orange-400">{responding}</div>
            <div className="text-xs text-gray-500 mt-1">Responding</div>
            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full animate-pulse mt-2" />
          </div>
          <div className="glass-card rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-green-400">{resolved}</div>
            <div className="text-xs text-gray-500 mt-1">Resolved</div>
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2" />
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="glass-card rounded-2xl p-4 mb-8 flex flex-col gap-3">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
            <input
              id="alert-search"
              type="text"
              placeholder="Search by type, location, or description…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900/80 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-red-500/50 transition-colors"
            />
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap gap-3">
            {/* Type */}
            <select
              id="filter-type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-gray-900/80 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 outline-none focus:border-red-500/50 cursor-pointer"
            >
              {TYPES.map((t) => <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>)}
            </select>

            {/* Severity */}
            <select
              id="filter-severity"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-gray-900/80 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 outline-none focus:border-red-500/50 cursor-pointer"
            >
              {SEVERITIES.map((s) => <option key={s} value={s}>{s === "All" ? "All Severities" : s}</option>)}
            </select>

            {/* Status */}
            <select
              id="filter-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-900/80 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 outline-none focus:border-red-500/50 cursor-pointer"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>)}
            </select>

            {/* Date */}
            <input
              id="filter-date"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-gray-900/80 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 outline-none focus:border-red-500/50 cursor-pointer"
            />

            {/* Clear */}
            {(search || typeFilter !== "All" || statusFilter !== "All" || severityFilter !== "All" || dateFilter) && (
              <button
                onClick={() => { setSearch(""); setTypeFilter("All"); setStatusFilter("All"); setSeverityFilter("All"); setDateFilter(""); }}
                className="px-4 py-2 rounded-xl text-xs font-medium text-red-400 border border-red-500/30 hover:bg-red-600/10 transition-colors"
              >
                ✕ Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-gray-500 mb-5">
            Showing <span className="text-white font-semibold">{filtered.length}</span> of {requests.length} incidents
          </p>
        )}

        {/* Cards Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-600">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg font-medium">No incidents match your filters</p>
            <p className="text-sm mt-2">Try adjusting or clearing filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r) => (
              <IncidentCard key={r._id} req={r} onUpdateStatus={handleUpdateStatus} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Alerts;
