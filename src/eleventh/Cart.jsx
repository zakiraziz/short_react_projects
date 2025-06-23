import React from 'react';

const Cart = ({ items, onRemove, onClose }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={onClose} className="close-btn">×</button>
      </div>
      
      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} width="50" />
                <div>
                  <h4>{item.brand} {item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <button onClick={() => onRemove(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
