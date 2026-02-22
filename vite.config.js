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
            // Bundle analysis (run with `npm run build -- --mode analyze`)
      mode === 'analyze' && visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    
    // Path aliases
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@services': path.resolve(__dirname, './src/services'),
        '@store': path.resolve(__dirname, './src/store'),
        '@types': path.resolve(__dirname, './src/types'),
      },
    },
    
    // Development server configuration
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/ws': {
          target: 'ws://localhost:5000',
          ws: true,
        },
      },
      watch: {
        usePolling: true,
        interval: 100,
      },
      hmr: {
        overlay: true,
      },
    },
    
    // Preview server configuration
    preview: {
      port: 8080,
      strictPort: true,
      host: true,
      open: true,
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: isDev,
      minify: isProduction ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            utils: ['axios', 'lodash'],
            ui: ['@mui/material', '@emotion/react', '@emotion/styled'],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
              return 'assets/images/[name]-[hash][extname]'
            }
            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
        },
      },
      target: 'es2020',
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
    },
    
    // CSS configuration
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: isProduction 
          ? '[hash:base64:8]' 
          : '[name]__[local]__[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
          includePaths: ['node_modules'],
        },
      },
      devSourcemap: true,
      postcss: {
        plugins: [
          require('autoprefixer'),
          require('cssnano')({
            preset: 'default',
          }),
        ],
      },
    },
    
    // Environment variables
    define: {
      'process.env': process.env,
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __DEV__: isDev,
    },
    
    // Dependency optimization
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['@vite/client', '@vite/env'],
    },
    
    // ESBuild configuration
    esbuild: {
      jsxInject: `import React from 'react'`, // Auto-import React in JSX
      loader: 'jsx',
      include: /\.(jsx|js|tsx|ts)$/,
      exclude: [],
    },
    
    // Log level
    logLevel: 'info',
    
    // Clear screen on restart
    clearScreen: false,
  }
})
