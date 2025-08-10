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

          document.getElementById('sqInfo').innerHTML += "<li>" + sqData.squirrels[c].type + "s are roughly " + sqData.squirrels[c].size[0] + " to " + sqData.squirrels[c].size[1] + ' inches long.' + "</li>";
        }
      }
    }
    );//end fn(sqData)


  // let leafMap = L.map('mymap').setView(mycoord, myZoom);

  // 
  let map2 = L.map('leafMap').setView([38.47, -122.727], 6);

  map2.scrollWheelZoom.disable();

  //add tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map2);



  // Initialize layer groups first - not adding to map
  let douglasLayer = L.layerGroup();
  let westernLayer = L.layerGroup();
  let humboldtsFlyingLayer = L.layerGroup();
  let foxLayer = L.layerGroup();
  let easternLayer = L.layerGroup();
  let groundLayer = L.layerGroup();


  let douglasLayerShowing = false;
  let westernLayerShowing = false;
  let humboldtsFlyingLayerShowing = false;
  let foxLayerShowing = false;
  let easternLayerShowing = false;
  let groundLayerShowing = false;


  // add local markers 
  $.getJSON("js/squirrels.json", function(jsonData) {
    jsonData.squirrels.forEach(function(squirrel) {

      var marker2 = L.marker([squirrel.lat, squirrel.lng]).addTo(map2);
      marker2.bindPopup("<strong>" + squirrel.title + "</strong><br>" + squirrel.description);
    });
  });




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
      return response.json();
    })
    .then(function(arcGIS) {
      if (arcGIS) {
        L.geoJSON(arcGIS, {
          style: function(feature) {
            return { color: "rgb(0,0,0)" };
          },
          onEachFeature: function(feature, layer) {
            westernLayer.addLayer(layer);
          },
        });
      }
    })
    .catch(function(err) {
      console.log(err);
    });

  // $('#menu2').click(function() {
  //   if (westernLayerShowing) {
  //     westernLayer.remove();
  //     westernLayerShowing = false;
  //     $(this).removeClass('active');
  //   } else {
  //     westernLayer.addTo(map2);
  //     westernLayerShowing = true;
  //     $(this).addClass('active');
  //   }
  // });

  $('#btn2').click(function() {
    if (westernLayerShowing) {
      westernLayer.remove();
      westernLayerShowing = false;
      $(this).removeClass('active');
    } else {
      westernLayer.addTo(map2);
      westernLayerShowing = true;
      $(this).addClass('active');
    }
  });


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



  //ground squirrel range map
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

  //-------------------------------------------------------------

  // const LeafIcon = L.Icon.extend({
  //   options: {
  //     shadowUrl: 'sqIconPShadOP56-48.png',
  //     iconSize: [35, 48],
  //     shadowSize: [50, 42],
  //     iconAnchor: [14, 47], //  middle bottom of the icon
  //     shadowAnchor: [10, 39], // start under the icon
  //     popupAnchor: [1, -48], // open above the icon
  //     className: 'leaf-icon'
  //   }
  // });

  // const leafIcon = new LeafIcon({ iconUrl: 'sqIconP35-48.png' });

  // // Adding to 'map2'
  // L.marker([36.47, -123.727], { icon: leafIcon })
  //   .addTo(map2)
  //   .bindPopup('I am a squirrel.');

  //-------------------------------------------------------------

  const DouglasIcon = L.Icon.extend({
    options: {
      shadowUrl: 'douglasIconShad.png',
      iconSize: [45, 60],
      shadowSize: [50, 42],
      iconAnchor: [14, 47], 
      shadowAnchor: [1, 20], 
      popupAnchor: [1, -48], 
      className: 'douglas-icon'
    }
  });

  const douglasIcon = new DouglasIcon({ iconUrl: 'douglasIcon.png' });

  // Adding to 'map2'
  L.marker([38.4, -122.9], { icon: douglasIcon })
    .addTo(map2)
    .bindPopup('<p>The Douglas Squirrel is the fastest, loudest, and arguably the cutest of the squirrels found in California. A rich dark brown coat of fur on its back contrasts with a bright chestnut red belly in the summer. The belly fur changes to a dusty gray in the late fall to early winter around the same time that the chestnut colored leaves fade into the landscape.</p><p><a href=\"https://a72534d0-2af0-4843-b222-3b1c75babde3-00-1bbrcjir7pwjq.kirk.replit.dev/Douglas_Squirrel.html\" target=\"_blank\">learn more</a></p>');

  //-------------------------------------------------------------


  const FoxIcon = L.Icon.extend({
    options: {
      shadowUrl: 'foxIconShad75.png',
      iconSize: [75, 85],
      shadowSize: [59, 48],
      iconAnchor: [14, 45],
      shadowAnchor: [0, 7],
      popupAnchor: [1, -46],
      className: 'fox-icon'
    }
  });

  const foxIcon = new FoxIcon({ iconUrl: 'foxIcon75.png' });

  // Adding to 'map2'
  L.marker([38.16, -121.69], { icon: foxIcon })
    .addTo(map2)
    .bindPopup('I am a fox squirrel.');

//-------------------------------------------------------------
  const WGrayIcon = L.Icon.extend({
    options: {
      shadowUrl: 'westernGrayIconShad.png',
      iconSize: [58, 56],
      shadowSize: [60, 30],
      iconAnchor: [15, 45],
      shadowAnchor: [10, 10],
      popupAnchor: [1, -46],
      className: 'western-icon'
    }
  });

  const wGrayIcon = new WGrayIcon({ iconUrl: 'westernGrayIcon.png' });

  // Adding to 'map2'
  L.marker([39.97, -123.4], { icon: wGrayIcon })
    .addTo(map2)
    .bindPopup('<p>The Western Gray Squirrel tends to be timid around humans. Found in pine forests and the edges of oak savannahs, it has a thick silver-gray coat and a white belly. Their deep warble is distinctive and is often heard as a warning to other squirrels when predators are near.</p><p><a href=\"https://a72534d0-2af0-4843-b222-3b1c75babde3-00-1bbrcjir7pwjq.kirk.replit.dev/Western_Gray.htmll\" target=\"_blank\">learn more</a></p>');

  //-------------------------------------------------------------
  const FlyingIcon = L.Icon.extend({
    options: {
      shadowUrl: 'flyingIconShad2.png',
      iconSize: [75, 54],
      shadowSize: [72, 50],
      iconAnchor: [15, 45],
      shadowAnchor: [0, 7],
      popupAnchor: [1, -46],
      className: 'flying-icon'
    }
  });

  const flyingIcon = new FlyingIcon({ iconUrl: 'flyingIcon2.png' });

  // Adding to 'map2'
  L.marker([41.7, -124.0], { icon: flyingIcon })
    .addTo(map2)
    .bindPopup(`<p>Humboldt's Flying Squirrel is nocturnal and forages mostly at night. Rarley observed, it can be found in old growth and second growth redwood, spruce, and hemlock forests. This west coast species is older and genetically distinct from the two other types of flying squirrels in North America, the Northern and Southern Flying Squirrels. All three species of flying squirrel fluoresce pink at night under uv light, but the purrpose of this fluorescence remains unkown.</p><p><a href=\"https://a72534d0-2af0-4843-b222-3b1c75babde3-00-1bbrcjir7pwjq.kirk.replit.dev/Humboldts_Flying.html\" target=\"_blank\">learn more</a></p>`);

  
  //-------------------------------------------------------------


  const GroundIcon = L.Icon.extend({
    options: {
      shadowUrl: 'groundSQiconShad-119-48.png',
      iconSize: [95, 43],
      shadowSize: [99,37],
      iconAnchor: [14, 12],
      shadowAnchor: [8, 3],
      popupAnchor: [1, -46],
      className: 'ground-icon'
    }
  });

  const groundIcon = new GroundIcon({ iconUrl: 'groundSQicon.png' });

  // Adding to 'map2'
  L.marker([36.01, -118.4], { icon: groundIcon })
    .addTo(map2)
    .bindPopup('I represent a ground squirrel.');

  //-------------------------------------------------------------
  const EGrayIcon = L.Icon.extend({
    options: {
      shadowUrl: 'easternGrayIconShad-67-81.png',
      iconSize: [55, 70],
      shadowSize: [55, 32],
      iconAnchor: [15, 45],
      shadowAnchor: [10, 10],
      popupAnchor: [1, -46],
      className: 'eastern-icon'
    }
  });

  const eGrayIcon = new EGrayIcon({ iconUrl: 'easternGrayIcon-67-81.png' });

  // Adding to 'map2'
  L.marker([37.24, -122.], { icon: eGrayIcon })
    .addTo(map2)
    .bindPopup('I am a eastern gray squirrel.');


  // fetch('js/week9.json')
  // .then(function(response) {
  //   console.log(response);
  //   let j = response.json();
  //   j.catch(function(err) {
  //     console.log(err);
  //   });//end catch
  //   return j;
  // })
  // .then(function(sqData) {
  //   console.log(sqData);
  //   if (sqData) {
  //     for (let c = 0; c < sqData.squirrels.length; c++) {

  //       document.getElementById('sqTable').innerHTML += "<li>" + sqData.squirrels[c].type + "s are roughly " + sqData.squirrels[c].size[0] + " to " + sqData.squirrels[c].size[1] + ' inches long.' + "</li>";
  //     }
  //   }
  // }
  // );//end fn(sqData)


});//end document ready