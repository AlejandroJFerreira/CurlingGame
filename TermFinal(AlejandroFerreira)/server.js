/*
This code is based on 03 CHAT SERVER WITH SOCKETIO, copyright below

(c) 2022 Louis D. Nel
Based on:
https://socket.io
see in particular:
https://socket.io/docs/
https://socket.io/get-started/chat/

Before you run this app first execute
>npm install
to install npm modules dependencies listed in package.json file
Then launch this server:
>node server.js

To test open several browsers to: http://localhost:3000/chatClient.html

*/
const server = require('http').createServer(handler)
const io = require('socket.io')(server) //wrap server app in socket io capability
const { Console } = require('console');
const fs = require('fs') //file system to server static files
const url = require('url'); //to parse url strings
const PORT = process.env.PORT || 3000 //useful if you want to specify port through environment variable
const users = new Map(); // key: socket.id, value: type
// Type: Home = 1, Away = 2, Spectator = 3
let rocks = [{x:0, y:0}, {x:1, y:1}, {x:2, y:2}, {x:3, y:3}, {x:4, y:4}, {x:5, y:5}, {x:6, y:6}, {x:7, y:7}]
let colours = [];

let whoseTurn = 'red';
let score = {home: 0, visitor: 0} //updated to reflect how stones lie

let isHomePlayerAssigned = false //true when a player (client) is assigned to HOME_COLOUR
let isVisitorPlayerAssigned = false //true when a player (client) is assigned to VISITOR_COLOUR

let isHomeClient = false //true when this client application can control (e.g. shoot) HOME_COLOUR stones
let isVisitorClient = false //true when this client application can control (e.g. shoot) VISITOR_COLOUR stones
let isSpectatorClient = false //true when this client application is a spectator

let allStones = null //set of all stones. sorted periodically by lying score distance
let homeStones = null //set of home stones in no particular order
let visitorStones = null //set of visitor stones in no particular order
let shootingQueue = null //queue of stones still to be shot during game round, or "end"

const ROOT_DIR = 'html' //dir to serve static files from

const MIME_TYPES = {
  'css': 'text/css',
  'gif': 'image/gif',
  'htm': 'text/html',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'application/javascript',
  'json': 'application/json',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'txt': 'text/plain'
}

function get_mime(filename) {
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
      return MIME_TYPES[ext]
    }
  }
  return MIME_TYPES['txt']
}

server.listen(PORT) //start http server listening on PORT

function handler(request, response) {
  //handler for http server requests
  let urlObj = url.parse(request.url, true, false)
  console.log('\n============================')
  console.log("PATHNAME: " + urlObj.pathname)
  console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
  console.log("METHOD: " + request.method)

  let filePath = ROOT_DIR + urlObj.pathname
  if (urlObj.pathname === '/') filePath = ROOT_DIR + '/index.html'

  fs.readFile(filePath, function(err, data) {
    if (err) {
      //report error to console
      console.log('ERROR: ' + JSON.stringify(err))
      //respond with not found 404 to client
      response.writeHead(404);
      response.end(JSON.stringify(err))
      return
    }
    response.writeHead(200, {
      'Content-Type': get_mime(filePath)
    })
    response.end(data)
  })

}

//Socket Server
io.on('connection', function(socket) {
  socket.on('joinAsHome', function(data) {
    users.set(socket.id, 1);
    isHomePlayerAssigned = true;
  })
  socket.on('joinAsAway', function(data) {
    users.set(socket.id, 1);
    isVisitorPlayerAssigned = true;
  })
  socket.on('updateData', function(data) {
    io.emit("updateHomePlayerAssigned", isHomePlayerAssigned);
    io.emit("updateAwayPlayerAssigned", isVisitorPlayerAssigned);
  })
  socket.on('updateRocks', function(data) {

    rocks = data;

    io.emit("updateAllStones", rocks);
  })
  socket.on('updateColor', function(data) {

    whoseTurn = data;

    io.emit("updateAllColors", whoseTurn);
  })
  socket.on('updateRockColours', function(data) {

    colours = data;

    io.emit("updateRockColors", colours);
  })
  socket.on('leaveAsHome', function(data) {
    users.delete(socket.id);
    isHomePlayerAssigned = false;
  })
  socket.on('leaveAsVisitor', function(data) {
    users.delete(socket.id);
    isVisitorPlayerAssigned = false;
  })
  socket.on('resetGame', function(data) {
    io.emit("reset", "");
  })
})

console.log(`Server Running at port ${PORT}  CNTL-C to quit`)
console.log(`To Test:`)
console.log(`Open several browsers to: http://localhost:3000/curling.html`)
