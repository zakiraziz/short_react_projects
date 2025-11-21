// Import the React factory function from the optimized chunk
import {
  require_react,
  require_react_jsx_runtime,
  require_react_dom
} from "./chunk-Y455YYDO.js";

// Load React from the internal require function
const React = require_react();

// Optional: Load JSX runtime (useful for components using JSX)
const ReactJSX = require_react_jsx_runtime ? require_react_jsx_runtime() : {};

// Optional: Load ReactDOM if available
const ReactDOM = require_react_dom ? require_react_dom() : {};

// Example helper function
export function createElement(type, props, ...children) {
  return React.createElement(type, props, ...children);
}

// Example small component (just for demonstration)
export function HelloComponent() {
  return createElement("h1", null, "Hello from the custom module!");
}

// Example utility
export const versionInfo = {
  builtAt: "2025-11-21",
  environment: "development",
  module: "react-wrapper"
};

// Default export is same as original
export default React;
