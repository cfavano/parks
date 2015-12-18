var express = require('express');
var app = express();
var path = require('path');
var flickr = require('./js/flickrApi.js');
var location = require('./js/location.js');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  //multiple requests here?
});

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/data', express.static('data'));
app.use('/', flickr);
app.use('/', location);

app.listen(1337);
console.log('Port is ready!');