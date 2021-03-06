
var through = require('through2')
var generate = require('mqtt-packet').generate
var empty = new Buffer(0)

function generateStream () {
  var stream = through.obj(process)

  function process (chunk, enc, cb) {
    var packet = empty

    try {
      packet = generate(chunk)
    } catch (err) {
      this.emit('error', err)
      return
    }

    this.push(packet)
    cb()
  }

  return stream
}

module.exports = generateStream
