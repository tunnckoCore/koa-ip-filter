/*!
 * koa-ip-filter <https://github.com/tunnckoCore/koa-ip-filter>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var ipFilter = require('./index')
var request = require('supertest')
var extend = require('extend-shallow')
var helloWorld = require('koa-hello-world')
var koa = require('koa')

function middleware (opts) {
  opts = extend({
    id: function (ctx) {
      // `ctx` is same as `this`
      return this.request.header['x-koaip']
    }
  }, opts)

  return koa()
    .use(ipFilter(opts))
    .use(helloWorld())
}

test('koa-ip-filter:', function () {
  test('should say "Hello World"', function (done) {
    var app = middleware()

    request(app.callback())
      .get('/')
      .expect(200, 'Hello World')
      .end(done)
  })
  test('should have support for id option', function (done) {
    var app = middleware({
      id: function (ctx) {
        var ip = ctx.request.header['koa-ip']
        ctx.set('koa-ip', ip)
        return ip
      }
    })

    request(app.callback())
      .get('/')
      .set('koa-ip', '6.2.4.4')
      .expect('koa-ip', '6.2.4.4')
      .expect(200, 'Hello World')
      .end(done)
  })
  test('should support custom message for 403 Forbidden', function (done) {
    var app = middleware({
      forbidden: '403, Get out of here!',
      filter: ['!1.2.3.4']
    })

    request(app.callback())
      .get('/')
      .set('x-koaip', '1.2.3.4')
      .expect(403, '403, Get out of here!')
      .end(done)
  })
  test('should be able opts.forbidden to be function', function (done) {
    var app = middleware({
      forbidden: function (ctx) {
        return 'Get out of here!'
      },
      filter: ['123.48.*.77', '!123.*.192.??']
    })

    request(app.callback())
      .get('/')
      .set('x-koaip', '123.48.192.77')
      .expect(403, 'Get out of here!')
      .end(done)
  })
  test('should support blacklist option', function () {
    test('expect `403 Forbidden` when array blacklist and match', function (done) {
      var app = middleware({
        filter: ['1.2.*.4', '!1.2.3.4']
      })

      request(app.callback())
        .get('/')
        .set('x-koaip', '1.2.3.4')
        .expect(403, '403 Forbidden')
        .end(done)
    })
    test('expect `403 Forbidden` when blacklist function return falsey', function (done) {
      var app = middleware({
        filter: function (ip) {
          return ip.indexOf('1.2.3') === -1
        },
        id: function () {
          return this.request.header['x-koaip']
        }
      })

      request(app.callback())
        .get('/')
        .set('x-koaip', '1.2.3.4')
        .expect(403, '403 Forbidden')
        .end(done)
    })
  })
  test('should support whitelist option', function () {
    test('expect `200 OK`: ip match to whitelist', function (done) {
      var app = middleware({
        filter: ['127.??.6*.12', '!1.2.*.4']
      })

      request(app.callback())
        .get('/')
        .set('x-koaip', '127.43.65.12')
        .expect(200, 'Hello World')
        .end(done)
    })
    test('expect `403 Forbidden`: ip not match to whitelist (glob patterns)', function (done) {
      var app = middleware({
        filter: ['1.2.3.*']
      })

      request(app.callback())
        .get('/')
        .set('x-koaip', '7.7.7.7')
        .expect(403, '403 Forbidden')
        .end(done)
    })
  })
})
