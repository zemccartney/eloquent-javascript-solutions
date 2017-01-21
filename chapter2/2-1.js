// Eloquent JS - Ch. 2 - Problem #1
// Looping through a triangle

// Prepare
// Currently: we need to output a triangle of hashes via console.log
// with the bottom row being 7 # long (need to stop when we have a line that long)
// Don't know how to check for line length; how do we formulate knowing: the line is this long? how do we tell the computer to check?
// Data Type: string
// Desired: see the triangle

// Plan

// Loop

for (var pyramid = "#"; pyramid.length <= 7; pyramid += "#")
  console.log(pyramid);


// Less elegant method; but in both cases, you require the same starting knowledge:
// the length of the pyramid base
  for (var pyramid = "#######", counter = 1; counter < 8; counter++)
    console.log(pyramid.slice(0,counter));

// Condition: if line of triangles is 7 or less
// Initial "State": var pyramid = "#"


RESULTS
- Matched book solution exactly
