// App.jsx (Main Entry)
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Wishlist from './pages/Wishlist';
import SearchResults from './pages/SearchResults';
import CategoryPage from './pages/CategoryPage';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ToastNotification from './components/ToastNotification';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import './styles/main.css';

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [user, setUser] = useState(null);

  // Load all data from localStorage
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        
        // Load cart
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);

        // Load wishlist
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);

        // Load user session
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
          setUser(savedUser);
        }

        // Simulate loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error initializing app:', error);
        showToast('Error loading your data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save user to localStorage
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
      let newCart;
      
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity }];
      }
      
      showToast(`${product.name} added to cart!`, 'success');
      return newCart;
    });
  }, [showToast]);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => {
      const removedProduct = prevCart.find(item => item.id === productId);
      const newCart = prevCart.filter(item => item.id !== productId);
      
      if (removedProduct) {
        showToast(`${removedProduct.name} removed from cart`, 'info');
      }
      
      return newCart;
    });
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
      
      const newWishlist = [...prev, product];
      showToast(`${product.name} added to wishlist!`, 'success');
      return newWishlist;
    });
  }, [showToast]);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prev => {
      const removedProduct = prev.find(item => item.id === productId);
      const newWishlist = prev.filter(item => item.id !== productId);
      
      if (removedProduct) {
        showToast(`${removedProduct.name} removed from wishlist`, 'info');
      }
      
      return newWishlist;
    });
  }, [showToast]);

  const moveToCart = useCallback((product) => {
    removeFromWishlist(product.id);
    addToCart(product);
  }, [removeFromWishlist, addToCart]);

  // User operations
  const login = useCallback((userData) => {
    setUser(userData);
    showToast(`Welcome back, ${userData.name}!`, 'success');
  }, [showToast]);

  const logout = useCallback(() => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  }, [showToast]);

  const register = useCallback((userData) => {
    setUser(userData);
    showToast(`Welcome, ${userData.name}! Account created successfully.`, 'success');
  }, [showToast]);

  // Cart totals and calculations
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // App-wide event handlers
  const handleBeforeUnload = useCallback((event) => {
    if (cart.length > 0) {
      event.preventDefault();
      event.returnValue = 'You have items in your cart. Are you sure you want to leave?';
      return event.returnValue;
    }
  }, [cart.length]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [handleBeforeUnload]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
