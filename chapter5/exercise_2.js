TITLE: Mother-child age difference


SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

// predefined
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

// predefined
var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

var ancestryArray = JSON.parse(ANCESTRY_FILE);
console.log(average(ancestryArray
        .filter(function(person) { return person.mother in byName; })
        .map( function ChildMotherAgeDiff (person) { return person.born - byName[person.mother].born; })));

RESULTS
- structurally / semantically / conceptually (???) the same
- he stored the new array in a variable, then logged it, instead of logging the entire operation
    - the difference there, I think, is that mine just produces a side-effect whereas the book solution
    produces a new value, which is generally more useful
- book filter test function was different
    - tested if the lookup of the property name of the mother's name in the object returned an actual value
    or undefined (!= null returns false only for null or undefined; otherwise, check returns true i.e. people who
      have mothers that exist as objects in the data set)
      - What is the difference between these? Is one preferable over the other? Ask stack overflow?
- learned from hints: good idea to name functions passed to filter, map, etc. to make code more readable
    - i.e. DESCRIBE WHAT ACTIONS YOUR ARE TAKING SO YOUR CODE COMMUNICATES WHAT THE UNINTERESTING IMPLEMENTATION
    DETAILS ARE INTENDED TO DO
    - so, he labels the filter function as hasKnownMother


EXPERIMENTATIION:

V1 — Read hints, implemented suggestion to map, then filter, rather than filter then map
console.log(average(ancestry
        .map( function ChildMotherAgeDiff (person) {
          if (byName[person.mother] != null)
            { return person.born - byName[person.mother].born }
          else
            {
              return null;
            }
        })
        .filter(function hasKnownMother (person) { return person != null; })
        ));


// PREPARE

/*
Using the example data set from this chapter, compute the average age difference
between mothers and children (the age of the mother when the child is born).
You can use the average function defined earlier in this chapter.
*/

/* To answer: On average, how much older than their children are th mothers in this
data set?
*/

/*
Note that not all the mothers mentioned in the data are themselves present in
the array. The byName object, which makes it easy to find a person’s object from
their name, might be useful here.
*/


// PLAN


// calculate average difference between every mother and child pair

// I need every mother and child pair

// Calculate mother-child age difference i.e. how long a mother had been alive before
// their child was born

// What if the data had 2 people with the same mother?
// it wouldn't matter because that mother would have an age in both those cases, i.e. a data
// point to factor into the average. Every child means a computation



// FILTER DEFINITION: Create an array of each value that, when passed to the given function,
// , a frozen chunk of program, a waterfall stone to fill a gap in thought, unfrozen
// expeditiously to resolve the momentary tension and pause and freefall, produces true


// FIRST ATTEMPT
average(array.filter(function() { return person.mother in byName; }).map( function ChildMotherAgeDiff () { return person.born - person.mother.born; }));

// This didn't work, produced an array of NaNs because the map function returned NaNs
// because with the internal function, you are substracting undefined from a number
// because you're calling for a non-existent property on a string in that calculation's second operand
// because you didn't realize that person.mother produces a name, a string, not another object
// you had assumed person.mother produces an object and that you could, then, call for its
// born property


// Decide which mothers to do this with — how? if a mother is in the object
if (person.mother in byName) {

  // This step must create an array
  ageDiffArray.push( person.born - person.mother.born );

}





// Average mother-child age difference
// To do this, you must structure the data in an array because reduce acts on an array


// for example philibert
// we know we can calculate mother-child age diff becauses


// PERFORM


// PERFECT
