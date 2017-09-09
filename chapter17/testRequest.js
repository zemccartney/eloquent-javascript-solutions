var request = new XMLHttpRequest();

request.open("GET", "http://eloquentjavascript.net/code/mountains.js", false);
request.send(false);

console.log(request);
