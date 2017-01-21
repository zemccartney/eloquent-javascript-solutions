/*
given an array of arrays of table cells, builds up a string that contains a nicely
 laid out table—meaning that the columns are straight and the rows are aligned.

 the builder function will ask each cell how wide and high it wants to be and
 then use this information to determine the width of the columns and the height
 of the rows. The builder function will then ask the cells to draw themselves at
  the correct size and assemble the results into a single string.

*/

// DATA SET: http://eloquentjavascript.net/code/mountains.js

NOTES
- interface is defined on each object that we want to manipulate, that we want to work in this program


// computes arrays of minimum column widths and row heights for a grid of cells

// maps array of rows, which looks like [[["text"], ["text"]],[["cell"],["cell"]]]
// rows are 3D arrays: 1D = whole grid, 2D = rows, 3D = cells (which are arrays, where each element is a line)
// HEIGHT IS MEASURED IN LINES
function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}


// Takes one row as representative, because all rows will have the same dimensions
// rows[0] returns [["text"],["text", "second line"]] a row w/ text cells
// for each item in that array i.e. text cells in a row, returns reduction of rows array to
// the largest width of every text cell at the i-th index of the row at which it belongs
// SO, each call to rows.reduce checks goes down a column, calling minWidth() on a text cell at the given index
// does this for each row index (calls to map)
// so map transforms text cells into the greatest width of all the text cells in a column, represented as the index of
// a row array
function colWidths(rows) {
  return rows[0].map(function(_, i) {

    // from entire set of rows (all possible text cells)
    return rows.reduce(function(max, row) {
      // derive the max value of every element at row[i]
      // reduce cycles through all elements in a given array, these elements are rows
      // WIDTH IS MEASURED IN CHARACTERS
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

function drawTable(rows) {

  // stores
  // Where do we get rows? rows is a 3D array
  // we pass heights to draw, I bet

  // these functions return arrays
  // rowHeights is usually 1 i.e. the number of newline characters most TextCells contain
  // widths is variable, dependent on length of texts
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  // linked to drawRow
  function drawLine(blocks, lineNo) {
    // block is an array of text contents produced by the draw() function

    // for each item in blocks
    // transform it into the actual text w/in the block
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }

  // takes a row and a rowNum
  // when passed to map, as we see below, these values become
  // row = row array (array of text cells)
  // rowNum = index of the row array w/in the rows array
  // this index i.e. number represents # of rows from top of table
  function drawRow(row, rowNum) {
    // row array e.g. [TextCell]


    // transform the row (series of text cells) into.. what format does draw spit out?
    // draw spits out TextCell.text padded with " " to match dimensions
    // transforms each raw text cell into its formatted contents, formatted using given
    // widths and heights, pulled from coordinates in column and row arrays
    // cell = TextCell object
    // colNum = its index in the row array
    // PATTERN = IN ARRAY TRAVERSING HIGHER-ORDER FUNCTION, USE INDEX ARGUMENT OF CALLBACK
    // TO MAP ARRAY INDEX TO OTHER, CORRESPONDING SET?
    var blocks = row.map(function(cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });

    // blocks = array of text contents, structured as arrays, where each index represents
    // a line
    // so blocks[0] = ["crimt", "shrimp"] w/ TBD whitespace, a 2 line cell for a 1 column table
    // we do blocks[0] because we only want to call the mapping function once
    // i.e. we only want to draw row once
    // BUT we want to compose the row of every block and their constituent lines
    // lineNo = index of text pulled from blocks, where each index represents a line
    // as this text is the text originally split into the TextCell
    // so blocks[0].map(function(_, lineNo = 0) will act on "crimt" and every other block at the 0th index in the row
    // interpreted as blocks i.e. text contents extracted from TextCells via draw
    // then lineNo = 1 will act on every second line of text, if one exists

    // And by act on, I mean pull out padded strings and join w/ " " into a larger string
    // constituting a line


    // for each line in blocks 0
	// this number of lines will be the same for every row member because all of
    // their heights were calculated via the rowHeights() function, placed in the
    // heights variable


    return blocks[0].map(function(_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");

    // The lines are drawn
    // Lines drawn and joined w/ new lines = rows
  }

  // this is a row: [TextCell{text: ["crimt"]}, TextCell{text: ["   "]}]

  // we join each row w/ a new line
  return rows.map(drawRow).join("\n");
}


// Contstructor for text cells

// builds a string whose value is the string argument repeated times number of
// times. The draw method uses it to add “padding” to lines so that they all have the required length.
// line.length is the length of TextCell.text
// adding whitespaces to the end of the cell so cell's width uniform width of table
// does this only if there's a positive difference between given width and length of text
// TODO what the hell is width??
// assume width is exactly what it says it is; the calculated width of the cell

// we have a string, we ask for a # of times
// the string we pass is the text on a line within a cell; NO
// the string is some text we want to repeatedly add to an empty string
// that, CONNECTION TO OTHER FUNCTION; CONTEXTUAL CORRELATIVE!! in the draw function, when then push into a text cell; we do this to make the cell the appropriate width
// the number of times corresponds to the difference between the given width and the length of the text UNDERSTAND FUNCTIONS
// BY LINKING TO THEIR CONTEXT OF USE
// this discrepancy tells us how much narrower the text is than the given width (which will be the standard
// cell width for the table), which allows us to decide how many
=================
LINKS TO : draw()
=================
function repeat(string, times) {
  // we initialize an empty string
  var result = "";
  //
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}


function TextCell(text) {
  // creates an array out of the given text
  // multiple items in the array only if text has escaped newline characters
  // otherwise, text is an array with only one index containing the text variable
  this.text = text.split("\n");
}

// The minWidth method finds the maximum line width in this array.
// returns a number indicating this cell’s minimum width (in characters)
==============
LINKS TO: colWidths()
==============
TextCell.prototype.minWidth = function() {
  // reduces the array to the longest length it contains
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};


==============
LINKS TO: rowHeights()
==============
// Returns a number indicating the minimum height this cell requires (in lines)
// height is a measure of the array's length, which is a measure of the number of times
// the given text was split, which occurs only at a new line character. So, the number of times split
// i.e. array indices i.e. length is the number of lines the text occupies
TextCell.prototype.minHeight = function() {
  // TODO Why is a cell's height its text's length????
  // e.g. "Fuji" length is 4, so height is 4
  // NO! text is an array; so length returns 1 unless a value is broken onto 2 lines
  // a length of 2 represents 2 lines etc.
  return this.text.length;
};

// TODO Where do width and height values come from???
// returns an array of length height, which contains a series of strings that
// are each width characters wide. This represents the content of the cell.
TextCell.prototype.draw = function(width, height) {
  var result = [];

  // creates a line for each unit of height
    // index in array = line the text occupies
    // doesn't actually do anything to the array
    // just breaks out the text, so it can be padded, the places it back in
    // original structure (an array whose indices are lines)
  for (var i = 0; i < height; i++) {
    // line is set to value of text or "" if not text
    var line = this.text[i] || "";
    // add to the result array an index containing line i.e. a cell's text along with
    // we repeatedly add a space to a string w/in repeat till we bridge the gap between width and the length of the cell's text,
    // which gets the cell to the standard width, which allows it to fit w/in appropriate table formatting
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

// Constructor for underlined cells

// An underlined cell contains another cell.
// As in, inner is set to a TextCell...why?
// UnderlinedCells have access to TextCell methods w/o actually being TextCells themselves
// still implement the same interface, so people working with them can use them as if they were TextCell's
// as long as they know how to set the UnderlinedCell
// We make use of the TextCell functionality. No need to redo it! By wrapping it in the UnderlinedCell
// THen make some cursory modifications to format the cell w/ an underline
// little rewriting, composability? encapsulation?
// YES Composing, mentioned later in the chapter that this pattern is often better than inheritance
// for extending object types
// example of encapsulation?
function UnderlinedCell(inner) {
  this.inner = inner;
}

// assumes value passed to inner has a minWidth() method i.e. it's a text cell
UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
};

// 1 is for the line occupied by the underline
// this.inner.minHeight() is the height of the text cell
UnderlinedCell.prototype.minHeight = function() {

  return this.inner.minHeight() + 1;
};

// Again, draw renders the text of the cell in the right format (padded)
// its output is an array, where each index represents a line the cell occupies
// the concat() call, in English: adds a line with the "-" repeated to the width
// of the text indices in the array
// the 2nd arg to repeat is the number of times to add the 1st arg to a string
// that's ultimately returned... in this case, it's returned to an array,
// which represents the number of lines the text occupies
UnderlinedCell.prototype.draw = function(width, height) {

  // width = 8, height = 1
  // what if this cell were the highest of table? OK, because 0-indexing??
  // what if height 1? height 1 is impossible for an underlined cell w/ text
  // due to how its minHeight() method works (adds 1 for the underline line)
  // height 1 means no text, empty cell

  // height - 1 translates to loop only over units of height representing text
  // i.e. remove the one added to hold the underline
  return this.inner.draw(width, height - 1)
  	// why is repeat wrapped in an array? No idea
    .concat([repeat("-", width)]);
};



// Builds a grid of cells from a data set

function dataTable(data) {
  // MOUNTAINS is an array of objects
  // all-caps variables means global / environmental ones? standard notation?

  // data[0] returns 1st object in array
  // arbitrary choice, assumes all objects follow same format (safe assumption?)
  // {name: "Kilimanjaro", height: 5895, country: "Tanzania"}

  // keys is a list of data[0]'s properties, so ["name","height", "country"]
  var keys = Object.keys(data[0]);

  // turns headers into underlined cells, containing text cell's whose text is
  // prop names
  // headers is an array of arrays containing strings
  // i.e. it is a row
  var headers = keys.map(function(name) {
    return new UnderlinedCell(new TextCell(name));
  });

  // row = object in data
  // each object represents a row
  // body is an array of arrays (rows) of arrays (cells)
  var body = data.map(function(row) {

    // using keys, list of properties each object has
    // transform names into an array of text values in that row
    // these text values are represented as arrays, using TextCell format
    return keys.map(function(name) {

      // constructs a string from the value stored in row's (an object) property
      // to which [name] resolves
      // calling String defensively, in case of numeric values
      // TextCell methods assume string values
      // passes string to the TextCell constructor

      // Creates a new text cell from the row's value for the given header


      // CHANGED IN LIGHT OF USING RTextCells
      // FORGOT TO USE THE PATTERN OF EXTRACTING COMPUTATION FROM CHAINS FOR READABILITY
      // OR produce values first
      // Concretely, book assigns row[name] to var value before the if chain
      // i.e. abstracts value production, so more readable w/in the chain??
      if (isNaN(row[name])) {
        return new TextCell(String(row[name]));
      } else {
        return new RTextCell(String(row[name]));
      }

    });


  });

  // have to wrap headers in an array so it's the same dimensions as body
  // as just headers, it would be only 2D [row[cell]]
  // concatenates all the rows
  return [headers].concat(body);
}


 // dataTable(MOUNTAINS) returns an array of rows
 // drawTable takes an array of rows, formats each row, and joins them w/ newlines
 // outputting a big ol' string
 console.log(drawTable(dataTable(MOUNTAINS)));



 function RTextCell(text) {
  // constructor function calls itself, passing text arg to itself
  // calls itself because thisArg is set to this, which is the object calling the method
  // which is TextCell, a function object
  // I'm not clear what "this" is in this case
  TextCell.call(this, text);

  // How does this property end up on the same object as the properties from the above
  // text cell? That is, how do constructors work exactly to move the properties
  // specified into the new object?
  this.brown = "charles";
}

// This line allows RTextCell to inherit TextCell's properties
// Otherwise, RTextCell's prototype would be RTextCell
// and it would not have minHeight or minWidth i.e. wouldn't
// be compatible with the table layout interface
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(repeat(" ", width - line.length) + line);
  }
  return result;
};

var righty = new RTextCell("value");
console.log(righty);
console.log(Object.getPrototypeOf(righty));
console.log("minWidth" in righty);
