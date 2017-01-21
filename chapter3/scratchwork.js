function printFarmInventory (cows, chickens, pigs) {

  for each in args
      call animalCountZeroPadder
      return value to correct thing to send to console.log



  function animalCountZeroPadder (animal) {
    var animalString = String(animal);
    while (animalString.length < 3) {
      animalString = "0" + animalString;
    }
    console.log(animalString);
  }
}

function addZeroPadding (stringInput) {
  stringInput = String(stringInput);
  while (stringInput.length < 3) {
    stringInput = "0" + stringInput;
  }
  // assume this function will be called only when you're about to go to print? you call this to format correctly
  return stringInput;
}

printFarmInventory (args) {
  console.log(string for each arg in proper format);
}
