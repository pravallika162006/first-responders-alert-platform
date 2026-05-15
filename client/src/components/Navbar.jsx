import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Alerts", path: "/alerts" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Emergency Contacts", path: "/emergency-contacts" },
  { name: "About", path: "/about" },
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-gray-950/95 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-red-600/40">
                🚨
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                ResQ <span className="text-red-500">Alert</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-red-600/20 text-red-400 border border-red-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-600/50"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/emergency"
                    className="px-4 py-2 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all animate-pulse"
                  >
                    🆘 SOS
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-1.5 text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-btn"
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10 animate-slide-down">
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-red-600/20 text-red-400 border border-red-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-3 mt-3 pt-3 border-t border-white/10">
                {!token ? (
                  <>
                    <Link
                      to="/login"
                      className="flex-1 py-2.5 text-center text-sm font-medium border border-white/15 text-gray-300 rounded-xl hover:bg-white/5 transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="flex-1 py-2.5 text-center text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/emergency"
                      className="flex-1 py-2.5 text-center text-sm font-bold bg-red-600 text-white rounded-xl animate-pulse"
                    >
                      🆘 SOS Alert
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex-1 py-2.5 text-sm font-medium border border-white/15 text-gray-400 rounded-xl hover:bg-white/5 transition-all"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer so content doesn't hide under fixed nav */}
      <div className="h-16" />
    </>
  );
}

export default Navbar;