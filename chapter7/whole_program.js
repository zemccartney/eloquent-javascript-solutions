
// PLAN: an array of strings that lays out the world’s grid using one character per square
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};



// Defines the grid
function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};


// Defining the critter object and critter programming interface
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");

// mapping of directions to offsets (changes in current vector to move 1 space in given direction)
// Used to move critters, add these constructed vectors to critter's current location
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


function BouncingCritter() {
  this.direction = randomElement(directionNames);
};

BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};


// Defining the world object

function elementFromChar(legend, ch) {
  // if the given character is an empty space,
  // return null
  if (ch == " ")
    return null;
  var element = new legend[ch]();

  // returns the element in the plan from which this object was generated via the legend
  element.originChar = ch;
  return element;
}

// map variable represents a plan
// so map[0].length (0 is arbitrary, but safe bet) is the width of the world
// i.e. the length of one of the strings that represents the horizontal plane of the world

// map.length is the number of strings i.e. number of rows i.e. the height of the world
// each index of the plan array is a string representing a row
function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

// for each line in the grid i.e. FOR EACH ROW, where y is set to the index of the line (string)
// so, an item's index in the plan represents its y coordinate in the 2d grid
  map.forEach(function(line, y) {

    // loop to go over values of the line
    for (var x = 0; x < line.length; x++)
      // for each x value i.e. index of the line i.e. x coordinate moving horizontally right
      // set the index of the grid array equal to the vector's dimensions to an object generated
      // from the legend based on the character stored in the plan at the current position

      // DIDN'T REALIZE UNTIL READ LATER SECTION OF BOOK
      // Accessing grid variable, not this.grid
      grid.set(new Vector(x, y),
               elementFromChar(legend, line[x]));
  });
}

// returns the element to print, to add to the string
// remember, every element in the world was constructed from a single character string in one of
// the row strings in the plan
// this character is reprsented by each object's originChar method
function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}

//This method builds up a maplike string from the world’s current state by
//performing a two-dimensional loop over the squares on the grid I.E. This
// function allows us to see the current state of the world
World.prototype.toString = function() {
  var output = "";

  // returns the height of the world's grid property, which = plan.length (number of indices in plan array)
  for (var y = 0; y < this.grid.height; y++) {
    // returns the width of the world's grid property, which = plan[0].length (length of string at 1st index of plan)
    for (var x = 0; x < this.grid.width; x++) {
      // element stores the value in the grid at Vector(x,y) (i.e. grid (array)[vector.x + this.width * vector.y])
      var element = this.grid.get(new Vector(x, y));

      // adds the character from which the element was built to the output string
      output += charFromElement(element);
    }
    // at the end of each unit of height in the loop i.e. row, add a line break
    // so output is formatted as a grid
    output += "\n";
  }
  return output;
};


//Wall object
// walls do nothing, no methods, just empty objects, taking up space

function Wall() {}

// First test
// NOTE! legend is just an object with each character as keys, the accessing of which returns
// a constructor function, which, in th elementFromChar function, is then called with the new operator
var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});
console.log(world.toString());


// Lesson on the scope of this
var test = {
  prop: 10,
  addPropTo: function(array) {
    return array.map(function(elt) {
      return this.prop + elt;
      // creates a new function that when called uses this, which is test
      // this new bound function is called b/c it's returned
    }.bind(this));
  }
};
console.log(test.addPropTo([5]));

// Or, more simply
var test = {
  prop: 10,
  addPropTo: function(array) {
    return array.map(function(elt) {
      return this.prop + elt;
    }, this); // ← no bind
    // Higher-order function taking a context parameter (parameter that specifies this,
    // the calling object, where we are / in which object we're working)
  }
};

var test = {
  prop: 10,
  addPropTo: function(array) {
    return array.map(function(elt) {
      console.log(array);
      console.log(elt);
      console.log(this);
      console.log(this.prop);
      console.log(this.prop + elt);
      return this.prop + elt;
      // creates a new function that when called uses this, which is test
      // this new bound function is called b/c it's returned
    }.call(test, 4));
  }
};
// TODO Why does this fail?
// This fails — object returned by this.prop + elt — because the result of calling the
// the function within map via call is returned to...map?
// map expects a function, so it fails when it gets back a unitary value...?
console.log(test.addPropTo([5,3]));
// → [15]


// Function for calling forEach on the grid
Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      // Accesses each item in the this.space array (which is the plan converted to a 1D array)
      var value = this.space[x + y * this.width];
      if (value != null)
      // first argument of call is this
      // then, subsequent ones fill in args list of called function...?
        // TODO How does that work?
        // I assume f will be grid.set
        f.call(context, value, new Vector(x, y));
    }
  }
};


// Moving

World.prototype.turn = function() {
  // record of which critters have moved so far
  var acted = [];

  // REMEMBER: ARGUMENTS TO FOR EACH ARE SUPPLIED BY THE f.call expression at the
  // end of the forEach declaration i.e. vector is always a new Vector that uses x and y values from grid
  // value is the element that exists at that index (vector) in the space array

  // for each item in the world's grid i.e. grid's space
  this.grid.forEach(function(critter, vector) {
    // if the critter has an act method and the critter doesn't exist in the acted array
    // TODO How do you identify critters? I assume checking an array for critters means we have some way of telling them as unique?
    if (critter.act && acted.indexOf(critter) == -1) {
      // add critter to acted array i.e. log that it has acted this turn
      acted.push(critter);
      // have the critter act
      this.letAct(critter, vector);
    }
    // sets context as this i.e. the calling World object
  }, this);
};

// takes a critter and a vector (x and y coords)
World.prototype.letAct = function(critter, vector) {

  // stores result of critter's act method
      // act method calls view.look
        // view.look takes a direction name, taken from critter's direction prop, which is a random direction key from directionNames
          // calculates vector offset to move 1 space in that direction using directions offset array
            // adds offset to current vector to get desired position of 1 move
          // if that calculated vector isInside the world's grid
          // then, grid returns the character at the point in its space array corresponding to the desired vector
          // converts it from an element to a character to reveal what element exists at that spot
            // if the element is null, empty space, ACTION object with type move and given direction returned
            // view.find, tries to find a different direction at random from the directions whose offset vectors contain an empty space
  var action = critter.act(new View(this, vector));
  // checks action object returned by critter
  // critter can only return an object with type == "move" currently
  // confirms that the critter is intended to move and that the object is in fact a critter that can return such an object
  if (action && action.type == "move") {
    // stores critter's target destination if inside the grid
    var dest = this.checkDestination(action, vector);

    // dest exists only if it is a vector w/in grid space
    // this.grid.get(dest) == null means: if index of space at destination vector is empty space i.e. no element (null)
    if (dest && this.grid.get(dest) == null) {
      // set the point in space (vector) critter was at to empty
      this.grid.set(vector, null);
      // set destination vector to contain the critter
      this.grid.set(dest, critter);
    }
  }
};

// takes a critter's action object returned from its act method and a vector
World.prototype.checkDestination = function(action, vector) {
  // confirms that direction stored in action object is valid, included in directions array
  if (directions.hasOwnProperty(action.direction)) {
    // if so, store adding critter's vector to direction offset vector
    var dest = vector.plus(directions[action.direction]);

    // checks that destination is inside the grid
    if (this.grid.isInside(dest))
      // to decide if we can return the destination i.e. point in space to where critter would move
      return dest;
  }
};

/* FOR REFERENCE
BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};
*/

World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  }
};


/* NOTE "are not part of the external interface of a World object. They are an
internal detail. Some languages provide ways to explicitly declare certain methods
and properties private and signal an error when you try to use them from outside the object.
 JavaScript does not, so you will have to rely on some other form of communication
  to describe what is part of an object’s interface."

external interface = top-level function i.e. one that contains other functions,
uses other functions to get work requested by client done

TO HELP YOURSELF, USE THE _ TO DENOTE INTERNAL FUNCTIONS (UTILITIES?) VS. EXTERNAL INTERFACES

*/

function View(world, vector) {
  // knows about the world
  this.world = world;

  // knows about a given point in space
  // in the case of turn, it's the critter's location in the grid array converted to x and y values
  this.vector = vector;
}

View.prototype.look = function(dir) {
  // stores the result of adding a direction offset to critter's current vector
  var target = this.vector.plus(directions[dir]);
  // checks if result is within the world's space
  if (this.world.grid.isInside(target))
    // if so, return the character corresponding to the object at that point in the grid
    return charFromElement(this.world.grid.get(target));
  else
    // if not, you've hit a wall
    return "#";
  // in either case, the critter knows that it can move within the world, goes onto use the view.find method
};

// find all instances of the given character within view
View.prototype.findAll = function(ch) {
  var found = [];
  for (var dir in directions)
    if (this.look(dir) == ch)
      // push to the found array any vector additions whose content is the given character (ch)
      found.push(dir);
  return found;
};
View.prototype.find = function(ch) {
  var found = this.findAll(ch);
  if (found.length == 0) return null;
  // return a random direction from the array created by findAll
  return randomElement(found);
};


// var directionNames = "n ne e se s sw w nw".split(" ");
// [ 'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw' ]

// TODO WHY DO WE NEED TO DO THIS?
// Takes a direction string and and an offset number that represents the quantity and direction (positive or negative)
// of 45 degree increments
// Returns the direction string you're pointed in when you move that offsent (n)
function dirPlus(dir, n) {
  // returns index of the direction given in the directionNames array
  var index = directionNames.indexOf(dir);

  // returns
  // requested index + added direction + 8 (length of directionNames)
  // e.g. dir = "n" : index = 0, n = -3 : directionNames[5 % 8] -> 5
  // REMEMBER:  module with first operand < second just returns the first
  return directionNames[(index + n + 8) % 8];
}

// creates a critter whose only property is the direction it's heading in
// always south to start
function WallFollower() {
  this.dir = "s";
}

// takes a view object, which models vision, inspecting in any directions for occupants of surrounding spaces
WallFollower.prototype.act = function(view) {
  // starting direction?
  var start = this.dir;

  // view.look takes a direction, returns the character present in the space adjacent to that
  // critter in that direction
  // direction, in this case, is 135 degrees counter clockwise from current (defaults to northeast)
  // if that direction is NOT empty i.e. you're touching the top border wall of the world?
  // if critter looks to the left and backwards and sees a non-empty space
  // set start to the critter's left
  // so, the while loop below breaks 2 steps earlier than it would
  if (view.look(dirPlus(this.dir, -3)) != " ")
    // set start to this.dir, which is set to this.dir - 2 (default "e")
    start = this.dir = dirPlus(this.dir, -2);
    // when touching a wall, moving clockwise from the critter's left, then scanning
    // till you hit an empty square
    // ALWAYS yields the direction parallel with encountered wall
    // basically, start scanning from left, but do so only if there's something behind you to the left
    // which will happen if you're moving west and north along a wall
    // which will happen if a critter is moving along a wall, bumps into another critter on that
    // wall — critter will move diagonally outward from the other critter,
    // which satisfies the if condition, so the critter scans its next direction from its left,
    // which is diagonal inward landing back on the wall OR, if the other critter moved that way
    // parallel with the other critter, so the wall critter is always touching some object

  // If you're moving in a blocked direction, look around till you find an open direction, one you can move in
  // while looking in the start direction IS NOT empty
  while (view.look(this.dir) != " ") {
    // set this.dir to 45% clockwise from current this.dir (current direction critter's moving in)
    // THIS LINE KEEPS CRITTERS MOVING ALONG THE WALL; IF THEY HIT A WALL, THEY LOOK ONLY 45% CLOCKWISE
    // TO FIND A DIRECTION THEY CAN MOVE IN. WHEN A CRITTER LANDS IN A CORNER, DOING THIS 2 LEADS TO
    // STAYING ADJACENT TO THE NEW WALL, BUT MOVING ALONG IT, PARALLEL TO IT BECAUSE THAT DIRECTION
    // IS ALWAYS 90 DEGREES CLOCKWISE FROM CURRENT DIRECTION
    this.dir = dirPlus(this.dir, 1);
    // stop the loop if you get back to start direction, meaning you've looked
    // in every direction and they are all occupied
    // prevents infinite loop if crowded by critters
    if (this.dir == start) break;
  }

  // so, theoreticallY, a wall follower could break off a wall, move in that direction for a while
  // if it were surrounded by critters for a couple of turns, then suddenly not?
  return {type: "move", direction: this.dir};
};


// ### Life-like World, with food and reproduction

// calls the World constructor where this is the empty instance of LifeLikeWorld
// would create a LifeLikeWorld instance if not for the prototype override seen below???? (no, that's not right)
function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}

// prototype holds the object from all objects of this type are created
// dictates the object from objects of this type inherit
LifelikeWorld.prototype = Object.create(World.prototype);

// creates {} and stores in actionTypes
var actionTypes = Object.create(null);


LifelikeWorld.prototype.letAct = function(critter, vector) {
  // wait....in this case, isn't this referring to the critter???). NOPE! We're not in a new function
  // scope, still within the constructor's scope. if this were place in a function, then
  // we'd be in the parameter function's scope
  // store the action object (actionType and direction with empty space or south) to var action
  var action = critter.act(new View(this, vector));


  // stores a boolean i.e. if all requisite elements (required FOR..?) exist (coerced to true)
  var handled = action &&
    action.type in actionTypes &&
    // Calls actionTypes function with "this" (context) set to the World
    actionTypes[action.type].call(this, critter,
                                  vector, action);

  // if handled is false
  if (!handled) {
    // lower critter energy by .2
    critter.energy -= 0.2;
    // if the critter's energy is zero or lower
    if (critter.energy <= 0)
      // kill the critter, remove it from the grid
      this.grid.set(vector, null);
  }
};

// grow action, e.g. for plants
actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  // always returns true, used in the handled variable in the LifelikeWorld letAct method
  return true;
};

// move action
// action is object returned from critter.act and stored in action variable in LifelikeWorld constructor
// vector is the critter's current position, which comes from Grid's forEach f.call expression, which creates a new Vector
// TRAIL OF DATA : f.call -> forEach -> used within World.turn() --> passed as arguments to letAct() --> in lifeLikeWorld, passed to action handlers
actionTypes.move = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  // dest exists only if it is a vector w/in grid space; dest == null means not inside grid
  // this.grid.get(dest) == null means: if index of space at destination vector is empty space i.e. no element (null)
  // if the destination's not in the grid OR the critter has too little energy OR
  // the grid's index for the destination is occupied by another world denizen
  // the action is false i.e. can't take place i.e. isn't handled and the critter rests
  if (dest == null ||
      critter.energy <= 1 ||
      this.grid.get(dest) != null)
    return false;
    // critter loses 1 energy
  critter.energy -= 1;
  // set critter's current space to null; doesn't refer to the critter, but the critter still exists
  // floating in space
  this.grid.set(vector, null);
  // place the critter on the destination space
  this.grid.set(dest, critter);
  return true;
};

// values from forEach call and turn, as well as act call w/in letAct
actionTypes.eat = function(critter, vector, action) {
  // check if destination is valid
  var dest = this.checkDestination(action, vector);

  // dest is defined only if it's valid and this.grid.get is defined (true) only if something exists that
  // that index (not empty space)
  var atDest = dest != null && this.grid.get(dest);
  // if destination space is not occupied OR the occupant of the destination has no energy i.e. just died? or a wall?
  if (!atDest || atDest.energy == null)
    // action doesn't take place
    return false;
  // add destination occupant's energy to acting critter's
  critter.energy += atDest.energy;
  // remove the eaten critter from the grid
  this.grid.set(dest, null);
  // signifies action took place
  // changing state of world is just a side-effect
  // main goal is to produce true, so system knows action took place
  return true;
};

actionTypes.reproduce = function(critter, vector, action) {
  // baby constructed from same constructor as parent
  var baby = elementFromChar(this.legend,
                             critter.originChar);

  // check destination
  var dest = this.checkDestination(action, vector);
  // if destination is valid OR critter has less than or equal to required energy OR something's in the destination spot
  // don't take this action
  if (dest == null ||
      critter.energy <= 2 * baby.energy ||
      this.grid.get(dest) != null)
    return false;
    // spend the energy
  critter.energy -= 2 * baby.energy;
  // add the baby to the destination location
  this.grid.set(dest, baby);
  return true;
};

// number between 3 and 7 for energy
function Plant() {
  this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(view) {
  // reproduces if it has > 15 energy and can find an open space
  if (this.energy > 15) {
    var space = view.find(" ");
    if (space)
      return {type: "reproduce", direction: space};
  }
  // otherwise, grow till you have more than 20 energy, then wait
  if (this.energy < 20)
    return {type: "grow"};
};

function PlantEater() {
  this.energy = 20;
}

PlantEater.prototype.act = function(view) {
  // PRIORITIES: 1.) reproduce  2.) eat  3.) move
  // looks for an empty space
  var space = view.find(" ");
  // if the critter has enough energy and it found an empty space
  if (this.energy > 60 && space)
    // return a reproduce action object, which is passed to the handler, which creates a new
    // critter in the current critter's direction
    return {type: "reproduce", direction: space};
  // look for a plant
  var plant = view.find("*");
  // if you found a plant
  if (plant)
    // eat it! (stops the function)
    // gets energy stored in the plant
    return {type: "eat", direction: plant};
  // if there is an empty adjacent space, move to it
  // happens only if < 60 energy and !plant
  if (space)
    return {type: "move", direction: space};
};


// TODO Compose hierarchy of functions / dependencies to see how higher-level functions / objects
// are composed from more basic ones


http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/

http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/
