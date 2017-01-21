// Part 1: Write a program that uses console.log to print all the numbers from
// 1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz"
// instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.

// Prepare
// Currently, need to do the above b/c it's a practice problem; but I don't know
//  how to print all #s from 1 to 100
//  how to identify an exception
// how to handle those exceptions as specified
// Desired
//    see practice problem

// PLAN

// for all numbers, print the number
// you have data given: #s 1 to 100
// you're approaching: you're going through that data until you reach 100, then proceeding
// SO, LOOP!

// Exceptions: if they satisfy the CONDITION: divisible by 3
// which we formulate with the modulo: % 3 OR % 5

// How do you formulate both?
// If two conditions hold: &&


// This doesn't work; I dunno why... getting this error:
for (var countTo100 = 1; countTo100 <= 100; countTo100++) {
  switch (countTo100)
    case countTo100 % 3 = 0
      console.log("Fizz");
      continue;
    case countTo100 % 5 = 0
      console.log("Buzz");
      continue;
    default
      console.log(countTo100);
}

// Simple version
for (var countTo100 = 1; countTo100 <= 100; countTo100++) {
  if (countTo100 % 3 == 0 && countTo100 % 5 == 0) {
    console.log("FizzBuzz")
  } else if (countTo100 % 3 == 0) {
    console.log("Fizz");
  } else if (countTo100 % 5 == 0) {
    console.log("Buzz");
  } else {
    console.log(countTo100);
  }
}

RESULT
- got my ass whooped; book solution far more beautiful
- learned: I repeated myself a lot!
    - and in 2 ways! console.log calls AND repeating Fizz and Buzz as part of Fizz Buzz
    - it is additive! Meeting each condition adds to what you say in the
    the end
- absolutely stupendous use of logical operator short circuiting
    - output of OR is the first if it is true, the second if it is false
    - so, when deciding between two options, think about how you could
    detect if one is true. For the user-generated / custom, place it as the true value
        For the default, place it as the false.

// With ternary operator
for (var countTo100 = 1; countTo100 <= 100; countTo100++) {
  if (countTo100 % 3 == 0 || countTo100 % 5 == 0 ) {
    countTo100 % 3 == 0 ? console.log("Fizz") : console.log("Buzz");
  } else {
    console.log(countTo100);
  }
}


for (var countTo100 = 1; countTo100 <= 100; countTo100++) {
  if (countTo100 % 3 == 0 || countTo100 % 5 == 0 ) {
    countTo100 % 3 == 0 && countTo100 % 5 == 0 ? console.log("FizzBuzz") : ( countTo100 % 3 == 0 ? console.log("Fizz") : console.log("Buzz"));
  } else {
    console.log(countTo100);
  }
}




/*
For the clever method, build up a string containing the word or words to output,
 and print either this word or the number if there is no word, potentially
 by making elegant use of the || operator.
 */

for (var = countTo100 = 1, fizzBuzz = "", stringToPrint = ""; countTo100 <= 100; countTo100++) {
  fizzBuzz = "";
  if (countTo100 % 3 == 0) {
    fizzBuzz += "Fizz"
  }
  if (countTo100 % 5 == 0) {
    fizzBuzz += "Buzz";
  }
  stringToPrint = fizzBuzz || countTo100;
  console.log(stringToPrint);
}
