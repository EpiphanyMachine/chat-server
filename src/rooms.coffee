fs = require 'node-fs'
_ = require 'lodash'

exports.post = (data, room) ->
  if not exports[room] then exports.newRoom room
  data = JSON.parse(data)
  data.createdAt = data.modifiedAt = Date 'UTC'
  console.log data
  exports[room].results.push(data);
  fs.writeFile('./chatStorage', JSON.stringify(exports));
  console.log exports[room].results

exports.newRoom = (room) ->
  exports[room] = {results: []}

exports.loadTweets = ->
  fs.readFile './chatStorage', (err,data) ->
    parsedStorage = JSON.parse data
    _.extend(exports, parsedStorage)