module.exports = function(string) {
  return string.split("").map(function(ch) {
    return String.fromCharCode(ch.charCodeAt(0) + 5);
  }).join("");
};

// splits the string into an array of characters
// maps each character to that character 5 code points up
    // gets charcode of character
    // adds 5
    // derives the corresponding character from that character code
// joins the transformed characters back into a string
