
exports.messages = {}
exports.messages.results =
  [
    username: 'poopflsgd'
    text: 'fooby'
    room: 'not null'
  ]
exports.post = (data, room) ->
  if not data.roomname then exports.room = []
  exports.room.push(data)
