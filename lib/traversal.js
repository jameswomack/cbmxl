var VALID_TYPES = require('./entry-type-factory').VALID_TYPES
module.exports = {
  filterEntriesByType: function (entries, type) {
    if (!VALID_TYPES.has(type)) {
      return []
    }
    return (entries || []).filter((e) => {
      return e.type === type
    })
  },
  filterEntriesByTypeAndMap: function (entries, type, methodName) {
    return this.filterEntriesByType(entries, type).map((entry) => {
      return entry[methodName]()
    })
  }
}
