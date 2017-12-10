/*
    Project Name: Patient Data Clinical Management
    Author: Yashkumar Sompura
    College ID: 300967186
    Subject: Node JS project
    keywords: RESTFull API development
*/

var express = require('express'),
users = require('./routes/users');

var app = express();

app.configure(function () {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
});

//GET METHOD FOR GETTING ALL USERS FROM DATABASE
app.get('/users', users.findAll);


//GET METHOD FOR GETTING USERS BY ID FROM DATABASE
app.get('/users/:id', users.findById);


app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);

//App will listen on port 3000 and http route by 127.0.0.1
app.listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');