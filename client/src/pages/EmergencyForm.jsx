import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

function EmergencyForm() {

  const [emergencyType, setEmergencyType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Fetch Current Location

  const getCurrentLocation = () => {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {

          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          setLocation(res.data.display_name);

          setLatitude(lat);
          setLongitude(lng);

        } catch (error) {

          console.log(error);
        }
      },

      (error) => {

        console.log(error);
      }
    );
  };

  // Submit Form

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://first-responders-alert-platform.onrender.com/api/requests",
        {
          emergencyType,
          description,
          location,
          latitude,
          longitude,
        }
      );

      alert(res.data.message);

      // Clear Form

      setEmergencyType("");
      setDescription("");
      setLocation("");

      setLatitude("");
      setLongitude("");

    } catch (error) {

      console.log(error);

      alert("Failed to send emergency alert");
    }
  };

  return (

    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">

        <h1 className="text-4xl sm:text-5xl font-extrabold text-red-500 text-center mb-8">
          Send Emergency Alert 🚨
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <div className="glass-card p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl">

              <p className="text-gray-300 mb-4">Quickly report an incident — responders nearby will be notified immediately.</p>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Emergency Type</label>
                  <select
                    required
                    className="w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-white outline-none focus:border-red-500"
                    value={emergencyType}
                    onChange={(e) => setEmergencyType(e.target.value)}
                  >
                    <option value="">Select Emergency Type</option>
                    <option value="Road Accident">Road Accident</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Fire Accident">Fire Accident</option>
                    <option value="Flood Rescue">Flood Rescue</option>
                    <option value="Crime Alert">Crime Alert</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    required
                    placeholder="Describe what happened, injuries, and any hazards"
                    className="w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-4 text-white outline-none h-36 resize-y focus:border-red-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter location or use GPS"
                      className="w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-white outline-none focus:border-red-500"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="rounded-2xl bg-red-600 px-4 py-3 text-white hover:bg-red-500 transition"
                    >
                      Use GPS
                    </button>
                  </div>

                  <div className="mt-2 text-xs text-gray-500">Latitude: {latitude || "—"} &nbsp; • &nbsp; Longitude: {longitude || "—"}</div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!emergencyType || !description || !location}
                    className={`w-full rounded-2xl px-6 py-4 text-lg font-semibold text-white shadow-lg transition ${
                      !emergencyType || !description || !location
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-500"
                    }`}
                  >
                    Send Alert
                  </button>
                </div>

              </form>

              <div className="mt-6 text-sm text-gray-400">
                Tip: Provide specific landmarks and number of injured people for faster response.
              </div>

            </div>
          </div>

          <aside className="space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-white/10 shadow-2xl bg-white/3">
              <h3 className="text-lg font-bold text-red-400">Quick Actions</h3>
              <p className="text-sm text-gray-300 mt-2">Useful contacts and safety steps while waiting for responders.</p>

              <div className="mt-4 grid gap-3">
                <a href="tel:102" className="block rounded-xl bg-red-600 px-4 py-3 text-center font-semibold text-white">Call Emergency Services</a>
                <a href="tel:100" className="block rounded-xl bg-blue-700 px-4 py-3 text-center font-semibold text-white">Local Police</a>
                <a href="tel:101" className="block rounded-xl bg-orange-600 px-4 py-3 text-center font-semibold text-white">Fire Department</a>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 shadow-2xl">
              <h3 className="text-lg font-bold text-white">Safety Checklist</h3>
              <ul className="mt-3 text-gray-300 space-y-2 text-sm">
                <li>• Move to a safe spot if possible</li>
                <li>• Render first aid only if trained</li>
                <li>• Keep phone charged and visible</li>
                <li>• Stay on the line with dispatcher</li>
              </ul>
            </div>
          </aside>

        </div>

      </div>

    </div>
  );
}

export default EmergencyForm;