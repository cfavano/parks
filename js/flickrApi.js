var express = require('express');
var request = require('request');
var flickr = express.Router();

flickr.post('/', function(req, res) {
  var latitude = req.body.latitude;
  var longtitude = req.body.longtitude;
  console.log(latitude);

  request('https://api.flickr.com/services/rest/?method=flickr.photos.search&name=value&api_key=8f90d29e95cfbf77ae0e4231141d4f88&radius=10&lat=' + latitude + '&lon='+ longtitude +'&per_page=500&format=json&nojsoncallback=1',
  function (error, response, body) {
    if (!error && response.statusCode == 200) {   
      var flickrImages = JSON.parse(body);
      res.send(flickrImages);
    }
  });
});

module.exports = flickr;