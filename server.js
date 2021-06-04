//server
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

app.get('/validation', function(req, res) {
    console.log('GET /');
    res.send("Success!");
});
app.get('/', function(req, res) {
    console.log('GET /');
    res.send("Hello.");
});

app.post('/', function(req, res) {
    console.log('POST /');
    console.log(req.body);
    res.send("success");
});
server.listen(3000, 'localhost', () => {
    console.log(`Example app listening`)
  });
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});