var decode = require('js-base64').Base64.decode
var Entry  = require('./entry')

function ConcreteEntry(options) {
  if (!(this instanceof ConcreteEntry)) {
    return new ConcreteEntry(options)
  }

  Entry.call(this, options)
}
ConcreteEntry.prototype = Object.create(Entry.prototype)
// TODO cache this mess, possibly use _.filter or similar as well
Object.defineProperty(ConcreteEntry.prototype, 'text', {
  enumerable: true,
  get: function() {
    // CBXML has some poor naming choices IMO, attribute should be plural
    return decode(this.attribute.filter((attr) => {
      return attr.name === 'content'
    })[0]._Data)
  }
})

module.exports = ConcreteEntry
