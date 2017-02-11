
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
function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

// for each line in the grid, where y is set to the index of the line (string)
// so, an items index in the plan represents its y coordinate in the 2d grid
  map.forEach(function(line, y) {

    // loop to go over values of the line
    for (var x = 0; x < line.length; x++)
      // for each x value i.e. index of the line i.e. x coordinate moving horizontally right
      // set the index of the grid array equal to the vector's dimensions to an object generated
      // from the legend based on the character stored in the plan at the current position
      grid.set(new Vector(x, y),
               elementFromChar(legend, line[x]));
  });
}
