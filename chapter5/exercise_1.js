TITLE: Flattening


SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

var arrayOfArrays = [[1, 2, 3], [4, 5], [6]];

arrayOfArrays.reduce( function(x,y) {
  return x.concat(y);
} );

// reduce's callback operates on the current accumulator and next index, then returns
// it to the accumulator

RESULTS
- did not call it within console.log, not sure how you got your tests to pass
- please use more descriptive variable names; you are writing for other people, to communicate with others
- otherwise, matched book exactly in structure except for one detail
  - book set initial value to []
  - Why?
      - I believe because setting the initial value allows this function to work in the case
      where the first value isn't an array, but a single value; that case would fail w/o the
      initial value of [] because number's don't have a concat method, so calling that method
      on the bare number throws a type error

EXPERIMENTED VERSION
// Flattens 3 dimensions of arrays; but not more than 3; how could we flatten regardless of dimension?
console.log(arrays.reduce(function (flattenedArray, currentValue) {
  // we assume all items in top level array are arrays
  if (currentValue.some(function (i) { return Object.getPrototypeOf(i) == Array.prototype; })) {
    currentValue = currentValue.reduce(function(x,y) {
      return x.concat(y);
    }, [])
  }
  return flattenedArray.concat(currentValue);
}, []));


V2 FLATTENS REGARDLESS OF DIMENSION

// reduce an array of arrays
// if an inner array contains an array, flatten that
// so on and so forth, theoretically infinitely
// thinking: wrap program in reduce, then call a separate function, reduceMultiDimensional, recursively
// within that reduction?

// ORIGINAL VERSION
function flattenMulti (array) {
  array.forEach(function(element,index) {
    if (isArray(element)) {

      // FAILS HERE because this line ends up calling a function that requires an array
      // multiDimensionalArray, on a non-array value; that function calls some on the given value
      if element.some(isMultiDimensionalArray) {
        array[index] = flattenMulti(element);
      }
    }
  });

  flattenArray(array);
}

// CORRECTED VERSION
function flattenArray (array) {
  return array.reduce(function(accumulator, current) {
    return accumulator.concat(current);
  }, []);
}

function isArray (array) {
  return Object.getPrototypeOf(array) == Array.prototype;
}

function isMultiDimensionalArray (array) {
  return array.some(isArray);
}

// doesn't work b/c isMulti is called on non-array values
function flattenMulti (array) {
  array.forEach(function(element,index) {
    if (isArray(element)) {
      if (isMultiDimensionalArray(element)) {
        array[index] = flattenMulti(element);
      }
    }
  });

  return flattenArray(array);
}


V3 Converting to a string, then back again
// is there a super weasely way to do this where you output the whole thing as a string,
// then strip out the brackets, then convert back to an array?
// This produces the same end result as flatten and flattenMulti, but only for number and string
// values; for example, for Boolean values, the final array contains Boolean strings e.g. "true", not true

// converts the arrays to a string, then back to an array, split at each comman
// , which marks the start of the original arrays indices
var weaselString = arrays.toString().split(",");

// convert any numeric values back to numbers
// toString had converted them into strings
weaselString.forEach(function(element, index) {
  if (!isNaN(Number(element)) )
    weaselString[index] = Number(element);
});

console.log(weaselString);


Try this?
http://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index

// PREPARE

/*
Use the reduce method in combination with the concat method to “flatten” an
array of arrays into a single array that has all the elements of the input arrays.
*/

// DESIRED OUTPUT: a single array that has all the elements of the input arrays

// PLAN

// use the reduce method
// input = an array of arrays

var arrayOfArrays = [[1, 2, 3], [4, 5], [6]];

// reduce arguments are function to use to combine values and starting value
// if starting value is omitted, it's set to array[1], with the current value
// set to array[0]
// basically, reduce moves through the array by evaluating the next index against
// a sought after end result using some sort of computation...
// this still isn't clear

arrayOfArrays.reduce( function(x,y) {
  return x.concat(y);
} );

- for each index in the array, starting at the 1st, with the 0th index used as the
starting tracking value
    - we take the tracking value and the next index and perform some computation on them
    with an eye toward achieving some final, summary output, a single value derived from
    the array
    - once that computation is complete, we use the result and perform the same computation
    with the subsequent array index
    - this implies that the computation result and values stored in the array have to be
    compatible? computable?


// PERFORM


// PERFECT


// What if the arrays were multi-dimensional?

var arrayOfArrays = [[1, [2, 3]], [4, 5,[7,8,9]], [6]];

// point of function is, regardless of number of arrays, flatten into a single array
// how do you check if something is an array?

// I need to know if any arrays exist w/in any of the top-level arrays
// I need to know when I reach an array that's solely unitary values, not structural ones (right terminology?)
// When that happens, I know I can start concatenating

reduce crawls an array
while crawling, if you encounter an array, then you know you need to flatten that as well

function flatten (x,y) {
  return x.concat(y);
}

arrays.reduce(function (x,y, i) {
  // you don't know if x or y is an array
  // check x only if it's at index 0, which is the only case in which the accumulator could contain additional arrays
  // otherwise, always check y, the subsequent index
  // by setting the initial value to an array, you know
}, []);

// what if inner function encounters a 3rd dimension array that contains an array not at its first?
// Doesn't matter; call reduce again, with same initial value

// if array in an array, reduce again

// recursive = regardless loop?
// for, while = deterministic loop?

arrays.reduce(function (flattenedArray, currentValue) {
  // we assume all items in top level array are arrays
  if (currentValue.some(function (i) { return Object.getPrototypeOf(i) == Array.prototype; }) {
    currentValue = currentValue.reduce(function(x,y) {
      return x.concat(y);
    }, [])
  }
  return flattenedArray.concat(currentValue);
}, [])


arrayOfArrays.reduce( function(x,y) {
  if (y.some(Object.getPrototypeOf() == Array.prototype)) {
    y = y.reduce(function(x,))
  }
  return x.concat(y);
} );

// index still containing an array, now


[[1, [2, 3]], [4, 5,[7,8,9]], [6]];









I want to crunch this array down to a single array, flatten it
I dive into this array
