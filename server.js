var express = require('express');
var app = express();
var path = require('path');
var flickr = require('./js/flickrApi.js');

app.use('/', flickr);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.listen(1337);
console.log('Port is ready!');