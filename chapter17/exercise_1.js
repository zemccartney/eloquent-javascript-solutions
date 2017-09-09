TITLE: Content Negotiation

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

var mediaTypes = ["text/plain", "text/html", "application/json", "application/rainbows+unicorns"];

function requestByMedium (mediaType, index, array) {
  var request = new XMLHttpRequest();
  request.open("GET", "author", true);
  request.setRequestHeader("Accept", mediaType);
  request.addEventListener("load", function(){
    console.log(request.getResponseHeader("Content-Type").toUpperCase() + "\n", request.responseText + "\n");
  });
  request.send(null);
}

mediaTypes.forEach(requestByMedium);

Interesting(?) observation?
- rainbows/unicorns media type is text/plain
- load order: 1.) text/plain 2.) text/html 3.) app/rainbows+unicorns 4.) app/json
    - JSON loads slower than plaintext or html?

RESULTS

- Doi! Book did this synchronously
- Did not feel like error handling, apparently????
    - Added
- On first submission, you had index and array as arguments to requestByMedium...what? why?
    - probably trying to do something with index in the printed output
    - you can accomplish by wrapping requestByMedium in forEach function parameter, supplying
    that function the arguments it expects
- Next step would be to Promisify it!
- Synchronous code makes error handling so much easier, just wrap in a try block,
catch any errors that fire up
- Realized, I configured request with a relative path, which should have resulted
in a request to /code/#17.1/author, but it did not, worked as expected
    - WHY?
    - Lesson: err on the safe side and request from absolute paths
/////////

// With Error handling
var mediaTypes = ["text/plain", "text/html", "dicks", "application/json", "application/rainbows+unicorns"];

function requestByMedium (mediaType, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", "author", true);
  request.setRequestHeader("Accept", mediaType);
  request.addEventListener("load", function(){
    if (request.status < 400) {
      callback(request);
    } else {
      callback(null, new Error("MEDIA TYPE REQUEST FOR " + mediaType + " FAILED: " + request.status + " " + request.statusText));
    }
  });
  request.send(null);
}


mediaTypes.forEach(function(mime){
  requestByMedium(mime, function(request, error){
    if (error != null)
      console.log("Failure: " + error.message);

     if (request)
       console.log(request.getResponseHeader("Content-Type").toUpperCase() + "\n", request.responseText + "\n");
  });
});

EXPERIMENTATION



// PREPARE
/*
when a server knows of various ways to encode a resource, it can look at this
header and send the one that the client prefers.

The URL eloquentjavascript.net/author is configured to respond with either plaintext,
HTML, or JSON, depending on what the client asks for. These formats are identified by
 the standardized media types text/plain, text/html, and application/json.

Send requests to fetch all three formats of this resource. Use the setRequestHeader
method of your XMLHttpRequest object to set the header named Accept to one of
the media types given earlier. Make sure you set the header after calling open
but before calling send.
*/


// PLAN
- [X] What happens if you set the Accept header before calling open?
You get this error
//InvalidStateError: Failed to execute 'setRequestHeader' on 'XMLHttpRequest':
// The object's state must be OPENED. (line 3)

- [] What happens if you set the Accept header after send?
    - Synchronous vs. asynchronous?

- [X] author vs. /author
In this case, both result in the same request because we are requesting from
http://eloquentjavascript.net/17_http.html
So, for author, author replaces the current relative path, everything after the last /
For /author, it replaces everything after the server name (the PATH), which in this case happens to be
the same string

- [] How do you configure a page to respond to different content types / to respond to the
Accept header?

- [] to enable a server to serve static files (js, css), do you just enable it to respond
to requests with the standard media types corresponding to those files?
   - why does a server not enabled so still successfully server css when inline or style tag?

- [] How did he configure /author? All requests, REGARDLESS OF FILE EXTENSION, return
the plain text representation. Why? Even though Accept header defaults to "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
Has a server-side algorithm that serves a representation only
if single Accept value given?
NO, seems like it has the following priority:
1. text
2. json
3. html
4. rainbows+unicorns

// PERFORM

var request = new XMLHttpRequest();
request.open("GET", "author", true);
request.setRequestHeader("Accept", "text/html, text/plain;q=0.9,q=0.5");
request.addEventListener("load", function(){
  console.log(request.response);
});
request.send(null);

function requestByMedium (mediaType) {
  var request = new XMLHttpRequest();
  request.open("GET", "author", true);
  request.setRequestHeader("Accept", mediaType);
  request.addEventListener("load", function(){
    console.log(request.responseText);
  });
  request.send(null);
}

var mediaTypes = ["text/plain", "text/html", "application/json", "application/rainbows+unicorns"];

// What happens on requesting with an Accept header of application/rainbows+unicorns?
Displays a totally different document with ASCII art...HOW?????

// PERFECT
