// src/pages/Cart.js - Shopping cart page with order summary
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your Shopping Cart is Empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="cta-button">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
          <p>Review your items and proceed to checkout</p>
        </div>

        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                  <div className="item-image">
                    <span className="item-emoji">{item.emoji}</span>
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-brand">{item.brand}</p>
                    <div className="item-variants">
                      {item.selectedSize && <span className="variant">Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span className="variant">Color: {item.selectedColor}</span>}
                    </div>
                    <p className="item-price">${item.price}</p>
                  </div>

                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                    >
                      🗑️ Remove
                    </button>
                  </div>

                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <Link to="/products" className="continue-shopping">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal < 75 && (
              <div className="free-shipping-notice">
                <span className="shipping-icon">🚚</span>
                Add <strong>${(75 - subtotal).toFixed(2)}</strong> more for free shipping!
              </div>
            )}

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>

            <div className="security-features">
              <div className="security-item">
                <span className="security-icon">🔒</span>
                Secure checkout
              </div>
              <div className="security-item">
                <span className="security-icon">↩️</span>
                30-day returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;