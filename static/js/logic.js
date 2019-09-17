
// d3.json('/api/data' , function(data) {
//   console.log(data.features);

// });
 
d3.json("/api/data").then(function(data) {
  console.log(data);
});