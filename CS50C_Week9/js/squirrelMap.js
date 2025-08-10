$(document).ready(function () {
  // Collapse nav after button click
  $('#navbarButtons .btn').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  const californiaCenter = [37.64, -121.0];
  const lockedZoom = 5; 

  const map2 = L.map('leafMap', {
    center: californiaCenter,
    zoom: lockedZoom,
    zoomControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    touchZoom: false,
    keyboard: false,
    zoomSnap: 1,
    zoomDelta: 1
  });

  //disable scrolling
  map2.scrollWheelZoom.disable();


  // Tiles
  // adding tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
  }).addTo(map2);

  // Immediately add zoom control in a known corner
if (map2.zoomControl) map2.removeControl(map2.zoomControl);
L.control.zoom({ position: 'topleft' }).addTo(map2); // 

  const squirrelLayers = {};

  // Load squirrel layers and markers
  fetch('js/squirrels.json')
    .then(r => r.json())
    .then(data => {
      data.squirrels.forEach(squirrel => {
        fetch(squirrel.geoJsonUrl)
          .then(r => r.json())
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

            const icon = L.icon(squirrel.icon);
            const marker = L.marker([squirrel.lat, squirrel.lng], { icon });

            const popupContent = `
              <img src="${squirrel.photo}" alt="${squirrel.title}" style="max-width:100%;height:auto;">
              <br><strong>${squirrel.title}</strong>
              <br>${squirrel.description}
            `;
            marker.bindPopup(popupContent);

            squirrelLayers[squirrel.number] = { layer, marker };
          })
          .catch(err => console.error('load GeoJSON failed:', err));
      });
    })
    .catch(err => console.error('load squirrel data failed:', err));

  // Toggle layers and markers via buttons
  $('button.tog').click(function () {
    const num = $(this).data('number');
    const s = squirrelLayers[num];

    if (!s) {
      console.error('squirrel layer number ' + num + ' not ready');
      return;
    }

    if (map2.hasLayer(s.layer)) {
      map2.removeLayer(s.layer);
      map2.removeLayer(s.marker);
      $(this).removeClass('active');
    } else {
      s.layer.addTo(map2);
      s.marker.addTo(map2);
      $(this).addClass('active');
    }

    // Keep view stable (same center & zoom), no animation
    map2.setView(californiaCenter, lockedZoom, { animate: false });
  });

  // Removed: extra place markers (the default blue pins)
  // (This deletes the whole fetch('js/mData.json') block.)
});