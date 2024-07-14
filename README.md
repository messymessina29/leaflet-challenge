# leaflet-challenge
This assignment analyzes earthquakes from the past 24 hours 7/13/24 - 7/14/24 and plots them on a map. The markers on the map are circles where the size is dependent on the earthquake magnitude and color based on depth of the earthquake. Each marker includes a popup describing the location, time, magnitude, and depth of the earthquake.
Source: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

Citations used from Xpert Learning Assistant:

# lines 15-29: Color styles from Leaflet
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
# lines 44-52: Calling the circle marker and adding pointToLayer and the styling to it
pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: markerColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
# lines 104-110: Creating the style of the legend using HTML & CSS
  dpth.forEach(function(limit, index) {
        labels.push(
            '<li><span style="background-color: ' + colors[index] + '"></span>' +
            (dpth[index + 1] ? `${limit}&ndash;${dpth[index + 1]} km` : `${limit}+ km`) +
            '</li>'
        );
    });
# CSS Styling located in style.css file
.info.legend {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  line-height: 18px;
  color: #555;
}

.info.legend ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info.legend li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.info.legend span {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
}