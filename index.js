/*!
 * koa-ip-filter <https://github.com/tunnckoCore/koa-ip-filter>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var micromatch = require('is-match')
var statuses = require('statuses')

/**
 * > Filtering incoming request with glob patterns
 * array, regexp, string or matcher function
 *
 * @param  {Object} `options`
 *   @option {Function} [options] `id` custom identifier, defaults to `this.ip`
 *   @option {Array|String|RegExp|Function} [options] `blacklist` blacklist filter
 *   @option {Array|String|RegExp|Function} [options] `whitelist` whitelist filter
 *   @option {String|Function} [options] `forbidden` message to display when 403 forbidden
 * @return {GeneratorFunction}
 * @api public
 */
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

    if (typeof forbidden === 'function') {
      forbidden = forbidden.call(this, this)
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
