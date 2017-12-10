/*
    Project Name: Patient Data Clinical Management
    Author: Yashkumar Sompura
    College ID: 300967186
    Subject: Node JS project
    keywords: RESTFull API development
*/

var express = require('express');
var app = express();

//Get Method for users
app.get('/users', function(req, res) {
    res.send([{name:'Yash'}, {name:'Sompura'}]);
});

//Get Method for users by ID
app.get('/users/:id', function(req, res) {
    res.send({id:req.params.id, name: "Yash Sompura", description: "Node JS API Developer"});
});

app.listen(3000,'127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');