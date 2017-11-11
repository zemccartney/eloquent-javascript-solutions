var http = require("http");

var request = http.request({
  hostname: "localhost",
  port: 8000,
  // careful with the path
  path: "/../directory_traversal.js",
  method: "GET",
  headers: {Accept: "application/javascript"}
}, function(response) {
  console.log("connected");
  response.on("data", function(chunk) {
    console.log(chunk.toString());
  });
  console.log("Server responded with status code",
              response.statusCode);
});
request.end();

// https://www.owasp.org/index.php/Path_Traversal
// use URL-encoding to mask file-system traversal path components (what's the word?)
