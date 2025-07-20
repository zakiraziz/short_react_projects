import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ShoeList from './components/ShoeList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { shoesData } from './data/shoesData'; // Assuming you have a data file

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    // Simulate loading data
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (shoe) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.id === shoe.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === shoe.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      }
      return [...prevItems, { ...shoe, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      const item = newItems[index];
      
      if (item.quantity > 1) {
        newItems[index] = { ...item, quantity: item.quantity - 1 };
        return newItems;
      } else {
        return newItems.filter((_, i) => i !== index);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const filteredShoes = shoesData.filter(shoe => {
    const matchesFilter = filter === 'all' || shoe.category === filter;
    const matchesSearch = shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         shoe.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="App">
      <Header 
        cartCount={cartItems.reduce((count, item) => count + (item.quantity || 1), 0)} 
        onCartClick={() => setShowCart(!showCart)}
        onSearch={setSearchTerm}
      />
      
      <main>
        {showCart ? (
          <Cart 
            items={cartItems} 
            onRemove={removeFromCart} 
            onClose={() => setShowCart(false)}
            onClear={clearCart}
            total={calculateTotal()}
          />
        ) : (
          <>
            <div className="filters">
              <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
                All
              </button>
              <button onClick={() => setFilter('men')} className={filter === 'men' ? 'active' : ''}>
                Men
              </button>
              <button onClick={() => setFilter('women')} className={filter === 'women' ? 'active' : ''}>
                Women
              </button>
              <button onClick={() => setFilter('kids')} className={filter === 'kids' ? 'active' : ''}>
                Kids
              </button>
            </div>
            
            {isLoading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <ShoeList 
                shoes={filteredShoes} 
                onAddToCart={addToCart} 
              />
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;