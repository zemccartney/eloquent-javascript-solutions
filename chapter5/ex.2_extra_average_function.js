

// input: set of numbers
// output: computation of average

// how do you compute an average?
// sum all the numbers in the set
// then, divide the sum by the number of members of the set

function sum ( ) {
  // this doesn't work b/c it doesn't handle an array
  var sum = 0;

  for (var i = 0; i < arguments.length; i++) {
    // what does Number("5") return?
    if (Number(arguments[i]) != "number" && arguments[i] !== NaN) {
      console.log("Value at " + + "th index isn't a number; omitted from calculation");
      break; // right? this works?
    } else if (typeof() == "array") {
    } else {
      // which is preferable? += or =+? What are the implications of this?
      sum =+ arguments[i];
    }
  }

  return sum;
}

function sum (array) {
  return array.reduce( function (reduction, nextVal) {
    // function passed to reduce has to return something to outer function so it
    // can keep combining
    return reduction += nextVal;
    // This works, but I think demonstrates you didn't quite get how the function
    // passed to reduce works
    // it produces the value to which the reduction value is then set
    // as in, you're assigning this function's return value to the reduction tracker
    // when you redefine the variable reduction, nothing bad happens, function still works
    // as expected, but suggests that you thought that this function...that the variable reduction
    // was used elsewhere, outside the function...sorta?
    // That calculation is what's actually happening
    // But you're effectively writing: reduction = reduction += nextVal
    // because when that value is returned, it's assigned to the variable that, while
    // external to this function's scope, represents what you meant by the variable name
    // "reduction" i.e. a variable that represents the current state of the array's reduction
  });
}


function average (set) {
  // sum all the numbers in the set
  return sum(set) / set.length;

  // divide the sum by the number of members in the set
}



// BOOK'S VERSION
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

RESULTS
- you did the same thing as the book, except you broke sum into a separate function,
whereas the book defines the plus function and reduction within the average function
- this seems ironic, given that, at the beginning of the chapter, the author argues
that a less-abstract, more code, less words / descriptive code is harder to understand,
more likely to contain mistakes? but also, he argued previously that there's no need
to get clever unless you have to????
