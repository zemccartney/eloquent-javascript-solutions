"use strict";

var fs = require("fs");
var path = "shjkgerg.js";

fs.stat(path, function (error, stats) {
    if (error) {
        console.log(error.toString())
    }

    if (stats.isDirectory()) {
        fs.readdir(path, function (error, files) {
            if (error) {
              console.log(error);
            }

            files.forEach(function (file) {
              fs.readFile(path + file, function (error, contents) {
                  if (error) {
                    console.log(eror)
                  }

                  console.log(contents.toString());
              });
            });
        });
    }
});
