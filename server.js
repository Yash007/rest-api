/*
    Project Name: Patient Data Clinical Management
    Author: Yashkumar Sompura
    College ID: 300967186
    Subject: Node JS project
    keywords: RESTFull API development
    Milestone - 2 - Dec 12, 2017
*/

var express = require('express'),
users = require('./routes/users'),
patients = require('./routes/patients');

var app = express();

app.configure(function () {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
});

/* ------------------- USERS SECTION -------------------- */
//GET METHOD FOR GETTING ALL USERS FROM DATABASE
app.get('/users', users.findAll);

//GET METHOD FOR GETTING USERS BY ID FROM DATABASE
app.get('/users/:id', users.findById);

//POST METHOD FOR ADDING USER IN DATABASE
app.post('/users', users.addUser);

//POST METHOD FOR UPDATING USERS IN DATABASE BY THEIR ID
app.put('/users/:id', users.updateUser);

//DELETE METHOD FOR DELETING USERS FROM DATABASE
app.delete('/users/:id', users.deleteUser);

//POST METHOD FOR LOGIN INTO THE SYSTEM
app.post('/users/login', users.login);

/* ------------------- PATIENTS SECTION -------------------- */
//GET METHOD FOR GETTING PATIENTS DETAILS
app.get('/patients', patients.findAll);

//GET METHOD FOR GETTING PATIENT BY ID FROM DATABASE
app.get('/patients/:id', patients.findById);

//POST METHOD FOR ADDING NEW PATIENT
app.post('/patients', patients.addPatient);

//PUT METHOD FOR UPDATING PATIENT'S DETAILS
app.put('/patients/:id', patients.updatePatient);

//DELETE METHOD FOR DELETE PATIENT FROM DATABASE
app.delete('/patients/:id', patients.deletePatient);

//post method for inserting Record
app.post('/patients/:id/records',patients.addRecord);

//GET METHOD FOR VIEWINF PATIENT'S RECORD
app.get('/patients/:id/records', patients.findRecords);


//App will listen on port 3000 and http route by 127.0.0.1
//app.listen(3000, '127.0.0.1');
app.listen(3000,'https://patient-clinical-data.herokuapp.com/');
console.log('Server running at http://127.0.0.1:3000/');