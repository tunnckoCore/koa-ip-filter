/*!
 * koa-ip-filter <https://github.com/tunnckoCore/koa-ip-filter>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true, esnext:true */

'use strict'

var test = require('assertit')
var ipFilter = require('./index')
var request = require('supertest')
var helloWorld = require('koa-hello-world')
var koa = require('koa')

function middleware (fn) {
  return koa().use(fn).use(helloWorld()).callback()
}

test('koa-ip-filter:', function () {
  test('should yield next middleware if no `opts.filter` given', function (done) {
    var server = middleware(ipFilter())

    request(server)
      .get('/')
      .expect(200, 'Hello World')
      .end(done)
  })
  test('should have `opts.id` and it should be binded to koa this', function (done) {
    var server = middleware(ipFilter({
      id: function _id_ (ctx) {
        this.set('x-github-username', 'tunnckoCore')
        return ctx.request.header['x-koaip']
      }
    }))

    request(server)
      .get('/')
      .expect('x-github-username', 'tunnckoCore')
      .expect(200, 'Hello World')
      .end(done)
  })
  test('should `403 Forbidden` if not match to `opts.filter`', function (done) {
    var server = middleware(ipFilter({
      id: function () {
        return this.request.header['x-koaip']
      },
      filter: '1.2.3.*'
    }))

    request(server)
      .get('/')
      .set('x-koaip', '4.4.8.8')
      .expect(403, '403 Forbidden')
      .end(done)
  })
  test('should `403 Forbidden` if IP is in blacklist', function (done) {
    var server = middleware(ipFilter({
      id: function () {
        return this.request.header['x-koaip']
      },
      filter: ['*', '!89.???.30.*']
    }))

    request(server)
      .get('/')
      .set('x-koaip', '89.111.30.8')
      .expect(403, '403 Forbidden')
      .end(done)
  })
  test('should `200 OK` if not in blacklist range', function (done) {
    var server = middleware(ipFilter({
      id: function () {
        return this.request.header['x-koaip']
      },
      // it can be double star - globstar
      // or *.*.*.*
      filter: ['*.*.*.*', '!89.???.30.*']
    }))

    request(server)
      .get('/')
      .set('x-koaip', '4.4.8.8')
      .expect(200, 'Hello World')
      .end(done)
  })
  test('should support custom message for 403 Forbidden', function (done) {
    var server = middleware(ipFilter({
      id: function () {
        return this.request.header['x-koaip']
      },
      filter: ['*', '!89.???.30.*'],
      forbidden: '403, Get out of here!'
    }))

    request(server)
      .get('/')
      .set('x-koaip', '89.111.30.8')
      .expect(403, '403, Get out of here!')
      .end(done)
  })
  test('should be able `opts.forbidden` to be function', function (done) {
    var server = middleware(ipFilter({
      id: function () {
        return this.request.header['x-koaip']
      },
      filter: '123.225.23.120',
      forbidden: function (ctx) {
        this.set('X-Forbidden', 'Can be function')
        ctx.set('X-Seriously', 'yes')
        return 'opts.forbidden can be function'
      }
    }))

    request(server)
      .get('/')
      .set('x-koaip', '55.55.55.55')
      .expect('X-Forbidden', 'Can be function')
      .expect('X-Seriously', 'yes')
      .expect(403, 'opts.forbidden can be function')
      .end(done)
  })
  test('should have `this.filter` and `this.identifier` in next middleware', function (done) {
    var ok = false
    var server = koa()
    .use(ipFilter({
      // it can be double star - globstar
      // or *.*.*.*
      filter: ['**', '!213.15.*']
    }))
    .use(helloWorld())
    .use(function * (next) {
      test.ok(this.filter, 'should have `this.filter` in next')
      test.ok(this.identifier, 'should have `this.identifier` in next')
      test.equal(typeof this.filter, 'function', 'should have `this.filter` method')
      test.equal(typeof this.identifier, 'string', 'should have `this.identifier`')
      ok = true
      yield next
    })

    request(server.callback())
      .get('/')
      .set('x-koaip', '7.7.7.7')
      .expect(200, 'Hello World')
      .end(function (err) {
        test.ifError(err)
        test.equal(ok, true)
        done()
      })
  })
  test('should not have `this.filter` if no `opts.filter` given', function (done) {
    var ok = false
    var server = koa().use(ipFilter()).use(helloWorld()).use(function * (next) {
      test.ok(!this.filter, 'should not have `this.filter` in next')
      test.ok(!this.identifier, 'should not have `this.identifier` in next')
      ok = true
      yield next
    }).callback()

    request(server)
      .get('/')
      .expect(200, 'Hello World')
      .end(function (err) {
        test.ifError(err)
        test.equal(ok, true)
        done()
      })
  })
})
