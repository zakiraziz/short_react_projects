import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ShoeList from './components/ShoeList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductDetail from './components/ProductDetail';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmation from './components/OrderConfirmation';
import Wishlist from './components/Wishlist';
import SearchResults from './components/SearchResults';
import { shoesData } from './data/shoesData';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const location = useLocation();
  const { user } = useAuth();

  // Show notification
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadPersistedData = () => {
      try {
        const savedCart = localStorage.getItem('cartItems');
        const savedWishlist = localStorage.getItem('wishlistItems');
        const savedRecent = localStorage.getItem('recentlyViewed');
        
        if (savedCart) setCartItems(JSON.parse(savedCart));
        if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
        if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
      } catch (error) {
        console.error('Error loading persisted data:', error);
      }
    };

    loadPersistedData();
    
    // Simulate loading data
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Save data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Close cart when route changes
  useEffect(() => {
    setShowCart(false);
    setShowWishlist(false);
  }, [location.pathname]);

  const addToCart = useCallback((shoe, quantity = 1, size = 'M', color = 'Black') => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === shoe.id && item.size === size && item.color === color
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        showNotification(`Updated quantity for ${shoe.name} in cart`, 'info');
        return newItems;
      }

      const newItem = {
        ...shoe,
        quantity,
        size,
        color,
        addedAt: new Date().toISOString()
      };
      
      showNotification(`Added ${shoe.name} to cart`);
      return [...prevItems, newItem];
    });
  }, [showNotification]);

  const removeFromCart = useCallback((index) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      const removedItem = newItems[index];
      
      if (removedItem.quantity > 1) {
        newItems[index] = { ...removedItem, quantity: removedItem.quantity - 1 };
        showNotification(`Reduced quantity for ${removedItem.name}`, 'info');
        return newItems;
      } else {
        showNotification(`Removed ${removedItem.name} from cart`, 'warning');
        return newItems.filter((_, i) => i !== index);
      }
    });
  }, [showNotification]);

  const removeCartItem = useCallback((index) => {
    setCartItems(prevItems => {
      const removedItem = prevItems[index];
      showNotification(`Removed ${removedItem.name} from cart`, 'warning');
      return prevItems.filter((_, i) => i !== index);
    });
  }, [showNotification]);

  const updateCartItemQuantity = useCallback((index, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = { ...newItems[index], quantity: newQuantity };
      return newItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    showNotification('Cart cleared', 'warning');
  }, [showNotification]);

  // Wishlist functions
  const toggleWishlist = useCallback((shoe) => {
    setWishlistItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === shoe.id);
      
      if (existingIndex > -1) {
        showNotification(`Removed ${shoe.name} from wishlist`, 'warning');
        return prevItems.filter((_, i) => i !== existingIndex);
      } else {
        showNotification(`Added ${shoe.name} to wishlist`);
        return [...prevItems, { ...shoe, addedAt: new Date().toISOString() }];
      }
    });
  }, [showNotification]);

  const isInWishlist = useCallback((shoeId) => {
    return wishlistItems.some(item => item.id === shoeId);
  }, [wishlistItems]);

  // Recently viewed
  const addToRecentlyViewed = useCallback((shoe) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== shoe.id);
      const updated = [shoe, ...filtered].slice(0, 10); // Keep only last 10 items
      return updated;
    });
  }, []);

  // Checkout functions
  const handleCheckoutComplete = useCallback((order) => {
    setOrderDetails(order);
    setIsCheckoutComplete(true);
    clearCart();
    showNotification('Order placed successfully!', 'success');
  }, [clearCart, showNotification]);

  const continueShopping = useCallback(() => {
    setIsCheckoutComplete(false);
    setOrderDetails(null);
  }, []);

  // Filter and sort functions
  const calculateTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }, [cartItems]);

  const filteredShoes = shoesData.filter(shoe => {
    const matchesFilter = filter === 'all' || shoe.category === filter;
    const matchesSearch = searchTerm === '' || 
                         shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         shoe.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shoe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = shoe.price >= priceRange[0] && shoe.price <= priceRange[1];
    
    return matchesFilter && matchesSearch && matchesPrice;
  });

  const sortedShoes = [...filteredShoes].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.featured ? -1 : 1;
    }
  });

  // App content based on route
  const renderMainContent = () => {
    if (showCart) {
      return (
        <Cart 
          items={cartItems} 
          onRemove={removeCartItem}
          onUpdateQuantity={updateCartItemQuantity}
          onClose={() => setShowCart(false)}
          onClear={clearCart}
          total={calculateTotal()}
          isOpen={showCart}
        />
      );
    }

    if (showWishlist) {
      return (
        <Wishlist 
          items={wishlistItems}
          onClose={() => setShowWishlist(false)}
          onAddToCart={addToCart}
          onRemoveItem={(id) => setWishlistItems(prev => prev.filter(item => item.id !== id))}
          isOpen={showWishlist}
        />
      );
    }

    return (
      <Routes>
        <Route path="/" element={
          <HomePage 
            shoes={shoesData}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
            recentlyViewed={recentlyViewed}
          />
        } />
        <Route path="/products" element={
          <>
            <div className="products-header">
              <div className="filters-toolbar">
                <div className="filter-group">
                  <label>Category:</label>
                  <div className="filter-buttons">
                    {['all', 'men', 'women', 'kids'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="filter-group">
                  <label>Sort by:</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                  <div className="price-range">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    />
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    />
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading amazing shoes...</p>
              </div>
            ) : (
              <ShoeList 
                shoes={sortedShoes} 
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
              />
            )}
          </>
        } />
        <Route path="/product/:id" element={
          <ProductDetail 
            shoes={shoesData}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
            onViewProduct={addToRecentlyViewed}
          />
        } />
        <Route path="/checkout" element={
          <CheckoutPage 
            cartItems={cartItems}
            onUpdateQuantity={updateCartItemQuantity}
            onRemoveItem={removeCartItem}
            onClearCart={clearCart}
            onCheckoutComplete={handleCheckoutComplete}
          />
        } />
        <Route path="/confirmation" element={
          <OrderConfirmation 
            order={orderDetails}
            onContinueShopping={continueShopping}
          />
        } />
        <Route path="/search" element={
          <SearchResults 
            searchTerm={searchTerm}
            shoes={sortedShoes}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
          />
        } />
        <Route path="/men" element={<CategoryPage category="men" />} />
        <Route path="/women" element={<CategoryPage category="women" />} />
        <Route path="/kids" element={<CategoryPage category="kids" />} />
      </Routes>
    );
  };

  const CategoryPage = ({ category }) => (
    <div>
      <div className="category-header">
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)}'s Shoes</h1>
        <p>Discover our latest {category}'s footwear collection</p>
      </div>
      <ShoeList 
        shoes={shoesData.filter(shoe => shoe.category === category)} 
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
    </div>
  );

  return (
    <div className="App">
      {/* Notification System */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
          <button 
            onClick={() => setNotification(null)}
            className="notification-close"
          >
            ×
          </button>
        </div>
      )}

      <Header 
        cartCount={cartItems.reduce((count, item) => count + (item.quantity || 1), 0)} 
        wishlistCount={wishlistItems.length}
        onCartClick={() => setShowCart(true)}
        onWishlistClick={() => setShowWishlist(true)}
        onSearch={setSearchTerm}
        user={user}
      />
      
      <main className={showCart || showWishlist ? 'sidebar-open' : ''}>
        {renderMainContent()}
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
