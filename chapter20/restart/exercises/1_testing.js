var http = require("http");
// Server replies to "brown" with 406 — Not Acceptable
var mime_types = ["text/plain", "application/json", "text/html", "application/rainbows+unicorns", "brown"];

function negotiatingRequest (acceptHeader) {

  http.request({
    hostname: "eloquentjavascript.net",
    path: "/author",
    method: "GET",
    headers: {Accept: acceptHeader}
  }, function (incomingMessage) {
    var content = "";
    incomingMessage.on("data", function (chunk) {
      content += chunk;
    });
    incomingMessage.on("end", function () {
      console.log("///RESPONSE START///", incomingMessage.statusCode, incomingMessage.statusMessage);
      console.log(incomingMessage.headers['content-type']);
      console.log(content);
    });
  }).end();

}

mime_types.forEach(function(mime) {
  negotiatingRequest(mime);
});
