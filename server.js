var express = require('express');
var app = express();
var path = require('path');
var flickr = require('./js/flickrApi.js');
//var location = require('./js/location.js');
var bodyParser = require('body-parser');
var api = express.Router();

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/css', express.static('css'));
app.use('/data', express.static('data'));
app.use('/images', express.static('images')); 
app.use('/js', express.static('js'));

api.use('/flickrImages', flickr);
app.use('/api', api);

app.listen(1337);
console.log('Port 1337 is ready!');
