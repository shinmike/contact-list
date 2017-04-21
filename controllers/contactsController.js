var bodyParser = require('body-parser');

var data = [
{name: 'Kobe Bryant'},
{name: 'Lebron James'},
{name: 'Kyle Lowry'}
];

var urlencodedParser = bodyParser.urlencoded({extended: false});

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
