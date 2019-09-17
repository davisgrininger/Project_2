
// d3.csv("/Resources/HapinessAlcoholConsumption.csv").then(function(data) {
//     console.log(data[0]);
//   });

  var file = "/Resources/HapinessAlcoholConsumption.csv"
  // D3 Function
  d3.csv(file).then(successHandle, errorHandle);
  // Use error handling function to append data and SVG objects
  // If error exist it will be only visible in console
  function errorHandle(error) {
    throw err;
  }
  // Function takes in argument statesData
  function successHandle(statesData) {
      console.log(statesData)};