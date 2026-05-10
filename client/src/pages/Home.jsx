import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">

        <h1 className="text-6xl font-bold mb-6">
          First Responders Alert Platform 🚨
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl mb-8">
          Instant emergency alert system connecting people with responders in real time.
        </p>

        <Link to="/emergency">
          <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl text-xl font-semibold transition">
            Send Emergency Alert
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Home;