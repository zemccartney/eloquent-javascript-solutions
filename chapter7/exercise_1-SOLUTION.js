RESULTS
- Simulation runs for a good long time (have not seen it end on first pass)
- Configuration made:
    - reduced smell range to 3 spaces
    - set reproduction limit (EXCEPT I DID NOT WRITE LOGIC FOR IT, SO REMOVED)
    - doubled energy required to initially reproduce (but did not change amount reduced on reproduction)
      - then reduced to just 100, not 120; no ostensible changeNOPE, eventually, plant eaters reproduced enough to eat plants to extinction
    - added digestion to critter appetite
    - set amount eaten before digesting to 2
- Seems to be that plants cluster in a single side of the world (has happened )

function SmartPlantEater () {
  this.energy = 20;
  this.appetite = {
    // I FOUND THIS MECHANISM OF INTERRELATED VARIABLES SUPER CONFUSING
    // HARD TO KEEP TRACK OF HOW THEY RELATED....WHY?
        // interrelated variables mean you're defining mutliple concepts
        // and how they work together, so to understand your code, you
        // have to both decode the terms symbolically AND interpret the code
        // decoding symbolically (gross, why that term?) i.e. describing
        // how different assignments to those variables correspond to real phenomenon
        // i.e. hunger == 6 means i need to eat like right fucking now AND
        // how values of other variables might impact that value or how it impacts
        // other variables requires a good amount of remembering and processing
        // can be a good shortcut, but trades off understandability, I think
        // powerful method of simplifying code on the functional level
        // less so on the variable level
    // HOW COULD YOU IMPROVE?
    hungry: false,
    hunger: 0,
    digesting: false
  };
}

SmartPlantEater.prototype.act = function (view) {
  var space = view.find(" ");
  if (this.energy > 120 && space)
    return {type: "reproduce", direction: space};

  if (this.appetite.hungry) {
      var plant = view.find("*");
      if (plant) {
        this.updateAppetite(this.appetite.hungry, "eating");

        return {type: "eat", direction: plant};
      }
  }

  if (space) {
    var foodSource = view.forage("*");

    if (foodSource && this.appetite.hungry) {
      if (charFromElement(view.world.grid.get(view.vector.plus(directions[foodSource]))) == "#") {
        while (charFromElement(view.world.grid.get(view.vector.plus(directions[foodSource]))) !== " ") {
          foodSource = dirPlus(foodSource, 1);
        }
      }

      this.updateAppetite(this.appetite.hungry, "not eating");
      return {type: "move", direction: foodSource};

    } else {
      this.updateAppetite(this.appetite.hungry, "not eating");
      return {type: "move", direction: space};
    }

  } else {
    this.updateAppetite(this.appetite.hungry, "not eating");
  }

}

View.prototype.forage = function (food) {
  var forageDir = null;
  for (var smellOffset = 2; smellOffset <= 3; smellOffset++) {
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


//////// NOODLING DURING EXERCISE 2

// Refactor as a dispatch table?
// Takes whether critter is hungry and its context, what it's doing
// at a given turn, and updates how hungry the critter is and its status
// whether digesting and hungry

SmartPlantEater.prototype.updateAppetite = function (hungry, context) {
  if (!hungry) {
    if (this.appetite.digesting) {
      this.appetite.hunger -= 1;
      if (this.appetite.hunger == 0) {
        this.appetite.digesting = false;
      }
      return;
    }

    if (this.appetite.hunger < 6) {
      this.appetite.hunger += 1;
      if (this.appetite.hunger == 6) {
        this.appetite.hungry = true;
      }
    }
    // critter is hungry, so either eating or moving b/c it isn't within reach of food
  } else {
    switch (context) {
      case "eating":
        // if eating, then hunger is going down
        this.appetite.hunger -= 1;
        // plant eater no longer hungry when its hunger is 4, not 0, to stem rate of eating
        // i.e. plant eater only ever eats 2 turns in a row
        if (this.appetite.hunger == 4) {
          this.appetite.hungry = false;
          this.appetite.digesting = true;
        }
        break;
      case "not eating":
        if (this.appetite.hunger < 6) {
          this.appetite.hunger += 1;
        }
    }
  }
};


// Starting at initialization
// hungry is false, digestion is false, hunger is 0
// hunger increases by 1, repeats 6 times, until hunger == 6
// at which point, hungry set to true
// Then, we branch into the top-level else next turn, which branch we take depends on content
// if not eating, then hunger increases unless at its upper limit
// if eating, then {{ UNNECESSARY CHECK FOR IF 0, COULD NEVER BE THE CASE UNLESS IMPROPERLY INITIALIZED}}

// REFACTOR OPTIONS
// Convert context check to switch statement



// Plant eaters should get full twice as fast as they get hungry
// So, they would eat twice as slowly, giving plants more time to grow
// Could also just up the reproduction energy required





function SmartPlantEater () {
  this.energy = 20;
  this.consecutiveMeals = 0;
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
      turnsEating++;
      if (turnsEating == 5) {
        hungry == false;
        turnsEating == 0;
      }
    }
  } else {
    turnsDigesting++;
    if (turnsDigesting == 2) {
      hungry == true;
      turnsDigesting == 0;
    }
  }
}




SmartPlantEater.prototype.act = function (view) {
  var space = view.find(" ");
  if (this.energy > 45 && space)
    return {type: "reproduce", direction: space};

  if (this.consecutiveMeals <= 4) {
      var plant = view.find("*");
      this.consecutiveMeals++;
      if (plant) {
        return {type: "eat", direction: plant};
      }
  }

  if (space) {
    // likely total overcomplication, better to use if statements
    switch (true) {
      case this.consecutiveMeals > 1:
        this.consecutiveMeals -= 2;
        break;
      case this.consecutiveMeals == 0:
        break;
      case this.consecutiveMeals == 1:
        this.consecutiveMeals--;
    }

    var foodSource = view.forage("*");

    if (foodSource && this.appetite.hungry) {
      if (charFromElement(view.world.grid.get(view.vector.plus(directions[foodSource]))) == "#") {
        while (charFromElement(view.world.grid.get(view.vector.plus(directions[foodSource]))) !== " ") {
          foodSource = dirPlus(foodSource, 1);
        }
      }
      return {type: "move", direction: foodSource};

    } else {
      return {type: "move", direction: space};
    }
  }
}
