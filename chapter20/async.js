var figlet = require('figlet');


figlet.text('Postcone',{font: 'Bigfig', horizontalLayout: 'default', verticalLayout: 'default'}, 
    function (error, data){
        if (error)
            console.log(error);
        else
            console.log(data);
});


// THIS HAPPENS FIRST B/C ASYNC!
console.log('which happens first?');

/*
figlet.fonts(function(err, fonts) {
    if (err) {
        console.log('something went wrong...');
        console.dir(err);
    } else {
        console.log(fonts);
    }   
});
*/