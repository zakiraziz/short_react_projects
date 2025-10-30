import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""} ${theme}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-container">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">MyReactApp</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActiveRoute("/") ? "active" : ""}`}
            >
              <span className="nav-icon">🏠</span>
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`nav-link ${isActiveRoute("/about") ? "active" : ""}`}
            >
              <span className="nav-icon">👤</span>
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className={`nav-link ${isActiveRoute("/projects") ? "active" : ""}`}
            >
              <span className="nav-icon">💼</span>
              Projects
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`nav-link ${isActiveRoute("/contact") ? "active" : ""}`}
            >
              <span className="nav-icon">📞</span>
              Contact
            </Link>
          </li>
          
          {/* Conditional Auth Links */}
          {isAuthenticated ? (
            <>
              <li>
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${isActiveRoute("/dashboard") ? "active" : ""}`}
                >
                  <span className="nav-icon">📊</span>
                  Dashboard
                </Link>
              </li>
              <li className="nav-dropdown">
                <button className="nav-link user-menu">
                  <span className="nav-icon">👋</span>
                  {user?.name || "Profile"}
                  <span className="dropdown-arrow">▼</span>
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    <span className="dropdown-icon">👤</span>
                    My Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <span className="dropdown-icon">⚙️</span>
                    Settings
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    <span className="dropdown-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li>
              <Link 
                to="/login" 
                className="nav-link login-btn"
              >
                <span className="nav-icon">🔐</span>
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Theme Toggle */}
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <Link to="/" className="mobile-nav-link">
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          <Link to="/about" className="mobile-nav-link">
            <span className="nav-icon">👤</span>
            About
          </Link>
          <Link to="/projects" className="mobile-nav-link">
            <span className="nav-icon">💼</span>
            Projects
          </Link>
          <Link to="/contact" className="mobile-nav-link">
            <span className="nav-icon">📞</span>
            Contact
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="mobile-nav-link">
                <span className="nav-icon">📊</span>
                Dashboard
              </Link>
              <Link to="/profile" className="mobile-nav-link">
                <span className="nav-icon">👤</span>
                Profile
              </Link>
              <button onClick={handleLogout} className="mobile-nav-link logout-btn">
                <span className="nav-icon">🚪</span>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="mobile-nav-link login-btn">
              <span className="nav-icon">🔐</span>
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-backdrop"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
