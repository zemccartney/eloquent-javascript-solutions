TITLE: Primitive Multiply

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

function MultiplicatorUnitFailure(message) {
	this.message = message;
}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
		// only new part is adding message to the error so something useful is displayed if the error is read
    throw new MultiplicatorUnitFailure("Primitivity strikes again");
}

MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);

function reliableMultiply(a, b) {
	// infinite loop
  for ( ;; ) {
		// tries primitive multiply
    try {
				// if this succeeds, then the return statement fully executes and
				// brings us outside the loop
        return primitiveMultiply(a, b);
			// if it fails, deal with the error by either exploding if not a primitive multiply error (custom type)
			// or just logging and starting a new iteration of the loop
    } catch (error) {
        if (!(error instanceof MultiplicatorUnitFailure)) {
          throw error;
        }
        console.log("Multiplication failure; trying again now");
    }
  }
}


RESULTS

Differences from book
- no logging statement
- error variable named e for short

Otherwise, exactly the same

EXPERIMENTATION

Tried adding the following

var test = new NestedMultiplyError();
// Both return true
console.log(test instanceof MultiplicatorUnitFailure);
console.log(test instanceof NestedMultiplyError);

function NestedMultiplyError(message) {
	this.message = message;
}
NestedMultiplyError.prototype = Object.create(MultiplicatorUnitFailure.prototype);

// w/in PrimitiveMultiply
throw new NestedMultiplyError("Primitivity strikes again");

// I just recently learned that instanceof doesn't test if the object
// is of the given type, but if the given object has the given type in its
// prototype chain
// So instanceof is saying: is this object somehow related to the given type (constructor)?
// NOT: is this object the given type?

// TODO Review
// - [ ] how prototype function and property relate / differ
// - [ ] What does getPrototypeOf do?


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
