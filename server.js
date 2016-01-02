var express = require('express');
var app = express();
var path = require('path');
var flickr = require('./js/flickrApi.js');
var recInfo = require('./js/recInfo.js')
var facilityDataRouter = require('./js/facilityData.js');
var flickrImagesBroad = require('./js/flickrImagesBroad.js');
var bodyParser = require('body-parser');
var api = express.Router();

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/css', express.static('css'));
app.use('/images', express.static('images')); 
app.use('/js', express.static('js'));
app.use('/api', api);

api.use('/flickrImagesBroad', flickrImagesBroad);
api.use('/flickrImages', flickr);

api.use('/recInfo', recInfo);
api.use('/facilityData', facilityDataRouter);


app.listen(1337);
console.log('Port 1337 is ready!');