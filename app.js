var express = require('express');

var app = express();
var PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use("/assets", express.static("assets"));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var data = {
  "userRandomID": {
    id: "userRandomID",
    firstName: "Kobe",
    lastName: "Bryant",
    email: "user@example.com",
    phoneNumber: 6041234567
  },
 "user2RandomID": {
    id: "user2RandomID",
    firstName: "Lebron",
    lastName: "James",
    email: "user2@example.com",
    phoneNumber: 6042345678
  }
};

// ------------------------------- Function - Generate random string
function generateRandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

app.get('/json', (req, res) => {
  res.json(data);
});

app.get('/contacts', (req, res) => {
  res.render('contacts', {contacts: data});
});

app.post('/contacts', (req, res) => {
  var userId = generateRandomString();
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;

  console.log("contact list before: ", data);

  var dataTemplate = {
    id: userId,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber
  };

  data[userId] = dataTemplate;

  console.log("contact list after: ", data);

  res.redirect('/contacts');
});

app.get('/contacts/:id', (req, res) => {
  var userId = req.params.id;
  res.render('contacts_one', {contactsOne: data[userId]});
});

app.get('/contacts/:id/edit', (req, res) => {
  var userId = req.params.id;
  res.render('contacts_edit', {contactsOne: data[userId]});
});

// function validateEmail(email){
//   return (email.length > 0);
// }
//
// function validatePhoneNumber(phoneNumber){
//   return (phoneNumber.length > 0);
// }

app.post('/contacts/:id/edit', (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  data[req.params.id].firstName = firstName;
  data[req.params.id].lastName = lastName;

  // if (!validateEmail(email) && phoneNumber){
    data[req.params.id].phoneNumber = phoneNumber;
  //   return;
  // }

  // if (!validatePhoneNumber(phoneNumber) && email){
    data[req.params.id].email = email;
  //   return;
  // }

  res.redirect("/contacts");
});

app.post("/contacts/:id/delete", (req, res) => {
  delete data[req.params.id];
  res.redirect("/contacts");
});

app.listen(PORT, () => {
  console.log(`You are listening to port ${PORT}!`);
});
