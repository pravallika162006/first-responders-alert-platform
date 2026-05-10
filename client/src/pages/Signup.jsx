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

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Signup failed");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="flex justify-center items-center py-20 px-4">

        <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-xl shadow-lg">

          <h1 className="text-4xl font-bold text-center text-red-500 mb-8">
            Responder Sign Up 🚨
          </h1>

          <form
            onSubmit={handleSignup}
            className="flex flex-col gap-6"
          >

            <input
              type="text"
              placeholder="Enter your full name"
              className="bg-black border border-gray-700 p-4 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black border border-gray-700 p-4 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Create password"
              className="bg-black border border-gray-700 p-4 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 p-4 rounded-xl text-xl font-semibold"
            >
              Create Account
            </button>

          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;