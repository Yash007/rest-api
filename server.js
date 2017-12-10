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


//GET METHOD FOR GETTING ALL USERS FROM DATABASE
app.get('/users', users.findAll);


//GET METHOD FOR GETTING USERS BY ID FROM DATABASE
app.get('/users/:id', users.findById);

app.listen(3000);
console.log('Listening on port 3000...');