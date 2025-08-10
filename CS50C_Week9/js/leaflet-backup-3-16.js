$(document).ready(function() {




  fetch('squirrels.json')
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


  // let leafMap = L.map('mymap').setView(mycoord, myZoom);

  // 
  let map2 = L.map('leafMap').setView([38.47, -122.727], 8);

  //add tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map2);

  let douglasLayerShowing;
  let douglasLayer = L.layerGroup().addTo(map2);
  let westernLayerShowing;
  let westernLayer = L.layerGroup().addTo(map2);
  let humboldtsFlyingLayerShowing;
  let humboldtsFlyingLayer = L.layerGroup().addTo(map2);
  let foxLayerShowing;
  let foxLayer = L.layerGroup().addTo(map2);
  let easternLayerShowing;
  let easternLayer = L.layerGroup().addTo(map2);
  let groundLayerShowing;
  let groundLayer = L.layerGroup().addTo(map2);

  // add local markers 
  $.getJSON("js/squirrels.json", function(jsonData) {
    jsonData.squirrels.forEach(function(squirrel) {

      var marker2 = L.marker([squirrel.lat, squirrel.lng]).addTo(map2);
      marker2.bindPopup("<strong>" + squirrel.title + "</strong><br>" + squirrel.description);
    });
  });

  // create a "global" set of variables that can hold reference to each geoJSON Leaflet object to enable addTo() and removeGeoJSON()


  //douglas squirrel range map
  fetch('https://services2.arcgis.com/Uq9r85Potqm3MfRV/arcgis/rest/services/biosds1870_fpu/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson')
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(arcGIS) {
      console.log(arcGIS);
      if (arcGIS) {

        /*
        L.geoJSON(arcGIS, {
          style: function(feature) {
            return { color: "darkred" };
          }
        });
        */
        L.geoJSON(arcGIS, {
          style: function(feature) {
            return { color: "darkred" };
          },
          onEachFeature: function(feature, layer) {
            douglasLayer.addLayer(layer)
          },
        });
        douglasLayerShowing = true;
      }
    })
    .catch(function(err) {
      console.log(err);
    });

  // attach event handler to support toggle of douglasLayer geoJSON object
  $('#menu1').click(
    function() {
      if (douglasLayerShowing) {
        douglasLayer.remove();
        douglasLayerShowing = false;
        console.log("did it go away?");
      } else {
        douglasLayer.addTo(map2);
        douglasLayerShowing = true;
      }
    }
  );

  //western gray squirrel range map
  fetch('https://services2.arcgis.com/Uq9r85Potqm3MfRV/arcgis/rest/services/biosds1868_fpu/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson')
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(arcGIS) {
      console.log(arcGIS);
      if (arcGIS) {

        L.geoJSON(arcGIS, {
          style: function(feature) {
            return { color: "darkblue" };
          },
          onEachFeature: function(feature, layer) {
            westernLayer.addLayer(layer)
          },
        });
        westernLayerShowing = true;
      }
    })
    .catch(function(err) {
      console.log(err);
    });

  $('#menu2').click(
    function() {
      if (westernLayerShowing) {
        westernLayer.remove();
        westernLayerShowing = false;
        console.log("did western go away?");
      } else {
        westernLayer.addTo(map2);
        westernLayerShowing = true;
      }
    }
  );


  //Humboldts Flying squirrel range map
  fetch('https://services2.arcgis.com/Uq9r85Potqm3MfRV/arcgis/rest/services/biosds1871_fpu/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson')
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(arcGIS) {
      console.log(arcGIS);
    if (arcGIS) {

        L.geoJSON(arcGIS, {
          style: function(feature) {
            return { color: "darkgreen" };
          },
          onEachFeature: function(feature, layer) {
            humboldtsFlyingLayer.addLayer(layer)
          },
        });
      humboldtsFlyingLayerShowing = true;
      }
    })
    .catch(function(err) {
      console.log(err);
    });

  $('#menu3').click(
    function() {
      if (humboldtsFlyingLayerShowing) {
        humboldtsFlyingLayer.remove();
        humboldtsFlyingLayerShowing = false;
        console.log("did eastern go away?");
      } else {
        humboldtsFlyingLayer.addTo(map2);
        humboldtsFlyingLayerShowing = true;
      }
    }
  );

//fox squirrel
  fetch('js/Eastern_Fox_Squirrel_Range_-_CWHR_M078_[ds1869].geojson')
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(arcGIS) {
      console.log(arcGIS);
    if (arcGIS) {

        L.geoJSON(arcGIS, {
          style: function(feature) {
            return { color: "purple" };
          },
          onEachFeature: function(feature, layer) {
            foxLayer.addLayer(layer)
          },
        });
      foxLayerShowing = true;
      }
    })
    .catch(function(err) {
      console.log(err);
    });

  $('#menu4').click(
    function() {
      if (foxLayerShowing) {
        foxLayer.remove();
        foxLayerShowing = false;
        console.log("did fox go away?");
      } else {
        foxLayer.addTo(map2);
        foxLayerShowing = true;
      }
    }
  );


  
  
  //eastern gray squirrel range map
  fetch('https://services2.arcgis.com/Uq9r85Potqm3MfRV/arcgis/rest/services/biosds1867_fpu/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson')
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(arcGIS) {
      console.log(arcGIS);
    if (arcGIS) {

        L.geoJSON(arcGIS, {
          style: function(feature) {
            return { color: "yellow" };
          },
          onEachFeature: function(feature, layer) {
            easternLayer.addLayer(layer)
          },
        });
          easternLayerShowing = true;
      }
    })
    .catch(function(err) {
      console.log(err);
    });

  $('#menu5').click(
    function() {
      if (easternLayerShowing) {
        easternLayer.remove();
        easternLayerShowing = false;
        console.log("did eastern go away?");
      } else {
        easternLayer.addTo(map2);
        easternLayerShowing = true;
      }
    }
  );

//ground squirrel

  //eastern gray squirrel range map
  fetch('https://services2.arcgis.com/Uq9r85Potqm3MfRV/arcgis/rest/services/biosds1864_fpu/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson')
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(arcGIS) {
      console.log(arcGIS);
    if (arcGIS) {

        L.geoJSON(arcGIS, {
          style: function(feature) {
            return { color: "white" };
          },
          onEachFeature: function(feature, layer) {
            groundLayer.addLayer(layer)
          },
        });
      groundLayerShowing = true;
      }
    })
    .catch(function(err) {
      console.log(err);
    });

  $('#menu6').click(
    function() {
      if (groundLayerShowing) {
        groundLayer.remove();
        groundLayerShowing = false;
        console.log("did eastern go away?");
      } else {
        groundLayer.addTo(map2);
        groundLayerShowing = true;
      }
    }
  );

  
});//end document ready