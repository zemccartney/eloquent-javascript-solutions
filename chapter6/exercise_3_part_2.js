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


ArraySeq.prototype.length = function () {
  return this.inner.length;
}

ArraySeq.prototype.moveOn = function () {
  return this.inner.moveOn();
}

ArraySeq.prototype.currentValue = function () {
  return this.inner.currentValue;
}
