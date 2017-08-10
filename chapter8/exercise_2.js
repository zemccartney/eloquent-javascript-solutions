TITLE: The Locked Box

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)
function withBoxUnlocked (unlockFunction) {

    var lockedAtStart = false;
    // if box is locked at the start
    if (box.locked) {
        // then remember that
        lockedAtStart = true;
        // unlock the box
        box.unlock();
    }

    try {
        unlockFunction();

    } finally {
        // lock the box only if it was unlocked at the start
        // finally so this happens no matter what
        // we handle the box locking regardless of the outcome of the unlockFunction
        // use finally when you later steps have to happen and are not contingent on earlier outcomes (but errors would result if earlier outcomes are exceptions that disrupt execution)
        if (lockedAtStart) {
            box.lock();
        }
    }
}



////// BOOK SOLUTION
function withBoxUnlocked(body) {
  var locked = box.locked;

  // if box is unlocked, just run the function
  // NO NEED TO CONDITIONALIZE LOCKING, JUST DON'T EVEN DO IT
  if (!locked)
    return body();

  // Unlocking reached only if box was locked at the start
  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}

RESULTS

- My solution was similar to book, but not nearly as elegant
- WHAT CAN YOU LEARN?

EXPERIMENTATION



// PREPARE
/*
It is a box with a lock. Inside is an array, but you can get at it only when the
box is unlocked. Directly accessing the _content property is not allowed.NOT TECHNICALLY,
JUST FOR THE SAKE OF THE EXERCISE

Write a function called withBoxUnlocked that takes a function value as argument,
unlocks the box, runs the function, and then ensures that the box is locked again
before returning, regardless of whether the argument function returned normally
or threw an exception.

For extra points, make sure that if you call withBoxUnlocked when the box is already
unlocked, the box stays unlocked.

*/

// The following scenario
withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked);
// should yield Error raised: Error: Pirates on the horizon! Abort!
// true
// if you get the content, then you should see ["gold piece"]


// PLAN

// Write a function called withBoxUnlocked that takes a function value as argument
//For extra points, make sure that if you call withBoxUnlocked when the box is already
// unlocked, the box stays unlocked.
function withBoxUnlocked (unlockFunction) {
  //unlocks the box
  var lockedAtStart = false;
  if (box.locked) {
    box.unlock();
    lockedAtStart = true;
  }
  // runs the function
  try {
    // should I return or not?
    // No, b/c we want to keep this interaction as private as possible
    // we don't want anyone else to know how we changed the box (expose the action to the
    // outer scope); we want to keep that internally, then return the locked box
    // we do our business with the locked box, then lock it, then carry on
    unlockFunction();
  } finally {
    // and then ensures that the box is locked again before returning,
    // regardless of whether the argument function returned normally or threw an exception

    // true only if boxed.lock was true at the start, when the function was called
    if (lockedAtStart)
      box.lock();
  }
}


// PERFORM


// PERFECT
