/* PREPARE
Write a function countBs that takes a string as its only argument and returns a
number that indicates how many uppercase “B” characters are in the string.

parameter is a string

Desired:
For example, when I say this: console.log(countBs("BBC"));
The computer responds with 2

Sounds like
- you need to know if each character matches the one sought; "B"
    - How do you do that?

- you need to know what to do with the information from that check
    - Sounds like increment some sort of counter representing the number of matches found

- you need to know when to stop
    - How do you know how long the provided string is?
    - How do you know when you've reached its end?


*/

/* PLAN

- use charAt to pull out letters individually, incrementing int passed to charAt until you reach the string end
- increment a counter representing matches found
- for loop inside the function, in which you declare the counter variable
- what you increment after each loop is....charAt param?
*/

function countBs (stringParam) {

  var bCounter = 0;

// Yes, less than is correct because indexing starts from 0
// OR:  The first character has position zero, which causes the last one to be found at position string.length - 1
  for (var position = 0; position < stringParam.length; position++) {

    if (stringParam.charAt(position) === "B") {
      bCounter++;
    }

  }

  return bCounter;

}


// Rewrite countBs to make use of this new function
function countChar (stringParam, characterCounted) {

  var charCounter = 0;

  for (var position = 0; position < stringParam.length; position++) {

    if (stringParam.charAt(position) === characterCounted) {
      charCounter++;
    }

  }

  return charCounter;
}


// YOU MISUNDERSTOOD, I THINK; THE ABOVE HAS TO WORK WITHIN COUNTBS


function countBs (stringParam) {

  return countChar(stringParam, "B");

}

RESULTS
- Realized on peaking at the solution that I had misread the instructions
- Then, I rewrote countBs to use countChar within
- That rewrite and my definition of countChar matched the book exactly
