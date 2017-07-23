TITLE: Predators

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

RESULTS

EXPERIMENTATION



// PREPARE

// Write another critter that survives by eating the herbivore critter. You’ll
// notice that stability is even harder to achieve now that there are cycles at
// multiple levels. Try to find a strategy to make the ecosystem run smoothly for
// at least a little while.

/*
REQUIREMENTS
- needs to eat plant eaters
- needs to reproduce
- needs energy
*/

// One thing that will help is to make the world bigger. This way, local population
// booms or busts are less likely to wipe out a species entirely, and there is space
// for the relatively large prey population needed to sustain a small predator population.

// PLAN

// - needs to eat plant eaters
// - needs to reproduce
// - needs energy

const config = {
  energy: 100,
  repro: 150
}

function Tiger() {
  // should be high; assume that population is smaller, b/c prey moves, harder to find to eat
  this.energy = 100;
}

Tiger.prototype.act = function (view) {
  var space = view.find(" ");
  if (this.energy > 200 && space)
    return {type: "reproduce", direction: space};
  var plantEater = view.find("O");
  if (plantEater)
    return {type: "eat", direction: plantEater};
  if (space)
    return {type: "move", direction: space};
};


// PERFORM

// Initial Results
- Tigers did OK
- Plant Eaters are WAY too passive; need to eat and reproduce a LOT more the larger the world gets
- at scale, with plant eaters disappearing faster, plant population totally destabilized

How could you improve?

- Tweak plant eater, make it eat and reproduce more (drop repro energy and eating limits, see what happens)
     - EXPECT: will result in more plant eaters, so greater chance that tigers will reproduce

HOW?

- BUG FIX: Must at least make energy for repro double + 1 (at least) initial energy, so repro cost does not
 bring Tiger energy to negative, freezing the Tigers
    - because repro fails if parent energy is not greater than double the child energy
    if (dest == null ||
      critter.energy <= 2 * baby.energy ||
      this.grid.get(dest) != null)
    return false;
**********FIXED!!!

ROUND 2
CHANGES
reduced both critters repro energies
gave tiger the forage function
upped forage function range to 4
revised forage function interface to take second parameter, extent of smell (number of spaces)
tried removing hunger limit on plant eaters...worked too well


// PERFECT
