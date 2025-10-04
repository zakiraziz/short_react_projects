import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react({
        // Enable Fast Refresh
        fastRefresh: true,
        // JSX runtime
        jsxRuntime: 'automatic',
        // Babel configuration
        babel: {
          plugins: [
            // Add any Babel plugins here
          ],
        },
      }),
    ],

    // Base public path when served in development or production
    base: mode === 'production' ? '/your-base-path/' : '/',

    // Resolve configuration
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@pages': resolve(__dirname, 'src/pages'),
      },
    },

    // Server configuration
    server: {
      port: 3000,
      host: true, // Listen on all addresses
      open: true, // Automatically open browser
      cors: true,
      proxy: {
        // Proxy API requests to avoid CORS issues
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        },
      },
    },

    // Preview server configuration
    preview: {
      port: 4173,
      host: true,
    },

    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production', // Generate sourcemaps in development
      minify: 'esbuild', // Use esbuild for faster minification
      // Chunk size warning limit
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          // Code splitting configuration
          manualChunks: {
            vendor: ['react', 'react-dom'],
            // You can add more chunks for larger libraries
            utils: ['lodash', 'axios'],
          },
          // File naming convention
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
    },

})
