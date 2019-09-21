 d3.json("/api/data").then(function(data) {
  console.log(data);
});



var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: 'pk.eyJ1IjoiZGdyaW5pbmdlciIsImEiOiJjazA2MWQ0b24wNTg0M2NvNW5mYjA5NGpiIn0.kd9GdHZwWCGU2EbZOBAoEQ'
}).addTo(myMap);
