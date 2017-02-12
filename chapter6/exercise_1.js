TITLE: A Vector Type

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)
function Vector (x,y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function (vector) {
  var newVector = new Vector (this.x + vector.x, this.y + vector.y);
  return newVector;
}

Vector.prototype.minus = function (vector) {
  var newVector = new Vector (this.y - vector.y, this.y - vector.y);
  return newVector;
}

Object.defineProperty(Vector.prototype, "length", {get: function() {
  return Math.sqrt((this.x * this.x) + (this.y * this.y));
  // set enumerable to true only if you want to expose length to enumeration
}, enumerable: true})


RESULTS

- Remember to maintain proper spacing!
- Book did not assign new vector in plus and minus methods to a variable, just returned
the entire expression that creates the new vector
    - assignment is unnecessary, adds a step; Try to avid any and all extra steps! Extra steps = complexity!
        - complexity means mistakes are more likely
        - this is not a big deal, but I assume someone unfamiliar, reading this code,
        would look at that assignment, and a small question mark would spring up in their mind
        - milliseconds of thought, but totally unnnecessary milliseconds
- on "length" property, no need to set enumerable? Did that I think just to experiment?
Otherwise, same as the Book
    - except that you unnecessarily / defensively wrapped mutliplication statements in parentheses
- and could hav used better spacing on the configuration object

So, like this:
Object.defineProperty(Vector.prototype, "length", {
  get: function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
});


EXPERIMENTATION


// PREPARE

// DEFINITION — Vector: a quantity with size and direction

// http://www.intmath.com/vectors/3-vectors-2-dimensions.php

// 2D Vecotr: quantity whose size and direction are derived from 2 component values (x and y)

/*
Write a constructor Vector that represents

a vector in two-dimensional space.
It takes x and y parameters (numbers), which it should save to properties of the same name.

Give the Vector prototype two methods, plus and minus, that take another vector
as a parameter and return a new vector that has the sum or difference of the two vectors’ (the one in this and the parameter) x and y values.

Add a getter property length to the prototype that computes the length of the
vector—that is, the distance of the point (x, y) from the origin (0, 0).
*/

// TEST CASES

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// EXPECT → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// EXPECT → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// EXPECT → 5


// PLAN

// Write a constructor Vector

function Vector (x,y) {

// It takes x and y parameters (numbers), which it should save to properties of the same name.
this.x = x;
this.y = y;


}

// Give the Vector prototype two methods
// take another vector as a parameter and return a new vector that has the sum
// or difference of the two vectors’ (the one in this and the parameter) x and y values.

Vector.prototype.plus = function (vector) {
  var newVector = new Vector (this.x + vector.x, this.y + vector.y);
  return newVector;
}

Vector.prototype.minus = function (vector) {
  var newVector = new Vector (this.y - vector.y, this.y - vector.y);
  return newVector;
}

// Add a getter property length to the prototype that computes the length of the
// vector—that is, the distance of the point (x, y) from the origin (0, 0).
Object.defineProperty(Vector.prototype, "length", {get: function() {
  // how do you compute 2D distance? pythagorean theorem?
  return Math.sqrt((this.x * this.x) + (this.y * this.y));
}})

// AHA: Getters and Setters are non-enumerable properties
// but what happens if I say "length" in Vector? I expect true
AS EXPECTED
// what about enumeration? does "length" show up?
DEPENDS ON IF YOU SET enumerable: true IN THE PROPERTIES CONFIGURATION OBJECT
WHEN YOU DEFINE IT

// Why do you use defineProperty to define getters and setters???
BECAUSE IN THAT PATTERN, YOU GIVE THE PROPERTY A NAME, BUT THEN YOU SET ITS
GETTER AND SETTER METHODS W/IN IT, SO THE PROPERTY DOES NOT ACTUALLY STORE A VALUE,
THOUGH FROM THE OUTSIDE IT APPEARS TO

YOU CANNOT ACCOMPLISH THIS WITH NORMAL ASSIGNMENT
YOU WOULD JUST BE ADDING A NORMAL PROPERTY NAMED "GET PROP" A STRING


// PERFORM


// PERFECT
