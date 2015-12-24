var express = require('express');
var request = require('request');
var flickr = express.Router();
var bodyParser = require('body-parser');
var textParser = bodyParser.text();

flickr.post('/', function(req, res) {
  var latitude = req.body.latitude;
  var longtitude = req.body.longtitude;
   
  request('https://api.flickr.com/services/rest/?method=flickr.photos.search&name=value&api_key=8f90d29e95cfbf77ae0e4231141d4f88&radius=20&lat=' + latitude + '&lon='+ longtitude +' &format=json&nojsoncallback=1',
  function (error, response, body) {
    if (!error && response.statusCode == 200) {   
      var flickrImages = JSON.parse(body);  
      var data = JSON.stringify(flickrImages.photos.photo);
      res.send(data);
    }
  });
});

module.exports = flickr;