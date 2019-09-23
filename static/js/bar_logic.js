
// Load Data File
d3.json("/api/data").then(function(data){
  console.log(data);

var top_10 = data.sort(function(d){
    return d3.descending(d.HDI);
}).slice(0,10)

console.log(top_10);

let result = top_10.map(a => a.HDI);
console.log(result);



let country = top_10.map(a => a.Country);
console.log(country);



let beer = top_10.map(a=> a["Beer per Capita"]);
console.log(beer);


let spirit = top_10.map(a => a["Spirits per Capita"]);
console.log(spirit);

let wine = top_10.map(a=> a["Wine per capita"]);
console.log(wine);


var data_clean = [
    {Country: "Demark", Beerper_Capita: 224, Spiritper_Capita: 81, Wineper_Capita: 278},
    {Country: "Switzerland", Beerper_Capita: 185, Spiritper_Capita: 100, Wineper_Capita: 280},
    {Country: "Iceland", Beerper_Capita: 223, Spiritper_Capita: 61, Wineper_Capita: 78},
    {Country: "Norway", Beerper_Capita: 169, Spiritper_Capita: 71, Wineper_Capita: 129},
    {Country: "Finland", Beerper_Capita: 263,Spiritper_Capita: 133, Wineper_Capita: 97},
    {Country: "Canada", Beerper_Capita: 240,Spiritper_Capita: 122, Wineper_Capita: 100},
    {Country: "Netherlands", Beerper_Capita: 251,Spiritper_Capita: 88, Wineper_Capita: 190},
    {Country: "New Zealand", Beerper_Capita: 203,Spiritper_Capita: 79, Wineper_Capita: 175},
    {Country: "Australia", Beerper_Capita: 261,Spiritper_Capita: 72, Wineper_Capita: 212},
    {Country: "Sweden", Beerper_Capita: 152,Spiritper_Capita: 60, Wineper_Capita: 186}
];


var beer_trace =
    {
    x: ["Denmark", "Switzerland", "Iceland", "Norway", "Finland", "Canada", "Netherlands", "New Zealand", "Australia", "Sweden"],
    y: [224, 185, 233, 169, 263, 240, 251, 203, 261, 152],
    name: "Beer",
    marker: {color: 'steelblue'},
    type: "bar"
};

var spirit_trace =
    {
    x: ["Denmark", "Switzerland", "Iceland", "Norway", "Finland", "Canada", "Netherlands", "New Zealand", "Australia", "Sweden"],
    y: [81, 100, 61, 71, 133, 122, 88, 79, 72, 60],
    name: "Spirit/Liquor",
    marker: {color: 'lightgreen'},
    type: "bar"
};


var wine_trace =
    {
    x: ["Denmark", "Switzerland", "Iceland", "Norway", "Finland", "Canada", "Netherlands", "New Zealand", "Australia", "Sweden"],
    y: [278, 280, 78, 129, 97, 100, 190, 175, 212, 186],
    name: "Wine",
    marker: {color: 'lightcoral'},
    type: "bar"
};

var data = [beer_trace, spirit_trace, wine_trace];

var layout = {
    title: {
        text:"Alcohol Consumption by Type in the Ten 'Happiest' Countries",
        font: {
      family: 'Arial',
      size: 22
  }},
    xaxis: {
        title: {
            text: "Top Ten 'Happiest' Countries (Ranked by Human Development Index)",
        font: {
      family: 'Oswald',
      size: 18,
  }},
        tickfont: {
            family: 'Oswald',
            size: 15,
            color: 'rbg(107,107,107)'
  },


},
    yaxis: {
        title: {
            text:"Alcohol Consumption Per Capita (in Liters)",
        font: {
      family: 'Oswald',
      size: 18,

  }},
        titlefont: {
            family: 'Oswald',
            size: 15,
            color: 'rbg(107,107,107)'
        }
},
 barmode: "stack",

legend: {
    font: {
        family: 'Oswald',
        size: 14,
        color: 'black'
    },
    bgcolor: "lightgray",
    bordercolor: "white",
    borderwidth: 2

}

};
Plotly.newPlot("bar", data, layout);

});
