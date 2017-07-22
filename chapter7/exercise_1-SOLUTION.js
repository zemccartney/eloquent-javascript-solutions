RESULTS
- Simulation runs for a good long time (have not seen it end on first pass)
- Configuration made:
    - reduced smell range to 3 spaces
    - set reproduction limit
    - doubled energy required to initially reproduce (but did not change amount reduced on reproduction)
      - then reduced to just 100, not 120; no ostensible changeNOPE, eventually, plant eaters reproduced enough to eat plants to extinction
    - added digestion to critter appetite
    - set amount eaten before digesting to 2
- Seems to be that plants cluster in a single side of the world (has happened )

function SmartPlantEater () {
  this.energy = 20;
  this.appetite = {
    hungry: false,
    hunger: 0,
    digesting: false
  };
  this.reproduction = {
    babyLimit: 3,
    babyCount: 0
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
          if (charFromElement(view.world.grid.get(view.vector.plus(directions[foodSource]))) == "#") {
            while (charFromElement(view.world.grid.get(view.vector.plus(directions[foodSource]))) !== " ") {
              foodSource = dirPlus(foodSource, 1);
            }
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

SmartPlantEater.prototype.updateAppetite = function (appetite, context) {
  if (!appetite) {
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
    // if eating, then hunger is going down
    if (context == "eating") {
      if (this.appetite.hunger != 0) {
        this.appetite.hunger -= 1;
        // plant eater no longer hungry when its hunger is 3, not 0, to stem rate of eating
        if (this.appetite.hunger == 4) {
          this.appetite.hungry = false;
          this.appetite.digesting = true;
        }
      }
      // if moving or surrounded, then hunger increases if not at 3
    } else if (context == "not eating") {
      if (this.appetite.hunger < 6) {
        this.appetite.hunger += 1;
      }
    }
  }
};




// Plant eaters should get full twice as fast as they get hungry
// So, they would eat twice as slowly, giving plants more time to grow
// Could also just up the reproduction energy required
