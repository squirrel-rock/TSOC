$(document).ready(function() {







  ///////////////////////////////////////////////////

  //jQuery dropdown nav

  $('#navbarButtons .btn').click(function() {
    $('.navbar-collapse').collapse('hide'); 
  });


  // let mymap = L.map('leafMap').setView(mycoord, myZoom);

  let map2 = L.map('leafMap').setView([37.64, -121.0], 7);

  //disable scrolling
  map2.scrollWheelZoom.disable();


  // adding tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
  }).addTo(map2);


//------------------------------------------------//
//////// FETCH SQUIRRELS.JSON DATA - INITIATE MAP ///////
 

let squirrelLayers = {}; // make a global object to store layers, each keyed by squirrel's number

  fetch('js/squirrels.json')
  .then(response => response.json())
   
  .then(data => {
    data.squirrels.forEach(squirrel => {
      fetch(squirrel.geoJsonUrl)
      .then(response => response.json())
      .then(geoJsonData => {
        const layer = L.geoJSON(geoJsonData, {
          style: () => ({
            color: squirrel.style.color,
            opacity: squirrel.style.opacity,
            weight: squirrel.style.weight,
            fillColor: squirrel.style.fillColor,
            fillOpacity: squirrel.style.fillOpacity
          })
   
        });

 
        
 ///// --------   create icons and popups  --------   /////////
        const iconOptions = squirrel.icon;
        const icon = L.icon(iconOptions);
        const marker = L.marker([squirrel.lat, squirrel.lng], { icon });

      
        const popupContent = `
            <img src="${squirrel.photo}" alt="${squirrel.title}" style="max-width:100%; height:auto;">
            <br><strong>${squirrel.title}</strong>
            <br>${squirrel.description}
        `;

        console.log(popupContent);
        marker.bindPopup(popupContent);
     
        // storing layer and marker globally
        squirrelLayers[squirrel.number] = { layer, marker };
      })
      .catch(err => console.error("load GeoJSON data failed:", err));
    });
  })
  .catch(err => console.error("load squirrel data failed:", err));


  //----------------- END FETCH Squirrels.json --------------///////////


  
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////        TOGGLE BUTTON LAYERS AND MARKERS                   /////////
  
/// --- Listen for button clicks ------- ////

  //assign button's data number to variable
  $('button.tog').click(function() {
    const squirrelNumber = $(this).data('number'); 
    console.log(`button click is`);
    console.log(this);
   // use squirrelNumber variable as index for the getting global squirrel layer data for that particular squirrel 
    const squirrelData = squirrelLayers[squirrelNumber];
//check data is there
    if (!squirrelData) {
      console.error("squirrel layer number " + squirrelNumber + " not there");
      return;
    }

    if (map2.hasLayer(squirrelData.layer)) {
      map2.removeLayer(squirrelData.layer);
      console.log(squirrelData.layer);
      map2.removeLayer(squirrelData.marker); 
      $(this).removeClass('active');
    } else {
      squirrelData.layer.addTo(map2);
      squirrelData.marker.addTo(map2); 
      $(this).addClass('active');
    }
  });


/////////////////////////// GEOLOCATION MARKER ////////////////////
  let pin = L.icon({
      iconUrl: 'redPinR.png',
      shadowUrl: 'redPinRShad.png',
      iconSize: [25, 40],
      iconAnchor: [5, 40], 
      shadowSize: [32, 20],
      shadowAnchor: [0, 20], 
      popupAnchor: [1, -34]
  });

  map2.locate({setView: false}); // do not set map view to the user's location

  // Listening for user's location
  map2.on('locationfound', function(event) {
      L.marker(event.latlng, {icon: pin}).addTo(map2)
          .bindPopup("<strong>You are here.</strong><br><br> These are your current coordinates: " + event.latlng.lat + ", " + event.latlng.lng)
          .openPopup();
  });

  // Handling location errors separately
  map2.on('locationerror', function(err) {
      alert("your location is not available -- " + err);
  });


////////////////////////////////////////////////////////////////////////

  // add Places markers here
  fetch('js/mData.json')
  .then(function(response) {
    console.log(response);
    return response.json(); 
  })
  .then(function(mData) {
    console.log(mData);
    if (mData) {
      for (let c = 0; c < mData.places.length; c++) {
        const place = L.marker([mData.places[c].lat, mData.places[c].lng]).addTo(map2); 

     
        place.bindPopup(`<strong>${mData.places[c].title}</strong><br><br>${mData.places[c].place}<br>${mData.places[c].description}`);
      }
    }
  })
  .catch(function(err) { 
    console.log(err);
  });


////////////////  //geolocate
  // function onMapClick(myevent) {
  //   console.log(myevent);
  //   let popcoords = L.popup();
  //   popcoords.setLatLng(myevent.latlng)
  //     .setContent('Your coordinates: ' + myevent.latlng.toString())
  //     .openOn(map2);
  // }

  // map2.on('click', onMapClick);

});//end document ready