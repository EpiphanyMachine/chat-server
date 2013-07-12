var rooms = require('./compiled/src/rooms.js');
var fs = require('node-fs');

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var headers = defaultCorsHeaders;

  var room = request.url.match(/\/classes\/([\w\d-]+)\/?/);
  var indexURL = request.url.match(/\/\??/);
  if (room) {
    console.log('Requested chatroom: ',room[1]);
    headers['Content-Type'] = "application/json";
    response.writeHead(200, headers);
    if (request.method === 'POST') {
      var sentData = '';
      request.on('data', function(data){
        sentData += data;
        rooms.post(sentData, room[1]);
      });
      response.writeHead(201, headers);
    } else {
      if (!rooms[room[1]]) {
        rooms.newRoom(room[1]);
      }
    }
    response.end(JSON.stringify(rooms[room[1]]));
  } else if (request.url === '/client/js/setup.js') {
    if (request.method === "GET") {
      console.log('Setup JS file request and sent');
      headers['Content-Type'] = "application/javascript";
      response.writeHead(200, headers);
      var setupJs = fs.readFileSync('./client/js/setup.js');
      response.end(setupJs);
    }
  } else if (indexURL) {
    if (request.method === "GET") {
      console.log('Index html requested and returned');
      headers['Content-Type'] = "text/html";
      response.writeHead(200, headers);
      var indexHtml = fs.readFileSync('./client/index.html');
      response.end(indexHtml);
    }
  } else {
    console.log('Invalid URL requested, returned 404');
    headers['Content-Type'] = "text/plain";
    response.writeHead(404, headers);
    response.end('Error: Not Found, Don\'t try that shit again!');
  }
};

exports.handleRequest = handleRequest;
