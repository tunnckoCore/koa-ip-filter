var koa = require('koa')
var ipFilter = require('./index')
var helloWorld = require('koa-hello-world')

var app = koa()

app
.use(ipFilter({
  blacklist: ['123.*.*.77', '8.8.8.8']
}))
.use(helloWorld())

app.listen(1234)
console.log('koa server start listening on http://localhost:1234')

// if your IP (let say 123.48.92.77) not match to blacklisted IPs
// it will display 'Hello World'
