var FS = require('fs')
var Assert = require('assert-plus')
var XML = require('pixl-xml')
var Entry = require('./lib/entry')
var Console = require('./lib/console')

var doc = XML.parse(FS.readFileSync('./dat/Snippets.cbxml'))
Assert.object(doc)

var _entries = doc.object
Assert.arrayOfObject(_entries)

var entries = _entries.map((_entry) => {
  return Entry(_entry)
})

Console.dir(entries.filter((e) => {
  return e.type === 'ASSET'
}).map((e) => {
  return e.expand().text
}))
