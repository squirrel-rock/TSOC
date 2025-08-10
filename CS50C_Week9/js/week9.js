// $(document).ready(function() {


  fetch('js/squirrels.json')
    .then(function(response) {
      console.log(response);
      let j = response.json();
      j.catch(function(err) {
        console.log(err);
      });//end catch
      return j;
    })
    .then(function(sqData) {
      console.log(sqData);
      if (sqData) {
        for (let c = 0; c < sqData.squirrels.length; c++) {

          document.getElementById('sqTable').innerHTML += "<li>" + sqData.squirrels[c].type + "s are roughly " + sqData.squirrels[c].size[0] + " to " + sqData.squirrels[c].size[1] + ' inches long.' + "</li>";
        }
      }
    }
    );//end fn(sqData)


  var map1, markers = [];

  function initMap() {
    // Load external json data
    $.getJSON("js/squirrels.json", function(jsonData) {
      // Step 1. Define the geocoord (lat,long) for the center first
      var geocoord1 = {
        lat: 38.47,
        lng: -122.72,
      };

      // Step 2. Create a google Map object
      map1 = new google.maps.Map(document.getElementById('mymap'), {
        center: geocoord1,
        zoom: 6
      });

      // Loop through all objects in loaded json array
      for (var c = 0; c < jsonData.squirrels.length; c++) {
        var squirrel = jsonData.squirrels[c]; // access each squirrel array
        var geocoord = {
          lat: squirrel.lat,
          lng: squirrel.lng
        };

        markers[c] = new google.maps.Marker({
          position: geocoord,
          map: map1,
          title: squirrel.title,
          custom_property: squirrel.description
        });

        // Define a click event on our marker to make + open info window
        markers[c].addListener('click', function() {
          var info1 = new google.maps.InfoWindow({
            content: this.custom_property
          });

          // Tell the info window to open inside of our map and center on this marker's geocoord
          info1.open(map1, this);
        });
      } // End for loop
    }); // End $.getJSON
  }






// });//end document ready