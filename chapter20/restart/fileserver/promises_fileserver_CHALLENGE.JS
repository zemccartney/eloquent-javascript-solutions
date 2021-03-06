// REWROTE THE SERVER MYSELF PRIOR TO LOOKING AT BOOK'S WORK
"use strict";

var http = require("http"), fs = require("fs"), Promise = require("promise");

// promises catch exceptions raised by callback functions and propagate them as failures.

var methods = Object.create(null);

// denodeified functions
// TODO [ ] could you also assign the promisified versions of these as new properties to the fs
// namespace? Or overwrite the existing ones (seems SUPER inadvisable)?
// Book's strategy: create a new object to store these properties, so
// creating a whole new namespace for this particular class of functionality
var fsStat = Promise.denodeify(fs.stat);
var fsReadDir = Promise.denodeify(fs.readdir);
var fsRmDir = Promise.denodeify(fs.rmdir);
var fsUnlink = Promise.denodeify(fs.unlink);

// To the above TODO, Yes, you can do that. You're just overwriting a plain old object
// could !== should
/*
console.log(fs.stat.toString());
fs.stat = fsStat;
console.log(fs.stat.toString());
*/

// Passing a non-function value to then is totally allowable? Just does nothing?
var tuChains = fsStat("file.json").then({code: 204}, function(error) {
  if (error.code == "ENOENT") {
    // sends this to the subsequent then's success handler
    // What if no subsequent handler?....nothing? promise resolves
    // Try logging the Promise
    return error;
  } else {
    throw error;
  }
}).then(function(stats) {
  console.log(stats);
  console.log("I expect stats here: " + stats.blocks);
  console.log("RIGHT?");
});

// for each method we want to denodeify
// denodeify that method
// add it to our new namespace

http.createServer(function (request, response) {

  // Async action of querying file system
  // Success response covers any non-500 response
  // because in all those responses, our code was able to execute fully,
  // as expected. In short, we fulfilled the request; there's no guarantee the
  // fulfillment is what the client expects, but we did it.
  /*respondTo(request).then(function(result) {

  }, function (error) {

  });*/
    function respond(code, body, type) {
        if (!type) {
            type = "text/plain";
        }

        response.writeHead(code, {"Content-Type": type});

        if (body && body.pipe) {
            body.pipe(response);
        } else {
            console.log(response);
            response.end(body);
        }
    }

    // if (methods.hasOwnProperty(request.method))
    if (request.method in methods) {
        console.log(request.method);
        methods[request.method](urlToPath(request.url), respond, request);
    } else {
        respond(405, "Method " + request.method + " not allowed.");
    }

}).listen(8000);

function urlToPath(url) {
    var path = require("url").parse(url).pathname;
    return "." + decodeURIComponent(path);
}

methods.GET = function (path, respond) {
    fsStat(path).then(function (stats) {
        if (stats.isDirectory()) {
          // would you then this right here?
          // ASSERT yes, because placing then after this initial action
          // would use result of else branch of this if statement, which wouldn't make sense?
          // In this case, we return a promise to the promise generated by then,
          // which waits on this promise to fulfill, then fulfills with the inner promise's result
            return fsReadDir(path).then(function (files) {
                return respond(200, files.join("\n"));
            });
        } else {
            // do you return this? I don't think so?
            // ASSERT: No, because this action influences outside of promises
            // i.e. calls back to main thread of control i.e. we're done w/ async sequence
            return respond(200, fs.createReadStream(path), require("mime").getType(path));
        }
    }).catch(function (error) {
        if (error.code === "ENOENT") {
            return respond(404, "File not found");
        } else {
            return respond(500, error.toString());
        }
    });
};

methods.DELETE = function (path, respond) {
    fsStat(path).then(function (stats) {
        if (stats.isDirectory()) {
            return fsRmDir(path).then(function () {
                return respond(204);
            });
        } else {
            return fsUnlink(path).then(function () {
                return respond(204);
            });
        }
    }).catch(function (error) {
        if (error && error.code === "ENOENT") {
            return respond(204);
        } else {
            return respond(500, error.toString());
        }
    });
};

methods.PUT = function (path, respond, request) {
    var outStream = fs.createWriteStream(path);
    outStream.on("error", function (error) {
        respond(500, error.toString());
    });
    outStream.on("finish", function () {
        console.log("got here!");
        respond(204);
    });
    request.pipe(outStream);
};
