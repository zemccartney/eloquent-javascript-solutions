function modulo (dividend, divisor) {
  var result = dividend - divisor;

  if (result < 0) {
    return dividend;
  } else if (result > 0) {
    return modulo(result, divisor);
  } else {
    return true;
  }

}

/*
 REMEMBER: In recursion, always return your recursive calls
When you wrote this, you weren't returning the recursive call.
You were confused why the function was returning undefined.
It was returning undefined any time the parameters necessitated a recursive call
because the recursive call would return a value to the scope above it and the value
would effectively be trapped there, not travelling any further, just dumped into the if branch.
*/
