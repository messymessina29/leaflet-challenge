let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a request to API and grab features array
d3.json(url).then(function (data) {
    createFeatures(data.features);
  });
  
  function createFeatures(earthquakeData) {
    // Function to determine marker size based on magnitude
    function markerSize(magnitude) {
        return magnitude * 4;
    }

    // Function to determine marker color based on depth
    function markerColor(depth) {
        if (depth > 90) {
            return "#ea2c2c";
        } else if (depth > 70) {
            return "#ea822c";
        } else if (depth > 50) {
            return "#ee9c00";
        } else if (depth > 30) {
            return "#eecc00";
        } else if (depth > 10) {
            return "#d4ee00";
        } else {
            return "#98ee00";
        }
    }

    // Create function for features to create popup of earthquake details
    function onEachFeature(feature, layer) {
        layer.bindPopup(`
            <h3>${feature.properties.place}</h3>
            <hr>
            <p><strong>Time:</strong> ${new Date(feature.properties.time)}</p>
            <p><strong>Magnitude:</strong> ${feature.properties.mag}</p>
            <p><strong>Depth:</strong> ${feature.geometry.coordinates[2]} km</p>
        `);
    }
  
    // Create GeoJSON layer to pass in features array and adjust marker details
    let earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: markerColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: onEachFeature
    });
  
    
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {
  
    // Create the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // create map of earthquakes
    let map = L.map("map", {
      center: [
        40.42, -3.70
      ],
      zoom: 3,
      layers: [street, earthquakes]
    });
    
    // Set up the legend.
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let dpth = [0,10,30,50,70,90];
    let colors = ["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"];
    let labels = [];

    //Add legend title
    let legendInfo = "<strong>Earthquake Depth Legend</strong><div class=\"labels\"></div>";
    div.innerHTML = legendInfo;
    //Add corresponding color to depth index to legend
    dpth.forEach(function(limit, index) {
        labels.push(
            '<li><span style="background-color: ' + colors[index] + '"></span>' +
            (dpth[index + 1] ? `${limit}&ndash;${dpth[index + 1]} km` : `${limit}+ km`) +
            '</li>'
        );
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
};

  // Adding the legend to the map
  legend.addTo(map);
    
    // Add in layer contol and pass in map objects
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  
  }
  