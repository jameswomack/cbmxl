require('console.table')

const CONSOLE_DIR_CONFIG  = {
  depth: 4,
  colors: true
}

var Console = { }

function dirWithConfig() {
  var args = Array.prototype.slice.apply(arguments)
  console.dir.apply(console, args.concat(CONSOLE_DIR_CONFIG))
}

for (var k in console) {
  var isFunc = typeof console[k] === 'function'
  var isDir  = k === 'dir'
  if (isFunc && isDir) {
    Console[k] = dirWithConfig
  } else if (isFunc) {
    Console[k] = console[k].bind(console)
  } else {
    Console[k] = console[k]
  }
}

module.exports = Console
