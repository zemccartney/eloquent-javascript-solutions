// SIMPLIFY CONCEPTS... ABSTRACTION?
// PROGRAMMING REQUIRES MAKING CONCEPTS SIMPLE ENOUGH THAT THEY'RE STRUCTURABLE AND COMMUNICABLE
// STRUCTURING OPENS UP TO DECONSTRUCTION I.E. EVERY ACT OF SIMPLIFICATION AND ABSTRACTION
// IMPLIES ITS OWN UNDOING, ITS OWN CONTRADICTION
// ITS OWN TRADEOFFS!!!


// CONCEPT INVENTORY

- turn
- world
  - stores state of beings in the world
  - plan (array)(defines world)
    - rocks
    - critters
  - interface
      - turn (every critter moves, world updates)
      - toString (shows us what's happening in the world)


"The world should concern itself with world-related things, and the grid should concern itself with grid-related things."
hmmm... separation of concerns?
how do you make the call that these things should be separated?

var grid = [["top left",    "top middle",    "top right"],
            ["bottom left", "bottom middle", "bottom right"]];

grid[1][2] means point at (2,1) (first dimension = vertical: rows are collections, columns are single values for the given row.... NOT CLEAR ON THIS)

Or we can use a single array, with size width × height, and decide that the element at (x,y) is found at position x + (y × width) in the array.
size of var grid = 3 x 2 = 6 (size means .length?)

(x, y) = (1,2)
2 + (1x3) = 5

WHY DOES THIS WORK?
- y x width means the number of spaces we need to additionally move given that y (vertical movement) has been coerced into "horizontal"
- x means horizontal movement

["top left", "top middle", "top right", "bottom left", "bottom middle", "bottom right"]


// NOT GETTING THIS

Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
};

- WHY vector.x < this.width??
    1 < 5
    because of 0 indexing?
    if x = 5 e.g. (5,0), then the vector checks the value at index 5
    Which is actually the first element of the second row (first 5 elements
      i.e. elements of first row are 0-4)

- WHY vector.y < this.height??
    5 < 5
    Likewise. because zero-indexing


"In most situations, modern JavaScript engines will return properties in the order they were defined, but they are not required to." BAD NEWS FOR MY CHAPTER 6 EXAMPLES

"The “|| "s"” in the act method is there to prevent this.direction from getting the value null if the critter is somehow trapped with no empty space around it (for example when crowded into a corner by other critters)."
### WHY DO WE WANT TO AVOID THIS???

// returns a random element from the array
// always within the array because Math.random excludes 1
// so it could never be 5 x 1, which would be the array's length
// i.e. 1 past its final index
// the greatest it could be is 4.9999, which is then coerced to
// 4 by Math.floor
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}


var directionNames = "n ne e se s sw w nw".split(" ");

// this.direction is set to a RANDOM ELEMENT within direction names
function BouncingCritter() {
  // represents the direction the critter's heading in
  this.direction = randomElement(directionNames);
};


BouncingCritter.prototype.act = function(view) {
  // if there's not an empty space in the given direction
  if (view.look(this.direction) != " ")

    // find a direction whose value is " ", then set critter's new
    // movement direction to that
    // if no match, then south (default?)
    this.direction = view.find(" ") || "s";

  // returns an action object
  return {type: "move", direction: this.direction};
};

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// Math.random returns value between 0 (inclusive) and 1 (exclusive)




//// OOHHHH BIG PICTURE

// Plan is an array of strings for creating the world
      // We use the plan to create the world by
      // a.) deriving a grid from its dimensions
      // b.) constructing the elements in the world from the characters in the plan (giving each
        element actions)
// World stores contents of a world, info about elements, actions, etc
// Grid is a property of the world object, represents space
//    contains each element at its coordinates in the world derived from the plan
// world's toString method prints a string the same dimensions as the plan,
// but that reflects the current state of the world i.e. allows us to see what's changed, what's going on
// PLAN = STATIC , WORLD = DYNAMIC



// the world’s toString method builds up a maplike string from the world’s
// current state by performing a two-dimensional loop over the squares on the grid.

// 2D:
//    1st D: grid's height
//    2nd D: grid's width
//    Both derived from plan


// Own CARELESS attempt at toString method with notes from looking at his
// ** signify comments made before checking my work
world.prototype.toString = function () {

  var worldStringArray = "";

  // GRID IS A PROPERTY OF THE WORLD
  // SO TO ACCESS, YOU SAY THIS.GRID (THIS WORLD'S GRID)
  for (y = 0; y < grid.height; y++) {

    var row = [];
    for (x = 0; x < grid.width; x++) {
      // **goes over single elements in grid array x # of times
      // **how does this loop know where to start
      row.push(charFromElement(worldStringArray[x + (y * grid.width)]));
    }

    // YOU DIDN'T REALIZE YOU WERE PUSHING TO A STRING
    worldStringArray.push(row);

    // TOTALLY UNNECESSARY; Book just added += text from inner loop to output (your worldStringArray)
    // outer loop just added a newline character
    // if worldStringArray were actually an array, would have accomplished the same thing?
    // just with a totally unnecessary step
    // and also, confusing use of arrays, when, in reality, the point of this program,
    // the desired output, is to build up a string
    // CONSIDER YOUR DESIRED OUTPUT, DO AS LITTLE AS POSSIBLE TO GET THERE
    // AS FEW COMPLICATIONS AS POSSIBLE
  }

  return worldStringArray.join("\n");

}
