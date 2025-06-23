import React from 'react';

const Header = ({ cartCount, onCartClick }) => {
  return (
    <header className="header">
      <div className="logo">SoleMates</div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#men">Men</a></li>
          <li><a href="#women">Women</a></li>
          <li><a href="#kids">Kids</a></li>
          <li>
            <button className="cart-btn" onClick={onCartClick}>
              🛒 {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
