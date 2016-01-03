var submit = document.getElementById('location');
var index = document.getElementById('park');
var parkName = index.options[index.selectedIndex].text;

function createImage(columnNumber, flickrPath){
  var hero = document.getElementById('hero');
  var placeholder = document.createElement('img');
  placeholder.src = '../images/holder.png';
  var imageContainer = document.createElement('div');
  imageContainer.appendChild(placeholder);
  var hero = document.getElementById('hero');
  hero.appendChild(imageContainer );
  imageContainer.setAttribute('class', 'col-sm-' + columnNumber + ' col-xs-4');
  placeholder.setAttribute('class', 'img-responsive'); 
  placeholder.style.backgroundImage  = "url('"+ flickrPath + "')";
}

function getFlickr(){   
  var location = document.getElementById('park').value;  
  var latLong = location.split(',');

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/flickrImages', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify({'latitude': latLong[0], 'longtitude': latLong[1] }));

  xhr.onload = function() {
    if(xhr.status === 200) {
      document.getElementsByClassName('jumbotron')[0].style.background  = "none";
      document.getElementsByClassName('jumbotron')[0].style.height  = "auto";
      document.getElementById('footer').setAttribute('class', 'footer-wrap fluid-container show');

      var heroContainer = document.getElementById('hero');
      var firstChild = heroContainer.firstChild;

      while(firstChild){
        heroContainer.removeChild(firstChild);
        var firstChild = heroContainer.firstChild;
      }
      
      var response = xhr.responseText;
      var responseText = JSON.parse(response);
      var data = responseText.photos.photo;

      if (data.length >= 36) {
        for(i = 0; i < 12; i++) {
          var flickrImage  = 'https://farm' + data[i*3].farm + '.staticflickr.com/' + data[i*3].server + '/' + data[i*3].id + '_' + data[i*3].secret + '_c.jpg';         
          createImage(3, flickrImage);
        }
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
            if (data.length >= 24) {
              for(j = 0; j < 12; j++) {             
                var flickrImage  = 'https://farm' + data[j*2].farm + '.staticflickr.com/' + data[j*2].server + '/' + data[j*2].id + '_' + data[j*2].secret + '_c.jpg';       
                createImage(3, flickrImage);
              }
            }   
            else if (data.length === 12){
              for(j = 0; j < 12; j++) {
                var flickrImage  = 'https://farm' + data[j].farm + '.staticflickr.com/' + data[j].server + '/' + data[j].id + '_' + data[j].secret + '_c.jpg';         
                createImage(3, flickrImage);
              }
            }
            else if (data.length <= 11 && data.length >= 6){
              for(j = 0; j < 6; j++) {
                var flickrImage  = 'https://farm' + data[j].farm + '.staticflickr.com/' + data[j].server + '/' + data[j].id + '_' + data[j].secret + '_c.jpg';         
                createImage(4, flickrImage);
              }
            }
            else {
              for(j = 0; j < data.length; j++) {
                var flickrImage  = 'https://farm' + data[j].farm + '.staticflickr.com/' + data[j].server + '/' + data[j].id + '_' + data[j].secret + '_c.jpg';         
                createImage((12/data.length), flickrImage);
              }
            }
          }
        }
      }
    }
  }
}

function getRecreation(){ 
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

      var facilityDescription = new XMLHttpRequest();
      facilityDescription.open('GET', '/api/facilityData/getRecreationInfoById?facilityId=' + facilityId, true);
      facilityDescription.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      facilityDescription.send();

      facilityDescription.onload = function() {
        if(facilityDescription.status === 200) {
          var facilityData = facilityDescription.responseText;

      //    console.log(facilityData);
           var park = document.getElementById('park-info').innerHTML = facilityData;
          //var park = document.getElementById('park-info');
          //var descriptionContainer = document.createElement('div');
          //var dataHtml= document.createTextNode(facilityData);
          //var firstChild = park.firstChild;

          while(firstChild){
            park.removeChild(firstChild);
            var firstChild = park.firstChild;
          }

       //   descriptionContainer.appendChild(dataHtml);
        //  park.appendChild(descriptionContainer);
        }
      }
    }
  }
}

function getWeather(){
  var location = document.getElementById('park').value;  
  var latLong = location.split(',');
  var latitude = latLong[0];
  var longtitude = latLong[1];
 
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/weatherCity/getCity?latitude=' + latitude +'&longtitude=' + longtitude, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send();

  xhr.onload = function() {
    if(xhr.status === 200) {
      document.getElementById('weather').setAttribute('class', 'col-sm-3 show');

      var weatherContainer = document.getElementById('weather-pod');
      var firstChild = weatherContainer.firstChild;

      while(firstChild){
        weatherContainer.removeChild(firstChild);
        var firstChild = weatherContainer.firstChild;
      }

      var response = xhr.responseText;
      var responseText = JSON.parse(response);
      var data = responseText.simpleforecast.forecastday;
 
      for(i = 0; i < data.length; i++){
        var weather = document.getElementById('weather-pod');
        var highPar = document.createElement('p');
        var lowPar = document.createElement('p');
        var highTemp = document.createTextNode('High: ' + data[i].high.fahrenheit + '\xB0F');
        var lowTemp = document.createTextNode('Low: ' + data[i].low.fahrenheit + '\xB0F');

        var dayPar = document.createElement('p');
        var dayText = document.createTextNode(data[i].date.weekday + ': ' + data[i].conditions);
        dayPar.appendChild(dayText);
        weather.appendChild(dayPar); 

        var weatherImg = document.createElement('img');
        weatherImg.src= data[i].icon_url; 
        var iconWeather = document.createElement('div');
        iconWeather.appendChild(weatherImg);
        weather.appendChild(weatherImg);

        highPar.appendChild(highTemp);
        lowPar.appendChild(lowTemp);
        weather.appendChild(highPar);
        weather.appendChild(lowPar);

        highPar.setAttribute('class', 'temp high');
        lowPar.setAttribute('class', 'temp low');
      }
    }
  }
}

function initialize() {
  var location = document.getElementById('park').value;  
  var latLong = location.split(',');
  var latitude = parseFloat(latLong[0]).toFixed(5);
  var longtitude = parseFloat(latLong[1]).toFixed(5);

  var mapCanvas = document.getElementById('map');
  var mapOptions = {
    center: new google.maps.LatLng(latitude, longtitude),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(mapCanvas, mapOptions);
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longtitude),
    title: parkName
  });
  marker.setMap(map);
}
      
function getInfo(){  
  event.preventDefault();
  getFlickr();
  getRecreation();
  getWeather();
  document.getElementById('map-container').setAttribute('class', 'show');
  initialize();
}

submit.addEventListener('submit', getInfo, false);