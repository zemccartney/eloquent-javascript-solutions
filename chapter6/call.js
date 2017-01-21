// QUESTIONS

[] if a constructor returns an object, where does the created object go?
[] would you ever want to do this?

you could hide the created object in another object...for encapsulation somehow????
- function Dunks (text) {
 var newOb = {text: text};
 console.log(this);
 TextCell.call(newOb, "peas");
  // log will read Dunks{}, {text: "skunks"}, {0: "skunks}, Dunks{}
  // what if I overwrite newOb value in TextCell?
 newOb.stashed = this;
 newOb.stashed.text = text;
 return newOb;
}


// PROBLEM: I don't understand how call or new works
function RTextCell(text) {

  // The call() method calls a function with a given this value and arguments provided individually
  TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(repeat(" ", width - line.length) + line);
  }
  return result;
};

function TextCell(text) {
  console.log(this);
  this.text = text.split("\n");
  console.log(arguments);
}

function Dunks (text) {
  // calls TextCell constructor...this is the same as calling new?
 console.log(this);
 TextCell.call({}, text);
 // a new TextCell object is created
 // From call documentation on MDN: "The value of this provided for the call to the function"
 // this is bound to the empty object

}

// new dunks
// creates a new object inheriting from Dunks.prototype, which is Object.prototype
// the constructor function for Dunks is called
    // this function calls the TextCell constructor function
    // "this" is bound to the new Dunks object (console.log calls placed in TextCell and Dunks constructors
    // return the same value, the new Dunks object)

var dunky = new Dunks ("skunks");
console.log(dunky);

// Prints Dunks { } i.e. the empty object

/*

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
1. A new object is created, inheriting from Foo.prototype.
2. The constructor function Foo is called with the specified arguments,
  and with this bound to the newly created object. new Foo is equivalent
  to new Foo(), i.e. if no argument list is specified, Foo is called without
  arguments.
3. The object returned by the constructor function becomes the result of
the whole new expression. If the constructor function doesn't explicitly
return an object, the object created in step 1 is used instead. (Normally
   constructors don't return a value, but they can choose to do so if they
      want to override the normal object creation process.)
 */

 // Best guess:
 // call is useful for calling a function, but pointing its this at a different object
 // which is inheritance
 // where "this" of one class of objects refers rather to a different class, resulting
 // in the different class being constructed in the same manner
