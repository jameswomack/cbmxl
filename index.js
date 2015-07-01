var HTTP = require('http')
var Console = require('./lib/console')
var Reader = require('./lib/reader')
var CBXMLList = require('./lib/cbxml-list-stream')

HTTP.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'})
  Reader().readFromPath('./dat/Snippets.cbxml')
    .on('complete', (xmlDocStream) => {
      xmlDocStream
        .pipe(CBXMLList())
        .pipe(res)
    })
    .on('error', res.end)
}).listen(1337, '127.0.0.1')
Console.log('Server running at http://127.0.0.1:1337/')

