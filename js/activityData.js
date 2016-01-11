var express = require('express');
var activityDataRouter = express.Router();
var url = require('url');
var requestModule = require('request');
var activityData = require('../data/location.json');
var jsonQuery = require('json-query');

activityDataRouter.get('/getParkByName', function (request, response) {
  var queryString = url.parse(request.url, true).query;
  var activityId = jsonQuery('locations[name=' + queryString.parkName + '].RecAreaFacility[0].RecAreaID', {
    data: activityId
  }).value;
  response.send({'ID': activityId});
});

activityDataRouter.get('/getActivityInfoById', function (request, response) {
  var activityString = url.parse(request.url, true).query;
  var activityId = activityString.activityId;
  requestModule('https://ridb.recreation.gov/api/v1/recareas/' + activityId + '/activities?apikey=89C4376BC2E24ABF904C029D21BE5FBB', 
  function (error, res, body) {
    if (!error && res.statusCode === 200) {
      var activityInfo = JSON.parse(body);
      console.log(activityInfo);
      response.send(activityInfo);
    }
  });
});

module.exports = activityDataRouter;