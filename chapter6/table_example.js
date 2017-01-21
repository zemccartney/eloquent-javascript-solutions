

rows.map returns an array where each row is reduced to the largest minHeight of any value in a row
[


]

row.reduce starts with the value 0 (0 lines tall) …no? starting w/ 0th index, not the 1st?????? shit..

and calls Math.max, comparing 0 to each row array item’s (or cell’s) value returned from the minHeight method

So, row.reduce returns the highest minHeight value of the cells of a row array

I have no idea what the minHeight function looks like

// returns a number indicating the minimum height this cell requires (in lines).
function minHeight (cell) {

	var height = 0;

	// you have to know width before you can say height, right?
	// thinking about line breaks??

	// need to define when to break line
	// depends on width of area in which table is supposed to appear?
	// and proportions of widths of content, regardless of area width?
	// you get those, then assess overflow, then mitigate overflow via line breaks?

	return height;
}

/*** COLWIDTHS ANALYSIS  ***/

function colWidths(rows) {
  return rows[0].map(function(_, i) {
    return rows.reduce(function(max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

rows =
[
	[Kiliman., 5895, Tanzania],
	[Everest, 8848, Nepal],
	[Mount Fuji, 376, Japan]
]

return rows[0].map(function(_, i) {
  return rows.reduce(function(max, row) {
    return Math.max(max, row[i].minWidth());
  }, 0);
});

rows[0] = [Kiliman., 5895, Tanzania] AS IN: This array is going to be transformed into the reduced values (return value)

reduce callback executed for each row in rows
when that happens, Math.max compares max (which starts at the initialValue) and row[i].minWidth(), where
row[i] starts at row[0] i.e. rows[0][0] i.e. Kilimanjaro .minWidth()  is compared to 0 via Math.max to determine the higher value

1st map call
  1st reduce call: rows[0], row[0].minWidth
  2nd reduce call: rows[1], row[0].minWidth
  3rd reduce call: rows[2], row[0].minWidth

  // looks at same row index of each row to determine which row has the widests
  // widest row value = column width
2nd map call
  1st reduce call: rows[0], row[0].minWidth
  2nd reduce call: rows[1], row[0].minWidth
  3rd reduce call: rows[2], row[0].minWidth
3rd map call
  1st reduce call: rows[0], row[0].minWidth
  2nd reduce call: rows[1], row[0].minWidth
  3rd reduce call: rows[2], row[0].minWidth


So once for each column


/*
By mapping over the elements of the first row and only using the mapping function’s
second argument [b/c want to inspect one value to return one value, columsn have only 1 height],
colWidths builds up an array with one element for every column index.
The call to reduce runs over the outer rows array for each index and picks out the
 width of the widest cell at that index.
*/

[
  elCol1,
  elCol2,
  elCol3
]

reduce moves diagonally right down the table?



i = index of the current array element being processed
so, i starts at 0; rows[0][0] = Kilimanjaro
reduce called on rows
map called on rows[0] ... because only 3 columns, so calc only 3 times, but height = all rows?

for Kilimanjaro, call rows.reduce
whose values are arrays i.e. entire rows
so first, 0 is compared with row[i]

  TODO - Why does the underscore work to make the function not use the variable?
  TODO - Why set initial value to 0? Because we're checking every value to determine the max amongst them,
  not accumulate a value from every value, in which case, we'd just add [1] to [0], which happens by default (
    no initial value, reduction starts at [1])


	translates each array, a row, into its minWidth
	but only for the first row?
	why just the first row?

shit…how is the i used?
as the counter in a for loop?
is a for loop used in reduce?


/**** DRAW TABLE ANALYSIS ****/


function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }
  // for each item, draws a line the a table as an array, then joins the values
  // with a space so they're close together, but readable (small gap between columns
  // seen in example above

  function drawRow(row, rowNum) {
    var blocks = row.map(function(cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
    return blocks[0].map(function(_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");
  }

  /*
  [Kiliman., 5895, Tanzania],
  [Everest, 8848, Nepal],
  [Mount Fuji, 376, Japan]

  1st row.map callback call is function(Kiliman., 0)
  returns cell.draw(widths[0], heights[rowNum])
  so cell is an array of lengths heights[rowNum], with each
  index containing the cell's text, expanded ( I assume with empty
  space characters ) to match widths[0] via string.length()

  Kiliman. cell is then accessed via block[0]
  and mapped to

  why an array of length height??????

  */





  return rows.map(drawRow).join("\n");
  // sets rowNum to the index of the row being mapped holy shit that's cool
  // rowNum is defined as the nth row, counting from the top of the table
  // so heights could vary across rows
  // still don't know how the minHeight() function works
}
