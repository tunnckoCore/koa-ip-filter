# koa-ip-filter [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url]

> Filter IPs with a glob pattern, regex, string, array or matcher function. Support whitelist, blacklist and id options.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


### [upcoming v2](https://github.com/tunnckoCore/koa-ip-filter/milestones/v2)

## Install
```
npm i koa-ip-filter --save
npm test
```


## Features
- custom message when `403 Forbidden` response, through `opts.forbidden`
- custom identifier different than default `this.ip`, through `opts.id`
  + you may want to add `opts.strict: false` if it's not IP
- filter IP using glob patterns, regexp, string, array or function
- blacklist with negative glob patterns, whitelist with positive
- would restrict all to `403 Forbidden` that not match to filter


## Usage
> For more use-cases see the [tests](./test.js)

### [koaIpFilter](./index.js#L26)
> Filtering incoming request with glob patterns array, regexp, string or matcher function

- `options` **{Object}**
  + `id` **{Function}** custom identifier, defaults to `this.ip`
  + `strict` **{Boolean}** to throw when not valid IPv4/IPv6? default `true`
  + `filter` **{Array|String|RegExp|Function}** filter
  + `forbidden` **{String|Function}** custom message when `403 Forbidden` response
- `returns` **{GeneratorFunction}**

**example.js**

```js
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
```


## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/koa-ip-filter/issues/new).
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/koa-ip-filter
[npmjs-img]: https://img.shields.io/npm/v/koa-ip-filter.svg?label=koa-ip-filter

[license-url]: https://github.com/tunnckoCore/koa-ip-filter/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/koa-ip-filter
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/koa-ip-filter.svg

[travis-url]: https://travis-ci.org/tunnckoCore/koa-ip-filter
[travis-img]: https://img.shields.io/travis/tunnckoCore/koa-ip-filter.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/koa-ip-filter
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/koa-ip-filter.svg

[david-url]: https://david-dm.org/tunnckoCore/koa-ip-filter
[david-img]: https://img.shields.io/david/tunnckoCore/koa-ip-filter.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg
