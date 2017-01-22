/*
Implement another object type
RangeSeq that iterates over a range of integers (taking from and to arguments to its constructor) instead.
*/


function RangeSeq (from, to) {
  //var index = 0;

  // for some reason, you can't omit the brackets? doing so causes an infinite loop
  /*
  while (from <= to) {
    this[index] = from;
    from++;
    index++;
  }
  */

  // Oh! you can do multiple things / increments at the end of each loop!!
  // Though sorta sacrifices clarity for elegance / simpler code
  for (var index = 0; from <= to; index++, from++) {
  	this[index] = from;
  }
}



// What is Object.create?
RangeSeq.prototype = Object.create(Sequence.prototype);
