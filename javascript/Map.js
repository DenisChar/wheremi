//mappa

var mymap = L.map('mapid').fitWorld();

//shortcut for zooming

mymap.locate({setView: true, maxZoom: 16});

//layer

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11'
}).addTo(mymap);

//function onmapclick

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}
mymap.on('click', onMapClick);

//popup instead of an alert

var popup = L.popup();

function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent(e.latlng.toString())
      .openOn(mymap);
}
mymap.on('click', onMapClick);

//funzione per la localizzazione

function onLocationFound(e) {
    var radius = e.accuracy;

  L.marker(e.latlng).addTo(mymap)
//		.bindPopup("You are within " + radius + " meters from this point").openPopup();
//		L.circle(e.latlng, radius).addTo(mymap);
}
mymap.on('locationfound', onLocationFound);

//funzione alert

function onLocationError(e) {
  alert(e.message);
}
mymap.on('locationerror', onLocationError);
