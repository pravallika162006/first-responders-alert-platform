import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const timeline = [
  { year: "2024", title: "Platform Concept", desc: "Identified critical gaps in emergency communication systems across India." },
  { year: "2024 Q3", title: "Development Began", desc: "Built core alert system with React, Node.js, and MongoDB." },
  { year: "2025", title: "Live Map Integration", desc: "Added Leaflet real-time incident tracking and GPS location." },
  { year: "2025 Q2", title: "AI Severity Detection", desc: "Integrated AI-based classification for triage prioritization." },
];

const techStack = [
  { name: "React 19", icon: "⚛️", desc: "Frontend UI" },
  { name: "Node.js / Express", icon: "🟢", desc: "Backend API" },
  { name: "MongoDB", icon: "🍃", desc: "Database" },
  { name: "Leaflet Maps", icon: "🗺️", desc: "Live Map" },
  { name: "JWT Auth", icon: "🔐", desc: "Security" },
  { name: "Recharts", icon: "📊", desc: "Analytics" },
];

function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-sm font-medium mb-6">
            🚨 Built for Every Community Across India
          </div>
          <h1 className="text-5xl font-black mb-5">
            About <span className="gradient-text">ResQ Alert</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            A real-time emergency coordination platform connecting citizens, police,
            ambulance services, and fire departments — built to save lives faster.
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-red-400">🎯 Our Mission</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Emergency response in India often suffers from communication delays, lack of real-time
            coordination, and no unified system for citizens to report incidents. ResQ Alert bridges
            this gap — giving every citizen a direct line to emergency services and giving responders
            a live operational picture to prioritize and deploy resources effectively.
          </p>
        </div>

        {/* Problem → Solution */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="glass-card rounded-2xl p-6 border-red-500/20 border">
            <h3 className="text-lg font-bold text-red-400 mb-4">❌ The Problem</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                "No unified emergency reporting system",
                "Citizens unsure which agency to contact",
                "Responders lack real-time incident visibility",
                "No GPS-based routing to incident site",
                "No severity prioritization causing delays",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5 shrink-0">•</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card rounded-2xl p-6 border-green-500/20 border">
            <h3 className="text-lg font-bold text-green-400 mb-4">✅ Our Solution</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                "One-tap SOS with automatic GPS location",
                "Live incident map visible to all responders",
                "AI-based severity classification (LOW–CRITICAL)",
                "Role-based dashboards for each agency type",
                "Status tracking: Pending → Responding → Resolved",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 shrink-0">•</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <h2 className="text-2xl font-bold mb-6">📅 Project Timeline</h2>
        <div className="flex flex-col gap-4 mb-12 relative pl-6 border-l border-red-600/30">
          {timeline.map((t) => (
            <div key={t.year} className="relative">
              <div className="absolute -left-9 w-3 h-3 bg-red-600 rounded-full mt-1.5 border-2 border-gray-950" />
              <div className="glass-card rounded-2xl p-5">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">{t.year}</span>
                <h3 className="font-bold text-base mt-1 mb-1">{t.title}</h3>
                <p className="text-gray-400 text-sm">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <h2 className="text-2xl font-bold mb-6">🛠️ Technology Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {techStack.map((t) => (
            <div key={t.name} className="glass-card rounded-2xl p-5 flex items-center gap-3 hover:border-white/15 transition-all">
              <span className="text-3xl">{t.icon}</span>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-card rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to respond?</h3>
          <p className="text-gray-400 mb-6">Join ResQ Alert and help protect your community.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-lg shadow-red-600/30">
              Create Account
            </Link>
            <Link to="/alerts" className="px-8 py-3 border border-white/15 hover:bg-white/5 text-gray-300 font-semibold rounded-2xl transition-all">
              View Live Alerts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
