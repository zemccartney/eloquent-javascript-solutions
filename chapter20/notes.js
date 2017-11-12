/*var mkl = require('test_mod');
var hello = "Hello!";
console.log(hello);



console.log(process.argv);
console.log(global);
process.exit(0);*/

var garble = require("./garble");

var argument = process.argv[2];
var garbled = garble.garble(argument);

console.log(garbled);
console.log(garble.translate(garbled));
