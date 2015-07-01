var Assert = require('assert-plus')

module.exports = {
  getInspectFn: function(o) {
    return function (/* depth */) {
      return JSON.stringify(o.toJSON())
    }
  },
  getIdentifiers: function (o, name, destination) {
    // The 'pixl-xml' library doesn't pluralize multi-matches
    var relationships = o.relationship
    // The 'pixl-xml' library doesn't normalize fields to Array or single-type
    Array.isArray(relationships) || (relationships = [relationships])

    var identifiers = relationships.filter((relationship) => {
      return relationship.name === name &&
                relationship.destination === destination
    }).map((relationship) => {
      // The id refs when an array are a string joined by ' ' :(
      var idRefs = relationship.idrefs || ''
      return [].concat(idRefs.split(' '))
    }).reduce((idContainer, idrefCollection) => {
      idContainer.push.apply(idContainer, idrefCollection)
      return idContainer
    }, [] /* <- idContainer */)

    return identifiers
  },
  getName: function (o) {
    // The 'pixl-xml' library doesn't normalize fields to Array or single-type
    var isArray = Array.isArray(o.attribute)
    // The 'pixl-xml' library doesn't pluralize multi-matches
    var attrs = isArray ? o.attribute : [o.attribute]
    return attrs.filter((attr) => {
      return attr.name === 'name'
    }).map((attr) => {
      return attr._Data
    })[0]
  },
  pick: function (/* k1, k2, kn, o */) {
    var keys = Array.prototype.slice.apply(arguments)
                .filter((o) => {
                  // Remove the array context and the current index
                  return typeof o !== 'number' && !Array.isArray(o)
                })

    var o = keys.pop()
    Assert.object(o, 'The last arg to pick must be an object')

    Assert.arrayOfString(keys, 'The first n args to pick must be strings')

    var picks = { }
    for (var i in keys) {
      var k = keys[i]
      picks[k] = o[k]
    }
    return picks
  }
}
