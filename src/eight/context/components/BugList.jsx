import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useLoading } from './contexts/LoadingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import NotificationContainer from './components/NotificationContainer';
import ProtectedRoute from './components/ProtectedRoute';
import { AnimatePresence } from 'framer-motion';
import './App.css';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Contact = lazy(() => import('./pages/Contact'));
const Profile = lazy(() => import('./pages/Profile'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const FAQ = lazy(() => import('./pages/FAQ'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="large" />
    <p>Loading page...</p>
  </div>
);

function App() {
  const { user, loading: authLoading } = useAuth();
  const { loading: appLoading } = useLoading();
  const location = useLocation();

  // Track page views
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Analytics tracking
      console.log('Page view:', location.pathname);
    }
  }, [location]);

  // Show global loading if auth is still loading
  if (authLoading) {
    return (
      <div className="app-loading">
        <LoadingSpinner size="xlarge" />
        <h2>Loading Application...</h2>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Global Notification Container */}
      <NotificationContainer />
      
      {/* Scroll to top helper */}
      <ScrollToTop />
      
      {/* Main App Structure */}
      <div className="app-container">
        <Navbar />
        
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
              <Routes location={location} key={location.pathname}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                
                {/* Auth Routes - redirect to dashboard if already logged in */}
                <Route 
                  path="/login" 
                  element={
                    user ? <Navigate to="/dashboard" replace /> : <Login />
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    user ? <Navigate to="/dashboard" replace /> : <Register />
                  } 
                />
                
                {/* Protected Routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-confirmation/:orderId"
                  element={
                    <ProtectedRoute>
                      <OrderConfirmation />
                    </ProtectedRoute>
                  }
                />
                
                {/* Admin Routes - additional role check */}
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                
                {/* Redirect old routes */}
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/shop" element={<Navigate to="/products" replace />} />
                
                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
        
        <Footer />
      </div>
      
      {/* Global Loading Overlay */}
      {appLoading && (
        <div className="global-loading-overlay">
          <div className="loading-content">
            <LoadingSpinner size="large" />
            <p>Processing your request...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
