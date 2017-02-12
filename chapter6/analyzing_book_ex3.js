// I am going to use a system where a sequence object has two methods:
//
// * next(), which returns a boolean indicating whether there are more
//   elements in the sequence, and moves it forward to the next
//   element when there are.
//
// * current(), which returns the current element, and should only be
//   called after next() has returned true at least once.

function logFive(sequence) {
  for (var i = 0; i < 5; i++) {
    if (!sequence.next())
      break;
    console.log(sequence.current());
  }
}

/*
for an array : [1,2,3,4]
4 iterations
array.length = 4
array.length - 1 = 3
pos = -1 // current returns undefined
pos = 0 // current returns 1
pos = 1 // current returns 2
pos = 2 // current returns 3

when pos = 3, next returns false
current returns 4
*/



function ArraySeq(array) {
  // Why does pos = -1?
  // guess: -1 used in index access (array[-1]) returns undefined
  // so, when array is first created, if someone calls current, they get undefined
  // which means, I think: you haven't started iterating over the array's values
  // -1 BECAUSE OTHERWISE LOGFIX WOULD NEVER ACCESS CURRENT VALUE
  // This way, 1st loop through logFive enters the array, and moves pos from -1 to 0
  // if you started at pos = 0, the first item logged by logFive would be array[1]
  // tracks position in sequence, used for index access of array
  this.pos = -1;
  // stores an array object
  this.array = array;
}

ArraySeq.prototype.next = function() {
  if (this.pos >= this.array.length - 1)
    return false;
  this.pos++;
  return true;
};
ArraySeq.prototype.current = function() {
  return this.array[this.pos];
};


// A RANGE SEQUENCE DOESN'T NEED TO STORE EVERY VALUE IN ITS RANGE
// IT JUST NEEDS A WAY TO ALLOW ITS USER TO INCREMENT THROUGH ITS VALUES TILL YOU
// REACH ITS END
function RangeSeq(from, to) {
  this.pos = from - 1;
  this.to = to;
}
RangeSeq.prototype.next = function() {
  if (this.pos >= this.to)
    return false;
  this.pos++;
  return true;
};
RangeSeq.prototype.current = function() {
  return this.pos;
};



// This alternative approach represents the empty sequence as null,
// and gives non-empty sequences two methods:
//
// * head() returns the element at the start of the sequence.
//
// * rest() returns the rest of the sequence, or null if there are no
//   elemements left.
//
// Because a JavaScript constructor can not return null, we add a make
// function to constructors of this type of sequence, which constructs
// a sequence, or returns null if the resulting sequence would be
// empty.

say we do
array [1,2,3] , length = 3

ArraySeq2 {
  this.array = [1,2,3],
  this.offset = null
}

OR ArraySeq2.make produces
ArraySeq2 {
  this.array = [1,2,3],
  this.offset = 0
}

this.head returns 1
this.rest returns
ArraySeq2 {
  this.array = [1,2,3],
  this.offset = 1
}
SO, head returns 2

When head = 3, which it does on the object made the 4th time rest is called on this array
head >= this.array.length, which means make returns null (does not make anything),
which means logFive2 loop will stop running because sequence will have been set to null


function logFive2(sequence) {
  // loop stops whenever sequence is null
  // sequence is null ONLY IF sequence.rest() returns null
  // sequence.rest() returns null ONLY IF its second parameter, this.offset + 1 >= this.array.length
  // TWO CONDITIONS NEED TO HOLD TRUE FOR THE LOOP TO CONTINUE
    // we've iterated over less than 5 items
    // there are still items in the sequence over which we haven't iterated
    // If either is invalidated, STOP
    for (var i = 0; i < 5 && sequence != null; i++) {
      // log first item in the sequence
      console.log(sequence.head());

      // set sequence, which represents the sequence we're inspecting in the function
      // to the rest of the current sequence, which is all items except the one just returned by head
      sequence = sequence.rest();
    }
}

ArraySeq2.prototype.head = function() {
  return this.array[this.offset];
};

function ArraySeq2(array, offset) {
  this.array = array;
  this.offset = offset;
}
ArraySeq2.prototype.rest = function() {
  return ArraySeq2.make(this.array, this.offset + 1);
};
ArraySeq2.prototype.head = function() {
  return this.array[this.offset];
};

// creates a new array object that represents...depends on context in which make is called
// NOTICE: Not set on the prototype property
// Set on the function itself, the function object

// faux-constructor, ensures that if an offset isn't given, it's set to 0
// ALSO, used in rest function, creates a new object with offset incremented
  // main purpose is incrementing offset, changing the index of the array you inspect
  // with the head function, which passes the offset property to the index access bracket
  // BUT MORE IMPORTANTLY RETURNING NULL IF MAKE IS ATTEMPTING TO RETURN AN OBJECT WHOSE OFFSET
  // IS OUTSIDE THE ARRAY BEING INSPECTED
  // make prevents erroneous construction AND allows you to return null, which is required to
  // signify that you have iterated through all of the original sequence's items
  // Empty sequence means no remaining items, how you represent that there's nothing on which to iterate
      // you know there's nothing left to iterate on if offset is >= the sequence's length
      // offset represents your progress through the sequence i.e. each iteration offsets you
      // by one from the start
ArraySeq2.make = function(array, offset) {
  if (offset == null) offset = 0;
  if (offset >= array.length)
    return null;
  else
    return new ArraySeq2(array, offset);
};



function RangeSeq2(from, to) {
  this.from = from;
  this.to = to;
}
RangeSeq2.prototype.rest = function() {
  return RangeSeq2.make(this.from + 1, this.to);
};
RangeSeq2.prototype.head = function() {
  return this.from;
};
RangeSeq2.make = function(from, to) {
  // we use greater than, not greather than or equal to, in order to print the to value
  // we print the from value with head
  // so, we print to only when from = to
  // so, we need to return null i.e. stop the loop only if from > to i.e. outside range
  if (from > to)
    return null;
  else
    return new RangeSeq2(from, to);
};
