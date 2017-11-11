"use strict";

var fileSystem = require("fs");
var stored = "";

/*fileSystem.readFile("../async.js", "utf8", function(error, data){
  if (error) {
    throw error;
  }
  stored = data;
  //console.log(stored);
});*/


/*fileSystem.readdir("./", function(error, files){
  if (error)
    throw error;

  files.forEach(function(file){
    fileSystem.readFile(file, "utf8", function(error, text){
      if (error)
        throw error;

      console.log(text + "\n");
    });
  });

});*/

/*fileSystem.readFile("garble.js", function (error, buff) {
    if (error) {
        console.log("malooey");
    }
    // bytes in buffer are just character codes (Unicode?)
    console.log(buff.length, buff[1], buff[10], String.fromCharCode(buff[1]));
});


// writeFile creates a file if it doesn't already exist
// writeFile doesn't append, it writes. As in, overwrites if content exists
// the content paramete is the new contents of the specified file
fileSystem.writeFile("bluebottle.js", "Pikael", function (error) {
    if (error) {
      throw error;
    }

    console.log("WRITE COMPLETE");
});*/

// Basic implementation of cp!!!!!
function cp (original, newFile) {
  fileSystem.readFile(original, "utf8", function (error, data) {
      if (error) {
        throw error;
      }

      fileSystem.writeFile(newFile, data, function (error) {
        if (error) {
          throw error;
        }
        console.log("FILE COPIED");
      })
  })
}

/*fileSystem.stat("exercise_1.js", function (error, stats) {
    if (error) {
      throw error;
    }

    console.log(stats);
});*/

// What if file doesn't exist? Exception?
/*fileSystem.unlink("bluebottle.js", function (error) {
    if (error) {
      throw error;
    }

    console.log("FILE DELETED");
});*/

cp("../../exercise_template.js", "exercises/exercise_4.js");
