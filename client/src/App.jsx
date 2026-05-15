import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import EmergencyForm from "./pages/EmergencyForm";
import Alerts from "./pages/Alerts";
import About from "./pages/About";
import EmergencyContacts from "./pages/EmergencyContacts";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/about" element={<About />} />
        <Route path="/emergency-contacts" element={<EmergencyContacts />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/emergency" element={<EmergencyForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;