
var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.get('/flickrApi', function(req, res){
  res.sendFile(__dirname, + '/flickrApi.js');
}); 

app.get('/flickrApi', function(req, res){
  res.sendFile(__dirname, + '/flickrApi.js');
}); 

app.listen(1337);
console.log('Port is ready!');