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
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      alert(res.data.message);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login failed");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="flex justify-center items-center py-20 px-4">

        <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-xl shadow-lg">

          <h1 className="text-4xl font-bold text-center text-red-500 mb-8">
            Responder Login 🔐
          </h1>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-6"
          >

            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black border border-gray-700 p-4 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter your password"
              className="bg-black border border-gray-700 p-4 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 p-4 rounded-xl text-xl font-semibold"
            >
              Login
            </button>

          </form>

          <p className="text-center text-gray-400 mt-6">
            New responder?{" "}
            <Link to="/signup" className="text-red-500">
              Sign Up
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;