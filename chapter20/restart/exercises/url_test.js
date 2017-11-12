/*function urlToPath(url) {
  // No idea why, but it appears that parsing a URL also encodes, even RE-encodes it
  // i.e. decodeURIComponent is undone by url.parse
  // Why should decoding happen AFTER parsing?
  var path = require("url").parse(url).pathname;
  path = decodeURIComponent(path);
  // SHIT!! Didn't account for this till I read the hints
  // Decoding happens AFTER parsing, i.e. encoded directory traversal characters could still
  // pass through
  return "." + path.replace(/.+\.\./,"");
}

var encoded = "/config%2F..";

// Does pathname include the leading slash?
// @ANSWER: YES
var path = require("url").parse("http://myhostname:8000/../.config/config/google-chrome/Default/Web%20Data").pathname;
//console.log(path);

var EARL = [
  "/../.config/config/../google-chrome/../Default/Web%20Data/..",
  "/../.ssh/id_dsa",
  "\\..\\..\\..\\etc\\passwd",
  "/config%2F%2E%2E",
  "/%20%20path"
];

var safe = EARL.map(urlToPath);

console.log(safe);

safe.forEach(function(url){
  if (url.indexOf("..") !== -1) {
    throw new Error("The given path — " + url + " — still allows directory traversal attacks");
  }
});

console.log("Scanned paths are all clean of directory traversal attacks");*/


function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  var result = "." + decodeURIComponent(path);
  var simplified = result.replace(/(\/|\\)\.\.(\/|\\|$)/g, "/");
  return simplified;
  /*for (;;) {
    // Remove any instances of '/../' or similar
    var simplified = result.replace(/(\/|\\)\.\.(\/|\\|$)/, "/");
    // Keep doing this until it no longer changes the string
    if (simplified == result) return result
    result = simplified
  }*/
}

var weirdone = urlToPath("http://localhost:8000/slurp/../../string/..");
console.log(weirdone);
