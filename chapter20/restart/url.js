// Just an object
// Constructed by reading a file, assigning various functionality to names (properties) on that object
var url = require("url");
console.log(url);


var requestURL = "http://www.example.org:4433/../../path/to/mkl?w=1&m=raw-ass#weiners";
var components = url.parse(requestURL);

console.log(components);
