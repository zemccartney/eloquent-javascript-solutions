/*
Write a range function that takes two arguments, start and end,
and returns an array containing all the numbers from start up to (and including) end.
*/

function range (start, end) {
  var rangeArray = [];

  for ( ; start <= end; start++) {
    rangeArray.push(start);
  }

  return rangeArray;
}

/*
Next, write a sum function that takes an array of numbers and returns the sum
of these numbers. Run the previous program and see whether it does indeed return 55.
*/

PREPARATION

problem is that when we have a list of numbers, we cannot easily
tell how much they add up to
WHY? B/c humans suck w/ numbers
much slower than computers

- function
- takes an array --> so...parameter
- array is of numbers (so you need to check for that?) // PERFECT ITEM
- returns the sum of the numbers
- so, the function somehow has to sum the numbers
- test: 1-10 sums to 55
- problems: how do you sum numbers in an array?
    - you need to know
        - each number, not duplicate, so iterate through


// PLAN

function sum (numArray) {

  var summedArray = 0;

// somehow sum the #s

// Adding: you have the current sum, a value to add, need to know when to stop
// value to add = some value in numArray
// current sum = summedArray
// when to stop = end of array, defined as gone past last filled index (bar to the right of last value)
// PROGRAMMING IS DECISION MAKING, DEFINING YOUR TERMS AND KNOWLEDGE

  for (var i = 0; i <= summedArray.length; i++) {
    summedArray += numArray[i];
  }

// how does return statement know about summed value?
// return value is a single number
  return summedArray;

}

// PERFORM

// This returns 0
// WHY?
// SOLVED: Because you were adding the index past the last value (<= in a for loop condition)
// Concretely, you were adding undefined to a number
// not sure why this ended up returning zero, though? I'm misremembering?
function range (start, end) {
  var rangeArray = [];

  for ( ; start <= end; start++) {
    rangeArray.push(start);
  }

  return rangeArray;
}


function sum (numArray) {
  var summedArray = 0;

  for (var i = 0; i < numArray.length; i++) {
    summedArray += numArray[i];
  }

  return summedArray;

}

RESULTS
- My sum function matched the book's exactly
- My bonus range was structurally nearly identical to his, but with a few key
differences at the start, boolean checks / decisions esp. step (!step vs. step == null)(you do NOT have a clear term for this),
and for loop variable assignment (coding style)
- The book's range doesn't work for counting down w/o a step given; does it have to? I assumed so, but could be wrong
- To perfect:
    - add validation that numbers and step make sense
    - account for the case of start == end
- I don't understand: what are the implications of checking a value == null vs. coercing it to a Boolean
with !value (so null or undefined or false both return true, so we're asking "Is it true that the value
given is false i.e. a non-useful value" --> but is it the case that null, undefined, -1, "" are
not useful always??? What's the tradeoff here?)
- sloppy to overwrite start? book doesn't; why? doesn't matter here, but generally bad practice
to overwrite variables potentially used elsewhere in a loop; better to defensively create a new variable?
- I don't understand why my local build didn't work, why chapter pages didn't render


/*
function range (start, end, step) {

	// matches book
    var rangeArray = [];

	// checking if step > 0 gives the same info as
    // checking if start < end
    // both tell us if we're counting upwards or downwards
    // but isn't checking the step more error prone?
    // as in, if step is negative, but start is less than end??
    // doesn't matter here because in both his and your examples
    // you're not validating input
    // that'd be a perfection item

    if (start < end) {
      if (!step) {
        step = 1;
      }

      // sloppy to overwrite start? book doesn't
      // why?
      // doesn't matter here, but generally bad practice
      // to overwrite variables potentially used elsewhere in
      // a loop; better to defensively create a new variable?

      for ( ; start <= end; start+= step) {
        rangeArray.push(start);
      }

	// what about the case where start = end?
    // what would you do??
    // hmm...nothing? or just give the number?
    // or log some message?
    // or message and an array w/ just the number
    // rangeArray.push(start);

    // diff from book: don't have to write this out
    // can just be else
    // if start isn't < end, then you know it's greater than end
    // and therefore don't have to check for that
    } else if (start > end) {
    // step is set to -1 if opposite of its Boolean coercion is true i.e. if its Boolean coercion is false
    // only non-Booleans that convert to false are null, undefined, NaN, 0, or ""
    // this method of checking for a non-value will cause 0 and "" to fail
    // which you don't want to happen in many instances of validation, I assume
    // SO: this works, but I assume it's better to do == null or == undefined
    // if a value's null / undefined, then you know you can't use it (I think??)
      if (!step) {
        step = -1;
      }
      for ( ; start >= end; start+= step) {
        rangeArray.push(start);
      }
    }

    return rangeArray;

}

*/


// PERFECT

// - array is of numbers (so you need to check for that?) // PERFECT ITEM

function sum (numArray) {

  var summedArray = 0;

  // Do for loops have their own scopes
  for (var i = 0; i < numArray.length; i++) {
    if (typeof(numArray[i]) !== "number") {
      return console.log("Please ensure that all values are numbers")
    }
  }

  for (var i = 0; i < numArray.length; i++) {
    summedArray += numArray[i];
  }

  return summedArray;

}



/*
As a bonus assignment, modify your range function to take an optional third argument
 that indicates the “step” value used to build up the array. If no step is given,
 the array elements go up by increments of one, corresponding to the old behavior.
  The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. Make sure it
  also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].
*/

// IS THE ASSIGNMENT JUST THE PREPARATION? THAT'S THE PROBLEM DEFINITION? I JUST
// NEED TO PLAN?
// PREPARE

- range needs to take a 3rd, currently takes just 2
- How do you step?
    - you know where you start, where you are ending, and how much you are stepping
    - what if the step given cannot lead you to the end point?
- How do you accommodate negative steps?
- If no step is given, the array elements go up by increments of one (need a conditional?)
// PLAN


function range (start, end, step) {

    var rangeArray = [];

    if (start < end) {
      if (!step) {
        step = 1;
      }
      for ( ; start <= end; start+= step) {
        rangeArray.push(start);
      }

    } else if (start > end) {
      if (!step) {
        step = -1;
      }
      for ( ; start >= end; start+= step) {
        rangeArray.push(start);
      }
    }

    // How can we know in which direction to step w/in the loop?
    return rangeArray;

}
// PERFORM


// PERFECT

function range (start, end, step) {


    var rangeArray = [];

    if (start < end) {
      // needs to be ==, not === ;; null === undefined returns false
      if (step == null) {
        step = 1;
      }

      for (var i = start; i <= end; i += step) {
        rangeArray.push(i);
      }
    } else {

      if (step == null) {
        step = -1;
      }

      for (var i = start; i >= end; i+= step) {
        rangeArray.push(i);
      }
    }

    return rangeArray;

}

// VERSION W/ START AND END = CASE


function range (start, end, step) {


    var rangeArray = [];

    if (start === end) {
        console.log("No range. The start and end values are equal")
        return start;
    } else if (start < end) {
        if (step == null) {
          step = 1;
        }

        for (var i = start; i <= end; i += step) {
          rangeArray.push(i);
        }
    } else {

        if (step == null) {
          step = -1;
        }

        for (var i = start; start >= end; i+= step) {
          rangeArray.push(i);
        }
    }

    return rangeArray;
}


// INTERESTINGLY
do {
   rangeArray.push(start);
   start+= step;
 } while (start % end === start || start % end !== start)

 WHEN DIVIDEND IS LESS THAN DIVISOR, MODULO RETURNS DIVIDEND
