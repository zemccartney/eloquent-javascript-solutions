TITLE: Respond to rainbows+unicorns

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

var whitelistContent = Object.create(null);
whitelistContent["application/bolognese"] = "bolo";

// Rewrote part of createServer callback
if (request.method in methods) {

  // Copy to avoid mutating
  var resource = request.url;
  // request.headers.accept = from node 6.4.0
  var mimePref = request.headers.accept;
  // Doesn't really handle prioritized list of content-types in standard format e.g. ;q={priority}
  if (mimePref.indexOf(",") !== -1) {
    mimePref = mimePref.split(",").shift();
  }
  if (mimePref) {
    var ext = whitelistContent[mimePref] ? whitelistContent[mimePref] : require('mime').getExtension(mimePref);
    if (ext) {
      resource += "." + ext;
    } else {
      respond(406, mimePref + " Invalid Content Type");
    }
  }
  methods[request.method](urlToPath(resource),
                          respond, request);
// If not, call respond with status code 405, a body of an error message string,
// and no specified content type
// Results in response with a 405 status code, content-type header with text/plain value,
// and a body of "Method " + request.method + " not allowed." (response.end called)
} else {
  respond(405, "Method " + request.method +
          " not allowed.");
}

RESULTS

EXPERIMENTATION



// PREPARE

// Add the content-negotiated responses to /author to the promises fileserver
// Test:
// /author
// What happens when search is ambiguous? TRY IT OUT CURRENTLY
// guessing i'll create multiple formats of the same content

// PLAN

// Test: What happens if you create a resource with the same name in multiple formats?
// Which does the server return?
// Why?

// PERFORM


// PERFECT
