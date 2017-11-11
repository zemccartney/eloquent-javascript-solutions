var http = require("http");
var request = http.request({
  hostname: "localhost",
  port: "8000",
  path: "/",
  method: "GET",
  headers: {Accept: "text/html"}
}, function(response) {
    // when the response stream receives data, log the data
    response.on('end', function (data) {
        console.log(data.toString());
        console.log("blunts");
    })
  console.log("Server responded with status code",
              response.statusCode);
});
request.end();