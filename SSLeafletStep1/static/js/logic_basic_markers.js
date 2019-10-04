function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the earthquakes layer
    var overlayMaps = {
      "earthquakes": earthquakes
    };
  
    // Create the map object with options
    var map = L.map("map", {
      center: [ 37.09, -95.71],
      zoom: 5,
      layers: [lightmap, earthquakes]
    });


  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: true
    }).addTo(map);

  // Create a legend to display information about our map
  var info = L.control({
    position: "bottomleft"
  });

  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(map);

  document.querySelector(".legend").innerHTML = [
    '<i style="background:green"></i>' + '0-1<br/>',
    '<i style="background:yellow"></i>' + '1-2<br/>',
    '<i style="background:orange"></i>' + '2-3<br/>',
    '<i style="background:red"></i>' + '3-4<br/>',
    '<i style="background:purple"></i>' + '4-5<br/>',
    '<i style="background:black"></i>' + '5+<br/>',
  ].join("");


  }
  
  function createMarkers(response) {
  
    // Pull the "features" property off of response.data
    var features = response.features;
    
  
    // Initialize an array to hold earthquake markers
    var eqMarkers = [];
  
    // Loop through the features array
    for (var index = 0; index < features.length; index++) {
      var feature = features[index];
      var magnitude = feature.properties.mag;
      var fc = "black";
      console.log (magnitude);


      //set color for marker dpeending on magnitude
      if (magnitude < 1) {
        fc = "green";
        }
      else if (magnitude >= 1 && magnitude < 2) {
        fc = "yellow";
      }
      else if (magnitude >= 2 && magnitude < 3) {
        fc = "orange";
      }
      else if (magnitude >= 3 && magnitude < 4) {
        fc = "red";
      }
      else if (magnitude >= 4 && magnitude < 5) {
        fc = "purple";
      }
      else {
        fc = "black";
      }
  
      // For each feature, create a marker and bind a popup with the location, magnitude, date and time of the earthquake
      var featureMarker = L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],{
        fillOpacity: 0.75,
        color: "black",
        weight: 1,
        fillColor: fc
        }).bindPopup("<h3> Earthquake Location: <br>" + feature.properties.place + "</h3><hr><p>" + "</p> Earthquake Magnitude: "+ feature.properties.mag + "<hr><p> Date & Time: <br>" + new Date(feature.properties.time) + "</p>").setRadius(magnitude *5);
  
  
      // Add the marker to the eqMarkers array
      eqMarkers.push(featureMarker);
    }
  
    // Create a layer group made from the earthquake markers array, pass it into the createMap function
    createMap(L.layerGroup(eqMarkers));
  }

  

  


  
  // Perform an API call to the USGS API to get feature information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createMarkers);
  