var express = require('express');
var weatherCity = express.Router();
var url = require('url');
var requestModule = require('request');

weatherCity.get('/getCity', function(request,response){
  var queryString = url.parse(request.url, true).query;
  var latitude = queryString.latitude;
  var longtitude = queryString.longtitude;
 
  requestModule('http://api.wunderground.com/api/35dd1f209fa4a7ab/geolookup/q/' + latitude +',' + longtitude +'.json', function(error, res, body){
    if (!error && res.statusCode === 200) {
      var data = JSON.parse(body);
      var city = data.location.city;
      var state = data.location.state;
      requestModule('http://api.wunderground.com/api/35dd1f209fa4a7ab/forecast/q/'+ state + '/' + city + '.json', function(error, res, body){
        if (!error && res.statusCode === 200) {
          var data = JSON.parse(body);
          response.send(data.forecast);
        }
      })
    }
  })
});

module.exports = weatherCity;