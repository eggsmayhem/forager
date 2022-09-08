
//NOTE: Refactor this to be a primary function with callbacks, instead of all within one function 

//What this currently does:
// gets coordinates one time, loads a map with Two markers.

//What I want it to do:
//call to plant API, get plant ID. After this is verified, give option to post location that will create a marker with the plants name, perhaps with its image 


// document.querySelector('#find-me').addEventListener('click', geoFindMe);
//if that asks users permission, determines if they are geolocator compatible, and returns coords into DOM 

//should give user ability to also enter custom coordinates to determin which map they pull up, or to place a custom marker if they know where a plant is but aren't physically there

//could let user know if plant is invasive, please get rid of it and mark. If rare/protected, please leave it alone, won't be able to mark

//we want to create an object: plantname, plantpicture (maybe), coordinates to push to global plants directory

//tack on the userid so user can pull up to their personal map of private spells

//draggable: in the leaflet docs, under markers, we see that they can be mae drggable, which could come in handy for Geosigil component. In icons, you can add custom marker icons

//We can use MARKERS to add or remove different item types from a map

//need an endpoint to store all data by category

//also add ability to search through 'useful plants" database to see if what they found is a known occult herb, or is edible 

//create a unique marker for whatever the new plant is, and/or have all others disabled in layers by default 

//eventually, if you could get a time-series of weather, you could find a time when a certain area is supposed to be clear and plan your events around the weather, and you could check in later to see if the area is still supposed to be clear 

//currently returns the first plant, eventually we want to show them images of the suggestions, have them select the correct one, then work with only that data 

document.getElementById('weathermap').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
//why is this in an IIFE? 

(() => {
  //message enables us to tell user if their browser doesn't support geolocation
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
      //map initialization 
      
      const map = L.map('map').setView([latitude, longitude], 13)

      message.innerText = `your coordinates are: ${latitude} lat ${longitude} lon`

      //hardcode some plant info for testing

      const plant = {
        url: "https://plant.id/media/images/fb4120879ae04199821cce79b6fd60c8.jpg",
        scientificName: "Magnolia virginiana"
      }

      //loading all related coords, rendering with only the new Plant visible by default


      //rendering the map
      //osm layer 
      const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
      osm.addTo(map)

      //enable adding WMS weather data

      const nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
})

      const watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	  subdomains: 'abcd',
	  minZoom: 1,
	  maxZoom: 16,
	  ext: 'jpg'
    })

    watercolor.addTo(map)

    const googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
  })

  googleSat.addTo(map)

  //custom icons
  const illumIcon = L.icon({
    iconUrl: '../img/realeyenobg.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
})

const mandrakeIcon = L.icon({
  iconUrl: '../img/mandrake1croppednobg.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  // shadowUrl: 'my-icon-shadow.png',
  // shadowSize: [68, 95],
  // shadowAnchor: [22, 94]
})
      //add marker with second set of coordinates, hardcoded for now
    const singleMarker = L.marker([latitude, longitude], {icon: illumIcon})
    const popup = singleMarker.bindPopup('Name of plant <br>' + singleMarker.getLatLng()).openPopup()
    popup.addTo(map)

    const secondMarker = L.marker([39.0047, -77.3602], {icon: mandrakeIcon})
    secondMarker.addTo(map)

    console.log(singleMarker.toGeoJSON())
    const baseMaps = {
      "OSM": osm,
      "Watercolor": watercolor,
      "Google Satelitte": googleSat,
      
  }
  
  const overlayMaps = {
      "Marker": singleMarker,
      "Second Marker": secondMarker,
      "Weather": nexrad
  }
  
  L.control.layers(baseMaps, overlayMaps).addTo(map)

  //example of a mouseover event that can do stuff with coordinates
  map.on('mousemove', function(e) {
    console.log('lat:' + e.latlng.lat, 'lng: ' + e.latlng.lng)
  })
     
}

  //Layer Controller

  
  // handle error case
  function onError() {
      message.classList.add('error');
      message.textContent = `Failed to get your location!`;
  }
})();