import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Plugins
import eslint from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import viteImagemin from 'vite-plugin-imagemin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  const isDev = mode === 'development'
  
  return {
    plugins: [
      react({
        // Enable Fast Refresh in development
        fastRefresh: isDev,
        // Include JSX runtime automatically
        jsxRuntime: 'automatic',
        // Babel configuration
        babel: {
          plugins: [
            // Add any Babel plugins here
            isDev && require.resolve('react-refresh/babel'),
          ].filter(Boolean),
        },
      }),
      
      // Linting in development
      eslint({
        lintOnStart: false,
        failOnError: false,
        cache: true,
      }),
      
      // SVG as React components
      svgr({
        svgrOptions: {
          icon: true,
          // Other SVGR options
        },
      }),
      
      // TypeScript path resolution
      tsconfigPaths(),
      
      // Gzip compression for production builds
      isProduction && compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 10240, // 10KB
        deleteOriginFile: false,
      }),
      
      // Brotli compression for production builds
      isProduction && compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 10240, // 10KB
        deleteOriginFile: false,
      }),
      
      // Image optimization
      isProduction && viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 80,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
      
