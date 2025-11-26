import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingProvider from './components/LoadingProvider'
import './index.css'
import App from './App.jsx'

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

// Performance monitoring
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

// Error handler for uncaught errors
const handleGlobalError = (error, errorInfo) => {
  console.error('Global error caught:', error, errorInfo)
  // Here you can send errors to your error reporting service
  // Sentry.captureException(error, { extra: errorInfo })
}

// Strict mode wrapper with additional providers
const Root = () => {
  return (
    <StrictMode>
      <ErrorBoundary onError={handleGlobalError}>
        <ThemeProvider>
          <AuthProvider>
            <LoadingProvider>
              <Router>
                <App />
              </Router>
            </LoadingProvider>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  )
}

// Create root with error handling
const container = document.getElementById('root')

if (!container) {
  throw new Error('Failed to find the root element')
}

const root = createRoot(container)

try {
  root.render(<Root />)
} catch (error) {
  console.error('Failed to render app:', error)
  // Fallback UI for rendering errors
  const FallbackUI = () => (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Something went wrong</h1>
      <p>We're working on fixing this issue. Please try refreshing the page.</p>
      <button 
        onClick={() => window.location.reload()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Refresh Page
      </button>
    </div>
  )
  
  // Render fallback UI
  createRoot(container).render(<FallbackUI />)
}

// Export for testing purposes
export { reportWebVitals }

// Development-only features
if (process.env.NODE_ENV === 'development') {
  // Enable React DevTools hook
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.inject?.({
    // Custom dev tools configuration
  })

  // Hot Module Replacement for development
  if (import.meta.hot) {
    import.meta.hot.accept('./App', () => {
      root.render(<Root />)
    })
  }

  // Log build information
  console.log(`App version: ${process.env.REACT_APP_VERSION || 'development'}`)
  console.log(`Build date: ${new Date().toISOString()}`)
}

// Global utility function for analytics
window.trackEvent = (eventName, data) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, data)
  }
  // Alternative analytics service
  if (typeof mixpanel !== 'undefined') {
    mixpanel.track(eventName, data)
  }
}

// Initialize analytics on page load
window.addEventListener('DOMContentLoaded', () => {
  // Track page view
  window.trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href
  })
})
