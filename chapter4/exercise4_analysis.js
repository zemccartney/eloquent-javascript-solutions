function deepEqual (val1, val2) {

// it seems I overcomplicated things?


// if it's true that either value is not an object and not null
// if either one is a real, non-object value
// I'm trying to say: do something only if we've verified that both arguments are
// non-null objects
// do something is dig into properties if arguments are objects

  if ((typeof(val1) == "object" && val1 !== null) && (typeof(val2) == "object"  && val2 !== null)) {

    for (var property in val1) {

      if (!(property in val2)) {
        return false;
      }
    }


    var truthCounter = [];

    for (var propVal in val1) {
      truthCounter.push(deepEqual(val1[propVal], val2[propVal]));
    }

    if (truthCounter.indexOf(false) == -1) {
      return true;
    } else {
      return false;
    }

  } else if (val1 === val2) {
    return true;
  } else {
    return false;
  }
}


// ANALYZED BOOK EXAMPLE

function deepEqual(a, b) {

// 1.) check if equal
- simplest case first; if we can directly compare values, then we can say the comparison is true definitively

  if (a === b) return true;


/* 2.) check if all things are the right type
 - if any are true, then return false
 - we know the comparison is false, that we can return false if either value is null OR either value is NOT an object type, which occurs for function values? any non-identical, non-object values i.e. if we know two values aren't identical (===) and we know that they're either null or non-objects, we can be certain they're not identical (unless they're functions?)
 */

  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object")
    return false;

// Book doesn't contain for loops w/in if statements

// create variables for ...
  var propsInA = 0, propsInB = 0;

// add 1 for every property in the first value
  for (var prop in a)
    propsInA += 1;

// same thing you did sans the +=1 and the deepEqual recursive call here
// but basically: if you know that a property in 1 isn't the other, OR that the properties exist in both, but their comparison returns false, then you know that the comparison is false
// fucking genius use of OR operator

  for (var prop in b) {
    propsInB += 1;
    if (!(prop in a) || !deepEqual(a[prop], b[prop]))
      return false;
  }
// you count to ensure that each object has the same number of values
// you don't necessarily know the number of properties in either object
// if you don't count, you hope you're lucky and that object b, which you're comparing to a, has the same or more properties, so it would produce a false value by overflowing a
// but just as probably, a could be longer, but you would never know because you could compare all of bs properties to a, get all true values, but still have non-equal objects because a has a value b doesn't have and has more values
// THAT IS: if you have 2 objects w/ the same number of properties and the comparisons of their values all return true, then you know the objects are deeply equal 

  return propsInA == propsInB;
}

// This fails w/ identical functions set as the value of compared properties?
