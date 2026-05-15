import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://first-responders-alert-platform.onrender.com/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Signup failed. Please verify your details and try again.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:gap-16">
        <div className="glass-card w-full rounded-[2rem] border-white/10 bg-white/5 p-6 sm:p-10 shadow-2xl shadow-black/40 backdrop-blur-xl lg:w-1/2">
          <span className="inline-flex rounded-full bg-red-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-red-200">
            Verified responder onboarding
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Create your secure access.
          </h1>
          <p className="mt-4 text-gray-300 text-lg leading-8">
            Register as a responder to receive emergency alerts, coordinate response teams, and support safer outcomes across every incident.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-gray-400">Fast setup</p>
              <p className="mt-3 text-white font-semibold">Ready to receive alerts instantly.</p>
            </div>
            <div className="rounded-3xl bg-red-500/10 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-red-200">Secure</p>
              <p className="mt-3 text-white font-semibold">Encrypted responder access.</p>
            </div>
          </div>
        </div>

        <div className="glass-card w-full rounded-[2rem] border-white/10 bg-white/5 p-6 sm:p-10 shadow-2xl shadow-black/40 backdrop-blur-xl lg:w-1/2">
          <h2 className="text-3xl font-bold text-red-500">Responder Sign Up</h2>
          <p className="mt-2 text-gray-400">Join the platform with your verified credentials and stay mission-ready.</p>

          <form onSubmit={handleSignup} className="mt-10 flex flex-col gap-5">
            <label className="block text-sm font-medium text-gray-300">Full name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="w-full rounded-2xl border border-white/10 bg-black/80 px-5 py-4 text-white outline-none transition focus:border-red-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
              placeholder="Create a strong password"
              className="w-full rounded-2xl border border-white/10 bg-black/80 px-5 py-4 text-white outline-none transition focus:border-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="rounded-3xl border border-white/10 bg-black/80 p-4 text-sm text-gray-400">
              Use a secure password with at least 8 characters and a mix of letters and numbers.
            </div>

            <button
              type="submit"
              className="mt-4 rounded-2xl bg-red-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-400">
              Already have an account? {' '}
              <Link to="/login" className="font-semibold text-red-400 hover:text-red-300">
                Login
              </Link>
            </p>
          </form>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/80 p-5 text-sm text-gray-400">
            By creating an account, you agree to our terms and confirm you are an authorized first responder for emergencies.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
