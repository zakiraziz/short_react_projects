import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './App.css';

// Lazy load components for better performance
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const AboutPage = lazy(() => import('./components/AboutPage/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage/ContactPage'));
const ServicesPage = lazy(() => import('./components/ServicesPage/ServicesPage'));
const PortfolioPage = lazy(() => import('./components/PortfolioPage/PortfolioPage'));
const BlogPage = lazy(() => import('./components/BlogPage/BlogPage'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage/BlogPostPage'));
const PricingPage = lazy(() => import('./components/PricingPage/PricingPage'));
const LoginPage = lazy(() => import('./components/LoginPage/LoginPage'));
const DashboardPage = lazy(() => import('./components/DashboardPage/DashboardPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage/NotFoundPage'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Track page views
  useEffect(() => {
    const trackPageView = () => {
      if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: window.location.href
        });
      }
    };

    trackPageView();
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <LoadingSpinner size="large" />
        <p>Loading amazing experience...</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <div className="app">
              <Header />
              <main className="main-content">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    
                    {/* Authentication Routes */}
                    <Route 
                      path="/login" 
                      element={
                        <PublicRoute>
                          <LoginPage />
                        </PublicRoute>
                      } 
                    />
                    
                    {/* Protected Routes */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute>
                          <DashboardPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/dashboard/:tab" 
                      element={
                        <ProtectedRoute>
                          <DashboardPage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Error Routes */}
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

// Custom hook for authentication (would be in a separate file)
const useAuth = () => {
  // This would typically come from your AuthContext
  return {
    isAuthenticated: false, // This would be dynamic
    user: null,
    login: () => {},
    logout: () => {}
  };
};

// Navigate component for routing
const Navigate = ({ to, replace }) => {
  // This is a simplified version - in real app, you'd use react-router-dom's Navigate
  useEffect(() => {
    if (replace) {
      window.location.replace(to);
    } else {
      window.location.href = to;
    }
  }, [to, replace]);
  
  return null;
};

export default App;
