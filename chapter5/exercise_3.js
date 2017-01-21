TITLE: Historical life expectancy

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

function groupBy (array, categorize) {

  var grouped = {};

  array.forEach( function (element) {

    if (!(categorize(element) in grouped)) {
        grouped[categorize(element)] = [element];
    } else {
      grouped[categorize(element)].push(element);
    }

  });

  return grouped;

}

var groupedByCentury = groupBy(ancestry, function (person) {
  return Math.ceil(person.died / 100);
});

for (century in groupedByCentury) {
  // from each array, get just each person's age
  // that says map, because map means derive a single different value from each item in a set
  console.log(century + ": " + average(groupedByCentury[century].map(function (person) {
    return person.died - person.born;
  })));


}

// INCLUDING ROUNDING FUNCTION FROM JACK MOORE
for (century in groupedByCentury) {
  console.log(century + ": " + round((average(groupedByCentury[century].map(function (person) {
    return person.died - person.born;
  }))) , 1));
}
// ROUND takes a value and the number of decimal places to which you'd like to round

// PERFECT
- bicd this function: http://www.jacklmoore.com/notes/rounding-in-javascript/ to round
results to match # of decimal places in expected output given in problem
- learned that Math.round rounds to nearest integer, JS does not support rounding
to decimal places
- to address, the function from jack moore site:

function round(value, decimals) {
  return Number(
    // adds e to turn number into exponent notation
    // sets e to number of decimals desired
    // rounds that value to the nearest integer
        // 2 THINGS HAPPENS
        // 1. Number is resolved from exponential to integer notation
        // 2. Remaining decimal values are rounded away
    // Then, exponentiation is reversed to bring number back to original value, rounded to requested # of decimal places
        // 1. e- stringifies number into exponential notation, with negative exponents moving decimals left, not right
        // 2. decimals value appended to string e.g. 5495e-2
    // Number function does 2 things
        // 1. string converted to a number
        // 2. number converted from exponential to floating point e.g. 54.95
    Math.round(value+'e'+decimals)
    + 'e-' + decimals);
}


RESULTS

Aside from some stylistic differences, issues with clarity, my solution structurally
matched book solution almost exactly

  DIFFERENCES
  - within for each, created variable to store result of categorize function on current item
  THEN checked if variable were in groups object
      - whereas I did both at once
      - drawback of your solution is that it requires 2 function calls, instead of just 1 for the book's,
      with the value stored in the variable
      - also, clearer code? more abstract = less implementation details repeated = easier to read?
  - reversed order of if statement: or rather, positive version of the if
      - probably shoot to use positive, rather than negated, checks in if statements
      - at least I, anecdotally, find that I have to think a bit extra to mentally negate something
  - as in exercise 2, book stored result of a higher-order operation in a variable, then logged the variable
      - why? best guess is that this makes the code easier to read? easier to understand, which means less mistake-prone?
      - also, good practice to store values, not just dump them????



THOUGHT
// WHAT'S THIS PATTERN, TESTING FOR NEGATIVE / EXCLUSIVE CASE FIRST???? think only when you have to?
// adding to groups is the default unless other cases are met?
// if (!categorize(element) in grouped) {



// PREPARE

/*
When we looked up all the people in our data set that lived more than 90 years,
only the latest generation in the data came out. Let’s take a closer look at that phenomenon.

Compute
and output
the average age of the people in the ancestry data set per century.
A person is assigned to a century by taking their year of death, dividing it by 100,
and rounding it up, as in Math.ceil(person.died / 100).

// This means a person who lived 1820 - 1900 would be placed in the 20th century
even though most of their life is in the 18th

For bonus points, write a function groupBy that abstracts the grouping operation.
It should accept as arguments an array and a function that computes the group
for an element in the array and returns an object that maps group names to
arrays of group members.

// WHY? WHY ORGANIZED THIS WAY? HOW DO THE ARRAY AND THE FUNCTION RELATE?
*/


// Desired output
the average age of the people in the ancestry data set per century

// Data format
array of objects of people, no particular order or classification

// So, we need to decide

  // how to format categories
  centuries

  // how we categorize
  we look at life span data, born and died data points, to decide to which category
  to assign someone

  // how do we make the assignment decision?
  Math.ceil(person.died / 100) // NOTE: SUBJECTIVE TRUTH, A TERM IN OUR ARGUMENT
  // / CONCEPTUAL STRUCTURE...OUR PROGRAM HERE. truth doesn't extend beyond that
  // not that that's how people actually think about computer programs

  // what do we do based on this decision?
  - place a person within a category
  - surface the age of the person, as we are interested in calculating average age



// PLAN

// Compute average age

// People per century --> group people by a criterion
function groupBy (array, categorize) {

  // computes the group for an element in the array
  var grouped = {};

  array.forEach( function (element) {
    if (!categorize(element) in grouped) {
      // maps group names to arrays of group members
      // so what should be added to the group is an array containing this first
      // instance, the ENTIRE instance object
        grouped[categorize(element)] = [element];
    } else {
      grouped[categorize(element)].push(element);
    }

  })
  // categorize will return a value that will be used in an object property name)


  // you test each member in the array
  if ( categorize(array[i]) ) {

  }

  // so for example, to test a person's century group, you perform the given calculation

  // that computation returns a property name

  // you then check if that property name, a group in the object exists

  // if it does, add the latest member to the that group

  // if it doesn't, create the new group, then add the latest member to the group

  // returns an object that maps group names to arrays of group members.
  return grouped;



} );

function groupBy (array, categorize) {
  // how do we want to define groups?
  // what group should this be in? forEach element in the given array
  // we answer that by calling a function on each element in the given array
  // and performing some computation, frozen within the categorize function, that
  // returns the element's category
  // we then decide: do we create a new group or add to a preexisting?
  // we decide this because of how javascript objects work
  // to create a new property, we must assign it a value
  // if we just call it, the expression will return undefined and not create
  // the property
  var grouped = {};

  array.forEach( function (element) {
    // WHAT'S THIS PATTERN, TESTING FOR NEGATIVE / EXCLUSIVE CASE FIRST???? think only when you have to?
    // adding to groups is the default unless other cases are met?
    if (!categorize(element) in grouped) {
      // maps group names to arrays of group members
      // so what should be added to the group is an array containing this first
      // instance, the ENTIRE instance object
        grouped[categorize(element)] = [element];
    } else {
      grouped[categorize(element)].push(element);
    }

  })

  return grouped;

} );

MISTAKE
- if (!categorize(element) in grouped)
- this would return the opposite of what you want it to i.e. false for when a property did not
exist on grouped
- this is because you misunderstood the order of operations here:
1.) categorize(element) is called
2.) categorize(element) result is nullified, coerced to Boolean if not a boolean, false for all but "", 0, which
are false when converted to Boolean
3.) check if false is in grouped

- Instead, I wanted: 2 to come after 3, which would mean that if we check for the property
name presentce in grouped and that check returns false, then that false value will be switched to
true, so we will meet that condition, so we will then add the property name to the object

// PERFORM


// Achieved correct data structure from group by
// SO, WHAT DO I WANT TO DO KNOW
// I want to get to each array in the object, then calculate the average of the values there

// Compute and output the average age of the people in the ancestry data set per century.
// computing by group


for (var century in groupedByCentury) {
  // from each array, get just each person's age
  // that says map, because map means derive a single different value from each item in a set
  console.log(century + ": " + century.map(function (person) {
    return person.died - person.born;
  }));


}

// PERFECT
