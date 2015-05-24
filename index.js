/*!
 * koa-ip-filter <https://github.com/tunnckoCore/koa-ip-filter>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var ipFilter = require('ip-filter')

/**
 * > Filtering incoming request with glob patterns
 * array, regexp, string or matcher function
 *
 * @param  {Object} `options`
 *   @option {Function} [options] `id` custom identifier, defaults to `this.ip`
 *   @option {Boolean} [options] `strict` to throw when not valid ip? default `true`
 *   @option {Array|String|RegExp|Function} [options] `filter` black/white list filter
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

    var filter = options.filter || '*'
    var strict = typeof options.strict === 'boolean' ? options.strict : true
    var forbidden = options.forbidden || '403 Forbidden'

    var identifier = ipFilter(id, filter, !strict)
    if (identifier === null) {
      this.status = 403
      this.body = typeof forbidden === 'function' ? forbidden.call(this, this) : forbidden
      return
    }

    this.filter = ipFilter
    this.identifier = identifier

    return yield * next
  }
}
