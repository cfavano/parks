var express = require('express');

//new route using express.
var myRoute = express.Router();

//middleware that is specific to this router
myRoute.use(function(req,res,next){
  console.log('something');
  next();
});

//define the home page route
myRoute.get('/', function(req, res){
  res.send('homepage');
});

module.exports = myRoute;