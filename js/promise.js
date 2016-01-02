var express = require('express');
var request = require('request');
var promise = express.Router();

function getURL(url) {
  return new Promise(function(resolve, reject) {
    request(url, function(error, response) {
      resolve(response);
    })
  })
}

var flickr = getURL('https://api.flickr.com');
var json = getURL('/data/location.json');

Promise.all([flickr, json]).then(function(values) {

})

module.exports = promise;