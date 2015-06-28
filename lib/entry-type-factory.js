'use strict';

var Path = require('path')

const VALID_TYPES = new Set([
  'SNIPPET',
  'LIST',
  'ASSET',
  'TAG'
])

let implementations = { }

function addImpl(type) {
  var filename = type.toLowerCase() + '-entry'
  var path     = Path.resolve(process.cwd() + '/lib/' + filename)
  try {
    implementations[type] = require(path)
  } catch (e) {
    console.error({
      error: e,
      message: 'Couldn\'t add type ' + type
    })
  }
  return implementations
}

for (let type of VALID_TYPES) {
  addImpl(type)
}

module.exports = {
  VALID_TYPES: VALID_TYPES,
  makeConcrete: function (entry) {
    var Type = this.implementationForType(entry.type)
    var type = Type(entry)
    return type
  },
  implementationForType: function (t) {
    return implementations[t]
  }
}
