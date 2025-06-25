import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaTimes, FaBars } from 'react-icons/fa'; // Using Font Awesome icons

const Header = ({ cartCount, onCartClick, isLoggedIn, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close search bar when mobile menu opens
    if (!isMobileMenuOpen) {
      setShowSearchBar(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearchBar(false);
    }
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    // Close mobile menu when search opens
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">SoleMates</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/kids">Kids</Link></li>
            <li><Link to="/sale">Sale</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Menu">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
            <li><Link to="/men" onClick={toggleMobileMenu}>Men</Link></li>
            <li><Link to="/women" onClick={toggleMobileMenu}>Women</Link></li>
            <li><Link to="/kids" onClick={toggleMobileMenu}>Kids</Link></li>
            <li><Link to="/sale" onClick={toggleMobileMenu}>Sale</Link></li>
            <li><Link to="/about" onClick={toggleMobileMenu}>About</Link></li>
            <li><Link to="/contact" onClick={toggleMobileMenu}>Contact</Link></li>
            {isLoggedIn && (
              <>
                <li><Link to="/account" onClick={toggleMobileMenu}>My Account</Link></li>
                <li><button onClick={() => { onLogout(); toggleMobileMenu(); }}>Logout</button></li>
              </>
            )}
          </ul>
        </nav>

        <div className="header-actions">
          {/* Search Bar (shown on desktop when activated) */}
          {showSearchBar && (
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" aria-label="Submit search">
                <FaSearch />
              </button>
            </form>
          )}

          <button 
            className={`search-btn ${showSearchBar ? 'active' : ''}`} 
            onClick={toggleSearchBar} 
            aria-label="Search"
          >
            <FaSearch />
          </button>

          <div className="user-dropdown-container">
            <button 
              className="user-btn" 
              onClick={toggleUserDropdown}
              aria-label="Account"
            >
              <FaUser />
            </button>
            {showUserDropdown && (
              <div className="user-dropdown">
                {isLoggedIn ? (
                  <>
                    <Link to="/account" onClick={() => setShowUserDropdown(false)}>My Account</Link>
                    <Link to="/orders" onClick={() => setShowUserDropdown(false)}>My Orders</Link>
                    <button onClick={() => { onLogout(); setShowUserDropdown(false); }}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setShowUserDropdown(false)}>Login</Link>
                    <Link to="/register" onClick={() => setShowUserDropdown(false)}>Register</Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button className="cart-btn" onClick={onCartClick} aria-label="Cart">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (shown when mobile menu is closed) */}
      {!isMobileMenuOpen && (
        <div className={`mobile-search-container ${showSearchBar ? 'open' : ''}`}>
          <form className="mobile-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" aria-label="Submit search">
              <FaSearch />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
