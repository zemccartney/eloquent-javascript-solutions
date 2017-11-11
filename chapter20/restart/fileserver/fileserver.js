"use strict";

var http = require("http"), fs = require("fs");

// what does this do?
// Creates a totally blank, empty object
// Not linked, prototypically, to Object
// the Object ..."class"? prototype? is not the same as the object data structure
// i.e. types and data structures are separate?
// Ensures no unexpectedly included items in object's iterable properties
var methods = Object.create(null);
var whitelistContent = Object.create(null);

whitelistContent["application/bolognese"] = "bolo";
whitelistContent["*/*"] = "cURL"; // What is */* accept header value?

http.createServer(function(request, response) {
  /**
  * details a response from the server
  *
  * @param code string HTTP status code, describes status of handled request
  * @param body buffer response data, result of server processing request
  * @param type string MIME type, dictates content type of response body returned to client
  */

  function respond(code, body, type) {
    // Defaults to plain text (quote unquote; thanks, Joel!)
    if (!type) type = "text/plain";
    // Adds status code and headers to response, specifically content-type header
    response.writeHead(code, {"Content-Type": type});
    // If response data and data is...readable stream???? pipe response to ..??
    // Forwards body stream to the response object writabe stream
    if (body && body.pipe)
      // no idea how this works... confused by streams, a bit
      body.pipe(response);
    else
    // If regular body?????, end the response with that data
      response.end(body);
  }

  // If the request's method exists in our methods library, use the
  // the handler we've defined for that method, passing its handler
  // a path, the respond function, and the request object
  if (request.method in methods) {

    // Copy to avoid mutating
    /*var resource = request.url;
    // request.headers.accept = from node 6.4.0 (getHeader in more recent versions)
    var mimePref = request.headers.accept;
    console.log(mimePref);
    if (mimePref.indexOf(",") !== -1) {
      mimePref = mimePref.split(",").shift();
    }

    // TODO REWRITE This is terrible; basically, fails if user requests a content-type that
    // an existing resource isn't published in
    // Resource should still be returned even if it doesn't match user's preferences
    // Try to respect user's preferences, but still do the best we can
    // In searching for files, take content prefs into consideration; if no match, fall back to general....
    if (mimePref) {
      var ext = whitelistContent[mimePref] ? whitelistContent[mimePref] : require('mime').getExtension(mimePref);
      if (ext) {
        resource += "." + ext;
      } else {
        respond(406, mimePref + " Invalid Content Type");
      }
    }*/

    methods[request.method](urlToPath(request.url),
                            respond, request);
  // If not, call respond with status code 405, a body of an error message string,
  // and no specified content type
  // Results in response with a 405 status code, content-type header with text/plain value,
  // and a body of "Method " + request.method + " not allowed." (response.end called)
  } else {
    respond(405, "Method " + request.method +
            " not allowed.");
  }
}).listen(8000);


// OLD VERSION
/*
function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  //console.log(require("url").parse(url));
  //console.log(path);
  return "." + decodeURIComponent(path);
  //console.log(cone);
  // return cone;
}
*/

// EXERCISES VERSION
function urlToPath(url) {

  var path = require("url").parse(url).pathname;
  path = decodeURIComponent(path);

  return "." + path.replace(/.+\.\./gi,"");
}

//*** GET method
// "We will set up the GET method to return a list of files when reading a directory
// and to return the file’s content when reading a regular file."
/**
* @param {string} path — path to file
* @param {function} respond - function for generating response
*/
methods.GET = function(path, respond) {
  // async call to fs.stat (gets info on a file)
  fs.stat(path, function(error, stats) {
    // ENOENT --> Error, No Entry (no directory entry)
    if (error && error.code == "ENOENT")
      // plaintext response
      respond(404, "File not found");
    // an error NOT for a non-existent file, we just call a 500
    // Architecture / code organization point: if/else branches
    // proceed from specific to general, fall through specificities, caught by generality (default)
    // ASSUMES ONLY POSSIBLE CAUSE OF THIS ERROR IS IN OUR CODE, ON THE SERVER SIDE
    else if (error)
      // plain text response
      respond(500, error.toString());
    else if (stats.isDirectory())
      // if path is a directory, read the contents of that directory, returns an array of file names
      fs.readdir(path, function(error, files) {
        if (error)
          // error.toString() is comparable to error.message in browser
          respond(500, error.toString());
        else
          respond(200, files.join("\n"));
      });
    else
      // if we're reading a regular file
      // 200 status code, body is a read stream to the path, content type is derived
      // from the file extension of the given file
      respond(200, fs.createReadStream(path),
              require("mime").getType(path));
      /*
      try {
        respond(200, fs.createReadStream(path),
                require("mime").lookup(path));
      } catch (error) {
         respond(500, error.toString());
      }*/

  });
};

/**
* @param {string} path — path to file
* @param {function} respond - function for generating response
*/
methods.DELETE = function (path, respond) {
  fs.stat(path, function (error, stats) {
    if (error && error.code == "ENOENT")
      // 204 status code means request succeeded with no change?
      respond(204);
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      fs.rmdir(path, respondErrorOrNothing(respond));
    else
      fs.unlink(path, respondErrorOrNothing(respond));
  });
};

// Wraps standard node callback, with error as first parameter,
// in a function that accepts the respond function, so we can use respond
// within the callback
// Provides the properly constructed callback
function respondErrorOrNothing(respond) {
  // From node API docs, rmdir: "No arguments other than a possible exception are given to the completion callback."
  return function (error) {
    if (error)
      respond(500, error.toString());
    else
      respond(204);
  };
}

//*** PUT method
/**
* @param {string} path — path to file
* @param {function} respond - function for generating response
* @param {object} request - Node request object
*/
// NOTE PUT can create a file when the given path refers to a non-existent
// one ONLY IF the path is in an existing directory
// PUT cannot create directories to create the specified space to which the client asked to write
methods.PUT = function(path, respond, request) {
  // creates a write stream to the file at path
  var outStream = fs.createWriteStream(path);
  outStream.on("error", function (error) {
    respond(500, error.toString());
  });
  outStream.on("finish", function() {
    respond(204);
  });
  // streams the request object (read stream) to the write stream we created
  request.pipe(outStream);
};

/*methods.MKCOL = function (path, respond, request) {

  fs.stat(path, function (error, stats) {

    if (error && error.code !== "ENOENT") {
      respond(500, error.toString());
    } else if (stats) { // Specified path refers to an existing resource
      var message = "A resource already exists at that address.";
      if (!stats.isDirectory())
        message += " Note that it is a file, not a directory";
      respond(204, message);
    } else {
      var pathElements = path.split(/\//);
      var DIR_LEVELS = pathElements.reduce(function (collector, current, currentIndex, array) {
        if (currentIndex >= 1) {
           collector.push(array.slice(0, currentIndex + 1 ).join("/"));
         }
         return collector;
      }, []);
      recursiveMkdir(DIR_LEVELS, respond);
    }
  });
};

function recursiveMkdir (dirLevels, respond) {

  fs.mkdir(dirLevels.shift(), function (error) {
    if (error) {
      respond(500, error.toString());
    } else if (dirLevels.length === 0) {
      respond(201, "Directories created");
    } else {
      recursiveMkdir(dirLevels, respond);
    }
  });
}*/

// mkdir doesn't create directories recursively
// assumes path given refers to an entirely existing path up to the last identifier, which refers to the
// name of the resource to create
methods.MKCOL = function(path, respond) {
  fs.stat(path, function(error, stats) {
    if (error && error.code == "ENOENT")
      fs.mkdir(path, respondErrorOrNothing(respond));
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      respond(204);
    else
      respond(400, "File exists");
  });
};
