/*!
 * koa-ip-filter <https://github.com/tunnckoCore/koa-ip-filter>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var koa = require('koa')
var ipFilter = require('koa-ip-filter')
var helloWorld = require('koa-hello-world')

var app = koa()

app
.use(ipFilter({
  forbidden: '403: Get out of here!',
  blacklist: ['123.*.*.77', '8.8.8.8']
}))
.use(helloWorld())

app.listen(1234)
console.log('koa server start listening on http://localhost:1234')

// if your IP (let say 123.48.92.77) not match to `opts.blacklist`ed IPs
// it will display 'Hello World', otherwise '403: Get out of here!'
