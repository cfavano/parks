
var submit = document.getElementsByClassName('submit')[0];

//how do you get JSON here?
//function getLocation(longtitude, latitude){
//if(longtitude && latitude match) {
  //var longtitude = '';
  //var latitude = '';
//}

function getPictures(){
  var xhr = new XMLHttpRequest();
 
  xhr.onload = function() {
    //https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon&api_key=3479c4b4000550c5ec123d9b46258ff3&lat=58.58305&lon=-154.88652&format=json&nojsoncallback=1&auth_token=72157662337049611-4b38137d7606a8a4&api_sig=a24a439ca57d3a468aabb25db73f3107
     console.log('I\'m ready!');
  }
  xhr.open('POST', '/', true);
  xhr.send(console.log('hi'));
}


function runFunctions() {
  getPictures();
}

submit.addEventListener('click', runFunctions, false);