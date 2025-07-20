import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ items, onRemove, onClose, onClear, total }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    payment: 'credit'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    alert(`Order confirmed! Total: $${total.toFixed(2)}\nA confirmation will be sent to ${formData.email}`);
    onClear();
    setIsCheckout(false);
    onClose();
  };

  return (
    <div className="cart-overlay">
      <div className="cart">
        <div className="cart-header">
          <h2>Your Shopping Cart</h2>
          <button onClick={onClose} className="close-btn" aria-label="Close cart">
            &times;
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={onClose} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        ) : isCheckout ? (
          <div className="checkout-form">
            <h3>Checkout</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Shipping Address</label>
                <textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select 
                  name="payment" 
                  value={formData.payment} 
                  onChange={handleInputChange}
                >
                  <option value="credit">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
              <div className="checkout-total">
                <h4>Order Total: ${total.toFixed(2)}</h4>
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="back-to-cart"
                  onClick={() => setIsCheckout(false)}
                >
                  Back to Cart
                </button>
                <button type="submit" className="confirm-order">
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item, index) => (
                <li key={`${item.id}-${index}`} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4>{item.brand} {item.name}</h4>
                    <p>Size: {item.size || 'N/A'}</p>
                    <div className="item-price">
                      ${item.price.toFixed(2)} {item.quantity > 1 && `× ${item.quantity}`}
                    </div>
                  </div>
                  <div className="item-actions">
                    <button 
                      onClick={() => onRemove(index)}
                      className="remove-btn"
                      aria-label="Remove item"
                    >
                      &times;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <div className="cart-total">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="cart-total">
                <span>Shipping:</span>
                <span>{total > 50 ? 'FREE' : '$5.99'}</span>
              </div>
              <div className="cart-total grand-total">
                <span>Total:</span>
                <span>${(total > 50 ? total : total + 5.99).toFixed(2)}</span>
              </div>
            </div>
            <div className="cart-actions">
              <button onClick={onClear} className="clear-cart">
                Clear Cart
              </button>
              <button 
                onClick={() => setIsCheckout(true)} 
                className="checkout-btn"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;