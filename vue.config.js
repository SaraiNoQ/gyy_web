'use strict'
/* nodejs代理解决CORS问题 */
const proxyObj = {}
// proxyObj['/ws'] = {
//   ws: true,
//   target: 'ws://localhost'
// }
proxyObj['/'] = {
  // websocket
  ws: false,
  // 目标地址
  target: 'http://localhost:80',
  // 发送请求头中host会设置成target
  changeOrigin: true,
  // 不重写请求地址
  pathRewrite: {
    '^/': '/'
  }
}
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080, // 前端端口号
    proxy: proxyObj
  }
}
