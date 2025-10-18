import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap', margin: '1rem 0' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <button 
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Performance Monitoring
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

// Performance callback function
const sendToAnalytics = ({ name, delta, id }) => {
  // Replace with your analytics service
  console.log(`Performance Metric - ${name}:`, delta, id)
  
  // Example: Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', 'performance_metric', {
      event_category: 'Performance Metrics',
      event_label: name,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      non_interaction: true,
    })
  }
}

// Theme Provider (optional - if you want to add theme context)
import { ThemeProvider } from './context/ThemeContext'

// Service Worker Registration for PWA
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('SW registered: ', registration)
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError)
    }
  }
}

// Initialize service worker in development or production
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}

// Custom console greeting for development
if (process.env.NODE_ENV === 'development') {
  console.log(`
    🚀 React App Started in Development Mode
    📅 Built: ${new Date().toLocaleDateString()}
    ⚡ Environment: ${process.env.NODE_ENV}
    🔧 Node: ${process.env.NODE_ENV}
  `)
}

// Root container setup with error handling
const container = document.getElementById('root')

if (!container) {
  throw new Error(
    "Root element with ID 'root' not found. Please check your index.html file."
  )
}

// Create root with additional configuration
const root = createRoot(container, {
  // React 18 concurrent features configuration
  unstable_concurrentUpdatesByDefault: true,
  identifierPrefix: 'app-',
})

// Render app with enhanced providers
try {
  root.render(
    <StrictMode>
      <ErrorBoundary>
        {/* <ThemeProvider> */}
          <App />
        {/* </ThemeProvider> */}
      </ErrorBoundary>
    </StrictMode>
  )
} catch (error) {
  console.error('Failed to render React app:', error)
  
  // Fallback UI if rendering fails completely
  container.innerHTML = `
    <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif;">
      <h1>Application Failed to Load</h1>
      <p>We're sorry, but the application encountered a critical error.</p>
      <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Reload Application
      </button>
    </div>
  `
}

// Export for testing and potential micro-frontend usage
export { root }

// Initialize performance monitoring
reportWebVitals(sendToAnalytics)

// Hot Module Replacement for development
if (import.meta.hot) {
  import.meta.hot.accept()
}

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error)
  // Send to error monitoring service
  if (window.errorMonitoringService) {
    window.errorMonitoringService.captureException(event.error)
  }
})

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  event.preventDefault()
})

// Performance observer for long tasks
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 100) { // Tasks longer than 100ms
        console.warn('Long task detected:', entry)
      }
    }
  })
  
  observer.observe({ entryTypes: ['longtask'] })
}
