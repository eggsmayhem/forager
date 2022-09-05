// document.querySelector('#find-me').addEventListener('click', geoFindMe);
//if that asks users permission, determines if they are geolocator compatible, and returns coords into DOM 
document.getElementById('weathermap').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";

(() => {
  const message = document.querySelector('#message');

  // const map = null

  // check if the Geolocation API is supported
  if (!navigator.geolocation) {
      message.textContent = `Your browser doesn't support Geolocation`;
      message.classList.add('error');
      return;
  }

  // handle click event
  const btn = document.querySelector('#find-me');
  btn.addEventListener('click', function () {
      // get the current position
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });


  // handle success case
  function onSuccess(position) {
      const {
          latitude,
          longitude
      } = position.coords;

      message.classList.add('success');
      // remove a map if there already is one so a new map can be intialized
      
    
      const map = L.map('map').setView([latitude, longitude], 13)

      message.innerText = `your coordinates are: ${latitude} lat ${longitude} lon`
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      //add marker with second set of coordinates, hardcoded for now
      L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Name of Plant')
        .openPopup()

     
  }

  // handle error case
  function onError() {
      message.classList.add('error');
      message.textContent = `Failed to get your location!`;
  }
})();