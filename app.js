var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//set up template
app.set('view engine', 'ejs');

//set static file
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.listen(3000);
console.log('listening to port 3000');