RESULTS
- reverseArray matched exactly
- reverseArrayInPlace matched more or less exactly
    - I instantiated holder / old variable in for loop, book did so in the loop; does not
     seem to be a trade off there
    - one tweak: change `arrayParam.length - counter - 1` to `arrayParam.length - 1 - counter`
        - book wrote it in this order, more expressive of the meaning of the calculation
        - to start at the end of the array, you subtract 1 from its length
        - then, you move back through by however many times given in the counter value
        - so order of 1, then counter matches conceptual model





// PREPARE

/*

Arrays have a method reverse, which changes the array by inverting the order in
which its elements appear. For this exercise, write two functions, reverseArray
and reverseArrayInPlace. The first, reverseArray, takes an array as argument and
produces a new array that has the same elements in the inverse order. The second,
reverseArrayInPlace, does what the reverse method does: it modifies the array given
as argument in order to reverse its elements.

Neither may use the standard reverse method.
*/



// PLAN

// return new array vs. modify given one

// reverseArray

  // takes an array as argument

  function reverseArray (arrayArg) {
  // produces new array
  var reversedArray = [];

  // give the new array the same elements as given one

  // inverse order
     // negative indices
     // NOPE: NEGATIVE INDICES ARE NOT A THING IN JS
  counter > -arrayArg.length;

     // positive indices
     // stop when you've pulled value from 0th index
     counter >= 0


  // produces a new array that has the same elements in the inverse order
  return reversedArray;
  }


// PERFORM

for (var i = -1; counter > -arrayArg.length; i--) {
  reversedArray.push(arrayArg[i]);
}


// length of an array is always 1 greater than its last filled index
for (var i = arrayArg.length - 1; counter >= 0; i--) {
  reversedArray.push(arrayArg[i]);
}

function reverseArray (arrayArg) {

  var reversedArray = [];

  for (var i = arrayArg.length - 1; i >= 0; i--) {
    reversedArray.push(arrayArg[i]);
  }

  // OR
  for (var i = 0; i < arrayArg.length; i++)
    reversedArray.unshift(arrayArg[i]);
  }

  return reversedArray;


}



// PERFECT



// reverseArrayInPlace
//reverseArrayInPlace, does what the reverse method does: it modifies the array given
// as argument in order to reverse its elements.

// array given as argument
function reverseArrayInPlace (arrayParam) {

    // 4 is at index 3, which we can represent as length - 1
    // if we pop, then unshift, it's at index 0, BUT THEN 1 is no longer at index 0, but index 1
    // do we do both operations separately, storing returned values in variables? then counting to center?
    //

    var arrayTest = arrayParam.slice(1,);

    for (counter = 0; counter < arrayTest.length; counter++ {
      arrayParam.unshift(arrayTest.shift());
      arrayParam.pop();

    }

/*
    // odd lengthed arrays are tricky b/c one value doesn't change place
  [1,2,3] --> [3,2,1]
  [1,2,3,4] --> [4,3,2,1]
  [3,1,2], counter = 1
  [2,3,1], counter = 2
*/

  // modifies means that it changes the data structure referred to, not produces
  // a new one based on the one given, as in reverseArray
  return arrayParam;
}

// SLIMMED DOWN
// TRY 1
// THIS DOESN'T WORK BECAUSE arrayTest's length decreases during the loop,
// so the returned array is only partially reversed. It's not fully reverse because
// the stop condition was met before all of the values from arrayTest were added because
// arrayTest.length and counter converged during the loop


// changing arrayTest.length to arrayParam.length doesn't work because arrayParam is
// 1 longer than arrayTest, given that arrayTest is a slice of all but one of the values in
// arrayParam. Therefore, looping till the counter is no longer less than arrayParam.length
// loops arrayTest.length + 1 times i.e. pulls all of the values, empties, that array, then tries to
// pull another value; this doesn't throw an array, but adds undefined to arrayParam because
// the property of the requested index is empty i.e. undefined because an undefined property
// of an object just returns undefined
function reverseArrayInPlace (arrayParam) {

    var arrayTest = arrayParam.slice(1,);

    for (counter = 0; counter < arrayTest.length; counter++ {
      arrayParam.unshift(arrayTest.shift());
      arrayParam.pop();
    }

  return arrayParam;
}




// UPDATED VERSION THAT WORKS — BUT IS CHEATING!!!

function reverseArrayInPlace (arrayParam) {

    // if only 1 index given, then the slice goes from that index to the end of the array
    var arrayTest = arrayParam.slice(1);
	   // arrayParam.length - 1 because # of loops needs to be # of values in arrayTest and a
     // static value
     // arrayTest's length decreases
     // arrayParam has 1 more value than arrayTest
     // so, arrayParam.length -1 gives us the condition we need to hit to know we're done
     // looping and have a fully reveresed array
    for (counter = 0; counter < arrayParam.length - 1; counter++) {
      arrayParam.unshift(arrayTest.shift());
      arrayParam.pop();
    }

  return arrayParam;
}


// HOW DO YOU SIMULTANEOUSLY SWAP FIRST AND LAST

// you could store in variables, then perform opposite operations on values
// but this seems like copying with more steps?


function reverseArrayInPlace (arrayParam) {

  // you have an array w/ 5 values
  // you want to loop over the first 2
  // Math.floor (array.length) returns the 2
  // in order to loop 2 times with counter starting at 0
  // you'd do less than
  // 1st iteration : counter is 0
  // 2nd iteration: counter is 1
  for (var counter = 0, holder = 0; counter < Math.floor(array.length / 2); counter++ ) {
    holder = arrayParam.shift();
    // I don't know if this line will overwrite, or just cause 2 properties to produce the same value
    // do properties behave as expressions?
    // you had this written as arrayParam[i];
    // apparently, assigning a value to an undefined index adds undefined until the array has 90 values??
    arrayParam[counter] = arrayParam[arrayParam.length - counter - 1];
    arrayParam[arrayParam.length - counter - 1] = holder;
  }

}


// WORKING VERSION
// you didn't arrive at this without hints i.e. you cheated, even though
// you didn't have to
function reverseArrayInPlace (arrayParam) {

  for (var counter = 0, holder; counter < Math.floor(arrayParam.length / 2); counter++ ) {

    holder = arrayParam[counter];
 	  arrayParam[counter] = arrayParam[arrayParam.length - counter - 1];
  	arrayParam[arrayParam.length - counter - 1] = holder;

  }

  return arrayParam;
}


// when you assign an array index value to a variable e.g. holder = arrayParam[counter]
// the variable grasps the VALUE the given expression — the array, index —
// produces. As opposed to "refers to". The variable does not refer to the value held by
// the index, which would mean that if the index's value changed, the variable would
// produce the index's new value
