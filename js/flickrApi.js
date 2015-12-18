var express = require('express');
var request = require('request');
var flickr = express.Router();
var bodyParser = require('body-parser');
var textParser = bodyParser.text();

flickr.post('/', textParser, function(req,res) {
//var keyword = req.body;
  var latitude = 44.454;
  var longtitude = -68.04902; 
  request('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1d3cddfecb2b92af4908394508288a7c&lat='+ latitude +'&lon='+ longtitude +'&radius=20&format=json&nojsoncallback=1&auth_token=72157662403865471-2bc0838b9c68b4f5&api_sig=48d26697a8b1a592ca85555657520927', 
  function (error, response, body) {
    if (!error && response.statusCode == 200) {   
      var flickrImages = JSON.parse(body);  
      var data = JSON.stringify(flickrImages.photos.photo);
      res.send(data);
    }
  });
});

module.exports = flickr;