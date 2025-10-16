import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './App.css';

// Create a theme for Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#a3b1f1',
      dark: '#5a6fd8',
    },
    secondary: {
      main: '#764ba2',
      light: '#9370b3',
      dark: '#5a3a7a',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

// Performance monitoring
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Service Worker Registration
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Root component with all providers
const Root = () => {
  React.useEffect(() => {
    // Register service worker in production
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker();
    }

    // Cleanup function
    return () => {
      // Any cleanup needed when app unmounts
    };
  }, []);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <LoadingProvider>
                  <AuthProvider>
                    <BrowserRouter>
                      <App />
                    </BrowserRouter>
                  </AuthProvider>
                </LoadingProvider>
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

// Get the root element
const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(container);

// Render the app
root.render(<Root />);

// Optional: Measure performance
if (process.env.NODE_ENV === 'development') {
  reportWebVitals(console.log);
}

// Hot Module Replacement (HMR) for development
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    root.render(<NextApp />);
  });
}

// Export for testing purposes
export { theme, reportWebVitals };
