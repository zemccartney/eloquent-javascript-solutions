// Prepare
// We can do that ourselves now. Write a function min that takes two arguments and returns their minimum.
// 2 arguments...just numbers? Start off with that, then try other things

// Currently, no function
// Don't know how it should compare values to know which is smallest
// Desired: know how function can figure out which of values is smallest


// Plan
function min (val1, val2) {
  if (val1 > val2) {
    return val2;
    // what if they're equal?
  } else if (val1 === val2) {
    return console.log("No minimum; values are equal");
  } else {
    return val1;
  }
}

RESULTS
- matched solution exactly, I think
- added on else if to account for equality case
- but otherwise, it does NOT? matter that my order of values compared was the reverse of his?
Yes, because order is irrelevant; the comparison, regardless of which is on the left or right,
is if one value is greater than another; if so, return the lesser, if not, return the other

// RUle? OR operator works only if decision is made solely on the values presented; no
// calculation / comparison can happen w/in OR
return val1 || val2 ;
