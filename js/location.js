var express = require('express');
var request = require('request');
var fs = require('fs');
var location = express.Router();

fs.readFile('./data/location.json', 'utf8', function(err, data,send) {
  if (err) throw err;
//  var obj = console.log(data);
});

module.exports = location;