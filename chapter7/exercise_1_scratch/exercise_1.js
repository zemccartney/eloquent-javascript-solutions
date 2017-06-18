TITLE: Artificial stupidity

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

// I'll know I'm right if
  // Simulation seems — gut check, not measured — to last longer
  // When a plant eater encounters a cluster of plants, it doesn't
  // just eat all or most of them, even if it could, which isn't really an if

RESULTS



EXPERIMENTATION



// PREPARE
// How can we prevent simulation from ending so quickly?
// FACTOR: herbivore
// - First, they are terribly greedy, stuffing themselves with every plant they
// see until they have wiped out the local plant life.
    // HOW CAN WE REVISE THE HERBIVORE SO THE SIMULATION LASTS LONGER I.E.
    // THE HERBIVORES DON'T RAPIDLY EAT THE PLANTS TO EXTINCTION AND DIE OUT
    // OR THE HERBIVORES FAIL TO FIND PLANTS, THEN STUMBLE AROUND INEFFECTIVELY?

    // Why?
      // Because an herbivore eats a plant if it finds one
        // Because the only factor in eating is if a plant is in view
          // How could I complicate eating? What other factor could the animal consider?
        // Because an herbivore is only looking to reproduce if it can and if not, then eat
        // So we want an herbivore who is less interested in reproducing, more moderate
        // in their appetites? appreciates the beauty of the world; grazes, chills
          // Plant eaters have no concept of appetite, full or hungry
          // they just eat and reproduce as much as possible, given resources

var plant = view.find("*");
// if you found a plant
if (plant)
  // eat it! (stops the function)
  // gets energy stored in the plant
  return {type: "eat", direction: plant};

  // regardless of energy level...b/c
  // Aim of plant eater is to, first and foremost, REPRODUCE
  // which requires lots of energy
    // ### PLANT EATER EXCERPT ###
    // if the critter has enough energy and it found an empty space
    if (this.energy > 60 && space)
      // return a reproduce action object, which is passed to the handler, which creates a new
      // critter in the current critter's direction
      return {type: "reproduce", direction: space};
    ///////////////////////////////////////////////


// Second, their randomized movement (recall that the view.find method returns
// a random direction when multiple directions match) causes them to stumble
// around ineffectively and starve if there don’t happen to be any plants nearby.

  // WHY? view.find() returns a random direction, so
  // if a critter's in empty space, it might move toward food, but just as likely will
  // move wherever; doesn't follow any...scent?
  // if a plant is within ... 5 spaces, move toward that, otherwise, move randomly..?
    // If a plant eater finds itself in empty space, it should try to smell, to
    // identify a close source of food, so it can move to the next foraging location
      // if it needs food?
      // if multiple directions....hmmm how would you resolve conflicts?
      // theoretically, a plant eater could get stuck moving indecisively between two
      // food source that it can smell...how does a plant eater smell, then move decisively?
        // it remembers a smell? remembers the direction...until it encounters the food source?
          // what if multiple initial conflicts? OK to settle on one randomly?

// And finally, they breed very fast, which makes the cycles between abundance
// and famine quite intense.

  // Why?
    // because they eat greedily, so they reproduce quickly once they find food
    // because energy required to reproduce is relatively low??
    // because plants can grow to a significant amount of energy, so eating energizes critters quickly
    // because they can reproduce infinitely, given infinite food; only requirement is energy

  // How could we make them breed more slowly?
    // require more energy to reproduce
    // put a "biological cap" of sorts on reproductive capacity
    // reduce the

// PLAN

function PlantEater() {
  this.energy = 20;
}
PlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};
  var plant = view.find("*");
  if (plant)
    return {type: "eat", direction: plant};
  if (space)
    return {type: "move", direction: space};
};



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


// don't want negative numbers
if (this.appetite != 0) {
  this.appetite--;
} else {
  // if critter's appetite would be decremented to 0, set it to null instead
  this.appetite = null;
}

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
    if (this.appetite.hunger < 3 && this.appetite.hungry == false) {
      this.appetite.hunger += 1;
      if (this.appetite.hunger == 3) {
        this.appetite.hungry = true;
      }
    } else {
      this.appetite.hungry = true;
    }
    return {type: "move", direction: space};
    // if there's no open space, the critter still gets hungrier
  } else {
    // Prevents critter from being stuck when surrounded (at least by plants)
    this.appetite.hunger += 1;
    if (this.appetite.hunger == 3) {
    	this.appetite.hungry = true;
    }
  }



};

// Solving for their randomized movement (recall that the view.find method returns
// a random direction when multiple directions match) causes them to stumble
// around ineffectively and starve if there don’t happen to be any plants nearby.

// If a plant eater finds itself in empty space, it should try to smell, to
// identify a close source of food, so it can move to the next foraging location
  // if it needs food?
  // if multiple directions....hmmm how would you resolve conflicts?
  // theoretically, a plant eater could get stuck moving indecisively between two
  // food sources that it can smell...how does a plant eater smell, then move decisively?
    // it remembers a smell? remembers the direction...until it encounters the food source?
      // what if multiple initial conflicts? OK to settle on one randomly?

      /////  $$$$$$$######@@@@@****************  /////
      // TODO: I don't know how the critter knows which direction to move
      // based on a given character, but...
      /////  $$$$$$$######@@@@@****************  /////

      // smells only if would be looking to move
      // if a critter is checking for an empty space, which implies not finding food
      // then we know that the critter is totally surrounded by non-food
      if (space) {
        // find any direction
          var scent = ;
      }

STEP 1: Just work out some form of intentional movement; non-conditional

// TEST CASE
  ["###########",
   "#         #",
   "#         #",
   "#*    O   #",
   "#         #",
   "###########"]

   // I expect the critter to move toward the food every turn

function SmartPlantEater() {
  this.energy = 20;
  this.forageDirection = null;
}


// global variable
var foragingSmellDirections = {
  "n":  new Vector( 0, -5),
  "ne": new Vector( 5, -5),
  "e":  new Vector( 5,  0),
  "se": new Vector( 5,  5),
  "s":  new Vector( 0,  5),
  "sw": new Vector(-5,  5),
  "w":  new Vector(-5,  0),
  "nw": new Vector(-5, -5)
}

// check element w/in 5 spaces in any direction
// see if there's food at a given location
// duplication by necessity?????
// or, could conditionalize the view method to use directions or foraging directions
View.prototype.smell = function(dir) {
  var target = this.vector.plus(foragingSmellDirections[dir]);
  if (this.world.grid.isInside(target)) {
    return charFromElement(this.world.grid.get(target));
  } else {
    return "#";
  }
}

View.prototype.forageOptions = function(food) {
  var foundFood = [];
  for (var dir in foragingSmellDirections) {
    if (this.smell(foragingSmellDirections[dir]) == food) {
        found.push(dir);
    }
  }

  // all the directions in which the critter can smell food
  return foundFood;
}

// traces back to forageOptions
// in this case, food is given in the critter act definition
// returns a direction
// originally, used to detect if there were an open space around the critter,
// which allowed it to decide if a.) it could reproduce (had space to place offspring)
// b.) it could move, if no food;
// foraging assumes moving and smelled food
View.prototype.forage = function(food, critter) {
  var found = this.forageOptions(food);
  if (found.length == 0) {
    return null;
  }

  // THIS FUNCTION DOES NOT HAVE ACCESS TO ANY CRITTER
  // YOU COULD OVERCOME BY CALLING?
  /*
  if (critter.forageDirection && found.indexOf(critter.dirRemembered) != -1) {
    // need to return?
    return critter.forageDirection;
  }
  */

  // return a random direction from the array created by findAll that contains food
  return randomElement(found);
}


SmartPlantEater.prototype.act = function() {
  // critter moves only if there's open space
  var space = view.find(" ");
  // if the critter's moving, it should move intentionally, i.e. toward food
  // how does it decide with direction to move?
      // SPACE IS A DIRECTION
  if (space) {

    // in which direction should I move
    var foodSource = view.forage("*");
    if (foodSource) {
      return {type: "move", direction: foodSource};
    } else {
      return {type: "move", direction: space};
    }
  }
}

    // I _believe_ that calls view.forage.call with the current critter as the context?
    // var foodSource = view.forage("*", this);


    // don't have to check for a plant to the sides or behind b/c var plant assignment does
    // that already
    while (forageDir) {
      // check that food's still in that direction
      // if every direction in that neighborhood of directions has no food, then give up
      var checkFood = view.forageOptions("*");
      if (checkFood.indexOf(forageDir) == -1
          && checkFood.indexOf(dirPlus(forageDir, 1)) == -1
          && checkFood.indexOf(dirPlus(forageDir, -1)) == -1) {
            forageDir = null;
            // move in a random direction for this turn
            return {type: "move", direction: space};
      }

      if (view.look(dirPlus(this.dir, -3)) != " ") {
        this.dir = dirPlus(this.dir, -2);
      }
      while (view.look(this.dir) != " ") {
        this.dir = dirPlus(this.dir, -2);
        // WHAT DOES THIS BREAK TO?
        if (this.dir === forageDir)
          break;
      }
      // How do you reset to forageDir once you've gotten around the obstacle?

      if (forageDir !== this.dir) {
        return {type: "move", direction: this.dir};
      } else {
        return {type: "move", direction: forageDir};
      }
    }
  } else {

  }
}

if (space)
    // while because we don't know for sure that the food will be 5 spaces away
    // critter might bump into a rock, into another critter, etc.
    // how does it remember its forageDirection
    while (forageDir) {
      // if wall, follow it, until you get around
      // for up to 4 turns...arbitrary? satisficing number
      // if after 4, check that you've gotten closer to food
      // works solely for stationary food...what about tigers..? hunting?
      return {type: "move", direction: forageDir};
    }


    return {type: "move", direction: space};


// adding vectors
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

// dir comes from directions
// matches a key in directions array, used to access vector offset for that direction
// see what's at a given location
View.prototype.look = function(dir) {
  // adding vectors
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target))
    return charFromElement(this.world.grid.get(target));
  else
    return "#";
};

// directions
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};


// store direction on critter; foragingDirection
// set / change only if no food in current direction
// should critter smell only if hungry?



// PERFECT




/*****
REWRITING WITHOUT NEW / CONSTRUCTOR FUNCTIONS

var protoHerbivore = {
  energy: 20,
  act: function () {
    console.log("PLEASE OVERRIDE ME");
  }
}

var smartPlantEater = Object.create(proto);
smartPlantEater.act = function (view) {
  //logic here
}
smartPlantEater.appetite = {
  hungry: ,
  hunger:
}
// Big downside of this...how do you recreate consistent objects if
// you extend instances on the fly / ad-hoc?



*****/


// composition pattern
function SmartPlantEater (contained) {
  this.contained: contained;
}
/** TO CALL
new SmartPlantEater(new PlantEater);

creates a new SmartPlantEater that forwards all of its calls to a new PlantEater object
it would be better if we could refer to a global plant eater object, that we didn't need
to recreate with every smart plant eater? it's wasteful to create 2 objects for the sake of 1?
what risk is there of all the instances of the smart plant eater linked to the global plant
eater changing how the plant eater functions, thus affecting the interface shared by all smart plant
eaters? i.e. changes to shared ancestor affect all descendants? Or, more precisely, linkages?
*/


// inheritance pattern
function SmartPlantEater (args) {
  PlantEater.call(this,args)
}

SmartPlantEater.prototype = Object.create(PlantEater);


// ###### NOTE FROM TRY 1
//// Your code here
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
  	console.log(foodSource);
    if (foodSource) {
      return {type: "move", direction: foodSource};
    } else {
      return {type: "move", direction: space};
    }
}

// Doesn't work at all...as critter moves, offset to food decreases
// How can y
// Trying to say, if critter smells, and food is within range, go to that direction

// start w/ offset of 2, you know if the critter is moving that there's no food
// within 1 space
for every direction, smell
    once you find food, in any direction, stop and move there
    up to 5 spaces out

for (var dir in directionNames) {
  // but changing that would change the original object, yes? this isn't copying?
  // How do you duplicate an object? So I can progressively change values in isolation
  var directionOffsetManip = directionNames;

}

function replaceNumber (string, number, replacement) {
  if (typeof(string) == "object")
    string = JSON.stringify(string);
  var replaced = string.replace(number, replacement);
  console.log(replaced);
  return replaced;
}
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};
replaceNumber(directions, 1, 2);

for (var offset = 2; offset <= 5; offset++) {

}

for (var dir in foragingDirections) {
    if (this.smell(dir) == food) break;

}

// LESSON: Static checking like this ignores state
// you know your check, but the environment is changing, making the check meaningless?
// as in, performing this check doesn't guarantee you anything about what's in the
// space, if that space is still relevant to check (given that the critter moves)
// not quite clicking yet
var foragingDirections = {
  "n":  new Vector( 0, -5),
  "ne": new Vector( 5, -5),
  "e":  new Vector( 5,  0),
  "se": new Vector( 5,  5),
  "s":  new Vector( 0,  5),
  "sw": new Vector(-5,  5),
  "w":  new Vector(-5,  0),
  "nw": new Vector(-5, -5)
}

View.prototype.smell = function(dir) {
  var target = this.vector.plus(foragingDirections[dir]);
  if (this.world.grid.isInside(target)) {
    return charFromElement(this.world.grid.get(target));
  } else {
    return "#";
  }
}

View.prototype.forageOptions = function(food) {
  var foundFood = [];
  for (var dir in foragingDirections) {
    if (this.smell(dir) == food) {
        foundFood.push(dir);
    }
  }
  console.log(foundFood);
  return foundFood;
}


View.prototype.forage = function(food, critter) {
  var found = this.forageOptions(food);
  if (found.length == 0)
    return null;

  return randomElement(found);
}



animateWorld(new LifelikeWorld(
  ["###########",
   "#         #",
   "#         #",
   "#*    O   #",
   "#         #",
   "###########"],
  {"#": Wall,
   "O": SmartPlantEater,
   "*": Plant}
));


// DOESN'T WORK BECAUSE STRINGIFYING REMOVES CONSTRUCTOR STATEMENTS
// YOU END UP WITH OBJECTS THAT LOOK LIKE VECTORS, BUT AREN'T; JUST VANILLA OBJECTS
function replaceNumber (string, number, replacement) {
  if (typeof(string) == "object")
    string = JSON.stringify(string);
  	console.log(string);
  var replaced = string.replace(number, replacement);
  console.log(JSON.parse(replaced));
  return JSON.parse(replaced);
}
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};
var example = new Vector(0,0);
console.log(Object.getPrototypeOf(example));
var vectorTest = replaceNumber(directions, 1, 2);
console.log(vectorTest.n.plus);
add the direction offset the number of times required to get to the desired offset
