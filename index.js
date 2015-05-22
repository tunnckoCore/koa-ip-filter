/*!
 * koa-ip-filter <https://github.com/tunnckoCore/koa-ip-filter>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var micromatch = require('is-match')
var statuses = require('statuses')

module.exports = function koaIpFilter (options) {
  options = typeof options === 'object' ? options : {}

  return function * (next) {
    var id = typeof options.id === 'function' ? options.id.call(this, this) : this.ip

    if (!id) {
      return yield * next
    }

    var blacklist = options.blacklist || options.blackList
    var whitelist = options.whitelist || options.whiteList
    var forbidden = options.forbidden || '403 ' + statuses[403]

    if (forbidden === 'function') {
      forbidden = options.forbidden.call(this, this, 403)
    }

    var whiteMatch = whitelist ? micromatch(whitelist) : null
    if (whiteMatch && !whiteMatch(id)) {
      this.status = 403
      this.body = forbidden
      return
    }

    var blackMatch = blacklist ? micromatch(blacklist) : null
    if (blackMatch && blackMatch(id)) {
      this.status = 403
      this.body = forbidden
      return
    }

    return yield * next
  }
}
