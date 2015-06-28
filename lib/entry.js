// TODO turn this into an object with type expectations
const VALID_OPTIONS_KEYS = [ 'type', 'id', 'attribute', 'relationship' ]

function Entry(options) {
  if (!(this instanceof Entry)) {
    return new Entry(options)
  }

  for (var k in options) {
    (!!~VALID_OPTIONS_KEYS.indexOf(k)) && (this[k] = options[k])
  }

  // Freezing an Entry makes the Incubator code far simpler (it uses a
  // WeakMap). By ensuring the `type` won't change, the `expand` method
  // can be idempotent.
  this.constructor === Entry && Object.freeze(this)
}

module.exports = Entry

Entry.prototype = Object.create({
  expand: function () {
    // Prevent side effects of the circular dependency
    var Incubator = require('./entry-incubator')
    var expansion = Incubator.incubate(this)
    return expansion
  }
})
