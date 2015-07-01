var FS = require('fs')
var Stream = require('stream')
var Assert = require('assert-plus')
var XML = require('pixl-xml')
var Emitter = require('events').EventEmitter

function Reader() {
  if (!(this instanceof Reader)) {
    return new Reader()
  }
  Emitter.call(this)
}

Reader.prototype = Object.create(Emitter.prototype)

Reader.prototype.readFromPath = function (path) {
  Assert.ok(this instanceof Emitter)

  FS.readFile(path, function (err, xml) {
    Assert.ok(this instanceof Emitter)
    if (err) {
      return this.emit('error', err)
    }

    var doc = XML.parse(xml)
    Assert.object(doc)
    var s = new Stream.Readable({objectMode: true})
    s._read = function noop() {} // redundant? see update below
    s.push(doc)
    s.push(null)
    this.emit('complete', s)
  }.bind(this))
  return this
}

module.exports = Reader
