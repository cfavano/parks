var submit = document.forms[0];
//make function to create dropdown menu with location.json
/*
submit.addEventListener('submit', function(){
  var location = document.getElementsByTagName('select')[0].value;
  //get JSON and compare value
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.status === 200) {
      console.log('hi');
    }  
  }
  xhr.open('GET', '../data/location.json', true);
  xhr.send(null);
}, false);
*/

//how do you get JSON here?
function getLocation(longtitude, latitude){
//if(longtitude && latitude match) {
  //var longtitude = '';
  //var latitude = '';
}

function getPictures(){
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if(xhr.status === 200) {
      var response = xhr.responseText;
      var data = JSON.parse(response);
      for(i = 0; i < data.length; i++){
        var flickrFarm = data[i].farm;
        var flickrId = data[i].id;
        var flickrServer = data[i].server;
        var flickrSecret = data[i].secret;
        var flickrImage = new Image();
        flickrImage.src = 'https://farm' + flickrFarm + '.staticflickr.com/' + flickrServer + '/' + flickrId + '_' + flickrSecret + '.jpg';
        var hero = document.getElementsByClassName('hero')[0];
        hero.appendChild(flickrImage);
      }      
    }
  }
  xhr.open('POST', '/', true);
  xhr.send(null);
}

function runFunctions() {
  event.preventDefault();
  getPictures();
}

submit.addEventListener('submit', runFunctions, false);