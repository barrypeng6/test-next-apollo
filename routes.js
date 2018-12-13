const routes = require('next-routes');

module.exports = routes()
.add('index', '/', '/index')
.add('pages', '/pages/:path', '/pages')
.add('product', '/product/:pId', '/product')
.add('products', '/products', '/products')