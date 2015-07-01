var Entry = require('./entry')
var Extraction = require('./extraction')

function TagEntry(abstractEntry) {
  if (!(this instanceof TagEntry)) {
    return new TagEntry(abstractEntry)
  }

  Entry.apply(this, arguments)
}

TagEntry.prototype = Object.create(Entry.prototype)

TagEntry.prototype.toJSON = function() {
  return {
    type: this.type,
    name: this.name,
    id: this.id,
    snippetIdentifiers: this.snippetIdentifiers || []
  }
}

Object.defineProperties(TagEntry.prototype, {
  inspect: {
    get: function () {
      return Extraction.getInspectFn(this)
    }
  },
  name: {
    enumerable: true,
    get: function () {
      return Extraction.getName(this)
    }
  },
  snippetIdentifiers: {
    enumerable: true,
      get: function () {
        return Extraction.getIdentifiers(this, 'snippets', 'SNIPPET')
      }
  }
})

module.exports = TagEntry
