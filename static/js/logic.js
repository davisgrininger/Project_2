

// d3.json("/api/data").then(function(data) {
//   console.log(data);


// let beer = data.map(a=> a["Beer per Capita"]);
// console.log(beer);

// let country = data.map(a => a.Country);
// console.log(country);

// let spirit = data.map(a => a["Spirits per Capita"]);
// console.log(spirit);

// let wine = data.map(a=> a["Wine per capita"]);
// console.log(wine);

// let hdi = data.map(a=> a["HDI"]);
// console.log(hdi);

// let gdp = data.map(a=> a["GDP per Capita"]);
// console.log(gdp);

// let happiness = data.map(a=> a["Happiness Score"]);
// console.log(happiness);

// let location = data.map(a=>[a["Latitude"], a["Longitude"]]);
// console.log(location);





// var myMap = L.map("map", {
//   center: [15.5994, -28.6731],
//   zoom: 3
// });

// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.dark",
//   accessToken: 'pk.eyJ1IjoiZGdyaW5pbmdlciIsImEiOiJjazA2MWQ0b24wNTg0M2NvNW5mYjA5NGpiIn0.kd9GdHZwWCGU2EbZOBAoEQ'
// }).addTo(myMap);

// for (var i = 0; i < country.length; i++) {

//   // Conditionals for countries points
//   var color = "";
//   if (happiness[i] > 7) {
//     color = "green";
//   }
//   else if (happiness[i] > 6) {
//     color = "#7FFF00";
//   }
//   else if (happiness[i] > 5) {
//     color = "yellow";
//   }
//   else if (happiness[i] > 4) {
//     color = "orange";
//   }
//   else if (happiness[i] > 3) {
//     color = "red";
//   }
//   else {
//     color = "darkred";
//   }


//   // Add circles to map
//   L.circle(location[i], {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: color,
//     // Adjust radius
//     radius: happiness[i] * 20000
//   }).bindPopup("<h1>" + country[i] + "</h1> <hr> <h3>Beer Per Capita: " + beer[i] + "</h3>"+ "</h1> <hr> <h3>Wine Per Capita: " + wine[i] + "</h3>"+ "</h1> <hr> <h3>Spirits Per Capita: " + spirit[i] + "</h3>").addTo(myMap);
// }

// });


///////////////


 

d3.json("/api/data").then(function(data) {
  console.log(data);

let beer = data.map(a=> a["Beer per Capita"]);
//console.log(beer);

let country = data.map(a => a.Country);
//console.log(country);

let spirit = data.map(a => a["Spirits per Capita"]);
//console.log(spirit);

let wine = data.map(a=> a["Wine per capita"]);
//console.log(wine);

let hdi = data.map(a=> a["HDI"]);
//console.log(hdi);

let gdp = data.map(a=> a["GDP per Capita"] <= 110 ? a["GDP per Capita"] : 5);

//console.log(gdp);

let happiness = data.map(a=> a["Happiness Score"]);
//console.log(happiness);

let location = data.map(a=>[a["Latitude"], a["Longitude"]]);
console.log(location);

  var hdiMarkers = [];
  var happinessMarkers = [];
  var gdpMarkers =[];




// var myMap = L.map("map", {
//   center: [15.5994, -28.6731],
//   zoom: 3
// });



//for (var i = 0; i < country.length; i++) {

  // Conditionals for countries points
  
  ////////////
  for (var i = 0; i < location.length; i++) {
    //var color = "orange";
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
      };
    var hdicolor = "";
      if (hdi[i] > 851) {
        hdicolor = "green";
      }
      else if (hdi[i] > 751) {
        hdicolor = "#7FFF00";
      }
      else if (hdi[i] > 651) {
        hdicolor = "yellow";
      }
      else if (hdi[i] > 551) {
        hdicolor = "orange";
      }
      else if (hdi[i] > 451) {
        hdicolor = "red";
      }
      else {
        hdicolor = "darkred";
      };

      var gdpcolor = "";
      if (gdp[i] > 100) {
        gdpcolor = "green";
      }
      else if (gdp[i] > 50) {
        gdpcolor = "#7FFF00";
      }
      else if (gdp[i] > 25) {
        gdpcolor = "yellow";
      }
      else if (gdp[i] > 12.5) {
        gdpcolor = "orange";
      }
      else if (gdp[i] > 6.25) {
        gdpcolor = "red";
      }
      else {
        gdpcolor = "darkred";
      };


   
    // Setting the marker radius for the state by passing population into the markerSize function
    happinessMarkers.push(
      L.circle(location[i], {
        stroke: false,
        fillOpacity: 0.85,
        color: color,
        fillColor: color,
        radius: happiness[i]*20000
      }).bindPopup("<h1>" + country[i] + "</h1> <hr> <h3>Beer Per Capita: " + beer[i] + "</h3>"+ "</h1> <hr> <h3>Wine Per Capita: " + wine[i] + "</h3>"+ "</h1> <hr> <h3>Spirits Per Capita: " + spirit[i] + "</h3>")
    );

    gdpMarkers.push(
      L.circle(location[i], {
        stroke: false,
        fillOpacity: 0.85,
        color: gdpcolor,
        fillColor: gdpcolor,
        radius: (gdp[i] * 200000)/88
      }).bindPopup("<h1>" + country[i] + "</h1> <hr> <h3>Beer Per Capita: " + beer[i] + "</h3>"+ "</h1> <hr> <h3>Wine Per Capita: " + wine[i] + "</h3>"+ "</h1> <hr> <h3>Spirits Per Capita: " + spirit[i] + "</h3>")
    );
  
    hdiMarkers.push(
      L.circle(location[i], {
        stroke: false,
        fillOpacity: 0.85,
        color: hdicolor,
        fillColor: hdicolor,
        radius: (hdi[i] * 20000)/124
      }).bindPopup("<h1>" + country[i] + "</h1> <hr> <h3>Beer Per Capita: " + beer[i] + "</h3>"+ "</h1> <hr> <h3>Wine Per Capita: " + wine[i] + "</h3>"+ "</h1> <hr> <h3>Spirits Per Capita: " + spirit[i] + "</h3>")
    );
  }
  ///////////


  var happiness_marker = L.layerGroup(happinessMarkers);
  var hdi_marker = L.layerGroup(hdiMarkers);
  var gdp_markers = L.layerGroup(gdpMarkers);

  var overlayMaps = {
    "Happiness": happiness_marker,
    "Human Development Index": hdi_marker,
    "GDP Per Capita": gdp_markers
  };

  var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3,
    layers: [happiness_marker]
  });

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: 'pk.eyJ1IjoiZGdyaW5pbmdlciIsImEiOiJjazA2MWQ0b24wNTg0M2NvNW5mYjA5NGpiIn0.kd9GdHZwWCGU2EbZOBAoEQ'
    }).addTo(myMap);
  
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(overlayMaps).addTo(myMap);
  
  



  // Add circles to map
//   L.circle(location[i], {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: color,
//     // Adjust radius
//     radius: happiness[i] * 20000
//   }).bindPopup("<h1>" + country[i] + "</h1> <hr> <h3>Beer Per Capita: " + beer[i] + "</h3>"+ "</h1> <hr> <h3>Wine Per Capita: " + wine[i] + "</h3>"+ "</h1> <hr> <h3>Spirits Per Capita: " + spirit[i] + "</h3>").addTo(myMap);
 }

);
