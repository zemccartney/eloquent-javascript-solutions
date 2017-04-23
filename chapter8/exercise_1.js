TITLE: Primitive Multiply

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

function MultiplicatorUnitFailure(message) {
	this.message = message;
}

MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);

function reliableMultiply(a, b) {
  for ( ;; ) {
    try {
        return primitiveMultiply(a, b);
    } catch (error) {
        if (!(error instanceof MultiplicatorUnitFailure)) {
          throw error;
        }
        console.log("Multiplication failure; trying again now");
    }
  }
}


RESULTS

EXPERIMENTATION



// PREPARE

/*
Say you have a function primitiveMultiply that, in 50 percent of cases, multiplies
two numbers, and in the other 50 percent, raises an exception of type MultiplicatorUnitFailure.

Write a function that wraps this clunky function (FUNCTION'S CALLER) and
just keeps trying until a call succeeds, after which it returns the result.

Make sure you handle only the exceptions you are trying to handle.
*/


// PLAN
// Write a function that wraps this clunky function (FUNCTION'S CALLER)

function reliableMultiply(a, b) {
  // and just keeps trying ... which means loops, stopping only if no exception thrown by call
  for ( ;; ) {
    try {
      // after which it returns the result .. what does the called function produce?
        return primitiveMultiply(a, b);
    } catch (error) {
      // Make sure you handle only the exceptions you are trying to handle.
        if (!(error instanceof MultiplicatorUnitFailure)) {
          throw error;
        }
        console.log("Multiplication failure; trying again now");
    }
  }
}

// raises an exception of type MultiplicatorUnitFailure. .. currently not defined, but we need this to be an error?
function MultiplicatorUnitFailure(message) {
	this.message = message;
}

// we want this to be an error so that a.) we can inspect it and b.) if it were thrown to the top of the stack,
// it would do something helpful in diagnosing the issue, not just read as [object Object]
MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);

// PERFORM


// PERFECT
