// TEST CASE
  ["############",
   "#         #",
   "#         #",
   "#*  # O   #",
   "#         #",
   "############"]


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
      if (charFromElement(view.world.grid.get(view.vector.plus(directions[foodSource]))) == "#") {
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

View.prototype.forage = function (food) {
  var forageDir = null;
  // start with offset 2 because critter has already checked the space around it (offset of 1) for food
  for (var smellOffset = 2; smellOffset <= 5; smellOffset++) {
    var newDirections = vectorRange(smellOffset);
    for (var dir in newDirections) {
      var forageTest = this.vector.plus(newDirections[dir]);
      if (this.world.grid.isInside(forageTest)) {
        if (charFromElement(this.world.grid.get(forageTest)) == food) {
          forageDir = dir;
          break;
        }
      }
    }
    if (forageDir) {
      break;
    }
  }
  return forageDir;
}

function vectorRange (offset) {

  var newRange = {
    "n": new Vector (0,-offset),
    "ne": new Vector (offset, -offset),
    "e": new Vector (offset, 0),
    "se": new Vector (offset, offset),
    "s": new Vector (0, offset),
    "sw": new Vector (-offset, offset),
    "w": new Vector (-offset, 0),
    "nw": new Vector (-offset, -offset)
  }

  return newRange;
}
