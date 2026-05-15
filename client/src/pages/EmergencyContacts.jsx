import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const contacts = [
  { name: "Police",            number: "100",  icon: "👮", color: "border-blue-500/40 bg-blue-900/20",  badge: "bg-blue-600",   desc: "Crime, security, law enforcement" },
  { name: "Ambulance",         number: "108",  icon: "🚑", color: "border-red-500/40 bg-red-900/20",    badge: "bg-red-600",    desc: "Medical emergencies, accidents" },
  { name: "Fire Department",   number: "101",  icon: "🚒", color: "border-orange-500/40 bg-orange-900/20", badge: "bg-orange-600", desc: "Fire, gas leaks, rescue" },
  { name: "Women Helpline",    number: "1091", icon: "👩", color: "border-pink-500/40 bg-pink-900/20",  badge: "bg-pink-600",   desc: "Women safety & harassment" },
  { name: "Child Helpline",    number: "1098", icon: "👶", color: "border-yellow-500/40 bg-yellow-900/20", badge: "bg-yellow-600", desc: "Child abuse, missing children" },
  { name: "Disaster Mgmt",     number: "1070", icon: "🌪️", color: "border-purple-500/40 bg-purple-900/20", badge: "bg-purple-600", desc: "Floods, earthquakes, disasters" },
  { name: "Road Accident",     number: "1033", icon: "🛣️", color: "border-cyan-500/40 bg-cyan-900/20",  badge: "bg-cyan-600",   desc: "Highway emergencies & accidents" },
  { name: "Senior Citizen",    number: "14567",icon: "👴", color: "border-green-500/40 bg-green-900/20",badge: "bg-green-600",  desc: "Elderly care & emergency support" },
  { name: "COVID / Health",    number: "104",  icon: "🏥", color: "border-teal-500/40 bg-teal-900/20",  badge: "bg-teal-600",   desc: "Health helpline, medical advice" },
];

// (No hardcoded local contacts — users should check their district helplines)

function EmergencyContacts() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-sm font-medium mb-6">
            📞 Quick Access Emergency Numbers
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            Emergency <span className="gradient-text">Contacts</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            All national emergency helplines for India. Tap any number to call instantly.
          </p>
        </div>

        {/* National Helplines Grid */}
        <h2 className="text-xl font-bold mb-5 text-gray-300">🇮🇳 National Helplines</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {contacts.map((c) => (
            <a
              key={c.number}
              href={`tel:${c.number}`}
              id={`contact-${c.number}`}
              className={`glass-card rounded-2xl p-5 border ${c.color} flex items-center gap-4 hover:scale-[1.02] hover:shadow-xl transition-all group cursor-pointer`}
            >
              <div className="text-4xl shrink-0">{c.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base mb-0.5 group-hover:text-white transition-colors">{c.name}</h3>
                <p className="text-gray-500 text-xs mb-2 leading-snug">{c.desc}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-black ${c.badge}`}>
                  📞 {c.number}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* How to find local numbers */}
        <div className="glass-card rounded-2xl p-6 mb-14 border border-blue-500/20">
          <h2 className="text-xl font-bold mb-3 text-blue-400">📍 Find Your District / Local Numbers</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Local police station, hospital, and district collector numbers vary by city and state.
            To find your local emergency contacts:
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Visit <a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">india.gov.in</a> and search your district</li>
            <li>• Dial <strong className="text-white">112</strong> — India's universal emergency number (works everywhere)</li>
            <li>• Search "[your city] police control room number" on Google</li>
            <li>• Check your state's official portal for district helplines</li>
          </ul>
        </div>

        {/* How to report */}
        <div className="glass-card rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6">📋 What To Do In An Emergency</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", icon: "🧠", title: "Stay Calm", desc: "Take a breath and quickly assess the situation before acting." },
              { step: "2", icon: "📍", title: "Know Your Location", desc: "Note your address, nearby landmarks, or use GPS." },
              { step: "3", icon: "📞", title: "Call The Right Number", desc: "Police (100), Ambulance (108), or Fire (101) based on the situation." },
              { step: "4", icon: "🆘", title: "Send SOS Alert", desc: "Use ResQ Alert to notify all nearby responders instantly." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <div className="text-3xl">{s.icon}</div>
                <h3 className="font-bold">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-10 glass-card rounded-2xl px-6">
          <h3 className="text-2xl font-bold mb-3">Need to report an emergency right now?</h3>
          <p className="text-gray-400 mb-6">Use our platform to alert all nearby first responders simultaneously.</p>
          <Link
            to="/emergency"
            className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-2xl transition-all shadow-xl shadow-red-600/30 hover:scale-105"
          >
            🆘 Send Emergency Alert
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmergencyContacts;
