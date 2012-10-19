/* install connect first */
// npm install connect

var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(8080);

/* run as localhost:8080/assets/www/index.html */