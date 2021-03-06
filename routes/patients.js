/*
    Project Name: Patient Data Clinical Management
    Author: Yashkumar Sompura
    College ID: 300967186
    Subject: Node JS project
    keywords: RESTFull API development
    Description: Patients.js file provide all functionality of patients collection.
    Milestone - final presentation - Jan 09, 2018
*/

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});

// var dbPath = "yash:9276807345@ds059207.mlab.com"
// var server = new Server(dbPath, 59207, {auto_reconnect: true});

db = new Db('patient-clinical-data-management', server);

//open connection with database
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'patient-clinical-data-management' database");
        db.collection('patients', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'patients' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

//find patients by ID
exports.findById = function(req, res) {
    var id = req.params.id;
    db.collection('patients', function(err, collection) {
        collection.findOne({'_id':new mongo.ObjectID(id)}, function(err, item)  {
            if(err) {
                res.send({"Status":"Error","Message":err});
            }
            else if(item == null)  {
                res.send({"Status":"Error","Message":"No Patient Data available."});
            }
            else    {
                res.send(item);
            }
        });
    });
};

//find all patients
exports.findAll = function(req, res) {
    db.collection('patients', function(err, collection) {
        collection.find().toArray(function(err, items) {
            if(err) {
                res.send({"Status":"Error","Message":err});
            }
            else if(items.length == 0)  {
                res.send({"Status":"Error","Message":"No Patient Data available."});
            }
            else    {
                res.send({"patients" : items});
            }
        });
    });
};

//add patient method to add patients in records
exports.addPatient = function(req, res) {
    var patient = req.body;
    console.log('Adding patients: ' + JSON.stringify(patient));

    if(patient.FirstName === undefined) {
        res.send({"Status":"Error!!","Message":"FirstName Not Found"});
    }
    else if(patient.LastName == undefined)   {
        res.send({"Status":"Error!!","Message":"LastName Not Found"});  
    }
    else if(patient.Address == undefined)   {
        res.send({"Status":"Error!!","Message":"Address Found"});  
    }
    else if(patient.DateOfBirth == undefined)   {
        res.send({"Status":"Error!!","Message":"DateOfBirth Not Found"});  
    }
    else if(patient.Telephone == undefined)   {
        res.send({"Status":"Error!!","Message":"Telephone Not Found"});  
    }
    else if(patient.InsurancePlan == undefined)   {
        res.send({"Status":"Error!!","Message":"InsurancePlan Not Found"});  
    }
    else if(patient.BloodType == undefined)   {
        res.send({"Status":"Error!!","Message":"BloodType Not Found"});  
    }
    else if(patient.IsInCritcalCondition == undefined)   {
        res.send({"Status":"Error!!","Message":"IsInCritcalCondition Not Found"});  
    }
    else    {
        db.collection('patients', function(err, collection) {
            collection.insert(patient, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    res.send({"Status":"Success","Message":"Patient has been added successfully"});
                }
            });
        });
    }
}

//update patient method for updating records
exports.updatePatient = function(req, res) {
    var id = req.params.id;
    var patient = req.body;
    console.log('Updating patient: ' + id);
    console.log(JSON.stringify(patient));
    if(id === undefined)    {
        res.send({"Status":"Error!!","Message":"Patient Id Not Found"});
    }
    else if(patient.FirstName === undefined) {
        res.send({"Status":"Error!!","Message":"FirstName Not Found"});
    }
    else if(patient.LastName == undefined)   {
        res.send({"Status":"Error!!","Message":"LastName Not Found"});  
    }
    else if(patient.Address == undefined)   {
        res.send({"Status":"Error!!","Message":"Address Found"});  
    }
    else if(patient.DateOfBirth == undefined)   {
        res.send({"Status":"Error!!","Message":"DateOfBirth Not Found"});  
    }
    else if(patient.Telephone == undefined)   {
        res.send({"Status":"Error!!","Message":"Telephone Not Found"});  
    }
    else if(patient.InsurancePlan == undefined)   {
        res.send({"Status":"Error!!","Message":"InsurancePlan Not Found"});  
    }
    else if(patient.EmergencyContact == undefined)   {
        res.send({"Status":"Error!!","Message":"EmergencyContact Not Found"});  
    }
    else if(patient.EmergencyContact.Name == undefined)   {
        res.send({"Status":"Error!!","Message":"EmergencyContact.Name Not Found"});  
    }
    else if(patient.EmergencyContact.Relationship == undefined)   {
        res.send({"Status":"Error!!","Message":"EmergencyContact.Relationship Not Found"});  
    }
    else if(patient.EmergencyContact.Telephone == undefined)   {
        res.send({"Status":"Error!!","Message":"EmergencyContact.Telephone Not Found"});  
    }
    else if(patient.BloodType == undefined)   {
        res.send({"Status":"Error!!","Message":"BloodType Not Found"});  
    }
    else if(patient.IsInCritcalCondition == undefined)   {
        res.send({"Status":"Error!!","Message":"IsInCritcalCondition Not Found"});  
    }
    else    {
        db.collection('patients', function(err, collection) {
            collection.update({'_id':new mongo.ObjectID(id)}, patient, {safe:true}, function(err, result) {
                if (err) {
                    console.log('Error updating patient: ' + err);
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('' + result + ' document(s) updated');
                    res.send({"Status":"Succes","Message":"Document has been updated successfully","Patient":patient});
                }
            });
        });
    }
}

//Delete Patient method for deleting record
exports.deletePatient = function(req, res) {
    var id = req.params.id;
    console.log('Deleting patient: ' + id);
    db.collection('patients', function(err, collection) {
        collection.remove({'_id':new mongo.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

//insert records to specific user
exports.addRecord = function(req, res)  {
    var userId = req.params.id;
    var record = req.body;

    if(userId === undefined)    {
        res.send({"Status":"Error!!","Message":"userId Id Not Found"});
    }
    else if(record.Practitioner === undefined)   {
        res.send({"Status":"Error!!","Message":"Practitioner Id Not Found"});
    }
    else if (record.MedicalCenter ===  undefined)   {
        res.send({"Status":"Error!!","Message":"MedicalCenter Id Not Found"});
    }
    else if(record.DateTime === undefined)  {
        res.send({"Status":"Error!!","Message":"DateTime Id Not Found"});
    }
    else if(record.DataType ===  undefined) {
        res.send({"Status":"Error!!","Message":"DataType Id Not Found"});
    }
    else if(record.Reading === undefined)   {
        res.send({"Status":"Error!!","Message":"Reading Id Not Found"});
    }
    else    {
        db.collection('patients', function(err, collection) {
            collection.update(
                {'_id':new mongo.ObjectID(userId)},
                {
                    '$push':    {
                        'ClinicalData':    {
                            'Practitioner' : record.Practitioner,
                            'MedicalCenter':record.MedicalCenter,
                            'DateTime':record.DateTime,
                            'DataType':record.DataType,
                            'Reading': record.Reading
                        }
                    }
                },
                function(err, result)  {
                    if(err) {
                        console.log(err);
                        res.send({"Status":"Success","Message":err});
                    }
                    else    {
                        res.send({"Status":"Success","Message":"Record has been added successfully","ClinicalData":record});
                    }
                }
            );
        });
    } 
}

//find patients by ID
exports.findRecords = function(req, res) {
    var id = req.params.id;
    db.collection('patients', function(err, collection) {
        collection.findOne({'_id':new mongo.ObjectID(id)}, function(err, item)  {
            if(err) {
                res.send({"Status":"Error","Message":err});
            }
            else if(item.length == 0)  {
                res.send({"Status":"Error","Message":"No Patient Data available."});
            }
            else    {
                res.send({ "records":item.ClinicalData });
            }
        });
    });
};
