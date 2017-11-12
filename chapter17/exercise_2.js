TITLE: Promise.all

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

NONE! Totally flopped, looked at the book SOLUTION
GAVE UP!!!!

RESULTS

// Oy, below is an attempt at understanding my confusion
// In my attempted solutions, I called the returned Promise's success and failure
// functions synchronously with an array of promise values
// I expected this array to contain the results of the executed promises
// it didn't of course, which I identified correctly (see cludge using setTimeout below)
// was because I was resolving the wrapping Promise before any of the array of Promises had finished executing
// Seems like I was confused because I didn't understand where the control flow was
// Or rather, I did, but not exactly how the asychronous flow operated outside it
// Further, I didn't get how a Promise's success and fail functions work
// I didn't understand that they could be called from anywhere,
// had to be called conditionally on completion of the wrapped asynchronous operation
// Why did I place them outside the forEach loop?
// What was I thinking? That they had to go there so they could access all Promise values?
//    I think so?
//        I was tripped up by how to think about the multiple promises executing concurrently,
//        completing totally ignorantly of each other
//        I didn't understand how to wait for all 3 Promises


// SOLUTION FROM MEMORY I.E. BASICALLY CHEATING, A WEEK AFTER INITIALLY LOOKING AT IT
// AT LEAST TO SALVAGE SOME HOPE :)

function all (promises) {
  return new Promise(function(succeed, fail) {

    var promiseResults = [];
    var pendingCount = promises.length;

    promises.forEach(function(promise, index){

      // Allows non-promise values within array
      if ( ! promise instanceof Promise ){
        pendingCount--;
        promiseResults[index] = promise;
        if (pendingCount === 0) {
          succeed(promiseResults);
        }

        return;
      }

      promise.then(function(result){
        promiseResults[index] = result;
        pendingCount--;
        // if a promise succeeded and there are no more pending promises
        // unwrap the wrapping Promise to success!
        if (pendingCount === 0) {
          succeed(promiseResults);
        }
      }, function(error){
        // Blow up the whole wrapping Promise if a single one failed
        // "with the failure value from the failing promise"
          fail(error);
      });
    });

    if (promises.length === 0) {
      succeed(promises);
    }

  });

}
// recall went well :)
// Try harder next time; Research before giving up

// what if non-promise values supplied?
// Possible to change internal function to catch errors in forLoop?
//  yes, but sort of clunky?

EXPERIMENTATION

- Read a lot
- Experimented a lot
- finally started to sort of understand promises, but who knows


// PREPARE
// The Promise constructor has an all method that, given an array of promises, returns
// a promise that waits for all of the promises in the array to finish.
Promise.all([]);
// It then succeeds, yielding an array of result values. If any of the promises in the
// array fail, the promise returned by all fails too (with the failure value from
// the failing promise).
// ONLY THE FAILED VALUE!!!

// Try to implement something like this yourself as a regular function called all.

// Note that after a promise is resolved (has succeeded or failed), it can’t
// succeed or fail again, and further calls to the functions that resolve it are
// ignored. This can simplify the way you handle failure of your promise.

what????
- How can I test that? Try recalling a Promise handle on one of the promises passed in the array?

function fail() {
  return new Promise(function(success, fail) {
    fail(new Error("boom"));
  });
}
all([soon(1), fail(), soon(3)]).then(function(array) {
  console.log("We should not get here");
}, function(error) {
  if (error.message != "boom")
    console.log("Unexpected failure:", error);
});

on trying to resolve fail, we call only its fail handle (parameter) per that Promise internals
as in, a promise is required to have success and failure handlers, but how
those handlers are respected depends on internals of the Promise function
Promise construction function defintion describes how the Promises handles unwrap a value
from the Promise

// fail the function and fail the parameter are different values???????
- returns a Promise that always yields an error

// PLAN
function all(promises) {
  return new Promise(function(success, fail) {
    // Your code here.
  });
}
function soon(val) {
  return new Promise(function(success) {
    setTimeout(function() { success(val); },
    // sets timeout to a random number between 0 and 50 milliseconds?
               Math.random() * 500);
  });
}
all([soon(1), soon(2), soon(3)]).then(function(array) {
  // this should be 1,2,3 assumes that success(val) of soon produces only that value
  // How do you do that?
  console.log("This should be [1, 2, 3]:", array);
});

all([]).then(function(array) {
  console.log("This should be []:", array);
});

all([soon(1), fail(), soon(3)]).then(function(array) {
  console.log("We should not get here");
}, function(error) {
  if (error.message != "boom")
    console.log("Unexpected failure:", error);
});

// PERFORM
function all(promises) {
  // returns a promise that waits for all of the promises in the array to finish.
  return new Promise(function (success, fail) {
       	var resolvedPromiseValues = [];
      	var errorDetected = false;

    	// wait for all promises to resolve
  		new Promise(function (onFulfill, onFail) {

        		promises.forEach(function(promise, index) {
       			if (promise instanceof Promise) {
          			promise.then(function (returnValue) {
            			resolvedPromiseValues.push(returnValue);
          			}, function (error) {
                    	errorDetected = true;
                    	resolvedPromiseValues.push(error);
          			});
        		} else {
          			// no resolution needed for non-promise values
          			resolvedPromiseValues.push(promise);
        		}
      		});

         // then, send them back, reducing to single error if one
        }.then(function () {
          	if (errorDetected) {
              	// return just the first Error returned
 				resolvedPromiseValues = promises.filter(function(el) { return el instaceof Error; }).pop();
        		fail(resolvedPromiseValues);
      		} else {
        		success(resolvedPromiseValues);
      		}
        });

  });
}

while (promises.length > 0) {
  promises.pop().then(
    //
  )
}

function recursivePromise = function (promiseResult, promiseArray) {
  handler(promiseResult);
  if (promiseArray.length > 0) {
    return promiseArray.pop().then(function (result) {
      recursivePromise(result, promiseArray);
    });
  }
}

call promise, add value to array, return another promise,

promises.pop().then(
  function (result) {
    if (promises.length > 0) {
      return promises.pop();
    }
  }
)

// READ THE HINT
// ON READING, REALIZED THAT YES, THIS IS JUST AS SHIITY A SOLUTION AS I THOUGHT IT WAS

function all(promises) {
  // returns a promise that waits for all of the promises in the array to finish.
  return new Promise(function (success, fail) {
       	var resolvedPromiseValues = [];
      	var errorDetected = false;

        promises.forEach(function(promise, index) {
          if (promise instanceof Promise) {
            promise.then(function (returnValue) {
              resolvedPromiseValues.push(returnValue);
            }, function (error) {
              errorDetected = true;
              resolvedPromiseValues.push(error);
            });
          } else {
            // no resolution needed for non-promise values
            resolvedPromiseValues.push(promise);
          }
        });

    	// extra shitty implementation of waiting for promises to finish
    	// 3000 is a totally arbitrary selection
    	// wish I could make it dependent on actual execution, but I have no
    	// idea how to express: take an array of promises; wait for all of them
    	// collect their results
        setTimeout( function () {
            if (errorDetected) {
              // return just the first Error returned
              // gross
              resolvedPromiseValues = resolvedPromiseValues.filter(function(el) { return el instanceof Error; }).shift();
              fail(resolvedPromiseValues);
            } else {
              success(resolvedPromiseValues);
            }
        }, 1000);

  });
}

// POST-HINT
function all(promises) {
  return new Promise(function(success, fail) {
    // Your code here.
    // The function passed to the Promise constructor will have to call then on each
    // of the promises in the given array.
    var counter = promises.length;
    var results = counter !== 0 ? new Array(counter) : [];

    while (promises.length > 0) {
      promises.pop().then(function(result){
        counter--;
        results[promises.length] = result;
      }, function (error) {
        fail(error);
      })
    }
    if (counter === 0) {
        success(results);
    }

  });
}

/*promises.forEach(function(promise, index) {
  if (promise instanceof Promise) {
    promise.then(function (returnValue) {
      resolvedPromiseValues.push(returnValue);
    }, function (error) {
      fail(error);
    });
  } else {
    // no resolution needed for non-promise values
    resolvedPromiseValues.push(promise);
  }
});*/

    // When one of them succeeds, two things
    // need to happen. The resulting value needs to be stored in the correct position
    // of a result array,
    Stored in the correct position of a result array? What is the correct position?
    Same as calling position?

    //and we must check whether this was the last pending promise
    // and finish our own promise if it was.

    // The latter can be done with a counter, which is initialized to the length of
    // the input array and from which we subtract 1 every time a promise succeeds.
    // When it reaches 0, we are done. Make sure you take the situation where the
    // input array is empty (and thus no promise will ever resolve) into account.

    // Handling failure requires some thought but turns out to be extremely simple.
    // Just pass the failure function of the wrapping promise to each of the promises
    // in the array so that a failure in one of them triggers the failure of the
    // whole wrapper.
  });
}



// PERFECT
