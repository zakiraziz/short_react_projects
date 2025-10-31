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

