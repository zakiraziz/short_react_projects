import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'
import checker from 'vite-plugin-checker'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '')

  const isProduction = mode === 'production'
  const isDevelopment = mode === 'development'

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
            // Add any Babel plugins you need
          ],
        },
      }),

      // TypeScript type checking
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        },
        overlay: {
          initialIsOpen: false,
        },
      }),

      // SVG support as React components
      svgr({
        svgrOptions: {
          icon: true,
          // SVGR options
        },
      }),

      // PWA support
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\./,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                networkTimeoutSeconds: 10,
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        manifest: {
          name: 'My React App',
          short_name: 'ReactApp',
          description: 'My Awesome React Application',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        devOptions: {
          enabled: isDevelopment,
          type: 'module',
          navigateFallback: 'index.html',
        },
      }),

      // Bundle visualizer (only in analyze mode)
      mode === 'analyze' && visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),

    // Base public path when served in production
    base: env.VITE_BASE_URL || '/',
   // Resolve configuration
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@styles': path.resolve(__dirname, './src/styles'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },

    // CSS configuration
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: isProduction 
          ? '[hash:base64:8]' 
          : '[name]__[local]--[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@styles/variables.scss";`,
        },
      },
    },

    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: isProduction ? 'hidden' : true,
      minify: isProduction ? 'esbuild' : false,
      target: 'esnext',
      
      // Chunking strategy
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['lodash', 'axios'],
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
    },

    // Server configuration
    server: {
      port: 3000,
      host: true, // Listen on all addresses
      open: true, // Automatically open browser
      cors: true,
      
      // Proxy configuration for API
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // Preview configuration (for previewing production build)
    preview: {
      port: 4173,
      host: true,
    },

    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },

    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
      ],
      exclude: [
        // Add dependencies to exclude from pre-bundling
      ],
    },
  }
})
 
