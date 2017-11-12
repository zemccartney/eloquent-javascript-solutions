/*module.exports = function (string) {
    return string.split("").map(function(ch) {
        return String.fromCharCode(ch.charCodeAt(0) + 5);
    }).join("");
}*/

exports.garble = function (string) {
    return string.split("").map(function(ch) {
        // String.fromCharCode is a static method
        // it's called on numbers to convert them into Strings
        // REMEMBER: Static methods are useful when you want to perform some sort
        // of manipulation relevant to a data type, but don't / can't have an object
        // of that type... for some reason this is so much clearer in PHP..why?
        // Because in PHP there's far more overhead to creating objects?
        // NO! When you're trying to retrieve an object of a specified type from information
        // e.g. an ID, charCode, etc. related to the object type
        // charCode is like a string's ID
        return String.fromCharCode(ch.charCodeAt(0) + 5);
    }).join("");
};

exports.translate = function (string) {
  return string.split("").map(function(ch) {
    return String.fromCharCode(ch.charCodeAt(0) - 5);
  }).join("");
}


// Assign multiple values to exports value
// Return just a single special value by overwriting module.exports with that single value
