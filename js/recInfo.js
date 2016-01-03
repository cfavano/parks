var express = require('express');
var request = require('request');
var recInfo = express.Router();
var bodyParser = require('body-parser');
var textParser = bodyParser.text();

recInfo.get('/', function(req,res){
  var facilityID = req.body.locations.RecAreaFacility.FacilityID[0];

  request('https://ridb.recreation.gov/api/v1/organizations/128/facilities/' + facilityID + '?apikey=89C4376BC2E24ABF904C029D21BE5FBB', function(error, response, body){
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body);
      res.send(dataInfo);
    }
  });
});

module.exports = recInfo;