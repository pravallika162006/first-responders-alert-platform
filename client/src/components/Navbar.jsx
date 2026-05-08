import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-red-500">
        First Responders 🚨
      </h1>

      <div className="flex gap-6 items-center">

        <Link to="/" className="hover:text-red-500">
          Home
        </Link>

        <Link to="/emergency" className="hover:text-red-500">
          Emergency
        </Link>

        {!token ? (
          <>

            <Link to="/login" className="hover:text-red-500">
              Login
            </Link>

            <Link to="/signup" className="hover:text-red-500">
              Signup
            </Link>

          </>
        ) : (
          <>

            <Link to="/dashboard" className="hover:text-red-500">
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;