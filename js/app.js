var submit = document.getElementById('location');

//make function to create dropdown menu with location.json
//Create new object constructor

function getPictures(){  
  event.preventDefault();
  var index = document.getElementById('park');
  var parkName = index.options[index.selectedIndex].text;
  var location = document.getElementById('park').value;  
  var latLong = location.split(',');

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/flickrImages', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify({'nationalPark': parkName, 'latitude': latLong[0], 'longtitude': latLong[1] }));

  xhr.onload = function() {
    if(xhr.status === 200) {
      var response = xhr.responseText;
      var data = JSON.parse(response);
      for(i = 0; i < data.length; i++){
        var flickrImage = new Image();
        flickrImage.src = 'https://farm' + data[i].farm + '.staticflickr.com/' + data[i].server + '/' + data[i].id + '_' + data[i].secret + '.jpg';
        var hero = document.getElementsByClassName('hero')[0];
        hero.appendChild(flickrImage);
      }      
    }
  }
}

submit.addEventListener('submit', getPictures, false);