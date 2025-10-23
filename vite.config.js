import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'
import checker from 'vite-plugin-checker'
import { createHtmlPlugin } from 'vite-plugin-html'
import compression from 'vite-plugin-compression'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '')

  const isProduction = mode === 'production'
  const isDevelopment = mode === 'development'
  const isAnalyze = mode === 'analyze'

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
            isDevelopment && 'babel-plugin-styled-components',
          ].filter(Boolean),
          presets: [
            // Optional: Add custom presets
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
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      }),

      // PWA support
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
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
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
              },
            },
          ],
        },
        manifest: {
          name: env.VITE_APP_NAME || 'My React App',
          short_name: env.VITE_APP_SHORT_NAME || 'ReactApp',
          description: env.VITE_APP_DESCRIPTION || 'My Awesome React Application',
          theme_color: env.VITE_APP_THEME_COLOR || '#ffffff',
          background_color: env.VITE_APP_BACKGROUND_COLOR || '#ffffff',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          orientation: 'portrait-primary',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          categories: ['productivity', 'utilities'],
        },
        devOptions: {
          enabled: isDevelopment,
          type: 'module',
          navigateFallback: 'index.html',
        },
        includeAssets: ['favicon.ico', 'robots.txt', 'sitemap.xml'],
      }),

      // HTML minification and variable injection
      createHtmlPlugin({
        minify: isProduction,
        inject: {
          data: {
            title: env.VITE_APP_TITLE || 'React App',
            description: env.VITE_APP_DESCRIPTION || 'My Awesome React Application',
            keywords: env.VITE_APP_KEYWORDS || 'react,app,vite',
          },
        },
      }),

      // Gzip and Brotli compression
      isProduction && compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
      }),
      isProduction && compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
      }),

      // Legacy browser support
      isProduction && legacy({
        targets: ['defaults', 'not IE 11'],
        modernPolyfills: true,
      }),

      // Bundle visualizer (only in analyze mode)
      isAnalyze && visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap', // 'sunburst' | 'treemap' | 'network'
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
        '@types': path.resolve(__dirname, './src/types'),
        '@services': path.resolve(__dirname, './src/services'),
        '@store': path.resolve(__dirname, './src/store'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs'],
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
          additionalData: `
            @import "@styles/variables.scss";
            @import "@styles/mixins.scss";
            @import "@styles/functions.scss";
          `,
          charset: false,
        },
        less: {
          modifyVars: {
            // Ant Design or other Less variables
          },
          javascriptEnabled: true,
        },
      },
      devSourcemap: true,
    },

    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: isProduction ? 'hidden' : true,
      minify: isProduction ? 'esbuild' : false,
      target: 'esnext',
      chunkSizeWarningLimit: 1600,
      reportCompressedSize: false,
      
      // Chunking strategy
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor chunks
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react'
              }
              if (id.includes('@mui') || id.includes('antd')) {
                return 'vendor-ui'
              }
              if (id.includes('lodash') || id.includes('ramda')) {
                return 'vendor-utils'
              }
              if (id.includes('axios') || id.includes('fetch')) {
                return 'vendor-network'
              }
              return 'vendor'
            }
            
            // Route-based chunk splitting
            if (id.includes('/pages/') || id.includes('/routes/')) {
              const match = id.match(/(?:\/pages\/|\/routes\/)(.+?)(?:\/index)?\.(jsx?|tsx?)$/)
              if (match) {
                return `page-${match[1]}`
              }
            }
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? '')) {
              return 'assets/images/[name]-[hash][extname]'
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? '')) {
              return 'assets/fonts/[name]-[hash][extname]'
            }
            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
        },
        external: [
          // Add external dependencies here if needed
        ],
      },
    },

    // Server configuration
    server: {
      port: parseInt(env.VITE_PORT || '3000'),
      host: true, // Listen on all addresses
      open: env.VITE_OPEN_BROWSER !== 'false', // Automatically open browser
      cors: true,
      hmr: {
        overlay: true,
      },
      
      // Proxy configuration for API
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, options) => {
            // Proxy event handlers
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err)
            })
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url)
            })
          },
        },
        '/uploads': {
          target: env.VITE_UPLOAD_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        },
      },
    },

    // Preview configuration (for previewing production build)
    preview: {
      port: parseInt(env.VITE_PREVIEW_PORT || '4173'),
      host: true,
      cors: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __APP_ENV__: JSON.stringify(mode),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },

    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-query',
        'axios',
      ],
      exclude: [
        // Add dependencies to exclude from pre-bundling
      ],
      force: env.VITE_OPTIMIZE_DEPS_FORCE === 'true',
    },

    // Experimental features
    experimental: {
      renderBuiltUrl(filename: string, { hostType }: { hostType: 'js' | 'css' | 'html' }) {
        if (hostType === 'js') {
          return { runtime: `window.assetsPath + ${JSON.stringify(filename)}` }
        }
        return { relative: true }
      },
    },

    // Worker configuration
    worker: {
      format: 'es',
      plugins: () => [
        // Add worker-specific plugins if needed
      ],
    },
  }
})
