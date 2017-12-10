exports.findAll = function(req, res) {
    res.send([{name:'Yash'}, {name:'Sompura'}, {name:'Nirmal'}]);
};

exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "Yash Sompura", description: "Node JS professional Developer"});
};