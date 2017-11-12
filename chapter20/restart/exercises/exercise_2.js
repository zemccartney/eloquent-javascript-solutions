TITLE: Fixing a leak

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

function urlToPath(url) {

  var path = require("url").parse(url).pathname;
  path = decodeURIComponent(path);

  return "." + path.replace(/.+\.\./,"");
}

RESULTS

- you were lazy; the solution was not that complex
- it was tricky, but not too complex
- for (;;) pattern for looping infinitely without conditions
    - while (true) is equivalent?
- book solution constructs a valid (within our web directory) path
from given path containing directory traversal operators; preserves
everything except directory traversal
- my solution is more destructive, destroys entire path preceding last instance of ".."
 (as far as I can tell, that is what browsers do)... not sure why?
 What is the tradeoff of here? In both cases, how likely is it that someone
 unintentionally uses the parent directory operator i.e. accidentally
 includes it in an otherwise valid path that should otherwise be preserved?
 I DO NOT KNOW

- Does global do anything in replace? YES, replaces all instances
Why does book not use global?
- Should book solution use result of first capturing group as replacement?
Does not matter because Windows allows both? But you could using $1, I believe?
- I would not have figured out book regexp; very cool that you can use end of input operator
within a capturing group: /(\/|\\)\.\.(\/|\\|$)/

- Cool pattern from book; to globally replace, infinite i.e. indeterminate loop over string using
replace, assigning latest version of replaced string to return value variable
    - NO! This is for global replacement when you have potentially colliding matches,
    as in the string "/../../string/" ; when you go to globally replace, only
    the first instance matches, as after that match, the second instance, which also uses
    the middle / to be a full match, no longer matches until the replacement is complete.
    "Until the replacement is complete" can be expressed via iterative replacement
    Built-in regexp global replacement is not iterative, but simultaneous, with collisions
    resolved by completing the first possible match, thereby invalidating the second possible match


EXPERIMENTATION

[] Content injection attacks?
[x] Directory traversal attacks? --> PATH TRAVERSAL
[x] What happens when you pass a URL with encoded spaces? All fine, as long
as resource has spaces in its name? --> YES
[] Use split w/ a regex? find all sequences  start w/ / or \ and do not contain
..
[x] What happens when you make a request with a // in it? --> APPEARS THAT IT ENDS UP W/ 2 SLASHES IN IT?


// PREPARE

DESIRED BEHAVIOR: like browser, deletes everything before the last occurrence of the ..

// PLAN


// PERFORM


// PERFECT
