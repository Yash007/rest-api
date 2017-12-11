var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
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
                console.log("ERROR");
            }
            res.send(item);
        });
    });
};

//find all patients
exports.findAll = function(req, res) {
    db.collection('patients', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

//add patient method to add patients in records
exports.addPatient = function(req, res) {
    var patient = req.body;
    console.log('Adding patients: ' + JSON.stringify(patient));
    db.collection('patients', function(err, collection) {
        collection.insert(patient, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

//update patient method for updating records
exports.updatePatient = function(req, res) {
    var id = req.params.id;
    var patient = req.body;
    console.log('Updating patient: ' + id);
    console.log(JSON.stringify(patient));
    db.collection('patients', function(err, collection) {
        collection.update({'_id':new mongo.ObjectID(id)}, patient, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating patient: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(patient);
            }
        });
    });
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
