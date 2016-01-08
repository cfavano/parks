var submit = document.getElementById('location');
var index = document.getElementById('park');

function appendElement(parent, newElement, newText) {
  var parentDiv = document.getElementById(parent);
  var createdElement = document.createElement(newElement);
  var text = document.createTextNode(newText);
  createdElement.appendChild(text);
  parentDiv.appendChild(createdElement); 
}

function newImage(parent, imgSource, imgContainer) {
  var img = new Image();
  img.src = imgSource; 
  var parentDiv = document.getElementById(parent);
  var imgDiv = document.createElement(imgContainer);
  imgDiv.appendChild(img);
  parentDiv.appendChild(imgDiv);
  img.setAttribute('class', 'img-responsive');
}

function createGallery(flickrPath) {
  var hero = document.getElementById('hero');
  var placeholder = document.createElement('img');
  placeholder.src = '../images/holder.png';
  var imageContainer = document.createElement('div');
  imageContainer.appendChild(placeholder);
  hero.appendChild(imageContainer);
  placeholder.setAttribute('class', 'img-responsive'); 
  placeholder.style.backgroundImage  = "url('"+ flickrPath + "')";
}

function galleryClass(){
  var hero = document.getElementById('hero');
  var imageContainer = hero.getElementsByTagName('div'); 
  
  var row1 = document.createElement('div');
  var container1 = document.createElement('div');
  var container2 = document.createElement('div');
  var container3 = document.createElement('div');
  row1.appendChild(container1);
  row1.appendChild(container2);
  row1.appendChild(container3);

  hero.appendChild(row1);
  row1.setAttribute('class', 'col-md-12');
  container1.setAttribute('class', 'col-md-3 col-sm-6 col-xs-3');
  container2.setAttribute('class', 'col-md-3 col-sm-6 col-xs-3');
  container3.setAttribute('class', 'col-md-6 col-sm-3 col-xs-6');

  container1.appendChild(imageContainer[7]);
  container1.appendChild(imageContainer[6]);
  container2.appendChild(imageContainer[5]);
  container2.appendChild(imageContainer[4]);
  container3.appendChild(imageContainer[3]); 
 
  var row2 = document.createElement('div');
  var container4 = document.createElement('div');
  row2.appendChild(container4);
  row2.setAttribute('class', 'col-md-12');
  hero.appendChild(row2);
  
  var cont6 = container4.appendChild(imageContainer[2]);
  var cont5 = container4.appendChild(imageContainer[1]);
  var cont4 = container4.appendChild(imageContainer[0]);

  cont6.setAttribute('class', 'col-md-4 col-sm-3 col-xs-4');
  cont5.setAttribute('class', 'col-md-4 col-sm-3 col-xs-4');
  cont4.setAttribute('class', 'col-md-4 col-sm-3 col-xs-4');
}

function removeData(containerId) {
  var container = document.getElementById(containerId);
  var firstChild = container.firstChild;
  while(firstChild){
    container.removeChild(firstChild);
    var firstChild = container.firstChild;
  }
}

function getFlickr() {   
  var location = document.getElementById('park').value;  
  var latLong = location.split(',');
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/flickrImages', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify({'latitude': latLong[0], 'longtitude': latLong[1]}));
  xhr.onload = function() {
    if(xhr.status === 200) {
      document.getElementsByClassName('jumbotron')[0].style.background  = "none";
      document.getElementsByClassName('jumbotron')[0].style.height  = "auto";
      document.getElementById('footer').setAttribute('class', 'footer-wrap fluid-container show');
      removeData('hero');      

      var response = xhr.responseText;
      var responseText = JSON.parse(response);
      var data = responseText.photos.photo; 
      
      if(data.length >= 240) {
        for(i = 0; i < 8; i++) {
          var blockPicture = data[i].id;
          if (blockPicture == 24094142076 || blockPicture == 23930922865){
            console.log(blockPicture + " This image has been blocked");
            for(j = 0; j < 1; j++) {   
              createGallery('https://farm' + data[i*30].farm + '.staticflickr.com/' + data[i*30].server + '/' + data[i*30].id + '_' + data[i*30].secret + '_c.jpg');
            }
          }
          else{
            createGallery('https://farm' + data[i*30].farm + '.staticflickr.com/' + data[i*30].server + '/' + data[i*30].id + '_' + data[i*30].secret + '_c.jpg');
          }
        }
        galleryClass(i);
      }
      else {
        var flickrBroad = new XMLHttpRequest(); 
        flickrBroad.open('POST', '/api/flickrImagesBroad', true);
        flickrBroad.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        flickrBroad.send(JSON.stringify({'latitude': latLong[0], 'longtitude': latLong[1]}));
        flickrBroad.onload = function() {
          if(flickrBroad.status === 200) {
            var responseFlickr = flickrBroad.responseText;
            var flickrText = JSON.parse(responseFlickr);
            var data = flickrText.photos.photo;

            if(data.length >= 240) {
              for(j = 0; j < 8; j++) {             
                createGallery('https://farm' + data[j*30].farm + '.staticflickr.com/' + data[j*30].server + '/' + data[j*30].id + '_' + data[j*30].secret + '_c.jpg');
              }
              galleryClass(j);
            }   
            else if(data.length >= 24) {
              for(j = 0; j < 8; j++) { 
                createGallery('https://farm' + data[j*3].farm + '.staticflickr.com/' + data[j*3].server + '/' + data[j*3].id + '_' + data[j*3].secret + '_c.jpg');
              }
              galleryClass(j);
            }
            else if(data.length >= 8) {
              for(j = 0; j < 8; j++) {      
                createGallery('https://farm' + data[j].farm + '.staticflickr.com/' + data[j].server + '/' + data[j].id + '_' + data[j].secret + '_c.jpg');
              }
              galleryClass(j);
            }
            else if(data.length >= 2) {
              console.log(data.length);
              for(j = 0; j < 2; j++) {        
                createGallery('https://farm' + data[j].farm + '.staticflickr.com/' + data[j].server + '/' + data[j].id + '_' + data[j].secret + '_c.jpg');
                var hero = document.getElementById('hero'); 
                var images = hero.getElementsByTagName('div'); 
                images[j].setAttribute('class', 'col-sm-6'); 
              }                
            }
          }
        }
      }
    }
  }
}

function getRecreation() { 
  var parkName = index.options[index.selectedIndex].text;
  document.getElementById('content').setAttribute('class', 'container show');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/facilityData/getFacilityByName?parkName=' + parkName, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(); 
  xhr.onload = function() {
    if(xhr.status === 200) {
      var response = xhr.responseText;
      var responseText = JSON.parse(response);
      var facilityId = JSON.stringify(responseText.ID);
      if (responseText.ID != "") {
        var facilityDescription = new XMLHttpRequest();
        facilityDescription.open('GET', '/api/facilityData/getRecreationInfoById?facilityId=' + facilityId, true);
        facilityDescription.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        facilityDescription.send();
        facilityDescription.onload = function() {
          if (facilityDescription.status === 200) {  
            var facilityData = facilityDescription.responseText;
            var park = document.getElementById('park-info');
            park.innerHTML = facilityData;  
            if (park.childNodes.length === 0){
              appendElement('park-info', 'h3', 'We\'re Sorry');
              appendElement('park-info', 'p', 'Facility data is unavailable for this location.');
            }
          }
        }
      }
      else {
        removeData('park-info');
        appendElement('park-info', 'h3', 'We\'re Sorry');
        appendElement('park-info', 'p', 'Facility data is unavailable for this location.');
      }
    }
  }
}

function getWeather() {
  var parkName = index.options[index.selectedIndex].text;
  var location = document.getElementById('park').value;  
  var latLong = location.split(',');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/weatherCity/getCity?latitude=' + latLong[0] +'&longtitude=' + latLong[1], true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
 // xhr.send();
  xhr.onload = function() {
    if(xhr.status === 200) {
      document.getElementById('weather').setAttribute('class', 'col-sm-3 show');   
      removeData('weather-pod');    
      var response = xhr.responseText;
      var responseText = JSON.parse(response);
      var data = responseText.simpleforecast.forecastday;
      appendElement('weather-pod', 'h4', 'Weather near ' + parkName + ' National Park');
      for(i = 0; i < data.length; i++) {
        appendElement('weather-pod', 'h5', data[i].date.weekday + ': ' + data[i].conditions);
        newImage('weather-pod', data[i].icon_url, 'div');
        appendElement('weather-pod', 'p', 'High: ' + data[i].high.fahrenheit + '\xB0F');
        appendElement('weather-pod', 'p', 'Low: ' + data[i].low.fahrenheit + '\xB0F');
      }
    }
  }
}

function getMap() {
  var parkName = index.options[index.selectedIndex].text;
  var parkLocation = document.getElementById('park').value;  
  var parkCoordinates = parkLocation.split(',');
  var parkLatitude = parseFloat(parkCoordinates[0]).toFixed(5);
  var parkLongtitude = parseFloat(parkCoordinates[1]).toFixed(5);
  var mapCanvas = document.getElementById('map');

  var mapOptions = {
    center: new google.maps.LatLng(39.0708, -87.2600), //Dugger, Indiana coordinates to center map on US
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(parkLatitude, parkLongtitude),
    title: parkName
  });
  marker.setMap(map);

  var infoWindow = new google.maps.InfoWindow({map: map});

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here');
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function getInfo() {  
  event.preventDefault();
  getFlickr();
  getRecreation();
  getWeather();
  document.getElementById('map-container').setAttribute('class', 'show');
  getMap();
}

submit.addEventListener('submit', getInfo, false);