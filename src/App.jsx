import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import OfflineIndicator from './components/OfflineIndicator/OfflineIndicator';
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
const FAQPage = lazy(() => import('./components/FAQPage/FAQPage'));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./components/TermsOfServicePage/TermsOfServicePage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage/NotFoundPage'));

// Protected Route Component
const ProtectedRoute = ({ children, requireAuth = false, requireAdmin = false }) => {
  const { user, isAdmin } = useAuth(); // This would come from your AuthContext
  
  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && (!user || !isAdmin)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

// App Layout Component
const AppLayout = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return (
    <div className="app">
      <OfflineIndicator isOnline={isOnline} />
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Loading Fallback Component
const PageLoadingFallback = () => (
  <div className="page-loading">
    <LoadingSpinner size="large" />
    <p>Loading page...</p>
  </div>
);

function App() {
  const [appReady, setAppReady] = useState(false);
  
  // Simulate app initialization
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize app settings, fetch user data, etc.
        await Promise.all([
          // Add your initialization promises here
          new Promise(resolve => setTimeout(resolve, 1000)), // Simulated loading
        ]);
        
        setAppReady(true);
      } catch (error) {
        console.error('App initialization failed:', error);
        setAppReady(true); // Still set ready to show error state
      }
    };
    
    initializeApp();
  }, []);
  
  if (!appReady) {
    return (
      <div className="app-initializing">
        <div className="app-splash">
          <LoadingSpinner size="xlarge" />
          <h1>Welcome to Our App</h1>
          <p>Getting everything ready...</p>
        </div>
      </div>
    );
  }
  
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <LoadingProvider>
            <Router>
              <ScrollToTop />
              <AppLayout>
                <Suspense fallback={<PageLoadingFallback />}>
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
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsOfServicePage />} />
                    
                    {/* Protected Routes */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute requireAuth>
                          <DashboardPage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute requireAdmin>
                          <AdminPage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Auth Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    
                    {/* Error Routes */}
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />
                    <Route path="/maintenance" element={<MaintenancePage />} />
                    
                    {/* Redirects */}
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    
                    {/* 404 Catch All */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </AppLayout>
              
              {/* Global Components */}
              <CookieConsent />
              <NotificationContainer />
              <ModalPortal />
            </Router>
          </LoadingProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

// Performance monitoring
export const withPerformanceMonitoring = (Component) => {
  return function PerformanceMonitoredComponent(props) {
    useEffect(() => {
      // Track component mount time
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        
        if (loadTime > 1000) {
          console.warn(`Component ${Component.name} took ${loadTime}ms to load`);
        }
      };
    }, []);
    
    return <Component {...props} />;
  };
};

// Export app with performance monitoring in development
export default process.env.NODE_ENV === 'development' 
  ? withPerformanceMonitoring(App) 
  : App;
