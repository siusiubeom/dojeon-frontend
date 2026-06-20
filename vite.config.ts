import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_PROXY_API_TARGET || 'http://localhost:3000'
  const apiPaths = [
    '/auth',
    '/user',
    '/home',
    '/courses',
    '/lessons',
    '/practice',
    '/section',
    '/scrap',
    '/subscription',
    '/nlp',
  ]

  return {
    base: '/dojeon-frontend/',
    plugins: [react()],
    server: {
      proxy: Object.fromEntries(
        apiPaths.map((path) => [
          path,
          {
            target: proxyTarget,
            changeOrigin: true,
          },
        ]),
      ),
    },
  }
})
