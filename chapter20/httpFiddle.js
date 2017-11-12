var http = require('http');

var server = http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>Hello World!</h1><p>You asked for <code>" + request.url + "</code></p>");
    // response.write("<code>" + Object.keys(request) + "</code>");
    response.write("<code>" + request.httpVersionMajor + request.httpVersionMinor + "</code>");
    response.end(function(data){
        console.log("hi!");
    });
});

server.listen(8000);