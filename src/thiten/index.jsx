import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ErrorBoundary } from 'react-error-boundary';

// Local imports
import './index.css';
import App from './App';
import { store, persistor } from './redux/store';
import theme from './theme/theme';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

// Service Worker for PWA (optional)
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// Error logging service
import { initErrorReporting } from './utils/errorReporting';
initErrorReporting();

const rootElement = document.getElementById('root');

// Error Boundary fallback component
function FallbackComponent({ error, resetErrorBoundary }) {
  return (
    <ErrorFallback 
      error={error} 
      onReset={resetErrorBoundary}
    />
  );
}

const app = (
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => window.location.reload()}
    >
      <Provider store={store}>
        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <App />
            </Router>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// Render the app
ReactDOM.render(app, rootElement);

// For Concurrent Mode (React 18+)
// const root = ReactDOM.createRoot(rootElement);
// root.render(app);

// PWA Service Worker registration
serviceWorkerRegistration.register();

// Performance monitoring
reportWebVitals(console.log); // or send to analytics service

// Hot Module Replacement for development
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(app, rootElement);
  });
}
