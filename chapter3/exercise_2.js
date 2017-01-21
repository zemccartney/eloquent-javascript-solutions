// Prepare

/* Desired

- takes a positive whole number
- returns a Boolean indicating whether or not the number is even
- We're deciding whether the input is even or odd
- We evaluate with these criteria
    - 0 is even
    - 1 is odd
    - For any other number N, its evenness is the same as N - 2

*/

/*  Current

How do we return a boolean? What are we evaluating? evenness
judged with criteria above



*/



// PLAN

// Take number

function isEven (number) {

// Check if even or odd with given terms

// Convert to positive
  if (number < 0) {
    number *= -1;
  }


  if (number === 1) {
// Return a boolean signifying the result of that check
    return false;
  } else if (number === 0) {
    return true;
  } else {
    // Do something else if undecidable with terms outlined above
    return isEven(number - 2);
  }

}


// This appears to work; so why should I write this using recursion, rather than a loop?
function isEven (number) {

  if (number < 0) {
    number *= -1;
  }

  for (; number > 1; ) {
    number-=2;
  }
    // do nothing

  if (number === 1) {
    // Return a boolean signifying the result of that check
    return false;
  } else if (number === 0) {
    return true;
  }
}



RESULT
- Had most of the if / else statement right
- In fact, had it right
- How I turned the number negative worked, but was not nearly as elegant as his example
else if (n < 0)
    return isEven(-n);
- God damnit; that is so so cool 

- STILL DO NOT UNDERSTAND; WHY DO YOU USE RECURSION?


// FIRST TRY
// Fails w/ negative #s; error = RangeError: Maximum call stack size exceeded (line 2 in function isEven) …
// Why?
// Because the function recurrs by subtracting from its parameter, stopping when it reaches 0 or 1
// Negative #s will NEVER reach 0 or 1 by subtraction
// How can you reach 1 or 0 given a negative #?

// convert to postive
// add
// multiply
