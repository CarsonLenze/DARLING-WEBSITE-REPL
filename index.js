var express = require('express');

var port = 8000;

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//The 404 Route (ALWAYS Keep this as the last route)

app.use(function(req, res, next) {
    res.status(404);
    res.sendFile(__dirname + '/public/dist/');
});

app.listen(port, function(){
    console.log("Express server listening on port" + port);
  });
