var express = require('express');
var request = require('request');
var flickr = express.Router();
var bodyParser = require('body-parser');
var textParser = bodyParser.text();

flickr.post('/', textParser, function(req,res) {
//var keyword = req.body;
  var latitude = 44.454;
  var longtitude = -68.04902; 
  request('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c1a7eab619087ccae98ce36753b8c3f4&lat=' + latitude + '&lon=' + longtitude + '&radius=20&format=json&nojsoncallback=1&auth_token=72157661933492300-056ee478ad1e599a&api_sig=53db9696c6926a3c92568e93b6c21936', 
  function (error, response, body) {
    if (!error && response.statusCode == 200) {   
      var flickrImages = JSON.parse(body);  
      var data = JSON.stringify(flickrImages.photos.photo);
      res.send(data);
    }
  });
});

module.exports = flickr;