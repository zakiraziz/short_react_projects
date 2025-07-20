import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Header = ({ cartCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
            <li><Link to="/men" onClick={toggleMobileMenu}>Men</Link></li>
            <li><Link to="/women" onClick={toggleMobileMenu}>Women</Link></li>
            <li><Link to="/kids" onClick={toggleMobileMenu}>Kids</Link></li>
            <li><Link to="/about" onClick={toggleMobileMenu}>About</Link></li>
            <li><Link to="/contact" onClick={toggleMobileMenu}>Contact</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="search-btn" aria-label="Search">
            🔍
          </button>
          <button className="user-btn" aria-label="Account">
            👤
          </button>
          <button className="cart-btn" onClick={onCartClick} aria-label="Cart">
            🛒 
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;