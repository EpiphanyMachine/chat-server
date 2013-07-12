var http = require("http");
var loadTweets = require('./compiled/src/rooms.js').loadTweets;
var requestHandler = require('./request-handler.js');
var port = 8081;
var ip = "127.0.0.1";
var server = http.createServer(requestHandler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
loadTweets();