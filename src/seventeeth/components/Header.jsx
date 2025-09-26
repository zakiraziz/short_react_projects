// src/components/Header.js - Navigation header with cart counter
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/products', label: 'Products', icon: '👟' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📞' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-icon">👟</span>
            <span className="logo-text">SoleMates</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navigation.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Search Bar */}
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="search-input"
              />
              <button className="search-btn">🔍</button>
            </div>

            {/* Cart Icon */}
            <Link to="/cart" className="cart-icon-link">
              <span className="cart-icon">🛒</span>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>



export default Header;
