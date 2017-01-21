/*
Then implement an object type ArraySeq that wraps an array and allows iteration
over the array using the interface you designed. Implement another object type
RangeSeq that iterates over a range of integers (taking from and to arguments to its constructor) instead.
*/

// THIS DOESN'T WORK BECAUSE THE this IN THE FOREACH IS
// POINTING AT THE ARRAY INITIATING THE CALLBACK, NOT THE SEQUENCE OBJECT
function ArraySeq (array) {
  array.forEach(
    function(value, index){
      this[index] = value;
    }
  );
}

// CORRECT VERSION
function ArraySeq (array) {
  for (var prop in array) {
    this[prop] = array[prop];
  }
}


// NOW, HOW DO I MAKE AN ARRAY SEQUENCE WORK WITH THIS INTERFACE SO THAT LOGFIVE WORKS?
// INHERITANCE OR COMPOSITION?

function logFive (sequenceObject) {
  // comparing to 4, so sequence of >5 logs only first 5
  // for loops up to and including 4 times, which is 5 loops
  var end = Math.min(4,sequenceObject.length);

  // less than or = to, not just less than,
  // to make up for -1 on length getter
  for (var i = 0; i <= end; i++) {
    console.log(sequenceObject.currentValue);
    sequenceObject.moveOn();
  }
}

ArraySeq needs
- length
- moveOn
- currentValue
    - endOfSequence


function ArraySeq (array) {
  this.inner = new Sequence();
  for (var prop in array) {
    this.inner[prop] = array[prop];
  }
}

// This works
// However, the object returned isn't an ArraySeq object
// it's just a regular ass object
// which doesn't allow us to define properties on it via its prototype object,
// which is used to create new objects from that constructor when the new operator is called
// on the constructor
function ArraySeq(array) {
  var newArraySequence = {};
  Sequence.apply(newArraySequence, array)
  return newArraySequence;
}




// CORRECT VERSION

LEARNING
- in composition, calls to object from which enclosing one is composed
have to mirror structure of inner object properties
- Specifically, if the original object property is a getter, the outer
object property must also be a getter in order to use the same interface as
the inner object i.e. both callable as properties with dot notation
- If you do not do this, the outer object interface for that property will have to
use function-calling notation (getProperty() ), which means that the same code
will not be able to use the outer object that can use the inner object
- polymorphism requires structural and output consistency, but accepts internal differences,
to preserver interface?


function ArraySeq (array) {
  this.inner = new Sequence();
  for (var prop in array) {
    this.inner[prop] = array[prop];
  }
}

Object.defineProperty(ArraySeq.prototype, "length", {
  get: function () {
    return this.inner.length;
  },
  enumerable: false
})

Object.defineProperty(ArraySeq.prototype, "currentValue", {
  get: function () {
    return this.inner.currentValue;
  },
  enumerable: false
})


ArraySeq.prototype.moveOn = function () {
  return this.inner.moveOn();
}
