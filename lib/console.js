var Path = require('path')
require('console.table')

var SEP = Path.sep

const CONSOLE_DIR_CONFIG  = {
  depth: 4,
  showHidden: true,
  colors: true
}

var Console = { }

// Mutli-dir
function dirWithConfig() {
  var args = Array.prototype.slice.apply(arguments)
  for (var index in args) {
    console.dir.apply(console, [args[index], CONSOLE_DIR_CONFIG])
  }
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

Console.ModLog = function (_module) {
  var logIdComponents = _module.id.split(SEP)
  var logId = logIdComponents[logIdComponents.length - 1].replace('.js', '')
  return console.log.bind(console, logId)
}

module.exports = Console
