var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
  this.direction = "n";
};

BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};

var critter1 = new BouncingCritter();
var critter2 = new BouncingCritter();
var critter3 = new BouncingCritter();
var critter4 = new BouncingCritter();

var critters = [];
critters.push({ direction: 'n' },{ direction: 'n' },{ direction: 'n' });

console.log(critters.indexOf({ direction: 'n' }));
critters.push(critter2, critter3, critter4);
console.log(critters.indexOf(critter2, critter3, critter4));
console.log(critter1, critter2);
console.log(Object.is(critter1,critter2));

// both of the calls to indexOf return -1 even though internally, ostensibly, the objects checked are identical??
// Because javascript compares objects and arrays by reference (location in memory),
// not by functional identity i.e. values, names, etc.
// So, when you want to compare objects, you need to ask:
// What do I want to know?
//  - if the objects compared refer to the same spot in memory?
//  - if the objects compared have the same properties and values?
// http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html

// Dimensions of object sameness: # of properties, property names, property values
// also consider hidden values???
