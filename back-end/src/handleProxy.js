const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api/v1/get-cookie',
    createProxyMiddleware({
      target: 'https://calendarvlu.onrender.com',
      changeOrigin: true
    }),
    '/api/v1/get-calendar',
    createProxyMiddleware({
      target: 'https://calendarvlu.onrender.com',
      changeOrigin: true
    }),
    '/api/v1/get-calendar-json',
    createProxyMiddleware({
      target: 'https://calendarvlu.onrender.com',
      changeOrigin: true
    })
  )
}
