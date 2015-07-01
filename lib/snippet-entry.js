var Entry = require('./entry')
var Extraction = require('./extraction')

/*
 *   { type: 'SNIPPET',
    id: 'z219',
    attribute:
     [ { name: 'name',
         type: 'string',
         _Data: 'LowerCase or UpperCase word' },
       { name: 'modified',
         type: 'date',
         _Data: '456943913.20689302682876586914' },
       { name: 'locked', type: 'bool', _Data: '0' } ],
    relationship:
     [ { name: 'list', type: '1/1', destination: 'LIST', idrefs: 'z213' },
       { name: 'assets',
         type: '0/0',
         destination: 'ASSET',
         idrefs: 'z218' },
       { name: 'tags', type: '0/0', destination: 'TAG', idrefs: 'z222' } ] },
*/

function SnippetEntry(abstractEntry) {
  if (!(this instanceof SnippetEntry)) {
    return new SnippetEntry(abstractEntry)
  }

  Entry.apply(this, arguments)
}

SnippetEntry.prototype = Object.create(Entry.prototype)

SnippetEntry.prototype.toJSON = function() {
  return {
    type: this.type,
    name: this.name,
    id: this.id,
    texts: this.texts || [],
    tags: this.tags || []
  }
}

Object.defineProperties(SnippetEntry.prototype, {
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
  tagIdentifiers: {
    enumerable: true,
      get: function () {
        return Extraction.getIdentifiers(this, 'tags', 'TAG')
      }
  },
  assetIdentifiers: {
    enumerable: true,
      get: function () {
        return Extraction.getIdentifiers(this, 'assets', 'ASSET')
      }
  }
})

module.exports = SnippetEntry
