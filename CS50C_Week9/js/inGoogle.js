





var map1, markers = [];

function initMap() {
  
  $.getJSON("js/squirrels.json", function(jsonData) {
    var geocoord1 = {
      lat: 38.47,
      lng: -122.72
    };

    map1 = new google.maps.Map(document.getElementById('mymap'), {
      center: geocoord1,
      zoom: 6
    });

    for (var c = 0; c < jsonData.squirrels.length; c++) {
      var squirrel = jsonData.squirrels[c];
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

      markers[c].addListener('click', function() {
        var info1 = new google.maps.InfoWindow({
          content: this.custom_property
        });
        info1.open(map1, this);
      });
    }
  });
}

$(document).ready(function() {

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

});






