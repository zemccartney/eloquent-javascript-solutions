Object.defineProperty(Sequence.prototype, "iteration",
                      { enumerable: false, writable: true, value: null });


Object.defineProperty(Sequence.prototype, "length", {
get: function () {
  // subtracting 1 to prevent counting of iteration property
  // Object.keys doesn't count as enumeration?
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
  // console.log(next);

  // the only case where this would evaluate to true
  // would be if the above OR returned new Sequence, which
  // means that the sequence object's iteration property is empty,
  // which means that either no one has tried iterating through the sequence
  // or some one completely iterated through the sequence. In either case,
  // the sequence is at the beginning
  if (!this.iteration) {
  	for (var prop in this) {
    	if (this.hasOwnProperty(prop)) {
    	// this resulted in the the creation of a list structure
    	// via the iteration property because the iteration property
    	// was repeatedly
    		next[prop] = this[prop];
      	//console.log(prop);
    	}
  	}
  }

  // console.log(next);

  // console.log("A", next[0]);
  // console.log("B", Object.keys(next)[0]);
  // console.log("C", next[Object.keys(next)[0]]);

  // remove current value from iteration i.e. move on to next segment of sequence
  // PROBLEM: Deleting messes up indexing; re-index function?
  // Nope! not a problem, given how you use Object.keys
  delete next[Object.keys(next)[0]];
  // console.log(next);


  this.iteration = next;
  // console.log(this.iteration);
  // console.log(this.iteration[Object.keys(this.iteration)[0]]);

  if (this.iteration.endSequence()) {
    console.log("We've reached the end of the sequence!")
    delete this.iteration;
  }
}

Sequence.prototype.endSequence = function () {
  // console.log(this);
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

var seq = new Sequence(1,2,3);
// console.log(seq.endSequence());
// {0:1, 1: 2, 2: 3}
console.log(seq);

console.log(seq.currentValue);
// 1
seq.moveOn();
console.log(seq.currentValue);
// 2
seq.moveOn();
console.log(seq.currentValue);
// 3

seq.moveOn();
// end of sequence!
console.log(seq);
// sequence object w/o an iteration property
