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
  for (var i = 2; i <= 5; i++) {
    var newDirections = vectorRange(i);
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
