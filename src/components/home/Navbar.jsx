import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Fs_w.png";
import { Github, Menu, X, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, logout, loading, user } = useAuth();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  const navLinks = [
    { name: "Features", href: "#featuresSection" },
    { name: "Team", href: "#teamSection" },
  ];

  // loading 时先不要闪现错误状态
  const showAuthUI = !loading;

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-950/90 backdrop-blur-md shadow-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <img
            src={Logo}
            alt="FairStart Logo"
            className="w-10 h-10 object-cover"
          />
          <h2 className="text-xl font-bold text-blue-400 tracking-wider">
            FairStart
          </h2>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <a
            href="https://github.com/Hackathon-AI-Resume"
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-gray-300 hover:text-blue-400 space-x-1 transition-colors"
          >
            <Github size={18} />
            <span>Github</span>
          </a>
        </div>

        {/* Desktop Auth / User */}
        <div className="hidden md:flex items-center space-x-2">
          {showAuthUI && !isAuthenticated && (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-blue-400"
                >
                  Log in
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-white hover:bg-gray-200 text-gray-900 font-semibold">
                  Sign up
                </Button>
              </Link>
            </>
          )}

          {showAuthUI && isAuthenticated && (
            <>
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-blue-400"
                >
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="ghost"
                onClick={handleLogout}
                className="bg-white hover:bg-gray-200 text-gray-900 font-semibold"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-gray-950 border-t border-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-3 px-4 sm:px-6 pb-4 pt-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-gray-300 hover:text-blue-400 text-base py-2 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <a
            href="https://github.com/Hackathon-AI-Resume"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className="flex items-center text-gray-300 hover:text-blue-400 space-x-2 text-base py-2 transition-colors"
          >
            <Github size={20} />
            <span>Github</span>
          </a>

          {/* Mobile Auth / User */}
          {showAuthUI && (
            <div className="pt-4 flex flex-col space-y-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={closeMenu}>
                    <Button
                      variant="ghost"
                      className="w-full text-gray-300 hover:text-blue-400"
                    >
                      Log in
                    </Button>
                  </Link>

                  <Link to="/signup" onClick={closeMenu}>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold">
                      Sign up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={closeMenu}>
                    <Button
                      variant="ghost"
                      className="w-full text-gray-300 hover:text-blue-400"
                    >
                      Dashboard
                    </Button>
                  </Link>

                  <Button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-1"
                  >
                    <LogOut size={18} />
                    Logout
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
