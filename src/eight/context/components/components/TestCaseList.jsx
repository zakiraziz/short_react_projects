import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { showNotification } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      showNotification('Successfully logged out', 'success');
      navigate('/');
    } catch (error) {
      showNotification('Error logging out', 'error');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/products', label: 'Products', icon: '🛍️' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/blog', label: 'Blog', icon: '📝' },
    { path: '/contact', label: 'Contact', icon: '📞' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="logo-icon">🚀</div>
            <span className="logo-text">BrandName</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <Link 
                  to={link.path} 
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side Actions */}
          <div className="nav-actions">
            {/* Search Button */}
            <button 
              className="nav-action-btn search-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <span className="action-icon">🔍</span>
            </button>

            {/* Cart with badge */}
            <Link to="/cart" className="nav-action-btn cart-btn">
              <span className="action-icon">🛒</span>
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </Link>

            {/* User Menu or Login */}
            {user ? (
              <div className="user-menu" ref={profileDropdownRef}>
                <button 
                  className="user-avatar"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  aria-label="User menu"
                >
                  <img 
                    src={user.avatar || '/default-avatar.png'} 
                    alt={user.name} 
                    className="avatar-image"
                  />
                  <span className="user-name">{user.name}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>

                {isProfileDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">
                      <span className="dropdown-icon">👤</span>
                      Profile
                    </Link>
                    <Link to="/dashboard" className="dropdown-item">
                      <span className="dropdown-icon">📊</span>
                      Dashboard
                    </Link>
                    <Link to="/orders" className="dropdown-item">
                      <span className="dropdown-icon">📦</span>
                      Orders
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item logout-btn">
                      <span className="dropdown-icon">🚪</span>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="search-overlay" ref={searchRef}>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search products, articles, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
              <button type="submit" className="search-submit-btn">
                <span className="action-icon">🔍</span>
              </button>
              <button 
                type="button" 
                className="search-close-btn"
                onClick={() => setIsSearchOpen(false)}
              >
                ✕
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {/* User Info in Mobile Menu */}
          {user && (
            <div className="mobile-user-info">
              <img 
                src={user.avatar || '/default-avatar.png'} 
                alt={user.name}
                className="mobile-avatar"
              />
              <div className="mobile-user-details">
                <div className="mobile-user-name">{user.name}</div>
                <div className="mobile-user-email">{user.email}</div>
              </div>
            </div>
          )}

          {/* Mobile Navigation Links */}
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.path} className="mobile-nav-item">
                <Link 
                  to={link.path} 
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  <span className="mobile-nav-icon">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Additional Links */}
          <div className="mobile-additional-links">
            {user ? (
              <>
                <Link to="/profile" className="mobile-additional-link">
                  <span className="link-icon">👤</span>
                  My Profile
                </Link>
                <Link to="/orders" className="mobile-additional-link">
                  <span className="link-icon">📦</span>
                  My Orders
                </Link>
                <Link to="/dashboard" className="mobile-additional-link">
                  <span className="link-icon">📊</span>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="mobile-additional-link logout-link">
                  <span className="link-icon">🚪</span>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-additional-link">
                  <span className="link-icon">🔐</span>
                  Login
                </Link>
                <Link to="/register" className="mobile-additional-link">
                  <span className="link-icon">📝</span>
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Cart Link */}
          <Link to="/cart" className="mobile-cart-link">
            <span className="link-icon">🛒</span>
            Shopping Cart
            {cartItemsCount > 0 && (
              <span className="mobile-cart-badge">{cartItemsCount}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-backdrop"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
