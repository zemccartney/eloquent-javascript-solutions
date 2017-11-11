TITLE: Creating Directories

SUBMITTED SOLUTION (ASSUMES PASSED TESTING)

methods.MKCOL = function (path, respond, request) {

  fs.stat(path, function (error, stats) {
    if (error && error.code !== "ENOENT") {
        respond(500, error.toString());
    } else if (stats) {
        var message = "A resource already exists at that address.";
        if (!stats.isDirectory()) {
          message += " Note that it is a file, not a directory";
        }
        // Suitable for already exists, but NOT for creating
        // 201 signifies resource created
        respond(204, message);
    } else {
        fs.mkdir(path, function(error) {
            if (error) {
              respond(500);
            } else {
              respond(201, "Directory created");
            }
        });
    }
  });

};


methods.MKCOL = function (path, respond, request) {

  fs.stat(path, function (error, stats) {

    if (error && error.code !== "ENOENT") {
      respond(500, error.toString());
    } else if (stats) { // Specified path refers to an existing resource
      var message = "A resource already exists at that address.";
      if (!stats.isDirectory())
        message += " Note that it is a file, not a directory";
      respond(204, message);
    } else {
      var pathElements = path.split(/\//);
      var DIR_LEVELS = pathElements.reduce(function (collector, current, currentIndex, array) {
        if (currentIndex >= 1) {
           collector.push(array.slice(0, currentIndex + 1 ).join("/"));
         }
         return collector;
      }, []);
      recursiveMkdir(DIR_LEVELS, respond);
    }
  });
};

function recursiveMkdir (dirLevels, respond) {

  fs.mkdir(dirLevels.shift(), function (error) {
    if (error) {
      respond(500, error.toString());
    } else if (dirLevels.length === 0) {
      respond(201, "Directories created");
    } else {
      recursiveMkdir(dirLevels, respond);
    }
  });
}

RESULTS

- Book did not do recursive strategy....needed to?
- You screwed up in your rmdir callback, exclusive branches were syntactically non-exclusive
   - but same form as book respondErrorOrNothing, except different status code (seems 201 better
   suited than 204 here?)
- Book responds to directory path matching an existing file w/ a 400 error request
    - I think that is a lot more sensible than what I did
    - A LOT MORE SENSIBLE; ACTUALLY, HATE MY SOLUTION FOR THAT CASE
- Book went with success-first branches
    - order seems disorganized: success, error, existing dir, path refers to existing file
    - I like error-first, Devin explanation made sense: interpretation of error closer to
    its source, less jumping around to read; error handling is interpretive, more subjective
    success is more concrete (item returned, resource created or manipulated, you generally
    know the context in which that success occurred, so less interpretation needed to understand it;
  essential to the action taken: CREATE A USER -> WE HAVE A USER vs. CREATE A USER -> something went wrong; what / how? how do we respond?)

EXPERIMENTATION



// PREPARE

/*
Though the DELETE method is wired up to delete directories (using fs.rmdir),
the file server currently does not provide any way to create a directory.

Add support for a method MKCOL, --> methods.MKCOL
which should create a directory by calling fs.mkdir.
MKCOL is not one of the basic HTTP methods, but it does exist, for this same purpose,
in the WebDAV standard, which specifies a set of extensions to HTTP, making it suitable
for writing resources, not just reading them.
*/

TODO [X] What is WebDAV?
TODO [X] What does he mean here: "making it suitable for writing resources, not just reading them"?
  "making it suitable" --> WEBDAV MAKES HTTP SUITABLE FOR WRITING RESOURCES
  see http://www.webdav.org/other/faq.html#Q1
  "A final goal of DAV is to leverage the success of HTTP in being a standard access \
  layer for a wide range of storage repositories -- HTTP gave them read access, while DAV gives them write access."

TODO [-] How is HTTP unfit for write access on web docs, when you can POST and PATCH resources?
-- cannot create directories; no method for that? you could...kinda? how?
-- no clear method for relocating files
// PLAN

// Does given path exist or not?
// If yes, we're done!
// If no,
    // How many levels?
      // Create dir

// which should create a directory by calling fs.mkdir. [] How does mkdir work?
// single directory
// What about nested directories? /new1/new2 --> should create new2 as a sub-directory of new1

// What should the response be? 201

// HOW DO WE HANDLE NESTED DIRECTORIES?
// HAVE TO PERFORM ALL OF THESE ACTIONS RECURSIVELY????
methods.MKCOL = function (path, respond, request) {

  fs.stat(path, function (error, stats) {

    // Issue with the underlying software; concern outside our system
    if (error && error.code !== "ENOENT") {
      respond(500, error.toString());
    } /*else if (!stats) {
      // Will we EVER hit this case? I don't think so?
      // WE SURE WILL; WHEN error.code === "ENOENT" i.e. the case that represents
      // A valid request to create a directory
      respond(500, error.toString());
    }*/ else if (stats) {
      console.log("Here?")
      // Specified path refers to an existing resource
      var message = "A resource already exists at that address.";
      if (!stats.isDirectory()) {
        message += " Note that it is a file, not a directory";
      }
      respond(204, message);
    } else {
      // should be "ENOENT"
      console.log(error.code);
      fs.mkdir(path, function(error) {
        if (error) {
          respond(500);
        } else {
          respond(201, "Directory created");
        }

      });
    }
  });
};

// PERFORM


// PERFECT
