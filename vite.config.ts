import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173,
    proxy: {
      // 代理所有API请求（/upload, /banner, /resource等）
      '^/(upload|banner|resource|course|exam|analysis|ai|auth)': {
        target: 'https://dszk.fzu.edu.cn/dszk-api',
        changeOrigin: true,
        secure: false,
        ws: true,
        // 确保所有headers都被转发
        headers: {
          // Vite代理会自动转发所有请求头，包括AuthToken
        },
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('====== Vite代理转发 ======')
            console.log('方法:', req.method)
            console.log('原始URL:', req.url)
            console.log('目标URL: https://dszk.fzu.edu.cn/dszk-api' + req.url)
            console.log('请求头:')
            console.log('  - AuthToken:', req.headers['authtoken'])
            console.log('  - Content-Type:', req.headers['content-type'])
            console.log('  - Content-Length:', req.headers['content-length'])
            console.log('转发后的请求头:')
            const headers = proxyReq.getHeaders()
            console.log('  - AuthToken:', headers['authtoken'])
            console.log('  - Content-Type:', headers['content-type'])
            console.log('  - Content-Length:', headers['content-length'])
            console.log('========================')
          })
          
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('====== 代理响应 ======')
            console.log('URL:', req.url)
            console.log('状态码:', proxyRes.statusCode)
            console.log('响应头:', proxyRes.headers)
            console.log('===================')
          })
          
          proxy.on('error', (err, req, _res) => {
            console.error('====== 代理错误 ======')
            console.error('URL:', req.url)
            console.error('错误:', err.message)
            console.error('完整错误:', err)
            console.error('===================')
          })
        }
      }
    }
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': []
        }
      }
    }
  }
})
