var Transform = require('stream').Transform
var Util = require('util')
var Entry = require('./entry')
var Traversal = require('./traversal')
var Extraction = require('./extraction')

var pick = Extraction.pick
var filterEntriesByTypeAndMap =
  Traversal.filterEntriesByTypeAndMap.bind(Traversal)

function getLists(doc) {
  var entries = doc.object.map((entry) => {
    return Entry(entry)
  })

  var assets   = filterEntriesByTypeAndMap(entries, 'ASSET', 'expand')
  var tags     = filterEntriesByTypeAndMap(entries, 'TAG',   'expand')

  var snippets = filterEntriesByTypeAndMap(entries, 'SNIPPET',
      'expand').map((snippet) => {

        snippet.texts = assets.filter((asset) => {
          return snippet.assetIdentifiers.indexOf(asset.id) !== -1
        }).map(pick.bind(null, 'text', 'fileName'))

        snippet.tags = tags.filter((tag) => {
          return snippet.tagIdentifiers.indexOf(tag.id) !== -1
        }).map((tag) => {
          return tag.name
        })

        return snippet
      })

  var lists    = filterEntriesByTypeAndMap(entries, 'LIST',
      'expand').map((list) => {
        list.snippets = snippets.filter((snippet) => {
          return list.snippetIdentifiers.indexOf(snippet.id) !== -1
        })
        return list
      })

  return lists
}

Util.inherits(CBXMLListStream, Transform)

function CBXMLListStream () {
  if (!(this instanceof CBXMLListStream)) {
    return new CBXMLListStream()
  }

  Transform.call(this, { objectMode: true })
}

CBXMLListStream.prototype._transform = function (xml, enc, done) {
  var lists = getLists(xml)
  this.push(JSON.stringify(lists))
  done()
}

module.exports = CBXMLListStream
