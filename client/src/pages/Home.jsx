import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero-pattern bg-black text-white min-h-screen relative overflow-hidden">
      <Navbar />

      <div className="relative z-10 px-4 pt-8 sm:px-6 sm:pt-10 lg:px-12 lg:pt-12">
        <div className="mx-auto flex flex-col gap-12 lg:gap-16 max-w-7xl">
          <section className="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-row lg:justify-between lg:gap-20">
            <div className="max-w-3xl space-y-8 lg:space-y-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 shadow-sm shadow-red-500/10 animate-glow">
                Emergency-ready · Live responder connect · 24/7 support
              </span>

              <div className="space-y-6">
                <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl gradient-text">
                  Protect lives faster with powerful alerts.
                </h1>

                <p className="text-gray-300 text-lg leading-8 max-w-xl sm:text-xl">
                  First Responders Alert Platform delivers instant crisis notifications, real-time responder dispatch, and clear command control so every second counts.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link to="/emergency" className="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500 sm:w-auto">
                  Send Emergency Alert
                </Link>
                <Link to="/dashboard" className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:border-red-400/40 hover:bg-white/10 sm:w-auto">
                  View Dashboard
                </Link>
              </div>
            </div>

            <div className="relative w-full max-w-full sm:max-w-xl">
              <div className="glass-card animate-fade-up rounded-[2rem] border-white/10 p-6 sm:p-8 shadow-2xl shadow-black/40">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="text-sm uppercase tracking-[0.3em] text-gray-400">Active Alerts</span>
                    <p className="mt-3 text-5xl font-semibold text-white">8</p>
                  </div>
                  <div className="rounded-3xl bg-red-600/15 px-4 py-3 text-red-100">
                    <span className="text-sm font-semibold">Critical</span>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-5">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-400">Median response</span>
                    <p className="mt-3 text-2xl font-semibold">2m 14s</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-5">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-400">Live responders</span>
                    <p className="mt-3 text-2xl font-semibold">24</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 top-8 hidden h-20 w-20 rounded-full bg-red-500/10 blur-3xl sm:block sm:-right-12 sm:top-10 sm:h-24 sm:w-24"></div>
              <div className="absolute -left-6 bottom-6 hidden h-24 w-24 rounded-full bg-white/5 blur-3xl sm:block sm:-left-10 sm:h-32 sm:w-32"></div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Instant alerts",
                description: "Trigger alerts and notify the nearest response units without delay.",
                accent: "status-active",
              },
              {
                title: "Live tracking",
                description: "See responder status, location, and arrival estimates in real time.",
                accent: "status-responding",
              },
              {
                title: "Secure coordination",
                description: "Keep every dispatch secure, logged, and ready for fast decision-making.",
                accent: "status-critical",
              },
            ].map((tile) => (
              <div key={tile.title} className="glass-card rounded-[2rem] border-white/10 p-8 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-red-400/30 hover:shadow-red-500/20">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">{tile.title}</h2>
                    <p className="mt-3 text-sm text-gray-400 leading-relaxed">{tile.description}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${tile.accent}`}>
                    live
                  </span>
                </div>
              </div>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="glass-card rounded-[2rem] border-white/10 p-8 text-center shadow-xl shadow-black/20">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Trusted by first responders</p>
              <p className="mt-6 text-4xl font-bold text-white">3.2K+</p>
              <p className="mt-3 text-gray-300">Alerts processed weekly with fast, reliable triage.</p>
            </div>
            <div className="glass-card rounded-[2rem] border-white/10 p-8 text-center shadow-xl shadow-black/20">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Urgent success rate</p>
              <p className="mt-6 text-4xl font-bold text-white">98%</p>
              <p className="mt-3 text-gray-300">Alerts resolved by responders within the golden response window.</p>
            </div>
            <div className="glass-card rounded-[2rem] border-white/10 p-8 text-center shadow-xl shadow-black/20">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Ready now</p>
              <p className="mt-6 text-4xl font-bold text-white">24/7</p>
              <p className="mt-3 text-gray-300">System remains active and monitored at all times.</p>
            </div>
          </section>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-red-500 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      </div>
    </div>
  );
}

export default Home;