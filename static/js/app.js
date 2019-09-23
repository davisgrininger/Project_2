var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;



// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "HappinessScore";

// function used for updating x-scale var upon click on axis label
function xScale(alcoholData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(alcoholData, d => d[chosenXAxis]) * 0.8,
      d3.max(alcoholData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

var chosenYAxis = "Beer_PerCapita";

// function used for updating y-scale var upon click on axis label
function yScale(alcoholData, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(alcoholData, d => d[chosenYAxis]) * 0.8,
      d3.max(alcoholData, d => d[chosenYAxis]) * 1.2
    ])
    .range([height, 0]);

  return yLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles (for x and y axes)
function renderXCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

function renderYCircles(circlesGroup, newYScale, chosenYaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip (x axes)
function updateXToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "HappinessScore") {
    var label = "Happiness Score:";
  }
  else if (chosenXAxis === "HDI") {
    var label = "HDI:";
  }
  else {
    var label = "GDP Per Capita:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.Country}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// function used for updating circles group with new tooltip (y axes)
function updateYToolTip(chosenYAxis, circlesGroup) {

  if (chosenYAxis === "Beer_PerCapita") {
    var label = "Beer per Capita";
  }
  else if (chosenYAxis === "Spirit_PerCapita") {
    var label = "Spirit Per Capita:";
  }
  else {
    var label = "Wine Per Capita:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.Country}<br>${label} ${d[chosenYAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}



// Retrieve data from the CSV file and execute everything below
d3.json("/scatterplot/data").then(function(alcoholData) {
  // if (err) throw err;
  
alcoholData.forEach(function(data) {
  data.HappinessScore = +data.HappinessScore;
  data.HDI = +data.HDI;
  data.GDP_PerCapita = +data.GDP_PerCapita;
  data.Beer_PerCapita = +data.Beer_PerCapita;
  data.Spirit_PerCapita = +data.Spirit_PerCapita;
  data.Wine_PerCapita = +data.Wine_PerCapita;
});

  console.log(alcoholData)

  // xLinearScale function above csv import
  var xLinearScale = xScale(alcoholData, chosenXAxis);

  // yLinearScale function above csv import
  var yLinearScale = yScale(alcoholData, chosenYAxis);

  // // Create y scale function
  // var yLinearScale = d3.scaleLinear()
  //   .domain([0, d3.max(hairData, d => d.num_hits)])
  //   .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .attr("transform", `translate(0, 0)`)
    .call(leftAxis);

  // chartGroup.append("g")
  //   .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(alcoholData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 13)
    .attr("fill", "pink")
    .attr("opacity", ".6");
    // .append("text").text(d => d.Abbreviation);

  // add abbreviations to circles
  chartGroup.selectAll("circle")
    .append("text")
    .text(function(d){return d.Abbreviation})

  // Create group for  3 x- axis labels
  var xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var happinessScoreLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "HappinessScore") // value to grab for event listener
    .classed("active", true)
    .text("Happiness Score");

  var HDILabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "HDI") // value to grab for event listener
    .classed("inactive", true)
    .text("HDI");

  var GDPPerCapitaLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "GDP_PerCapita") // value to grab for event listener
    .classed("inactive", true)
    .text("GDP per Capita");

  // Create group for  3 y- axis labels
  var yLabelsGroup = chartGroup.append("g")
  .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var beerPerCapitaLabel = yLabelsGroup.append("text")
    .attr("x", 350)
    .attr("y", -240)
    .attr("value", "Beer_PerCapita") // value to grab for event listener
    .classed("active", true)
    .text("Beer per Capita");

  var spiritPerCapitaLabel = yLabelsGroup.append("text")
    .attr("x", 350)
    .attr("y", -220)
    .attr("value", "Spirit_PerCapita") // value to grab for event listener
    .classed("inactive", true)
    .text("Spirit per Capita");

  var winePerCapitaLabel = yLabelsGroup.append("text")
    .attr("x", 350)
    .attr("y", -200)
    .attr("value", "Wine_PerCapita") // value to grab for event listener
    .classed("inactive", true)
    .text("Wine per Capita");

  // chartGroup.append("text")
  //   .attr("transform", "rotate(-90)")
  //   .attr("y", 0 - margin.left)
  //   .attr("x", 0 - (height / 2))
  //   .attr("dy", "1em")
  //   .classed("axis-text", true)
  //   .text("Number of Billboard 500 Hits");

  // updateToolTip function above csv import
  var circlesGroup = updateXToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  xLabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(alcoholData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderXAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateXToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "HDI") {
          HDILabel
            .classed("active", true)
            .classed("inactive", false);
          happinessScoreLabel
            .classed("active", false)
            .classed("inactive", true);
          GDPPerCapitaLabel
            .classed("active", false)
            .classed("inactive", true);
        }

        else if (chosenXAxis === "GDP_PerCapita") {
          GDPPerCapitaLabel
            .classed("active", true)
            .classed("inactive", false);
          happinessScoreLabel
            .classed("active", false)
            .classed("inactive", true);
          HDILabel
            .classed("active", false)
            .classed("inactive", true);
        }
        
        else {
          happinessScoreLabel
            .classed("active", true)
            .classed("inactive", false)
          HDILabel
            .classed("active", false)
            .classed("inactive", true)
          GDPPerCapitaLabel
            .classed("active", false)
            .classed("inactive", true)
        }

      }
    });

    // y axis labels event listener
  yLabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {

        // replaces chosenXAxis with value
        chosenYAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates y scale for new data
        yLinearScale = yScale(alcoholData, chosenYAxis);

        // updates y axis with transition
        yAxis = renderYAxes(yLinearScale, yAxis);

        // updates circles with new y values
        circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateYToolTip(chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenYAxis === "Beer_PerCapita") {
          beerPerCapitaLabel
            .classed("active", true)
            .classed("inactive", false);
          spiritPerCapitaLabel
            .classed("active", false)
            .classed("inactive", true);
          winePerCapitaLabel
            .classed("active", false)
            .classed("inactive", true);
        }

        else if (chosenYAxis === "Spirit_PerCapita") {
          spiritPerCapitaLabel
            .classed("active", true)
            .classed("inactive", false);
          beerPerCapitaLabel
            .classed("active", false)
            .classed("inactive", true);
          winePerCapitaLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        
        else {
          winePerCapitaLabel
            .classed("active", true)
            .classed("inactive", false)
          beerPerCapitaLabel
            .classed("active", false)
            .classed("inactive", true)
          spiritPerCapitaLabel
            .classed("active", false)
            .classed("inactive", true)
        }

      }
    });
});
