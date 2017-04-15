// PERFORM
// every time a smart plant eater acts on a turn, it should check its appetite
// if it's hungry, the critter should eat if it has access to food
// otherwise, the critter shouldn't eat
function SmartPlantEater() {
  this.energy = 20;
  // 3 represents a full, satisfied critter
  this.appetite = {
    hungry: false,
    hunger: 0
  }
}

// every time a critter eats, it should get a litte fuller until it's totally full
// then, it digests
// once the critter has digested all of its food, then it can eat again
// a critter gets hungrier when it doesn't eat for a turn
  // a critter doesn't eat only if it moves

SmartPlantEater.prototype.act = function(view) {
  console.log(this.appetite.hungry);
  var space = view.find(" ");
  if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};

  // if a plant is found, plant contains a "*"; if not, it's null
  // i.e. NOT true or false
  var plant = view.find("*");

  // the critter eats only if there's a plant within 1 space and it is hungry
  if (plant && this.appetite.hungry) {
    // unnecessary? is there ever a case where the critter would be hungry
    // and have 0 hunger? No; there would be if we didn't write logic to set
    // the critter to full (hungry = false) when its hunger reaches zeo via subtraction
    if (this.appetite.hunger != 0) {

      // critter gets less hunger (eats a plant)
      this.appetite.hunger -= 1;

      // critter's no longer hungry if it's full (has no further hunger to subtract)
      if (this.appetite.hunger == 0) {
        this.appetite.hungry = false;
      }
    }
    // How does it know which direction to act in?
    return {type: "eat", direction: plant};
  }

  // if there's an open space, the critter moves and gets hungrier until it has
  // fully digested all of its food (hunger = 3)
  if (space) {
      // check for this.appetite.hungry is unnecessary
      // we reach this portion of the code only if this.appetite.hungry is false
      // NO! Or if there's no plant by the critter
      - critter is hungry i.e. this.appetite.hungry = true, which would happen only if the critter couldn't eat a plant'
      // if the critter is not hungry i.e. false and hunger is < 3
    if (!this.appetite.hungry) {
      if (this.appetite.hunger < 3) {
        this.appetite.hunger += 1;
        if (this.appetite.hunger == 3) {
          this.appetite.hungry = true;
        }
      }
    } else {
      // if a critter is hungry and moving i.e. it was hungry and ate the last plant, so no more plants around, so it moves
      if (this.appetite.hunger < 3) {
        this.appetite.hunger += 1;
      }
    }

    return {type: "move", direction: space};
    // if there's no open space, the critter still gets hungrier
  } else {
    // Prevents critter from being stuck when surrounded (at least by plants)...how?
      // critter could theoretically be full and surrounded by plants, at which point it would be immortal?
      if (!this.appetite.hungry) {
        if (this.appetite.hunger < 3) {
          this.appetite.hunger += 1;
          if (this.appetite.hunger == 3) {
            this.appetite.hungry = true;
          }
        }
      } else {
        // if a critter is hungry and moving i.e. it was hungry and ate the last plant, so no more plants around, so it moves
        if (this.appetite.hunger < 3) {
          this.appetite.hunger += 1;
        }
      }
  }
};




















/// TESTING: FINAL VERSION
// COMMENTS REMOVED

// When surrounded by plants, Critter should not eat for 3 turns, then eat for 3 turns, then not eat for 3 turns
// PASSED
function SmartPlantEater() {
  this.energy = 20;
  this.appetite = {
    hungry: false,
    hunger: 0
  }
}

SmartPlantEater.prototype.act = function(view) {
  console.log(this.appetite.hungry);
  var space = view.find(" ");
  if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};

  if (this.appetite.hungry) {
      var plant = view.find("*");
      if (plant) {
        console.log("Eating");
        this.updateAppetite(this.appetite.hungry, "eating");
        return {type: "eat", direction: plant};
      }
  }


  if (space) {
    console.log("Moving");
    this.updateAppetite(this.appetite.hungry, "not eating");
    return {type: "move", direction: space};
  } else {
    console.log("Surrounded");
    this.updateAppetite(this.appetite.hungry, "not eating");
  }
};



SmartPlantEater.prototype.updateAppetite = function(appetite, context) {
  if (!appetite) {
    if (this.appetite.hunger < 3) {
      this.appetite.hunger += 1;
      if (this.appetite.hunger == 3) {
        this.appetite.hungry = true;
      }
    }
    // critter is hungry, so either eating or moving b/c it isn't within reach of food
  } else {
    // if eating, then hunger is going down
    if (context == "eating") {
      if (this.appetite.hunger != 0) {
        this.appetite.hunger -= 1;
        if (this.appetite.hunger == 0) {
          this.appetite.hungry = false;
        }
      }
      // if moving or surrounded, then hunger increases if not at 3
    } else if (context == "not eating") {
      if (this.appetite.hunger < 3) {
        this.appetite.hunger += 1;
      }
    }
  }
};

// TEST CASE
  ["###########",
   "#*********#",
   "#*********#",
   "#*****O***#",
   "#**********#",
   "###########"]
