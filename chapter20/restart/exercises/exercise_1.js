TITLE: Content negotiation, again

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

var http = require("http");
// Server replies to "brown" with 406 — Not Acceptable
var mime_types = ["text/plain", "application/json", "text/html", "application/rainbows+unicorns", "brown"];

function negotiatingRequest (acceptHeader) {

  http.request({
    hostname: "eloquentjavascript.net",
    path: "/author",
    method: "GET",
    headers: {"Accept": acceptHeader}
  }, function (incomingMessage) {
    console.log("///RESPONSE START///", incomingMessage.statusCode, incomingMessage.status);
    console.log(incomingMessage.headers['content-type']);
    incomingMessage.on("data", function (chunk) {
      process.stdout.write(chunk.toString());
    });
  }).end();

}

mime_types.forEach(function(mime) {
  negotiatingRequest(mime);
});



RESULTS
- note: headers object should follow typical object property naming i.e. no quotes, just Accept
- an alternative to calling toString on a buffer is concatenating it with a string, implicit coercion
    - thoughts on which is preferable? toString more explicit, not abstract, but leads to underlying understanding
    - concatenation is abstract, easier, but sneakily conflates buffers and strings
    - Tradeoff!
- you did not write any error handling code; what if the incoming message status code is not 200?
Or rather, not in the 200 range, signifying that the request did not work as expected?
Up to you to decide how to work with errors, interpretive work, YOU NEED TO TAKE THE TIME AND THOUGHT
TO SPECIFY WHAT YOU THINK IS SENSIBLE
    -- TWO SOURCES OF ERRORS?

- response.status is not a property; statusMessage is
- Book wrote this function, used in place of incomingMessage.on()
      function readStreamAsString(stream, callback) {
        var content = "";
        stream.on("data", function(chunk) {
          content += chunk;
        });
        stream.on("end", function() {
          callback(null, content);
        });
        stream.on("error", function(error) {
          callback(error);
        });
      }
      Takes response readable stream, registers event listeners, builds the content response,
      throwing an error if received
        What would this error be? A response can succeed — 200 error — but its stream can fail?

        NO idea what the error would be, but this approach is critically better than yours
        in that it ensures that the entire body of a stream has been received before writing
        it, thus ensuring that blocks of content are kept together, not broken up by interleaved writing
        You did not encounter this issue, likely because the content received was so small
        that there was a 1-to-1 correspondence between data and end events of each stream.
        For larger pieces of content, i.e. for production applications, this is likely
        unrealistic.

        TO improve:

        var content = "";
        incomingMessage.on("data", function (chunk) {
          content += chunk;
        });
        incomingMessage.on("end", function () {
          console.log("///RESPONSE START///", incomingMessage.statusCode, incomingMessage.status);
          console.log(incomingMessage.headers['content-type']);
          console.log(content);
        });

- same basic structure as book, but your work showed that you do not totally understand
how streams work yet, that you need to be careful about waiting for them to end
before working with them. Moreover, you need to handle errors please; the language is not
going to do it for you

EXPERIMENTATION



// PREPARE

// In Chapter 17, the first exercise was to make several requests to eloquentjavascript.net/author,
// asking for different types of content by passing different Accept headers.
//
// Do this again, using Node’s http.request function. Ask for at least the media
// types text/plain, text/html, and application/json. Remember that headers to a
// request can be given as an object, in the headers property of http.request’s first argument.
//
// Write out the content of the responses to each request.


// PLAN

// How do I ask for a particular content-type?
// How do I write out the content of each response?
// How would I make a series of http requests?

// PERFORM

var http = require("http");
// Server replies to "brown" with 406 — Not Acceptable
var mime_types = ["text/plain", "application/json", "text/html", "application/rainbows+unicorns", "brown"];

function negotiatingRequest (acceptHeader) {

  http.request({
    hostname: "eloquentjavascript.net",
    path: "/author",
    method: "GET",
    headers: {"Accept": acceptHeader}
  }, function (incomingMessage) {
    console.log("///RESPONSE START///", incomingMessage.statusCode, incomingMessage.status);
    console.log(incomingMessage.headers['content-type']);
    incomingMessage.on("data", function (chunk) {
      process.stdout.write(chunk.toString());
    });
  }).end();

}

mime_types.forEach(function(mime) {
  negotiatingRequest(mime);
});

// PERFECT
