var express = require('express');
var app = express();
// what is this really for. its used with sendFile(path.join)
//var path = require('path');
var path = require('path');
var flickrApi = require('./flickrApi.js');

app.use(express.static(path.join(__dirname, 'js')));
app.use('/', flickrApi);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
}); 

app.get('/flickrApi', function(req, res){
  res.sendFile(__dirname, + '/nyTimes.js');
}); 

app.listen(1337);
console.log('Port is ready!');