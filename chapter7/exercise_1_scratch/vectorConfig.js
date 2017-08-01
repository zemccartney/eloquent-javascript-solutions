// I think this allows you to manipulate the directional offsets
// which amounts to scanning a widening range on the fly, stopping at the first hit
// i.e. animal moves in the first direction in which it detects food
// WHICH IS BETTER THAN REMEMBERING A DIRECTION?



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

// smell the environment
// get back the direction in which critter should move i.e. where food is located
/*function forage() {
  var forageDir = null;
  for (var i = 2; i <= 5; i++) {
    var newDirections = vectorRange(i);
    for (var dir in newDirections) {
      forageDirTEST = this.view.smell(dir);
      if (forageDirTEST) {
        forageDir = dir;
        break;
      }
    }
    if (forageDir)
      break;
  }
  return forageDir;
}
*/

View.prototype.forage = function (food) {
  var forageDir = null;
  // start with offset 2 because critter has already checked the space around it (offset of 1) for food
  for (var smellOffset = 2; i <= 5; smellOffset++) {
    var newDirections = vectorRange(smellOffset);
    for (var dir in newDirections) {
      var forageTest = this.vector.plus(newDirections[dir]);
      if (this.world.grid.isInside(forageTest)) {
        if (charFromElement(this.world.grid.get(target)) == food)
          forageDir = dir;
          break;
      }
    }
    if (forageDir)
      break;
  }
  return forageDir;
}

// TEST
// The critter should move toward food if it's within it's smell range


/// TESTED, FINAL EXAMPLE
// FINAL, TESTED VERSION OF INTENTIONAL MOVEMENT V.1

// TODO Refactor outside for as a while statement; the last break statement is just manually
// rewritten while logic; declare variables....somewhere else?
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
      return {type: "move", direction: foodSource};
    } else {
      return {type: "move", direction: space};
    }
}

// TEST CASE
  ["###########",
   "#         #",
   "#         #",
   "#*    O   #",
   "#         #",
   "###########"]
