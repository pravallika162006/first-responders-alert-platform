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
        "http://localhost:5000/api/requests",
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

      <div className="flex justify-center items-center py-20 px-4">

        <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-2xl shadow-lg">

          <h1 className="text-4xl font-bold text-center text-red-500 mb-8">
            Send Emergency Alert 🚨
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >

            {/* Emergency Type */}

            <select
              className="bg-black border border-gray-700 p-4 rounded-lg"
              value={emergencyType}
              onChange={(e) =>
                setEmergencyType(e.target.value)
              }
            >

              <option value="">
                Select Emergency Type
              </option>

              <option value="Road Accident">
                Road Accident
              </option>

              <option value="Medical Emergency">
                Medical Emergency
              </option>

              <option value="Fire Accident">
                Fire Accident
              </option>

              <option value="Flood Rescue">
                Flood Rescue
              </option>

              <option value="Crime Alert">
                Crime Alert
              </option>

              <option value="Other">
                Other
              </option>

            </select>

            {/* Description */}

            <textarea
              placeholder="Describe the emergency"
              className="bg-black border border-gray-700 p-4 rounded-lg h-40"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            {/* Location */}

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Enter location"
                className="bg-black border border-gray-700 p-4 rounded-lg w-full"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />

              <button
                type="button"
                onClick={getCurrentLocation}
                className="bg-blue-600 hover:bg-blue-700 px-5 rounded-lg"
              >
                📍
              </button>

            </div>

            {/* Submit Button */}

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 p-4 rounded-xl text-xl font-semibold"
            >
              Send Alert
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EmergencyForm;