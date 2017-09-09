
// adds a div element with the given loading message to the dom
function showMessage(msg) {
    var elt = document.createElement("div");
    elt.textContent = msg;
    return document.body.appendChild(elt);
  }

// stores dom element in variable for easier reference later
  var loading = showMessage("Loading...");
  // getJSON takes a URL, submits a GET request to that URL, and parses the result as JSON,
  // returning the javascript equivalent of the returned JSON data
  getJSON("example/bert.json").then(function(bert) {
    // bert.spouse must hold a string that matches a valid for XMLHttpRequest URL pattern
    return getJSON(bert.spouse);
  }).then(function(spouse) {
    return getJSON(spouse.mother);
  }).then(function(mother) {
    // When we link to the spouse's mother's name, display that name  (add as div with spouse name as text)
    showMessage("The name is " + mother.name);
    // Catch ANY ERROR THROWN AT ANY POINT IN EXECUTION
  }).catch(function(error) {
    // TODO Why String(error)?
    showMessage(String(error));
    // Then, remove the loading message
  }).then(function() {
    document.body.removeChild(loading);
  });
