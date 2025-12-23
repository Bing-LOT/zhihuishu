import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
  const baseUrl = env.VITE_APP_BASE_URL_DEV || 'https://dszk.fzu.edu.cn/'
  const apiPath = env.VITE_APP_BASE_API || 'dszk-api'
  const proxyTarget = baseUrl + apiPath // https://dszk.fzu.edu.cn/dszk-api

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      port: 5173,
      proxy: {
        // 代理所有API请求，解决开发环境跨域问题
        '^/(upload|banner|resource|politicalResource|politicalCourse|course|exam|analysis|ai|auth)': {
          target: proxyTarget, // https://dszk.fzu.edu.cn/dszk-api
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path
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
  }
})
