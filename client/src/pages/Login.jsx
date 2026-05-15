import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://first-responders-alert-platform.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:gap-16">
        <div className="glass-card w-full rounded-[2rem] border-white/10 bg-white/5 p-6 sm:p-10 shadow-2xl shadow-black/40 backdrop-blur-xl lg:w-1/2">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-red-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-red-200">
              Secure responder access
            </span>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Login to manage alerts with confidence.
            </h1>
            <p className="text-gray-300 text-lg leading-8">
              Enter your registered credentials to access live incident data, responder status, and mission-critical communications.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-red-500/10 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-red-200">Fast access</p>
              <p className="mt-3 text-white font-semibold">Real-time incident control</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-gray-400">Protected</p>
              <p className="mt-3 text-white font-semibold">Encrypted credentials</p>
            </div>
          </div>
        </div>

        <div className="glass-card w-full rounded-[2rem] border-white/10 bg-white/5 p-6 sm:p-10 shadow-2xl shadow-black/40 backdrop-blur-xl lg:w-1/2">
          <h2 className="text-3xl font-bold text-red-500">Responder Login</h2>
          <p className="mt-2 text-gray-400">Secure sign-in for verified first responders and dispatch coordinators.</p>

          <form onSubmit={handleLogin} className="mt-10 flex flex-col gap-5">
            <label className="block text-sm font-medium text-gray-300">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/10 bg-black/80 px-5 py-4 text-white outline-none transition focus:border-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/10 bg-black/80 px-5 py-4 text-white outline-none transition focus:border-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="mt-4 rounded-2xl bg-red-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-400">
              New responder? {' '}
              <Link to="/signup" className="font-semibold text-red-400 hover:text-red-300">
                Create account
              </Link>
            </p>
          </form>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/80 p-5 text-sm text-gray-400">
            By logging in you agree to our secure platform policy and confirm your responder credentials are accurate.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
