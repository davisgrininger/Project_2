
// Set dimension of the graph
var svgWidth = 900;
var svgHeight = 600;


// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 70,
  left: 80
};

//Define dimensionks of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;

var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#bar")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
                .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");


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

//Set X Scale
var xScale = d3.scaleBand()
    .domain(data_clean.map(d => d.Country))
    .range([0, chartWidth])
    .padding(0.4);


//Set Y Scale

var yScale = d3.scaleLinear()
    .domain([0,400])
    .range([chartHeight, 0]);



//Create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

chartGroup.append("g")
.attr("class", "y axis")
.call(yAxis);

chartGroup.append("text")      // text label for the y axis
.attr('x', -250)
.attr('y', -35)
.attr('transform', 'rotate(-90)')
.attr('text-anchor', 'middle')
.text('Alcohol Consumed Per Capita (in Liters)')

chartGroup.append("text") // text label for the x axis
        .attr("x", 400)
        .attr("y", 550)
        .style("text-anchor", "middle")
        .style("font", "50px")
        .text("Top 10 'Happiest' Countries (Ranked by Human Development Index)");

chartGroup.append('g')
.attr("class", "x axis")
.attr("transform", "translate(0, "+ chartHeight + ")")
.call(xAxis);


//Bars

// Wine Per Capita Chart

chartGroup.selectAll("mywine")
.data(data_clean)
.enter()
.append("rect")
.attr("x", function(d){return xScale(d.Country);})
.attr("y", function(d){return yScale(d.Wineper_Capita);})
.attr("width", xScale.bandwidth())
.attr("height", function(d){return chartHeight - yScale(d.Wineper_Capita);})
.attr("fill", "#830e3c")
.attr("opacity", "0.75")


chartGroup.selectAll("mybeer")
.data(data_clean)
.enter()
.append("rect")
.attr("x", function(d){return xScale(d.Country);})
.attr("y", function(d){return yScale(d.Beerper_Capita);})
.attr("width", xScale.bandwidth())
.attr("height", function(d){return chartHeight - yScale(d.Beerper_Capita);})
.attr("fill", "#aa1414")
.attr("opacity", "0.50")

//
// Spirit Per Capita Chart

chartGroup.selectAll("myspirit")
.data(data_clean)
.enter()
.append("rect")
.attr("x", function(d){return xScale(d.Country);})
.attr("y", function(d){return yScale(d.Spiritper_Capita);})
.attr("width", xScale.bandwidth())
.attr("height", function(d){return chartHeight - yScale(d.Spiritper_Capita);})
.attr("fill", "#0066ff")
//


// var legend = chartGroup.append('g')
// .attr("class", "legend")
// .attr("transform", "translate(50,30)")
// .style("font-size", "12 px")
// .call(d3.legend);

});
