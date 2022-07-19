// es6 문법으로 하려 했더니 에러가 났다? 페이지가 아예 열리지 않음
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  }))
};