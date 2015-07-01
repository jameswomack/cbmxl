var Entry = require('./entry')
var Extraction = require('./extraction')

function ListEntry(abstractEntry) {
  if (!(this instanceof ListEntry)) {
    return new ListEntry(abstractEntry)
  }

  Entry.apply(this, arguments)
}

ListEntry.prototype = Object.create(Entry.prototype)

ListEntry.prototype.toJSON = function() {
  return {
    type: this.type,
    name: this.name,
    id: this.id,
    snippetIdentifiers: this.snippetIdentifiers || [],
    snippets: this.snippets || []
  }
}

/*
  { type: 'LIST',
    id: 'z213',
    attribute:
     [ { name: 'sort', type: 'int16', _Data: '25' },
       { name: 'name', type: 'string', _Data: 'Vim' },
       { name: 'expanded', type: 'bool', _Data: '0' },
       [length]: 3 ],
    relationship:
     [ { name: 'parent', type: '1/1', destination: 'FOLDER' },
       { name: 'children', type: '0/0', destination: 'FOLDER' },
       { name: 'snippets',
         type: '0/0',
         destination: 'SNIPPET',
         idrefs: 'z215 z224 z217 z219 z220' },
       [length]: 3 ] },
*/
Object.defineProperties(ListEntry.prototype, {
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

module.exports = ListEntry
