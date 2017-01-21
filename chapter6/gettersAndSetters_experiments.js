var vecky = new Vector (1,2);
vecky["get farts"] = function () { return "Bad gas"; }
console.log(vecky.farts);
// returns undefined
// you can't assign getters and setters by name

var vecky = { tasty: 5, get farts () { return this.tasty + 3; }, set farts (value) { return value + "shrimpy" }};
console.log(vecky);
for (var poop in vecky)
	console.log(poop);
// returns {tasty: 5, farts: 8}, tasty, farts
// printing an object is effectively getting all its values, hence why farts: 8 is logged
// console.log calls get farts
// getters and setters listed on an object (non-constructed) are enumerable
