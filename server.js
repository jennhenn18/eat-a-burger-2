// require npm express file
var express = require('express');

// create a PORT
var PORT = process.env.PORT || 8080;

// create an express instance
var app = express();

// add static files
app.use(express.static('public'));

// add middleware functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// import the routes and allow access
const routes = require('./controllers/burgers_controller.js');
app.use(routes);

// create a server listener
app.listen(PORT, () =>{
    // log server name
    console.log('Server is listening on: http://localhost' + PORT);
})