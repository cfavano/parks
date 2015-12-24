var express = require('express');
var request = require('request');
var fs = require('fs');
var location = express.Router();
var bodyParser = require('body-parser');
var textParser = bodyParser.text();

fs.readFile('./data/location.json', 'utf8', function(err, data) {
 if (err) throw err;
  //var obj = console.log(data);
});


/*
location.post('/', function(req, res) {
    console.log(req.body);
});
*/
module.exports = location;


