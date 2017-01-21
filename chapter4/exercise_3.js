RESULTS
- arrayToList: you used recursion when you did not have to i.e. you knew when the sequence would end enough
to codify it (array.length)
     - had similar conceptual structure: for each iteration, set value, then nest
         - for recursive, I nested downward
         - for the for loop, book nested upward (progressively encapsulated, starting w/ end of list)

- listToArray: ridiculously overcomplicated; once again, used recursion when I did not have to
    - what can you learn from this about recursion vs. for loops?
    - book solution was crazy eloquent, humblingly beautiful and simple
        - do not sweat it, you will get there

- nth: got all the components right, at least was very close in composition
    - but diverged in structure: book placed check if list parameter had a real value at the start of the if/else chain
    - also, book phrased that check much more eloquently !list vs. my complicated statement
        - Try to start thinking out programs in words, what you are saying by writing
        any given line of code? Think aloud through problems? If you can speak something, then
        you can think it clearly enough to start to write; if you can write something clearly, then you are
        thinking it clearly


- prepend: same in content, except book did NOT bother assigning new list to a variable
because that step is NOT needed because you do not further manipulate the data
    - it is a single operation before returning
    - so, just do the operation in the return statement
    - not feeling like this is clicking just yet...
    - return means: this is the completed requested product
        - function represents a request???
        - your variable assignment was unnecessary; not wrong, just a verbosity
        - goal is to be eloquent? the simpler you can express yourself, the easier to
        debug?
        - WHY IS IT GOOD TO CUT OUT VARIABLE ASSIGNMENT? IS IT?
        - I don't understand the tradeoffs here
        - SEE INTRODUCTORY STATEMENTS OF CHAPTER 5






// PREPARE

/*
Write a function arrayToList that builds up a data structure like the previous
one when given [1, 2, 3] as argument, and write a listToArray function that produces
an array from a list. Also write the helper functions prepend, which takes an element
and a list and creates a new list that adds the element to the front of the input list, and nth,
which takes a list and a number and returns the element at the given position in
the list, or undefined when there is no such element.


*/


// write a listToArray function that produces an array from a list



// PLAN

function arrayToList (givenArray) {

/*
  for each index in the array,
  - create a new object
  - set the object value property to current array index value
  - set rest property to a new object if there are remaining values or null if not
*/

  var newList = {
    value: givenArray.shift(),
    rest: givenArray.length > 0 ? arrayToList(givenArray) : null
  }

  return newList;

}

//test case: givenArray = [1,2,3] produces {value: 1, rest: {value: 2, rest {value: 3, rest: null}}}

function listToArray (givenList) {

  var producedArray = [];

// if givenList returns a value, which we know is true as long as it holds an object i.e. not null
//, we should add the object's value value to the array
  if (givenList.rest) {
    producedArray.push(givenList.value);
    listToArray(givenList.rest);
  } else {
    // produces array from list means creates new structure, not modifies existing?
    return producedArray;
  }


/*
  - set index to value property value
  - access next object nested
  - stop when rest is null
*/



}

// which takes an element and a list and creates a new list that adds the element
// to the front of the input list
function prepend (element, existingList) {

  var newList = {
    value: element,
    rest: existingList;
  }

  return newList;
}


// which takes a list and a number and returns the element at the given position in
// the list, or undefined when there is no such element
function nth (listExplored, listPositionNumber) {

  // to what does position number correspond? Number of nestings in the list
  // starting at 0 or 1? O
  // everytime you go access a rest value i.e. access a nested object, go a layer deeper in the list
  // you're going 1 position farther


  if (listPositionNumber === 0) {
    // WHAT DO YOU DO WHEN YOU FIND THE POSITION NUMBER
    // When your position tracker has reached zero, you know you have reached your position
    // the object whose element you wanted.
    // So, you grab that element and return it
    return listExplored.value;

    // if you still have positions to explore and the current list viewed's rest property
    // is null, meaning you've reached the end of the list, then you know that the list doesn't extend as far
    // as the position given, so you know you can return undefined.
  } else if (listPositionNumber >= 0 && listExplored.rest === null) {
    return undefined;
  } else {
    // you decrement the position number every time you go within a subsequent nest
    // as a way of tracking your progress
    nth(listExplored.rest, listPositionNumber--);
  }

}

// PERFORM

function arrayToList (givenArray) {

  var newList = {
    value: givenArray.shift(),
    rest: givenArray.length > 0 ? arrayToList(givenArray) : null
  }

  return newList;

}

// THIS DOESN'T WORK FOR SEVERAL REASONS
function listToArray (givenList) {
  // WITH EACH RECURSIVE FUNCTION CALL, YOU RESET THE ARRAY
  var producedArray = [];

  if (givenList.rest) {
    // BY USING THE VALUE OF THE REST PROPERTY TO DECIDE TO DO THIS
    // YOU MAKE YOURSELF NOT DO SO WHEN REST IS NULL.
    // YOU STILL NEED TO PUSH WHEN REST IS NULL; IT'S JUST THAT YOU NEED TO
    // STOP RIGHT AFTER
    producedArray.push(givenList.value);

    // Right idea, but when the recursion reaches its end, the else causes it
    // to coil back up, but once it reaches the top, the function can't return anything
    // it just reaches the end of this if/else branch and ends
    listToArray(givenList.rest);
  } else {
    return producedArray;
  }

}

// CORRECTED VERSION
function listToArray (givenList, checkedArray) {

  var producedArray = checkedArray || [];
  producedArray.push(givenList.value);

  if (givenList.rest) {

    listToArray(givenList.rest, producedArray);
    return producedArray;

  } else {

    return producedArray;
  }

}

function prepend (element, existingList) {

  var newList = {
    value: element,
    rest: existingList;
  }

  return newList;
}


// THIS RETURNED UNDEFINED FOR THE TEST CASE
function nth (listExplored, listPositionNumber) {

  if (listPositionNumber === 0) {
    return listExplored.value;
  } else if (listPositionNumber > 0 && listExplored.rest === null) {
    return undefined;
  } else {
    // THIS DIDN'T WORK BECAUSE THE VALUE CHECKED WASN'T ACTUALLY BEING DECREMENTED
    // IT WAS BEING RETURNED AND USED IN THE LOWER FUNCTION SCOPE, DECREMENTED ONLY IN
    // THE PRIOR SCOPE, TO WHICH THE CURRENT, LOWER SCOPE DIDN'T HAVE ACCESS
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators
    // describes how the position of the decrement and increment operators — before or after —
    // alters how they work... fuck
    return nth(listExplored.rest, listPositionNumber--);
  }

}

// CORRECTED VERSION
function nth (listExplored, listPositionNumber) {

  if (listPositionNumber === 0) {
    return listExplored.value;
  } else if (listPositionNumber > 0 && listExplored.rest == null) {
    return undefined;
  } else {
    return nth(listExplored.rest, --listPositionNumber);
  }

}



{value: 10, rest: {value: 20, rest: null}}, 1 RETURNS undefined

// PERFECT
