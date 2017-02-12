TITLE: Another Cell

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

function StretchCell (inner, width, height) {

  this.inner = inner;
  this.width = width;
  this.height = height;

}

StretchCell.prototype.minWidth = function () {
  return Math.max(this.width, this.inner.minWidth());
}

StretchCell.prototype.minHeight = function () {
  return Math.max(this.height, this.inner.minHeight());
}

// for methods that require arguments, you have to set those arguments as wrapping function's parameters,
// then pass them to the composed object's method. Otherwise, composed object can't access
StretchCell.prototype.draw = function (width,height) {
  // so, for example, this fails if you say just this.inner.draw
  return this.inner.draw(width,height);
}

RESULTS

- missing semicolons from end of prototype property assignments
- otherwise, matched book exactly
- Learned an interesting thing about this console.log(sc.draw(this.width, this.height))
    - refers to the item to which you are passing the expression
    - so, even though this.width is passed to sc.draw, this refers to the console, I believe?
    - the above line produces an empty cell array because the console object does not
    have width and height properties, so both parameters evaluate to null 


HAD TO LOOK AT HINTS

EXPERIMENTATION



// PREPARE

/*
Implement a cell type named StretchCell(inner, width, height) that conforms to
the table cell interface described earlier in the chapter.
- MEANS HAS minHeight, minWidth, and draw functions

 It should wrap another cell (like UnderlinedCell does) and ensure that the resulting cell has at least
the given width and height, even if the inner cell would naturally be smaller.
*/

TEST CASES

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]

// PLAN

// Implement a cell type named StretchCell(inner, width, height)
function StretchCell (inner, width, height) {

// It should wrap another cell (like UnderlinedCell does)
  this.inner = inner;

  // and ensure that the resulting cell (produced by draw function?) has at least the given width and height,
  // even if the inner cell would naturally be smaller.
  // Return the greater of the 2 values
  // NO: CONSTRCUTION IS JUST SETTING VALUES, CREATION; LEAVE DATA MANIPULATION I.E. METHODS
  // FOR INTERACTING WITH VALUES TO METHOD DEFINITIONS
  this.width = width;
  this.height = height;
// Math.max, we're saying: of these 2 value, which is the larger. Give me the larger

}

// Inheritance pattern
StretchCell.prototype = Object.create(TextCell.prototype);

// Composition pattern
// objects don't have the values themselves, but call out to contained object that
// does have the methods
StretchCell.prototype.minHeight = function () {

  // SAME AS Math.max width > inner.minWidth() ? width : inner.minWidth();
  return Math.max(this.width, this.inner.minWidth());
}

StretchCell.prototype.minWidth = function () {

  // SAME AS Math.max height > inner.minHeight() ? height : inner.minHeight();
  return Math.max(this.height, this.inner.minHeight());
}

StretchCell.prototype.draw = function () {
  // parentheses or no?
  return this.inner.draw();
}

// arrays can represent lines, as lines are a sequential structure; one after another
// Order of indices maps naturally to order of lines

// When you know an interface, you know how you need to define new objects i.e.
// make sure they have implemented all the methods used in that interface



// for demonstration purposes

TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};

TextCell.prototype.minHeight = function() {
  return this.text.length;
};

TextCell.prototype.draw = function(width, height) {
  var result = [];

  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";

    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

// PERFORM


// in composing objects from others
// new objects are technically unrelated to consitutive objects
// when you set same interface on prototype of new object
// you create nonenumerable methods that that object can access
// as far as I can tell, when you call a constructor,
// it returns the object described in the constructor declaration
// The constructed object has access to any methods on its prototype
// but these methods aren't on the object itself, it doesn't hasOwnProperty them



// Fuck...what is the prototype property?
// How does it relate to constructors??
// prototype is an object, stored in the "prototype" key of the function object
// it has all of the properties you set on it
// it also has a constructor property, which is a function
// that produces the object defined w/in that function when you call
// new Object
console.log(sc instanceof TextCell);
console.log(sc.hasOwnProperty("draw"));
console.log("draw" in sc);
console.log(StretchCell.prototype.constructor);


// PERFECT
