//require library
var express = require('express');

//create express object/module
var app = express();

// what is this really for. its used with sendFile(path.join) //requre path module
var path = require('path');
//var flickrApi = require('./flickrApi.js');

//using the function get on express library. 
//get has something to do with routing
//basic routing - refers to determining how an application responds to a client request to a particular endpoint
//which uri or parth AND a specific HTTP request method (get post etc)
//a route methode is derived from one of the http methods and is attached to an instance of express
//below is an example of routes that are defined for the get methods to the root of the app.

//route paths in combo with a request method, defines the endpoints at which requests can be made
//routs can be strings or regular expressions
//this route path will match requests to the root route /S
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  //response objects! send response to a client & term response request cycle
});
//more than one callback function can handle a route, use next()
//res.sendFile - send a file as an octed stream
//- transfers the file at a given path. sets the content type response http header, unless the root option is set in the options object
//path must be an absolute path
// - invokes callback fn(err) when the transfer is complete. must handle the respose process
//ending the request-responsce or passing with next
//app.use is binding middleware
//the path is a mount/prefix and limits the middleware to only apply to any paths that begin with the specified path
//express.static is a built in middleware. Takes the name of the directory that contains the static assets to start serving the files
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
//side note, the path provide to express static is relative to the directory from where node is launched. 
//If node is run from another director use absolite path of directory
//app.use('/static', express.static(__dirname + '/public'));
//dirname --> The name of the directory that the currently executing script resides in
//dirname is not global
//example runnond node example.js from /Users/mjr
//console.log(__dirname)
// /Users/mjr
//. --> gives the director from which you ran the node command. exception is when require is used, the it is like dirname
//http://stackoverflow.com/questions/8131344/what-is-the-difference-between-dirname-and-in-node-js

app.get('/flickrApi', function(req, res){
  res.sendFile(__dirname, + '/flickrApi.js');
}); 

app.get('/flickrApi', function(req, res){
  res.sendFile(__dirname, + '/flickrApi.js');
}); 
/*
app.use('/', flickrApi);
*/

app.listen(1337);
console.log('Port is ready!');