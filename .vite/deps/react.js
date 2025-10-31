import {
  require_react,
  require_react_dom,
  require_react_jsx_runtime,
  require_scheduler
} from "./chunk-Y455YYDO.js";
import {
  __toESM,
  __commonJS,
  __publicField,
  __async
} from "./chunk-ABC123EF.js";
import {
  require_axios,
  require_lodash
} from "./chunk-XYZ789GH.js";

// React core
export default require_react();

// React DOM exports
export const ReactDOM = require_react_dom();

// React JSX Runtime exports
export const jsx = require_react_jsx_runtime().jsx;
export const jsxs = require_react_jsx_runtime().jsxs;
export const jsxDEV = require_react_jsx_runtime().jsxDEV;
export const Fragment = require_react().Fragment;

// React hooks and utilities
export const {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
  useDebugValue,
  createContext,
  createElement,
  cloneElement,
  isValidElement,
  version
} = require_react();

// Scheduler for concurrent features
export const scheduler = require_scheduler();

// Third-party libraries
export const axios = require_axios();
export const lodash = require_lodash();

// Custom utility functions
export function createApp(Component, containerId = 'root') {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container element with id '${containerId}' not found`);
  }
  return ReactDOM.createRoot(container).render(jsx(Component));
}

export function lazy(importFn, fallback = null) {
  return require_react().lazy(() => __async(void 0, null, function* () {
    try {
      return yield importFn();
    } catch (error) {
      console.error('Lazy loading failed:', error);
      return { default: () => fallback || jsx("div", { children: "Loading failed" }) };
    }
  }));
}

export function withRouter(Component) {
  return function WithRouterWrapper(props) {
    const [path, setPath] = useState(window.location.pathname);
    
    useEffect(() => {
      const handlePopState = () => setPath(window.location.pathname);
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }, []);
    
    const navigate = (to) => {
      window.history.pushState({}, '', to);
      setPath(to);
    };
    
    return jsx(Component, {
      ...props,
      route: path,
      navigate: navigate
    });
  };
}
// Error boundary component
export class ErrorBoundary extends require_react().Component {
  constructor(props) {
    super(props);
    __publicField(this, "state", {
      hasError: false,
      error: null
    });
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || jsx("div", {
        className: "error-boundary",
        children: [
          jsx("h1", { children: "Something went wrong" }),
          jsx("p", { children: this.state.error?.message }),
          jsx("button", {
            onClick: () => this.setState({ hasError: false, error: null }),
            children: "Try again"
          })
        ]
      });
    }
    
    return this.props.children;
  }
}

// Custom hooks
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = __async(void 0, null, function* () {
      try {
        setLoading(true);
        setError(null);
        const response = yield axios.get(url, options);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Performance optimization utilities
export function memo(Component, propsAreEqual) {
  return require_react().memo(Component, propsAreEqual);
}

export function useMemoizedCallback(callback, deps) {
  return useCallback(callback, deps || []);
}

// Development helpers
if (process.env.NODE_ENV === 'development') {
  console.log('React bundle loaded in development mode');
  
  // Hot Module Replacement support
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      console.log('Hot reload triggered');
    });
  }
}
