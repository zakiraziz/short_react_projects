import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Performance monitoring
import reportWebVitals from './reportWebVitals'
import { sendToAnalytics } from './utils/analytics'

// Error Boundary Fallback Component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-container" role="alert">
      <div className="error-content">
        <h1>⚠️ Something went wrong</h1>
        <pre className="error-message">{error.message}</pre>
        <div className="error-actions">
          <button 
            className="btn-primary"
            onClick={resetErrorBoundary}
          >
            Try Again
          </button>
          <button 
            className="btn-secondary"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </button>
        </div>
        <details className="error-details">
          <summary>Error Details</summary>
          <pre>{error.stack}</pre>
        </details>
      </div>
    </div>
  )
}

// Application initialization log
console.log(`
  🚀 HealthAI Application Starting...
  🕒 ${new Date().toLocaleString()}
  🌍 Environment: ${import.meta.env.MODE}
  📱 User Agent: ${navigator.userAgent}
`)

// Service Worker Registration for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('✅ Service Worker registered:', registration.scope)
      },
      (error) => {
        console.warn('⚠️ Service Worker registration failed:', error)
      }
    )
  })
}

// Offline detection
window.addEventListener('offline', () => {
  console.warn('📴 Application is offline')
  // You can show an offline notification here
  if (typeof window.showOfflineNotification === 'function') {
    window.showOfflineNotification()
  }
})

window.addEventListener('online', () => {
  console.log('📶 Application is back online')
})

// Handle theme preference
const initializeTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const savedTheme = localStorage.getItem('healthAI-theme')
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark')
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

// Initialize theme before render
initializeTheme()

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('healthAI-theme')) {
    if (e.matches) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }
})

// Performance monitoring wrapper
const PerformanceWrapper = ({ children }) => {
  React.useEffect(() => {
    // Track initial load performance
    const startTime = performance.now()
    
    const handleLoad = () => {
      const loadTime = performance.now() - startTime
      console.log(`⏱️ Initial load took ${loadTime.toFixed(2)}ms`)
      
      // Send to analytics
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'timing_complete', {
          name: 'initial_load',
          value: Math.round(loadTime),
          event_category: 'Performance'
        })
      }
    }
    
    window.addEventListener('load', handleLoad)
    return () => window.removeEventListener('load', handleLoad)
  }, [])
  
  return children
}

// Root component with all providers
const Root = () => (
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
        window.location.reload()
      }}
      onError={(error, errorInfo) => {
        // Log error to error reporting service
        console.error('💥 Error Boundary caught an error:', error, errorInfo)
        
        // Send to error tracking service
        if (typeof window.Sentry !== 'undefined') {
          window.Sentry.captureException(error, {
            extra: errorInfo
          })
        }
      }}
    >
      <HelmetProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <PerformanceWrapper>
            <App />
          </PerformanceWrapper>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
)

// Get root element
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found. Please check your index.html')
}

// Create root with error handling
try {
  const root = createRoot(rootElement)
  
  // Render with error boundary
  root.render(<Root />)
  
  // Register for updates if using PWA
  if (import.meta.hot) {
    import.meta.hot.accept()
  }
  
} catch (error) {
  console.error('💥 Failed to render application:', error)
  
  // Show critical error message
  document.body.innerHTML = `
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <div>
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">🚨 Critical Error</h1>
        <p style="font-size: 1.2rem; margin-bottom: 2rem;">
          We're unable to load the application. Please try refreshing the page.
        </p>
        <button 
          onclick="window.location.reload()"
          style="
            background: white;
            color: #667eea;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease;
          "
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          Refresh Page
        </button>
        <div style="margin-top: 2rem; font-size: 0.9rem; opacity: 0.8;">
          <p>Error: ${error.message}</p>
          <p>Please contact support if the issue persists.</p>
        </div>
      </div>
    </div>
  `
}

// Development-only features
if (import.meta.env.DEV) {
  // Enable React Developer Tools
  if (typeof window !== 'undefined') {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.inject?.({
      renderers: new Map(),
      supportsFiber: true,
    })
  }
  
  // Log build info
  console.log(`
    🔧 Development Build
    📦 Version: ${import.meta.env.VITE_APP_VERSION || '1.0.0'}
    🔥 Hot Module Replacement: ${import.meta.hot ? 'Enabled' : 'Disabled'}
  `)
  
  // Mock Service Worker for API mocking (if using)
  if (import.meta.env.VITE_ENABLE_MSW === 'true') {
    import('./mocks/browser').then(({ worker }) => {
      worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      })
      console.log('🚀 Mock Service Worker started')
    })
  }
}

// Register service worker for production
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(() => {
    console.log('✅ Service Worker is ready')
  }).catch((error) => {
    console.warn('⚠️ Service Worker not ready:', error)
  })
}

// Performance measurement
if (import.meta.env.PROD) {
  reportWebVitals(sendToAnalytics)
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('🌍 Global error caught:', event.error)
  
  // Send to error tracking service
  if (typeof window.Sentry !== 'undefined') {
    window.Sentry.captureException(event.error)
  }
  
  // Prevent default error handling for certain errors
  if (event.error.message.includes('ResizeObserver')) {
    event.preventDefault()
  }
})

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('🔴 Unhandled promise rejection:', event.reason)
  
  // Send to error tracking service
  if (typeof window.Sentry !== 'undefined') {
    window.Sentry.captureException(event.reason)
  }
})

// Export for testing
export { ErrorFallback }