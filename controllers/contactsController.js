var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: true});

var data = [
{firstName: 'Kobe', lastName: 'Bryant', email: "kobe@nba.com", phoneNumber: "6041111111"},
{firstName: 'Lebron', lastName: 'James', email: "lebron@nba.com", phoneNumber: "6042222222"},
{firstName: 'Kyle', lastName: 'Lowry', email: "kyle@nba.com", phoneNumber: "6043333333"}
];

module.exports = function(app){

  app.get('/contacts', (req, res) => {
    res.render('contacts', {contacts: data});
  });

  app.post('/contacts', urlencodedParser, (req, res) => {
    data.push(req.body);
    console.log("You've added: ", req.body.name);
    res.json(data);
  });

  app.delete('/contacts/:id/delete', (req, res) => {

  });

};
