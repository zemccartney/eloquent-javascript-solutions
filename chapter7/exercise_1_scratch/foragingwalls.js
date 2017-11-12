// TEST CASE
  ["############",
   "#         #",
   "#         #",
   "#*  # O   #",
   "#         #",
   "############"]

// Expect: Critter encounters wall, then moves around as efficiently as possible


// What happens when the foraging critter encounters the wall?
// critter moves towards food, but does nothing to get around the wall
// So, perpetually moving against the wall
// Technically, not moving.?
// When critter reproduces, new critters don't move..?
    // Because they're all trying to move through the wall
    // they smell for food clockwise, starting in the north
    // therefore, the first food they all encounter is west (or southwest for one above)


function SmartPlantEater() {
	this.energy = 20;
}

SmartPlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};

  var plant = view.find("*");
  if (plant)
    return {type: "eat", direction: plant};

  if (space)
    var foodSource = view.forage("*");
    if (foodSource) {
      // check destination; if wall, move around like wall critter
      if (charFromElement(view.vector.plus(directions[foodSource])) == "#") {
          // if it's a wall, then follow the wall
          // look for next empty space around wall
          // how do you add directions?
          // given we're heading west (string), how would I get northwest or southwest (string)?
          if (charFromElement(view.world.grid.get(view.vector.plus(directions[foodSource]))) == "#") {
            while (charFromElement(view.world.grid.get(view.vector.plus(directions[foodSource]))) !== " ") {
              foodSource = dirPlus(foodSource, 1);
            }
          }

          // TODO How is the vector param set? Where does that come from?
          // TODO How do you document data flow? Try something for this?
      }

      return {type: "move", direction: foodSource};
    } else {
      return {type: "move", direction: space};
    }
}

var directionNames = "n ne e se s sw w nw".split(" ");

// How do we move, addition or subtraction, from one string in the array to another?
// Does choice of looking counterclockwise or clockwise matter?
// Rewrote dirPlus on own; didn't remember how it worked
RESULTS:
- almost matched book
- one stylistic difference: booked stored indexOf calculation in variable before return statement
    - I like this: much more readable; falling rock - if you feel a line has become
    unwieldily long, try to abstract some of its computations into preceding variables
    - smaller lines are easier to read and digest; less chance of confusion
    - LESS CHANCE OF BUGS
function dirPlus(currentDirection, changeToDirectionWeWantToFace) {
  // currentDirection = w;
  // changeToDirectionWeWantToFace = if sw, then -1 (array index movement); if nw, then 1

  return directionNames[(8 + directionNames.indexOf(currentDirection) + changeToDirectionWeWantToFace) % 8]
}
