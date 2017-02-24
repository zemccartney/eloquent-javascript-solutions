
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
    // TODO How do you identify critters? I assume checking an array for critters means we have someway of telling them as unique?
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




http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/

http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/
