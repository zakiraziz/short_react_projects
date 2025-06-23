import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ShoeList from './components/ShoeList';
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (shoe) => {
    setCartItems([...cartItems, shoe]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  return (
    <div className="App">
      <Header cartCount={cartItems.length} onCartClick={() => setShowCart(!showCart)} />
      
      <main>
        {showCart ? (
          <Cart items={cartItems} onRemove={removeFromCart} onClose={() => setShowCart(false)} />
        ) : (
          <ShoeList onAddToCart={addToCart} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
