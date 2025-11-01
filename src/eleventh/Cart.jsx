import React, { useState, useEffect } from 'react';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiLock, FiArrowLeft, FiTruck, FiShield } from 'react-icons/fi';
import { RiCoupon3Line } from 'react-icons/ri';
import './Cart.css';

const Cart = ({ items, onRemove, onClose, onClear, total, onUpdateQuantity, isOpen }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    payment: 'credit',
    saveInfo: false
  });
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Cart, 2: Shipping, 3: Payment, 4: Review

  // Calculate totals
  const shippingCost = total > 50 || total === 0 ? 0 : 5.99;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shippingCost + tax - discount;

  // Available coupons
  const availableCoupons = {
    'WELCOME10': 0.1, // 10% off
    'FREESHIP': 5.99, // Free shipping
    'SAVE20': 0.2, // 20% off
    'NEW25': 0.25 // 25% off for new customers
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;
    if (onUpdateQuantity) {
      onUpdateQuantity(index, newQuantity);
    }
  };

  const applyCoupon = () => {
    const code = couponCode.toUpperCase();
    if (availableCoupons[code]) {
      const discountValue = availableCoupons[code];
      setDiscount(typeof discountValue === 'number' ? discountValue : total * discountValue);
      setAppliedCoupon(code);
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`Order confirmed! Total: $${finalTotal.toFixed(2)}\nA confirmation will be sent to ${formData.email}`);
      onClear();
      setIsCheckout(false);
      setStep(1);
      onClose();
    } catch (error) {
      console.error('Order failed:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Your Shopping Cart';
      case 2: return 'Shipping Information';
      case 3: return 'Payment Method';
      case 4: return 'Review Your Order';
      default: return 'Checkout';
    }
  };

  const renderCheckoutStep = () => {
    switch (step) {
      case 2:
        return (
          <div className="checkout-step">
            <h3>Shipping Information</h3>
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Shipping Address *</label>
                <textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  placeholder="Street address, apartment, suite, etc."
                  required 
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>ZIP Code *</label>
                  <input 
                    type="text" 
                    name="zipCode" 
                    value={formData.zipCode} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              <div className="form-actions checkout-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={prevStep}
                >
                  <FiArrowLeft /> Back to Cart
                </button>
                <button type="submit" className="btn-primary">
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        );

      case 3:
        return (
          <div className="checkout-step">
            <h3>Payment Method</h3>
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <div className="payment-methods">
                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="credit" 
                    checked={formData.payment === 'credit'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-content">
                    <span>Credit/Debit Card</span>
                    <div className="payment-icons">
                      <span className="payment-icon visa">Visa</span>
                      <span className="payment-icon mastercard">Mastercard</span>
                      <span className="payment-icon amex">Amex</span>
                    </div>
                  </div>
                </label>

                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="paypal" 
                    checked={formData.payment === 'paypal'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-content">
                    <span>PayPal</span>
                    <span className="payment-desc">Safer, easier way to pay</span>
                  </div>
                </label>

                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="apple" 
                    checked={formData.payment === 'apple'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-content">
                    <span>Apple Pay</span>
                    <span className="payment-desc">Pay with your Apple device</span>
                  </div>
                </label>
              </div>

              {formData.payment === 'credit' && (
                <div className="credit-card-form">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="text" placeholder="123" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input type="text" placeholder="John Doe" />
                  </div>
                </div>
              )}

              <div className="save-info">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="saveInfo" 
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                  />
                  Save this information for next time
                </label>
              </div>

              <div className="form-actions checkout-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={prevStep}
                >
                  <FiArrowLeft /> Back
                </button>
                <button type="submit" className="btn-primary">
                  Review Order
                </button>
              </div>
            </form>
          </div>
        );

      case 4:
        return (
          <div className="checkout-step">
            <h3>Review Your Order</h3>
            <div className="order-summary">
              <div className="shipping-review">
                <h4>Shipping Address</h4>
                <p>{formData.name}<br />{formData.address}<br />{formData.city}, {formData.zipCode}</p>
              </div>
              
              <div className="payment-review">
                <h4>Payment Method</h4>
                <p>{formData.payment === 'credit' ? 'Credit Card' : 
                    formData.payment === 'paypal' ? 'PayPal' : 
                    formData.payment === 'apple' ? 'Apple Pay' : formData.payment}</p>
              </div>

              <div className="items-review">
                <h4>Order Items ({items.length})</h4>
                {items.map((item, index) => (
                  <div key={index} className="review-item">
                    <img src={item.image} alt={item.name} />
                    <div className="review-item-details">
                      <span className="item-name">{item.brand} {item.name}</span>
                      <span className="item-meta">Size: {item.size} • Qty: {item.quantity}</span>
                    </div>
                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="final-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount ({appliedCoupon}):</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row grand-total">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="security-notice">
              <FiShield />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <div className="form-actions checkout-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={prevStep}
              >
                <FiArrowLeft /> Back
              </button>
              <button 
                type="button" 
                className="btn-primary confirm-order"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiLock />
                    Place Order
                  </>
                )}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>{getStepTitle()}</h2>
          <button onClick={onClose} className="close-btn" aria-label="Close cart">
            &times;
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="empty-cart">
            <FiShoppingBag className="empty-cart-icon" />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything to your cart yet</p>
            <button onClick={onClose} className="btn-primary continue-shopping">
              Continue Shopping
            </button>
          </div>
        ) : step > 1 ? (
          <div className="checkout-container">
            {/* Checkout Progress */}
            <div className="checkout-progress">
              <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
                <span>1</span>
                Cart
              </div>
              <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                <span>2</span>
                Shipping
              </div>
              <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                <span>3</span>
                Payment
              </div>
              <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
                <span>4</span>
                Review
              </div>
            </div>

            {renderCheckoutStep()}
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
                    <p className="item-color">Color: {item.color || 'Black'}</p>
                    <p className="item-size">Size: {item.size || 'N/A'}</p>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleQuantityChange(index, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="quantity-btn"
                      >
                        <FiMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(index, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  <div className="item-price-section">
                    <div className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      onClick={() => onRemove(index)}
                      className="remove-btn"
                      aria-label="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Coupon Section */}
            <div className="coupon-section">
              {appliedCoupon ? (
                <div className="coupon-applied">
                  <span>Coupon applied: <strong>{appliedCoupon}</strong></span>
                  <button onClick={removeCoupon} className="remove-coupon">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="coupon-input">
                  <RiCoupon3Line className="coupon-icon" />
                  <input 
                    type="text" 
                    placeholder="Enter coupon code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button onClick={applyCoupon} className="apply-coupon">
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span className={shippingCost === 0 ? 'free-shipping' : ''}>
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row grand-total">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              {total < 50 && total > 0 && (
                <div className="shipping-notice">
                  <FiTruck />
                  Add ${(50 - total).toFixed(2)} more for free shipping!
                </div>
              )}
            </div>

            <div className="cart-actions">
              <button onClick={onClear} className="btn-secondary clear-cart">
                <FiTrash2 /> Clear Cart
              </button>
              <button 
                onClick={() => setStep(2)} 
                className="btn-primary checkout-btn"
              >
                <FiLock /> Proceed to Checkout
              </button>
            </div>

            <div className="security-badges">
              <div className="security-badge">
                <FiShield />
                <span>Secure Checkout</span>
              </div>
              <div className="security-badge">
                <FiLock />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
