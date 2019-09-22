


d3.json("/api/data").then(function(data) {
  console.log(data);


let beer = data.map(a=> a["Beer per Capita"]);
console.log(beer);

let country = data.map(a => a.Country);
console.log(country);

let spirit = data.map(a => a["Spirits per Capita"]);
console.log(spirit);

let wine = data.map(a=> a["Wine per capita"]);
console.log(wine);

let hdi = data.map(a=> a["HDI"]);
console.log(hdi);

let gdp = data.map(a=> a["GDP per Capita"]);
console.log(gdp);

let happiness = data.map(a=> a["Happiness Score"]);
console.log(happiness);

let location = data.map(a=>[a["Latitude"], a["Longitude"]]);
console.log(location);





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


var hdiMarkers = [];
var happinessMarkers = [];
var gdpMarkers = [];



for (var i = 0; i < country.length; i++) {

  // Conditionals for countries points
  var color = "";
  if (happiness[i] > 7) {
    color = "green";
  }
  else if (happiness[i] > 6) {
    color = "#7FFF00";
  }
  else if (happiness[i] > 5) {
    color = "yellow";
  }
  else if (happiness[i] > 4) {
    color = "orange";
  }
  else if (happiness[i] > 3) {
    color = "red";
  }
  else {
    color = "darkred";
  }


  // Add circles to map
  L.circle(location[i], {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust radius
    radius: happiness[i] * 20000
  }).bindPopup("<h1>" + country[i] + "</h1> <hr> <h3>Beer Per Capita: " + beer[i] + "</h3>"+ "</h1> <hr> <h3>Wine Per Capita: " + wine[i] + "</h3>"+ "</h1> <hr> <h3>Spirits Per Capita: " + spirit[i] + "</h3>").addTo(myMap);
}






});
