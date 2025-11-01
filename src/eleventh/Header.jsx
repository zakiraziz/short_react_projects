import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ cartCount, onCartClick, onSearch, user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchRef.current?.querySelector('input')?.focus();
      }, 100);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-icon">👟</span>
            SoleMates
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul>
            <li><Link to="/" className={isActiveRoute('/')}>Home</Link></li>
            <li><Link to="/men" className={isActiveRoute('/men')}>Men</Link></li>
            <li><Link to="/women" className={isActiveRoute('/women')}>Women</Link></li>
            <li><Link to="/kids" className={isActiveRoute('/kids')}>Kids</Link></li>
            <li><Link to="/sale" className={isActiveRoute('/sale')}>Sale</Link></li>
            <li><Link to="/about" className={isActiveRoute('/about')}>About</Link></li>
            <li><Link to="/contact" className={isActiveRoute('/contact')}>Contact</Link></li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-header">
            <span>Menu</span>
            <button className="close-mobile-menu" onClick={toggleMobileMenu}>✕</button>
          </div>
          <ul>
            <li><Link to="/" className={isActiveRoute('/')} onClick={toggleMobileMenu}>Home</Link></li>
            <li><Link to="/men" className={isActiveRoute('/men')} onClick={toggleMobileMenu}>Men</Link></li>
            <li><Link to="/women" className={isActiveRoute('/women')} onClick={toggleMobileMenu}>Women</Link></li>
            <li><Link to="/kids" className={isActiveRoute('/kids')} onClick={toggleMobileMenu}>Kids</Link></li>
            <li><Link to="/sale" className={isActiveRoute('/sale')} onClick={toggleMobileMenu}>Sale</Link></li>
            <li><Link to="/about" className={isActiveRoute('/about')} onClick={toggleMobileMenu}>About</Link></li>
            <li><Link to="/contact" className={isActiveRoute('/contact')} onClick={toggleMobileMenu}>Contact</Link></li>
            
            {/* Mobile user actions */}
            <li className="mobile-user-actions">
              {user ? (
                <div className="mobile-user-info">
                  <span>Welcome, {user.name}</span>
                  <button className="logout-btn">Logout</button>
                </div>
              ) : (
                <div className="mobile-auth-buttons">
                  <Link to="/login" onClick={toggleMobileMenu} className="login-btn">Login</Link>
                  <Link to="/register" onClick={toggleMobileMenu} className="register-btn">Register</Link>
                </div>
              )}
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          {/* Search Component */}
          <div className={`search-container ${isSearchOpen ? 'open' : ''}`} ref={searchRef}>
            <button 
              className="search-btn" 
              onClick={toggleSearch}
              aria-label="Search"
            >
              🔍
            </button>
            <div className="search-dropdown">
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                  type="text"
                  placeholder="Search for shoes, brands..."
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onKeyDown={handleKeyPress}
                  className="search-input"
                />
                <button type="submit" className="search-submit-btn">
                  🔍
                </button>
              </form>
              <div className="search-suggestions">
                <div className="suggestion-title">Popular Searches</div>
                <button className="suggestion-item" onClick={() => setSearchQuery('Running Shoes')}>
                  Running Shoes
                </button>
                <button className="suggestion-item" onClick={() => setSearchQuery('Basketball')}>
                  Basketball
                </button>
                <button className="suggestion-item" onClick={() => setSearchQuery('Sandals')}>
                  Sandals
                </button>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="user-menu-container" ref={userMenuRef}>
            <button 
              className="user-btn" 
              onClick={toggleUserMenu}
              aria-label="Account"
            >
              {user ? `👤 ${user.name}` : '👤'}
            </button>
            {isUserMenuOpen && (
              <div className="user-dropdown">
                {user ? (
                  <>
                    <div className="user-info">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                    <Link to="/profile" className="dropdown-item">My Profile</Link>
                    <Link to="/orders" className="dropdown-item">My Orders</Link>
                    <Link to="/wishlist" className="dropdown-item">Wishlist</Link>
                    <button className="dropdown-item logout-btn">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item">Login</Link>
                    <Link to="/register" className="dropdown-item">Register</Link>
                    <div className="dropdown-divider"></div>
                    <Link to="/guest" className="dropdown-item">Continue as Guest</Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <button 
            className="cart-btn" 
            onClick={onCartClick} 
            aria-label="Cart"
          >
            🛒 
            {cartCount > 0 && <span className="cart-count">{cartCount > 99 ? '99+' : cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && <div className="search-overlay" onClick={() => setIsSearchOpen(false)}></div>}
    </header>
  );
};

// Default props
Header.defaultProps = {
  cartCount: 0,
  user: null,
  onSearch: (query) => console.log('Search:', query),
  onCartClick: () => console.log('Cart clicked')
};

export default Header;
