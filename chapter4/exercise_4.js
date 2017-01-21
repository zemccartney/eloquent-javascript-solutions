RESULTS
- apparently, you do NOT need to wrap typeof arguments in parentheses; typeof 5 is valid, works as expected




// PREPARE
/*
Write a function, deepEqual, that takes two values and returns true only if they
are the same value or are objects with the same properties whose values are also
equal when compared with a recursive call to deepEqual.
*/

// PLAN

function deepEqual (val1, val2) {


  // check that both values are objects
  // we do a deep comparison only if they're both objects
  // which means this will compare an array and an object
  // and an object with the property "0" and "1" would equal an 2-index array with the same values?
  if ((typeof(val1) == "object" && val1 !== null) && (typeof(val2) == "object"  && val2 !== null)) {

    // we need to check that the objects have the same properties
    for (var property in val1) {

      // How do you know if an object's property exists?  in operator
      // this can be the only thing we do in the for loop
      // if we pass through this, we know that all operations produced true,
      // which means that all of the properties in val1 are also in val2
      if (!property in val2) {
        return false;
      }
        // if it's not false, then we know it's true, i.e.
        // this would mean you're checking each matched property as you go, even
        // though you might not need to as you don't yet know if the objects have the
        // same properties

        // HOW DO YOU KEEP TRACK OF THE PROPERTIES COMPARED AND MATCHED??
      }
      var truthCounter = [];
      for (var propVal in val1) {
        truthCounter.push(deepEqual(val1.propVal, val2.propVal));
      }

      if (truthCounter.indexOf(false) == -1) {
        return true;
      } else {
        return false;
      }

    }
      // How do you compare the properties of 2 objects?

  } else if (val1 === val2) {
    return true;
  } else {
    return false;
  }
}


// PERFORM

function deepEqual (val1, val2) {
// HELPFUL DEBUGGING STRATEGY: console.log(arguments) to verify that a function's receiving
// the data you think it should be

  if ((typeof(val1) == "object" && val1 !== null) && (typeof(val2) == "object"  && val2 !== null)) {

    for (var property in val1) {
      if (!property in val2) {
        return false;
      }
    }

    var truthCounter = [];

    for (var propVal in val1) {
      // these arguments both produce undefined because, unless the given objects
      // actually had a property named propVal, they don't have that property
      // for accessing properties by a dynamic value / expression, you have to place the
      // expression w/in brackets
      truthCounter.push(deepEqual(val1.propVal, val2.propVal));
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

// CORRECTED VERSION

function deepEqual (val1, val2) {

  if ((typeof(val1) == "object" && val1 !== null) && (typeof(val2) == "object"  && val2 !== null)) {

    for (var property in val1) {

      if (!(property in val2)) {
        return false;
      }
    }

    // can you do this in a less hacky way?
    // same pattern as above? plop in an if statement to check for false
    // place a return true statement beneath the loop i.e. a statement that's evaluated
    // only if no recursive calls return false
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

// MISTAKE REALIZED ON REVIEWING ANSWER
// My solution fails when val2 is a superset of val1 i.e. all the same properties as
// val1, but more properties beyond that set
// My solution fails because in my first for loop, I check only that all of the properties
// in val1 exist in val2 i.e. I know only that val1 and val2 have the same properties,
// not that they have the same number of properties

// you can use this to help: http://stackoverflow.com/questions/126100/how-to-efficiently-count-the-number-of-keys-properties-of-an-object-in-javascrip
// Or follow the book's example
// Basically, you're saying
// if you have 2 objects w/ the same number of properties and the comparisons of
// their values all return true, then you know the objects are deeply equal


// TODO: What's the difference between if and only if



// PERFECT
