var express = require('express');
var facilityDataRouter = express.Router();
var url = require('url');
var requestModule = require('request');
var facilityData = require('../data/location.json');
var jsonQuery = require('json-query');

facilityDataRouter.get('/getFacilityByName', function (request, response) {
  var queryString = url.parse(request.url, true).query;
  var facilityId = jsonQuery('locations[name=' + queryString.parkName + '].RecAreaFacility[0].FacilityID', {
    data: facilityData
  }).value;
 
  response.send({'ID': facilityId});
});

facilityDataRouter.get('/getRecreationInfoById', function (request, response) {
  var facilityData = url.parse(request.url, true).query;
  console.log(facilityData);
  var facilityId = facilityData.facilityId;
  requestModule('https://ridb.recreation.gov/api/v1/organizations/128/facilities/' + facilityId + '?apikey=89C4376BC2E24ABF904C029D21BE5FBB', 
  function (error, res, body) {

    if (!error && res.statusCode === 200) {
      var facilityInfo = JSON.parse(body);     
      response.send(facilityInfo.FacilityDescription); 
      console.log(facilityInfo.FacilityDescription);
    }
  });
});

module.exports = facilityDataRouter;