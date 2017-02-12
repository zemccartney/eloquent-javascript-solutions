TITLE: Sequence Interface

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

Object.defineProperty(Sequence.prototype, "iteration",{
  // so iteration isn't counted in Object.keys
  enumerable: false,
  writable: true,
  value: null
});


Object.defineProperty(Sequence.prototype, "length", {
  get: function () {
    // items in sequence are properties of the sequence object
    // -1 because of zero indexing
    return Object.keys(this).length - 1;
  }
});

Object.defineProperty(Sequence.prototype, "currentValue", {
  get: function () {
    var checked = this.iteration || this;

    // returns the first property on the object
    // THIS IS BAD; NEVER ANY GUARANTEES ABOUT ORDER OF PROPERTIES
    // AVOID DOING THIS
    return checked[Object.keys(checked)[0]];
    // 0TH index is always next item in the sequence
    // in this case, order of properties is guaranteed b/c it's a sequence?

  }
})


Sequence.prototype.moveOn = function () {

  // iteration property tracks the progress through the sequence
  // iteration doesn't exist if you haven't started iteration, in which case, you
  // need to create a new sequence object????
  // could it be an array?
  var next = this.iteration || new Sequence();

  // if no iteration property
  if (!this.iteration) {

    // for all properties in the sequence object
  	for (var prop in this) {

      // if the properties are the object's own i.e. not inherited from the prototype (
      // these are the utility / interface properties (length, moveOn, etc.))
    	if (this.hasOwnProperty(prop)) {
        // creates a property on next with the key 'prop' and assigns the value of the sequence
        // object's prop property to next[prop]
        // basically, loops over all items in the original sequence object and duplicates
        // them in the iteration object
    		next[prop] = this[prop];
    	}
  	}
  }

  // deletes the 0th property in sequence i.e. the next to be read in iterating through
  // deleting means we have read/iterated over this item and no longer need to care about it, we've moved on
  delete next[Object.keys(next)[0]];

  this.iteration = next;

  if (this.iteration.endSequence()) {
    console.log("We've reached the end of the sequence!");
    // if we've hit the end of the iteration
    // delete the iteration object, signifying that we have completed moving through the sequence
    delete this.iteration;
  }
}

Sequence.prototype.endSequence = function () {
  // check for existence of this b/c I call this only on the iteration object,
  // which is created to start an iteration and deleted when all values have been iterated over
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

- SPACING!!!! Pay attention
- BOOK VERSION function logFive(sequence) {
  for (var i = 0; i < 5; i++) {

    // means you don't have to care about if sequence has more or less than 5 items
    // loop tries to get to 5
    // HOWEVER, if you learn that sequence.next is false i.e. there are no more items,
    // you exit the loop. So, you learn where the loop ends on the fly; you don't need
    // to take the time to do so up front. next() method tells you
    if (!sequence.next())
      break;
    console.log(sequence.current());
  }
}

- the book did not define a base sequence object??? what the hell?
    - not strictly necessary given the instructions
    - instructions suggest you just have to 1.) define interface  2.) write a method
    that you know will use that interface to produce the intended output 3.) code objects
    to work in your system

- WAAAYYY overcomplicated the range sequence
- WHY WOULD YOU DO Object.defineProperty vs. defining via dot notation??
    - Any other reasons besides needing to configure property (getter, setter, enumerable, etc.)?
        - which is a hugely important technique, it seems

- shot myself in the foot a bit?
    - relying on order in keys
        - seems to be always better to rely on property names for accessing values
            - if you know a name, you can call, does not matter the context in which
            the name exists, it will come
            - whereas an order-based expression could return unpredictable results if order
            is changed; Order is more arbitrary than naming?? (name is unitary, order is relational??
              relationships are more chaotic than units?)
    - made moveOn dependent on endSequence i.e. different chunks
    of code have to know about each other and are intertwined, making changes to any part of this system
    exponentially more difficult. AVOID DEPENDING FUNCTIONS ON ONE ANOTHER...OR AT LEAST METHODS?
        - is this right?
        - or am I just bummed about the "iteration" convention I used??
        - I dunno...book uses make function within rest function

- RangeSequence prototype is an empty Sequence object because
    - when you create an object e.g. Object.create, "Constructors (in fact, all functions)
    automatically get a property named prototype, which by default holds a plain,
     empty object that derives from Object.prototype" i.e. new object created is
     totally empty, except for property assignments in constructor function
     - HOWEVER, this new, empty object can access properties set on its constructor's
     prototype property, which is the object's prototype
     - SO, what happens when you define a property on an object's prototype when you create it via inheritance?
         - basically the same thing as writing this.prop within a constructor   NOOO INCORRECT
         - the property is added to the empty object returned by the Object.create statement
         - which means...when creating a range sequence object, the following happens
         1. Object (empty Sequence object) created
         2. MoveOn property added
         3. new empty RangeSequence object constructed
          - has access to version of moveOn on the empty Sequence, which overrides the moveOn
          on the Sequence prototype 1 step up the prototype chain
          - but does not OWN that property
          - PROVEN BY:
              - var yungscrub = new RangeSeq(1,2);
              - console.log(Object.getPrototypeOf(yungscrub));

- Book doesn't bother with length or endSequence methods
  - in both methods, book represented end of sequence with a value or property
    - null in the second case, if next() returned false
    - lesson...when you can, represent information with values, not create it with functions?
      - i.e. don't create new functions to perform checks of state when you don't have to


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
