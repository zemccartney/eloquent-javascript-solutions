/*
Write a program that creates a string that represents an 8×8 grid, using newline
characters to separate lines. At each position of the grid there is either a
space or a “#” character. The characters should form a chess board.

Passing this string to console.log should show something like this:
*/

// Prepare - define the problem
// need to create a string
// newline characters for separate lines
// 8 by 8 grid
// each position is either empty OR "#" (logical operator, making a decision)
//      How do you make this decision?

// Plan

// Create the string

for (var chessBoard = "", characterChoice = true, lineCounter = 0, newLines = 0; newLines <= 7; characterChoice = !characterChoice) {

  chessBoard += (characterChoice ? " " : "#");
  lineCounter++;

  // You make the check after adding the character because a.) you avoid adding a new line
  // at the start, when chessBoard.length == 0, which is divisible by 8, but not the position
  // in the grid at which you want a new line  and b.) TODO is there a 2nd reason?
  // Why does this create a grid after the first line?
  // BECAUSE NEW LINES ARE CHARACTERS!! SO IT'S THROWING OFF YOUR MODULO CHECK
  // Output the string
  // Switched from checking chessBoard length to value of counter tallying the length of each line
  if (lineCounter % 8 == 0) {
    chessBoard += "\n";
    // this ensures that the same character selected starts the next line, achieving the
    // grid arrangement (same items offset by 1 grid unit from each other)
    characterChoice = !characterChoice;
    lineCounter = 0;
    // Talied newLines to get the accurate end length of the grid: grid isn't 64 characters long
    // it's 64 visible characters, along with an invisible newline character for each new line
    newLines++;
    // Why does this work for producing false but NOT for producing true?
  }

}

// TODO THIS IS CURRENTLY INCORRECT; PRODUCES 1 TOO MANY NEW LINES; NEW LINES SHOULD STOP AT 7
// FIXED: set loop check to check new lines value; which will be grid size - 1
console.log(chessBoard);


// PROBLEM
// On a new line, character decision continues in sequence from previous line
// Instead, what should happen: character decision should begin on reverse of previous line


// Try to refactor using string reversal
// https://medium.freecodecamp.com/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb#.gn0wpyysr

REFACTOR PLAN
need to loop through and create the line once
once the line is created, we decide whether to reverse exactly (even) or ... add a blank?? (odd)
the even/odd decision comes in the first loop block
but the line needs to be created only once, so can NOT be subject to additional LoopingJust one pass,
then loop through inverting, based on even/odd rules



// Two separate loops..? Or just, if even, after first line, run another loops that sets newLines to finish value
// Reverse the
// If size = odd, you need to do the same thing, but after 2 lines?

// If size = even

// Decide which character to place


 " " || "#"

// Decide when to add a new line
// WHEN DO YOU MAKE THIS CHECK?
// Once you've added a character
if string.length % 8 == 0
    += "\n"




// Decide when you're done — done condition: string = 8 by 8
// 64 characters long
// 7 newlines counter
// string length
// How could you set the condition to the actual structure expected? Or does
// copying-and-pasting the solution in defeat the purpose of doing this programmatically?




// PART 2
//When you have a program that generates this pattern, define a
//variable size = 8 and change the program so that it works for any size,
// outputting a grid of the given width and height.


// this var should produce the same output as the part 1 program
var size = 8;

// How do I ensure height works?
// height is defined by new lines (always desired height - 1)
// given that this is a square grid, height is always grid side - 1 (because
// new lines start only after 1st line)

// How do I ensure width works?
// Make sure new line decision is tied to desired width
// which, same as above, is tied to grid side, except is exactly grid side?
// but have to account for new lines
// NOPE! you decoupled line length from new lines by creating the lineCounter variable


// < comparison basically means: conidition holds for all cases up to and including n (comparator)- 1
// because newLines has to be 1 less than size to achieve proper height, comparison has to be less than
for (var chessBoard = "", characterChoice = true, lineCounter = 0, newLines = 0, size = 3; newLines < size; characterChoice = !characterChoice) {

  chessBoard += (characterChoice ? " " : "#");
  lineCounter++;

// Changed from module to equivalence; had used modulo because I assumed that the end
// of each line would be a multiple of the desired width, assuming I'd get that value from total string
// length; that assumption was wrong b/c of new lines
  if (lineCounter == size) {
    chessBoard += "\n";
    lineCounter = 0;
    newLines++;
    // To handle odd numbers properly
    // Without, odd size produces identical, not staggered rows for entire grid
    if (size % 2 === 0) {
      characterChoice = !characterChoice;
    }
  }

}

console.log(chessBoard);

// FUCK: THIS DOESN'T WORK FOR ODD NUMBERS; WHY? SOMETHING TO DO WITH CHARACTER COUNT
// SWITCHING? or linecounter
// Because with a size of even numbers. the final character on a line is the
// same as the first. This means that characterChoice's value is identical to the start
// so switching doesn't stagger, but keeps the same

// How do I ensure that, for odd numbers, the characterChoice value changes only once?


// How do you detect if something's odd?
( num % 2 == 0)
// That is, a number is even if it is divisible by 2



// REFACTORING BASED ON HINTS

for (var chessBoard = "", newLines = 0, size = 8; newLines < size; newLines++) {

  // this works! you're counting from zero
  for (var lineCounter = 0; lineCounter < size; lineCounter ++) {
    // Next time, remember your PEMDAS; modulo has same precedence as multiplication and division
    if ( ((lineCounter + newLines) % 2) == 0) {
      chessBoard+= " ";
    } else {
      chessBoard+= "#";
    }
  }

  chessBoard+="\n";
}

RESULT
- he did not place size and board within loop (because they are irrelevant
to the loop? loop is concerned only with counters, values changing)
    - board is being added to, but not being used to initialize or check condition of loop

- otherwise, matched book solution exactly

// What are the tradeoffs between the hinted solution and yours?
for (var chessBoard = "", characterChoice = true, lineCounter = 0, newLines = 0, size = 3; newLines < size; characterChoice = !characterChoice) {

  chessBoard += (characterChoice ? " " : "#");
  lineCounter++;

  if (lineCounter == size) {
    chessBoard += "\n";
    lineCounter = 0;
    newLines++;

    if (size % 2 === 0) {
      characterChoice = !characterChoice;
    }
  }

}

console.log(chessBoard);

// shit...beautiful
// What can you learn from this?
// About conditionals.... always define what conditions have to be met to make some
// decision. Then, figure out how those could be translated to Booleans using the
// values at hand. In this case, because the characters alternated, you could
// have known that 1 character would ALWAYS (predictably, pattern) be even and the
// other would always be odd. Then you ask: How can I tell if I'm on an even or
// odd position?
// The answer is the line # + the character # because if it were just the character #,
// every row would be the same
// HOWEVER, they're not the same, they're staggered i.e. off-by-one
// Which value increments by 1 each time? the newLine counter, so you can use it
// to calculate the STARTING POINT for each line and don't have to worry about
// double switching the boolean value as you initially did
