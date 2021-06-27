var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express');

var port = 443;

const options = {
    key: fs.readFileSync(__dirname + '/private.key', 'utf8'),
   cert: fs.readFileSync(__dirname + '/public.cert', 'utf8')
 };


var app = express();

var server = https.createServer(options, app)

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//The 404 Route (ALWAYS Keep this as the last route)

app.use(function(req, res, next) {
    res.status(404);
    res.sendFile(__dirname + '/public/dist/');
});

server.listen(port, function(){
    console.log("Express server listening on port " + port);
  });
