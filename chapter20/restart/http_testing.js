var http = require("http");
    // request --> READABLE STREAM
var server = http.createServer(function(request, response) {
  console.log(request.method, request.url);
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Hello!</h1><p>You asked for <code>" +
                 request.url + "</code></p>");
  response.end();
});
/*server.listen(8000, function(listen) {
  console.log("Server booted up, listening on port 8000");
});*/

var request = http.request({
  hostname: "eloquentjavascript.net",
  path: "/author",
  method: "GET",
  headers: {Accept: "application/rainbows+unicorns"}
  // response --> READABLE STREAM
}, function(response) {
  console.log("Server responded with status code", response.statusCode);
  // How do you set an encoding for the received chunk?
  response.on('data', function (chunk) {
    console.log("" + chunk);
  });
});

request.end();
