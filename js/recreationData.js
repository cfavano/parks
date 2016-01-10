var express = require('express');
var recreationDataRouter = express.Router();
var url = require('url');
var requestModule = require('request');
var recreationData = require('../data/location.json');
var jsonQuery = require('json-query');

recreationDataRouter.get('/getParkByName', function (request, response) {
  var queryString = url.parse(request.url, true).query;
  var recreationId = jsonQuery('locations[name=' + queryString.parkName + '].RecAreaFacility[0].RecAreaID', {
    data: recreationData
  }).value;
  response.send({'ID': recreationId});
});

recreationDataRouter.get('/getParkInfoById', function (request, response) {
  var recreationData = url.parse(request.url, true).query;
  var recreationId = recreationData.recreationId;
  requestModule('https://ridb.recreation.gov/api/v1/recareas/' + recreationId + '?apikey=89C4376BC2E24ABF904C029D21BE5FBB', 
  function (error, res, body) {
    if (!error && res.statusCode === 200) {
      var parkInfo = JSON.parse(body);
      response.send(parkInfo); 
    }
  });
});

module.exports = recreationDataRouter;