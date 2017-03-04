var figlet = require('figlet');
var fs = require('fs');


// works only with readFileSync, not with readFile?
// because with readFile, string of control continued on into figlet callback,
// but without text...or rather, it had the fs function call as its text argument
// not sure why this didn't throw an error from figlet?
figlet.text(fs.readFileSync('graffiti.txt', 'utf8'), {font: 'Crawford'},function(error, data) {
    if (error) {
        console.log(error);
        return;
    } 
    
    console.log(data);
});


fs.stat('garble.js', function(err,stats){
    if (err) {
        console.log(err);
    }

    console.log(stats);
})

fs.rename('graffiti.txt', 'wetmeat.txt', function (err) {
    if (err) {
        console.log(err);
    }
});