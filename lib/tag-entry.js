var Entry = require('./entry')

function ConcreteEntry() {
  Entry.apply(this, arguments)
}

module.exports = ConcreteEntry
