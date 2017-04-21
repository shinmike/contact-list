var express = require('express');
var contactsController = require('./controllers/contactsController');

var app = express();

var PORT = process.env.PORT || 8080;

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers
contactsController(app);

// listen to port
app.listen(PORT, () => {
  console.log(`You are listening to port ${PORT}!`);
});
