var http = require("http"), fs = require("fs");
var Promise = require("promise");

// ****ME**** ensures Object prototype doesn't interfere
// Necessary, as we check if things are in methods
var methods = Object.create(null);

// Remember that promises can either fail or succeed. The `then`
// method takes two callbacks, one to handle success and one to handle
// failure. The strategy for dealing with exceptions and other failure
// is to notice them in the second callback passed here, and return a
// 500 response.
//
// On success, the promise returned by respondTo should return an
// object with a `code` property indicating the response code, and
// optional `body` and `type` properties. The body can be a stream to
// directly pipe into the response, or a string.

http.createServer(function(request, response) {
  // ****ME***** Async action of querying file system
  // Success response covers any non-500 response
  // because in all those responses, our code was able to execute fully,
  // as expected. In short, we fulfilled the request; there's no guarantee the
  // fulfillment is what the client expects, but we did it.
  respondTo(request).then(function(data) {
    // ****ME***** Content-Type defaults to text/plain (provides value when one doesn't exist / no preference given)
    console.log("here with data?", data);
    response.writeHead(data.code, {"Content-Type": data.type || "text/plain"});
    if (data.body && data.body.pipe)
      data.body.pipe(response);
    else
      response.end(data.body);
      // ****ME***** Catches any and all exceptions
      // TODO [ ] What about exceptions in the success handler?
  }, function(error) {
    response.writeHead(500);
    response.end(error.toString());
    // TODO [ ] What is error.stack?
    // ***ME*** stack trace of error object
    console.log("Response failed: ", error.stack);
  });
}).listen(8000);

// ****ME***** Represents asynchronous action of, given a request, specifically its method,
// querying the file system on our server for the requested resource, somehow acting on it,
// then somehow responding to the client
function respondTo(request) {
  // TODO [ ] Convert to hasOwnProperty version suggested by JS Lint
  if (request.method in methods)
    return methods[request.method](urlToPath(request.url), request);
  else
    // ****ME***** If the request's method doesn't exist in our methods object,
    // return a Promise resolved to an options object with the corresponding HTTP code, 405,
    // and a body containing string data
    return Promise.resolve({code: 405,
                            body: "Method " + request.method + " not allowed."});
}

//***ME**** Theoretically, we could rewrite everything to
// if (!request.method in methods)
/// methods[request.method](urlToPath(request.url), request).then()...
// What? No. We have to nest Promises
// We save ourselves from repeating lots of code for formatting our ultimate response this way..?
// For example, if we try to do away with respondTo, we'd have to repeat this code: response.writeHead(data.code, {"Content-Type": data.type || "text/plain"});
// For both 405 and non-405 responses
// Nest Promises by commonality of handlers
// All requests share the same top level error and success handlers
//  All methods have different internal handlers, so we have to dynamically route (nest) to those in respondTo
// Promise nesting is basically asking: How do I need to handle and potentially transform
// the result of this operation? When you encounter differences, you have to branch / nest
// With the ideal being that you arrive, like we do here, at a single shared pair of resolution handlers (in createServer)


// Kept as-is, but adds the solution to the 2nd exercise!!!!!
function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  var decoded = decodeURIComponent(path);
  return "." + decoded.replace(/(\/|\\)\.\.(\/|\\|$)/g, "/");
}

// Wrap the fs functions that we need with Promise.denodeify, so that
// they return promises instead of directly taking a callback and
// passing it an error argument.

// ****ME**** AHA!!! Creating a namespace on the fly
var fsp = {};
["stat", "readdir", "rmdir", "unlink", "mkdir"].forEach(function(method) {
  fsp[method] = Promise.denodeify(fs[method]);
});

// Since several functions need to call `fsp.stat` and handle failures
// that indicate non-existent files in a special way, this is a
// convenience wrapper that converts file-not-found failures into
// success with a null value.
//
// Remember that calling the `then` method returns *another* promise,
// and that having a failure handler return normally replaces the
// failure with a success (using the returned value). We're passing null
// for the success handler here (letting through normall successes
// unchanged), and changing one kind of failure into success.

function inspectPath(path) {
  // ***ME*** What happens if fsp.stat succeeds here?
  // I _believe_ it just passes through?
  return fsp.stat(path).then(null, function(error) {
    if (error.code == "ENOENT") return null;
    else throw error;
  });
}

// We can get by with much less explicit error handling, now that
// failures automatically propagate back.
//***ME*** By this he means that any errors thrown e.g. in inspectPath will
// propagate to the current Promise, any subsequent thens, being handled
// by an error handler when provided

//The new promise returned by
// `then`, as returned from this function, will use one of the values
// returned here (objects with `code` properties) as its value. When a
// handler passed to `then` returns another promise (as in the case
// when the path refers to a directory), that promise will be
// connected to the promise returned by `then`, determining when and how
// it is resolved.

methods.GET = function(path) {
  //****ME** then success handler here catches any success values (null or otherwise)
  // from inspectPath
  return inspectPath(path).then(function(stats) {
    if (!stats) // Does not exist
      return {code: 404, body: "File not found"};
    else if (stats.isDirectory())
      // ***ME*** a new Promise that determines the ultimate value of the enclosing
      // then's Promise
      // We don't explicitly handle errors here, e.g. if (error) respond(500, error.toString());
      // because such errors propagate to the top-level handler — passed to
      // the then attached to respondTo — which handles them in the same way
      return fsp.readdir(path).then(function(files) {
        return {code: 200, body: files.join("\n")};
      });
    else
      return {code: 200,
              type: require("mime").lookup(path),
              body: fs.createReadStream(path)};
  });
};

var noContent = {code: 204};
//***ME*** This exists so we can reply with the object representing no content
// via a success handler passed to a then()
function returnNoContent() { return noContent; }

// Though failure is propagated automatically, we still have to
// arrange for `noContent` to be returned when an action finishes,
// which is the role of `returnNoContent` success handler.

methods.DELETE = function(path) {
  return inspectPath(path).then(function(stats) {
    if (!stats)
      return noContent;
    else if (stats.isDirectory())
      return fsp.rmdir(path).then(returnNoContent);
    else
      return fsp.unlink(path).then(returnNoContent);
  });
};

// To wrap a stream, we have to define our own promise, since
// Promise.denodeify can only wrap simple functions.

methods.PUT = function(path, request) {
  return new Promise(function(success, failure) {
    var outStream = fs.createWriteStream(path);
    outStream.on("error", failure);
    // ****ME*** How is bind used?
    // On success, bound function called with this set to null and noContent as
    // the first argument
    // Switching to success(noContent) results in no data ending up
    // on the file at path...why?
    // BEST GUESS: success(noContent), because we're registering this as an event
    // handler i.e. synchronously, is called immediately because we're registering
    // an invoked function. So, this immediately resolves the Promise, calling
    // the success handler with noContent
    // Instead, we turn the success handler into a bound function that always takes noContent as its first argument
    outStream.on("finish", success.bind(null, noContent));
    //**ME** we pipe data from the request to the readstream to the specified path we created
    //when this piping finishes or errors, one of the above event handlers is called
    request.pipe(outStream);
  });
};

methods.MKCOL = function(path, request) {
  return inspectPath(path).then(function(stats) {
    if (!stats)
      return fsp.mkdir(path).then(returnNoContent);
    if (stats.isDirectory())
      return noContent;
    else
      return {code: 400, body: "File exists"};
  });
};
