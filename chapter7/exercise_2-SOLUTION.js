"use strict";
function Tiger() {
  // should be high; assume that population is smaller, b/c prey moves, harder to find to eat
  this.energy = 100;
  this.appetite = {
    turnsEating: 0,
    turnsDigesting: 0,
    hungry: true
  };
}

// if hungry, can eat,
// after eating, say, 5 times, don't eat, digest
// after digesting for 2 turns, you can eat again
Tiger.prototype.updateAppetite = function (hungry, eating) {
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
    console.log("tiger digestion");
    if (this.appetite.turnsDigesting == 8) {
      this.appetite.hungry = true;
      this.appetite.turnsDigesting = 0;
    }
  }
}

Tiger.prototype.act = function (view) {
  var space = view.find(" ");
  if (this.energy > 200 && space)
    return {type: "reproduce", direction: space};
  if (this.appetite.hungry) {
    var plantEater = view.find("O");
    if (plantEater) {
      this.updateAppetite(this.appetite.hungry, true);
      return {type: "eat", direction: plantEater};
    }
  }

  if (space) {
    var foodSource = view.forage("O", 4);

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
    this.updateAppetite(this.appetite.hungry, false);
  }
};

function SmartPlantEater () {
  this.energy = 45;
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
      if (this.appetite.turnsEating == 5) {
        this.appetite.hungry = false;
        this.appetite.turnsEating = 0;
      }
    }
  } else {
    this.appetite.turnsDigesting++;
    console.log("planty digesting!");
    if (this.appetite.turnsDigesting == 2) {
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
    var foodSource = view.forage("*", 8);

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


// Accessing a non-existent object property does not fail, it just returns undefined / null
// BE CAREFUL!!!
function Plant() {
  this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(view) {
  if (this.energy > 10) {
    var space = view.find(" ");
    if (space)
      return {type: "reproduce", direction: space};
  }
  if (this.energy < 20)
    return {type: "grow"};
};


RESULTS
=========

About the same as exercise 1; WAAAAYYY OVERENGINEERED, DID NOT
GET AT THE ROOT OF THE PROBLEM EITHER, SO FAR LESS EFFECTIVE THAN
THE BOOK SOLUTION

function Tiger() {
  this.energy = 100;
  this.direction = "w";
  // Used to track the amount of prey seen per turn in the last six turns
  this.preySeen = [];
}
Tiger.prototype.act = function(view) {
  // Average number of prey seen per turn
  // 0, initial accumulator value, argument, is necessary because
  // calling reduce on an empty array throws an error
  var seenPerTurn = this.preySeen.reduce(function(a, b) {
    return a + b;
  }, 0) / this.preySeen.length;
  // considers all adjacent prey (prey it can see) in a given turn
  var prey = view.findAll("O");
  // adds this number to its memory (store of prey seen recently)
  this.preySeen.push(prey.length);
  // Drop the first element from the array when it is longer than 6
  if (this.preySeen.length > 6)
    this.preySeen.shift();

  // Only eat if the predator saw more than ¼ prey animal per turn
  // AND, of course, if it's adjacent to prey (prey.length)
  if (prey.length && seenPerTurn > 0.25)
    // selects a prey critter at random from all prey seen this turn
    return {type: "eat", direction: randomElement(prey)};

  var space = view.find(" ");
  // very slow to reproduce, helps keep prey alive
  if (this.energy > 400 && space)
    return {type: "reproduce", direction: space};
  if (view.look(this.direction) != " " && space)
    this.direction = space;
  return {type: "move", direction: this.direction};
};
