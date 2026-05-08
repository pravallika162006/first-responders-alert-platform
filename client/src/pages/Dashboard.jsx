import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function Dashboard() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showAlert, setShowAlert] = useState(false);
  const [previousCount, setPreviousCount] = useState(0);

  useEffect(() => {

    fetchRequests();

    const interval = setInterval(() => {

      fetchRequests();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const fetchRequests = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/requests"
      );

      if (
        res.data.length > previousCount &&
        previousCount !== 0
      ) {

        setShowAlert(true);

        const audio = new Audio("/alert.mp3");

        audio.play().catch((err) => console.log(err));

        setTimeout(() => {

          setShowAlert(false);

        }, 3000);
      }

      setPreviousCount(res.data.length);

      setRequests(res.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  const acceptRequest = async (id) => {

    try {

      const request = requests.find(
        (r) => r._id === id
      );

      let updatedStatus = "";

      if (request.status === "Pending") {

        updatedStatus = "Ongoing";

      } else if (request.status === "Ongoing") {

        updatedStatus = "Completed";
      }

      await axios.put(
        `http://localhost:5000/api/requests/${id}`,
        {
          status: updatedStatus,
        }
      );

      fetchRequests();

    } catch (error) {

      console.log(error);
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  // Priority Logic

  const getPriority = (type) => {

    const text = type.toLowerCase();

    if (
      text.includes("fire") ||
      text.includes("explosion")
    ) {
      return "Critical";
    }

    if (
      text.includes("accident")
    ) {
      return "High";
    }

    if (
      text.includes("medical")
    ) {
      return "Medium";
    }

    return "Low";
  };

  // Filtered Requests

  const filteredRequests = requests

    .filter((request) => {

      // Hide completed in ALL

      if (
        statusFilter === "All" &&
        request.status === "Completed"
      ) {
        return false;
      }

      return statusFilter === "All"
        ? true
        : request.status === statusFilter;
    })

    .filter((request) =>
      request.emergencyType
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      request.location
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      request.description
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // Chart Data

  const chartData = [

    {
      name: "Pending",
      value: requests.filter(
        (r) => r.status === "Pending"
      ).length,
    },

    {
      name: "Ongoing",
      value: requests.filter(
        (r) => r.status === "Ongoing"
      ).length,
    },

    {
      name: "Completed",
      value: requests.filter(
        (r) => r.status === "Completed"
      ).length,
    },

  ];

  const COLORS = [
    "#facc15",
    "#3b82f6",
    "#22c55e",
  ];

  // Emergency Counts

  const fireCount = requests.filter((r) =>
    r.emergencyType.toLowerCase().includes("fire")
  ).length;

  const medicalCount = requests.filter((r) =>
    r.emergencyType.toLowerCase().includes("medical")
  ).length;

  const accidentCount = requests.filter((r) =>
    r.emergencyType.toLowerCase().includes("accident")
  ).length;

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-red-950 text-white">

      <Navbar />

      <div className="p-8">

        {/* Heading */}

        <h1 className="text-4xl font-bold text-red-500 mb-8">
          Emergency Dashboard 🚨
        </h1>

        {/* Profile */}

        <div className="bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 mb-8 flex justify-between items-center shadow-lg">

          <div>

            <h2 className="text-2xl font-bold">
              Welcome, Responder 👨‍🚒
            </h2>

            <p className="text-gray-400 mt-2">
              Emergency Response Team
            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2">

              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>

              <span className="text-green-400 font-semibold">
                Online
              </span>

            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl font-semibold"
            >
              Logout
            </button>

          </div>

        </div>

        {/* Alert Banner */}

        {showAlert && (

          <div className="bg-red-600 p-4 rounded-xl mb-6 text-center font-bold animate-pulse">

            🚨 New Emergency Request Received

          </div>

        )}

        {/* Search */}

        <input
          type="text"
          placeholder="Search emergencies..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full mb-6 p-4 rounded-xl bg-gray-900 border border-gray-700 outline-none"
        />

        {/* Filter Buttons */}

        <div className="flex gap-4 mb-8 flex-wrap">

          {["All", "Pending", "Ongoing", "Completed"].map((status) => (

            <button
              key={status}
              onClick={() =>
                setStatusFilter(status)
              }
              className={`px-5 py-2 rounded-xl font-semibold ${
                statusFilter === status
                  ? "bg-red-600"
                  : "bg-gray-800"
              }`}
            >
              {status}
            </button>

          ))}

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

            <h2 className="text-gray-400">
              Total Requests
            </h2>

            <p className="text-4xl font-bold text-red-500 mt-3">
              {requests.length}
            </p>

          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

            <h2 className="text-gray-400">
              Ongoing Rescues
            </h2>

            <p className="text-4xl font-bold text-blue-500 mt-3">
              {
                requests.filter(
                  (r) => r.status === "Ongoing"
                ).length
              }
            </p>

          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

            <h2 className="text-gray-400">
              Completed Cases
            </h2>

            <p className="text-4xl font-bold text-green-500 mt-3">
              {
                requests.filter(
                  (r) => r.status === "Completed"
                ).length
              }
            </p>

          </div>

        </div>

        {/* Emergency Type Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-red-900/40 p-6 rounded-2xl border border-red-700">

            <h2 className="text-xl font-bold text-red-400">
              🔥 Fire Emergencies
            </h2>

            <p className="text-5xl font-bold mt-4">
              {fireCount}
            </p>

          </div>

          <div className="bg-blue-900/40 p-6 rounded-2xl border border-blue-700">

            <h2 className="text-xl font-bold text-blue-400">
              🚑 Medical Cases
            </h2>

            <p className="text-5xl font-bold mt-4">
              {medicalCount}
            </p>

          </div>

          <div className="bg-orange-900/40 p-6 rounded-2xl border border-orange-700">

            <h2 className="text-xl font-bold text-orange-400">
              🚗 Accidents
            </h2>

            <p className="text-5xl font-bold mt-4">
              {accidentCount}
            </p>

          </div>

        </div>

        {/* Analytics */}

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 mb-10">

          <h2 className="text-2xl font-bold text-red-500 mb-6">
            Emergency Analytics 📊
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="flex justify-center py-20">

            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : (

          <>
          
            {/* Cards */}

            <div className="grid md:grid-cols-2 gap-6 mb-10">

              {filteredRequests.map((request) => (

                <div
                  key={request._id}
                  className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-lg"
                >

                  <div className="flex justify-between items-center mb-4">

                    <h2 className="text-2xl font-semibold">
                      {request.emergencyType}
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-bold ${
                        request.status === "Pending"
                          ? "bg-yellow-500 text-black"

                          : request.status === "Ongoing"
                          ? "bg-blue-500 text-white"

                          : "bg-green-500 text-black"
                      }`}
                    >
                      {request.status}
                    </span>

                  </div>

                  <p className="text-gray-400 mb-4">
                    {request.description}
                  </p>

                  <p className="mb-3">
                    📍 {request.location}
                  </p>

                  <p className="mb-4">

                    Priority:

                    <span
                      className={`ml-2 px-3 py-1 rounded-lg text-sm font-bold ${
                        getPriority(request.emergencyType) === "Critical"
                          ? "bg-red-700"

                          : getPriority(request.emergencyType) === "High"
                          ? "bg-orange-500"

                          : getPriority(request.emergencyType) === "Medium"
                          ? "bg-yellow-500 text-black"

                          : "bg-green-600"
                      }`}
                    >
                      {getPriority(request.emergencyType)}
                    </span>

                  </p>

                  <p className="text-gray-500 mb-6">
                    ⏰ {new Date(request.createdAt).toLocaleString()}
                  </p>

                  <button
                    onClick={() =>
                      acceptRequest(request._id)
                    }
                    disabled={
                      request.status === "Completed"
                    }
                    className={`w-full py-3 rounded-xl font-semibold ${
                      request.status === "Completed"
                        ? "bg-gray-700"

                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >

                    {request.status === "Pending" &&
                      "Start Rescue"}

                    {request.status === "Ongoing" &&
                      "Mark Completed"}

                    {request.status === "Completed" &&
                      "Completed"}

                  </button>

                </div>

              ))}

            </div>

            {/* Map */}

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

              <h2 className="text-2xl font-bold text-red-500 mb-6">
                Emergency Locations 🗺️
              </h2>

              <div className="h-[500px] rounded-2xl overflow-hidden">

                <MapContainer
                  center={[17.3850, 78.4867]}
                  zoom={7}
                  scrollWheelZoom={true}
                  className="h-full w-full"
                >

                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {requests.map((request, index) => (

                    <Marker
                      key={index}
                      position={[
                        request.latitude || 17.3850,
                        request.longitude || 78.4867,
                      ]}
                    >

                      <Popup>

                        <div className="text-black">

                          <h2 className="font-bold">
                            {request.emergencyType}
                          </h2>

                          <p>{request.location}</p>

                          <p>{request.status}</p>

                        </div>

                      </Popup>

                    </Marker>

                  ))}

                </MapContainer>

              </div>

            </div>

          </>

        )}

      </div>

    </div>

  );
}

export default Dashboard;