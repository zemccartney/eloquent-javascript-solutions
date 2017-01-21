/*
We will want to highlight the top row, which contains the column names,
by underlining the cells with a series of dash characters. No problem—we simply
write a cell type that handles underlining.
*/

// write a cell type --> constructor

function UnderlinedCell (text) {
  this.text = text.split("\n");
}


// underline is a new line
// all of the same character
// at the same width as the contained text

function UnderlinedCell.prototype.draw = function (width, height) {


  // when you draw contents, add in underlines to standard width
  // result[0] will contain cell's text, set to standard length
  result.push("=", result[0].length); // OR this.text[0].length NO, it's not formatted, result text has been formatted
}
