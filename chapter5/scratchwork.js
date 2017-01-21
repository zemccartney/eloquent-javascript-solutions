// CONVERT TO USING FOR EACH

function gatherCorrelations(journal) {
  var phis = {};
  for (var entry = 0; entry < journal.length; entry++) {
    var events = journal[entry].events;
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      if (!(event in phis))
        phis[event] = phi(tableFor(event, journal));
    }
  }
  return phis;
}


// for each says: "I want to take an action on each item of this array"
// for each journal entry, I want to check if all of the events in that entry are
// in our phis object and if not, then add it
function gatherCorrelations(journal) {
  var phis = {};

  journal.forEach(function(entry) {
    var events = entry.events;
    events.forEach(function(event){
      if (!(event in phis))
        phis[event] = phi(tableFor(event, journal));
    })
  })

  return phis;
}

RESULT
- Matched book exactly execpt for events assignment; that can be changed to entry.events.forEach



// Reduce is computing a single value from an array by performing some sort of computation on each value
// or relationships between values

// To be able to go from a parent’s name to the actual object that represents this person,
// we first build up an object that associates names with people
// Why do we need to do this?

// Lineage tracing?
// ...to lineage trace, you need to invoke a person by name, producing their object,
// which you check for something to make a decision about what to do with them

// you trace lineage by father because you check by father, because Pauwels was a father...?

// Who was my grandfather's father?
byName["Philibert Haverbeke".father]



// traceByMom fails because Sofia van Damme is a mother, but isn't an object in the set
var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function traceByDad (person, match) {
  console.log(arguments);
  if (person.name === match) {
    return console.log("Direct ancestor");
  } else if (!person.father) {
    return "end of the line";
  } else {
    traceByDad(byName[person.father], match);
  }
}

function traceByMom (person, match) {
  console.log(arguments);
  if (person.name === match) {
    return console.log("Direct ancestor");
  } else if (!person.mother) {
    return "end of the line";
  } else {
    console.log(byName[person.mother]);
    traceByMom(byName[person.mother], match);
  }
}


// Goal: find average age of men and women
// you'd pass these functions a forEach call on the ANCESTRY_FILE array (array of objects)
// doing this returns an array of males and an array of females

function age(p) { return p.died - p.born; }
function male(p) { return p.sex == "m"; }
function female(p) { return p.sex == "f"; }

// want to end up with a computation, a number
// to get that number, you need numbers for all members who match a certain criterion (gender)
// matching certain criterion means filtering

filter(male());

// so that gives you an array of people who match that criteria
// you then need to translate that array into each member's corresponding age

filter(male(ANCESTRY_FILE))map(function(x){ return person.age;})

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}
function age(p) { return p.died - p.born; }
function male(p) { return p.sex == "m"; }
function female(p) { return p.sex == "f"; }

console.log(average(ancestry.filter(male).map(age)));
// Why does this work? Why don't you have to specify an argument in passing those function values?
// they implicitly use values from the given array?


// The way we want to reduce this shape is by computing a value for a given person
// by combining values from their ancestors. This can be done recursively: if we
//are interested in person A, we have to compute the values for A’s parents, which
// in turn requires us to compute the value for A’s grandparents, and so on. In principle,
// that’d require us to look at an infinite number of people, but since our data set is finite,
// we have to stop somewhere. We’ll allow a default value to be given to our reduction function,
// which will be used for people who are not in the data. In our case, that value is
// simply zero, on the assumption that people not in the list don’t share DNA with the ancestor we are looking at.

// Given a person, a function to combine values from the two parents of a given person,
// and a default value, reduceAncestors condenses a value from a family tree.

function reduceAncestors (person, function combineParentDNA (parent1, parent2) {}, var defaultValue = 0) {
  // decide if we should use default or other value - how do you decide that?
  // IF THEY DON'T EXIST IN THE DATA SET YOU DINK
  if (person == null) {
    // use default value
  }
  // otherwise, assume that existing in the data set means some shared DNA
}



// WHERE DO THEY GET ANY NUMBERS BESIDES 1?

function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]));
  }
  return valueFor(person);
}

This
1.) calls valueFor for the original person
2.) Then, to determine the values for the mother and father to pass to sharedDNA, valueFor
is called recursively, then continuously, within additional calls to sharedDNA(f), until an end
is reached, in any case, any person returns either 0 or 1, with 0 meaning does not share DNA (ancestral lines
end in person not in the set) or 1 (ancestral lines end in pauwels because pauwels has 100% of his own DNA)...??????

var ph = byName["Philibert Haverbeke"];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);
// You divide by 4 because is your grandfather i.e. 2 generations prior
// Each generation splits the gene pool in half

// What is a direct ancestor?




// How does this know what value person is set to? Implicit? We know that
// only values from the array we're working with are passed to filter and
// tested via the function given to filter?

console.log(ancestry.filter(isInSet.bind(null, theSet)));



// I don't get bind at all....what the hell?
// What is a partially applied version of a function?
// Why use apply? Why use bind?
