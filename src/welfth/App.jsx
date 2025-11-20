// App.jsx (Main Entry)
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Products from './pages/Products';
import Categories from './pages/Categories';
import SearchResults from './pages/SearchResults';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ToastNotification from './components/ToastNotification';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import './styles/main.css';

// Mock user data (replace with actual authentication)
const MOCK_USER = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/avatars/user1.jpg'
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load all data from localStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const savedUser = JSON.parse(localStorage.getItem('user')) || null;

        setCart(savedCart);
        setWishlist(savedWishlist);
        setUser(savedUser);
        
        // Simulate API loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error loading data:', error);
        showToast('Error loading your data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Toast notification system
  const showToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now().toString();
    const newToast = { id, message, type, duration };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Cart operations
  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`${product.name} added to cart`, 'success');
  }, [showToast]);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  }, [showToast]);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    showToast('Cart cleared', 'info');
  }, [showToast]);

  // Wishlist operations
  const addToWishlist = useCallback((product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) {
        showToast('Item already in wishlist', 'warning');
        return prev;
      }
      showToast(`${product.name} added to wishlist`, 'success');
      return [...prev, product];
    });
  }, [showToast]);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from wishlist', 'info');
  }, [showToast]);

  // Authentication operations
  const login = useCallback((email, password) => {
    // Mock login - replace with actual authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(MOCK_USER);
        showToast('Welcome back!', 'success');
        resolve(MOCK_USER);
      }, 1000);
    });
  }, [showToast]);

  const register = useCallback((userData) => {
    // Mock registration - replace with actual authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...userData, id: Date.now() };
        setUser(newUser);
        showToast('Account created successfully!', 'success');
        resolve(newUser);
      }, 1000);
    });
  }, [showToast]);

  const logout = useCallback(() => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  }, [showToast]);

  const updateProfile = useCallback((userData) => {
    setUser(prev => ({ ...prev, ...userData }));
    showToast('Profile updated successfully', 'success');
  }, [showToast]);

  // Search functionality
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Calculate cart total
  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const price = item.onSale ? item.salePrice : item.price;
      return total + (price * item.quantity);
    }, 0);
  }, [cart]);

  // Calculate cart item count
  const getCartItemCount = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider value={{ user, login, register, logout, updateProfile }}>
      <CartProvider value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        getCartTotal,
        getCartItemCount 
      }}>
        <WishlistProvider value={{ wishlist, addToWishlist, removeFromWishlist }}>
          <Router>
            <div className={`app ${isMenuOpen ? 'menu-open' : ''}`}>
              <Navbar 
                cartCount={getCartItemCount()}
                wishlistCount={wishlist.length}
                setIsMenuOpen={setIsMenuOpen}
                onSearch={handleSearch}
                user={user}
              />
              
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home addToCart={addToCart} />} />
                  <Route path="/products" element={<Products addToCart={addToCart} />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:categoryId" element={<Products addToCart={addToCart} />} />
                  <Route path="/product/:id" element={<ProductPage addToCart={addToCart} addToWishlist={addToWishlist} />} />
                  <Route path="/search" element={<SearchResults searchQuery={searchQuery} addToCart={addToCart} />} />
                  <Route 
                    path="/cart" 
                    element={
                      <Cart 
                        cart={cart}
                        removeFromCart={removeFromCart}
                        updateQuantity={updateQuantity}
                        clearCart={clearCart}
                        getCartTotal={getCartTotal}
                      />
                    } 
                  />
                  <Route path="/checkout" element={<Checkout cart={cart} getCartTotal={getCartTotal} />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/wishlist" element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} addToCart={addToCart} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<div className="page-not-found">Page Not Found</div>} />
                </Routes>
              </main>

              <Footer />
              
              {/* Toast Notifications */}
              <div className="toast-container">
                {toasts.map(toast => (
                  <ToastNotification
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                  />
                ))}
              </div>
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
