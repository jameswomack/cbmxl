var Factory = require('./entry-type-factory')

var store = new WeakMap()

var EntryIncubator = {
  create: function (entry) {
    return Factory.makeConcrete(entry)
  },

  incubate: function (entry) {
    if (!store.has(entry)) {
      store.set(entry, this.create(entry))
    }
    return store.get(entry)
  }
}

module.exports = EntryIncubator
