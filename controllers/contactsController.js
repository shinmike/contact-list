var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: true});

var data = [
  {id: 123, firstName: 'Kobe', lastName: 'Bryant', email: "kobe@nba.com", phoneNumber: "6041111111"},
  {id: 456, firstName: 'Lebron', lastName: 'James', email: "lebron@nba.com", phoneNumber: "6042222222"},
  {id: 789, firstName: 'Kyle', lastName: 'Lowry', email: "kyle@nba.com", phoneNumber: "6043333333"}
];

module.exports = function(app){

  app.get('/contacts', (req, res) => {
    res.render('contacts', {contacts: data});
  });

  app.get('/contacts/:id', (req, res) => {
    let templateVars = {
      contactId: req.params.id,
      test: data[1]
    };
    res.render("contacts_show", templateVars);
  });

  app.post('/contacts', urlencodedParser, (req, res) => {
    data.push(req.body);
    console.log("You've added: ", req.body.name);
    res.json(data);
  });

  app.delete('/contacts/:id/delete', (req, res) => {

  });

};
