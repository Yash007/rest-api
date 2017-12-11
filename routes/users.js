/*
    Project Name: Patient Data Clinical Management
    Author: Yashkumar Sompura
    College ID: 300967186
    Subject: Node JS project
    keywords: RESTFull API development
    description: Users.js file for provide all functionality of users collection
*/

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('patient-clinical-data-management', server);

//Open connection with database
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'patient-clinical-data-management' database");
        db.collection('users', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

//find users by his/her ID from database
exports.findById = function(req, res) {
    var id = req.params.id;
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':new mongo.ObjectID(id)}, function(err, item)  {
            if(err) {
                console.log("ERROR");
            }
            res.send(item);
        });
    });
};

//find all users from database
exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

//add New User into the record
exports.addUser = function(req, res) {
    var user = req.body;
    console.log('Adding user: ' + JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.insert(user, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}


//Update user by his/her id and requested field.
exports.updateUser = function(req, res) {
    var id = req.params.id;
    var user = req.body;
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.update({'_id':new mongo.ObjectID(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });
}


//delete user by his/her id from database
exports.deleteUser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
    db.collection('users', function(err, collection) {
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


//login system for user
exports.login = function(req, res)  {
    var userId = req.body.userId;
    var hashCode = req.body.hashCode;

    console.log('Login User Password : ' + hashCode);
    db.collection('users', function(err, collection) {
        collection.findOne({'uEmail': userId, 'uPassword':hashCode}, function(err, item)  {
            if(err) {
                console.log("ERROR");
            }
            if(!item)   {
                res.send({status: 0, msg: "Incorrect ID and Password"});
            }
            else    {
                res.send({status: 1,item, message: "Success"});
            }
        });
    });
}
