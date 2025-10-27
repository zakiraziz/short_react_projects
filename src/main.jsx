import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '10px 20px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
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
const perf = {
  start: performance.now(),
  log: () => {
    const loadTime = performance.now() - perf.start
    console.log(`App loaded in ${loadTime.toFixed(2)}ms`)
    
    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // You can send this to your analytics service
      console.log('Performance metric:', loadTime)
    }
  }
}

// Service Worker Registration (for PWA)
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.webkitResolveLocalFileSystemURL.register('/sw.js')
      console.log('SW registered: ', registration)
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError)
    }
  }
}

// Theme Management
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'light'
  })

  React.useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return React.cloneElement(children, { theme, toggleTheme })
}

// Analytics (basic implementation)
const initializeAnalytics = () => {
  if (process.env.NODE_ENV === 'production') {
    // Initialize your analytics service here
    console.log('Analytics initialized')
    
    // Track page view
    const trackPageView = () => {
      console.log(`Page viewed: ${window.location.pathname}`)
      // Add your analytics tracking code here
    }
    
    trackPageView()
  }
}

// Loading Component
const AppLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div className="loading" style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p>Loading your application...</p>
  </div>
)

// Main render function with enhancements
const renderApp = () => {
  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    console.error('Root element not found!')
    return
  }

  const root = createRoot(rootElement)

  // Show loading state initially
  root.render(<AppLoader />)

  // Simulate loading and then render main app
  setTimeout(() => {
    try {
      // Initialize services
      initializeAnalytics()
      
      if (process.env.NODE_ENV === 'production') {
        registerServiceWorker()
      }

      root.render(
        <StrictMode>
          <ErrorBoundary>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </ErrorBoundary>
        </StrictMode>
      )

      // Log performance after render
      setTimeout(perf.log, 100)
      
    } catch (error) {
      console.error('Failed to render app:', error)
      root.render(
        <div style={{ padding: '2rem' }}>
          <h1>Failed to load application</h1>
          <p>Please check your connection and try again.</p>
        </div>
      )
    }
  }, 500) // Simulate 500ms loading time
}

// Enhanced error handling for initial render
try {
  renderApp()
} catch (error) {
  console.error('Critical error during app initialization:', error)
  
  // Fallback render
  const rootElement = document.getElementById('root')
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif;">
        <h1>Application Error</h1>
        <p>We're unable to load the application at this time.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin: 10px;">
          Reload Page
        </button>
      </div>
    `
  }
}

// Hot Module Replacement for development
if (import.meta.hot) {
  import.meta.hot.accept('./App.jsx', () => {
    console.log('Hot reloading App component...')
    renderApp()
  })
}

// Export for testing purposes
export { ErrorBoundary, ThemeProvider }
