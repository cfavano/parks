var submit = document.getElementById('location');

function getFlickr(){  
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
      var heroContainer = document.querySelector('.hero');
      var firstChild = heroContainer.firstChild;

      while(firstChild){
        heroContainer.removeChild(firstChild);
        var firstChild = heroContainer.firstChild;
      }

      var response = xhr.responseText;
      var responseText = JSON.parse(response);
      var data = responseText.photos.photo;

      if (data.length >= 36) {
        for(i = 0; i < 12; i++){
          var hero = document.getElementsByClassName('hero')[0];
          var placeholder = document.createElement('img');
          placeholder.src = '../images/holder.png';
          
          var flickrImage = 'https://farm' + data[i*3].farm + '.staticflickr.com/' + data[i*3].server + '/' + data[i*3].id + '_' + data[i*3].secret + '_c.jpg';         
          
          var imageContainer = document.createElement('div');
          imageContainer.appendChild(placeholder);

          var hero = document.getElementsByClassName('hero')[0];
          hero.appendChild(imageContainer);

          imageContainer.setAttribute('class', 'col-sm-3 col-xs-3');
          placeholder.setAttribute('class', 'img-responsive'); 

          placeholder.style.backgroundImage  = "url('"+ flickrImage + "')";
        }
      }
  
      else {
        var flickrBroad = new XMLHttpRequest(); 
        flickrBroad.open('POST', '/api/flickrImagesBroad', true);
        flickrBroad.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        flickrBroad.send(JSON.stringify({'latitude': latLong[0], 'longtitude': latLong[1] }));

        flickrBroad.onload = function() {
          if(flickrBroad.status === 200 ) {
            var responseFlickr = flickrBroad.responseText;
            var flickrText = JSON.parse(responseFlickr);
            var flickrData = flickrText.photos.photo;
            console.log(flickrData);
            if (flickrData.length > 24) {
              for(j = 0; j < 12; j++) {
                var hero = document.getElementsByClassName('hero')[0];
                var placeholder = document.createElement('img');
                placeholder.src = '../images/holder.png';

                var broadImage  = 'https://farm' + flickrData[j*2].farm + '.staticflickr.com/' + flickrData[j*2].server + '/' + flickrData[j*2].id + '_' + flickrData[j*2].secret + '_c.jpg';         
                var imageContainer = document.createElement('div');
                imageContainer.appendChild(placeholder);

                var hero = document.getElementsByClassName('hero')[0];
                hero.appendChild(imageContainer);

                placeholder.setAttribute('class', 'img-responsive'); 

                imageContainer.setAttribute('class', 'col-sm-3 col-xs-3');             
                placeholder.style.backgroundImage  = "url('"+ broadImage + "')";
              }
            }
       
            else if (flickrData.length === 9){
              for(j = 1; j < 9; j++) {
                var hero = document.getElementsByClassName('hero')[0];
                var placeholder = document.createElement('img');
                placeholder.src = '../images/holder.png';

                var broadImage  = 'https://farm' + flickrData[j].farm + '.staticflickr.com/' + flickrData[j].server + '/' + flickrData[j].id + '_' + flickrData[j].secret + '_c.jpg';         
                var imageContainer = document.createElement('div');
                imageContainer.appendChild(placeholder);

                var hero = document.getElementsByClassName('hero')[0];
                hero.appendChild(imageContainer);

                placeholder.setAttribute('class', 'img-responsive'); 
                imageContainer.setAttribute('class', 'col-sm-3 col-xs-4');             
                placeholder.style.backgroundImage  = "url('"+ broadImage + "')";
              }
            }
            else if (flickrData.length === 2){
              for(j = 0; j < 2; j++) {
                var hero = document.getElementsByClassName('hero')[0];
                var placeholder = document.createElement('img');
                placeholder.src = '../images/holder.png';

                var broadImage  = 'https://farm' + flickrData[j].farm + '.staticflickr.com/' + flickrData[j].server + '/' + flickrData[j].id + '_' + flickrData[j].secret + '_c.jpg';         
                var imageContainer = document.createElement('div');
                imageContainer.appendChild(placeholder);
                imageContainer.setAttribute('class', 'col-sm-6 col-xs-6');             
                placeholder.style.backgroundImage  = "url('"+ broadImage + "')";

                var hero = document.getElementsByClassName('hero')[0];
                hero.appendChild(imageContainer);

                placeholder.setAttribute('class', 'img-responsive'); 
              }
            }
          }
        }
      }
    }
  }
}

function getRecreation(){ 
  var index = document.getElementById('park');
  var parkName = index.options[index.selectedIndex].text;
  
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

function getInfo(){  
  event.preventDefault();
  getFlickr();
  getRecreation();
}

submit.addEventListener('submit', getInfo, false);