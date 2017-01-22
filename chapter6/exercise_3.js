TITLE: Sequence Interface

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

Object.defineProperty(Sequence.prototype, "iteration",
                      { enumerable: false, writable: true, value: null });


Object.defineProperty(Sequence.prototype, "length", {
get: function () {
  return Object.keys(this).length - 1;
}
});

Object.defineProperty(Sequence.prototype, "currentValue", {
  get: function () {
    var checked = this.iteration || this;

    return checked[Object.keys(checked)[0]];

  }
})


Sequence.prototype.moveOn = function () {
  var next = this.iteration || new Sequence();

  if (!this.iteration) {
  	for (var prop in this) {
    	if (this.hasOwnProperty(prop)) {
    		next[prop] = this[prop];
    	}
  	}
  }

  delete next[Object.keys(next)[0]];

  this.iteration = next;

  if (this.iteration.endSequence()) {
    console.log("We've reached the end of the sequence!")
    delete this.iteration;
  }
}

Sequence.prototype.endSequence = function () {
  if (this && Object.keys(this).length == 0) {
    return true;
  } else {
    return false;
  }
}

function Sequence () {
  for (var prop in arguments) {
    this[prop] = arguments[prop];
  }

}


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

function RangeSeq (from, to) {
  for (var index = 0; from <= to; index++, from++) {
  	this[index] = from;
  }
}

RangeSeq.prototype = Object.create(Sequence.prototype);

RESULTS

EXPERIMENTATION



// PREPARE

/*
Design an interface that abstracts iteration over a collection of values. [ SERIES OF METHODS] An object
that provides this interface represents a sequence [1,2,3], and the interface must somehow
make it possible for code that uses such an object to
iterate over the sequence,
looking at the element values it is made up of
and having some way to find out
when the end of the sequence is reached.

When you have specified your interface, try to write a function logFive that takes
a sequence object and calls console.log on its first five elements—or fewer, if
 the sequence has fewer than five elements.

Then implement an object type ArraySeq that wraps an array and allows iteration
over the array using the interface you designed. Implement another object type
RangeSeq that iterates over a range of integers (taking from and to arguments to its constructor) instead.
*/

// Test case

logFive(new sequenceObject(1,5));

sequenceObject = {
  1: 1,
  2: 2,
  3: 3,
  4: 4
}


// PLAN


// How do you iterate over the sequence,
// looking at the element values it is made up of
// having some way to find out when the end of the sequence is reached

for (var i = 0; i < end; i++)

function inspectValue (key) {
  return this.key;
}

function sequenceLength () {
  var counter = 0;
  for (var prop in this) {
    counter++;
  }

  return counter;
}

function terminateSequence () {

}

getCurrent () {

}

// NO IDEA WHY THIS WORKS, BUT IT DOES
function Sequence () {
  for (var prop in arguments) {
    this[prop] = arguments[prop];
  }
}

function getCurrent

function moveOn () {
  var nextInSequence = Object.create(this);
  nextInSequence delete this[this.getCurrent()];
  this.current = for (var prop in nextInSequence) { return prop;}
}

function endSequence () {

}

// you have a set sequence
// can move in only 1 direction

// STATEFUL

function getNext (state) {
  if (!this.endSequence(state)) {
    state++;
    return this[state++];
  }
}

function endSequence (state) {
  if (state = this.length) {
    console.log("End of sequence reached")
    return true;
  } else {
    return false;
  }
}





sequence.currentElement () {

}


function continueOrStop () {

}


function iterate ( ) {

  // look at value

  // Decide: good to keep going or need to stop

}

// How does console.log get access to the values being iterated over??

iterating is
you set starting conditions
you start moving through a sequence
you stop when you reach a certain condition



function iterate () {
  for (var prop in this) {
    this.inspectValue();
  }
}

// have to be able to call console.log on each of the item's elements

function logFive (sequenceObject) {
  var end = Math.min(5,sequenceObject.length);

  for (var i = 0; i < end; i++) {
    console.log(sequenceObject.currentValue);
    sequenceObject.moveOn();
  }

}



for (var i = 0; i < lengthOfSequence (a #); i++ (counter to track progress; for example, in an
array, a sequential object, iterating means looking at each value, then moving on, leaving only
the remaining items in the array untouched) ) {
  // Do stuff
}


// INTERFACE FIRST
// An interface is an action w/ an intended consequence
// focus on the consequences, not the actions

// I can access and see and use the value at the current point in the sequence

// better used as a getter??
function getCurrent () {

  return // a discrete value pulled from the sequence, representing the point in the sequence to which you've currently
  // progressed
}

// better used as a getter? so internals don't really matter to anyone else?
function getLength () {

  return // a number; the number of elements in the sequence
}

function finishedSequence () {

  return // value signifying end of sequence...true?
}

function iterate (currentSequence) {

  return // progressed-through sequence...counter-index...OR deleted object
  // look at the next item in the sequence, no longer care about preceding items
}



/*
iterate over the sequence,
looking at the element values it is made up of
and having some way to find out
when the end of the sequence is reached.
*/

// check if we're at the end to decide we should stop

// move to the next item in sequence (this is usually, but not necessarily, implemented as a counter
// because arrays use numeric indices )

// Then Objects to implement the interface

function Sequence () {
  for (var prop in arguments) {
    this[prop] = arguments[prop];
  }
}

Object.defineProperty(Sequence.prototype, "length", {
get: function () {
  var counter = 0;
  for (var prop in this)
    counter++;

  return counter
}
});

Object.defineProperty(Sequence.prototype, "currentValue", {
  get: function () {
    var storage;
    for (var props in this) {
      storage = this[props];
    }

    return storage;
  }
})

Sequence.prototype.moveOn = function () {
  // How do I get full list of properties from pre-existing sequence into this new object?

  var next = this.iteration | new Sequence();
  for (var prop in this) {
    next[prop] = this[prop];
  }

  for (var prop in next) {
    delete next[prop];
    break;
  }

  this.iteration = next;

  if (this.iteration.endSequence()) {
    console.log("We've reached the end of the sequence!")
    // Dispose of sequence progress
    delete this.iteration;
  }


}

Sequence.prototype.endSequence = function () {
  // How do you figure out if a version of the object is at sequence end?
  // End of a sequence is a lack of values in the iteration
  // How do you check if an object is totally empty?
  if (Object.keys(this).length == 0) {
    return true;
  } else {
    return false;
  }
}



// PERFORM


// PERFECT
