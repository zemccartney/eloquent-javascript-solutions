TITLE: Every and then some

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

function every (array, predicateFunction) {

  var decision;
  for (var index = 0; index < array.length; index++) {
    decision = predicateFunction(array[index]);

    console.log(decision);
    if (!decision)
      return false;
  }

  return true;
}


function some (array, predicateFunction) {

  var decision;
  for (var index = 0; index < array.length; index++) {
    decision = predicateFunction(array[index]);
    console.log(decision);

    if (decision)
      return true;
  }

  return false;
}

RESULTS

- Opposite of observation from previous 2 problems
- I created a variable to store function result, then checked variable with if statement
- Book just checked function result directly
- Question of simplicity? For simple functions, checking directly ok; for complex functions,
store results for clarity???


// PREPARE

/*
Arrays also come with the standard methods every and some. Both take a predicate
function that, when called with an array element [THE ARRAY ON WHICH THE METHOD IS CALLED]
as argument, returns true or false.

 Just like && returns a true value only when the expressions on both sides are true,
 every returns true only when the predicate returns true for all elements of the
 array. Similarly, some returns true as soon as the predicate returns true for any
 of the elements.

 They do not process more elements than necessary—for example,
 if some finds that the predicate holds for the first element of the array, it
 will not look at the values after that.
 [ AND IF EVERY PREDICATE RETURNS FALSE AT ANY POINT, IT WILL NOT LOOK FOR VALUES AFTER THAT]
 [ BASICALLY FILTER, EXCEPT NO ARRAY IS CREATED, ELEMENTS ARE JUST TESTED]

Write two functions, every and some, that behave like these methods, except that
they take the array as their first argument rather than being a method.
*/

// PLAN

function every (array, predicateFunction) {
  // I accept an array
  // then, I process each element in the array
  // I take {{ some action }} on each array element
  // THAT'S WHY BOOK CALLS IT PREDICATE FUNCTION: PREDICATE defined as "the part
  // of a sentence or clause containing a verb and stating something about the subject
  // (e.g., went home in John went home )." this function describes the verb taken on the subject (the array)

  // do it once
  // check the return value
  // decide to continue or stop
  var decision;
  for (var index = 0; index < array.length; index++) {
    decision = predicateFunction(array[index]);

    // If I see the predicate returns false, I stop
    if (!decision)
      return false;
  }

  // I need to be able to check the returned value of each predicate function call
  // to decide if I keep processing or stop and return the stop truth value



  return true;

}


function some (array, predicateFunction) {

  var decision;
  for (var index = 0; index < array.length; index++) {
    decision = predicateFunction(array[index]);

    // If I see the predicate returns true, I stop
    if (decision)
      return true;
  }


  return false;

}


// PERFORM


// PERFECT
