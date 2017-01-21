// FINAL ANALYSIS
/*
To find all the types of events that are present in the data set, we simply process
each entry in turn and then loop over the events in that entry. We keep an object
phis that has correlation coefficients for all the event types we have seen so far.
Whenever we run across a type that isn’t in the phis object yet, we compute its
correlation and add it to the object.
*/

// Data set - represented how? Jacque's journal entries?
// phis = object w/ each event name encountered so far

EXAMPLE JOURNAL
var journal = [
  {events: ["work", "touched tree", "pizza",
            "running", "television"],
   squirrel: false},
  {events: ["work", "ice cream", "cauliflower",
            "lasagna", "touched tree", "brushed teeth"],
   squirrel: false},
  {events: ["weekend", "cycling", "break",
            "peanuts", "beer"],
   squirrel: true},
  /* and so on... */
];

// pass function the data set
// analyze each entry in that journal

var phis = {};
function findCorrelations ( journal ) {
// How do you loop through an array?

  for (var entryNumber = 0; entryNumber < journal.length; entryNumber++) {

    var entryAnalyzed = journal[entryNumber].events;
    // Events are strings stored in an array, accessed via the events method
    for (var counter = 0; counter < entryAnalyzed.length; counter++) {

      if (phis[entryAnalyzed[counter]]) {
        // calculate correlation and — ??? — and add to phis.eventname
      } else {
        phis[entryAnalyzed[counter]] = // calculate correlation for new
      }

    }

  }
}


// EXAMPLE CODE WITH YOUR COMMENTS PULLED FROM TEXT
function gatherCorrelations(journal) {
  var phis = {};
  for (var entry = 0; entry < journal.length; entry++) {
    var events = journal[entry].events;
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      // So we're adding a correlation only if we haven't calculated one already
      // We're calculating a correlation ONLY IF one hasn't been calculated yet
      // If one has been calculated i.e. there's a value in phis, identified by using the
      // string, label for an event stored in the entry's events array, to call a method
      // of that name on phis
      if (!(event in phis))
        phis[event] = phi(tableFor(event, journal));
    }
  }
  return phis;
}

var correlations = gatherCorrelations(JOURNAL);
console.log(correlations.pizza);
// → 0.068599434
