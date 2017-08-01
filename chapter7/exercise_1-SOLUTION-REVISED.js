// RESOLVED EXERCISE 1
// Refactored during exercise 2
// worked well for exercise 1 w/ some slight reconfiguring for a smaller space

function SmartPlantEater () {
  this.energy = 30;
  this.appetite = {
    turnsEating: 0,
    turnsDigesting: 0,
    hungry: true
  };
}

// if hungry, can eat,
// after eating, say, 5 times, don't eat, digest
// after digesting for 2 turns, you can eat again
SmartPlantEater.prototype.updateAppetite = function (hungry, eating) {
  if (hungry) {
    if (eating) {
      this.appetite.turnsEating++;
      if (this.appetite.turnsEating == 2) {
        this.appetite.hungry = false;
        this.appetite.turnsEating = 0;
      }
    }
  } else {
    this.appetite.turnsDigesting++;
    if (this.appetite.turnsDigesting == 3) {
      this.appetite.hungry = true;
      this.appetite.turnsDigesting = 0;
    }
  }
}

SmartPlantEater.prototype.act = function (view) {
  var space = view.find(" ");
  if (this.energy > 90 && space)
    return {type: "reproduce", direction: space};

  if (this.appetite.hungry) {
      var plant = view.find("*");
      if (plant) {
        this.updateAppetite(this.appetite.hungry, true);

        return {type: "eat", direction: plant};
      }
  }

  if (space) {
    var foodSource = view.forage("*", 2);

    if (foodSource && this.appetite.hungry) {
      if (charFromElement(view.world.grid.get(view.vector.plus(directions[foodSource]))) == "#") {
        while (charFromElement(view.world.grid.get(view.vector.plus(directions[foodSource]))) !== " ") {
          foodSource = dirPlus(foodSource, 1);
        }
      }

      this.updateAppetite(this.appetite.hungry, false);
      return {type: "move", direction: foodSource};

    } else {
      // if no food or not hungry, move randomly
      this.updateAppetite(this.appetite.hungry, false);
      return {type: "move", direction: space};
    }

  } else {
    // the critter is walled it, so it can't move, but can still digest
    this.updateAppetite(this.appetite.hungry, false);
  }

}


View.prototype.forage = function (food, offset) {
  var forageDir = null;
  for (var smellOffset = 2; smellOffset <= offset; smellOffset++) {
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

RESULTS
How book solved problems:

function SmartPlantEater() {
  this.energy = 30;
  // preset direction that dictates movement
  this.direction = "e";
}

SmartPlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  // increased energy required to reproduce, so plant eaters reproduce less frequently
  if (this.energy > 90 && space)
    return {type: "reproduce", direction: space};
  // plant eater considers all matches, not just any 1
  // simulates broader thinking; considering not just a single, immediate case,
  // but how that case fits in with a broader context i.e. making a more informed decision
  // WE GATHER MORE INFORMATION ABOUT THE WORLD HERE
  var plants = view.findAll("*");
  // plant eater won't eat unless it finds more than 1 plant
  if (plants.length > 1)
    return {type: "eat", direction: randomElement(plants)};
  // plant eater always moves in set direction
  // unless that direction is occupied
  // Not intentional movement, but not random either, so increases
  // plant eater's chances that it will find food because we know if it
  // starts moving in the direction of food, it will definitely arrive at that food
  if (view.look(this.direction) != " " && space)
    this.direction = space;
  return {type: "move", direction: this.direction};
};

- greedy, eat a lot, wipe out plants: eats only if it is adjacent to
more than 1 plant (findAll vs. find)
   - IMPLICATION: Plant eater will NEVER eat plants to extinction

- randomized movement, do not seek out plants: always moves in the same
direction (initially set to east) unless view.find(" ") returned a space and
the direction it would head in is not empty
   WHY DOES THAT HELP?
   Makes the plant eater more likely to cover more ground to find food,
   move until it finds a wall, another critter, or a plant, so increases chances
   of finding food dramatically

- fast breeding: upped reproduction requirement

His solution took about 3 lines worth of changes and works substantially better than yours, which
added about 70 lines. Great fucking job

What can you learn?

- my first solution worked a lot better
- both suck, relatively; hard to read, excessively complex

DO NOT JUST START CODING;
IF YOU FIND YOURSELF ADDING A TON OF CODE, STOP
YOU ARE LIKELY OVERTHINKING
WRITE OUT THE PROBLEMS YOU ARE TRYING TO SOLVE, WORK THROUGH HOW THEY
ARE REPRESENTED IN THE CODE / WHY THEY EXIST
THE PROBLEMS IDENTIFIED IN THE SIMULATION REQUIRED SOME IMAGINATIVE THINKING
AND ANALYSIS TO ARRIVE AT AND DESCRIBE; ASKING AND DETERMING (AT LEAST A FEW
REASONS) WHY A PROBLEM EXISTS IS VITAL TO ARRIVING AT A POINTED SOLUTION

PROBLEM DEFINITION CAN BE TIME CONSUMING; IT IS TIME WELL-SPENT
