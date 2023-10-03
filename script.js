// script.js
document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([21.0697, 105.7500], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
    // Function to toggle visibility of temperature and flood markers
    function toggleLayer(layer, visible) {
      if (visible) {
        map.addLayer(layer);
      } else {
        map.removeLayer(layer);
      }
    }
  
    // Function to fetch data from backend API and update markers
    function updateMarkers() {
      // Fetch data from backend API for temperature and flood alerts
      fetch('YOUR_BACKEND_API_URL')
        .then(response => response.json())
        .then(data => {
          // Update temperature and flood marker coordinates with data from backend
          const temperatureMarker = L.marker([data.temperature.latitude, data.temperature.longitude]).addTo(map);
          temperatureMarker.bindPopup('Temperature Alert');
  
          const floodMarker = L.marker([data.flood.latitude, data.flood.longitude]).addTo(map);
          floodMarker.bindPopup('Flood Alert');
  
          // Add layer control to toggle temperature and flood markers
          const overlayMaps = {
            'Temperature Alert': temperatureMarker,
            'Flood Alert': floodMarker,
          };
          L.control.layers(null, overlayMaps).addTo(map);
        })
        .catch(error => console.error('Error fetching data from backend:', error));
    }
  
    // Call the updateMarkers function to fetch data and update markers
    updateMarkers();
  
    // Geolocation to re-center the map to user's current location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 13);
      });
    }
  });
